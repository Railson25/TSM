"use client";

import useGames from "@/hook/useGames";
import { useUser } from "@clerk/nextjs";
import { Game } from "@prisma/client";
import { Check, Cigarette, X } from "lucide-react";

export const RecentGames = () => {
  const { user } = useUser();

  const games: Game[] = useGames();

  const formatGameDuration = (gameDate: Date): string => {
    const now = new Date();
    const diff = Math.abs(now.getTime() - gameDate.getTime());
    const minutes = Math.floor(diff / (1000 * 60));
    if (minutes < 60) {
      return `${minutes} minutos atrás`;
    } else {
      const hours = Math.floor(minutes / 60);
      return `${hours} horas atrás`;
    }
  };

  return (
    <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white ">
      <h1 className="text-gray-800 font-bold text-center">Recent Games</h1>
      <ul>
        {games
          .slice()
          .reverse()
          .slice(0, 7)
          .map((game) => (
            <li
              key={game.id}
              className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
            >
              <div
                className={`rounded-lg p-3 ${
                  game.win ? "bg-emerald-100" : "bg-red-100"
                }`}
              >
                {game.win ? (
                  <Check className="text-emerald-800" />
                ) : (
                  <X className="text-red-800" />
                )}
              </div>
              <div className="pl-4">
                {game.win ? (
                  <p className="text-emerald-600 font-bold">Victory</p>
                ) : (
                  <p className="text-red-600 font-bold">Defeat</p>
                )}

                <p className="text-gray-400 text-sm">{user?.firstName}</p>
              </div>
              <p className="text-gray-800 lg:flex md:hidden absolute right-6 text-sm">
                {formatGameDuration(new Date(game.createdAt))}
              </p>
            </li>
          ))}
      </ul>
    </div>
  );
};
