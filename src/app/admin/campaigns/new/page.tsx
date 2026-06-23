"use client";

import { useRouter } from "next/navigation";
import AdminCampaignForm, { type CampaignFormValues } from "@/components/admin/AdminCampaignForm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function NewCampaignPage() {
  const router = useRouter();

  async function handleSubmit(values: CampaignFormValues) {
    const response = await fetch("/api/admin/campaigns", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: values.title,
        description: values.description,
        goalDollars: Number(values.goalDollars),
        startDate: values.startDate,
        endDate: values.endDate,
        isActive: values.isActive,
        showOnBanner: values.showOnBanner,
        sortOrder: Number(values.sortOrder),
      }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error ?? "Unable to create campaign.");

    router.push("/admin/campaigns");
    router.refresh();
  }

  return (
    <div>
      <AdminPageHeader
        title="Create campaign"
        description="Set your fundraising goal, timeline, and banner visibility."
      />
      <AdminCampaignForm submitLabel="Create campaign" onSubmit={handleSubmit} />
    </div>
  );
}
