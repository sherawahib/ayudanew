import type { Metadata } from "next";
import AdminCampaignList from "@/components/admin/AdminCampaignList";

export const metadata: Metadata = {
  title: "Campaigns Admin",
  robots: { index: false },
};

export default function AdminCampaignsPage() {
  return <AdminCampaignList />;
}
