import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getGame = async (gameId: string) => {
  try {
    const game = await prisma.gameChampion.findUnique({
      where: {
        id: gameId,
      },
    });

    if (!game) return null;

    return await game;
  } catch (error: any) {
    throw new Error(error);
  }
};
