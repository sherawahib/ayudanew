"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { CampaignStats } from "@/lib/campaigns";
import { formatCampaignMoney } from "@/lib/campaigns";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

export default function AdminCampaignList() {
  const [campaigns, setCampaigns] = useState<CampaignStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadCampaigns() {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/campaigns");
      const data = await response.json();
      if (!response.ok) throw new Error(data.error ?? "Unable to load campaigns.");
      setCampaigns(data.campaigns ?? []);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCampaigns();
  }, []);

  async function handleDelete(id: string, title: string) {
    if (!window.confirm(`Delete campaign "${title}"?`)) return;
    const response = await fetch(`/api/admin/campaigns/${id}`, { method: "DELETE" });
    if (!response.ok) {
      const data = await response.json();
      alert(data.error ?? "Unable to delete campaign.");
      return;
    }
    loadCampaigns();
  }

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Campaigns"
        description="Create fundraising campaigns, set goals, and control homepage banner visibility."
        actions={
          <Link
            href="/admin/campaigns/new"
            className="rounded-lg bg-[#1261ab] px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-[#1261ab]/20 hover:bg-[#084e8f]"
          >
            + New campaign
          </Link>
        }
      />

      {loading ? (
        <p className="text-sm text-[#5a6b7d]">Loading campaigns…</p>
      ) : error ? (
        <p className="text-sm text-red-600">{error}</p>
      ) : campaigns.length === 0 ? (
        <div className="rounded-xl border border-dashed border-black/15 bg-white p-12 text-center shadow-sm">
          <p className="font-[family-name:var(--font-lora)] text-2xl text-[#0f2d52]">No campaigns yet</p>
          <p className="mt-2 text-sm text-[#5a6b7d]">
            Create your first campaign to power the homepage banner widget.
          </p>
          <Link
            href="/admin/campaigns/new"
            className="mt-6 inline-block rounded-lg bg-[#1261ab] px-6 py-3 text-sm font-semibold text-white"
          >
            Create campaign
          </Link>
        </div>
      ) : (
        <div className="grid gap-4 lg:grid-cols-2">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm transition-shadow hover:shadow-md"
            >
              <div className="h-1 bg-gradient-to-r from-[#1261ab] to-[#2ec5f6]" />
              <div className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="font-[family-name:var(--font-lora)] text-xl text-[#0f2d52]">
                      {campaign.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#5a6b7d]">{campaign.slug}</p>
                  </div>
                  <div className="flex gap-2">
                    <span
                      className={`rounded-full px-2.5 py-1 text-[10px] font-semibold uppercase ${
                        campaign.isActive
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-600"
                      }`}
                    >
                      {campaign.isActive ? "Active" : "Inactive"}
                    </span>
                    {campaign.showOnBanner ? (
                      <span className="rounded-full bg-blue-100 px-2.5 py-1 text-[10px] font-semibold uppercase text-blue-800">
                        Banner
                      </span>
                    ) : null}
                  </div>
                </div>

                <div className="mt-5">
                  <div className="mb-2 flex justify-between text-sm">
                    <span className="font-semibold text-[#0f2d52]">
                      {formatCampaignMoney(campaign.raisedCents)}
                    </span>
                    <span className="text-[#5a6b7d]">
                      of {formatCampaignMoney(campaign.goalCents)}
                    </span>
                  </div>
                  <div className="h-2.5 overflow-hidden rounded-full bg-[#eef2f7]">
                    <div
                      className="h-full rounded-full bg-gradient-to-r from-[#1261ab] to-[#2ec5f6]"
                      style={{ width: `${campaign.progressPercent}%` }}
                    />
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3 text-center">
                  <div className="rounded-lg bg-[#f8fafc] p-3">
                    <p className="text-lg font-semibold text-[#0f2d52]">{campaign.progressPercent}%</p>
                    <p className="text-[10px] uppercase text-[#5a6b7d]">Progress</p>
                  </div>
                  <div className="rounded-lg bg-[#f8fafc] p-3">
                    <p className="text-lg font-semibold text-[#0f2d52]">{campaign.supporters}</p>
                    <p className="text-[10px] uppercase text-[#5a6b7d]">Supporters</p>
                  </div>
                  <div className="rounded-lg bg-[#f8fafc] p-3">
                    <p className="text-lg font-semibold text-[#0f2d52]">{campaign.daysLeft}</p>
                    <p className="text-[10px] uppercase text-[#5a6b7d]">Days left</p>
                  </div>
                </div>

                <div className="mt-5 flex gap-3 border-t border-black/5 pt-4">
                  <Link
                    href={`/admin/campaigns/${campaign.id}/edit`}
                    className="text-sm font-medium text-[#1261ab] hover:underline"
                  >
                    Edit campaign
                  </Link>
                  <Link
                    href={`/donate?campaign=${campaign.slug}`}
                    target="_blank"
                    className="text-sm text-[#5a6b7d] hover:text-[#1261ab]"
                  >
                    Preview donate page
                  </Link>
                  <button
                    type="button"
                    onClick={() => handleDelete(campaign.id, campaign.title)}
                    className="ml-auto text-sm text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
