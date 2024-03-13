"use server";

export const getGames = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/games`, {
    cache: "force-cache",
    next: { tags: ["games"] },
  });

  const games = await response.json();

  return games;
};
