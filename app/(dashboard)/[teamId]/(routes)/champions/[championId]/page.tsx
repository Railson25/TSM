import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import { ChampionForm } from "@/app/champions/[championId]/_components/champion-form";

import { getChampionById } from "@/actions/getChampionById";
import { Champion } from "@prisma/client";

interface ChampionProps {
  params: { championId: string };
}

const Champion = async ({ params }: ChampionProps) => {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const champion: Champion = await getChampionById(params.championId);

  return (
    <div className="px-4">
      <ChampionForm initialData={champion} />
    </div>
  );
};

export default Champion;
