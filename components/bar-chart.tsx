"use client";

import { Bar } from "react-chartjs-2";

import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { useEffect, useState } from "react";
import useGames from "@/hook/useGames";
import { Game } from "@prisma/client";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const BarChart = () => {
  const games: Game[] = useGames();

  const [chartData, setChartData] = useState<any>({
    datasets: [],
  });

  const [chartOptions, setChartOptions] = useState({});

  useEffect(() => {
    const now = new Date();
    const sevenDaysAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const gamesWithinLastSevenDays = games.filter((game) => {
      const gameDate = new Date(game.createdAt);
      return gameDate >= sevenDaysAgo && gameDate <= now;
    });

    const gamesByDay: number[] = [0, 0, 0, 0, 0, 0, 0];
    gamesWithinLastSevenDays.forEach((game) => {
      const dayOfWeek = new Date(game.createdAt).getDay();
      gamesByDay[dayOfWeek] += 1;
    });

    const data = Object.values(gamesByDay);
    setChartData({
      labels: ["Mon", "Tues", "Wed", "Thurs", "Fri", "Sat", "Sun"],
      datasets: [
        {
          label: "Games",
          data: data,
          borderColor: "rgb(53, 162, 235)",
          backgroundColor: "rgb(53,162,235,0.4)",
        },
      ],
    });
    setChartOptions({
      plugins: {
        legend: {
          position: "top",
        },
        title: {
          display: true,
          text: "Daily Game",
        },
      },
      maintainAspectRatio: false,
      responsive: true,
    });
  }, [games]);

  return (
    <>
      <div className=" w-full md:col-span-2 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
        <Bar data={chartData} options={chartOptions} />
      </div>
    </>
  );
};
