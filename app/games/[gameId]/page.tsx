import prismaDB from "@/lib/prismadb";
import { GameForm } from "./_components/game-form";

interface gameProps {
  params: { gameId: string };
}

const Game = async ({ params }: gameProps) => {
  const game = await prismaDB.gameChampion.findUnique({
    where: {
      id: params.gameId,
    },
  });

  return (
    <div>
      <GameForm initialData={game} />
    </div>
  );
};

export default Game;
