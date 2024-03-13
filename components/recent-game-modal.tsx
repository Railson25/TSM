"use client";

import { useChampionsById } from "@/hook/useChampionsById";
import useGames from "@/hook/useGames";
import { Game } from "@prisma/client";

import { TableCell, TableRow } from "./ui/table";

interface RecentGameModalProps {
  selectedGameId: string;
}

export const RecentGameModal = ({ selectedGameId }: RecentGameModalProps) => {
  const games: Game[] = useGames();
  const championInGame = useChampionsById(selectedGameId);
  return (
    <>
      {games
        .filter((game) => game.id === selectedGameId)
        .map((game) =>
          championInGame
            .filter((champion) => champion.gameId === game.id)
            .map((champion) => (
              <TableRow key={champion.id}>
                <TableCell>{game.win ? "Victory" : "Defeat"}</TableCell>
                <TableCell>{champion.role}</TableCell>
                <TableCell>{champion.damage}</TableCell>
                <TableCell>{champion.gold}</TableCell>
                <TableCell className="font-medium">
                  {game.gameDuration} - Min
                </TableCell>
              </TableRow>
            ))
        )}
    </>
  );
};
