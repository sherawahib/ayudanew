import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

type RegisterBody = {
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  accountType?: string;
  orgName?: string;
};

export async function POST(request: Request) {
  let body: RegisterBody;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const email = body.email?.trim().toLowerCase() ?? "";
  const password = body.password ?? "";
  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const accountType = body.accountType === "organization" ? "organization" : "individual";
  const orgName = body.orgName?.trim() ?? "";

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email is required." }, { status: 400 });
  }

  if (password.length < 8) {
    return NextResponse.json({ error: "Password must be at least 8 characters." }, { status: 400 });
  }

  if (!firstName || !lastName) {
    return NextResponse.json({ error: "First and last name are required." }, { status: 400 });
  }

  if (accountType === "organization" && !orgName) {
    return NextResponse.json({ error: "Organization name is required." }, { status: 400 });
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return NextResponse.json({ error: "An account with this email already exists." }, { status: 409 });
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const displayName =
    accountType === "organization" && orgName
      ? orgName
      : `${firstName} ${lastName}`.trim();

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

  return NextResponse.json({ success: true });
}
