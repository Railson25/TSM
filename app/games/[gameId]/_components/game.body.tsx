"use client";

import * as z from "zod";
import { FormProvider, useForm } from "react-hook-form";
import { GameForm } from "./game-form";
import { GameChampion } from "@prisma/client";
import { formSchema } from "../../_components/game-modal";
import { zodResolver } from "@hookform/resolvers/zod";

interface GameBodyProps {
  game: GameChampion | null;
}

export const GameBody = ({ game }: GameBodyProps) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      role: "",
      championId: "",
      damage: 0,
      gold: 0,
      goldAtFiveMin: 0,
      goldAtTenMin: 0,
    },
  });
  return (
    <FormProvider {...form}>
      <div>
        <GameForm initialData={game} />
      </div>
    </FormProvider>
  );
};
