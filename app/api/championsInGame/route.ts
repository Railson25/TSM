import prismaDB from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  const { userId } = auth();

  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }

  try {
    const championsInGame = await prismaDB.gameChampion.findMany({
      orderBy: {
        damage: "asc",
      },
    });

    return NextResponse.json(championsInGame);
  } catch (error) {
    console.log("[CHAMPION_IN_GAME_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
