import type { Metadata } from "next";
import ContentImage from "@/components/ContentImage";
import PageBanner from "@/components/PageBanner";
import ProgramSidebar from "@/components/ProgramSidebar";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Here for You, Miami Beach Safety Net Program",
};

export default function HereForYouPage() {
  return (
    <>
      <PageBanner title="Here for You, Miami Beach Safety Net Program" />
      <section className="container-ayuda py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_280px]">
          <div className="space-y-8">
            <div className="space-y-6 text-base leading-relaxed text-black">
              <p>
                Provides yearly assessment, gerontological counseling, homemaker
                services, referrals, and many social services as needed to 20
                low-income, frail, isolated, and mostly homebound elders, ages 60
                and over, who reside in Miami Beach and are without support
                systems. The goal is to maintain or increase their quality of life
                at home, to assist them in maintaining their social and personal
                independence in the community, to abate loneliness, isolation and
                depression, to improve their nutritional and medical status, and
                to provide homemaker services and supportive counseling to the
                most vulnerable. The goal of this program is to delay or prevent
                institutionalization by the provision of these services and by
                developing natural helpers in the elder&apos;s immediate
                environment. The program is funded by Miami-Dade County.
              </p>
              <p>
                Home and Companion Services is registered with the State of Florida
                Agency for Health Care Administration Division of Health Quality
                Assurance. (LICENSE #228657 / CERTIFICATE #31490)
              </p>
            </div>
            <div className="overflow-hidden bg-black/5">
              <ContentImage
                src={img("2019/05/here_for_you.jpg")}
                alt="Here for You program"
                width={849}
                height={565}
                className="h-auto w-full object-cover"
              />
            </div>
          </div>
          <ProgramSidebar currentHref="/programs/here-for-you" />
        </div>
      </section>
    </>
  );
}
