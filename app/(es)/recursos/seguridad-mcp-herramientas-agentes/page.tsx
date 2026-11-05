import { ArticlePage } from "@/components/site/Pages";
import { articleJsonLd, pageMetadata } from "@/components/site/seo";

export const metadata = pageMetadata("es", "articleMcp");

export default function Page() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd("es", "articleMcp")) }} />
      <ArticlePage id="articleMcp" />
    </>
  );
}
