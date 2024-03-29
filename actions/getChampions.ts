export const getChampions = async () => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/champions`,
      {
        cache: "force-cache",
        next: { tags: ["champions"] },
      }
    );

    const champions = await response.json();

    return champions || [];
  } catch (error) {
    console.log(".ujibnjikbni", error);
  }
};
