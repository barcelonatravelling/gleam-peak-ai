import { HomePage } from "@/components/site/Pages";
import { pageMetadata } from "@/components/site/seo";

export const metadata = pageMetadata("es", "home");

export default function Page() {
  return <HomePage />;
}
