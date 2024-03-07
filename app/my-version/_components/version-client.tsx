"use client";

import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { DataTable } from "@/components/ui/data-table";
import { Separator } from "@/components/ui/separator";

import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { VersionColumn, columns } from "./version-column";
import { Protect } from "@clerk/nextjs";

interface VersionClientProps {
  data: VersionColumn[];
}

export const VersionClient = ({ data }: VersionClientProps) => {
  const router = useRouter();

  return (
    <>
      <div className="flex items-center justify-between">
        <Header title="Versions" description="Manage version to your game" />

        {/* <Protect permission="admin"> */}
        <Button onClick={() => router.push("/my-version/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>
        {/* </Protect> */}
      </div>
      <Separator />
      <DataTable columns={columns} data={data} searchKey="name" />
    </>
  );
};
