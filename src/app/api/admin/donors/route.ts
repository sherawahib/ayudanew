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
  const search = searchParams.get("search")?.trim().toLowerCase();

  const [users, donationGroups] = await Promise.all([
    prisma.user.findMany({
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        name: true,
        accountType: true,
        orgName: true,
        postAmount: true,
        postName: true,
        createdAt: true,
        _count: { select: { donations: true } },
      },
    }),
    prisma.donation.groupBy({
      by: ["donorEmail"],
      where: { status: "completed" },
      _sum: { amount: true },
      _count: { id: true },
      _max: { createdAt: true },
    }),
  ]);

  const donationMap = new Map(
    donationGroups.map((group) => [
      group.donorEmail.toLowerCase(),
      {
        totalCents: group._sum.amount ?? 0,
        donationCount: group._count.id,
        lastDonation: group._max.createdAt,
      },
    ]),
  );

  let donors = users.map((user) => {
    const giving = donationMap.get(user.email.toLowerCase());
    return {
      id: user.id,
      email: user.email,
      name: user.name ?? `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim(),
      accountType: user.accountType,
      orgName: user.orgName,
      postAmount: user.postAmount,
      postName: user.postName,
      registeredAt: user.createdAt.toISOString(),
      donationCount: giving?.donationCount ?? user._count.donations,
      totalCents: giving?.totalCents ?? 0,
      lastDonation: giving?.lastDonation?.toISOString() ?? null,
      isRegistered: true,
    };
  });

  const registeredEmails = new Set(users.map((u) => u.email.toLowerCase()));
  for (const [email, giving] of donationMap) {
    if (!registeredEmails.has(email)) {
      donors.push({
        id: email,
        email,
        name: email,
        accountType: "guest",
        orgName: null,
        postAmount: true,
        postName: true,
        registeredAt: "",
        donationCount: giving.donationCount,
        totalCents: giving.totalCents,
        lastDonation: giving.lastDonation?.toISOString() ?? null,
        isRegistered: false,
      });
    }
  }

  donors.sort((a, b) => b.totalCents - a.totalCents);

  if (search) {
    donors = donors.filter(
      (donor) =>
        donor.email.toLowerCase().includes(search) ||
        donor.name.toLowerCase().includes(search),
    );
  }

  const stats = {
    totalDonors: donors.length,
    registeredDonors: donors.filter((d) => d.isRegistered).length,
    guestDonors: donors.filter((d) => !d.isRegistered).length,
    totalRaisedCents: donors.reduce((sum, d) => sum + d.totalCents, 0),
  };

  return NextResponse.json({ donors, stats });
}
