import { getChampionInGames } from "@/actions/getChampionInGame";
import { getChampions } from "@/actions/getChampions";
import { getGames } from "@/actions/getGames";
import { AverageDamage } from "@/components/average-damage";
import { AverageDamageCompareRandom } from "@/components/average-damage-compare-random";
import { BarChart } from "@/components/bar-chart";

import { Header } from "@/components/header";
import { HomeCard } from "@/components/home-card";
import { HorizontalChart } from "@/components/horizontal-chart";

import { RecentGames } from "@/components/recent-games";
import { Team } from "@/components/team";
import { Champion, Game, GameChampion } from "@prisma/client";

export default async function Home() {
  const games: Game[] = await getGames();
  const champions: Champion[] = await getChampions();
  const championsInGame: GameChampion[] = await getChampionInGames();

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
      <Team />
      <p className="italic text-sm text-center">
        Developed by <span className="font-bold">Railson Santiago</span>. All
        rights reserved ©
      </p>
    </main>
  );
}
