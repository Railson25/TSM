import { getChampionInGames } from "@/actions/getChampionInGame";
import { getChampions } from "@/actions/getChampions";
import { getGames } from "@/actions/getGames";
import { ChampionPieChart } from "@/components/champions-pie-chart";
import { Header } from "@/components/header";
import { Champion, Game, GameChampion } from "@prisma/client";

const MyPage = async () => {
  const games: Game[] = await getGames();
  const championsInGame: GameChampion[] = await getChampionInGames();
  const champions: Champion[] = await getChampions();

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
