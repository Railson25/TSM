import { BarChart } from "@/components/bar-chart";

export default async function Home() {
  return (
    <main className="">
      <BarChart />
      <div className="min-w-[400px]">recent games</div>
    </main>
  );
}
