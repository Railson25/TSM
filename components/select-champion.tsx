"use client";

import * as React from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import prismaDB from "@/lib/prismadb";
import { Champion } from "@prisma/client";
import axios from "axios";

interface ChampionSelectProps {
  selectedChampion: Champion | null;
  setSelectedChampion: React.Dispatch<React.SetStateAction<Champion | null>>;
}

export const ChampionSelect = ({
  selectedChampion,
  setSelectedChampion,
}: ChampionSelectProps) => {
  const [champions, setChampions] = React.useState<Champion[]>([]);
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  const handleClick = async () => {
    try {
      const response = await axios.get("/api/champions");
      setChampions(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(champions);

  const handleSelectChampion = (champion: Champion) => {
    setSelectedChampion(champion);
    setIsOpen(false);
  };

  return (
    <Select onOpenChange={handleClick}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a Champion" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Champions</SelectLabel>
          {champions.map((champion) => (
            <SelectItem
              key={champion.id}
              value={champion.name}
              onClick={() => handleSelectChampion(champion)}
            >
              {champion.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
