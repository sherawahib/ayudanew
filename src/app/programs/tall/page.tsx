import type { Metadata } from "next";
import ContentImage from "@/components/ContentImage";
import PageBanner from "@/components/PageBanner";
import ProgramSidebar from "@/components/ProgramSidebar";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Afterschool Enrichment Program/ TALL (Teenagers are Lifelong Learners)",
};

export default function TallProgramPage() {
  return (
    <>
      <PageBanner title="Afterschool Enrichment Program/ TALL (Teenagers are Lifelong Learners)" />
      <section className="container-ayuda py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_280px]">
          <div className="space-y-8">
            <div className="text-base leading-relaxed text-black">
              <p>
                A youth enrichment program serving at risk middle and high school
                aged youth, including youth with disabilities at City of Miami
                beach parks. The goal of the program is to improve the lives of its
                participants through Academic support, social emotional learning,
                Arts &amp; culture, Sports and STEM classes. The program is funded
                by The Children Trust.
              </p>
            </div>
            <div className="overflow-hidden bg-black/5">
              <ContentImage
                src={img("2019/05/tall.jpg")}
                alt="Afterschool Enrichment Program / TALL"
                width={700}
                height={467}
                className="mx-auto h-auto w-full max-w-[700px] object-cover"
              />
            </div>
          </div>
          <ProgramSidebar currentHref="/programs/tall" />
        </div>
      </section>
    </>
  );
}
