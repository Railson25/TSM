import { Game, GameChampion } from "@prisma/client";
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

export const calculateWinPercentage = (games: Game[], currentDate: Date) => {
  const currentMonthGames = games.filter((game): game is Game => {
    const gameDate = new Date(game.createdAt);
    return (
      gameDate.getMonth() === currentDate.getMonth() &&
      gameDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const currentMonthWinGames = currentMonthGames.filter((game) => game.win);

  const currentMonthWinPercentage =
    currentMonthGames.length > 0
      ? (currentMonthWinGames.length / currentMonthGames.length) * 100
      : 0;

  return {
    currentMonthGames,
    currentMonthWinPercentage,
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

  const lastMonthLossGames = lastMonthGames.filter((game) => !game.win);

  const lastMonthLossPercentage =
    lastMonthGames.length > 0
      ? (lastMonthLossGames.length / lastMonthGames.length) * 100
      : 0;

  return {
    lastMonthLossGames,
    lastMonthLossPercentage,
  };
};

export const calculateDamageAverageForCurrentMonth = (
  champions: GameChampion[],
  games: Game[],
  currentDate: Date
): number => {
  const currentMonthGames = games.filter((game) => {
    const gameDate = new Date(game.createdAt);
    return (
      gameDate.getMonth() === currentDate.getMonth() &&
      gameDate.getFullYear() === currentDate.getFullYear()
    );
  });

  const currentMonthChampionIds = currentMonthGames.flatMap((game) =>
    champions
      .filter((champion) => champion.gameId === game.id)
      .map((champion) => champion.championId)
  );

  const currentMonthChampions = champions.filter((champion) =>
    currentMonthChampionIds.includes(champion.championId)
  );

  const totalDamage = currentMonthChampions.reduce(
    (acc, champion) => acc + champion.damage,
    0
  );
  const championCount = currentMonthChampionIds.length;

  const averageDamage = championCount > 0 ? totalDamage / championCount : 0;

  return averageDamage;
};
