import type { Metadata } from "next";
import ContentImage from "@/components/ContentImage";
import PageBanner from "@/components/PageBanner";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "About us",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About us" />
      <section className="container-ayuda py-14 md:py-20">
        <div className="mx-auto max-w-4xl space-y-10">
          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-ayuda-blue">
              Mission
            </h4>
            <p className="text-base leading-relaxed text-black">
              The mission of AYUDA is to help improve the lives of children and
              families who are underserved and /or at risk in South Florida through
              education, life skills training, and programs that support self
              sufficiency.
            </p>
          </div>

          <div className="space-y-4 text-base leading-relaxed text-black">
            <p>
              AYUDA, Inc. is a community-based non-profit organization in Miami
              Beach, Florida that was established in 1977. Since its establishment,
              AYUDA has served over 200,000 children, adolescents, adults, and
              elderly in South Florida.
            </p>
            <p className="font-[family-name:var(--font-lora)] text-lg italic">
              It takes parents, teachers, love and caregivers… It takes a village
              to raise a child.
            </p>
          </div>

          <div>
            <h4 className="mb-4 text-sm font-bold uppercase tracking-widest text-ayuda-blue">
              Affiliation
            </h4>
            <p className="text-base leading-relaxed text-black">
              AYUDA maintains affiliate agreements with social service and welfare
              agencies across Miami-Dade County including United Way, Miami-Dade
              Department of Human Services, City of Miami Beach, and many more.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#f7f7f7] py-8">
        <div className="container-ayuda flex justify-center">
          <ContentImage
            src={img("2018/07/donate_now.jpg")}
            alt="Donate to Ayuda Miami"
            width={1100}
            height={200}
            className="h-auto w-full max-w-4xl object-cover"
          />
        </div>
      </section>
    </>
  );
}
