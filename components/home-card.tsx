"use client";

import { ArrowDown, ArrowUp, Flame, Joystick } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import useGames from "@/hook/useGames";
import { Game, GameChampion } from "@prisma/client";
import {
  calculateDamageAverageForCurrentMonth,
  calculateLossPercentage,
  calculateWinPercentage,
} from "@/lib/utils";
import { useChampionsInGames } from "@/hook/useChampionsById";

export const HomeCard = () => {
  const games: Game[] = useGames();

  const champions: GameChampion[] = useChampionsInGames();

  const winGames = games.filter((game) => game.win);

  const totalWins = games.filter((game) => game.win).length;

  const winRate = games.length > 0 ? (totalWins / games.length) * 100 : 0;

  const currentDate = new Date();
  const lastMonthDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() - 1,
    1
  );

  const { currentMonthWinPercentage } = calculateWinPercentage(
    games,
    currentDate
  );

  const { lastMonthLossPercentage, lastMonthLossGames } =
    calculateLossPercentage(games, currentDate, lastMonthDate);

  const damageByMonth = calculateDamageAverageForCurrentMonth(
    champions,
    games,
    currentDate
  );

  console.log(champions);

  return (
    <>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Wins</CardTitle>
          <ArrowUp className="h-4 w-4 text-muted-foreground text-emerald-500" />
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
          <ArrowDown className="h-4 w-4 text-muted-foreground text-red-600" />
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">
            {lastMonthLossGames.length}
          </span>
          <p className="text-xs text-muted-foreground">
            {lastMonthLossPercentage.toFixed(2)}% last month
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Damage by month</CardTitle>
          <Flame className="h-4 w-4 text-muted-foreground text-red-700" />
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">
            {damageByMonth.toLocaleString().replace(",", ".")}
          </span>
          <p className="text-xs text-muted-foreground">damage by month</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Games</CardTitle>
          <Joystick className="h-4 w-4 text-muted-foreground text-purple-600" />
        </CardHeader>
        <CardContent>
          <span className="text-2xl font-bold">{games.length}</span>
          <p className="text-xs text-muted-foreground">
            {winRate.toFixed(2)}% win rate
          </p>
        </CardContent>
      </Card>
    </>
  );
};
