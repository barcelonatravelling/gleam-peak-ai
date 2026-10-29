import { SecurityPage } from "@/components/site/Pages";
import { pageMetadata } from "@/components/site/seo";

export const metadata = pageMetadata("en", "security");

export default function Page() {
  return <SecurityPage />;
}
