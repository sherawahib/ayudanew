import type { Metadata } from "next";
import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import { AMBASSADOR_HERO_IMAGE, SITE } from "@/lib/site";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Ambassador",
  description:
    "Meet Ayuda Miami ambassadors — James Egozi and community leaders who champion our mission across Miami-Dade County.",
};

const STATS = [
  { value: "218", label: "Races" },
  { value: "37", label: "Wins" },
  { value: "73", label: "Podiums" },
  { value: "33.5%", label: "Podium Rate" },
];

const CAREER = [
  {
    year: "2026",
    title: "EuroCup3 — Spanish Winter Championship",
    results: "1st Algarve · 1st Algarve Sprint · 1st Jarama",
    badge: "3 Wins",
  },
  {
    year: "2025",
    title: "EuroCup3 Championship",
    results: "1st Algarve · 4th Spa · 4th Monza · 4th Paul Ricard · 5th Red Bull Ring",
    badge: "1 Win",
  },
  {
    year: "2025",
    title: "EuroCup3 — Spanish Winter Championship",
    results: "1st Motorland Aragon · 1st Algarve",
    badge: "2 Wins",
  },
  {
    year: "2024",
    title: "F4 Spanish Championship & Winter Series",
    results: "1st Motorland Aragon · 2nd Barcelona · 2nd & 3rd Paul Ricard",
    badge: "1 Win",
  },
  {
    year: "2023",
    title: "F4 Italian & CEZ Championship",
    results: "1st CEZ Red Bull Ring · 5th Italian (2nd Rookie) · 7th Italian (3rd Rookie)",
    badge: "Champion",
  },
  {
    year: "2021–23",
    title: "International Karting — WSK & FIA European",
    results: "WSK Super Master wins · FIA European pole positions · WSK Open Cup victories",
    badge: "Multiple Wins",
  },
  {
    year: "2018",
    title: "Karting — USA Nationals",
    results: "ROK the Rio (Las Vegas) · ROK Festival · Rotax Grand Nationals",
    badge: "Triple Champion",
  },
];

export default function AmbassadorPage() {
  return (
    <>
      {/* Page title hero — homepage ambassador slide */}
      <section className="relative h-[420px] overflow-hidden sm:h-[520px] md:h-[600px] lg:h-[680px]">
        <ContentImage
          src={AMBASSADOR_HERO_IMAGE}
          alt="James Egozi — Ayuda Miami Ambassador"
          fill
          className="object-cover object-center"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/15 to-black/25" />

        <div className="container-ayuda relative flex h-full flex-col justify-end pb-10 md:pb-14">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.3em] text-[#00b388]">
            Ayuda Miami Ambassador
          </p>
          <h1 className="font-[family-name:var(--font-lora)] text-4xl text-white md:text-5xl lg:text-6xl">
            James Egozi
          </h1>
          <p className="mt-2 text-lg font-medium text-white/85">American Racing Driver</p>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/75">
            18 years old. Born in Miami. Racing in Europe. The future of motorsport
            doesn&apos;t wait — and neither does James.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href={SITE.donatePageUrl} className="btn-ayuda btn-ayuda-gray">
              Donate Now
            </Link>
            <Link href="/contact-us" className="btn-ayuda btn-ayuda-outline">
              Contact Ayuda
            </Link>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-black/10 bg-white py-12">
        <div className="container-ayuda">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {STATS.map((stat) => (
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

      {/* The Driver */}
      <section id="driver" className="bg-[#f4f8fc] py-16 md:py-20">
        <div className="container-ayuda grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-ayuda-blue">
              Beyond the Track
            </p>
            <h2 className="font-[family-name:var(--font-lora)] text-3xl text-black md:text-4xl">
              The Driver
            </h2>
            <div className="mt-6 space-y-4 text-base leading-relaxed text-[#3f4f63]">
              <p>
                James Egozi is a mature, high-performance athlete who understands the
                responsibility of representing global brands with absolute professionalism.
                Born in Miami and competing in Europe, he balances rigorous high-tech
                simulator training with a lifestyle that includes golf and fishing.
              </p>
              <p>
                He isn&apos;t just the future of motorsport; he is the perfect opportunity
                for brands that want to accelerate alongside a champion.
              </p>
            </div>
          </div>
          <div className="relative aspect-video overflow-hidden rounded-xl shadow-lg">
            <ContentImage
              src={img("2026/06/james.jpg")}
              alt="James Egozi racing"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Career */}
      <section id="career" className="py-16 md:py-20">
        <div className="container-ayuda">
          <div className="mb-12 text-center">
            <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-ayuda-blue">
              Built to Win
            </p>
            <h2 className="font-[family-name:var(--font-lora)] text-3xl text-black md:text-4xl">
              Career
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-base text-ayuda-gray">
              From karting victories in Las Vegas to Formula podiums across Europe — a
              career defined by consistent results on the world&apos;s most competitive grids.
            </p>
          </div>

          <div className="space-y-4">
            {CAREER.map((item) => (
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
    </>
  );
}
