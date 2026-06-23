import { NextResponse } from "next/server";
import { getActiveCampaignBySlug } from "@/lib/campaigns";

type RouteContext = {
  params: Promise<{ slug: string }>;
};

export async function GET(_request: Request, context: RouteContext) {
  const { slug } = await context.params;
  const campaign = await getActiveCampaignBySlug(slug);

  if (!campaign) {
    return NextResponse.json({ error: "Campaign not found." }, { status: 404 });
  }

  return NextResponse.json({ campaign });
}
