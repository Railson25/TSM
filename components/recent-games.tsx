"use client";

import useGames from "@/hook/useGames";
import { useAuth, useUser } from "@clerk/nextjs";
import { Game } from "@prisma/client";
import { Check, X } from "lucide-react";
import { Skeleton } from "./ui/skeleton";

import React, { useState } from "react";
import { Modal } from "./modal";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";

import { RecentGameModal } from "./recent-game-modal";

export const RecentGames = () => {
  const { user } = useUser();
  const { userId } = useAuth();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedGameId, setSelectedGameId] = useState<string>("");

  const games: Game[] = useGames();
  const gamesLoaded = games.length > 0;

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

  const hasGames =
    games.filter((game) => game.createdByUserId === userId).length > 0;

  return (
    <>
      <div className="w-full col-span-1 relative lg:h-[70vh] h-[50vh] m-auto p-4 border rounded-lg bg-white">
        <h1 className="text-gray-800 font-bold text-center">Recent Games</h1>
        {!gamesLoaded && (
          <div className="w-full flex justify-center items-center h-full">
            <Skeleton className="text-black   bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center">
              Loading..
            </Skeleton>
          </div>
        )}
        {gamesLoaded && (
          <>
            {hasGames ? (
              <ul>
                {games
                  .filter((game) => game.createdByUserId === userId)
                  .slice()
                  .reverse()
                  .slice(0, 7)
                  .map((game) => (
                    <li
                      key={game.id}
                      className="bg-gray-50 hover:bg-gray-100 rounded-lg my-3 p-2 flex items-center cursor-pointer"
                      onClick={() => {
                        setSelectedGameId(game.id);
                        setModalOpen(true);
                      }}
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

                        <p className="text-gray-400 text-sm">
                          {user?.firstName}
                        </p>
                      </div>
                      <p className="text-gray-800 lg:flex md:hidden absolute right-6 text-sm">
                        {formatGameDuration(new Date(game.createdAt))}
                      </p>
                    </li>
                  ))}
              </ul>
            ) : (
              <div className="w-full flex justify-center items-center h-full">
                <p className="text-gray-800 ">You do not have games yet</p>
              </div>
            )}
          </>
        )}
      </div>

      <Modal
        description=""
        title=""
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        className="w-[300px] sm:w-[600px]  overflow-x-scroll sm:overflow-hidden"
      >
        {modalOpen && (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Result</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Damage</TableHead>
                <TableHead>Gold</TableHead>
                <TableHead className="text-right">duration</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <RecentGameModal selectedGameId={selectedGameId} />
            </TableBody>
          </Table>
        )}
      </Modal>
    </>
  );
};
