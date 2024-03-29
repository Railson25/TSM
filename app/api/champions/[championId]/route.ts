import prismaDB from "@/lib/prismadb";
import { checkRole } from "@/utils/roles";

import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { championId: string } }
) {
  try {
    if (!params.championId) {
      return new NextResponse("Champion Id is required", { status: 400 });
    }

    const champion = await prismaDB.champion.findUnique({
      where: {
        id: params.championId,
      },
    });

    return NextResponse.json(champion);
  } catch (error) {
    console.log("[CHAMPION_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { championId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name, imageURL } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!checkRole("admin")) {
      return new NextResponse("Not authorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!imageURL) {
      return new NextResponse("Image URL is required", { status: 400 });
    }

    if (!params.championId) {
      return new NextResponse("Champion Id is required", { status: 400 });
    }

    const champion = await prismaDB.champion.updateMany({
      where: {
        id: params.championId,
      },
      data: {
        name,
        imageURL,
      },
    });
    revalidateTag("champions");
    revalidateTag("versions");
    revalidateTag("games");
    revalidateTag("championInGame");
    revalidateTag("championById");
    return NextResponse.json(champion);
  } catch (error) {
    console.log("[CHAMPION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { championId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!checkRole("admin")) {
      return new NextResponse("Not authorized", { status: 401 });
    }

    if (!params.championId) {
      return new NextResponse("Champion Id is required", { status: 400 });
    }

    const champion = await prismaDB.champion.deleteMany({
      where: {
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
    console.log("[CHAMPION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
