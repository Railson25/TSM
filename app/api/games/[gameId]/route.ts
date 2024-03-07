import prismaDB from "@/lib/prismadb";

import { auth } from "@clerk/nextjs";
import { NextResponse } from "next/server";

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

    const game = await prismaDB.game.deleteMany({
      where: {
        id: params.gameId,
      },
    });

    return NextResponse.json(game);
  } catch (error) {
    console.log("[GAME_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
