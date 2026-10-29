import { HowPage } from "@/components/site/Pages";
import { pageMetadata } from "@/components/site/seo";

export const metadata = pageMetadata("en", "how");

export default function Page() {
  return <HowPage />;
}
