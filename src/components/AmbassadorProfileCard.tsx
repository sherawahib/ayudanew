import ContentImage from "@/components/ContentImage";
import type { CommunityAmbassador } from "@/lib/ambassadors";

type AmbassadorProfileCardProps = {
  ambassador: CommunityAmbassador;
};

export default function AmbassadorProfileCard({ ambassador }: AmbassadorProfileCardProps) {
  const initials = `${ambassador.firstName[0]}${ambassador.lastName[0]}`;

  return (
    <article className="overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-[0_12px_40px_rgba(18,97,171,0.06)] transition-shadow hover:shadow-[0_16px_48px_rgba(18,97,171,0.1)]">
      <div className="h-1.5 bg-gradient-to-r from-ayuda-blue via-[#2e3191] to-[#00b388]" />

      <div className="flex flex-col gap-6 p-6 md:flex-row md:gap-8 md:p-8">
        <div className="mx-auto shrink-0 md:mx-0">
          {ambassador.image ? (
            <div className="relative h-[220px] w-[180px] overflow-hidden rounded-lg bg-[#f4f8fc] shadow-md ring-2 ring-ayuda-blue/10">
              <ContentImage
                src={ambassador.image}
                alt={`${ambassador.firstName} ${ambassador.lastName}`}
                fill
                className="object-cover object-top"
                sizes="180px"
              />
            </div>
          ) : (
            <div
              className="flex h-[180px] w-[180px] items-center justify-center rounded-lg bg-gradient-to-br from-ayuda-blue to-[#0c2340] shadow-md"
              aria-hidden
            >
              <span className="font-[family-name:var(--font-poppins)] text-4xl font-bold text-white/90">
                {initials}
              </span>
            </div>
          )}
        </div>

        <div className="flex-1 text-center md:text-left">
          <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.25em] text-[#00b388]">
            {ambassador.role}
          </p>
          <h3 className="font-[family-name:var(--font-lora)] text-2xl leading-tight md:text-[1.75rem]">
            <span className="text-ayuda-blue">{ambassador.firstName}</span>{" "}
            <span className="text-[#0c2340]">{ambassador.lastName}</span>
          </h3>
          <div className="mx-auto mt-3 h-0.5 w-12 bg-ayuda-blue/30 md:mx-0" />
          <p className="mt-5 text-base leading-relaxed text-[#3f4f63]">{ambassador.bio}</p>
        </div>
      </div>
    </article>
  );
}
