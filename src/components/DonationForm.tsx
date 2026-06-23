"use client";

import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { loadStripe, type StripeElementsOptions } from "@stripe/stripe-js";
import { FormEvent, useEffect, useMemo, useState } from "react";
import {
  DEDICATION_OPTIONS,
  DONATION_PRESETS,
  type DedicationType,
  type DonationFormData,
} from "@/lib/donations";
import type { CampaignStats } from "@/lib/campaigns";
import { formatCampaignMoney } from "@/lib/campaigns";

const stripePublishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "";
const stripePromise = stripePublishableKey ? loadStripe(stripePublishableKey) : null;

const inputClass =
  "w-full rounded-sm border border-black/15 bg-white px-4 py-3 text-sm text-black outline-none transition-colors focus:border-ayuda-blue focus:ring-2 focus:ring-ayuda-blue/20";

const labelClass = "mb-1.5 block text-sm font-medium text-black";

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount);
}

function PaymentFormInner({
  amount,
  onBack,
}: {
  amount: number;
  onBack: () => void;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState<string | null>(null);
  const [processing, setProcessing] = useState(false);

  async function handlePayment(event: FormEvent) {
    event.preventDefault();
    if (!stripe || !elements) {
      return;
    }

    setProcessing(true);
    setError(null);

    const { error: submitError } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/donate/success`,
      },
    });

    if (submitError) {
      setError(submitError.message ?? "Payment could not be completed.");
      setProcessing(false);
    }
  }

  return (
    <form onSubmit={handlePayment} className="space-y-6">
      <div className="rounded-sm border border-black/10 bg-white p-5 md:p-6">
        <h3 className="mb-1 font-[family-name:var(--font-lora)] text-xl text-[#0f2d52]">
          Payment details
        </h3>
        <p className="mb-5 text-sm text-ayuda-gray">
          Secure checkout powered by Stripe. Your card information is encrypted.
        </p>
        <PaymentElement id="payment-element" options={{ layout: "tabs" }} />
      </div>

      {error ? (
        <p className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {error}
        </p>
      ) : null}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={processing}
          className="text-sm font-medium text-ayuda-blue transition-colors hover:text-ayuda-blue-dark disabled:opacity-50"
        >
          ← Edit donation details
        </button>
        <button
          type="submit"
          disabled={!stripe || processing}
          className="inline-flex w-full items-center justify-center bg-ayuda-blue px-8 py-4 font-[family-name:var(--font-poppins)] text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-ayuda-blue-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto sm:px-10"
        >
          {processing ? "Processing…" : `Complete donation ${formatCurrency(amount)}`}
        </button>
      </div>
    </form>
  );
}

function PaymentStep({
  clientSecret,
  amount,
  onBack,
}: {
  clientSecret: string;
  amount: number;
  onBack: () => void;
}) {
  const options = useMemo<StripeElementsOptions>(
    () => ({
      clientSecret,
      appearance: {
        theme: "stripe",
        variables: {
          colorPrimary: "#1261ab",
          colorText: "#1a1a1a",
          borderRadius: "2px",
          fontFamily: "var(--font-raleway), Arial, sans-serif",
        },
      },
    }),
    [clientSecret],
  );

  return (
    <Elements stripe={stripePromise} options={options}>
      <PaymentFormInner amount={amount} onBack={onBack} />
    </Elements>
  );
}

export default function DonationForm({ campaignSlug }: { campaignSlug?: string }) {
  const [step, setStep] = useState<"details" | "payment">("details");
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [customAmount, setCustomAmount] = useState("");
  const [selectedPreset, setSelectedPreset] = useState<number | "custom" | null>(100);
  const [formError, setFormError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [campaign, setCampaign] = useState<CampaignStats | null>(null);

  const [form, setForm] = useState<DonationFormData>({
    amount: 100,
    firstName: "",
    lastName: "",
    email: "",
    postAmount: true,
    postName: true,
    dedicationType: "no",
    dedicationName: "",
    dedicationMessage: "",
  });

  const paymentsEnabled = Boolean(stripePublishableKey);

  useEffect(() => {
    async function loadCampaign() {
      if (campaignSlug) {
        const response = await fetch(`/api/campaigns/${campaignSlug}`);
        const data = await response.json();
        if (response.ok) {
          setCampaign(data.campaign);
        }
        return;
      }

      const response = await fetch("/api/campaigns/banner");
      const data = await response.json();
      if (response.ok && data.campaigns?.[0]) {
        setCampaign(data.campaigns[0]);
      }
    }

    loadCampaign();
  }, [campaignSlug]);

  const activeCampaignSlug = campaignSlug ?? campaign?.slug;

  function resolvedAmount(): number | null {
    if (selectedPreset === "custom") {
      const value = Number.parseFloat(customAmount);
      return Number.isFinite(value) && value > 0 ? value : null;
    }
    if (selectedPreset !== null) {
      return selectedPreset;
    }
    return null;
  }

  function updateForm<K extends keyof DonationFormData>(key: K, value: DonationFormData[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function selectPreset(preset: number) {
    setSelectedPreset(preset);
    setCustomAmount("");
    updateForm("amount", preset);
  }

  function selectCustom() {
    setSelectedPreset("custom");
    const value = Number.parseFloat(customAmount);
    if (Number.isFinite(value) && value > 0) {
      updateForm("amount", value);
    }
  }

  async function handleContinue(event: FormEvent) {
    event.preventDefault();
    setFormError(null);

    const amount = resolvedAmount();
    if (!amount) {
      setFormError("Please choose or enter a donation amount.");
      return;
    }

    if (!form.firstName.trim() || !form.lastName.trim()) {
      setFormError("Please enter your first and last name.");
      return;
    }

    if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      setFormError("Please enter a valid email address for your receipt.");
      return;
    }

    if (
      (form.dedicationType === "honor" || form.dedicationType === "memory") &&
      !form.dedicationName.trim()
    ) {
      setFormError("Please enter the name for your dedication.");
      return;
    }

    if (!paymentsEnabled) {
      setFormError(
        "Online payments are not configured yet. Add your Stripe API keys to enable checkout.",
      );
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/donations/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          firstName: form.firstName,
          lastName: form.lastName,
          email: form.email,
          postAmount: form.postAmount,
          postName: form.postName,
          dedicationType: form.dedicationType,
          dedicationName: form.dedicationName,
          dedicationMessage: form.dedicationMessage,
          campaignSlug: activeCampaignSlug,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Unable to start payment.");
      }

      setClientSecret(data.clientSecret);
      updateForm("amount", amount);
      setStep("payment");
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  if (step === "payment" && clientSecret) {
    return (
      <PaymentStep
        clientSecret={clientSecret}
        amount={form.amount}
        onBack={() => {
          setStep("details");
          setClientSecret(null);
        }}
      />
    );
  }

  const amount = resolvedAmount();

  return (
    <form onSubmit={handleContinue} className="space-y-8">
      {campaign ? (
        <section className="overflow-hidden rounded-sm bg-[#2c343a] p-5 text-white shadow-sm">
          <p className="text-sm font-medium text-white/85">{campaign.title}</p>
          <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/20">
            <div
              className="h-full rounded-full bg-[#2ec5f6]"
              style={{ width: `${Math.max(campaign.progressPercent, campaign.raisedCents > 0 ? 4 : 0)}%` }}
            />
          </div>
          <p className="mt-4 text-2xl font-semibold">{formatCampaignMoney(campaign.raisedCents)}</p>
          <p className="text-sm text-white/75">
            raised towards {formatCampaignMoney(campaign.goalCents)} goal · {campaign.daysLeft} days
            left
          </p>
        </section>
      ) : null}

      {/* Amount */}
      <section className="rounded-sm border border-black/10 bg-white p-5 shadow-sm md:p-7">
        <h2 className="mb-1 font-[family-name:var(--font-lora)] text-2xl text-[#0f2d52]">
          Choose your gift amount
        </h2>
        <p className="mb-6 text-sm text-ayuda-gray">
          Every contribution helps families across Miami-Dade County.
        </p>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
          {DONATION_PRESETS.map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => selectPreset(preset)}
              className={`rounded-sm border px-4 py-4 text-center font-[family-name:var(--font-poppins)] text-base font-semibold transition-all ${
                selectedPreset === preset
                  ? "border-ayuda-blue bg-ayuda-blue text-white shadow-md"
                  : "border-black/15 bg-[#fafafa] text-[#0f2d52] hover:border-ayuda-blue/50 hover:bg-white"
              }`}
            >
              {formatCurrency(preset)}
            </button>
          ))}
          <button
            type="button"
            onClick={selectCustom}
            className={`rounded-sm border px-4 py-4 text-center font-[family-name:var(--font-poppins)] text-base font-semibold transition-all ${
              selectedPreset === "custom"
                ? "border-ayuda-blue bg-ayuda-blue text-white shadow-md"
                : "border-black/15 bg-[#fafafa] text-[#0f2d52] hover:border-ayuda-blue/50 hover:bg-white"
            }`}
          >
            Other
          </button>
        </div>

        {selectedPreset === "custom" ? (
          <div className="mt-4">
            <label htmlFor="custom-amount" className={labelClass}>
              Enter amount (USD)
            </label>
            <div className="relative max-w-xs">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm text-ayuda-gray">
                $
              </span>
              <input
                id="custom-amount"
                type="number"
                min="1"
                step="0.01"
                value={customAmount}
                onChange={(event) => {
                  setCustomAmount(event.target.value);
                  const value = Number.parseFloat(event.target.value);
                  if (Number.isFinite(value) && value > 0) {
                    updateForm("amount", value);
                  }
                }}
                placeholder="0.00"
                className={`${inputClass} pl-8`}
              />
            </div>
          </div>
        ) : null}
      </section>

      {/* Donor info */}
      <section className="rounded-sm border border-black/10 bg-white p-5 shadow-sm md:p-7">
        <h2 className="mb-6 font-[family-name:var(--font-lora)] text-2xl text-[#0f2d52]">
          Your information
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          <div>
            <label htmlFor="first-name" className={labelClass}>
              First name <span className="text-red-600">*</span>
            </label>
            <input
              id="first-name"
              type="text"
              required
              autoComplete="given-name"
              value={form.firstName}
              onChange={(event) => updateForm("firstName", event.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label htmlFor="last-name" className={labelClass}>
              Last name <span className="text-red-600">*</span>
            </label>
            <input
              id="last-name"
              type="text"
              required
              autoComplete="family-name"
              value={form.lastName}
              onChange={(event) => updateForm("lastName", event.target.value)}
              className={inputClass}
            />
          </div>
        </div>
        <div className="mt-4">
          <label htmlFor="email" className={labelClass}>
            Email <span className="text-red-600">*</span>
          </label>
          <input
            id="email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(event) => updateForm("email", event.target.value)}
            className={inputClass}
          />
          <p className="mt-1.5 text-xs text-ayuda-gray">
            We&apos;ll send your tax receipt to this address.
          </p>
        </div>
      </section>

      {/* Privacy & dedication — dark panel from reference */}
      <section className="overflow-hidden rounded-sm bg-[#3d4349] p-5 text-white shadow-sm md:p-7">
        <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={form.postAmount}
              onChange={(event) => updateForm("postAmount", event.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/30 accent-[#1261ab]"
            />
            <span className="text-sm leading-relaxed">Post my donation amount</span>
          </label>
          <label className="flex cursor-pointer items-start gap-3">
            <input
              type="checkbox"
              checked={form.postName}
              onChange={(event) => updateForm("postName", event.target.checked)}
              className="mt-0.5 h-5 w-5 shrink-0 rounded border-white/30 accent-[#1261ab]"
            />
            <span className="text-sm leading-relaxed">Post my name</span>
          </label>
        </div>

        <div className="mt-6 border-t border-white/15 pt-6">
          <label htmlFor="dedication-type" className="mb-2 block text-sm text-white/90">
            Honor or remember someone with your gift?
          </label>
          <select
            id="dedication-type"
            value={form.dedicationType}
            onChange={(event) =>
              updateForm("dedicationType", event.target.value as DedicationType)
            }
            className="w-full max-w-md rounded-sm border border-white/20 bg-white px-4 py-3 text-sm text-black outline-none focus:border-ayuda-blue focus:ring-2 focus:ring-ayuda-blue/30"
          >
            {DEDICATION_OPTIONS.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </select>

          {form.dedicationType !== "no" ? (
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="sm:col-span-2">
                <label htmlFor="dedication-name" className="mb-2 block text-sm text-white/90">
                  {form.dedicationType === "honor" ? "Honoree name" : "Name"} <span className="text-red-300">*</span>
                </label>
                <input
                  id="dedication-name"
                  type="text"
                  value={form.dedicationName}
                  onChange={(event) => updateForm("dedicationName", event.target.value)}
                  className="w-full rounded-sm border border-white/20 bg-white px-4 py-3 text-sm text-black outline-none focus:border-ayuda-blue focus:ring-2 focus:ring-ayuda-blue/30"
                />
              </div>
              <div className="sm:col-span-2">
                <label htmlFor="dedication-message" className="mb-2 block text-sm text-white/90">
                  Personal message <span className="text-white/50">(optional)</span>
                </label>
                <textarea
                  id="dedication-message"
                  rows={3}
                  value={form.dedicationMessage}
                  onChange={(event) => updateForm("dedicationMessage", event.target.value)}
                  className="w-full rounded-sm border border-white/20 bg-white px-4 py-3 text-sm text-black outline-none focus:border-ayuda-blue focus:ring-2 focus:ring-ayuda-blue/30"
                />
              </div>
            </div>
          ) : null}
        </div>
      </section>

      {formError ? (
        <p className="rounded-sm border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700" role="alert">
          {formError}
        </p>
      ) : null}

      {!paymentsEnabled ? (
        <p className="rounded-sm border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          Stripe is not configured. Copy <code className="text-xs">.env.example</code> to{" "}
          <code className="text-xs">.env.local</code> and add your API keys to accept payments.
        </p>
      ) : null}

      <div className="flex flex-col items-center gap-4 border-t border-black/10 pt-6 sm:flex-row sm:justify-between">
        <p className="flex items-center gap-2 text-xs text-ayuda-gray">
          <svg className="h-4 w-4 text-ayuda-blue" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z" />
          </svg>
          Secure, encrypted payment processing
        </p>
        <button
          type="submit"
          disabled={loading || !amount}
          className="inline-flex w-full items-center justify-center bg-ayuda-blue px-10 py-4 font-[family-name:var(--font-poppins)] text-sm font-bold uppercase tracking-[0.12em] text-white transition-colors hover:bg-ayuda-blue-dark disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
        >
          {loading
            ? "Preparing checkout…"
            : amount
              ? `Continue to payment · ${formatCurrency(amount)}`
              : "Continue to payment"}
        </button>
      </div>
    </form>
  );
}
