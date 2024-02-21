"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChampionActions } from "../../_components/game-actions";

export type GameTableColumn = {
  id: string;
  name: string;
  damage: number;
};

export const columns: ColumnDef<GameTableColumn>[] = [
  {
    accessorKey: "id",
    header: "Games",
  },
  {
    accessorKey: "name",
    header: "Champion name",
  },
  {
    accessorKey: "damage",
    header: "Champion damage",
  },

  {
    id: "actions",
    cell: ({ row }) => <ChampionActions data={row.original} />,
  },
];
