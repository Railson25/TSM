"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { MoreHorizontal, Trash } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { GameData, useGameData } from "@/context/game-data-context";

interface GameTableActionsProps {
  data: GameData;
}

export const GameTableActions = ({ data }: GameTableActionsProps) => {
  const { removeFromGameData } = useGameData();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  console.log(data);

  const onDelete = async () => {
    try {
      setLoading(true);
      console.log("aaahuabvaghj");
      removeFromGameData(data.championId);

      router.refresh();
    } catch (error: any) {
      console.log(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuItem onClick={onDelete}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
