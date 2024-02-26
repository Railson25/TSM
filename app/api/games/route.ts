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

    const newGames = await Promise.all(
      body.map(async (data: GameFormValues) => {
        const { damage, gold, role, championId, goldAtFiveMin, goldAtTenMin } =
          data;

        if (!championId) {
          return new NextResponse("Champion is required", { status: 400 });
        }
        if (!role) {
          return new NextResponse("Champion role is required", { status: 400 });
        }

        if (!damage) {
          return new NextResponse("Champion damage is required", {
            status: 400,
          });
        }

        if (!gold) {
          return new NextResponse("Champion gold is required", { status: 400 });
        }

        return prismaDB.game.create({
          data: {
            champions: {
              createMany: {
                data: {
                  damage,
                  gold,
                  goldAtFiveMin,
                  goldAtTenMin,
                  role: data.role as ChampionRole,
                  championId,
                },
              },
            },
          },
        });
      })
    );

    return NextResponse.json(newGames);
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
