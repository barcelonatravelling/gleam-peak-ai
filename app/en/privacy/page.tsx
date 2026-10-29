import { LegalPage } from "@/components/site/LegalPage";
import { pageMetadata } from "@/components/site/seo";

export const metadata = pageMetadata("en", "privacy");

export default function Page() {
  return <LegalPage kind="privacy" />;
}
