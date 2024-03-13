"use server";

export const getGameById = async (gameId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/games/${gameId}`,
    {
      cache: "force-cache",
      next: { tags: ["gameById"] },
    }
  );

  const game = await response.json();

  return game || null;
};
