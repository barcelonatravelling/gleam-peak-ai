import { ResourcesPage } from "@/components/site/Pages";
import { pageMetadata } from "@/components/site/seo";

export const metadata = pageMetadata("en", "resources");

export default function Page() {
  return <ResourcesPage />;
}
