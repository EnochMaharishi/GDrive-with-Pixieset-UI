import { drive, getImageStream } from "@/lib/googleDrive";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const fileId = searchParams.get("fileId");

  if (!fileId) {
    return new Response("Missing fileId", { status: 400 });
  }

  try {
    const meta = await drive.files.get({
      fileId,
      fields: "name,mimeType",
    });

    const stream = await getImageStream(fileId);

    return new Response(stream.data as any, {
      headers: {
        "Content-Disposition": `attachment; filename="${meta.data.name}"`,
        "Content-Type": meta.data.mimeType ?? "application/octet-stream",
      },
    });
  } catch {
    return new Response("Download failed", { status: 500 });
  }
}
