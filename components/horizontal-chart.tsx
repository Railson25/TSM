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
  //Calculate the average of an array of numbers
  const calculateAverage = (values: number[]): number => {
    return (
      values.reduce((accumulator, value) => accumulator + value, 0) /
      values.length
    );
  };

  //Normalizing a value so they can be compared!
  const getNormalizedValue = (value: number, maxValue: number): number => {
    return value / maxValue;
  };

  const calculateChampionScore = (championId: string) => {
    const championGames = championInGame.filter(
      (game) => game.championId === championId
    );

    const getAverage = (property: string) => {
      return (
        championInGame.reduce(
          (accumulator, game: any) => accumulator + game[property],
          0
        ) / championGames.length
      );
    };

    const avgGameDuration = calculateAverage(
      games.map((game) => parseInt(game.gameDuration))
    );

    const avgGold = getAverage("gold");
    const avgDamage = getAverage("damage");
    const avgGoldAtFiveMin = getAverage("goldAtFiveMin") || 0;

    const normalizedGameDuration = getNormalizedValue(avgGameDuration, 60);
    const normalizedGold = getNormalizedValue(avgGold, 100000);
    const normalizedDamage = getNormalizedValue(avgDamage, 200000);
    const normalizedGoldAtFiveMin = getNormalizedValue(avgGoldAtFiveMin, 15000);

    const avgTotalKills = calculateAverage(
      games.map((game) => game.totalKills)
    );

    const avgTotalDeaths = calculateAverage(
      games.map((game) => game.totalDeath)
    );

    const maxTotalKills = Math.max(...games.map((game) => game.totalKills), 1);
    const maxTotalDeaths = Math.max(...games.map((game) => game.totalDeath), 1);

    const normalizedTotalKills = avgTotalKills / maxTotalKills;
    const normalizedTotalDeaths = avgTotalDeaths / maxTotalDeaths;

    const repeatedTerm = 0.05 * (1 / championGames.length);

    const score =
      0.15 * normalizedGameDuration +
      0.2 * normalizedGold +
      0.25 * normalizedDamage +
      0.05 * normalizedGoldAtFiveMin +
      0.05 * normalizedGoldAtFiveMin +
      15 * repeatedTerm;
    0.1 * normalizedTotalKills + 0.1 * normalizedTotalDeaths;

    return score;
  };

  const championAverages = Object.values(
    championInGame.reduce((groups, champion) => {
      const { championId } = champion;

      if (!groups[championId]) {
        groups[championId] = [];
      }

      groups[championId].push(champion);

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
    <div className="w-full">
      <Bar data={data} options={options} />
    </div>
  );
};
