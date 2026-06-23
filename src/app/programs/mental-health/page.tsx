import type { Metadata } from "next";
import ContentImage from "@/components/ContentImage";
import PageBanner from "@/components/PageBanner";
import ProgramSidebar from "@/components/ProgramSidebar";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Miami Dade County Public Schools Mental Health Counseling Services",
};

export default function MentalHealthPage() {
  return (
    <>
      <PageBanner title="Miami Dade County Public Schools Mental Health Counseling Services" />
      <section className="container-ayuda py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_280px]">
          <div className="space-y-8">
            <div className="text-base leading-relaxed text-black">
              <p>
                Funded by Miami Dade County Public Schools. This Program is aimed
                to support the District&apos;s Mental Health Assistant Plan.
                M-DCPS is the nation&apos;s 4th largest school district with over
                345,000 students. AYUDA has been contracted to provide mental
                health assessment, mental health screening and case management to
                their students in need.
              </p>
            </div>
            <div className="overflow-hidden bg-black/5">
              <ContentImage
                src={img("2023/06/mental-health.png")}
                alt="Mental Health"
                width={458}
                height={328}
                className="mx-auto h-auto w-full max-w-[458px] object-contain p-4"
              />
            </div>
          </div>
          <ProgramSidebar currentHref="/programs/mental-health" />
        </div>
      </section>
    </>
  );
}
