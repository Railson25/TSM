"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export const VersionClient = () => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Header title="Versions" description="Manage version to your game" />
        <Button onClick={() => router.push("/my-version/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
      </div>
      <Separator />
      <DataTable columns={[]} data={[]} searchKey="id" />
    </>
  );
};
