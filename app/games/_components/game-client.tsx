"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";

import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { GameColumn, columns } from "./game-column";
import { GameDataTable } from "@/components/ui/game-data-table";

interface GameClientProps {
  data: GameColumn[];
}

export const GameClient = ({ data }: GameClientProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Header title="Games" description="Manage games to your table" />
        <Button onClick={() => router.push("/games/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <GameDataTable columns={columns} searchKey="games" data={data} />
    </>
  );
};
