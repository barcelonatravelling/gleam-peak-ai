import { ContactPage } from "@/components/site/ContactPage";
import { pageMetadata } from "@/components/site/seo";

export const metadata = pageMetadata("en", "talk");

export default function Page() {
  return <ContactPage />;
}
