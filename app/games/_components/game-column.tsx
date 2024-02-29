"use client";

import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { ChampionActions } from "./game-actions";
import { Button } from "@/components/ui/button";

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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Win
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
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
