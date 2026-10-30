import type { Metadata } from "next";
import type { Lang } from "./content";
import { routes, type RouteKey } from "./routes";

export const SITE_URL = "https://www.gleampeak.ai";

type PageMeta = { title: string; description: string };

const pages: Record<Lang, Record<RouteKey, PageMeta>> = {
  es: {
    home: {
      title: "Gleam Peak AI | Autoridad verificable para agentes de IA",
      description:
        "Gobernanza, seguridad y privacidad para agentes de IA. Trust Gateway se sitúa entre tus agentes y tus APIs o servidores MCP: verifica cada operación sensible, pide aprobación humana cuando hace falta y deja un recibo verificable.",
    },
    gateway: {
      title: "Trust Gateway",
      description:
        "Trust Gateway, primer producto de Gleam Peak AI (prototipo en desarrollo): verifica identidad, mandato, finalidad y riesgo antes de que un agente de IA ejecute una operación, y deja evidencia verificable.",
    },
    how: {
      title: "Cómo funciona",
      description:
        "Propuesta, mandato, política, decisión y evidencia: cómo Trust Gateway controla cada operación de un agente de IA antes de que se ejecute.",
    },
    applications: {
      title: "Aplicaciones",
      description:
        "Administraciones públicas, entidades reguladas, integradores y proveedores de agentes: dónde la autoridad de un agente de IA tiene que poder demostrarse.",
    },
    principles: {
      title: "Principios",
      description:
        "Supervisión humana vinculante, privacidad por diseño, revisión, trazabilidad, revocación y proporcionalidad: los principios de Gleam Peak AI.",
    },
    security: {
      title: "Ciberseguridad y confianza",
      description:
        "Ciberseguridad para agentes de IA: qué riesgos aborda Trust Gateway, qué hará y qué no hará el primer prototipo, cómo se tratará la evidencia y cómo comunicarnos un problema de seguridad.",
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
      title: "Gleam Peak AI | Verifiable authority for AI agents",
      description:
        "Governance, security and privacy for AI agents. Trust Gateway sits between your agents and your APIs or MCP servers: it verifies every sensitive operation, asks for human approval when needed and leaves a verifiable receipt.",
    },
    gateway: {
      title: "Trust Gateway",
      description:
        "Trust Gateway, Gleam Peak AI's first product (prototype in development): verifies identity, mandate, purpose and risk before an AI agent executes an operation, and leaves verifiable evidence.",
    },
    how: {
      title: "How it works",
      description:
        "Proposal, mandate, policy, decision and evidence: how Trust Gateway controls every AI agent operation before it is executed.",
    },
    applications: {
      title: "Applications",
      description:
        "Public administrations, regulated entities, integrators and agent providers: where an AI agent's authority has to be provable.",
    },
    principles: {
      title: "Principles",
      description:
        "Binding human oversight, privacy by design, review, traceability, revocation and proportionality: the principles of Gleam Peak AI.",
    },
    security: {
      title: "Cybersecurity and trust",
      description:
        "Cybersecurity for AI agents: which risks Trust Gateway addresses, what the first prototype will and will not do, how evidence will be handled and how to report a security issue.",
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
