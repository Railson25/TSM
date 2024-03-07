"use client";

import { ColumnDef } from "@tanstack/react-table";
import { GameActions } from "../../_components/game-actions";
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
    cell: ({ row }) => <GameActions data={row.original} />,
  },
];
