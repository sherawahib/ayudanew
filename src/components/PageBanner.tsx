type PageBannerProps = {
  title: string;
  subtitle?: string;
};

export default function PageBanner({ title, subtitle }: PageBannerProps) {
  return (
    <section className="relative overflow-hidden border-b border-black/[0.06]">
      <div className="footer-wave h-1.5 bg-gradient-to-r from-ayuda-blue via-[#00b388] to-ayuda-blue-dark" />

      <div className="footer-pattern relative bg-[#f4f8fc] py-14 md:py-20">
        <div
          className="page-banner-float-1 pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-ayuda-blue/[0.05]"
          aria-hidden
        />
        <div
          className="page-banner-float-2 pointer-events-none absolute -bottom-14 -left-14 h-52 w-52 rounded-full bg-[#00b388]/[0.07]"
          aria-hidden
        />
        <div
          className="page-banner-float-3 pointer-events-none absolute right-[18%] top-[55%] h-28 w-28 rounded-full bg-ayuda-blue/[0.04]"
          aria-hidden
        />

        <div className="container-ayuda relative">
          <h1 className="font-[family-name:var(--font-lora)] text-3xl text-[#0f2d52] after:mt-4 after:block after:h-0.5 after:w-14 after:bg-ayuda-blue after:content-[''] md:text-5xl">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-3xl text-base leading-relaxed text-[#3f4f63] md:text-lg">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
