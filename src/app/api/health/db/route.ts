import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const [users, campaigns, donations] = await Promise.all([
      prisma.user.count(),
      prisma.campaign.count(),
      prisma.donation.count(),
    ]);

    return NextResponse.json({
      ok: true,
      database: "connected",
      users,
      campaigns,
      donations,
    });
  } catch (error) {
    console.error("Database health check failed:", error);
    return NextResponse.json(
      { ok: false, database: "disconnected", error: "Database connection failed." },
      { status: 503 },
    );
  }
}
