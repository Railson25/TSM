"use client";

import * as React from "react";
import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ChampionRole } from "@prisma/client";

export const frameworks: { value: ChampionRole; label: string }[] = [
  { value: "SUPPORT", label: "SUPPORT" },
  { value: "ADC", label: "ADC" },
  { value: "MID", label: "MID" },
  { value: "JG", label: "JG" },
  { value: "TOP", label: "TOP" },
];

interface ChampionRoleSelectProps {
  value: ChampionRole | undefined;
  setValue: React.Dispatch<React.SetStateAction<ChampionRole | undefined>>;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ChampionRoleSelect = ({
  value,
  setValue,
  open,
  setOpen,
}: ChampionRoleSelectProps) => {
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between uppercase"
        >
          {value ? value : "Select role..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0 ">
        <Command>
          <CommandGroup>
            {frameworks.map((framework) => (
              <CommandItem
                key={framework.value}
                value={framework.value}
                onSelect={() => {
                  setValue(framework.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === framework.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {framework.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};
