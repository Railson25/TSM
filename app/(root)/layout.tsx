import prismaDB from "@/lib/prismadb";

import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = auth();

  if (!userId) {
    redirect("/sign-in");
  }

  const team = await prismaDB.team.findFirst({
    where: {
      userId,
    },
  });

  if (team) {
    redirect(`/${team.id}`);
  }

  return <>{children}</>;
}
