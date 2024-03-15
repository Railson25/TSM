"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChampionActions } from "./champion-actions";

export type ChampionColumn = {
  id: string;
  name: string;
};

export const columns: ColumnDef<ChampionColumn>[] = [
  {
    accessorKey: "name",
    header: "Champion Name",
  },
  {
    id: "actions",
    cell: ({ row }) => <ChampionActions data={row.original} />,
  },
];
