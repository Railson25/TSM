"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChampionActions } from "./version-actions";

export type VersionColumn = {
  id: string;
  name: string;
};

export const columns: ColumnDef<VersionColumn>[] = [
  {
    accessorKey: "name",
    header: "Version Name",
  },
  {
    id: "actions",
    cell: ({ row }) => <ChampionActions data={row.original} />,
  },
];
