import type { Metadata } from "next";
import DonorDonationsTable from "@/components/donors/DonorDonationsTable";

export const metadata: Metadata = {
  title: "My Donations",
  robots: { index: false },
};

export default function DonorDonationsPage() {
  return (
    <div className="rounded-md border border-black/10 bg-white p-6 shadow-sm md:p-8">
      <h1 className="font-[family-name:var(--font-lora)] text-3xl text-[#0f2d52]">My donations</h1>
      <p className="mt-2 text-sm text-ayuda-gray">
        A complete history of your gifts to Ayuda Miami.
      </p>
      <div className="mt-8">
        <DonorDonationsTable />
      </div>
    </div>
  );
}
