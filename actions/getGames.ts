"use server";

export const getGames = async () => {
  const response = await fetch("http://localhost:3000/api/games", {
    cache: "force-cache",
    next: { tags: ["games"] },
  });

  const games = await response.json();

  return games;
};
