import { img } from "@/lib/images";
import { HOME_VIDEOS } from "@/lib/site";

export default function HomeVideos() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#f8fbff] to-white py-16 md:py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-ayuda-blue/20 to-transparent" />

      <div className="container-ayuda">
        {/* Logo block */}
        <div className="mx-auto mb-14 max-w-2xl text-center md:mb-16">
          <div className="mx-auto mb-6 inline-flex rounded-full bg-ayuda-blue/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.25em] text-ayuda-blue">
            Our Story
          </div>
          <div className="video-logo-wrap mx-auto max-w-md rounded-2xl border border-black/[0.06] bg-white p-6 shadow-[0_20px_60px_rgba(18,97,171,0.08)] md:p-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={img("2020/11/AYUDALogoSmall.jpg")}
              alt="AYUDA - Helping Miami's Children, Elders and Families Since 1977"
              width={600}
              height={359}
              className="mx-auto h-auto w-full"
            />
          </div>
          <p className="mt-6 font-[family-name:var(--font-lora)] text-lg italic text-ayuda-gray md:text-xl">
            See how Ayuda supports families across Miami-Dade County
          </p>
        </div>

        {/* Video grid */}
        <div className="grid gap-8 md:grid-cols-2 md:gap-10 lg:gap-12">
          {HOME_VIDEOS.map((video) => (
            <article
              key={video.id}
              className="overflow-hidden rounded-xl border border-black/[0.08] bg-white shadow-sm"
            >
              <div className="relative aspect-video overflow-hidden bg-[#0a1628]">
                <iframe
                  title={video.title}
                  src={`${video.embedUrl}?rel=0`}
                  className="absolute inset-0 h-full w-full border-0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute left-4 top-4 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-ayuda-blue/90 text-white shadow-lg">
                  <svg viewBox="0 0 24 24" className="ml-0.5 h-4 w-4 fill-current" aria-hidden>
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <div className="border-t border-black/[0.05] px-5 py-4 md:px-6 md:py-5">
                <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.2em] text-ayuda-blue">
                  Featured Video
                </p>
                <h3 className="font-[family-name:var(--font-lora)] text-lg leading-snug text-black md:text-xl">
                  {video.title}
                </h3>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
