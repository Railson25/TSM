import { BarChart } from "@/components/bar-chart";
import { Header } from "@/components/header";
import { RecentGames } from "@/components/recent-games";

export default async function Home() {
  return (
    <main className="min-h-screen ">
      <Header
        title="Last seven days games"
        description=""
        className="text-center"
      />
      <div className="p-4 grid md:grid-cols-3 grid-cols-1 gap-4">
        <BarChart />
        <RecentGames />
      </div>
    </main>
  );
}
