"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { ChampionColumn, columns } from "./champion-column";
import { useRole } from "@/context/role-context";

interface ChampionClientProps {
  data: ChampionColumn[];
}

export const ChampionClient = ({ data }: ChampionClientProps) => {
  const router = useRouter();

  const role = useRole();

  return (
    <>
      <div className="flex items-center justify-between">
        <Header
          title="Champions"
          description="Manage champions to your table"
        />

        {role.role === "admin" && (
          <Button onClick={() => router.push("/champions/new")}>
            <Plus className="mr-2 h-4 w-4" />
            Add new
          </Button>
        )}
      </div>
      <Separator />
      <DataTable columns={columns} searchKey="name" data={data} />
    </>
  );
};
