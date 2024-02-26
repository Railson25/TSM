"use client";
import { Button } from "@/components/ui/button";

import {
  ColumnDef,
  ColumnFiltersState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import React, { useState } from "react";
import { GameData, useGameData } from "@/context/game-data-context";

import { GameFormValues } from "./game-form";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

console.log(GameTable);

interface DataTableProps<TValue> {
  columns: ColumnDef<GameData, TValue>[];
  searchKey: string;
}

export function GameTable<TData, TValue>({
  columns,
  searchKey,
}: DataTableProps<TValue>) {
  const params = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { gameData, clearGameData } = useGameData();
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const table = useReactTable({
    data: gameData,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      columnFilters,
    },
  });

  const onSubmit = async (data: GameFormValues[]) => {
    try {
      setLoading(true);
      // if (data) {
      //   console.log(data);
      //   await axios.patch(`/api/games/${params.data}`, data);
      //   toast({
      //     variant: "success",
      //     description: "Game updated",
      //   });
      // } else {
      await axios.post(`/api/games`, data);
      toast({
        variant: "success",
        description: "Game created",
      });
      // }
      clearGameData();
      router.push(`/games`);
      router.refresh();
    } catch (error) {
      toast({
        variant: "destructive",
        description: "Something went wrong!",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div className="rounded-md border mt-6">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-start space-x-2 py-4">
        <Button variant="default" size="lg" onClick={() => onSubmit(gameData)}>
          Create
        </Button>
      </div>
    </div>
  );
}
