"use client";

import Link from "next/link";
import { FormEvent, useActionState, useState } from "react";
import { loginAction } from "@/app/donors/sign-in/actions";
import DonorPortalShell from "@/components/donors/DonorPortalShell";
import SocialAuthButtons, { inputClass } from "@/components/donors/SocialAuthButtons";

function authErrorMessage(code: string | null) {
  switch (code) {
    case "CredentialsSignin":
      return "Invalid email or password. Please try again.";
    case "admin_access_denied":
      return "Your account does not have admin access. Ask an administrator to add your email to ADMIN_EMAILS.";
    default:
      return code ? "Unable to sign in. Please try again." : null;
  }
}

type SignInFormProps = {
  callbackUrl: string;
  initialEmail?: string;
  initialError?: string | null;
  registered?: boolean;
};

export default function SignInForm({
  callbackUrl,
  initialEmail = "",
  initialError = null,
  registered = false,
}: SignInFormProps) {
  const [email, setEmail] = useState(initialEmail);
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [state, formAction, pending] = useActionState(loginAction, null);

  const error =
    state?.error ??
    authErrorMessage(initialError) ??
    (registered ? "Account created successfully. Please log in with your email and password." : null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    formAction(formData);
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
        <input type="hidden" name="callbackUrl" value={callbackUrl} />

        <div>
          <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-[#0f2d52]">
            Email
          </label>
          <input
            id="email"
            name="email"
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
            name="password"
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
          disabled={pending}
          className="w-full bg-ayuda-blue py-3.5 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wide !text-white transition-colors hover:bg-ayuda-blue-dark disabled:opacity-60"
        >
          {pending ? "Signing in…" : "Log in"}
        </button>
      </form>
    </DonorPortalShell>
  );
}
