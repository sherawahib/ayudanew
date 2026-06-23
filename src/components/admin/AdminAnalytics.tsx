"use client";

import { useCallback, useEffect, useState } from "react";
import type { AdminDashboardData } from "@/lib/admin-stats";
import { formatAdminMoney } from "@/lib/admin-stats";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";

export default function AdminAnalytics() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const response = await fetch("/api/admin/dashboard", { cache: "no-store" });
    const json = await response.json();
    if (response.ok) setData(json);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  if (loading || !data) {
    return <p className="text-sm text-[#5a6b7d]">Loading analytics…</p>;
  }

  const total14Days = data.chartData.reduce((sum, d) => sum + d.amountCents, 0);
  const totalGifts14 = data.chartData.reduce((sum, d) => sum + d.count, 0);
  const maxChart = Math.max(...data.chartData.map((d) => d.amountCents), 1);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Analytics"
        description="Fundraising trends, campaign breakdowns, and performance insights."
        actions={
          <button
            type="button"
            onClick={load}
            className="rounded-lg border border-[#1261ab]/30 bg-white px-4 py-2 text-sm font-medium text-[#1261ab] hover:bg-[#1261ab] hover:text-white"
          >
            Refresh
          </button>
        }
      />

      <div className="grid gap-4 sm:grid-cols-3">
        <AdminStatCard
          label="14-day revenue"
          value={formatAdminMoney(total14Days)}
          hint={`${totalGifts14} gifts`}
          accent="green"
        />
        <AdminStatCard
          label="Conversion rate"
          value={
            data.stats.totalDonations > 0
              ? `${Math.round((data.stats.completedDonations / data.stats.totalDonations) * 100)}%`
              : "0%"
          }
          hint="Completed vs all attempts"
          accent="blue"
        />
        <AdminStatCard
          label="Recurring supporters"
          value={String(data.stats.totalDonors)}
          hint="Unique completed donors"
          accent="purple"
        />
      </div>

      <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="mb-6 font-[family-name:var(--font-lora)] text-xl text-[#0f2d52]">
          Daily revenue (14 days)
        </h2>
        <div className="space-y-3">
          {data.chartData.map((day) => (
            <div key={day.label} className="flex items-center gap-4">
              <span className="w-16 shrink-0 text-xs text-[#5a6b7d]">{day.label}</span>
              <div className="flex-1">
                <div className="h-8 overflow-hidden rounded-lg bg-[#eef2f7]">
                  <div
                    className="flex h-full items-center rounded-lg bg-gradient-to-r from-[#1261ab] to-[#2ec5f6] px-2 text-xs font-medium text-white"
                    style={{
                      width: `${Math.max(day.amountCents > 0 ? 8 : 0, (day.amountCents / maxChart) * 100)}%`,
                      minWidth: day.amountCents > 0 ? "4rem" : "0",
                    }}
                  >
                    {day.amountCents > 0 ? formatAdminMoney(day.amountCents) : ""}
                  </div>
                </div>
              </div>
              <span className="w-12 shrink-0 text-right text-xs text-[#5a6b7d]">
                {day.count} gifts
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-black/5 bg-white p-6 shadow-sm">
        <h2 className="mb-4 font-[family-name:var(--font-lora)] text-xl text-[#0f2d52]">
          Campaign breakdown
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-xs uppercase tracking-wider text-[#5a6b7d]">
              <tr>
                <th className="pb-3 text-left font-semibold">Campaign</th>
                <th className="pb-3 text-left font-semibold">Raised</th>
                <th className="pb-3 text-left font-semibold">Goal</th>
                <th className="pb-3 text-left font-semibold">Progress</th>
                <th className="pb-3 text-left font-semibold">Supporters</th>
                <th className="pb-3 text-left font-semibold">Days left</th>
              </tr>
            </thead>
            <tbody>
              {data.campaigns.map((campaign) => (
                <tr key={campaign.id} className="border-t border-black/5">
                  <td className="py-3 font-medium text-[#0f2d52]">{campaign.title}</td>
                  <td className="py-3">{formatAdminMoney(campaign.raisedCents)}</td>
                  <td className="py-3">{formatAdminMoney(campaign.goalCents)}</td>
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-24 overflow-hidden rounded-full bg-[#eef2f7]">
                        <div
                          className="h-full bg-[#1261ab]"
                          style={{ width: `${campaign.progressPercent}%` }}
                        />
                      </div>
                      <span className="text-xs">{campaign.progressPercent}%</span>
                    </div>
                  </td>
                  <td className="py-3">{campaign.supporters}</td>
                  <td className="py-3">{campaign.daysLeft}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
