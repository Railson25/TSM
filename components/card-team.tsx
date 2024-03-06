import Image from "next/image";

interface CardTeamProps {
  src: string;
  nickname: string;
  roleName: string;
}

export const CardTeam = ({ src, nickname, roleName }: CardTeamProps) => {
  return (
    <div className="flex flex-col  max-w-72  pb-2 max-sm:mx-auto max-sm:w-full">
      <div className="aspect-[3/4] relative">
        <Image
          src={src}
          alt="Image"
          fill
          className="w-full h-full rounded-2xl object-cover absolute"
        />
      </div>

      <div>
        <h2 className="mt-6 mb-1 font-bold text-2xl">{nickname}</h2>
        <p className="font-light">{roleName}</p>
      </div>
    </div>
  );
};
