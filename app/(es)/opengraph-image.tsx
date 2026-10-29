import { ogAlt, ogImage, ogSize } from "@/components/site/og";

export const alt = ogAlt.es;
export const size = ogSize;
export const contentType = "image/png";

export default function OpengraphImage() {
  return ogImage("es");
}
