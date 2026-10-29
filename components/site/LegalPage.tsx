"use client";

import { useLang } from "./LangContext";
import { privacy, terms } from "./legal";

export function LegalPage({ kind }: { kind: "privacy" | "terms" }) {
  const { lang } = useLang();
  const doc = (kind === "privacy" ? privacy : terms)[lang];
  return (
    <div className="page">
      <section className="subhero">
        <div className="shell legal">
          <span className="eyebrow">{doc.eyebrow}</span>
          <h1>{doc.title}</h1>
          <p className="lead">{doc.intro}</p>
          {doc.sections.map((section) => (
            <section key={section.title}>
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </section>
          ))}
          <p className="legal-updated">{doc.updated}</p>
        </div>
      </section>
    </div>
  );
}
