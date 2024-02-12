import prismaDB from "@/lib/prismadb";

export const getChampionById = async (championId: string) => {
  try {
    const champion = await prismaDB.champion.findUnique({
      where: {
        id: championId,
      },
    });

    if (!champion) return null;

    return champion;
  } catch (error: any) {
    throw new Error(error);
  }
};
