export function resolveImage(src?: string) {
  if (!src) return "";
  const base = (process.env.NEXT_PUBLIC_API_BASE_URL || "").replace(
    /\/api$/,
    "",
  );
  return `${base.replace(/\/+$/g, "")}/${src.replace(/^\/+/, "")}`;
}

export default resolveImage;
