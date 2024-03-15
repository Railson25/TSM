import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs";

import prismaDB from "@/lib/prismadb";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const store = await prismaDB.team.create({
      data: {
        name,
        userId,
      },
    });

    return NextResponse.json(store);
  } catch (error) {
    console.log("[TEAMS_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
