import type { Metadata } from "next";
import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import DonationForm from "@/components/DonationForm";
import {
  LEGACY_FUND_CAMPAIGN_SLUG,
  LEGACY_FUND_PAGE,
} from "@/lib/page-content";

export const metadata: Metadata = {
  title: "DeAnne Connolly Graham Legacy Fund",
  description:
    "Honor the legacy of Board Chair DeAnne Connolly-Graham and support AYUDA's mission for children and families in South Florida.",
};

export default function LegacyFundPage() {
  return (
    <>
      <section className="bg-ayuda-blue py-8 md:py-10">
        <div className="container-ayuda">
          <h1 className="text-center font-[family-name:var(--font-poppins)] text-xl font-bold uppercase tracking-wide text-white sm:text-2xl md:text-3xl">
            {LEGACY_FUND_PAGE.title}
          </h1>
        </div>
      </section>

      <section className="bg-white py-12 md:py-16">
        <div className="container-ayuda">
          <div className="mx-auto max-w-3xl space-y-12">
            <p className="text-base leading-relaxed text-black md:text-lg">
              {LEGACY_FUND_PAGE.intro}
            </p>

            <ContentImage
              src={LEGACY_FUND_PAGE.images[0].src}
              alt={LEGACY_FUND_PAGE.imageAlt}
              width={LEGACY_FUND_PAGE.images[0].width}
              height={LEGACY_FUND_PAGE.images[0].height}
              className="mx-auto h-auto w-full max-w-4xl"
              priority
            />

            {LEGACY_FUND_PAGE.images.slice(1, 5).map((image) => (
              <ContentImage
                key={image.src}
                src={image.src}
                alt={LEGACY_FUND_PAGE.imageAlt}
                width={image.width}
                height={image.height}
                className="mx-auto h-auto w-full max-w-4xl"
              />
            ))}

            <p className="text-base leading-relaxed text-black md:text-lg">
              To honor and remember her, AYUDA has created the{" "}
              <Link
                href="#donate"
                className="font-semibold text-ayuda-blue hover:underline"
              >
                DeAnne Connolly Graham Legacy Fund
              </Link>
              . We hope to see you on October 28 for her &ldquo;Celebration of
              Life.&rdquo; Please see below:
            </p>

            <ContentImage
              src={LEGACY_FUND_PAGE.images[5].src}
              alt="Celebration of Life for DeAnne Connolly-Graham"
              width={LEGACY_FUND_PAGE.images[5].width}
              height={LEGACY_FUND_PAGE.images[5].height}
              className="mx-auto h-auto w-full max-w-md"
            />

            <p className="text-base leading-relaxed text-black md:text-lg">
              {LEGACY_FUND_PAGE.mission}
            </p>
          </div>
        </div>
      </section>

      <section id="donate" className="scroll-mt-24 bg-[#f4f8fc] py-14 md:py-20">
        <div className="container-ayuda">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <h2 className="font-[family-name:var(--font-lora)] text-2xl text-[#0f2d52] md:text-3xl">
              Support the Legacy Fund
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#3f4f63]">
              Your gift to the DeAnne Connolly Graham Legacy Fund continues her
              essential work in the community.
            </p>
          </div>

          <div className="mx-auto max-w-2xl">
            <DonationForm campaignSlug={LEGACY_FUND_CAMPAIGN_SLUG} />
          </div>
        </div>
      </section>
    </>
  );
}
