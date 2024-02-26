import { GameFormValues } from "@/app/games/[gameId]/_components/game-form";
import prismaDB from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { ChampionRole } from "@prisma/client";

import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { userId } = auth();
    const body = await req.json();

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!Array.isArray(body)) {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    for (const data of body) {
      const { championId, role, damage, gold, goldAtFiveMin, goldAtTenMin } =
        data;
      if (!championId || !role || !damage || !gold) {
        return new NextResponse("Missing params of champion", { status: 400 });
      }
    }

    const game = await prismaDB.game.create({
      data: {
        champions: {
          createMany: {
            data: body.map((data: GameFormValues) => ({
              damage: data.damage,
              gold: data.gold,
              goldAtFiveMin: data.goldAtFiveMin,
              goldAtTenMin: data.goldAtTenMin,
              role: data.role as ChampionRole,
              championId: data.championId,
            })),
          },
        },
      },
    });

    return NextResponse.json(game);
  } catch (error) {
    console.log("GAME_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const games = await prismaDB.game.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(games);
  } catch (error) {
    console.log("[GAMES_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
