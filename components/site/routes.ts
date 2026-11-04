import type { Lang } from "./content";

export type RouteKey =
  | "home"
  | "gateway"
  | "passport"
  | "applications"
  | "principles"
  | "security"
  | "resources"
  | "talk"
  | "privacy"
  | "terms";

export const routes: Record<Lang, Record<RouteKey, string>> = {
  es: {
    home: "/",
    gateway: "/control",
    passport: "/passport",
    applications: "/soluciones",
    principles: "/principios",
    security: "/seguridad",
    resources: "/recursos",
    talk: "/hablemos",
    privacy: "/privacy",
    terms: "/terms",
  },
  en: {
    home: "/en",
    gateway: "/en/control",
    passport: "/en/passport",
    applications: "/en/solutions",
    principles: "/en/principles",
    security: "/en/security",
    resources: "/en/resources",
    talk: "/en/contact",
    privacy: "/en/privacy",
    terms: "/en/terms",
  },
};

// Principles and Resources stay reachable from the footer.
export const navOrder = ["gateway", "passport", "applications", "security"] as const;

export function routeKeyFor(pathname: string, lang: Lang): RouteKey {
  const clean = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  const match = (Object.keys(routes[lang]) as RouteKey[]).find((key) => routes[lang][key] === clean);
  return match ?? "home";
}
