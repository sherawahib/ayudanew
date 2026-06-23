import type { Metadata } from "next";
import ContentImage from "@/components/ContentImage";
import DonationForm from "@/components/DonationForm";
import PageBanner from "@/components/PageBanner";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Donate",
  description:
    "Support Ayuda Miami with a secure online donation. Every gift helps children and families across South Florida.",
};

type DonatePageProps = {
  searchParams: Promise<{ campaign?: string }>;
};

export default async function DonatePage({ searchParams }: DonatePageProps) {
  const params = await searchParams;

  return (
    <>
      <PageBanner
        title="Donate"
        subtitle="Your generosity helps us serve children and families from infancy through the end of life with dignity and respect."
      />
      <section className="bg-[#f4f8fc] py-14 md:py-20">
        <div className="container-ayuda">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <ContentImage
              src={img("2016/08/image.png")}
              alt=""
              width={66}
              height={66}
              className="mx-auto mb-6"
            />
            <p className="font-[family-name:var(--font-lora)] text-xl leading-relaxed text-[#0f2d52] md:text-2xl">
              &ldquo;Your donation is important. Any amount welcome.&rdquo;
            </p>
            <p className="mt-3 text-sm text-ayuda-gray">
              Ayuda Miami is a 501(c)(3) nonprofit. Donations may be tax-deductible.{" "}
              <a href="/donors/sign-in" className="font-medium text-ayuda-blue hover:underline">
                Sign in
              </a>{" "}
              to track your giving history.
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <DonationForm campaignSlug={params.campaign} />
          </div>
        </div>
      </section>
    </>
  );
}
