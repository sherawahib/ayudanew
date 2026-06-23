import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";
import PersonCard from "@/components/PersonCard";
import { BOARD_IN_MEMORIAM, BOARD_MEMBERS } from "@/lib/page-content";
import { SITE } from "@/lib/site";

export const metadata: Metadata = {
  title: "Board Of Directors",
};

export default function BoardPage() {
  return (
    <>
      <PageBanner title="Board Of Directors" />
      <section className="container-ayuda py-14 md:py-20">
        <div className="mx-auto max-w-5xl space-y-2">
          {BOARD_MEMBERS.map((member) => (
            <PersonCard key={member.name} {...member} />
          ))}
        </div>
      </section>

      <section className="border-t border-black/10 bg-[#fafafa] py-14 md:py-20">
        <div className="container-ayuda">
          <div className="mx-auto max-w-5xl">
            <h2 className="mb-10 text-center font-[family-name:var(--font-lora)] text-2xl text-black md:text-3xl">
              In Memoriam
            </h2>
            <PersonCard
              name={BOARD_IN_MEMORIAM.title}
              bio={BOARD_IN_MEMORIAM.bio}
              image={BOARD_IN_MEMORIAM.image}
            />
            <div className="mt-8 text-center">
              <Link
                href={SITE.legacyFundUrl}
                className="inline-block bg-ayuda-blue px-8 py-3 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-ayuda-blue-dark"
              >
                {BOARD_IN_MEMORIAM.legacyFundLabel}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
