"use client";

import { Champion, Game, GameChampion } from "@prisma/client";

import { useEffect, useState } from "react";
import { DamageSelectCompareRandom } from "./damage-select-compare-random";
import { LineChartCompareRandom } from "./line-chart-compare-random";
import { ChampionSelectCompareRandom } from "./champion-select-compare-random";

interface AverageDamageProps {
  championInGame: GameChampion[];
  games: Game[];
  champions: Champion[];
}
export const AverageDamageCompareRandom = ({
  championInGame,
  champions,
  games,
}: AverageDamageProps) => {
  const [selectedChampion, setSelectedChampion] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };
  const handleChampionChange = (champion: string) => {
    setSelectedChampion(champion);
  };

  useEffect(() => {}, [selectedChampion]);

  return (
    <div>
      <div className=" flex  justify-center gap-3">
        <DamageSelectCompareRandom onChangeRole={handleRoleChange} />
        <ChampionSelectCompareRandom
          championsInGame={championInGame}
          selectedRole={selectedRole}
          champions={champions}
          onChangeChampion={handleChampionChange}
        />
      </div>

      <LineChartCompareRandom
        championInGame={championInGame}
        champions={champions}
        games={games}
        selectedRole={selectedRole}
        selectedChampionId={selectedChampion}
      />
    </div>
  );
};
