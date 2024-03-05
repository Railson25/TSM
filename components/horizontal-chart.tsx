"use client";

import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Champion, Game, GameChampion } from "@prisma/client";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

interface HorizontalChartProps {
  games: Game[];
  championInGame: GameChampion[];
  champions: Champion[];
}

export const HorizontalChart = ({
  games,
  champions,
  championInGame,
}: HorizontalChartProps) => {
  const calculateChampionScore = (championId: string) => {
    const championGames = championInGame.filter(
      (game) => game.championId === championId
    );

    const avgGameDuration =
      games.reduce((acc, game) => acc + parseInt(game.gameDuration), 0) /
      games.length;
    const avgGold =
      championGames.reduce((acc, game) => acc + game.gold, 0) /
      championGames.length;
    const avgDamage =
      championGames.reduce((acc, game) => acc + game.damage, 0) /
      championGames.length;
    const avgGoldAtFiveMin =
      championGames.reduce((acc, game) => acc + (game.goldAtFiveMin ?? 0), 0) /
      championGames.length;

    const normalizedGameDuration = 1 - avgGameDuration / 60;
    const normalizedGold = avgGold / 10000;
    const normalizedDamage = avgDamage / 10000;
    const normalizedGoldAtFiveMin = avgGoldAtFiveMin / 2000;

    const score =
      0.2 * normalizedGameDuration +
      0.3 * normalizedGold +
      0.3 * normalizedDamage +
      0.1 * normalizedGoldAtFiveMin +
      0.1;

    return score;
  };

  const championAverages = Object.values(
    championInGame.reduce((groups, champion) => {
      if (!groups[champion.championId]) {
        groups[champion.championId] = [];
      }
      groups[champion.championId].push(champion);
      return groups;
    }, {} as Record<string, GameChampion[]>)
  ).map((group) => {
    const championId = group[0].championId;
    const score = calculateChampionScore(championId);
    return { championId, score };
  });

  const sortedChampionScores = championAverages.sort(
    (a, b) => b.score - a.score
  );

  const data = {
    labels: sortedChampionScores.map((champion) => {
      const championData = champions.find((c) => c.id === champion.championId);
      return championData ? championData.name : "";
    }),
    datasets: [
      {
        label: "Champions",
        data: sortedChampionScores.map((champion) => champion.score),
        backgroundColor: "#61DBFB",
      },
    ],
  };

  const options = {
    indexAxis: "y" as const,
  };

  return (
    <div>
      <Bar data={data} options={options} />
    </div>
  );
};
