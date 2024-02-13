"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChampionActions } from "./champion-actions";

export type ChampionColumn = {
  id: string;
  name: string;
  games: number;
};

export const columns: ColumnDef<ChampionColumn>[] = [
  {
    accessorKey: "name",
    header: "Champion Name",
  },
  {
    accessorKey: "games",
    header: "Champion Games",
  },
  {
    id: "actions",
    cell: ({ row }) => <ChampionActions data={row.original} />,
  },
];
