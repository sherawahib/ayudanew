import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { prisma } from "@/lib/prisma";

export async function GET(request: Request) {
  const session = await auth();
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status");
  const campaignId = searchParams.get("campaignId");
  const search = searchParams.get("search")?.trim().toLowerCase();
  const page = Math.max(1, Number(searchParams.get("page") ?? 1));
  const limit = Math.min(50, Math.max(10, Number(searchParams.get("limit") ?? 20)));
  const skip = (page - 1) * limit;

  const donations = await prisma.donation.findMany({
    where: {
      ...(status ? { status } : {}),
      ...(campaignId ? { campaignId } : {}),
    },
    orderBy: { createdAt: "desc" },
    include: {
      campaign: { select: { id: true, title: true, slug: true } },
      user: { select: { id: true, name: true, email: true } },
    },
  });

  const filtered = search
    ? donations.filter((donation) => {
        const haystack = [
          donation.donorEmail,
          donation.donorFirstName,
          donation.donorLastName,
          donation.campaign?.title,
          donation.stripePaymentId,
        ]
          .filter(Boolean)
          .join(" ")
          .toLowerCase();
        return haystack.includes(search);
      })
    : donations;

  const total = filtered.length;
  const pageItems = filtered.slice(skip, skip + limit);

  const summary = {
    totalCents: filtered
      .filter((d) => d.status === "completed")
      .reduce((sum, d) => sum + d.amount, 0),
    completed: filtered.filter((d) => d.status === "completed").length,
    pending: filtered.filter((d) => d.status === "pending").length,
    failed: filtered.filter((d) => d.status === "failed").length,
  };

  return NextResponse.json({
    donations: pageItems.map((d) => ({
      id: d.id,
      amount: d.amount,
      status: d.status,
      donorEmail: d.donorEmail,
      donorFirstName: d.donorFirstName,
      donorLastName: d.donorLastName,
      campaign: d.campaign,
      dedicationType: d.dedicationType,
      dedicationName: d.dedicationName,
      postAmount: d.postAmount,
      postName: d.postName,
      stripePaymentId: d.stripePaymentId,
      createdAt: d.createdAt.toISOString(),
    })),
    pagination: { page, limit, total, pages: Math.ceil(total / limit) },
    summary,
  });
}
