import Image from "next/image";
import Link from "next/link";
import { img } from "@/lib/images";
import { HOME_CARDS } from "@/lib/site";

export default function FeatureCards() {
  return (
    <section className="bg-white py-16 md:py-20">
      <div className="container-ayuda">
        <div className="mb-8 flex justify-center">
          <Image
            src={img("2016/08/image.png")}
            alt=""
            width={66}
            height={66}
          />
        </div>
        <h2 className="mb-12 text-center text-2xl text-black sm:text-3xl md:text-4xl">
          Learn about Ayuda Miami
        </h2>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {HOME_CARDS.map((card) => (
            <article key={card.title} className="group text-center">
              <Link href={card.href} className="block">
                <div className="relative mx-auto mb-6 aspect-square w-full max-w-[220px] overflow-hidden rounded-full border-4 border-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-transform duration-300 group-hover:scale-105">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="220px"
                  />
                </div>
                <h4 className="mb-3 text-lg font-semibold text-black">{card.title}</h4>
                <span className="inline-block border-b border-ayuda-blue pb-1 text-sm font-medium uppercase tracking-wide text-ayuda-blue transition-colors group-hover:text-ayuda-blue-dark">
                  Learn More
                </span>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
