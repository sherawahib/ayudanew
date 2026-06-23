export const DONATION_PRESETS = [25, 50, 100, 250, 500] as const;

export const MIN_DONATION = 1;
export const MAX_DONATION = 100_000;

export type DedicationType = "no" | "honor" | "memory";

export type DonationFormData = {
  amount: number;
  firstName: string;
  lastName: string;
  email: string;
  postAmount: boolean;
  postName: boolean;
  dedicationType: DedicationType;
  dedicationName: string;
  dedicationMessage: string;
};

export const DEDICATION_OPTIONS: { value: DedicationType; label: string }[] = [
  { value: "no", label: "No" },
  { value: "honor", label: "In honor of" },
  { value: "memory", label: "In memory of" },
];
