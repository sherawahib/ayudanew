import Link from "next/link";
import { img } from "@/lib/images";
import { AUCTION_URL } from "@/lib/site";

const MAYOR_VIDEO = img("2025/09/Sabor-Latino-A-Celebration-of-Heritage_opt.mp4");
const MAYOR_POSTER = img(
  "revslider/video-media/Sabor-Latino-A-Celebration-of-Heritage_opt_22_layer3.jpeg",
);

export default function EventsFeaturedVideo() {
  return (
    <div className="mx-auto mb-14 max-w-4xl md:mb-16">
      <div className="overflow-hidden rounded-sm bg-white shadow-[0_8px_40px_rgba(18,97,171,0.12)] ring-1 ring-black/[0.06]">
        <video
          autoPlay
          muted
          controls
          playsInline
          preload="auto"
          poster={MAYOR_POSTER}
          className="aspect-video w-full bg-black object-cover"
        >
          <source src={MAYOR_VIDEO} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>
      <p className="mt-4 text-center font-[family-name:var(--font-lora)] text-lg text-[#0f2d52]">
        A message from Miami-Dade County Mayor Daniella Levine Cava
      </p>
      <div className="mt-6 text-center">
        <Link
          href={AUCTION_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block border border-ayuda-blue px-8 py-3 font-[family-name:var(--font-poppins)] text-sm font-semibold uppercase tracking-wide text-ayuda-blue transition-colors hover:bg-ayuda-blue hover:text-white"
        >
          Auction
        </Link>
      </div>
    </div>
  );
}
