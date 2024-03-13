"use server";

export const getChampionById = async (championId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/champions/${championId} `,
    {
      cache: "force-cache",
      next: { tags: ["championById"] },
    }
  );

  const games = await response.json();

  return games;
};
