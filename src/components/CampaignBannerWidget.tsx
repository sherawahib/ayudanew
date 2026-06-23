"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import type { CampaignStats } from "@/lib/campaigns";
import { formatCampaignMoney } from "@/lib/campaigns";
import { SITE } from "@/lib/site";

function shareUrl(slug: string) {
  if (typeof window === "undefined") {
    return `/donate?campaign=${slug}`;
  }
  return `${window.location.origin}/donate?campaign=${slug}`;
}

function ShareButtons({ slug, title }: { slug: string; title: string }) {
  const [url, setUrl] = useState(`/donate?campaign=${slug}`);

  useEffect(() => {
    setUrl(shareUrl(slug));
  }, [slug]);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(`Support ${title} — ${SITE.name}`);

  const items = [
    {
      label: "Facebook",
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: (
        <path d="M22 12a10 10 0 10-11.6 9.9v-7h-2.4V12h2.4V9.8c0-2.4 1.4-3.7 3.6-3.7 1 0 2 .2 2 .2v2.2h-1.1c-1.1 0-1.5.7-1.5 1.4V12h2.6l-.4 2.9h-2.2v7A10 10 0 0022 12z" />
      ),
    },
    {
      label: "X",
      href: `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <path d="M16.3 4h3.1l-6.8 7.8L20.5 20h-5.9l-4.6-5.4L4.8 20H1.7l7.3-8.4L3.5 4h6l4.2 4.9L16.3 4zm-1.1 14.3h1.7L7.1 5.6H5.3l10 12.7z" />,
    },
    {
      label: "LinkedIn",
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: (
        <path d="M6.5 8.2H3.4v12.1h3.1V8.2zM5 3.5a1.8 1.8 0 100 3.6 1.8 1.8 0 000-3.6zM21 20.3h-3.1v-5.9c0-1.4 0-3.2-2-3.2s-2.3 1.5-2.3 3.1v6H10.5V8.2h3v1.4h.1c.4-.8 1.5-1.7 3.1-1.7 3.3 0 3.9 2.2 3.9 5v7.4z" />
      ),
    },
    {
      label: "Email",
      href: `mailto:?subject=${encodedTitle}&body=${encodedUrl}`,
      icon: (
        <path d="M4 6h16a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2zm8 6.2L5.6 9.2h12.8L12 12.2zm-6-2.7v7.5h12V9.5l-6 4.7-6-4.7z" />
      ),
    },
  ];

  return (
    <div className="flex items-center gap-3">
      <span className="text-[11px] font-semibold uppercase tracking-[0.18em] text-white/70">
        Share:
      </span>
      <div className="flex items-center gap-2.5">
        {items.map((item) => (
          <a
            key={item.label}
            href={item.href}
            target={item.label === "Email" ? undefined : "_blank"}
            rel={item.label === "Email" ? undefined : "noopener noreferrer"}
            aria-label={`Share on ${item.label}`}
            className="text-white/85 transition-colors hover:text-white"
          >
            <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24" aria-hidden>
              {item.icon}
            </svg>
          </a>
        ))}
      </div>
    </div>
  );
}

function CampaignCard({ campaign }: { campaign: CampaignStats }) {
  return (
    <div className="w-full max-w-[320px] rounded-2xl bg-[#2c343a] p-4 text-white shadow-[0_20px_50px_rgba(0,0,0,0.35)] sm:p-5">
      <p className="mb-4 line-clamp-2 text-sm font-medium text-white/85">{campaign.title}</p>

      <div className="mb-5 h-2 overflow-hidden rounded-full bg-white/20">
        <div
          className="h-full rounded-full bg-[#2ec5f6] transition-all duration-700"
          style={{ width: `${Math.max(campaign.progressPercent, campaign.raisedCents > 0 ? 4 : 0)}%` }}
        />
      </div>

      <div className="mb-6">
        <p className="text-3xl font-semibold leading-none tracking-tight sm:text-4xl">
          {formatCampaignMoney(campaign.raisedCents)}
        </p>
        <p className="mt-2 text-xs text-white/75 sm:text-sm">
          raised towards {formatCampaignMoney(campaign.goalCents)} goal
        </p>
      </div>

      <div className="mb-6 grid grid-cols-2 gap-3 border-t border-white/10 pt-5 sm:gap-4">
        <div>
          <p className="text-2xl font-semibold leading-none sm:text-3xl">{campaign.supporters}</p>
          <p className="mt-1 text-xs text-white/70 sm:text-sm">Supporters</p>
        </div>
        <div>
          <p className="text-2xl font-semibold leading-none sm:text-3xl">{campaign.daysLeft}</p>
          <p className="mt-1 text-xs text-white/70 sm:text-sm">Days Left</p>
        </div>
      </div>

      <Link
        href={`/donate?campaign=${campaign.slug}`}
        className="mb-5 flex w-full items-center justify-center rounded-full bg-[#2ec5f6] py-3.5 text-base font-semibold text-[#0f2d52] transition-colors hover:bg-[#5ad4f8]"
      >
        Donate
      </Link>

      <ShareButtons slug={campaign.slug} title={campaign.title} />
    </div>
  );
}

export function CampaignBannerPanel() {
  const [campaigns, setCampaigns] = useState<CampaignStats[]>([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadCampaigns = useCallback(async () => {
    try {
      const response = await fetch("/api/campaigns/banner", { cache: "no-store" });
      const data = await response.json();
      if (response.ok) {
        setCampaigns(data.campaigns ?? []);
        setIndex(0);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadCampaigns();
    const interval = window.setInterval(loadCampaigns, 60000);
    return () => window.clearInterval(interval);
  }, [loadCampaigns]);

  useEffect(() => {
    if (campaigns.length <= 1) {
      return;
    }
    const interval = window.setInterval(() => {
      setIndex((current) => (current + 1) % campaigns.length);
    }, 10000);
    return () => window.clearInterval(interval);
  }, [campaigns.length]);

  if (loading || campaigns.length === 0) {
    return null;
  }

  const campaign = campaigns[index] ?? campaigns[0];

  if (campaigns.length > 1) {
    return (
      <div className="space-y-3">
        <CampaignCard campaign={campaign} />
        <div className="flex justify-center gap-2">
          {campaigns.map((item, itemIndex) => (
            <button
              key={item.id}
              type="button"
              aria-label={`Show campaign ${item.title}`}
              onClick={() => setIndex(itemIndex)}
              className={`h-2 w-2 rounded-full transition-colors ${
                itemIndex === index ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    );
  }

  return <CampaignCard campaign={campaign} />;
}

export default function CampaignBannerWidget() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20 flex items-center justify-center">
      <div className="container-ayuda flex w-full max-w-7xl items-center justify-center px-5 md:justify-end">
        <div className="pointer-events-auto hidden md:block">
          <CampaignBannerPanel />
        </div>
      </div>
    </div>
  );
}
