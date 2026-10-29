import { GatewayPage } from "@/components/site/Pages";
import { pageMetadata } from "@/components/site/seo";

export const metadata = pageMetadata("es", "gateway");

export default function Page() {
  return <GatewayPage />;
}
