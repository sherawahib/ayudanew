import type { Metadata } from "next";
import ImageGallery from "@/components/ImageGallery";
import PageBanner from "@/components/PageBanner";
import { EVENT_IMAGES } from "@/lib/page-content";
export const metadata: Metadata = {
  title: "Events",
};

export default function EventsPage() {
  return (
    <>
      <PageBanner title="Events" />
      <section className="container-ayuda py-14 md:py-20">
        <p className="mx-auto mb-10 max-w-3xl text-center font-[family-name:var(--font-lora)] text-base leading-relaxed text-black md:text-lg">
          We are so grateful to share with you, images of events that have taken
          throughout the years! Please make sure to check back frequently to see
          what is coming up in the future!
        </p>
        <ImageGallery images={EVENT_IMAGES} />      </section>
    </>
  );
}
