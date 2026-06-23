import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { computeCampaignStats } from "@/lib/campaigns";
import { prisma } from "@/lib/prisma";

type RouteContext = {
  params: Promise<{ id: string }>;
};

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    return null;
  }
  return session;
}

export async function GET(_request: Request, context: RouteContext) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;
  const campaign = await prisma.campaign.findUnique({
    where: { id },
    include: {
      donations: {
        select: { amount: true, donorEmail: true, status: true },
      },
    },
  });

  if (!campaign) {
    return NextResponse.json({ error: "Campaign not found." }, { status: 404 });
  }

  const { donations, ...rest } = campaign;
  return NextResponse.json({ campaign: computeCampaignStats(rest, donations) });
}

export async function PATCH(request: Request, context: RouteContext) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  let body: {
    title?: string;
    description?: string;
    goalDollars?: number;
    startDate?: string;
    endDate?: string;
    isActive?: boolean;
    showOnBanner?: boolean;
    sortOrder?: number;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const existing = await prisma.campaign.findUnique({ where: { id } });
  if (!existing) {
    return NextResponse.json({ error: "Campaign not found." }, { status: 404 });
  }

  const startDate = body.startDate ? new Date(body.startDate) : existing.startDate;
  const endDate = body.endDate ? new Date(body.endDate) : existing.endDate;

  if (Number.isNaN(startDate.getTime()) || Number.isNaN(endDate.getTime())) {
    return NextResponse.json({ error: "Invalid dates." }, { status: 400 });
  }

  if (endDate < startDate) {
    return NextResponse.json({ error: "End date must be after start date." }, { status: 400 });
  }

  const goalDollars = body.goalDollars ?? existing.goalCents / 100;
  if (!Number.isFinite(goalDollars) || goalDollars <= 0) {
    return NextResponse.json({ error: "Goal must be greater than zero." }, { status: 400 });
  }

  const campaign = await prisma.campaign.update({
    where: { id },
    data: {
      title: body.title?.trim() || existing.title,
      description: body.description !== undefined ? body.description.trim() || null : existing.description,
      goalCents: Math.round(goalDollars * 100),
      startDate,
      endDate,
      isActive: typeof body.isActive === "boolean" ? body.isActive : existing.isActive,
      showOnBanner:
        typeof body.showOnBanner === "boolean" ? body.showOnBanner : existing.showOnBanner,
      sortOrder: Number.isFinite(body.sortOrder) ? Number(body.sortOrder) : existing.sortOrder,
    },
    include: {
      donations: {
        select: { amount: true, donorEmail: true, status: true },
      },
    },
  });

  const { donations, ...rest } = campaign;
  return NextResponse.json({ campaign: computeCampaignStats(rest, donations) });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await context.params;

  await prisma.campaign.delete({ where: { id } });
  return NextResponse.json({ success: true });
}
