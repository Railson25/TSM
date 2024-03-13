"use server";

export const getGameById = async (gameId: string) => {
  const response = await fetch(`http://localhost:3000/api/games/${gameId}`, {
    cache: "force-cache",
    next: { tags: ["gameById"] },
  });

  const game = await response.json();

  return game || null;
};
