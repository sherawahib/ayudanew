import Link from "next/link";
import ContentImage from "@/components/ContentImage";
import { COMMUNITY_AMBASSADORS } from "@/lib/ambassadors";

const PREVIEW_AMBASSADORS = COMMUNITY_AMBASSADORS.filter((ambassador) => ambassador.image).slice(0, 4);

export default function HomeCommunityAmbassadors() {
  return (
    <section className="border-t border-black/10 bg-[#f4f8fc] py-14 md:py-20">
      <div className="container-ayuda">
        <div className="mb-10 text-center md:mb-12">
          <p className="mb-2 text-xs font-bold uppercase tracking-[0.25em] text-ayuda-blue">
            Champions of Our Mission
          </p>
          <h2 className="font-[family-name:var(--font-lora)] text-2xl text-black sm:text-3xl md:text-4xl">
            Community Ambassadors
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-base leading-relaxed text-ayuda-gray">
            Leaders across Miami-Dade who lend their voices, expertise, and passion to advance
            Ayuda&apos;s work with children, elders, and families.
          </p>
        </div>

        <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {PREVIEW_AMBASSADORS.map((ambassador) => (
            <article key={ambassador.id} className="text-center">
              <div className="relative mx-auto mb-4 aspect-[4/5] w-full max-w-[180px] overflow-hidden rounded-lg bg-white shadow-md ring-1 ring-black/[0.06]">
                {ambassador.image ? (
                  <ContentImage
                    src={ambassador.image}
                    alt={`${ambassador.firstName} ${ambassador.lastName}`}
                    fill
                    className="object-cover object-top"
                    sizes="180px"
                  />
                ) : null}
              </div>
              <h3 className="font-[family-name:var(--font-lora)] text-lg text-[#0f2d52]">
                {ambassador.firstName} {ambassador.lastName}
              </h3>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-ayuda-blue">
                {ambassador.role}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 text-center">
          <Link
            href="/board-of-directors#community-ambassadors"
            className="inline-block bg-ayuda-blue px-8 py-3 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-ayuda-blue-dark"
          >
            Meet Our Community Ambassadors
          </Link>
        </div>
      </div>
    </section>
  );
}
