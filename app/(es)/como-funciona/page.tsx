import { HowPage } from "@/components/site/Pages";
import { pageMetadata } from "@/components/site/seo";

export const metadata = pageMetadata("es", "how");

export default function Page() {
  return <HowPage />;
}
