import type { Metadata } from "next";
import ContentImage from "@/components/ContentImage";
import PageBanner from "@/components/PageBanner";
import { img } from "@/lib/images";

export const metadata: Metadata = {
  title: "Contact Us",
};

export default function ContactPage() {
  return (
    <>
      <PageBanner
        title="Contact Us"
        subtitle="Visit us or send us a message"
      />
      <section className="container-ayuda py-14 md:py-20">
        <div className="mb-10 flex justify-center">
          <ContentImage
            src={img("2016/08/image.png")}
            alt=""
            width={66}
            height={66}
          />
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          <div className="space-y-6">
            <p className="text-2xl font-medium text-black">
              <a href="tel:305-864-6885" className="hover:text-ayuda-blue">
                (305) 864-6885
              </a>
            </p>
            <div className="text-base leading-relaxed text-black">
              <p className="font-semibold">AYUDA Miami</p>
              <p>11098 Biscayne Blvd, 4th floor</p>
              <p>North Miami, FL 33161</p>
            </div>
          </div>

          <form className="space-y-4 border border-black/10 bg-[#fafafa] p-6 md:p-8">
            <div>
              <label htmlFor="name" className="mb-1 block text-sm font-medium">
                Your Name (required)
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-ayuda-blue"
              />
            </div>
            <div>
              <label htmlFor="email" className="mb-1 block text-sm font-medium">
                Your Email (required)
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-ayuda-blue"
              />
            </div>
            <div>
              <label htmlFor="subject" className="mb-1 block text-sm font-medium">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                type="text"
                className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-ayuda-blue"
              />
            </div>
            <div>
              <label htmlFor="message" className="mb-1 block text-sm font-medium">
                Your Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={6}
                className="w-full border border-black/15 bg-white px-4 py-3 text-sm outline-none focus:border-ayuda-blue"
              />
            </div>
            <button type="submit" className="btn-ayuda btn-ayuda-primary">
              Send Message
            </button>
          </form>
        </div>
      </section>
    </>
  );
}
