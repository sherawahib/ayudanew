import { img } from "@/lib/images";

const MAYOR_VIDEO = img("2025/09/Sabor-Latino-A-Celebration-of-Heritage_opt.mp4");
const MAYOR_POSTER = img(
  "revslider/video-media/Sabor-Latino-A-Celebration-of-Heritage_opt_22_layer3.jpeg",
);

export default function MayorMessageSection() {
  return (
    <section className="border-t border-black/10 bg-white py-14 md:py-20">
      <div className="container-ayuda">
        <h2 className="mx-auto mb-10 max-w-4xl text-center font-[family-name:var(--font-lora)] text-2xl leading-snug text-[#0f2d52] md:text-3xl lg:text-4xl">
          A message from Miami Dade County Mayor Daniella Levine Cava
        </h2>

        <div className="mx-auto max-w-4xl overflow-hidden rounded-sm bg-black shadow-[0_8px_40px_rgba(18,97,171,0.15)] ring-1 ring-black/[0.06]">
          <video
            autoPlay
            muted
            controls
            playsInline
            preload="auto"
            poster={MAYOR_POSTER}
            className="aspect-video w-full object-cover"
          >
            <source src={MAYOR_VIDEO} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </section>
  );
}
