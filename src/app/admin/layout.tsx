import { auth } from "@/auth";
import { isAdminEmail } from "@/lib/admin";
import { redirect } from "next/navigation";
import AdminShell from "@/components/admin/AdminShell";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    redirect("/donors/sign-in?callbackUrl=/admin");
  }

  return (
    <AdminShell userEmail={session.user.email} userName={session.user.name}>
      {children}
    </AdminShell>
  );
}
