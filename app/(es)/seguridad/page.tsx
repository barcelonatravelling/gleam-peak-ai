import { SecurityPage } from "@/components/site/Pages";
import { pageMetadata } from "@/components/site/seo";

export const metadata = pageMetadata("es", "security");

export default function Page() {
  return <SecurityPage />;
}
