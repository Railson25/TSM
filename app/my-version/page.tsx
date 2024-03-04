import prismaDB from "@/lib/prismadb";
import { VersionClient } from "./_components/version-client";
import { VersionColumn } from "./_components/version-column";

const VersionsPage = async () => {
  const champions = await prismaDB.gameVersion.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  const formattedVersions: VersionColumn[] = champions.map((item) => ({
    id: item.id,
    name: item.name,
  }));
  return (
    <div className=" flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <VersionClient data={formattedVersions} />
      </div>
    </div>
  );
};

export default VersionsPage;
