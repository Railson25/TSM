import prismaDB from "@/lib/prismadb";

import { NextResponse } from "next/server";

export async function GET(req: Request) {
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
