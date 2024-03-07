import prismaDB from "@/lib/prismadb";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
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
    const { userId, has } = auth();
    const body = await req.json();

    const { name, imageURL } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    if (!has({ permission: "admin" })) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
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
    const { userId, has } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!has({ permission: "admin" })) {
      return Response.json({ error: "Forbidden" }, { status: 403 });
    }

    if (!params.championId) {
      return new NextResponse("Champion Id is required", { status: 400 });
    }

    const champion = await prismaDB.champion.deleteMany({
      where: {
        id: params.championId,
      },
    });

    return NextResponse.json(champion);
  } catch (error) {
    console.log("[CHAMPION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
