import { getChampionById } from "@/actions/getChampionById";
import { ChampionForm } from "@/components/champion-form";

import { auth } from "@clerk/nextjs";

interface ChampionProps {
  params: { championId: string };
}

const Champion = async ({ params }: ChampionProps) => {
  const champion = await getChampionById(params.championId);

  const { userId } = auth();

  if (!userId) return <div>Not authenticated...</div>;

  if (champion && champion.userId !== userId) return <div> Access denied</div>;

  return (
    <div>
      <ChampionForm champion={champion} />
    </div>
  );
};

export default Champion;
