import { PassportPage } from "@/components/site/Pages";
import { pageMetadata } from "@/components/site/seo";

export const metadata = pageMetadata("es", "passport");

export default function Page() {
  return <PassportPage />;
}
