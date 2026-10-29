import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import type { Lang } from "./content";

export const ogSize = { width: 1200, height: 630 };

const copy: Record<Lang, { title: string; line: string }> = {
  es: {
    title: "Control verificable para agentes de IA",
    line: "Trust Gateway · Identidad, mandato, finalidad, riesgo y evidencia",
  },
  en: {
    title: "Verifiable control for AI agents",
    line: "Trust Gateway · Identity, mandate, purpose, risk and evidence",
  },
};

export const ogAlt: Record<Lang, string> = {
  es: "Gleam Peak AI · Control verificable para agentes de IA",
  en: "Gleam Peak AI · Verifiable control for AI agents",
};

export async function ogImage(lang: Lang) {
  const logo = await readFile(join(process.cwd(), "public/logo-gleampeak.svg"));
  const logoSrc = `data:image/svg+xml;base64,${logo.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          backgroundColor: "#05030b",
          backgroundImage:
            "radial-gradient(circle at 0% 0%, rgba(196,56,159,.35), transparent 45%), radial-gradient(circle at 100% 0%, rgba(47,79,184,.35), transparent 45%)",
          color: "#f6f3fb",
          fontFamily: "sans-serif",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={logoSrc} width={194} height={100} alt="" />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -2, lineHeight: 1.05 }}>{copy[lang].title}</div>
          <div style={{ marginTop: 28, fontSize: 30, color: "#aea5bf" }}>{copy[lang].line}</div>
        </div>
      </div>
    ),
    ogSize,
  );
}
