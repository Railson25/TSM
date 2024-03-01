import { BarChart } from "@/components/bar-chart";
import { Header } from "@/components/header";
import { HomeCard } from "@/components/home-card";
import { RecentGames } from "@/components/recent-games";

export default async function Home() {
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
    </main>
  );
}
