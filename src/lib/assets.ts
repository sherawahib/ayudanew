/**
 * Bust browser/CDN cache when assets in /public are replaced without renaming.
 * Version changes automatically on each Vercel deploy (git commit).
 */
export const ASSET_VERSION =
  process.env.NEXT_PUBLIC_ASSET_VERSION ?? "1";

export function versionedAsset(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) {
    return path;
  }

  const [base, query = ""] = path.split("?");
  const params = new URLSearchParams(query);
  params.set("v", ASSET_VERSION);
  return `${base}?${params.toString()}`;
}
