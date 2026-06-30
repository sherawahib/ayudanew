import type { Metadata } from "next";
import LogoGrid from "@/components/LogoGrid";
import PageBanner from "@/components/PageBanner";
import { FUNDER_LOGOS } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "FUNDERS",
};

export default function FundingPage() {
  return (
    <>
      <PageBanner title="FUNDERS" />
      <section className="container-ayuda py-14 md:py-20">
        <p className="mx-auto mb-10 max-w-3xl text-center text-base leading-relaxed text-black">
          AYUDA receives funding from public agencies, private foundations, and
          government contracts that support our programs across Miami-Dade County.
        </p>
        <LogoGrid logos={FUNDER_LOGOS} columns={3} size="large" />
      </section>
    </>
  );
}
