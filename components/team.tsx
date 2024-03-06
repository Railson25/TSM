import { CardTeam } from "./card-team";

export const Team = () => {
  return (
    <div className="w-full h-full pt-32 pb-20 px-10 max-sm:flex max-sm:flex-col max-sm:items-center max-sm:justify-center">
      <h1 className="font-bold  text-3xl mb-6">Our Team</h1>
      <p className="max-w-[650px] font-light text-sm">
        Somos um time que se autointitula bom, mas nossos resultados falam por
        si só. Temos um talento especial para{" "}
        <span className="font-bold text-red-600">entregar jogos</span> e somos
        especialistas em nos sabotar. Nosso bot lane está tão cansado que parece
        que está em slow motion, e o mid lane, bem, é uma incógnita. O suporte,
        que deveria estar lá para todos, parece estar treinando para a Olimpíada
        do Mid Lane, enquanto o top lane... bom, ele tem uma relação complicada
        com os minions, às vezes é o agricultor, outras vezes é a plantação.
        Juntos, formamos o{" "}
        <span className="font-bold text-red-600">
          Time das Oportunidades Perdidas
        </span>
        . Mas quem sabe, um dia, daremos um passo em direção à mediocridade.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-20 max-sm:w-full">
        <CardTeam
          src="/images/kaisa5.jpg"
          nickname="Yuzu"
          roleName="Bot lane"
        />
        <CardTeam
          src="/images/sion.jpg"
          nickname="ManoBraum"
          roleName="Support"
        />
        <CardTeam
          src="/images/renekton.jpg"
          nickname="Pathetic"
          roleName="Top lane"
        />
        <CardTeam
          src="/images/vex.jpg"
          nickname="XiaoRuka"
          roleName="Mid lane"
        />
      </div>
    </div>
  );
};
