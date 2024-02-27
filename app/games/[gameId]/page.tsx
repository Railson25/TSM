import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/header";
import { GameTable } from "./_components/game-table";
import { columns } from "./_components/game-table-column";

import { getGame } from "@/actions/getGame";
import { GameBody } from "./_components/game.body";

interface gameProps {
  params: { gameId: string };
}

const Game = async ({ params }: gameProps) => {
  const game = await getGame(params.gameId);

  return (
    <>
      <GameBody game={game} />
      <Separator className="mt-10 mb-3" />
      <Header title="Create Game" description="Add a new game" />
      <GameTable columns={columns} searchKey="game" />
    </>
  );
};

export default Game;
