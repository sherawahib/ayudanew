import type { Metadata } from "next";
import LogoGrid from "@/components/LogoGrid";
import PageBanner from "@/components/PageBanner";
import { SPONSOR_TIERS } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Sponsors",
};

export const revalidate = 0;

export default function SponsorsPage() {
  return (
    <>
      <PageBanner title="Sponsors" />
      <section className="container-ayuda py-14 md:py-20">
        <p className="mx-auto mb-14 max-w-3xl text-center text-base leading-relaxed text-black">
          Ayuda Inc.&apos;s corporate partners came from different industries of all
          shapes and sizes. All of our contributors are vital to the existence of
          our programs for children and families. We are grateful to each one for
          their unique contributions and generosity. Our sponsors really do make a
          difference!
        </p>
        <div className="mx-auto max-w-5xl space-y-14">
          {SPONSOR_TIERS.map((tier) => (
            <div key={tier.title}>
              <h2 className="mb-8 text-center font-[family-name:var(--font-lora)] text-2xl text-ayuda-blue md:text-3xl">
                {tier.title}
              </h2>
              <LogoGrid logos={tier.logos} columns={4} />
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
