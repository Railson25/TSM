export const getChampionInGames = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/championsInGame`,
      {
        cache: "force-cache",
        next: { tags: ["championInGame"] },
      }
    );

    const championInGames = await response.json();

    return championInGames || [];
  } catch (error) {
    console.log(".ujibnjikbni", error);
  }
};
