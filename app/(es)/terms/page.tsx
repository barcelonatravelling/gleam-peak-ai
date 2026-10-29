import { LegalPage } from "@/components/site/LegalPage";
import { pageMetadata } from "@/components/site/seo";

export const metadata = pageMetadata("es", "terms");

export default function Page() {
  return <LegalPage kind="terms" />;
}
