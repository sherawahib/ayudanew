import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { computeCampaignStats, slugify } from "@/lib/campaigns";
import { prisma } from "@/lib/prisma";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    return null;
  }
  return session;
}

export async function GET() {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const campaigns = await prisma.campaign.findMany({
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    include: {
      donations: {
        select: { amount: true, donorEmail: true, status: true },
      },
    },
  });

  return NextResponse.json({
    campaigns: campaigns.map(({ donations, ...campaign }) =>
      computeCampaignStats(campaign, donations),
    ),
  });
}

export async function POST(request: Request) {
  const session = await requireAdmin();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    title?: string;
    slug?: string;
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

  const title = body.title?.trim() ?? "";
  const goalDollars = Number(body.goalDollars);
  const startDate = body.startDate ? new Date(body.startDate) : null;
  const endDate = body.endDate ? new Date(body.endDate) : null;

  if (!title) {
    return NextResponse.json({ error: "Title is required." }, { status: 400 });
  }

  if (!Number.isFinite(goalDollars) || goalDollars <= 0) {
    return NextResponse.json({ error: "Goal must be greater than zero." }, { status: 400 });
  }

  if (!startDate || Number.isNaN(startDate.getTime())) {
    return NextResponse.json({ error: "Valid start date is required." }, { status: 400 });
  }

  if (!endDate || Number.isNaN(endDate.getTime())) {
    return NextResponse.json({ error: "Valid end date is required." }, { status: 400 });
  }

  if (endDate < startDate) {
    return NextResponse.json({ error: "End date must be after start date." }, { status: 400 });
  }

  const baseSlug = slugify(body.slug?.trim() || title);
  let slug = baseSlug || "campaign";
  let suffix = 1;

  while (await prisma.campaign.findUnique({ where: { slug } })) {
    slug = `${baseSlug}-${suffix}`;
    suffix += 1;
  }

  const campaign = await prisma.campaign.create({
    data: {
      title,
      slug,
      description: body.description?.trim() || null,
      goalCents: Math.round(goalDollars * 100),
      startDate,
      endDate,
      isActive: body.isActive ?? true,
      showOnBanner: body.showOnBanner ?? true,
      sortOrder: Number.isFinite(body.sortOrder) ? Number(body.sortOrder) : 0,
    },
    include: {
      donations: {
        select: { amount: true, donorEmail: true, status: true },
      },
    },
  });

  const { donations, ...rest } = campaign;
  return NextResponse.json({ campaign: computeCampaignStats(rest, donations) }, { status: 201 });
}
