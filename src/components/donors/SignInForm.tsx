"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { FormEvent, useEffect, useState } from "react";
import DonorPortalShell from "@/components/donors/DonorPortalShell";
import SocialAuthButtons, { inputClass } from "@/components/donors/SocialAuthButtons";

function authErrorMessage(code: string | null) {
  switch (code) {
    case "CredentialsSignin":
      return "Invalid email or password. Please try again.";
    case "admin_access_denied":
      return "Your account does not have admin access. Ask an administrator to add your email to ADMIN_EMAILS.";
    case "registered":
      return "Account created successfully. Please log in with your email and password.";
    default:
      return code ? "Unable to sign in. Please try again." : null;
  }
}

export default function SignInForm() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") ?? "/donors/dashboard";
  const [email, setEmail] = useState(searchParams.get("email") ?? "");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const message =
      authErrorMessage(searchParams.get("error")) ??
      (searchParams.get("registered") === "1"
        ? "Account created successfully. Please log in with your email and password."
        : null);
    if (message) {
      setError(message);
    }
  }, [searchParams]);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        callbackUrl,
        redirect: true,
      });
    } catch {
      setError("Unable to sign in right now. Please try again.");
      setLoading(false);
    }
  }

  return (
    <DonorPortalShell
      title="Log in to your account"
      subtitle="Access your donation history and account settings."
      footer={
        <>
          Don&apos;t have an account?{" "}
          <Link href="/donors/sign-up" className="font-semibold text-ayuda-blue hover:underline">
            Sign up
          </Link>
        </>
      }
    >
      <SocialAuthButtons callbackUrl={callbackUrl} mode="sign-in" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#0f2d52]">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-[#0f2d52]">
            Password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="current-password"
            required
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={inputClass}
          />
        </div>

        <div className="flex items-center justify-between gap-4">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-ayuda-gray">
            <input
              type="checkbox"
              checked={remember}
              onChange={(event) => setRemember(event.target.checked)}
              className="h-4 w-4 rounded accent-ayuda-blue"
            />
            Remember me
          </label>
          <Link href="/contact-us" className="text-sm text-ayuda-blue hover:underline">
            Forgot password?
          </Link>
        </div>

        {error ? (
          <p className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-ayuda-blue py-3.5 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wide !text-white transition-colors hover:bg-ayuda-blue-dark disabled:opacity-60"
        >
          {loading ? "Signing in…" : "Log in"}
        </button>
      </form>
    </DonorPortalShell>
  );
}
