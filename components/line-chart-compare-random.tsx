"use client";

import { Champion, Game, GameChampion } from "@prisma/client";

import { Line } from "react-chartjs-2";

import {
  Chart as ChartJs,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler,
} from "chart.js";

ChartJs.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
  Filler
);

interface LineChartProps {
  championInGame: GameChampion[];
  games: Game[];
  champions: Champion[];
  selectedRole: string;
  selectedChampionId: string;
}

export const LineChartCompareRandom = ({
  championInGame,
  games,
  champions,
  selectedRole,
  selectedChampionId,
}: LineChartProps) => {
  const filteredChampions = championInGame.filter(
    (cig) =>
      cig.role === selectedRole &&
      (cig.championId === selectedChampionId ||
        (cig.isOpponent &&
          cig.championId === selectedChampionId &&
          championInGame.find(
            (opponentCig) =>
              opponentCig.gameId === cig.gameId &&
              opponentCig.role === selectedRole &&
              opponentCig.isOpponent &&
              opponentCig.championId === selectedChampionId
          )))
  );

  const groupedData: Record<
    string,
    Record<number, { totalDamage: number; gameCount: number }>
  > = {};
  filteredChampions.forEach((cig) => {
    const { gameId, role, isOpponent, championId, damage } = cig;
    if (role === selectedRole && championId === selectedChampionId) {
      const game = games.find((game) => game.id === gameId);
      if (game) {
        const month = new Date(game.createdAt).getMonth();
        const key = isOpponent ? "opponent" : "player";
        const championKey = `${key}_${championId}`;
        groupedData[championKey] = groupedData[championKey] || {};
        groupedData[championKey][month] = groupedData[championKey][month] || {
          totalDamage: 0,
          gameCount: 0,
        };
        groupedData[championKey][month].totalDamage += damage;
        groupedData[championKey][month].gameCount += 1;
      }
    }
  });

  const averageDamageData = Object.keys(groupedData).map((championKey) => {
    const [key, id] = championKey.split("_");
    const champion = champions.find((champion) => champion.id === id);
    const championName = champion
      ? key === "opponent"
        ? `${champion.name} (Adversário)`
        : champion.name
      : "Unknown";
    const championAverageDamage = Array.from(
      { length: 12 },
      (_, index) =>
        groupedData[championKey][index]?.totalDamage /
          groupedData[championKey][index]?.gameCount || 0
    );
    return {
      championId: id,
      data: championAverageDamage,
      championName: championName,
    };
  });

  console.log("aaaaaaaaa", averageDamageData);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const data = {
    labels: months,
    datasets: averageDamageData.map((championData) => {
      return {
        label: championData.championName,
        data: championData.data,
        borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
        borderWidth: 3,
        pointBorderColor:
          "#" + Math.floor(Math.random() * 16777215).toString(16),
        pointBorderWidth: 3,
        tension: 0.5,
        fill: true,
        backgroundColor: "rgba(97, 219, 251, 0.4)",
      };
    }),
  };

  const options = {
    responsive: true,
    scales: {
      y: {
        title: {
          display: true,
          text: "Average Damage",
        },
      },
      x: {
        title: {
          display: true,
          text: "Month",
        },
      },
    },
  };

  return (
    <div>
      <Line data={data} options={options} />
    </div>
  );
};
