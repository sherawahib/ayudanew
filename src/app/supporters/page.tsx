import type { Metadata } from "next";
import LogoGrid from "@/components/LogoGrid";
import PageBanner from "@/components/PageBanner";
import { SUPPORTER_LOGOS } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Supporters",
};

export default function SupportersPage() {
  return (
    <>
      <PageBanner title="Supporters" />
      <section className="container-ayuda py-14 md:py-20">
        <p className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-black">
          AYUDA is grateful for the generous support of individuals, foundations,
          corporations, and community partners who make our work possible.
        </p>
        <LogoGrid logos={SUPPORTER_LOGOS} columns={4} />
      </section>
    </>
  );
}
