import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id || !session.user.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const donations = await prisma.donation.findMany({
    where: {
      OR: [{ userId: session.user.id }, { donorEmail: session.user.email.toLowerCase() }],
    },
    orderBy: { createdAt: "desc" },
    take: 100,
  });

  const linked = donations.filter((donation) => !donation.userId);
  if (linked.length > 0) {
    await prisma.donation.updateMany({
      where: {
        id: { in: linked.map((donation) => donation.id) },
      },
      data: { userId: session.user.id },
    });
  }

  const totalCents = donations
    .filter((donation) => donation.status === "completed")
    .reduce((sum, donation) => sum + donation.amount, 0);

  return NextResponse.json({
    donations,
    stats: {
      totalCents,
      count: donations.filter((donation) => donation.status === "completed").length,
    },
  });
}
