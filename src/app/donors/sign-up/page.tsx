import type { Metadata } from "next";
import SignUpForm from "@/components/donors/SignUpForm";

export const metadata: Metadata = {
  title: "Donor Sign Up",
  robots: { index: false },
};

export default function DonorSignUpPage() {
  return <SignUpForm />;
}
