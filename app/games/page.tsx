import prismaDB from "@/lib/prismadb";
import { GameClient } from "./_components/game-client";
import { GameColumn } from "./_components/game-column";

const Games = async () => {
  const games = await prismaDB.game.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const versions = await prismaDB.gameVersion.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const formattedGames: GameColumn[] = games.map((item) => {
    const version = versions.find(
      (version) => version.id === item.defaultVersionId
    );
    const patch = version ? version.name : "Unknown";

    return {
      id: item.id,
      gameDuration: item.gameDuration,
      patch,
      win: item.win,
    };
  });

  return (
    <div className=" flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <GameClient data={formattedGames} />
      </div>
    </div>
  );
};

export default Games;
