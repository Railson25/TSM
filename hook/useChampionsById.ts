import { useEffect, useState } from "react";
import { GameChampion } from "@prisma/client";

const useChampionsById = (gameId: string) => {
  const [champions, setChampions] = useState<GameChampion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/championsInGame/${gameId}`);
        const championsData = await response.json();
        setChampions(championsData);
      } catch (error) {
        console.error("Error fetching champions:", error);
      }
    };
    fetchData();
  }, [gameId]);

  return champions;
};

export default useChampionsById;
