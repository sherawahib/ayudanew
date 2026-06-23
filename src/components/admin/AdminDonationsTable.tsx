"use client";

import { useCallback, useEffect, useState } from "react";
import { formatAdminDate, formatAdminMoney } from "@/lib/admin-stats";
import AdminPageHeader from "@/components/admin/AdminPageHeader";

type DonationRow = {
  id: string;
  amount: number;
  status: string;
  donorEmail: string;
  donorFirstName: string | null;
  donorLastName: string | null;
  campaign: { id: string; title: string; slug: string } | null;
  dedicationType: string;
  dedicationName: string | null;
  postAmount: boolean;
  postName: boolean;
  createdAt: string;
};

type CampaignOption = { id: string; title: string };

export default function AdminDonationsTable({
  campaigns = [],
}: {
  campaigns?: CampaignOption[];
}) {
  const [donations, setDonations] = useState<DonationRow[]>([]);
  const [summary, setSummary] = useState({ totalCents: 0, completed: 0, pending: 0, failed: 0 });
  const [page, setPage] = useState(1);
  const [pagination, setPagination] = useState({ pages: 1, total: 0 });
  const [status, setStatus] = useState("");
  const [campaignId, setCampaignId] = useState("");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams({ page: String(page) });
    if (status) params.set("status", status);
    if (campaignId) params.set("campaignId", campaignId);
    if (search) params.set("search", search);

    const response = await fetch(`/api/admin/donations?${params}`);
    const data = await response.json();
    if (response.ok) {
      setDonations(data.donations);
      setSummary(data.summary);
      setPagination(data.pagination);
    }
    setLoading(false);
  }, [status, campaignId, search, page]);

  useEffect(() => {
    load();
  }, [load]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Donations"
        description="Track every gift, filter by campaign or status, and monitor payment flow."
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

      <div className="grid gap-4 sm:grid-cols-4">
        {[
          { label: "Total value", value: formatAdminMoney(summary.totalCents) },
          { label: "Completed", value: String(summary.completed) },
          { label: "Pending", value: String(summary.pending) },
          { label: "Failed", value: String(summary.failed) },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
            <p className="text-xs uppercase tracking-wider text-[#5a6b7d]">{item.label}</p>
            <p className="mt-1 text-2xl font-semibold text-[#0f2d52]">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
        <div className="grid gap-3 md:grid-cols-4">
          <input
            type="search"
            placeholder="Search donor, email, campaign…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#1261ab]"
          />
          <select
            value={status}
            onChange={(e) => {
              setStatus(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#1261ab]"
          >
            <option value="">All statuses</option>
            <option value="completed">Completed</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>
          <select
            value={campaignId}
            onChange={(e) => {
              setCampaignId(e.target.value);
              setPage(1);
            }}
            className="rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#1261ab]"
          >
            <option value="">All campaigns</option>
            {campaigns.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#f8fafc] text-xs uppercase tracking-wider text-[#5a6b7d]">
              <tr>
                <th className="px-4 py-3 font-semibold">Donor</th>
                <th className="px-4 py-3 font-semibold">Amount</th>
                <th className="px-4 py-3 font-semibold">Campaign</th>
                <th className="px-4 py-3 font-semibold">Dedication</th>
                <th className="px-4 py-3 font-semibold">Privacy</th>
                <th className="px-4 py-3 font-semibold">Status</th>
                <th className="px-4 py-3 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-[#5a6b7d]">
                    Loading donations…
                  </td>
                </tr>
              ) : donations.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-8 text-center text-[#5a6b7d]">
                    No donations found.
                  </td>
                </tr>
              ) : (
                donations.map((donation) => (
                  <tr key={donation.id} className="border-t border-black/5 hover:bg-[#fafafa]">
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#0f2d52]">
                        {[donation.donorFirstName, donation.donorLastName]
                          .filter(Boolean)
                          .join(" ") || "—"}
                      </p>
                      <p className="text-xs text-[#5a6b7d]">{donation.donorEmail}</p>
                    </td>
                    <td className="px-4 py-3 font-semibold">{formatAdminMoney(donation.amount)}</td>
                    <td className="px-4 py-3 text-[#5a6b7d]">
                      {donation.campaign?.title ?? "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#5a6b7d]">
                      {donation.dedicationType === "honor"
                        ? `Honor: ${donation.dedicationName}`
                        : donation.dedicationType === "memory"
                          ? `Memory: ${donation.dedicationName}`
                          : "—"}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#5a6b7d]">
                      {donation.postName ? "Name" : "—"}
                      {donation.postName && donation.postAmount ? " · " : ""}
                      {donation.postAmount ? "Amount" : ""}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2.5 py-1 text-xs font-medium capitalize ${
                          donation.status === "completed"
                            ? "bg-green-100 text-green-800"
                            : donation.status === "pending"
                              ? "bg-amber-100 text-amber-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {donation.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-[#5a6b7d]">
                      {formatAdminDate(donation.createdAt)}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {pagination.pages > 1 ? (
          <div className="flex items-center justify-between border-t border-black/5 px-4 py-3">
            <p className="text-xs text-[#5a6b7d]">
              Page {page} of {pagination.pages} · {pagination.total} total
            </p>
            <div className="flex gap-2">
              <button
                type="button"
                disabled={page <= 1}
                onClick={() => setPage((p) => p - 1)}
                className="rounded border px-3 py-1 text-xs disabled:opacity-40"
              >
                Previous
              </button>
              <button
                type="button"
                disabled={page >= pagination.pages}
                onClick={() => setPage((p) => p + 1)}
                className="rounded border px-3 py-1 text-xs disabled:opacity-40"
              >
                Next
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}
