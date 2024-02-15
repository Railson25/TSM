import prismaDB from "@/lib/prismadb";
import { GameClient } from "./_components/game-client";
import { GameColumn } from "./_components/game-column";

const Games = async () => {
  const games = await prismaDB.game.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const formattedGames: GameColumn[] = games.map((item) => ({
    id: item.id,
  }));

  console.log(formattedGames);
  return (
    <div className=" flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <GameClient data={formattedGames} />
      </div>
    </div>
  );
};

export default Games;
