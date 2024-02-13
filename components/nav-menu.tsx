"use client";

import * as React from "react";
import { ChevronsUpDown, PenLine, Plus, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

export function NavMenu() {
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon">
          <ChevronsUpDown />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuItem
          className="cursor-pointer flex gap-2 items-center"
          onClick={() => router.push("/champions")}
        >
          <Plus size={15} />
          <span>My Champions</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex gap-2 items-center"
          onClick={() => router.push("/my-games")}
        >
          <PenLine size={15} />
          <span>My games</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex gap-2 items-center"
          onClick={() => router.push("/my-page")}
        >
          <User size={15} />
          <span>My Page</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
