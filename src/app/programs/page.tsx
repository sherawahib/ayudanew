import type { Metadata } from "next";
import ContentImage from "@/components/ContentImage";
import PageBanner from "@/components/PageBanner";
import ProgramSidebar from "@/components/ProgramSidebar";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Programs",
};

export default function ProgramsPage() {
  return (
    <>
      <PageBanner title="Our Programs" />
      <section className="container-ayuda py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_280px]">
          <div className="space-y-6 text-base leading-relaxed text-black">
            <p>
              For over 40 years, AYUDA has developed programs in our Miami-Dade
              County community to help prevent child and elder abuse and neglect.
              We serve as the last safety net for those who lack the resources or
              skill sets needed to reach their goals. We empower and inspire our
              clients to believe that they do make a difference in our community.
            </p>
            <div className="space-y-6">
              <ContentImage
                src={img("2023/06/Program.png")}
                alt="AYUDA programs"
                width={300}
                height={258}
                className="float-none mx-auto mb-4 h-auto w-full max-w-[300px] md:float-right md:ml-6 md:mb-2"
              />
              <p>
                AYUDA provides life skills training for at-risk teenagers,
                parenting skills for adults and one-on-one care for the frail
                elderly.
              </p>
              <p>
                Help us help our neighbors and make Miami an improved community
                where everyone can achieve their goals. We have waiting lists in
                each of our programs. Below is a link to each one so that you can
                see how your donation and participation can directly impact
                families in our community.
              </p>
            </div>
          </div>
          <ProgramSidebar currentHref="" />
        </div>
      </section>
    </>
  );
}
