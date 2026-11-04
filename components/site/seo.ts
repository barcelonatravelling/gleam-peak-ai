import type { Metadata } from "next";
import type { Lang } from "./content";
import { routes, type RouteKey } from "./routes";

export const SITE_URL = "https://www.gleampeak.ai";

type PageMeta = { title: string; description: string };

const pages: Record<Lang, Record<RouteKey, PageMeta>> = {
  es: {
    home: {
      title: "Gleam Peak AI | Controla tus agentes de IA y demuéstralo sin revelar datos",
      description:
        "Gleam Peak AI decide qué puede hacer cada agente de IA, deja un registro firmado de cada acción y lo convierte en una credencial verificable con pruebas zero knowledge. Prototipo en desarrollo.",
    },
    gateway: {
      title: "Control",
      description:
        "Control, de Gleam Peak AI (prototipo en desarrollo): comprueba identidad, mandato, finalidad, datos y riesgo antes de que un agente de IA actúe; permite, bloquea o pide la firma de una persona, y deja un recibo firmado.",
    },
    passport: {
      title: "Passport",
      description:
        "Passport, de Gleam Peak AI (en desarrollo): una credencial verificable con pruebas zero knowledge para demostrar a bancos, clientes y auditores que usas la IA con control, sin enseñar tus datos.",
    },
    how: {
      title: "Cómo funciona",
      description:
        "Propuesta, mandato, política, decisión y evidencia: cómo Gleam Peak AI controla cada operación de un agente de IA antes de que se ejecute.",
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
        "Glosario y preguntas frecuentes sobre autoridad verificable para agentes de IA: mandato, finalidad, aprobación vinculada, recibos de evidencia y MCP.",
    },
    talk: {
      title: "Hablemos",
      description:
        "Pilotos, colaboración institucional, investigación e inversión: validemos la autoridad verificable para agentes de IA en un caso real.",
    },
    privacy: {
      title: "Política de privacidad",
      description: "Cómo trata Gleam Peak AI los datos del formulario de contacto y del asistente de la web.",
    },
    terms: { title: "Términos de uso", description: "Condiciones de uso del sitio web de Gleam Peak AI." },
  },
  en: {
    home: {
      title: "Gleam Peak AI | Control your AI agents and prove it without revealing data",
      description:
        "Gleam Peak AI decides what each AI agent may do, keeps a signed record of every action and turns it into a verifiable credential with zero knowledge proofs. Prototype in development.",
    },
    gateway: {
      title: "Control",
      description:
        "Control, by Gleam Peak AI (prototype in development): checks identity, mandate, purpose, data and risk before an AI agent acts; allows, blocks or asks a person to sign, and leaves a signed receipt.",
    },
    passport: {
      title: "Passport",
      description:
        "Passport, by Gleam Peak AI (in development): a verifiable credential with zero knowledge proofs to show banks, clients and auditors that you use AI with control, without showing your data.",
    },
    how: {
      title: "How it works",
      description:
        "Proposal, mandate, policy, decision and evidence: how Gleam Peak AI controls every AI agent operation before it is executed.",
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
        "Glossary and FAQ on verifiable authority for AI agents: mandate, purpose, bound approval, evidence receipts and MCP.",
    },
    talk: {
      title: "Contact",
      description:
        "Pilots, institutional collaboration, research and investment: let's validate verifiable authority for AI agents in a real case.",
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
    },
    twitter: { card: "summary_large_image", title: key === "home" ? title : `${title} | Gleam Peak AI`, description },
  };
}
