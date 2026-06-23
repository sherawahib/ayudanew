import type { Metadata } from "next";
import PageBanner from "@/components/PageBanner";
import { TESTIMONIAL_SECTIONS } from "@/lib/page-content";

export const metadata: Metadata = {
  title: "Testimonials",
};

export default function TestimonialsPage() {
  return (
    <>
      <PageBanner title="Testimonials" />
      <section className="container-ayuda py-14 md:py-20">
        <div className="mx-auto max-w-4xl space-y-14">
          {TESTIMONIAL_SECTIONS.map((section) => (
            <div key={section.title}>
              <h2 className="mb-8 text-center font-[family-name:var(--font-lora)] text-2xl text-ayuda-blue md:text-3xl">
                {section.title}
              </h2>
              <div className="space-y-8">
                {section.testimonials.map((item, index) => (
                  <blockquote
                    key={`${section.title}-${index}`}
                    className="border border-black/10 bg-[#fafafa] p-6 md:p-8"
                  >
                    <p className="text-base leading-relaxed text-black md:text-lg">
                      {item.quote}
                    </p>
                    {"author" in item && item.author ? (
                      <footer className="mt-6 text-sm font-semibold uppercase tracking-wide text-ayuda-blue">
                        {item.author}
                      </footer>
                    ) : null}
                  </blockquote>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
