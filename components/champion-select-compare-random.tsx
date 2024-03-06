import { useState } from "react";
import { Champion } from "@prisma/client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { GameChampion } from "@prisma/client";

interface ChampionSelectCompareRandomProps {
  championsInGame: GameChampion[];
  selectedRole: string;
  champions: Champion[];
  onChangeChampion: (championId: string) => void;
}

export const ChampionSelectCompareRandom = ({
  champions,
  selectedRole,
  championsInGame,
  onChangeChampion,
}: ChampionSelectCompareRandomProps) => {
  const [selectedChampionId, setSelectedChampionId] = useState<string>("");

  const championsInRole = selectedRole
    ? Array.from(
        new Set(
          championsInGame
            .filter((c) => c.role === selectedRole)
            .map((c) => c.championId)
        )
      ).map((championId) =>
        champions.find((champion) => champion.id === championId)
      )
    : [];

  return (
    <Select onValueChange={onChangeChampion} value={selectedChampionId}>
      <SelectTrigger className="w-[180px] mb-5">
        <SelectValue placeholder="Select a Champion" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {championsInRole.map((champion) => (
            <SelectItem key={champion?.id} value={champion ? champion.id : ""}>
              {champion?.name}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};
