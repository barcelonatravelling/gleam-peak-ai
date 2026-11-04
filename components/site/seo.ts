import type { Metadata } from "next";
import type { Lang } from "./content";
import { routes, type RouteKey } from "./routes";

export const SITE_URL = "https://www.gleampeak.ai";

type PageMeta = { title: string; description: string };

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
        "Gleam Peak AI decide qué puede hacer cada agente de IA, deja un registro firmado de cada acción y lo convierte en una credencial verificable con pruebas zero knowledge. Prototipo en desarrollo.",
    },
    gateway: {
      title: "Control: gobierna lo que hacen tus agentes de IA",
      description:
        "Control, de Gleam Peak AI (prototipo en desarrollo): comprobará identidad, mandato, finalidad, datos y riesgo antes de que un agente de IA actúe; permitirá, bloqueará o pedirá la firma de una persona, y dejará un recibo firmado.",
    },
    passport: {
      title: "Passport: credencial verificable con zero knowledge",
      description:
        "Passport, de Gleam Peak AI (prototipo en desarrollo): una credencial verificable con pruebas zero knowledge que ayuda a demostrar a bancos, clientes y auditores que usas la IA con control, sin mostrar tus datos.",
    },
    applications: {
      title: "Soluciones",
      description:
        "Banca y seguros, administración pública, gran empresa y proveedores de IA: cómo Gleam Peak AI controla agentes y lo demuestra en cada sector, con casos de uso.",
    },
    principles: {
      title: "Principios",
      description:
        "Supervisión humana vinculante, privacidad por diseño, revisión, trazabilidad, revocación y proporcionalidad: los principios de Gleam Peak AI.",
    },
    security: {
      title: "Ciberseguridad y confianza",
      description:
        "Ciberseguridad para agentes de IA: qué riesgos aborda Gleam Peak AI, qué hará y qué no hará el primer prototipo, cómo se tratará la evidencia y cómo comunicarnos un problema de seguridad.",
    },
    resources: {
      title: "Recursos",
      description:
        "Glosario y preguntas frecuentes sobre Gleam Peak AI: Control, Passport, zero knowledge, mandato, finalidad, aprobación vinculada y recibo firmado.",
    },
    talk: {
      title: "Hablemos",
      description:
        "Pilotos, colaboración institucional, investigación e inversión: exploremos Control y Passport en un caso real. Prototipo en desarrollo.",
    },
    privacy: {
      title: "Política de privacidad",
      description: "Cómo trata Gleam Peak AI los datos del formulario de contacto y del asistente de la web.",
    },
    terms: { title: "Términos de uso", description: "Condiciones de uso del sitio web de Gleam Peak AI." },
  },
  en: {
    home: {
      title: "Gleam Peak AI | Control your AI agents without revealing data",
      description:
        "Gleam Peak AI decides what each AI agent may do, keeps a signed record of every action and turns it into a verifiable credential with zero knowledge proofs. Prototype in development.",
    },
    gateway: {
      title: "Control: govern what your AI agents do",
      description:
        "Control, by Gleam Peak AI (prototype in development): it will check identity, mandate, purpose, data and risk before an AI agent acts; allow, block or ask a person to sign, and leave a signed receipt.",
    },
    passport: {
      title: "Passport: a verifiable credential with zero knowledge",
      description:
        "Passport, by Gleam Peak AI (prototype in development): a verifiable credential with zero knowledge proofs that helps show banks, clients and auditors that you use AI with control, without showing your data.",
    },
    applications: {
      title: "Solutions",
      description:
        "Banking and insurance, public administration, large companies and AI vendors: how Gleam Peak AI controls agents and proves it in each sector, with use cases.",
    },
    principles: {
      title: "Principles",
      description:
        "Binding human oversight, privacy by design, review, traceability, revocation and proportionality: the principles of Gleam Peak AI.",
    },
    security: {
      title: "Cybersecurity and trust",
      description:
        "Cybersecurity for AI agents: which risks Gleam Peak AI addresses, what the first prototype will and will not do, how evidence will be handled and how to report a security issue.",
    },
    resources: {
      title: "Resources",
      description:
        "Glossary and FAQ on Gleam Peak AI: Control, Passport, zero knowledge, mandate, purpose, bound approval and signed receipt.",
    },
    talk: {
      title: "Let's talk",
      description:
        "Pilots, institutional collaboration, research and investment: let's explore Control and Passport in a real case. Prototype in development.",
    },
    privacy: {
      title: "Privacy policy",
      description: "How Gleam Peak AI handles data from the contact form and the website assistant.",
    },
    terms: { title: "Terms of use", description: "Terms of use of the Gleam Peak AI website." },
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
      type: "website",
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
