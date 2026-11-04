import { PassportPage } from "@/components/site/Pages";
import { pageMetadata } from "@/components/site/seo";

export const metadata = pageMetadata("en", "passport");

export default function Page() {
  return <PassportPage />;
}
