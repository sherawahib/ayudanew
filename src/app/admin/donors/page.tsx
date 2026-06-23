import type { Metadata } from "next";
import AdminDonorsTable from "@/components/admin/AdminDonorsTable";

export const metadata: Metadata = {
  title: "Donors Admin",
  robots: { index: false },
};

export default function AdminDonorsPage() {
  return <AdminDonorsTable />;
}
