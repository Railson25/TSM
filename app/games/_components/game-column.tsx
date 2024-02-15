"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChampionActions } from "./game-actions";

export type GameColumn = {
  id: string;
};

export const columns: ColumnDef<GameColumn>[] = [
  {
    accessorKey: "id",
    header: "Games",
  },

  {
    id: "actions",
    cell: ({ row }) => <ChampionActions data={row.original} />,
  },
];
