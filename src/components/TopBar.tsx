import Link from "next/link";
import SocialIcon from "@/components/SocialIcon";
import { SITE, SOCIAL_LINKS } from "@/lib/site";

export default function TopBar() {
  return (
    <div className="bg-ayuda-blue-dark text-white">
      <div className="container-ayuda">
        <div className="flex h-9 items-center justify-between gap-2 sm:h-10 sm:gap-4">
          <p className="truncate text-[10px] text-white/80 sm:text-xs">
            {SITE.tagline}
          </p>

          <div className="ml-auto flex items-center gap-3 sm:gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              {SOCIAL_LINKS.map((social) => (
                <Link
                  key={social.href}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-7 w-7 items-center justify-center rounded-sm text-white/90 transition-colors hover:bg-white/15 hover:text-white sm:h-8 sm:w-8"
                >
                  <SocialIcon icon={social.icon} />
                </Link>
              ))}
            </div>

            <span className="hidden h-5 w-px bg-white/25 sm:block" aria-hidden />

            <Link
              href="/donors/sign-in"
              className="hidden text-[11px] font-medium text-white/90 transition-colors hover:text-white sm:inline sm:text-xs"
            >
              Donor Login
            </Link>

            <Link
              href="/admin/campaigns"
              className="hidden text-[11px] font-medium text-white/70 transition-colors hover:text-white lg:inline lg:text-xs"
            >
              Admin
            </Link>

            <Link
              href={SITE.donateUrl}
              className="inline-flex items-center rounded-sm bg-white px-3 py-1.5 text-[11px] font-semibold uppercase tracking-wide !text-[#1261ab] transition-colors hover:bg-white/90 sm:px-4 sm:text-xs"
            >
              Donate Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
