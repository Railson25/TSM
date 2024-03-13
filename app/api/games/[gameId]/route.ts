import prismaDB from "@/lib/prismadb";

import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    if (!params.gameId) {
      return new NextResponse("Game Id is required", { status: 400 });
    }

    const game = await prismaDB.game.findUnique({
      where: {
        id: params.gameId,
      },
    });

    return NextResponse.json(game);
  } catch (error) {
    console.log("[GAME_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { gameId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!params.gameId) {
      return new NextResponse("Champion Id is required", { status: 400 });
    }

    const gameId = await prismaDB.game.findFirst({
      where: {
        id: params.gameId,
      },
    });

    if (!gameId) {
      return new NextResponse("Game not found", { status: 404 });
    }

    if (gameId.userId !== userId) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const game = await prismaDB.game.deleteMany({
      where: {
        id: params.gameId,
      },
    });

    revalidateTag("games");
    revalidateTag("championInGame");
    revalidateTag("championById");

    return NextResponse.json(game);
  } catch (error) {
    console.log("[GAME_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
