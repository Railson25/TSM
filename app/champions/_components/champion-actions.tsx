"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import axios from "axios";

import { Edit, MoreHorizontal, Trash } from "lucide-react";

import { ChampionColumn } from "./champion-column";
import { AlertModal } from "@/components/alert-modal";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast";
import { useRole } from "@/context/role-context";

interface ChampionActionsProps {
  data: ChampionColumn;
}

export const ChampionActions = ({ data }: ChampionActionsProps) => {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const { toast } = useToast();
  const role = useRole();

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(`/api/champions/${data.id}`);
      router.refresh();
      router.push(`/champions`);
      toast({
        variant: "success",
        description: "Champion deleted",
      });
    } catch (error) {
      if (role && role.role === "admin") {
        toast({
          variant: "destructive",
          description: "Something went wrong!",
        });
      }
      toast({
        variant: "destructive",
        description: "Not authorized!",
      });
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>

          {role.role === "admin" && (
            <DropdownMenuItem
              onClick={() => router.push(`/champions/${data.id}`)}
            >
              <Edit className="mr-2 h-4 w-4" />
              Update
            </DropdownMenuItem>
          )}
          <DropdownMenuItem onClick={() => setOpen(true)}>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};
