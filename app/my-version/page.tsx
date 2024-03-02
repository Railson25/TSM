import { VersionClient } from "./_components/version-client";

const VersionsPage = () => {
  return (
    <div className=" flex flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <VersionClient />
      </div>
    </div>
  );
};

export default VersionsPage;
