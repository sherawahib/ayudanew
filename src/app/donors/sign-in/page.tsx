import type { Metadata } from "next";
import { Suspense } from "react";
import SignInForm from "@/components/donors/SignInForm";

export const metadata: Metadata = {
  title: "Donor Sign In",
  robots: { index: false },
};

export default function DonorSignInPage() {
  return (
    <Suspense fallback={<div className="py-20 text-center text-sm text-ayuda-gray">Loading…</div>}>
      <SignInForm />
    </Suspense>
  );
}
