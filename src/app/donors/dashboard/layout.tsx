import { auth } from "@/auth";
import DonorDashboardNav from "@/components/donors/DonorDashboardNav";
import { redirect } from "next/navigation";

export default async function DonorDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/donors/sign-in?callbackUrl=/donors/dashboard");
  }

  return (
    <section className="bg-[#f4f8fc] py-10 md:py-14">
      <div className="container-ayuda max-w-6xl">
        <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
          <DonorDashboardNav />
          <div>{children}</div>
        </div>
      </div>
    </section>
  );
}
