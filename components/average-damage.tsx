"use client";

import { DamageSelect } from "./damage-select";
import { Champion, Game, GameChampion } from "@prisma/client";
import { LineChart } from "./line-chart";
import { useState } from "react";

interface AverageDamageProps {
  championInGame: GameChampion[];
  games: Game[];
  champions: Champion[];
}
export const AverageDamage = ({
  championInGame,
  champions,
  games,
}: AverageDamageProps) => {
  const [selectedRole, setSelectedRole] = useState("");
  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <DamageSelect onChangeRole={handleRoleChange} />
      </div>

      <LineChart
        championInGame={championInGame}
        champions={champions}
        games={games}
        selectedRole={selectedRole}
      />
    </>
  );
};
