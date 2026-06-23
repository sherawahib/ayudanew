"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AdminCampaignForm, { type CampaignFormValues } from "@/components/admin/AdminCampaignForm";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function EditCampaignPage() {
  const router = useRouter();
  const params = useParams<{ id: string }>();
  const [initial, setInitial] = useState<Partial<CampaignFormValues> | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      const response = await fetch(`/api/admin/campaigns/${params.id}`);
      const data = await response.json();
      if (!response.ok) {
        setError(data.error ?? "Unable to load campaign.");
        return;
      }

      const campaign = data.campaign;
      setInitial({
        title: campaign.title,
        description: campaign.description ?? "",
        goalDollars: String(campaign.goalCents / 100),
        startDate: campaign.startDate.slice(0, 10),
        endDate: campaign.endDate.slice(0, 10),
        isActive: campaign.isActive,
        showOnBanner: campaign.showOnBanner,
        sortOrder: String(campaign.sortOrder ?? 0),
      });
    }

    load();
  }, [params.id]);

  async function handleSubmit(values: CampaignFormValues) {
    const response = await fetch(`/api/admin/campaigns/${params.id}`, {
      method: "PATCH",
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
    if (!response.ok) throw new Error(data.error ?? "Unable to update campaign.");

    router.push("/admin/campaigns");
    router.refresh();
  }

  if (error) return <p className="text-sm text-red-600">{error}</p>;
  if (!initial) return <p className="text-sm text-[#5a6b7d]">Loading campaign…</p>;

  return (
    <div>
      <AdminPageHeader
        title="Edit campaign"
        description="Update goal, dates, and visibility settings."
      />
      <AdminCampaignForm initial={initial} submitLabel="Save changes" onSubmit={handleSubmit} />
    </div>
  );
}
