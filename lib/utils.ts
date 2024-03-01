import { Game } from "@prisma/client";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatDurationGame = (duration: number): string => {
  const hours = Math.floor(duration / 3600);
  const minutes = Math.floor((duration % 3600) / 60);
  const seconds = duration % 60;

  const formattedHours = hours.toString();
  const formattedMinutes = minutes.toString().padStart(2, "0");
  const formattedSeconds = seconds.toString().padStart(2, "0");

  return `${formattedHours} :${formattedMinutes}.${formattedSeconds}`;
};

export const toMinutes = (value: number): number => {
  const minutes = Math.floor(value / 100);
  const seconds = value % 100;
  const totalMinutes = minutes + seconds / 60;
  return Math.floor(totalMinutes);
};

export const calculateWinPercentage = (
  games: Game[],
  currentDate: Date,
  lastMonthDate: Date
) => {
  const currentMonthGames = games.filter((game): game is Game => {
    const gameDate = new Date(game.createdAt);
    return (
      gameDate.getMonth() === currentDate.getMonth() &&
      gameDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const lastMonthGames = games.filter((game): game is Game => {
    const gameDate = new Date(game.createdAt);
    return (
      gameDate.getMonth() === lastMonthDate.getMonth() &&
      gameDate.getFullYear() === lastMonthDate.getFullYear()
    );
  });

  const currentMonthWinGames = currentMonthGames.filter((game) => game.win);
  const lastMonthWinGames = lastMonthGames.filter((game) => game.win);

  const currentMonthWinPercentage =
    currentMonthGames.length > 0
      ? (currentMonthWinGames.length / currentMonthGames.length) * 100
      : 0;

  const lastMonthWinPercentage =
    lastMonthGames.length > 0
      ? (lastMonthWinGames.length / lastMonthGames.length) * 100
      : 0;

  return {
    currentMonthGames,
    lastMonthGames,
    currentMonthWinPercentage,
    lastMonthWinPercentage,
  };
};

export const calculateLossPercentage = (
  games: Game[],
  currentDate: Date,
  lastMonthDate: Date
) => {
  const currentMonthGames = games.filter((game): game is Game => {
    const gameDate = new Date(game.createdAt);
    return (
      gameDate.getMonth() === currentDate.getMonth() &&
      gameDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const lastMonthGames = games.filter((game): game is Game => {
    const gameDate = new Date(game.createdAt);
    return (
      gameDate.getMonth() === lastMonthDate.getMonth() &&
      gameDate.getFullYear() === lastMonthDate.getFullYear()
    );
  });

  const currentMonthLossGames = currentMonthGames.filter((game) => !game.win);
  const lastMonthLossGames = lastMonthGames.filter((game) => !game.win);

  const currentMonthLossPercentage =
    currentMonthGames.length > 0
      ? (currentMonthLossGames.length / currentMonthGames.length) * 100
      : 0;

  const lastMonthLossPercentage =
    lastMonthGames.length > 0
      ? (lastMonthLossGames.length / lastMonthGames.length) * 100
      : 0;

  return {
    currentMonthLossGames,
    lastMonthLossGames,
    currentMonthLossPercentage,
    lastMonthLossPercentage,
  };
};
