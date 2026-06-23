import type { Metadata } from "next";
import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import PageBanner from "@/components/PageBanner";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "About us",
  description:
    "The mission of AYUDA is to help improve the lives of children and families who are underserved and at risk in South Florida through education, life skills training, and programs that support self sufficiency.",
};

const ABOUT_SIDEBAR_LINKS = [
  { label: "Board of Directors", href: "/board-of-directors" },
  { label: "Staff", href: "/staff" },
];

const AFFILIATION_TEXT =
  "AYUDA maintains affiliate agreements with, but not limited to, the following social service and welfare agencies: Saber Inc., Cuban American National Council, Inc., Metro-Dade Department of Human Services, Miami Beach Hispanic Community Center, Miami-Dade Office of Human Development, Miami-Dade Division of Child Development Services, City of Miami Beach and its Chamber of Commerce, the State of Florida Health Department, the Housing Authority of the City of Miami Beach, United Way, Little Havana Activity Center, GENESIS, Community Action Service, The Little Brothers of the Good Shepard (Camillus House, Inc.) Compass Health Systems, Psychsolutions, Better Way of Miami. Inc., Daily Bread Food Bank, Florida Department of Education, Kiwanis Club of Miami Beach, The Department of Health and Human Services, the Social Security Administration, Gifts in Kind, and as of 2001, MBCDG.";

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About us" />
      <section className="container-ayuda py-14 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-[1fr_280px]">
          <div className="space-y-10">
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
                <strong>AYUDA, Inc.</strong> is a community-based non-profit
                organization in Miami Beach, Florida that was established in 1977.
                Since its establishment, AYUDA has served over 200,000 children,
                adolescents, adults, and elderly in South Florida. Our agency provides
                programs to prevent abuse and neglect. AYUDA&apos;s programs help
                prepare our youth for the world at large. We empower and inspire our
                clients to believe that they do make a difference in the world.
                Programs include enrichment as well as prevention for the very young
                to the elderly. Early educational scholarships, parenting skills as
                well as family empowerment programs are in place for the entire
                family unit.
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
              <p className="text-base leading-relaxed text-black">{AFFILIATION_TEXT}</p>
            </div>
          </div>

          <aside className="h-fit border border-black/10 bg-[#fafafa] p-6 lg:sticky lg:top-28">
            <h3 className="mb-4 font-[family-name:var(--font-lora)] text-xl text-black">
              About us
            </h3>
            <div className="mb-4 h-px bg-black/10" />
            <ul className="space-y-3">
              {ABOUT_SIDEBAR_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm leading-relaxed text-black transition-colors hover:text-ayuda-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
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
