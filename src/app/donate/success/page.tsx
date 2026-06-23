import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Thank You",
  robots: { index: false },
};

export default function DonateSuccessPage() {
  return (
    <>
      <PageBanner title="Thank You" />
      <section className="container-ayuda py-16 md:py-24">
        <div className="mx-auto max-w-xl text-center">
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-[#00b388]/15 text-[#00b388]">
            <svg className="h-8 w-8" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" aria-hidden>
              <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h2 className="font-[family-name:var(--font-lora)] text-3xl text-[#0f2d52]">
            Your donation was received
          </h2>
          <p className="mt-4 text-base leading-relaxed text-ayuda-gray">
            Thank you for supporting Ayuda Miami. A receipt has been sent to your email.
            Your gift makes a real difference for families across our community.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link
              href="/"
              className="inline-block bg-ayuda-blue px-8 py-3 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-ayuda-blue-dark"
            >
              Return home
            </Link>
            <Link
              href="/programs"
              className="inline-block border border-ayuda-blue px-8 py-3 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wide text-ayuda-blue transition-colors hover:bg-ayuda-blue hover:text-white"
            >
              Our programs
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
