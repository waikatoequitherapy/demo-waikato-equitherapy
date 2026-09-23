export const BASE_PATH = "";

export function assetPath(path: string) {
  if (/^https?:\/\//.test(path)) return path;
  return path.startsWith("/") ? path : `/${path}`;
}
