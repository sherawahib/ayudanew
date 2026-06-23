import type { Metadata } from "next";
import Link from "next/link";
import { auth } from "@/auth";
import DonorDonationsTable from "@/components/donors/DonorDonationsTable";

export const metadata: Metadata = {
  title: "Donor Dashboard",
  robots: { index: false },
};

type DonorDashboardPageProps = {
  searchParams: Promise<{ error?: string }>;
};

export default async function DonorDashboardPage({ searchParams }: DonorDashboardPageProps) {
  const session = await auth();
  const params = await searchParams;
  const adminDenied = params.error === "admin_access_denied";

  return (
    <div className="space-y-8">
      {adminDenied ? (
        <p className="rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="alert">
          This account does not have admin access. To use the admin panel, add your email to{" "}
          <code className="text-xs">ADMIN_EMAILS</code> in the site environment settings.
        </p>
      ) : null}
      <div className="rounded-md border border-black/10 bg-white p-6 shadow-sm md:p-8">
        <p className="text-xs font-semibold uppercase tracking-wider text-ayuda-blue">
          Welcome back
        </p>
        <h1 className="mt-2 font-[family-name:var(--font-lora)] text-3xl text-[#0f2d52]">
          {session?.user?.name ?? "Donor"}
        </h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ayuda-gray">
          Manage your giving history, privacy preferences, and make new donations to support
          Ayuda Miami families.
        </p>
        <Link
          href="/donate"
          className="mt-6 inline-block bg-ayuda-blue px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-ayuda-blue-dark"
        >
          Make a donation
        </Link>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-md border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-ayuda-gray">Account type</p>
          <p className="mt-2 text-lg font-medium capitalize text-[#0f2d52]">
            {session?.user?.accountType ?? "individual"}
          </p>
        </div>
        <div className="rounded-md border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-ayuda-gray">Public name</p>
          <p className="mt-2 text-lg font-medium text-[#0f2d52]">
            {session?.user?.postName ? "Visible" : "Hidden"}
          </p>
        </div>
        <div className="rounded-md border border-black/10 bg-white p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wider text-ayuda-gray">Public amount</p>
          <p className="mt-2 text-lg font-medium text-[#0f2d52]">
            {session?.user?.postAmount ? "Visible" : "Hidden"}
          </p>
        </div>
      </div>

      <div className="rounded-md border border-black/10 bg-white p-6 shadow-sm md:p-8">
        <div className="mb-5 flex items-center justify-between gap-4">
          <h2 className="font-[family-name:var(--font-lora)] text-2xl text-[#0f2d52]">
            Recent donations
          </h2>
          <Link href="/donors/dashboard/donations" className="text-sm font-medium text-ayuda-blue hover:underline">
            View all
          </Link>
        </div>
        <DonorDonationsTable compact />
      </div>
    </div>
  );
}
