import { prisma } from "@/lib/prisma";
import { computeCampaignStats } from "@/lib/campaigns";

export type AdminDashboardData = {
  stats: {
    totalRaisedCents: number;
    totalDonations: number;
    completedDonations: number;
    pendingDonations: number;
    totalDonors: number;
    registeredUsers: number;
    activeCampaigns: number;
    avgDonationCents: number;
  };
  campaigns: ReturnType<typeof computeCampaignStats>[];
  recentDonations: {
    id: string;
    amount: number;
    status: string;
    donorName: string;
    donorEmail: string;
    campaignTitle: string | null;
    createdAt: string;
  }[];
  chartData: { label: string; amountCents: number; count: number }[];
  topCampaigns: { id: string; title: string; raisedCents: number; goalCents: number; progressPercent: number }[];
};

export async function getAdminDashboardData(): Promise<AdminDashboardData> {
  const now = new Date();
  const thirtyDaysAgo = new Date(now);
  thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

  const [donations, campaigns, registeredUsers] = await Promise.all([
    prisma.donation.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        campaign: { select: { title: true } },
        user: { select: { firstName: true, lastName: true, name: true } },
      },
    }),
    prisma.campaign.findMany({
      orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
      include: {
        donations: { select: { amount: true, donorEmail: true, status: true } },
      },
    }),
    prisma.user.count(),
  ]);

  const completed = donations.filter((d) => d.status === "completed");
  const pending = donations.filter((d) => d.status === "pending");
  const totalRaisedCents = completed.reduce((sum, d) => sum + d.amount, 0);
  const uniqueDonorEmails = new Set(completed.map((d) => d.donorEmail.toLowerCase()));

  const campaignStats = campaigns.map(({ donations: campaignDonations, ...campaign }) =>
    computeCampaignStats(campaign, campaignDonations),
  );

  const activeCampaigns = campaignStats.filter((c) => c.isActive).length;

  const chartDays = 14;
  const chartData: AdminDashboardData["chartData"] = [];
  for (let i = chartDays - 1; i >= 0; i--) {
    const day = new Date(now);
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() - i);
    const nextDay = new Date(day);
    nextDay.setDate(nextDay.getDate() + 1);

    const dayDonations = completed.filter(
      (d) => d.createdAt >= day && d.createdAt < nextDay,
    );
    chartData.push({
      label: day.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
      amountCents: dayDonations.reduce((sum, d) => sum + d.amount, 0),
      count: dayDonations.length,
    });
  }

  const recentDonations = donations.slice(0, 8).map((d) => ({
    id: d.id,
    amount: d.amount,
    status: d.status,
    donorName:
      [d.donorFirstName, d.donorLastName].filter(Boolean).join(" ") ||
      d.user?.name ||
      "Anonymous",
    donorEmail: d.donorEmail,
    campaignTitle: d.campaign?.title ?? null,
    createdAt: d.createdAt.toISOString(),
  }));

  const topCampaigns = [...campaignStats]
    .sort((a, b) => b.raisedCents - a.raisedCents)
    .slice(0, 5)
    .map((c) => ({
      id: c.id,
      title: c.title,
      raisedCents: c.raisedCents,
      goalCents: c.goalCents,
      progressPercent: c.progressPercent,
    }));

  return {
    stats: {
      totalRaisedCents,
      totalDonations: donations.length,
      completedDonations: completed.length,
      pendingDonations: pending.length,
      totalDonors: uniqueDonorEmails.size,
      registeredUsers,
      activeCampaigns,
      avgDonationCents:
        completed.length > 0 ? Math.round(totalRaisedCents / completed.length) : 0,
    },
    campaigns: campaignStats,
    recentDonations,
    chartData,
    topCampaigns,
  };
}

export function formatAdminMoney(cents: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}

export function formatAdminDate(value: string | Date) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(value));
}
