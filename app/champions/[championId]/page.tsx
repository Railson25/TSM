import { ChampionForm } from "@/app/champions/[championId]/_components/champion-form";
import prismaDB from "@/lib/prismadb";

interface ChampionProps {
  params: { championId: string };
}

const Champion = async ({ params }: ChampionProps) => {
  const champion = await prismaDB.champion.findUnique({
    where: {
      id: params.championId,
    },
  });

  return (
    <div className="px-4">
      <ChampionForm initialData={champion} />
    </div>
  );
};

export default Champion;
