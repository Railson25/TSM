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
          onClick={() => router.push("/")}
        >
          <Plus size={15} />
          <span>Add Game</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex gap-2 items-center"
          onClick={() => router.push("/")}
        >
          <PenLine size={15} />
          <span>My games</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          className="cursor-pointer flex gap-2 items-center"
          onClick={() => router.push("/")}
        >
          <User size={15} />
          <span>My Page</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
