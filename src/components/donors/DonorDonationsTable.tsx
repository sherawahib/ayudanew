"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type DonationRow = {
  id: string;
  amount: number;
  currency: string;
  status: string;
  dedicationType: string;
  dedicationName: string | null;
  createdAt: string;
};

function formatMoney(cents: number, currency = "usd") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
  }).format(cents / 100);
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

export default function DonorDonationsTable({ compact = false }: { compact?: boolean }) {
  const [donations, setDonations] = useState<DonationRow[]>([]);
  const [totalCents, setTotalCents] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const response = await fetch("/api/donors/donations");
        const data = await response.json();
        if (response.ok) {
          setDonations(compact ? data.donations.slice(0, 5) : data.donations);
          setTotalCents(data.stats.totalCents);
        }
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [compact]);

  if (loading) {
    return <p className="text-sm text-ayuda-gray">Loading donations…</p>;
  }

  if (donations.length === 0) {
    return (
      <div className="rounded-md border border-dashed border-black/15 bg-[#fafafa] p-8 text-center">
        <p className="font-[family-name:var(--font-lora)] text-lg text-[#0f2d52]">No donations yet</p>
        <p className="mt-2 text-sm text-ayuda-gray">
          When you give through our site, your gifts will appear here.
        </p>
        <Link
          href="/donate"
          className="mt-5 inline-block bg-ayuda-blue px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-ayuda-blue-dark"
        >
          Donate now
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {!compact ? (
        <p className="text-sm text-ayuda-gray">
          Lifetime giving:{" "}
          <span className="font-semibold text-[#0f2d52]">{formatMoney(totalCents)}</span>
        </p>
      ) : null}

      <div className="overflow-x-auto rounded-md border border-black/10 bg-white shadow-sm">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-black/8 bg-[#f8fafc] text-xs uppercase tracking-wider text-ayuda-gray">
            <tr>
              <th className="px-4 py-3 font-semibold">Date</th>
              <th className="px-4 py-3 font-semibold">Amount</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              {!compact ? <th className="px-4 py-3 font-semibold">Dedication</th> : null}
            </tr>
          </thead>
          <tbody>
            {donations.map((donation) => (
              <tr key={donation.id} className="border-b border-black/6 last:border-0">
                <td className="px-4 py-3 text-[#0f2d52]">{formatDate(donation.createdAt)}</td>
                <td className="px-4 py-3 font-medium">{formatMoney(donation.amount, donation.currency)}</td>
                <td className="px-4 py-3 capitalize text-ayuda-gray">{donation.status}</td>
                {!compact ? (
                  <td className="px-4 py-3 text-ayuda-gray">
                    {donation.dedicationType === "honor"
                      ? `In honor of ${donation.dedicationName}`
                      : donation.dedicationType === "memory"
                        ? `In memory of ${donation.dedicationName}`
                        : "—"}
                  </td>
                ) : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
