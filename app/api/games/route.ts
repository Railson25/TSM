import { ChampionFormValues } from "@/app/games/[gameId]/_components/champion-form";
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

    if (!body || typeof body !== "object") {
      return new NextResponse("Invalid request body", { status: 400 });
    }

    const { win, lose, gameDuration, ...championData } = body;

    const championArray: ChampionFormValues[] = Object.values(championData);

    const championIds = new Set<string>();

    for (const dataKey in championData) {
      // verificando se a chave atual é uma propriedade própria do objeto
      if (Object.prototype.hasOwnProperty.call(championData, dataKey)) {
        const data = championData[dataKey];
        const { championId } = data;
        if (championIds.has(championId)) {
          return new NextResponse(`Duplicate championId: ${championId}`, {
            status: 400,
          });
        }
        championIds.add(championId);
      }

      for (const data of championArray) {
        const { championId, role, damage, gold, goldAtFiveMin, goldAtTenMin } =
          data;
        if (!championId || !role || !damage || !gold) {
          return new NextResponse("Missing params of champion", {
            status: 400,
          });
        }
      }
    }

    let defaultVersionId = null;

    const versions = await prismaDB.gameVersion.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (versions.length === 0) {
      return new NextResponse("Create a version first", { status: 404 });
    }

    defaultVersionId = versions[0].id;

    const game = await prismaDB.game.create({
      data: {
        champions: {
          createMany: {
            data: championArray.map((data: ChampionFormValues) => ({
              damage: data.damage,
              gold: data.gold,
              goldAtFiveMin: data.goldAtFiveMin,
              goldAtTenMin: data.goldAtTenMin,
              role: data.role as ChampionRole,
              championId: data.championId,
            })),
          },
        },
        gameDuration,
        win,
        lose,
        createdByUserId: userId,
        defaultVersionId,
      },
    });

    return NextResponse.json(game);
  } catch (error) {
    console.log("GAME_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  const { userId } = auth();
  if (!userId) {
    return new NextResponse("Unauthenticated", { status: 403 });
  }
  try {
    const gamesByUserId = await prismaDB.game.findFirst({
      where: {
        createdByUserId: userId,
      },
    });

    if (!gamesByUserId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

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
