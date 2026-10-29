import type { MetadataRoute } from "next";
import { routes, type RouteKey } from "@/components/site/routes";
import { SITE_URL } from "@/components/site/seo";

const priority: Partial<Record<RouteKey, number>> = { home: 1, privacy: 0.3, terms: 0.3 };

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(routes.es) as RouteKey[];
  return (["es", "en"] as const).flatMap((lang) =>
    keys.map((key) => ({
      url: `${SITE_URL}${routes[lang][key] === "/" ? "" : routes[lang][key]}`,
      changeFrequency: "monthly" as const,
      priority: priority[key] ?? 0.8,
      alternates: {
        languages: {
          es: `${SITE_URL}${routes.es[key] === "/" ? "" : routes.es[key]}`,
          en: `${SITE_URL}${routes.en[key]}`,
        },
      },
    })),
  );
}
