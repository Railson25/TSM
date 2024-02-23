"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ChampionActions } from "../../_components/game-actions";
import { GameData } from "@/context/game-data-context";

// export type GameTableColumn = {
//   championId: string;
//   gold: number;
//   damage: number;
// };

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
    cell: ({ row }) => <ChampionActions data={row.original} />,
  },
];
