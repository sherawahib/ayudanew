"use client";

import { useCallback, useEffect, useState } from "react";
import { formatAdminDate, formatAdminMoney } from "@/lib/admin-stats";
import AdminPageHeader from "@/components/admin/AdminPageHeader";
import AdminStatCard from "@/components/admin/AdminStatCard";

type DonorRow = {
  id: string;
  email: string;
  name: string;
  accountType: string;
  orgName: string | null;
  postAmount: boolean;
  postName: boolean;
  registeredAt: string;
  donationCount: number;
  totalCents: number;
  lastDonation: string | null;
  isRegistered: boolean;
};

export default function AdminDonorsTable() {
  const [donors, setDonors] = useState<DonorRow[]>([]);
  const [stats, setStats] = useState({
    totalDonors: 0,
    registeredDonors: 0,
    guestDonors: 0,
    totalRaisedCents: 0,
  });
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const params = new URLSearchParams();
    if (search) params.set("search", search);
    const response = await fetch(`/api/admin/donors?${params}`);
    const data = await response.json();
    if (response.ok) {
      setDonors(data.donors);
      setStats(data.stats);
    }
    setLoading(false);
  }, [search]);

  useEffect(() => {
    const timer = window.setTimeout(load, 300);
    return () => window.clearTimeout(timer);
  }, [load]);

  return (
    <div className="space-y-6">
      <AdminPageHeader
        title="Donors"
        description="Registered accounts and guest donors with lifetime giving totals."
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Total donors" value={String(stats.totalDonors)} accent="blue" />
        <AdminStatCard
          label="Registered"
          value={String(stats.registeredDonors)}
          hint="Portal accounts"
          accent="green"
        />
        <AdminStatCard
          label="Guest donors"
          value={String(stats.guestDonors)}
          hint="Gave without account"
          accent="amber"
        />
        <AdminStatCard
          label="Lifetime giving"
          value={formatAdminMoney(stats.totalRaisedCents)}
          accent="purple"
        />
      </div>

      <div className="rounded-xl border border-black/5 bg-white p-4 shadow-sm">
        <input
          type="search"
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md rounded-lg border border-black/10 px-3 py-2 text-sm outline-none focus:border-[#1261ab]"
        />
      </div>

      <div className="overflow-hidden rounded-xl border border-black/5 bg-white shadow-sm">
        <div className="overflow-x-auto">
          <table className="min-w-full text-left text-sm">
            <thead className="bg-[#f8fafc] text-xs uppercase tracking-wider text-[#5a6b7d]">
              <tr>
                <th className="px-4 py-3 font-semibold">Donor</th>
                <th className="px-4 py-3 font-semibold">Type</th>
                <th className="px-4 py-3 font-semibold">Gifts</th>
                <th className="px-4 py-3 font-semibold">Lifetime</th>
                <th className="px-4 py-3 font-semibold">Public profile</th>
                <th className="px-4 py-3 font-semibold">Last gift</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#5a6b7d]">
                    Loading donors…
                  </td>
                </tr>
              ) : donors.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center text-[#5a6b7d]">
                    No donors found.
                  </td>
                </tr>
              ) : (
                donors.map((donor) => (
                  <tr key={donor.id} className="border-t border-black/5 hover:bg-[#fafafa]">
                    <td className="px-4 py-3">
                      <p className="font-medium text-[#0f2d52]">{donor.name}</p>
                      <p className="text-xs text-[#5a6b7d]">{donor.email}</p>
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-medium capitalize ${
                          donor.isRegistered
                            ? "bg-blue-100 text-blue-800"
                            : "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {donor.isRegistered ? donor.accountType : "guest"}
                      </span>
                    </td>
                    <td className="px-4 py-3">{donor.donationCount}</td>
                    <td className="px-4 py-3 font-semibold">
                      {formatAdminMoney(donor.totalCents)}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#5a6b7d]">
                      {donor.isRegistered ? (
                        <>
                          {donor.postName ? "Name" : "—"}
                          {donor.postName && donor.postAmount ? " · " : ""}
                          {donor.postAmount ? "Amount" : ""}
                        </>
                      ) : (
                        "—"
                      )}
                    </td>
                    <td className="px-4 py-3 text-xs text-[#5a6b7d]">
                      {donor.lastDonation ? formatAdminDate(donor.lastDonation) : "—"}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
