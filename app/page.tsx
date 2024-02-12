import { ChampionForm } from "@/components/champion-form";
import { Heading } from "@/components/heading";
import { auth } from "@clerk/nextjs";

export default async function Home() {
  const { userId } = auth();
  return <main>{!userId && <Heading />}</main>;
}
