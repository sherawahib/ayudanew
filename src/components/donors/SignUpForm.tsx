"use client";

import Link from "next/link";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import DonorPortalShell from "@/components/donors/DonorPortalShell";
import SocialAuthButtons, { inputClass } from "@/components/donors/SocialAuthButtons";

type AccountType = "individual" | "organization";

export default function SignUpForm() {
  const router = useRouter();
  const [accountType, setAccountType] = useState<AccountType>("individual");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [orgName, setOrgName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);

    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          firstName,
          lastName,
          accountType,
          orgName: accountType === "organization" ? orgName : undefined,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error ?? "Unable to create account.");
      }

      await signIn("credentials", {
        email: email.trim().toLowerCase(),
        password,
        callbackUrl: "/donors/dashboard",
        redirect: true,
      });
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
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
              type="text"
              required
              value={orgName}
              onChange={(event) => setOrgName(event.target.value)}
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
              type="text"
              required
              autoComplete="given-name"
              value={firstName}
              onChange={(event) => setFirstName(event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="last-name" className="mb-1.5 block text-sm font-medium text-[#0f2d52]">
              Last name
            </label>
            <input
              id="last-name"
              type="text"
              required
              autoComplete="family-name"
              value={lastName}
              onChange={(event) => setLastName(event.target.value)}
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
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="signup-password" className="mb-1.5 block text-sm font-medium text-[#0f2d52]">
            Password
          </label>
          <input
            id="signup-password"
            type="password"
            required
            autoComplete="new-password"
            minLength={8}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="confirm-password" className="mb-1.5 block text-sm font-medium text-[#0f2d52]">
            Confirm password
          </label>
          <input
            id="confirm-password"
            type="password"
            required
            autoComplete="new-password"
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            className={inputClass}
          />
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
          {loading ? "Creating account…" : "Sign up"}
        </button>
      </form>
    </DonorPortalShell>
  );
}
