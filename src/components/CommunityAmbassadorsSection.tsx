import AmbassadorProfileCard from "@/components/AmbassadorProfileCard";
import { COMMUNITY_AMBASSADORS } from "@/lib/ambassadors";

export default function CommunityAmbassadorsSection() {
  return (
    <section id="community-ambassadors" className="border-t border-black/10 bg-[#f4f8fc] py-14 md:py-20">
      <div className="container-ayuda">
        <div className="mb-12 text-center">
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

        <div className="mx-auto max-w-5xl space-y-8">
          {COMMUNITY_AMBASSADORS.map((ambassador) => (
            <AmbassadorProfileCard key={ambassador.id} ambassador={ambassador} />
          ))}
        </div>
      </div>
    </section>
  );
}
