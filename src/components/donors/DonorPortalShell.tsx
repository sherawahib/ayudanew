import Image from "next/image";
import Link from "next/link";
import { SITE } from "@/lib/site";

type DonorPortalShellProps = {
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

export default function DonorPortalShell({
  title,
  subtitle,
  children,
  footer,
}: DonorPortalShellProps) {
  return (
    <section className="min-h-[calc(100vh-200px)] bg-[#eef2f7] py-12 md:py-16">
      <div className="container-ayuda max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex flex-col items-center gap-3">
            <Image
              src={SITE.logo}
              alt={SITE.name}
              width={140}
              height={48}
              className="h-12 w-auto"
            />
          </Link>
        </div>

        <div className="overflow-hidden rounded-md border border-black/10 bg-white shadow-[0_12px_40px_rgba(15,45,82,0.08)]">
          <div className="border-b border-black/8 bg-[#f8fafc] px-6 py-5 md:px-8">
            <h1 className="font-[family-name:var(--font-lora)] text-2xl text-[#0f2d52]">
              {title}
            </h1>
            {subtitle ? (
              <p className="mt-1 text-sm text-ayuda-gray">{subtitle}</p>
            ) : null}
          </div>

          <div className="px-6 py-6 md:px-8 md:py-8">{children}</div>

          {footer ? (
            <div className="border-t border-black/8 bg-[#fafafa] px-6 py-4 text-center text-sm text-ayuda-gray md:px-8">
              {footer}
            </div>
          ) : null}
        </div>

        <p className="mt-6 text-center text-xs text-ayuda-gray">
          <Link href="/" className="hover:text-ayuda-blue">
            ← Back to {SITE.name}
          </Link>
        </p>
      </div>
    </section>
  );
}
