"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut, useSession } from "next-auth/react";

const NAV_ITEMS = [
  { href: "/donors/dashboard", label: "Overview", exact: true },
  { href: "/donors/dashboard/donations", label: "My Donations" },
  { href: "/donors/dashboard/settings", label: "Account & Privacy" },
];

export default function DonorDashboardNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  return (
    <aside className="lg:sticky lg:top-6 lg:self-start">
      <div className="rounded-md border border-black/10 bg-white p-5 shadow-sm">
        <p className="text-xs font-semibold uppercase tracking-wider text-ayuda-gray">
          Donor portal
        </p>
        <p className="mt-2 font-[family-name:var(--font-lora)] text-lg text-[#0f2d52]">
          {session?.user?.name ?? "Welcome"}
        </p>
        <p className="text-sm text-ayuda-gray">{session?.user?.email}</p>

        <nav className="mt-6 space-y-1">
          {NAV_ITEMS.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`block rounded-sm px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-ayuda-blue text-white"
                    : "text-[#0f2d52] hover:bg-[#f4f8fc] hover:text-ayuda-blue"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="mt-6 space-y-2 border-t border-black/8 pt-5">
          <Link
            href="/donate"
            className="block w-full rounded-sm bg-[#00b388] px-3 py-2.5 text-center text-sm font-semibold uppercase tracking-wide text-white transition-colors hover:bg-[#00a07a]"
          >
            Make a donation
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/donors/sign-in" })}
            className="w-full rounded-sm border border-black/15 px-3 py-2.5 text-sm font-medium text-ayuda-gray transition-colors hover:border-ayuda-blue hover:text-ayuda-blue"
          >
            Log out
          </button>
        </div>
      </div>
    </aside>
  );
}
