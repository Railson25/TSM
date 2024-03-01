"use client";

import { ArrowUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import useGames from "@/hook/useGames";
import { Game } from "@prisma/client";
import { calculateLossPercentage, calculateWinPercentage } from "@/lib/utils";

export const HomeCard = () => {
  const games: Game[] = useGames();

  const winGames = games.filter((game) => game.win);
  const lossesGames = games.filter((game) => game.lose);

  const currentDate = new Date();
  const lastMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );

  const { currentMonthWinPercentage } = calculateWinPercentage(
    games,
    currentDate,
    lastMonthDate
  );

  const { currentMonthLossPercentage } = calculateLossPercentage(
    games,
    currentDate,
    lastMonthDate
  );

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Wins</CardTitle>
          <ArrowUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">{winGames.length}</span>
          <p className="text-xs text-muted-foreground">
            {currentMonthWinPercentage.toFixed(2)}% this month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Loses</CardTitle>
          <ArrowUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">{lossesGames.length}</span>
          <p className="text-xs text-muted-foreground">
            {currentMonthLossPercentage.toFixed(2)}% last month
          </p>
        </CardContent>
      </Card>
    </>
  );
};
