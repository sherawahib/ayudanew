import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { getAdminDashboardData } from "@/lib/admin-stats";
import { isAdminEmail } from "@/lib/admin";

export async function GET() {
  const session = await auth();
  if (!session?.user?.email || !isAdminEmail(session.user.email)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const data = await getAdminDashboardData();
  return NextResponse.json(data);
}
