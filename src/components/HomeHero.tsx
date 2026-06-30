import Image from "next/image";
import { HERO_BANNER_HEIGHT_CLASS, JAMES_EGOZI_BANNER } from "@/lib/hero";

export default function HomeHero() {
  return (
    <section className={`relative overflow-hidden bg-black ${HERO_BANNER_HEIGHT_CLASS}`}>
      <div className="relative h-full min-h-[inherit] w-full">
        <Image
          src={JAMES_EGOZI_BANNER}
          alt="James Egozi — Official Ayuda Miami brand ambassador and American racing driver"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </div>
    </section>
  );
}
