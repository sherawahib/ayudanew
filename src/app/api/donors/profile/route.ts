import { NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      name: true,
      accountType: true,
      orgName: true,
      postAmount: true,
      postName: true,
      image: true,
      createdAt: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  return NextResponse.json({ user });
}

export async function PATCH(request: Request) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: {
    firstName?: string;
    lastName?: string;
    orgName?: string;
    postAmount?: boolean;
    postName?: boolean;
  };

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  const firstName = body.firstName?.trim() ?? user.firstName ?? "";
  const lastName = body.lastName?.trim() ?? user.lastName ?? "";
  const orgName = body.orgName?.trim() ?? user.orgName ?? "";
  const name =
    user.accountType === "organization" && orgName
      ? orgName
      : `${firstName} ${lastName}`.trim();

  const updated = await prisma.user.update({
    where: { id: session.user.id },
    data: {
      firstName,
      lastName,
      orgName: user.accountType === "organization" ? orgName : null,
      name,
      postAmount: typeof body.postAmount === "boolean" ? body.postAmount : user.postAmount,
      postName: typeof body.postName === "boolean" ? body.postName : user.postName,
    },
    select: {
      id: true,
      email: true,
      firstName: true,
      lastName: true,
      name: true,
      accountType: true,
      orgName: true,
      postAmount: true,
      postName: true,
    },
  });

  return NextResponse.json({ user: updated });
}
