"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChampionActions } from "./game-actions";

export type GameColumn = {
  id: string;
  gameDuration: string;
  win: boolean;
  lose: boolean;
};

export const columns: ColumnDef<GameColumn>[] = [
  {
    accessorKey: "gameDuration",
    header: "Games",
  },
  {
    accessorKey: "win",
    header: "Game win",
  },
  {
    accessorKey: "lose",
    header: "Game lose",
  },

  {
    id: "actions",
    cell: ({ row }) => <ChampionActions data={row.original} />,
  },
];
