export function resolveImage(src?: string) {
  if (!src) return "/globe.svg";

  // If src is already a full URL (hyperlink), use it directly
  if (src.startsWith("http://") || src.startsWith("https://")) {
    return src;
  }

  // Otherwise, construct the URL using the base API URL
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
    /\/api$/,
    "",
  );
  return `${base.replace(/\/+$/g, "")}/${src.replace(/^\/+/, "")}`;
}

export default resolveImage;
