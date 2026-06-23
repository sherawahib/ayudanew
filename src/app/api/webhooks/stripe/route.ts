import { NextResponse } from "next/server";
import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(request: Request) {
  if (!stripeSecretKey || !webhookSecret) {
    return NextResponse.json({ error: "Webhook not configured." }, { status: 503 });
  }

  const stripe = new Stripe(stripeSecretKey);
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature." }, { status: 400 });
  }

  const payload = await request.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(payload, signature, webhookSecret);
  } catch {
    return NextResponse.json({ error: "Invalid signature." }, { status: 400 });
  }

  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const email = paymentIntent.receipt_email?.toLowerCase();
    const userId = paymentIntent.metadata.userId || null;
    const campaignId = paymentIntent.metadata.campaignId || null;

    const donation = await prisma.donation.findUnique({
      where: { stripePaymentId: paymentIntent.id },
    });

    if (donation) {
      await prisma.donation.update({
        where: { id: donation.id },
        data: {
          status: "completed",
          userId: donation.userId ?? userId ?? undefined,
          campaignId: donation.campaignId ?? campaignId ?? undefined,
        },
      });
    } else if (email) {
      let linkedUserId = userId;
      if (!linkedUserId) {
        const user = await prisma.user.findUnique({ where: { email } });
        linkedUserId = user?.id ?? null;
      }

      await prisma.donation.create({
        data: {
          userId: linkedUserId,
          campaignId,
          donorEmail: email,
          donorFirstName: paymentIntent.metadata.firstName || null,
          donorLastName: paymentIntent.metadata.lastName || null,
          amount: paymentIntent.amount,
          dedicationType: paymentIntent.metadata.dedicationType || "no",
          dedicationName: paymentIntent.metadata.dedicationName || null,
          dedicationMessage: paymentIntent.metadata.dedicationMessage || null,
          postAmount: paymentIntent.metadata.postAmount === "true",
          postName: paymentIntent.metadata.postName === "true",
          stripePaymentId: paymentIntent.id,
          status: "completed",
        },
      });
    }
  }

  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    await prisma.donation.updateMany({
      where: { stripePaymentId: paymentIntent.id },
      data: { status: "failed" },
    });
  }

  return NextResponse.json({ received: true });
}
