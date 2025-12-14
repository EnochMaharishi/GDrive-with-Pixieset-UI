import { google } from "googleapis";

const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, "\n");

if (!clientEmail || !privateKey) {
  throw new Error("Missing Google Drive credentials");
}

const auth = new google.auth.JWT({
  email: clientEmail,
  key: privateKey,
  scopes: ["https://www.googleapis.com/auth/drive.readonly"],
});

export const drive = google.drive({
  version: "v3",
  auth,
});

export async function listImagesInFolder(folderId: string) {
  const res = await drive.files.list({
    q: `'${folderId}' in parents and mimeType contains 'image/' and trashed = false`,
    fields:
      "files(id,name,thumbnailLink,imageMediaMetadata(width,height))",
    pageSize: 1000,
  });

  return res.data.files ?? [];
}

export async function getImageStream(fileId: string) {
  return drive.files.get(
    { fileId, alt: "media" },
    { responseType: "stream" }
  );
}
