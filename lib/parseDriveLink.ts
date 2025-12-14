export function parseDriveLink(url: string): string | null {
  const match =
    url.match(/folders\/([a-zA-Z0-9_-]+)/) ||
    url.match(/[?&]id=([a-zA-Z0-9_-]+)/);

  return match ? match[1] : null;
}
