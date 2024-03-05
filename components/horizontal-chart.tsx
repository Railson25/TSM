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

    const avgTotalKills =
      games.reduce((acc, game) => acc + game.totalKills, 0) / games.length;
    const avgTotalDeaths =
      games.reduce((acc, game) => acc + game.totalDeath, 0) / games.length;

    const maxTotalKills = Math.max(...games.map((game) => game.totalKills), 1);
    const maxTotalDeaths = Math.max(...games.map((game) => game.totalDeath), 1);

    const normalizedTotalKills = avgTotalKills / maxTotalKills;
    const normalizedTotalDeaths = avgTotalDeaths / maxTotalDeaths;

    const score =
      0.15 * normalizedGameDuration +
      0.2 * normalizedGold +
      0.25 * normalizedDamage +
      0.05 * normalizedGoldAtFiveMin +
      0.05 * normalizedGoldAtFiveMin +
      0.05 * (1 / championGames.length) +
      0.05 * (1 / championGames.length) +
      0.05 * (1 / championGames.length) +
      0.05 * (1 / championGames.length) +
      0.05 * (1 / championGames.length) +
      0.05 * (1 / championGames.length) +
      0.05 * (1 / championGames.length) +
      0.05 * (1 / championGames.length) +
      0.05 * (1 / championGames.length) +
      0.05 * (1 / championGames.length) +
      0.05 * (1 / championGames.length) +
      0.05 * (1 / championGames.length) +
      0.05 * (1 / championGames.length) +
      0.1 * normalizedTotalKills +
      0.1 * normalizedTotalDeaths;

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
