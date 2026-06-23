import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { Suspense } from "react";
import { auth } from "@/auth";
import SignInForm from "@/components/donors/SignInForm";

export const metadata: Metadata = {
  title: "Donor Sign In",
  robots: { index: false },
};

type DonorSignInPageProps = {
  searchParams: Promise<{ callbackUrl?: string; error?: string; registered?: string; email?: string }>;
};

function safeCallbackUrl(url?: string) {
  if (url && url.startsWith("/") && !url.startsWith("//")) {
    return url;
  }
  return "/donors/dashboard";
}

export default async function DonorSignInPage({ searchParams }: DonorSignInPageProps) {
  const session = await auth();
  const params = await searchParams;
  const callbackUrl = safeCallbackUrl(params.callbackUrl);

  if (session?.user?.id) {
    redirect(callbackUrl);
  }

  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-ayuda-gray">Loading…</div>}>
      <SignInForm
        callbackUrl={callbackUrl}
        initialEmail={params.email ?? ""}
        initialError={params.error ?? null}
        registered={params.registered === "1"}
      />
    </Suspense>
  );
}
