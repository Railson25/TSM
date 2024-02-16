import prismaDB from "@/lib/prismadb";
import { ChampionClient } from "./_components/champion-client";
import { ChampionColumn } from "./_components/champion-column";

const Champions = async () => {
  const champions = await prismaDB.champion.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

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
