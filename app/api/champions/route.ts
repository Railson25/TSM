import prismaDB from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: { championId: string }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, imageURL } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!imageURL) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const champion = await prismaDB.champion.create({
      data: {
        name,
        imageURL,
        id: params.championId,
      },
    });

    return NextResponse.json(champion);
  } catch (error) {
    console.log("CHAMPIONS_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const champions = await prismaDB.champion.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(champions);
  } catch (error) {
    console.log("[CHAMPIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
