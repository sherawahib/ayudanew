"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";

function safeCallbackUrl(value: FormDataEntryValue | null) {
  const url = value?.toString() ?? "/donors/dashboard";
  if (url.startsWith("/") && !url.startsWith("//")) {
    return url;
  }
  return "/donors/dashboard";
}

export async function loginAction(
  _prev: { error: string } | null | undefined,
  formData: FormData,
): Promise<{ error: string } | null> {
  const email = formData.get("email")?.toString().trim().toLowerCase() ?? "";
  const password = formData.get("password")?.toString() ?? "";
  const callbackUrl = safeCallbackUrl(formData.get("callbackUrl"));

  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl,
    });
    return null;
  } catch (error) {
    if (error instanceof AuthError) {
      return { error: "Invalid email or password. Please try again." };
    }
    throw error;
  }
}
