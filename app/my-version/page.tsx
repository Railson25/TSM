import { VersionClient } from "./_components/version-client";
import { VersionColumn } from "./_components/version-column";
import { getVersions } from "@/actions/getVersions";
import { gameVersion } from "@prisma/client";

const VersionsPage = async () => {
  const versions: gameVersion[] = await getVersions();

  const formattedVersions: VersionColumn[] = versions.map((item) => ({
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
