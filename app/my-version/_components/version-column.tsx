"use client";

import { ColumnDef } from "@tanstack/react-table";
import { VersionActions } from "./version-actions";

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
    cell: ({ row }) => <VersionActions data={row.original} />,
  },
];
