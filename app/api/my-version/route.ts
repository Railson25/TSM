import prismaDB from "@/lib/prismadb";
import { checkRole } from "@/utils/roles";
import { auth } from "@clerk/nextjs";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(req: Request, params: { versionId: string }) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthenticated", { status: 403 });
    }

    if (!checkRole("admin")) {
      return new NextResponse("Not authorized", { status: 401 });
    }

    if (!name) {
      return new NextResponse("Version name is required", { status: 400 });
    }

    const existingVersion = await prismaDB.gameVersion.findFirst({
      where: { name },
    });

    if (existingVersion) {
      return new NextResponse("Version with this name already exists", {
        status: 400,
      });
    }

    const newVersion = await prismaDB.gameVersion.create({
      data: {
        id: params.versionId,
        name,
      },
    });

    await prismaDB.game.updateMany({
      where: { defaultVersionId: null },
      data: {
        defaultVersionId: newVersion.id,
      },
    });

    revalidateTag("versions");
    revalidateTag("games");
    revalidateTag("championInGame");
    revalidateTag("championById");

    return NextResponse.json(newVersion);
  } catch (error) {
    console.log("VERSIONS_POST", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function GET() {
  try {
    const versions = await prismaDB.gameVersion.findMany({
      orderBy: {
        createdAt: "asc",
      },
    });

    return NextResponse.json(versions);
  } catch (error) {
    console.log("[VERSIONS_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
