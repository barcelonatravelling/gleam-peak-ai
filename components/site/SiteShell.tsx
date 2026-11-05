import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Figtree, Instrument_Sans, JetBrains_Mono } from "next/font/google";
import Assistant from "./Assistant";
import type { Lang } from "./content";
import Effects from "./Effects";
import Footer from "./Footer";
import Header from "./Header";
import { LangProvider } from "./LangContext";
import { SITE_URL, siteDefaults } from "./seo";

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
});

const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
});

// Only used in small technical labels, so it is not worth preloading on every page.
const jetbrains = JetBrains_Mono({
  variable: "--font-jetbrains",
  subsets: ["latin"],
  preload: false,
});

export const viewport = { themeColor: "#07040f" };

export function rootMetadata(lang: Lang): Metadata {
  return {
    metadataBase: new URL(SITE_URL),
    title: { default: siteDefaults[lang].title, template: "%s | Gleam Peak AI" },
    applicationName: "Gleam Peak AI",
    keywords:
      lang === "es"
        ? ["gobernanza de agentes de IA", "ciberseguridad para agentes de IA", "seguridad de IA", "privacidad", "supervisión humana", "trazabilidad", "Reglamento de IA", "AI Act", "MCP", "zero knowledge", "credencial verificable"]
        : ["AI agent governance", "AI agent cybersecurity", "AI security", "privacy", "human oversight", "traceability", "EU AI Act", "MCP", "zero knowledge", "verifiable credential"],
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

// Scroll reveal only hides content once this runs (no JS: everything visible). If the reveal observer in
// Effects has not started 1.5 s later (a script failed), `reveal-all` shows every block.
const REVEAL_SCRIPT = `(function(){var d=document.documentElement;d.classList.add("js");setTimeout(function(){if(!d.classList.contains("reveal-ready"))d.classList.add("reveal-all")},1500)})();`;

export default function SiteShell({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  return (
    // The inline script adds classes to <html> before React hydrates, hence suppressHydrationWarning.
    <html lang={lang} suppressHydrationWarning>
      <body className={`${instrument.variable} ${figtree.variable} ${jetbrains.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: REVEAL_SCRIPT }} />
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
