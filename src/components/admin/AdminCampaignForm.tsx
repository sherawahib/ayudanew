"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";

const inputClass =
  "w-full rounded-sm border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-ayuda-blue focus:ring-2 focus:ring-ayuda-blue/20";

export type CampaignFormValues = {
  title: string;
  description: string;
  goalDollars: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
  showOnBanner: boolean;
  sortOrder: string;
};

type AdminCampaignFormProps = {
  initial?: Partial<CampaignFormValues>;
  submitLabel: string;
  onSubmit: (values: CampaignFormValues) => Promise<void>;
};

export default function AdminCampaignForm({
  initial,
  submitLabel,
  onSubmit,
}: AdminCampaignFormProps) {
  const [values, setValues] = useState<CampaignFormValues>({
    title: initial?.title ?? "",
    description: initial?.description ?? "",
    goalDollars: initial?.goalDollars ?? "40000",
    startDate: initial?.startDate ?? new Date().toISOString().slice(0, 10),
    endDate:
      initial?.endDate ??
      new Date(Date.now() + 1000 * 60 * 60 * 24 * 90).toISOString().slice(0, 10),
    isActive: initial?.isActive ?? true,
    showOnBanner: initial?.showOnBanner ?? true,
    sortOrder: initial?.sortOrder ?? "0",
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await onSubmit(values);
    } catch (submitError) {
      setError(submitError instanceof Error ? submitError.message : "Unable to save campaign.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5 rounded-xl border border-black/5 bg-white p-6 shadow-sm lg:p-8">
      <div>
        <label htmlFor="title" className="mb-1.5 block text-sm font-medium">
          Campaign title
        </label>
        <input
          id="title"
          required
          value={values.title}
          onChange={(event) => setValues((current) => ({ ...current, title: event.target.value }))}
          className={inputClass}
        />
      </div>

      <div>
        <label htmlFor="description" className="mb-1.5 block text-sm font-medium">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          value={values.description}
          onChange={(event) =>
            setValues((current) => ({ ...current, description: event.target.value }))
          }
          className={inputClass}
        />
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="goal" className="mb-1.5 block text-sm font-medium">
            Fundraising goal (USD)
          </label>
          <input
            id="goal"
            type="number"
            min="1"
            step="1"
            required
            value={values.goalDollars}
            onChange={(event) =>
              setValues((current) => ({ ...current, goalDollars: event.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="sort-order" className="mb-1.5 block text-sm font-medium">
            Banner sort order
          </label>
          <input
            id="sort-order"
            type="number"
            value={values.sortOrder}
            onChange={(event) =>
              setValues((current) => ({ ...current, sortOrder: event.target.value }))
            }
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label htmlFor="start-date" className="mb-1.5 block text-sm font-medium">
            Start date
          </label>
          <input
            id="start-date"
            type="date"
            required
            value={values.startDate}
            onChange={(event) =>
              setValues((current) => ({ ...current, startDate: event.target.value }))
            }
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="end-date" className="mb-1.5 block text-sm font-medium">
            End date
          </label>
          <input
            id="end-date"
            type="date"
            required
            value={values.endDate}
            onChange={(event) =>
              setValues((current) => ({ ...current, endDate: event.target.value }))
            }
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={values.isActive}
            onChange={(event) =>
              setValues((current) => ({ ...current, isActive: event.target.checked }))
            }
            className="h-4 w-4 accent-ayuda-blue"
          />
          Campaign is active
        </label>
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={values.showOnBanner}
            onChange={(event) =>
              setValues((current) => ({ ...current, showOnBanner: event.target.checked }))
            }
            className="h-4 w-4 accent-ayuda-blue"
          />
          Show on homepage banner
        </label>
      </div>

      {error ? (
        <p className="rounded-sm border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      ) : null}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={loading}
          className="bg-ayuda-blue px-6 py-3 text-sm font-semibold uppercase tracking-wide text-white hover:bg-ayuda-blue-dark disabled:opacity-60"
        >
          {loading ? "Saving…" : submitLabel}
        </button>
        <Link href="/admin/campaigns" className="text-sm text-ayuda-blue hover:underline">
          Cancel
        </Link>
      </div>
    </form>
  );
}
