import type { Metadata } from "next";
import { prisma } from "@/lib/prisma";
import AdminDonationsTable from "@/components/admin/AdminDonationsTable";

export const metadata: Metadata = {
  title: "Donations Admin",
  robots: { index: false },
};

export default async function AdminDonationsPage() {
  const campaigns = await prisma.campaign.findMany({
    select: { id: true, title: true },
    orderBy: { title: "asc" },
  });

  return <AdminDonationsTable campaigns={campaigns} />;
}
