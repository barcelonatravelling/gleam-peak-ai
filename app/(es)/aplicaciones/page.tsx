import { ApplicationsPage } from "@/components/site/Pages";
import { pageMetadata } from "@/components/site/seo";

export const metadata = pageMetadata("es", "applications");

export default function Page() {
  return <ApplicationsPage />;
}
