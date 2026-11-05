import type { MetadataRoute } from "next";
import { routes, type RouteKey } from "@/components/site/routes";
import { SITE_URL } from "@/components/site/seo";
import { ARTICLE_DATE } from "@/components/site/content-articles";

const priority: Partial<Record<RouteKey, number>> = {
  home: 1,
  privacy: 0.3,
  terms: 0.3,
  articleAuthorise: 0.6,
  articleAiAct: 0.6,
  articleMcp: 0.6,
};

// Articles carry their publication date; the other pages leave lastModified to the crawler.
const published: Partial<Record<RouteKey, string>> = {
  articleAuthorise: ARTICLE_DATE,
  articleAiAct: ARTICLE_DATE,
  articleMcp: ARTICLE_DATE,
};

export default function sitemap(): MetadataRoute.Sitemap {
  const keys = Object.keys(routes.es) as RouteKey[];
  return (["es", "en"] as const).flatMap((lang) =>
    keys.map((key) => ({
      url: `${SITE_URL}${routes[lang][key] === "/" ? "" : routes[lang][key]}`,
      ...(published[key] ? { lastModified: published[key] } : {}),
      changeFrequency: "monthly" as const,
      priority: priority[key] ?? 0.8,
      alternates: {
        languages: {
          es: `${SITE_URL}${routes.es[key] === "/" ? "" : routes.es[key]}`,
          en: `${SITE_URL}${routes.en[key]}`,
          "x-default": `${SITE_URL}${routes.es[key] === "/" ? "" : routes.es[key]}`,
        },
      },
    })),
  );
}
