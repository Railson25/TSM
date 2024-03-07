import { checkRole } from "@/utils/roles";
import { redirect } from "next/navigation";
import { Header } from "@/components/header";
import { VersionForm } from "./_components/version-form";
import { AlertTriangle } from "lucide-react";
import prismaDB from "@/lib/prismadb";

interface VersionProps {
  params: { versionId: string };
}

const VersionPage = async ({ params }: VersionProps) => {
  if (!checkRole("admin")) {
    redirect("/");
  }

  const version = await prismaDB.gameVersion.findUnique({
    where: {
      id: params.versionId,
    },
  });

  return (
    <div className="flex w-full max-md:flex-col-reverse gap-x-8 px-3 pt-7">
      <div className="flex flex-col min-w-[50%]">
        <VersionForm initialData={version} />
      </div>
      <div className="flex-1 flex flex-col max-md:mb-11 bg-[#272014] border border-[#433211] p-8 rounded-3xl">
        <div className="flex gap-x-4 items-center">
          <AlertTriangle className="text-yellow-700" />
          <Header
            title="ATTENTION"
            description=""
            className="text-yellow-700"
          />
        </div>
        <p className="mt-8 text-white ">
          Ao criar uma <span className="text-yellow-600 font-bold">versão</span>
          , esta não poderá ser apagada para garantir a segurança dos dados pelo
          sistema. Além disso, ao criar uma{" "}
          <span className="text-yellow-600 font-bold">nova versão</span>, os{" "}
          <span className="text-yellow-600 font-bold">jogos</span> criados serão
          automaticamente associados a ela.
        </p>
      </div>
    </div>
  );
};

export default VersionPage;
