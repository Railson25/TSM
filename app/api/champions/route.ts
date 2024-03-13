import prismaDB from "@/lib/prismadb";
import { checkRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: { championId: string }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const {
      name,
      imageURL,
      roles,
      baseDamage,
      baseLife,
      baseMana,
      armor,
      magicArmor,
      attackSpeed,
      moveSpeed,
      regenLife,
      regenMana,
    } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!checkRole("admin")) {
      return new NextResponse("Not authorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!imageURL) {
      return new NextResponse("ImageURL is required", { status: 400 });
    }

    if (!roles || !Array.isArray(roles) || roles.length === 0) {
      return new NextResponse("At least one role is required", { status: 400 });
    }

    if (
      !baseDamage ||
      !baseLife ||
      !baseMana ||
      !armor ||
      !magicArmor ||
      !attackSpeed ||
      !moveSpeed ||
      !regenLife ||
      !regenMana
    ) {
      return new NextResponse("All stats are required", { status: 400 });
    }

    const champion = await prismaDB.champion.create({
      data: {
        name,
        imageURL,
        baseDamage,
        baseLife,
        baseMana,
        armor,
        magicArmor,
        attackSpeed,
        moveSpeed,
        regenLife,
        regenMana,
        roles: {
          create: roles.map((role) => ({ role: role })),
        },
        id: params.championId,
      },
    });

    revalidateTag("champions");
    revalidateTag("versions");
    revalidateTag("games");
    revalidateTag("championInGame");
    revalidateTag("championById");
    return NextResponse.json(champion);
  } catch (error) {
    console.log("CHAMPIONS_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const champions = await prismaDB.champion.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(champions);
  } catch (error) {
    console.log("[CHAMPIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
