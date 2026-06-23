"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { AdminDashboardData } from "@/lib/admin-stats";
import { formatAdminDate, formatAdminMoney } from "@/lib/admin-stats";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";

export default function AdminDashboard() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch("/api/admin/dashboard", { cache: "no-store" });
      const json = await response.json();
      if (!response.ok) throw new Error(json.error ?? "Failed to load dashboard");
      setData(json);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
    const interval = window.setInterval(load, 60000);
    return () => window.clearInterval(interval);
  }, [load]);

  if (loading && !data) {
    return <p className="text-sm text-[#5a6b7d]">Loading dashboard…</p>;
  }

  if (error && !data) {
    return <p className="text-sm text-red-600">{error}</p>;
  }

  if (!data) return null;

  const maxChart = Math.max(...data.chartData.map((d) => d.amountCents), 1);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Dashboard"
        description="Real-time overview of fundraising, donors, and campaigns."
        actions={
          <button
            type="button"
            onClick={load}
            className="rounded-lg border border-[#1261ab]/30 bg-white px-4 py-2 text-sm font-medium text-[#1261ab] transition-colors hover:bg-[#1261ab] hover:text-white"
          >
            Refresh
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard
          label="Total raised"
          value={formatAdminMoney(data.stats.totalRaisedCents)}
          hint={`${data.stats.completedDonations} completed gifts`}
          accent="green"
        />
        <AdminStatCard
          label="Supporters"
          value={String(data.stats.totalDonors)}
          hint={`${data.stats.registeredUsers} registered accounts`}
          accent="blue"
        />
        <AdminStatCard
          label="Active campaigns"
          value={String(data.stats.activeCampaigns)}
          hint={`${data.campaigns.length} total campaigns`}
          accent="purple"
        />
        <AdminStatCard
          label="Average gift"
          value={formatAdminMoney(data.stats.avgDonationCents)}
          hint={`${data.stats.pendingDonations} pending payments`}
          accent="amber"
        />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm xl:col-span-2">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="font-[family-name:var(--font-lora)] text-xl text-[#0f2d52]">
              Donations — last 14 days
            </h2>
            <Link href="/admin/analytics" className="text-sm font-medium text-[#1261ab] hover:underline">
              View analytics
            </Link>
          </div>
          <div className="flex h-48 items-end gap-2">
            {data.chartData.map((day) => (
              <div key={day.label} className="flex flex-1 flex-col items-center gap-2">
                <div className="relative flex w-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-md bg-gradient-to-t from-[#1261ab] to-[#2ec5f6] transition-all"
                    style={{
                      height: `${Math.max(4, (day.amountCents / maxChart) * 100)}%`,
                    }}
                    title={formatAdminMoney(day.amountCents)}
                  />
                </div>
                <span className="text-[10px] text-[#5a6b7d]">{day.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
          <h2 className="mb-4 font-[family-name:var(--font-lora)] text-xl text-[#0f2d52]">
            Top campaigns
          </h2>
          <div className="space-y-4">
            {data.topCampaigns.length === 0 ? (
              <p className="text-sm text-[#5a6b7d]">No campaigns yet.</p>
            ) : (
              data.topCampaigns.map((campaign) => (
                <div key={campaign.id}>
                  <div className="mb-1 flex justify-between text-sm">
                    <span className="font-medium text-[#0f2d52]">{campaign.title}</span>
                    <span className="text-[#5a6b7d]">{campaign.progressPercent}%</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-[#eef2f7]">
                    <div
                      className="h-full rounded-full bg-[#1261ab]"
                      style={{ width: `${campaign.progressPercent}%` }}
                    />
                  </div>
                  <p className="mt-1 text-xs text-[#5a6b7d]">
                    {formatAdminMoney(campaign.raisedCents)} of {formatAdminMoney(campaign.goalCents)}
                  </p>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <div className="rounded-xl border border-black/5 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-black/5 px-6 py-4">
            <h2 className="font-[family-name:var(--font-lora)] text-xl text-[#0f2d52]">
              Recent donations
            </h2>
            <Link href="/admin/donations" className="text-sm font-medium text-[#1261ab] hover:underline">
              View all
            </Link>
          </div>
          <div className="divide-y divide-black/5">
            {data.recentDonations.map((donation) => (
              <div key={donation.id} className="flex items-center justify-between px-6 py-4">
                <div>
                  <p className="font-medium text-[#0f2d52]">{donation.donorName}</p>
                  <p className="text-xs text-[#5a6b7d]">
                    {donation.campaignTitle ?? "General"} · {formatAdminDate(donation.createdAt)}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-[#0f2d52]">{formatAdminMoney(donation.amount)}</p>
                  <span
                    className={`text-xs capitalize ${
                      donation.status === "completed"
                        ? "text-[#00b388]"
                        : donation.status === "pending"
                          ? "text-amber-600"
                          : "text-red-600"
                    }`}
                  >
                    {donation.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-xl border border-black/5 bg-white shadow-sm">
          <div className="flex items-center justify-between border-b border-black/5 px-6 py-4">
            <h2 className="font-[family-name:var(--font-lora)] text-xl text-[#0f2d52]">
              Campaign performance
            </h2>
            <Link href="/admin/campaigns" className="text-sm font-medium text-[#1261ab] hover:underline">
              Manage
            </Link>
          </div>
          <div className="divide-y divide-black/5">
            {data.campaigns.slice(0, 6).map((campaign) => (
              <div key={campaign.id} className="px-6 py-4">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="font-medium text-[#0f2d52]">{campaign.title}</p>
                    <p className="mt-1 text-xs text-[#5a6b7d]">
                      {campaign.supporters} supporters · {campaign.daysLeft} days left
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-semibold text-[#0f2d52]">
                      {formatAdminMoney(campaign.raisedCents)}
                    </p>
                    <p className="text-xs text-[#5a6b7d]">of {formatAdminMoney(campaign.goalCents)}</p>
                  </div>
                </div>
                <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-[#eef2f7]">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-[#1261ab] to-[#2ec5f6]"
                    style={{ width: `${campaign.progressPercent}%` }}
                  />
                </div>
                <div className="mt-2 flex gap-2">
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-medium uppercase ${
                      campaign.isActive
                        ? "bg-green-100 text-green-700"
                        : "bg-gray-100 text-gray-600"
                    }`}
                  >
                    {campaign.isActive ? "Active" : "Inactive"}
                  </span>
                  {campaign.showOnBanner ? (
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium uppercase text-blue-700">
                      Banner
                    </span>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
