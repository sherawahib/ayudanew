"use client";

import { signIn } from "next-auth/react";
import { useEffect, useState } from "react";

type ProviderAvailability = {
  google: boolean;
  facebook: boolean;
};

function GoogleIcon() {
  return (
    <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" aria-hidden>
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      />
    </svg>
  );
}

function FacebookIcon() {
  return (
    <svg className="h-5 w-5 shrink-0 fill-[#1877F2]" viewBox="0 0 24 24" aria-hidden>
      <path d="M24 12.073C24 5.405 18.627 0 12 0S0 5.405 0 12.073C0 18.1 4.388 23.094 10.125 24v-8.437H7.078v-3.49h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.49h-2.796V24C19.612 23.094 24 18.1 24 12.073z" />
    </svg>
  );
}

const inputClass =
  "w-full rounded-sm border border-black/15 bg-white px-4 py-3 text-sm outline-none transition-colors focus:border-ayuda-blue focus:ring-2 focus:ring-ayuda-blue/20";

type SocialAuthButtonsProps = {
  callbackUrl?: string;
  mode?: "sign-in" | "sign-up";
};

export default function SocialAuthButtons({
  callbackUrl = "/donors/dashboard",
  mode = "sign-in",
}: SocialAuthButtonsProps) {
  const [loading, setLoading] = useState<string | null>(null);
  const [configMessage, setConfigMessage] = useState<string | null>(null);
  const [providers, setProviders] = useState<ProviderAvailability>({
    google: false,
    facebook: false,
  });

  useEffect(() => {
    fetch("/api/auth/providers")
      .then((response) => response.json())
      .then((data: ProviderAvailability) => setProviders(data))
      .catch(() => {
        // Keep buttons visible; server will validate on sign-in.
      });
  }, []);

  async function handleSocial(provider: "google" | "facebook") {
    const configured = provider === "google" ? providers.google : providers.facebook;
    const label = provider === "google" ? "Google" : "Facebook";

    if (!configured) {
      setConfigMessage(`${label} sign-in is not configured yet. Please use your email and password.`);
      return;
    }

    setConfigMessage(null);
    setLoading(provider);
    await signIn(provider, { callbackUrl });
  }

  const actionLabel = mode === "sign-up" ? "Sign up" : "Sign in";

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        <button
          type="button"
          onClick={() => handleSocial("google")}
          disabled={loading !== null}
          aria-label={`${actionLabel} with Google`}
          className="flex w-full items-center justify-center gap-3 rounded-sm border border-black/15 bg-white px-4 py-3 text-sm font-medium text-[#0f2d52] transition-colors hover:bg-[#fafafa] disabled:opacity-60"
        >
          <GoogleIcon />
          <span>{loading === "google" ? "Connecting…" : "Google"}</span>
        </button>

        <button
          type="button"
          onClick={() => handleSocial("facebook")}
          disabled={loading !== null}
          aria-label={`${actionLabel} with Facebook`}
          className="flex w-full items-center justify-center gap-3 rounded-sm border border-[#1877f2]/30 bg-[#1877f2]/5 px-4 py-3 text-sm font-medium text-[#0f2d52] transition-colors hover:bg-[#1877f2]/10 disabled:opacity-60"
        >
          <FacebookIcon />
          <span>{loading === "facebook" ? "Connecting…" : "Facebook"}</span>
        </button>
      </div>

      {configMessage ? (
        <p className="rounded-sm border border-amber-200 bg-amber-50 px-3 py-2 text-xs text-amber-900" role="status">
          {configMessage}
        </p>
      ) : null}

      {!configMessage ? (
        <p className="text-center text-[11px] leading-relaxed text-ayuda-gray">
          We will never post to your profile without permission or access your friends list.
        </p>
      ) : null}

      <div className="relative py-1">
        <div className="absolute inset-0 flex items-center" aria-hidden>
          <div className="w-full border-t border-black/10" />
        </div>
        <p className="relative mx-auto w-fit bg-white px-3 text-xs uppercase tracking-wider text-ayuda-gray">
          Or {mode === "sign-up" ? "sign up" : "sign in"} with email
        </p>
      </div>
    </div>
  );
}

export { inputClass };
