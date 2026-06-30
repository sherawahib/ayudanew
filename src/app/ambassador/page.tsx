import type { Metadata } from "next";
import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import JamesEgoziBanner from "@/components/JamesEgoziBanner";
import SocialIcon from "@/components/SocialIcon";
import {
  JAMES_EGOZI_CAREER,
  JAMES_EGOZI_COMMUNITY_EDUCATION,
  JAMES_EGOZI_DRIVER,
  JAMES_EGOZI_PARTNERSHIP,
  JAMES_EGOZI_SECTION_LINKS,
  JAMES_EGOZI_SOCIAL,
  JAMES_EGOZI_STATS,
  JAMES_EGOZI_VIDEO,
} from "@/lib/james-egozi";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "James Egozi | Ambassador",
  description:
    "Meet James Egozi — American racing driver, Ayuda Miami ambassador. Born in Miami, racing in Europe on the world's most competitive grids.",
};

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-ayuda-blue">
      {children}
    </p>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="font-[family-name:var(--font-lora)] text-3xl text-black md:text-4xl">
      {children}
    </h2>
  );
}

export default function AmbassadorPage() {
  return (
    <>
      <JamesEgoziBanner priority>
        <div className="container-ayuda pb-10 md:pb-14">
          <div className="flex flex-wrap gap-3">
            <Link href={SITE.donatePageUrl} className="btn-ayuda btn-ayuda-gray">
              Donate Now
            </Link>
            <Link href="/contact-us" className="btn-ayuda btn-ayuda-outline">
              Contact Ayuda
            </Link>
          </div>
        </div>
      </JamesEgoziBanner>

      <section className="border-b border-black/10 bg-white py-12">
        <div className="container-ayuda">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {JAMES_EGOZI_STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="font-[family-name:var(--font-poppins)] text-3xl font-bold text-ayuda-blue md:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-sm font-semibold uppercase tracking-widest text-ayuda-gray">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <nav
        aria-label="James Egozi page sections"
        className="sticky top-0 z-30 border-b border-black/10 bg-white/95 backdrop-blur-sm"
      >
        <div className="container-ayuda overflow-x-auto">
          <ul className="flex min-w-max items-center gap-1 py-3 sm:gap-2">
            {JAMES_EGOZI_SECTION_LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className="inline-block whitespace-nowrap rounded-md px-3 py-2 text-xs font-semibold uppercase tracking-wide text-[#0f2d52] transition-colors hover:bg-ayuda-blue/10 hover:text-ayuda-blue sm:text-[13px]"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="ml-auto hidden sm:block">
              <span className="px-3 text-xs font-bold uppercase tracking-[0.2em] text-ayuda-blue">
                Join Team #48
              </span>
            </li>
          </ul>
        </div>
      </nav>

      <section id="driver" className="bg-[#f4f8fc] py-16 md:py-20">
        <div className="container-ayuda mx-auto max-w-4xl">
          <SectionEyebrow>{JAMES_EGOZI_DRIVER.eyebrow}</SectionEyebrow>
          <SectionTitle>{JAMES_EGOZI_DRIVER.title}</SectionTitle>
          <div className="mt-6 space-y-4 text-base leading-relaxed text-[#3f4f63]">
            {JAMES_EGOZI_DRIVER.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 24)}>{paragraph}</p>
            ))}
          </div>
          <div className="relative mt-10 aspect-[850/812] overflow-hidden rounded-xl shadow-lg">
            <ContentImage
              src={JAMES_EGOZI_DRIVER.image}
              alt={JAMES_EGOZI_DRIVER.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 896px) 100vw, 896px"
            />
          </div>
        </div>
      </section>

      <section id="career" className="py-16 md:py-20">
        <div className="container-ayuda">
          <div className="mx-auto mb-10 max-w-3xl text-center">
            <SectionEyebrow>{JAMES_EGOZI_CAREER.eyebrow}</SectionEyebrow>
            <SectionTitle>{JAMES_EGOZI_CAREER.title}</SectionTitle>
            <p className="mt-4 text-base leading-relaxed text-ayuda-gray">
              {JAMES_EGOZI_CAREER.intro}
            </p>
          </div>

          <div className="relative mx-auto mb-12 aspect-[4/5] max-w-md overflow-hidden rounded-xl shadow-lg md:max-w-lg">
            <ContentImage
              src={JAMES_EGOZI_CAREER.image}
              alt={JAMES_EGOZI_CAREER.imageAlt}
              fill
              className="object-cover"
              sizes="(max-width: 512px) 100vw, 512px"
            />
          </div>

          <div className="mx-auto max-w-4xl space-y-4">
            {JAMES_EGOZI_CAREER.items.map((item) => (
              <article
                key={`${item.year}-${item.title}`}
                className="flex flex-col gap-4 border border-black/10 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:flex-row md:items-center md:justify-between"
              >
                <div className="flex gap-5">
                  <span className="shrink-0 font-[family-name:var(--font-poppins)] text-2xl font-bold text-ayuda-blue">
                    {item.year}
                  </span>
                  <div>
                    <h3 className="text-lg font-semibold text-black">{item.title}</h3>
                    <p className="mt-1 text-sm text-ayuda-gray">{item.results}</p>
                  </div>
                </div>
                <span className="shrink-0 self-start rounded-full bg-ayuda-blue/10 px-4 py-1.5 text-xs font-bold uppercase tracking-wide text-ayuda-blue md:self-center">
                  {item.badge}
                </span>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="partnership" className="border-t border-black/10 bg-[#f4f8fc] py-16 md:py-20">
        <div className="container-ayuda">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <SectionEyebrow>{JAMES_EGOZI_PARTNERSHIP.eyebrow}</SectionEyebrow>
            <SectionTitle>{JAMES_EGOZI_PARTNERSHIP.title}</SectionTitle>
            <p className="mt-4 text-base leading-relaxed text-[#3f4f63]">
              {JAMES_EGOZI_PARTNERSHIP.intro}
            </p>
          </div>

          <div className="mx-auto grid max-w-5xl gap-6 md:grid-cols-3">
            {JAMES_EGOZI_PARTNERSHIP.tiers.map((tier) => (
              <article
                key={tier.tier}
                className="flex flex-col border border-black/10 bg-white p-6 shadow-sm"
              >
                <p className="text-xs font-bold uppercase tracking-[0.2em] text-ayuda-blue">
                  {tier.tier}
                </p>
                <h3 className="mt-2 font-[family-name:var(--font-lora)] text-xl text-[#0f2d52]">
                  {tier.name}
                </h3>
                <ul className="mt-5 flex-1 space-y-2.5 text-sm leading-relaxed text-[#3f4f63]">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex gap-2">
                      <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ayuda-blue" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link href="/contact-us" className="btn-ayuda btn-ayuda-primary">
              Join Team #48
            </Link>
          </div>
        </div>
      </section>

      <section id="community-education" className="py-16 md:py-20">
        <div className="container-ayuda mx-auto max-w-4xl">
          <SectionEyebrow>{JAMES_EGOZI_COMMUNITY_EDUCATION.eyebrow}</SectionEyebrow>
          <SectionTitle>{JAMES_EGOZI_COMMUNITY_EDUCATION.title}</SectionTitle>
          <p className="mt-4 text-base leading-relaxed text-[#3f4f63]">
            {JAMES_EGOZI_COMMUNITY_EDUCATION.intro}
          </p>

          <div className="mt-12">
            <h3 className="mb-4 font-[family-name:var(--font-lora)] text-2xl text-[#0f2d52]">
              {JAMES_EGOZI_VIDEO.title}
            </h3>
            <div className="overflow-hidden rounded-xl bg-black shadow-lg ring-1 ring-black/10">
              <div className="relative aspect-video w-full">
                <iframe
                  title="RACE 2 | Portimao 2026 | EUROCUP-3, ROUND 2"
                  src={JAMES_EGOZI_VIDEO.embedUrl}
                  className="absolute inset-0 h-full w-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                />
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col items-start gap-4 border-t border-black/10 pt-8 sm:flex-row sm:items-center">
            <h4 className="text-sm font-bold uppercase tracking-[0.15em] text-[#0f2d52]">
              Follow on Social Media:
            </h4>
            <div className="flex items-center gap-3">
              {JAMES_EGOZI_SOCIAL.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-11 w-11 items-center justify-center rounded-full border border-ayuda-blue/20 bg-white text-ayuda-blue shadow-sm transition-colors hover:border-ayuda-blue hover:bg-ayuda-blue hover:text-white"
                >
                  <SocialIcon icon={social.icon} />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
