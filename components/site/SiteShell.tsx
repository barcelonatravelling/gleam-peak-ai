import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Manrope, Space_Grotesk } from "next/font/google";
import Assistant from "./Assistant";
import type { Lang } from "./content";
import Effects from "./Effects";
import Footer from "./Footer";
import Header from "./Header";
import { LangProvider } from "./LangContext";
import { SITE_URL, siteDefaults } from "./seo";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const viewport = { themeColor: "#07040f" };

export function rootMetadata(lang: Lang): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: siteDefaults[lang].title, template: "%s | Gleam Peak AI" },
    applicationName: "Gleam Peak AI",
    keywords:
      lang === "es"
        ? ["gobernanza de agentes de IA", "ciberseguridad para agentes de IA", "seguridad de IA", "privacidad", "supervisión humana", "trazabilidad", "AI Act", "MCP", "Trust Gateway"]
        : ["AI agent governance", "AI agent cybersecurity", "AI security", "privacy", "human oversight", "traceability", "AI Act", "MCP", "Trust Gateway"],
    authors: [{ name: "Gleam Peak AI" }],
    creator: "Gleam Peak AI",
    publisher: "Gleam Peak AI",
    robots: { index: true, follow: true },
  };
}

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Gleam Peak AI",
  url: SITE_URL,
  logo: `${SITE_URL}/logo-gleampeak.png`,
  email: "hello@gleampeak.ai",
};

export default function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    <html lang={lang}>
      <body className={`${manrope.variable} ${spaceGrotesk.variable}`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organization) }}
        />
        <LangProvider lang={lang}>
          <div className="backdrop" aria-hidden="true">
            <div className="backdrop-grid" />
            <div className="aurora aurora-one" />
            <div className="aurora aurora-two" />
            <div className="aurora aurora-three" />
          </div>
          <Header />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <Footer />
          <Assistant />
          <Effects />
        </LangProvider>
        <Analytics />
      </body>
    </html>
  );
}
