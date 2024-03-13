"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GameTableActions } from "./game-table-actions";
import { GameData } from "@/context/game-data-context";

export const columns: ColumnDef<GameData>[] = [
  {
    accessorKey: "role",
    header: "Champion Role",
  },
  {
    accessorKey: "gold",
    header: "Champion gold",
  },
  {
    accessorKey: "damage",
    header: "Champion damage",
  },

  {
    id: "actions",
    cell: ({ row }) => <GameTableActions data={row.original} />,
  },
];
