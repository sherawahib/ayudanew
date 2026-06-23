import type { Metadata } from "next";
import DonorSettingsForm from "@/components/donors/DonorSettingsForm";

export const metadata: Metadata = {
  title: "Account Settings",
  robots: { index: false },
};

export default function DonorSettingsPage() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="font-[family-name:var(--font-lora)] text-3xl text-[#0f2d52]">
          Account &amp; privacy
        </h1>
        <p className="mt-2 text-sm text-ayuda-gray">
          Update your profile and control how your giving is recognized publicly.
        </p>
      </div>
      <DonorSettingsForm />
    </div>
  );
}
