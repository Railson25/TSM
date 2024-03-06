import { AverageDamage } from "@/components/average-damage";
import { AverageDamageCompareRandom } from "@/components/average-damage-compare-random";
import { BarChart } from "@/components/bar-chart";
import { DamageSelect } from "@/components/damage-select";
import { Header } from "@/components/header";
import { HomeCard } from "@/components/home-card";
import { HorizontalChart } from "@/components/horizontal-chart";
import { LineChart } from "@/components/line-chart";
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

      <div className="flex flex-col">
        <Header
          title="Best champions"
          description="The calculation is based on more than 20 different parameters!"
          className="text-center mt-10 mb-10"
        />

        <HorizontalChart
          championInGame={championsInGame}
          games={games}
          champions={champions}
        />

        <Header
          title="Average damage"
          description="This graph will calculate the average damage of each champion individually according to the number of matches they play."
          className="text-center mt-10 mb-10"
        />

        <AverageDamage
          championInGame={championsInGame}
          champions={champions}
          games={games}
        />

        <Header
          title="Average damage compare Random"
          description="This graph will calculate the average damage of each champion individually according to the number of matches they play."
          className="text-center mt-10 mb-10"
        />

        <AverageDamageCompareRandom
          championInGame={championsInGame}
          champions={champions}
          games={games}
        />
      </div>
    </main>
  );
}
