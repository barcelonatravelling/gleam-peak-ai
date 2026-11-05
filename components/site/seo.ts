import type { Metadata } from "next";
import type { Lang } from "./content";
import { ARTICLE_DATE, articleKeys, articles, type ArticleKey } from "./content-articles";
import { routes, type RouteKey } from "./routes";

export const SITE_URL = "https://www.gleampeak.ai";

type PageMeta = { title: string; description: string };

const articleMetaFor = (lang: Lang) =>
  Object.fromEntries(
    articleKeys.map((key) => [key, { title: articles[lang][key].title, description: articles[lang][key].description }]),
  ) as Record<ArticleKey, PageMeta>;

export const ogSize = { width: 1200, height: 630 };

export const ogAlt: Record<Lang, string> = {
  es: "Gleam Peak AI · Control verificable para agentes de IA",
  en: "Gleam Peak AI · Verifiable control for AI agents",
};

const pages: Record<Lang, Record<RouteKey, PageMeta>> = {
  es: {
    home: {
      title: "Gleam Peak AI | Controla tus agentes de IA sin revelar datos",
      description:
        "Gleam Peak AI aplicará las reglas y autorizaciones que define tu organización a cada agente de IA, dejará un registro firmado de cada operación y lo convertirá en una credencial verificable con pruebas zero knowledge. Prototipo en desarrollo.",
    },
    gateway: {
      title: "Gleam Peak Control: pasarela de autorización para agentes de IA",
      description:
        "Gleam Peak Control es una pasarela de autorización para agentes de IA (prototipo en desarrollo): comprobará identidad, mandato, finalidad, datos y riesgo antes de que un agente actúe; permitirá, bloqueará o pedirá la firma de una persona, y dejará un recibo firmado.",
    },
    passport: {
      title: "Gleam Peak Passport: credencial verificable de controles con zero knowledge",
      description:
        "Gleam Peak Passport es una credencial verificable de controles (prototipo en desarrollo): con pruebas zero knowledge ayudará a demostrar a bancos, clientes y auditores que usas la IA con control, sin mostrar tus datos.",
    },
    applications: {
      title: "Soluciones",
      description:
        "Integradores y proveedores de agentes, banca y seguros, administración pública y gran empresa: cómo está pensado Gleam Peak AI para controlar agentes y demostrarlo en cada sector.",
    },
    principles: {
      title: "Principios",
      description:
        "Supervisión humana vinculante, privacidad por diseño, revisión, trazabilidad, revocación y proporcionalidad: los principios de Gleam Peak AI.",
    },
    security: {
      title: "Ciberseguridad y confianza",
      description:
        "Ciberseguridad para agentes de IA: qué riesgos abordará Gleam Peak AI, qué hará y qué no hará el primer prototipo, cómo se tratará la evidencia y cómo comunicarnos un problema de seguridad.",
    },
    resources: {
      title: "Recursos",
      description:
        "Guías prácticas sobre autorización de agentes de IA, supervisión humana en el Reglamento de IA y seguridad en MCP, glosario y preguntas frecuentes sobre Gleam Peak Control y Gleam Peak Passport.",
    },
    talk: {
      title: "Hablemos",
      description:
        "Explora un piloto de Gleam Peak Control y Gleam Peak Passport en un caso real: cómo será, quién puede participar y qué se medirá. También colaboración institucional, investigación e inversión. Prototipo en desarrollo.",
    },
    privacy: {
      title: "Política de privacidad",
      description: "Cómo trata Gleam Peak AI los datos del formulario de contacto y del asistente de la web.",
    },
    terms: { title: "Términos de uso", description: "Condiciones de uso del sitio web de Gleam Peak AI." },
    techDesign: {
      title: "Diseño técnico de Gleam Peak Control y Gleam Peak Passport",
      description:
        "Borrador de diseño (versión 0.1) de Gleam Peak Control y Gleam Peak Passport: componentes y dónde se ejecutarán, estados de una operación, formato del recibo firmado, claves, qué demostrará Passport v0, modelo de amenazas, decisiones abiertas y cómo se medirá en el piloto. Prototipo en desarrollo.",
    },
    ...articleMetaFor("es"),
  },
  en: {
    home: {
      title: "Gleam Peak AI | Control your AI agents without revealing data",
      description:
        "Gleam Peak AI will apply the rules and authorisations your organisation sets for each AI agent, keep a signed record of every operation and turn it into a verifiable credential with zero knowledge proofs. Prototype in development.",
    },
    gateway: {
      title: "Gleam Peak Control: an authorisation gateway for AI agents",
      description:
        "Gleam Peak Control is an authorisation gateway for AI agents (prototype in development): it will check identity, mandate, purpose, data and risk before an agent acts; allow the action, block it or ask a person to sign it off, and leave a signed receipt.",
    },
    passport: {
      title: "Gleam Peak Passport: a verifiable controls credential with zero knowledge",
      description:
        "Gleam Peak Passport is a verifiable controls credential (prototype in development): with zero knowledge proofs it will help you show banks, clients and auditors that your AI is under control, without showing your data.",
    },
    applications: {
      title: "Solutions",
      description:
        "Integrators and agent providers, banking and insurance, the public sector and large companies: how Gleam Peak AI is designed to control agents and prove it in each sector.",
    },
    principles: {
      title: "Principles",
      description:
        "Binding human oversight, privacy by design, review, traceability, revocation and proportionality: the principles of Gleam Peak AI.",
    },
    security: {
      title: "Cybersecurity and trust",
      description:
        "Cybersecurity for AI agents: which risks Gleam Peak AI will address, what the first prototype will and will not do, how evidence will be handled and how to report a security issue.",
    },
    resources: {
      title: "Resources",
      description:
        "Practical guides on authorising AI agents, human oversight under the EU AI Act and MCP security, plus a glossary and FAQ on Gleam Peak Control and Gleam Peak Passport.",
    },
    talk: {
      title: "Let's talk",
      description:
        "Explore a Gleam Peak Control and Gleam Peak Passport pilot on a real use case: what it will involve, who can take part and what will be measured. Also institutional collaboration, research and investment. Prototype in development.",
    },
    privacy: {
      title: "Privacy policy",
      description: "How Gleam Peak AI handles data from the contact form and the website assistant.",
    },
    terms: { title: "Terms of use", description: "Terms of use of the Gleam Peak AI website." },
    techDesign: {
      title: "Technical design of Gleam Peak Control and Gleam Peak Passport",
      description:
        "Design draft (version 0.1) of Gleam Peak Control and Gleam Peak Passport: components and where they will run, the states of an operation, the signed receipt format, keys, what Passport v0 will prove, the threat model, open decisions and how it will be measured in the pilot. Prototype in development.",
    },
    ...articleMetaFor("en"),
  },
};

