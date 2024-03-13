export const getChampionInGames = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/championsInGame", {
      cache: "force-cache",
      next: { tags: ["championInGame"] },
    });

    const championInGames = await response.json();

    return championInGames || [];
  } catch (error) {
    console.log(".ujibnjikbni", error);
  }
};
