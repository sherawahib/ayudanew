import type { Metadata } from "next";
import DonorEntry from "@/components/DonorEntry";
import PageBanner from "@/components/PageBanner";
import { DONOR_ENTRIES } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Donors",
};

export const revalidate = 0;

export default function DonorsPage() {
  return (
    <>
      <PageBanner title="Donors" />
      <section className="container-ayuda py-14 md:py-20">
        <div className="mx-auto max-w-4xl">
          {DONOR_ENTRIES.map((donor, index) => (
            <DonorEntry key={`${donor.title}-${donor.date}-${index}`} {...donor} />
          ))}
        </div>
      </section>
    </>
  );
}
