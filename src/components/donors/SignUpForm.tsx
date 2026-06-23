"use client";

import Link from "next/link";
import { FormEvent, useActionState, useState } from "react";
import { registerAction } from "@/app/donors/sign-up/actions";
import DonorPortalShell from "@/components/donors/DonorPortalShell";
import SocialAuthButtons, { inputClass } from "@/components/donors/SocialAuthButtons";

type AccountType = "individual" | "organization";

export default function SignUpForm() {
  const [accountType, setAccountType] = useState<AccountType>("individual");
  const [state, formAction, pending] = useActionState(registerAction, null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    formAction(new FormData(event.currentTarget));
  }

  return (
    <DonorPortalShell
      title="Create your donor account"
      subtitle="Track donations, manage privacy preferences, and give again anytime."
      footer={
        <>
          Already have an account?{" "}
          <Link href="/donors/sign-in" className="font-semibold text-ayuda-blue hover:underline">
            Log in
          </Link>
        </>
      }
    >
      <SocialAuthButtons mode="sign-up" />

      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="hidden" name="accountType" value={accountType} />

        <fieldset>
          <legend className="mb-2 text-sm font-medium text-[#0f2d52]">
            Are you representing an Individual or Organization?
          </legend>
          <div className="grid grid-cols-2 gap-2">
            {(["individual", "organization"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setAccountType(type)}
                className={`rounded-sm border px-3 py-2.5 text-sm font-medium capitalize transition-colors ${
                  accountType === type
                    ? "border-ayuda-blue bg-ayuda-blue text-white"
                    : "border-black/15 bg-[#fafafa] text-[#0f2d52] hover:border-ayuda-blue/40"
                }`}
              >
                {type}
              </button>
            ))}
          </div>
        </fieldset>

        {accountType === "organization" ? (
          <div>
            <label htmlFor="org-name" className="mb-1.5 block text-sm font-medium text-[#0f2d52]">
              Organization name
            </label>
            <input
              id="org-name"
              name="orgName"
              type="text"
              required
              className={inputClass}
            />
          </div>
        ) : null}

        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className="mb-1.5 block text-sm font-medium text-[#0f2d52]">
              First name
            </label>
            <input
              id="first-name"
              name="firstName"
              type="text"
              required
              autoComplete="given-name"
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="last-name" className="mb-1.5 block text-sm font-medium text-[#0f2d52]">
              Last name
            </label>
            <input
              id="last-name"
              name="lastName"
              type="text"
              required
              autoComplete="family-name"
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label htmlFor="signup-email" className="mb-1.5 block text-sm font-medium text-[#0f2d52]">
            Email
          </label>
          <input
            id="signup-email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="mb-1.5 block text-sm font-medium text-[#0f2d52]">
            Password
          </label>
          <input
            id="signup-password"
            name="password"
            type="password"
            required
            autoComplete="new-password"
            minLength={8}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="mb-1.5 block text-sm font-medium text-[#0f2d52]">
            Confirm password
          </label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="password"
            required
            autoComplete="new-password"
            className={inputClass}
          />
        </div>

        {state?.error ? (
          <p className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700" role="alert">
            {state.error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={pending}
          className="w-full bg-ayuda-blue py-3.5 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wide !text-white transition-colors hover:bg-ayuda-blue-dark disabled:opacity-60"
        >
          {pending ? "Creating account…" : "Sign up"}
        </button>
      </form>
    </DonorPortalShell>
  );
}
