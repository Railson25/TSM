import { ChampionPieChart } from "@/components/champions-pie-chart";
import { Header } from "@/components/header";
import prismaDB from "@/lib/prismadb";
import Image from "next/image";

const MyPage = async () => {
  const games = await prismaDB.game.findMany({
    orderBy: {
      createdAt: "asc",
    },
  });

  const championsInGame = await prismaDB.gameChampion.findMany({
    orderBy: {
      damage: "asc",
    },
  });

  const champions = await prismaDB.champion.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  return (
    <div className="pt-10">
      <Header
        title="Most played champions"
        description=""
        className="text-center"
      />

      <ChampionPieChart
        champions={champions}
        championInGame={championsInGame}
        games={games}
      />
    </div>
  );
};

export default MyPage;
