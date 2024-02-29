// useGames.js

import { useEffect, useState } from "react";

const useGames = () => {
  const [games, setGames] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/games");
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
