import { NextResponse } from "next/server";
import { getBannerCampaigns } from "@/lib/campaigns";

export async function GET() {
  const campaigns = await getBannerCampaigns();
  return NextResponse.json({ campaigns });
}
