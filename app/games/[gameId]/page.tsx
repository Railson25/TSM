import { ChampionForm } from "./_components/champion-form";
import { Separator } from "@/components/ui/separator";
import { Header } from "@/components/header";
import { GameTable } from "./_components/game-table";
import { columns } from "./_components/game-table-column";
import { getGameById } from "@/actions/getGameById";
import { GameChampion } from "@prisma/client";

interface gameProps {
  params: { gameId: string };
}

const Game = async ({ params }: gameProps) => {
  const GameChampion: GameChampion = await getGameById(params.gameId);

  return (
    <div className="px-4">
      <div>
        <ChampionForm initialData={GameChampion} />
      </div>
      <Separator className="mt-10 mb-3" />
      <Header title="Create Game" description="Add a new game" />
      <GameTable columns={columns} searchKey="game" />
    </div>
  );
};

export default Game;
