"use client";

import React, { createContext, useContext, useState } from "react";

export interface GameData {
  damage: number;
  gold: number;
  goldAtFiveMin: number | null;
  goldAtTenMin: number | null;
  role: string;
  championId: string;
}

interface GameDataContextType {
  gameData: GameData[];
  addToGameData: (data: GameData) => void;
}

const GameDataContext = createContext<GameDataContextType | undefined>(
  undefined
);

export const useGameData = (): GameDataContextType => {
  const context = useContext(GameDataContext);
  if (!context) {
    throw new Error("useGameData must be used within a GameDataProvider");
  }
  return context;
};

export const GameDataProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [gameData, setGameData] = useState<GameData[]>([]);

  const addToGameData = (data: GameData) => {
    setGameData([...gameData, data]);
  };

  return (
    <GameDataContext.Provider value={{ gameData, addToGameData }}>
      {children}
    </GameDataContext.Provider>
  );
};
