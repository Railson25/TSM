// api/championsInGame/[gameId]/route.ts

import prismaDB from "@/lib/prismadb";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { gameId } = params;

    if (!gameId) {
      return new NextResponse("Game Id is required", { status: 400 });
    }

    const championsInGame = await prismaDB.gameChampion.findMany({
      where: {
        gameId,
      },
    });

    return NextResponse.json(championsInGame);
  } catch (error) {
    console.log("[CHAMPION_IN_GAME_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
