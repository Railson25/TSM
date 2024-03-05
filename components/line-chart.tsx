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
import { useState } from "react";

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
}

export const LineChart = ({
  championInGame,
  games,
  champions,
}: LineChartProps) => {
  const groupedData = games.reduce((acc: any, game) => {
    const month = new Date(game.createdAt).getMonth();
    championInGame.forEach((cig) => {
      if (cig.gameId === game.id) {
        const championId = cig.championId;
        acc[championId] = acc[championId] || {};
        acc[championId][month] = acc[championId][month] || {
          totalDamage: 0,
          gameCount: 0,
        };
        acc[championId][month].totalDamage += cig.damage;
        acc[championId][month].gameCount += 1;
      }
    });
    return acc;
  }, {});

  const averageDamageData = Object.keys(groupedData).map((championId) => {
    const championAverageDamage = Array.from(
      { length: 12 },
      (_, index) =>
        groupedData[championId][index]?.totalDamage /
          groupedData[championId][index]?.gameCount || 0
    );
    return {
      championId,
      data: championAverageDamage,
    };
  });

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
    datasets: averageDamageData.map((championData) => ({
      label:
        champions.find((champion) => champion.id === championData.championId)
          ?.name || "Unknown",
      data: championData.data,
      borderColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
      borderWidth: 3,
      pointBorderColor: "#" + Math.floor(Math.random() * 16777215).toString(16),
      pointBorderWidth: 3,
      tension: 0.5,
      fill: true,
      backgroundColor: "rgba(97, 219, 251, 0.4)",
    })),
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
