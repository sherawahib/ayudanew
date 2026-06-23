import type { Campaign, Donation } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export type CampaignStats = {
  id: string;
  title: string;
  slug: string;
  description: string | null;
  goalCents: number;
  raisedCents: number;
  supporters: number;
  daysLeft: number;
  progressPercent: number;
  startDate: string;
  endDate: string;
  isActive: boolean;
  showOnBanner: boolean;
  sortOrder: number;
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function computeDaysLeft(endDate: Date, now = new Date()) {
  const diffMs = endDate.getTime() - now.getTime();
  return Math.max(0, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

export function computeCampaignStats(
  campaign: Campaign,
  donations: Pick<Donation, "amount" | "donorEmail" | "status">[],
  now = new Date(),
): CampaignStats {
  const completed = donations.filter((donation) => donation.status === "completed");
  const raisedCents = completed.reduce((sum, donation) => sum + donation.amount, 0);
  const supporters = new Set(completed.map((donation) => donation.donorEmail.toLowerCase())).size;
  const progressPercent =
    campaign.goalCents > 0 ? Math.min(100, Math.round((raisedCents / campaign.goalCents) * 100)) : 0;

  return {
    id: campaign.id,
    title: campaign.title,
    slug: campaign.slug,
    description: campaign.description,
    goalCents: campaign.goalCents,
    raisedCents,
    supporters,
    daysLeft: computeDaysLeft(campaign.endDate, now),
    progressPercent,
    startDate: campaign.startDate.toISOString(),
    endDate: campaign.endDate.toISOString(),
    isActive: campaign.isActive,
    showOnBanner: campaign.showOnBanner,
    sortOrder: campaign.sortOrder,
  };
}

export async function getCampaignStatsById(campaignId: string) {
  const campaign = await prisma.campaign.findUnique({
    where: { id: campaignId },
    include: {
      donations: {
        select: { amount: true, donorEmail: true, status: true },
      },
    },
  });

  if (!campaign) {
    return null;
  }

  const { donations, ...rest } = campaign;
  return computeCampaignStats(rest, donations);
}

export async function getBannerCampaigns() {
  const now = new Date();
  const campaigns = await prisma.campaign.findMany({
    where: {
      isActive: true,
      showOnBanner: true,
      startDate: { lte: now },
      endDate: { gte: now },
    },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: {
      donations: {
        select: { amount: true, donorEmail: true, status: true },
      },
    },
  });

  return campaigns.map(({ donations, ...campaign }) =>
    computeCampaignStats(campaign, donations),
  );
}

export async function getActiveCampaignBySlug(slug: string) {
  const campaign = await prisma.campaign.findFirst({
    where: {
      slug,
      isActive: true,
    },
    include: {
      donations: {
        select: { amount: true, donorEmail: true, status: true },
      },
    },
  });

  if (!campaign) {
    return null;
  }

  const { donations, ...rest } = campaign;
  return computeCampaignStats(rest, donations);
}

export function formatCampaignMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
