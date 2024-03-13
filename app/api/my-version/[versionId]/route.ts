import prismaDB from "@/lib/prismadb";
import { auth } from "@clerk/nextjs";
import { checkRole } from "@/utils/roles";
import { NextResponse } from "next/server";
import { revalidateTag } from "next/cache";

export async function GET(
  req: Request,
  { params }: { params: { versionId: string } }
) {
  try {
    if (!params.versionId) {
      return new NextResponse("Version Id is required", { status: 400 });
    }

    const version = await prismaDB.gameVersion.findUnique({
      where: {
        id: params.versionId,
      },
    });

    return NextResponse.json(version);
  } catch (error) {
    console.log("[VERSION_GET]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { versionId: string } }
) {
  try {
    const { userId } = auth();
    const body = await req.json();

    const { name } = body;

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!checkRole("admin")) {
      return { message: "Not Authorized" };
    }

    if (!name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    if (!params.versionId) {
      return new NextResponse("Version Id is required", { status: 400 });
    }

    const version = await prismaDB.gameVersion.updateMany({
      where: {
        id: params.versionId,
      },
      data: {
        name,
      },
    });

    revalidateTag("versions");

    return NextResponse.json(version);
  } catch (error) {
    console.log("[VERSION_PATCH]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { versionId: string } }
) {
  try {
    const { userId } = auth();

    if (!userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    if (!checkRole("admin")) {
      return { message: "Not Authorized" };
    }

    if (!params.versionId) {
      return new NextResponse("Version Id is required", { status: 400 });
    }

    const version = await prismaDB.gameVersion.deleteMany({
      where: {
        id: params.versionId,
      },
    });
    revalidateTag("versions");
    return NextResponse.json(version);
  } catch (error) {
    console.log("[VERSION_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
}
