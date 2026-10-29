"use client";

import { createContext, useContext } from "react";
import { content, type Content, type Lang } from "./content";
import { routes, type RouteKey } from "./routes";

type LangValue = { lang: Lang; t: Content; href: (key: RouteKey) => string };

const LangContext = createContext<LangValue | null>(null);

// The language comes from the URL (/en/... is English), so every page is rendered and indexed in its own language.
export function LangProvider({ lang, children }: { lang: Lang; children: React.ReactNode }) {
  const value: LangValue = { lang, t: content[lang], href: (key) => routes[lang][key] };
  return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang() {
  const value = useContext(LangContext);
  if (!value) throw new Error("useLang must be used inside LangProvider");
  return value;
}
