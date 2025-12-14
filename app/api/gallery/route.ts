import { NextResponse } from "next/server";
import { listImagesInFolder } from "@/lib/googleDrive";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const folderId = searchParams.get("folderId");

  if (!folderId) {
    return NextResponse.json({ error: "Missing folderId" }, { status: 400 });
  }

  try {
    const files = await listImagesInFolder(folderId);

    const images = files
      .filter(
        (f) =>
          f.thumbnailLink &&
          f.imageMediaMetadata?.width &&
          f.imageMediaMetadata?.height
      )
      .map((f) => ({
        id: f.id,
        src: f.thumbnailLink,
        width: f.imageMediaMetadata!.width,
        height: f.imageMediaMetadata!.height,
      }));

    return NextResponse.json(images);
  } catch {
    return NextResponse.json(
      { error: "Failed to load gallery" },
      { status: 500 }
    );
  }
}
