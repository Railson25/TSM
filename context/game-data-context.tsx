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
  clearGameData: () => void;
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
    const isIdDuplicate = gameData.some(
      (game) => game.championId === data.championId
    );

    if (isIdDuplicate) {
      throw new Error(`Champion with ID ${data.championId} already exists.`);
    }

    setGameData([...gameData, data]);
  };

  const clearGameData = () => {
    setGameData([]);
  };

  return (
    <GameDataContext.Provider
      value={{ gameData, addToGameData, clearGameData }}
    >
      {children}
    </GameDataContext.Provider>
  );
};
