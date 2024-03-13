"use server";

export const getChampionById = async (championId: string) => {
  const response = await fetch(
    `http://localhost:3000/api/champions/${championId} `,
    {
      cache: "force-cache",
      next: { tags: ["championById"] },
    }
  );

  const games = await response.json();

  return games;
};
