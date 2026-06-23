import { NextResponse } from "next/server";
import Stripe from "stripe";
import { auth } from "@/auth";
import { getBannerCampaigns } from "@/lib/campaigns";
import { MAX_DONATION, MIN_DONATION } from "@/lib/donations";
import { prisma } from "@/lib/prisma";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

function getStripe() {
  if (!stripeSecretKey) {
    return null;
  }
  return new Stripe(stripeSecretKey);
}

type DonationRequest = {
  amount?: number;
  firstName?: string;
  lastName?: string;
  email?: string;
  postAmount?: boolean;
  postName?: boolean;
  dedicationType?: string;
  dedicationName?: string;
  dedicationMessage?: string;
  campaignSlug?: string;
};

export async function POST(request: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json(
      { error: "Payment processing is not configured. Add STRIPE_SECRET_KEY to your environment." },
      { status: 503 },
    );
  }

  let body: DonationRequest;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const amount = Number(body.amount);
  const firstName = body.firstName?.trim() ?? "";
  const lastName = body.lastName?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const dedicationType = body.dedicationType ?? "no";
  const dedicationName = body.dedicationName?.trim() ?? "";
  const dedicationMessage = body.dedicationMessage?.trim() ?? "";

  if (!Number.isFinite(amount) || amount < MIN_DONATION || amount > MAX_DONATION) {
    return NextResponse.json(
      { error: `Donation must be between $${MIN_DONATION} and $${MAX_DONATION.toLocaleString()}.` },
      { status: 400 },
    );
  }

  if (!firstName || !lastName) {
    return NextResponse.json({ error: "First and last name are required." }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: "A valid email address is required." }, { status: 400 });
  }

  if ((dedicationType === "honor" || dedicationType === "memory") && !dedicationName) {
    return NextResponse.json(
      { error: "Please enter the name for your dedication." },
      { status: 400 },
    );
  }

  const amountCents = Math.round(amount * 100);
  const session = await auth();

  let campaignId: string | null = null;
  const campaignSlug = body.campaignSlug?.trim();

  if (campaignSlug) {
    const campaign = await prisma.campaign.findFirst({
      where: { slug: campaignSlug, isActive: true },
      select: { id: true },
    });
    campaignId = campaign?.id ?? null;
  } else {
    const bannerCampaigns = await getBannerCampaigns();
    campaignId = bannerCampaigns[0]?.id ?? null;
  }

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountCents,
      currency: "usd",
      receipt_email: email,
      automatic_payment_methods: { enabled: true },
      metadata: {
        userId: session?.user?.id ?? "",
        campaignId: campaignId ?? "",
        firstName,
        lastName,
        postAmount: String(Boolean(body.postAmount)),
        postName: String(Boolean(body.postName)),
        dedicationType,
        dedicationName,
        dedicationMessage,
      },
    });

    await prisma.donation.create({
      data: {
        userId: session?.user?.id ?? null,
        campaignId,
        donorEmail: email.toLowerCase(),
        donorFirstName: firstName,
        donorLastName: lastName,
        amount: amountCents,
        dedicationType,
        dedicationName: dedicationName || null,
        dedicationMessage: dedicationMessage || null,
        postAmount: Boolean(body.postAmount),
        postName: Boolean(body.postName),
        stripePaymentId: paymentIntent.id,
        status: "pending",
      },
    });

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unable to start payment.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
