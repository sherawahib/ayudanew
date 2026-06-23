"use server";

import { AuthError } from "next-auth";
import bcrypt from "bcryptjs";
import { signIn } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function registerAction(
  _prev: { error: string } | null | undefined,
  formData: FormData,
): Promise<{ error: string } | null> {
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const confirmPassword = formData.get("confirmPassword")?.toString() ?? "";
  const firstName = formData.get("firstName")?.toString().trim() ?? "";
  const lastName = formData.get("lastName")?.toString().trim() ?? "";
  const accountType =
    formData.get("accountType")?.toString() === "organization" ? "organization" : "individual";
  const orgName = formData.get("orgName")?.toString().trim() ?? "";

  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." };
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "A valid email is required." };
  }

  if (!firstName || !lastName) {
    return { error: "First and last name are required." };
  }

  if (accountType === "organization" && !orgName) {
    return { error: "Organization name is required." };
  }

  try {
    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return { error: "An account with this email already exists." };
    }

    const passwordHash = await bcrypt.hash(password, 12);
    const displayName =
      accountType === "organization" && orgName ? orgName : `${firstName} ${lastName}`.trim();

    const user = await prisma.user.create({
      data: {
        email,
        passwordHash,
        firstName,
        lastName,
        name: displayName,
        accountType,
        orgName: accountType === "organization" ? orgName : null,
      },
    });

    await prisma.donation.updateMany({
      where: { donorEmail: email, userId: null },
      data: { userId: user.id },
    });

    await signIn("credentials", {
      email,
      password,
      redirectTo: "/donors/dashboard",
    });
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Account created but sign-in failed. Please log in manually." };
    }
    console.error("Registration failed:", error);
    return { error: "Unable to create account right now. Please try again." };
  }
}
