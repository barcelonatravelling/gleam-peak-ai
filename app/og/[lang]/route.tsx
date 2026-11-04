import { ogImage } from "@/components/site/og";

// Stable URL for the social preview image, so every page (not only the home) can point to it.
export const dynamicParams = false;

export function generateStaticParams() {
  return [{ lang: "es" }, { lang: "en" }];
}

export async function GET(_request: Request, { params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params;
  return ogImage(lang === "en" ? "en" : "es");
}
