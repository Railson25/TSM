import { useEffect, useState } from "react";
import { GameChampion } from "@prisma/client";

export const useChampionsById = (gameId: string) => {
  const [champions, setChampions] = useState<GameChampion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/championsInGame/${gameId}`, {
          cache: "force-cache",
          next: { tags: ["championById"] },
        });
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

export const useChampionsInGames = () => {
  const [champions, setChampions] = useState<GameChampion[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/championsInGame`, {
          cache: "force-cache",
          next: { tags: ["championInGame"] },
        });
        const championsData = await response.json();
        setChampions(championsData);
      } catch (error) {
        console.error("Error fetching champions in games:", error);
      }
    };
    fetchData();
  }, []);

  return champions;
};
