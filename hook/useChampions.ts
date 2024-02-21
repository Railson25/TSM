import { useEffect, useState } from "react";
import prismaDB from "@/lib/prismadb";
import { Champion } from "@prisma/client";

const useChampions = () => {
  const [champions, setChampions] = useState<Champion[]>([]);

  useEffect(() => {
    const fetchChampions = async () => {
      try {
        const champions = await prismaDB.champion.findMany({
          orderBy: {
            createdAt: "desc",
          },
        });
        setChampions(champions);
      } catch (error) {
        console.error("Failed to fetch champions:", error);
      }
    };

    fetchChampions();

    return () => {};
  }, []);

  return champions;
};

export default useChampions;
