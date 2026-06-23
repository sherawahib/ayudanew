"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import { useState } from "react";
import { SITE } from "@/lib/site";

const NAV = [
  {
    href: "/admin",
    label: "Dashboard",
    icon: (
      <path d="M4 4h7v9H4V4zm9 0h7v5h-7V4zM4 15h7v5H4v-5zm9 3h7v2h-7v-2z" />
    ),
    exact: true,
  },
  {
    href: "/admin/campaigns",
    label: "Campaigns",
    icon: (
      <path d="M12 2l8 4v6c0 5-3.5 9.5-8 10-4.5-.5-10-8-10-8V6l8-4zm0 3.2L7 7.5V12c0 3.2 2.4 6.3 5 7.1 2.6-.8 5-3.9 5-7.1V7.5l-5-2.3z" />
    ),
  },
  {
    href: "/admin/donations",
    label: "Donations",
    icon: (
      <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10S17.5 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" />
    ),
  },
  {
    href: "/admin/donors",
    label: "Donors",
    icon: (
      <path d="M16 11c1.7 0 3-1.3 3-3s-1.3-3-3-3-3 1.3-3 3 1.3 3 3 3zm-8 0c1.7 0 3-1.3 3-3S9.7 5 8 5 5 6.3 5 8s1.3 3 3 3zm0 2c-2.7 0-8 1.3-8 4v2h16v-2c0-2.7-5.3-4-8-4zm8 0c-.3 0-.7 0-1 .1 1.2.9 2 2 2 3.9v2h6v-2c0-2.7-5.3-4-6-4z" />
    ),
  },
  {
    href: "/admin/analytics",
    label: "Analytics",
    icon: (
      <path d="M3 19h18v2H3v-2zm3-8h3v6H6v-6zm4 3h3v3h-3v-3zm4-6h3v9h-3V8z" />
    ),
  },
];

type AdminShellProps = {
  children: React.ReactNode;
  userEmail: string;
  userName?: string | null;
};

export default function AdminShell({ children, userEmail, userName }: AdminShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function isActive(href: string, exact?: boolean) {
    if (exact) return pathname === href;
    return pathname.startsWith(href);
  }

  return (
    <div className="fixed inset-0 z-[200] flex bg-[#0b1220] text-white">
      {sidebarOpen ? (
        <button
          type="button"
          className="absolute inset-0 z-30 bg-black/50 lg:hidden"
          aria-label="Close menu"
          onClick={() => setSidebarOpen(false)}
        />
      ) : null}

      <aside
        className={`absolute z-40 flex h-full w-72 shrink-0 flex-col border-r border-white/10 bg-[#0c1628] transition-transform lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="border-b border-white/10 px-6 py-5">
          <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#2ec5f6]">
            Ayuda Admin
          </p>
          <p className="mt-1 font-[family-name:var(--font-lora)] text-xl text-white">
            {SITE.name}
          </p>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-4">
          {NAV.map((item) => {
            const active = isActive(item.href, item.exact);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  active
                    ? "bg-[#1261ab] text-white shadow-lg shadow-[#1261ab]/20"
                    : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <svg className="h-5 w-5 shrink-0 fill-current opacity-90" viewBox="0 0 24 24" aria-hidden>
                  {item.icon}
                </svg>
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-white/10 p-4">
          <Link
            href="/"
            target="_blank"
            className="mb-2 flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-white/5 hover:text-white"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M19 19H5V5h7V3H5a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7h-2v7zM14 3v2h3.6l-9.8 9.8 1.4 1.4L19 6.4V10h2V3h-7z" />
            </svg>
            View live site
          </Link>
          <button
            type="button"
            onClick={() => signOut({ callbackUrl: "/donors/sign-in" })}
            className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-white/70 transition-colors hover:bg-red-500/10 hover:text-red-300"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M17 7l-1.4 1.4L18.2 11H8v2h10.2l-2.6 2.6L17 17l5-5-5-5zM4 5h8V3H4a2 2 0 00-2 2v14a2 2 0 002 2h8v-2H4V5z" />
            </svg>
            Sign out
          </button>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="flex h-16 shrink-0 items-center justify-between border-b border-white/10 bg-[#0f1a2e] px-4 lg:px-6">
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="rounded-lg p-2 text-white/80 hover:bg-white/10 lg:hidden"
              aria-label="Open menu"
              onClick={() => setSidebarOpen(true)}
            >
              <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M3 6h18v2H3V6zm0 5h18v2H3v-2zm0 5h18v2H3v-2z" />
              </svg>
            </button>
            <div>
              <p className="text-sm font-medium text-white">{userName ?? "Administrator"}</p>
              <p className="text-xs text-white/50">{userEmail}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="hidden rounded-full bg-[#00b388]/20 px-3 py-1 text-xs font-medium text-[#5eead4] sm:inline">
              Live data
            </span>
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#1261ab] text-sm font-semibold">
              {(userName ?? userEmail).charAt(0).toUpperCase()}
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto bg-[#eef2f7] p-4 lg:p-6">{children}</main>
      </div>
    </div>
  );
}
