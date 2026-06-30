import type { Metadata } from "next";
import Link from "next/link";
import PageBanner from "@/components/PageBanner";

export const metadata: Metadata = {
  title: "Staff",
};

const CORE_STAFF = [
  { title: "President/CEO", people: ["Diana Susi, MSW, MFT, CMHP"] },
  { title: "Director of Programs", people: ["Cecilia De Loof, MSW"] },
  { title: "Financial Advisor", people: ["Jacob Zhang CPA"] },
  {
    title: "Community Liaison",
    people: ["Anne-Marie Tristan, BS, MBA"],
  },
] as const;

const PROGRAM_STAFF_INTRO =
  "Staff for our Programs are various and vary as needed:";

const PROGRAM_STAFF_ROLES = [
  "Mental Health Therapist",
  "T.A.L.L Counselors",
  "Contract Compliance Officer",
  "Here For You Program / Gerontological Counselor",
  "Homemaker Services",
] as const;

const SIDEBAR_LINKS = [
  { label: "Programs", href: "/programs" },
  { label: "Board Of Directors", href: "/board-of-directors" },
  { label: "Donors", href: "/donors" },
  { label: "Events", href: "/events" },
  { label: "Staff", href: "/staff" },
  { label: "About us", href: "/about-us" },
  { label: "Contact Us", href: "/contact-us" },
];

function StaffBlock({ title, people }: { title: string; people: readonly string[] }) {
  return (
    <div className="border-b border-black/10 pb-6 last:border-0">
      <h4 className="mb-2 text-base font-semibold text-black">{title}</h4>
      {people.map((person) => (
        <p key={person} className="text-base text-black">
          {person}
        </p>
      ))}
    </div>
  );
}

export default function StaffPage() {
  return (
    <>
      <PageBanner title="Staff" />
      <section className="container-ayuda py-14 md:py-20">
        <div className="grid gap-12 lg:grid-cols-[2fr_1fr]">
          <div className="space-y-8">
            {CORE_STAFF.map((section) => (
              <StaffBlock key={section.title} {...section} />
            ))}

            <div className="border-b border-black/10 pb-6">
              <p className="mb-6 font-[family-name:var(--font-lora)] text-xl font-semibold leading-snug text-ayuda-blue md:text-2xl">
                {PROGRAM_STAFF_INTRO}
              </p>
              <div className="space-y-6">
                {PROGRAM_STAFF_ROLES.map((title) => (
                  <h4 key={title} className="text-base font-semibold text-black">
                    {title}
                  </h4>
                ))}
              </div>
            </div>
          </div>

          <aside className="border border-black/10 bg-[#fafafa] p-6">
            <h3 className="mb-4 text-lg text-black">About us</h3>
            <ul className="space-y-2">
              {SIDEBAR_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-black hover:text-ayuda-blue"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </section>
    </>
  );
}
