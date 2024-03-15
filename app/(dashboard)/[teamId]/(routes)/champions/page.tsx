import { ChampionClient } from "./_components/champion-client";
import { ChampionColumn } from "./_components/champion-column";
import { getChampions } from "@/actions/getChampions";
import { Champion } from "@prisma/client";

const Champions = async () => {
  const champions: Champion[] = await getChampions();

  const formattedChampions: ChampionColumn[] = champions.map((item) => ({
    id: item.id,
    name: item.name,
  }));

  return (
    <div className=" flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ChampionClient data={formattedChampions} />
      </div>
    </div>
  );
};

export default Champions;
