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
        championGames.reduce(
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
    const avgGoldAtTenMin = getAverage("goldAtTenMin") || 0;
    const avgDamageByDeath = getAverage("damageByDeath") || 0;
    const avgDamageSuffered = getAverage("damageSuffered") || 0;
    const avgTeamParticipation = getAverage("teamParticipation") || 0;
    const avgShieldOfCure = getAverage("shieldOfCure") || 0;
    const avgEpicMonster = getAverage("epicMonster") || 0;
    const avgWardNumber = getAverage("wardNumber") || 0;
    const avgGoldDamageRate = getAverage("goldDamageRate") || 0;
    const avgFarmMonster = getAverage("farmMonster") || 0;
    const avgTroopScore = getAverage("troopScore") || 0;
    const avgToppledTowers = getAverage("toppledTowers") || 0;
    const avgWinRate = calculateAverage(
      games.map((game) => (game.win ? 1 : 0))
    );
    const avgLoseRate = calculateAverage(
      games.map((game) => (game.lose ? 1 : 0))
    );

    const normalizedGameDuration = getNormalizedValue(avgGameDuration, 60);
    const normalizedGold = getNormalizedValue(avgGold, 100000);
    const normalizedDamage = getNormalizedValue(avgDamage, 200000);
    const normalizedGoldAtFiveMin = getNormalizedValue(avgGoldAtFiveMin, 15000);
    const normalizedGoldAtTenMin = getNormalizedValue(avgGoldAtTenMin, 30000);
    const normalizedDamageByDeath = getNormalizedValue(avgDamageByDeath, 10000);
    const normalizedDamageSuffered = getNormalizedValue(
      avgDamageSuffered,
      20000
    );
    const normalizedTeamParticipation = getNormalizedValue(
      avgTeamParticipation,
      100
    );
    const normalizedShieldOfCure = getNormalizedValue(avgShieldOfCure, 5000);
    const normalizedEpicMonster = getNormalizedValue(avgEpicMonster, 10);
    const normalizedWardNumber = getNormalizedValue(avgWardNumber, 20);
    const normalizedGoldDamageRate = getNormalizedValue(avgGoldDamageRate, 100);
    const normalizedFarmMonster = getNormalizedValue(avgFarmMonster, 20);
    const normalizedTroopScore = getNormalizedValue(avgTroopScore, 20);
    const normalizedToppledTowers = getNormalizedValue(avgToppledTowers, 5);
    const normalizedWinRate = getNormalizedValue(avgWinRate, 1);
    const normalizedLoseRate = getNormalizedValue(avgLoseRate, 1);

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
      0.05 * normalizedGameDuration +
      0.05 * normalizedGold +
      0.05 * normalizedDamage +
      0.025 * normalizedGoldAtFiveMin +
      0.025 * normalizedGoldAtTenMin +
      0.025 * normalizedDamageByDeath +
      0.025 * normalizedDamageSuffered +
      0.025 * normalizedTeamParticipation +
      0.025 * normalizedShieldOfCure +
      0.025 * normalizedEpicMonster +
      0.025 * normalizedWardNumber +
      0.025 * normalizedGoldDamageRate +
      0.025 * normalizedFarmMonster +
      0.025 * normalizedTroopScore +
      0.025 * normalizedToppledTowers +
      0.05 * normalizedWinRate +
      0.05 * normalizedLoseRate +
      0.1 * normalizedTotalKills +
      0.1 * normalizedTotalDeaths +
      15 * repeatedTerm;

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