export const siteDefaults: Record<Lang, { title: string; locale: string; altLocale: string }> = {
  es: { title: pages.es.home.title, locale: "es_ES", altLocale: "en_GB" },
  en: { title: pages.en.home.title, locale: "en_GB", altLocale: "es_ES" },
};

// Shared preview image (served by app/og/[lang]); every page sets it, since a page's own
// openGraph object replaces the one generated next to the home page.
const ogImages = (lang: Lang) => [{ url: `/og/${lang}`, ...ogSize, alt: ogAlt[lang], type: "image/png" }];

export function pageMetadata(lang: Lang, key: RouteKey): Metadata {
  const { title, description } = pages[lang][key];
  const path = routes[lang][key];
  const isArticle = (articleKeys as RouteKey[]).includes(key);
  return {
    title: key === "home" ? { absolute: title } : title,
    description,
    alternates: {
      canonical: path,
      languages: { es: routes.es[key], en: routes.en[key], "x-default": routes.es[key] },
    },
    openGraph: {
      title: key === "home" ? title : `${title} | Gleam Peak AI`,
      description,
      url: path,
      siteName: "Gleam Peak AI",
      ...(isArticle
        ? { type: "article" as const, publishedTime: ARTICLE_DATE, authors: ["Gleam Peak AI"] }
        : { type: "website" as const }),
      locale: siteDefaults[lang].locale,
      alternateLocale: [siteDefaults[lang].altLocale],
      images: ogImages(lang),
    },
    twitter: {
      card: "summary_large_image",
      title: key === "home" ? title : `${title} | Gleam Peak AI`,
      description,
      images: ogImages(lang),
    },
  };
}

// Article structured data (schema.org), rendered by each article page next to the site's Organization JSON-LD.
export function articleJsonLd(lang: Lang, key: ArticleKey) {
  const a = articles[lang][key];
  const url = `${SITE_URL}${routes[lang][key]}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: a.title,
    description: a.description,
    inLanguage: lang === "es" ? "es-ES" : "en-GB",
    datePublished: ARTICLE_DATE,
    dateModified: ARTICLE_DATE,
    author: { "@type": "Organization", name: "Gleam Peak AI", url: SITE_URL },
    publisher: { "@type": "Organization", name: "Gleam Peak AI", url: SITE_URL, logo: { "@type": "ImageObject", url: `${SITE_URL}/logo-gleampeak.png` } },
    mainEntityOfPage: url,
    url,
    image: `${SITE_URL}/og/${lang}`,
  };
}
