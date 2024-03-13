import { Game } from "@prisma/client";
import { useEffect, useState } from "react";
3;

const useGames = () => {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/games", {
          cache: "force-cache",
          next: { tags: ["games"] },
        });
        const gamesData = await response.json();
        setGames(gamesData);
      } catch (error) {
        console.error("Error fetching games:", error);
      }
    };
    fetchData();
  }, []);

  return games;
};

export default useGames;
