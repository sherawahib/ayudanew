import Link from "next/link";
import { NAV_ITEMS } from "@/lib/site";

const programLinks =
  NAV_ITEMS.find((item) => item.label === "Programs")?.children ?? [];

type ProgramSidebarProps = {
  currentHref: string;
};

export default function ProgramSidebar({ currentHref }: ProgramSidebarProps) {
  return (
    <aside className="border border-black/10 bg-[#fafafa] p-6">
      <h3 className="mb-4 font-[family-name:var(--font-lora)] text-xl text-black">
        Our Programs
      </h3>
      <div className="mb-4 h-px bg-black/10" />
      <ul className="space-y-3">
        {programLinks.map((program) => (
          <li key={program.href}>
            <Link
              href={program.href}
              className={`text-sm leading-relaxed transition-colors ${
                program.href === currentHref
                  ? "font-semibold text-ayuda-blue"
                  : "text-black hover:text-ayuda-blue"
              }`}
            >
              {program.label}
            </Link>
          </li>
        ))}
      </ul>
    </aside>
  );
}
