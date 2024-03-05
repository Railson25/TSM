import { BarChart } from "@/components/bar-chart";
import { Header } from "@/components/header";
import { HomeCard } from "@/components/home-card";
import { HorizontalChart } from "@/components/horizontal-chart";
import { RecentGames } from "@/components/recent-games";
import prismaDB from "@/lib/prismadb";

export default async function Home() {
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
    <main className="min-h-screen ">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 px-3">
        <HomeCard />
      </div>
      <Header
        title="Last seven days games"
        description=""
        className="text-center mt-10"
      />
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <BarChart />
        <RecentGames />
      </div>

      <Header
        title="Best champions"
        description="The calculation is based on the duration of games, gold, damage per match, gold at 5, win and lose"
        className="text-center mt-10 mb-10"
      />

      <HorizontalChart
        championInGame={championsInGame}
        games={games}
        champions={champions}
      />
    </main>
  );
}
