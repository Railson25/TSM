import prismaDB from "@/lib/prismadb";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { teamId: string };
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const team = await prismaDB.team.findFirst({
    where: {
      id: params.teamId,
      userId,
    },
  });

  if (!team) {
    redirect("/");
  }

  return <>{children}</>;
}
