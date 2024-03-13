export const getChampions = async () => {
  try {
    const response = await fetch("http://localhost:3000/api/champions", {
      cache: "force-cache",
      next: { tags: ["champions"] },
    });

    const champions = await response.json();

    return champions || [];
  } catch (error) {
    console.log(".ujibnjikbni", error);
  }
};
