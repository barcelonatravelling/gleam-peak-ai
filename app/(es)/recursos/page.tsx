import { ResourcesPage } from "@/components/site/Pages";
import { pageMetadata } from "@/components/site/seo";

export const metadata = pageMetadata("es", "resources");

export default function Page() {
  return <ResourcesPage />;
}
