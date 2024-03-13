"use client";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Pie } from "react-chartjs-2";
import { Champion, Game, GameChampion } from "@prisma/client";
import { useAuth } from "@clerk/nextjs";
import Image from "next/image";
import { Alert, AlertDescription, AlertTitle } from "./ui/alert";
import { AlertOctagon } from "lucide-react";

ChartJS.register(ArcElement, Tooltip, Legend);

interface ChampionPieChartProps {
  games: Game[];
  champions: Champion[];
  championInGame: GameChampion[];
}

export const ChampionPieChart = ({
  championInGame,
  champions,
  games,
}: ChampionPieChartProps) => {
  const { userId } = useAuth();

  const userGames = games.filter((game) => game.createdByUserId === userId);

  const championIds = userGames.flatMap((game) =>
    championInGame
      .filter((cig) => cig.gameId === game.id)
      .map((cig) => cig.championId)
  );

  const championCount = championIds.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const sortedChampions = Object.entries(championCount)
    .sort(([, countA], [, countB]) => countB - countA)
    .map(([id]) => id);

  const topChampions = sortedChampions
    .filter((id) => {
      const champion = championInGame.find((cig) => cig.championId === id);
      return (
        champion &&
        !champion.isOpponent &&
        userGames.some((game) => game.id === champion.gameId)
      );
    })
    .slice(0, 6);

  const mostPlayedChampionId = topChampions[0];
  const mostPlayedChampion = champions.find(
    (champion) => champion.id === mostPlayedChampionId
  );

  const data = {
    labels: topChampions.map(
      (id) => champions.find((champion) => champion.id === id)?.name ?? ""
    ),
    datasets: [
      {
        label: "# de Jogos",
        data: topChampions.map((id) => championCount[id] ?? 0),
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="flex max-sm:flex-col-reverse gap-x-10 max-sm:items-center mt-20 max-sm:mt-10 ">
      <div className="w-1/2 align-middle sm:pl-4 flex max-sm:w-full max-sm:px-4">
        {data.labels.length === 0 ? (
          <Alert className="h-[130px] flex ">
            <div className="mr-5 text-purple-600">
              <AlertOctagon />
            </div>
            <div>
              <AlertTitle>No games yet</AlertTitle>
              <AlertDescription>
                The graph will be generated when there are games
              </AlertDescription>
            </div>
          </Alert>
        ) : (
          <Pie data={data} />
        )}
      </div>
      <div className="w-full flex flex-col items-center justify-center max-sm:mb-10">
        <h1 className="font-black text-2xl mb-5">Campeao mais jogado 🥇</h1>
        <div className="aspect-[3/4] relative w-[300px] h-[300px] rounded-full">
          <Image
            src={mostPlayedChampion?.imageURL ?? "/images/kaisa3.jpg"}
            alt="Image"
            fill
            className="w-full h-full rounded-full object-cover absolute"
          />
        </div>
      </div>
    </div>
  );
};
