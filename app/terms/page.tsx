"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";

const content = {
  es: {
    title: "Términos del Servicio",
    intro:
      "Estos términos regulan el uso del sitio web de Gleam Peak AI y cualquier interacción inicial con nuestros servicios.",
    sections: [
      {
        title: "1. Uso del sitio",
        body: [
          "Puedes utilizar este sitio con fines informativos y comerciales legítimos. No debes usarlo para actividades ilícitas, dañinas o que afecten el funcionamiento del servicio.",
        ],
      },
      {
        title: "2. Contenido y propiedad intelectual",
        body: [
          "Salvo que se indique lo contrario, el contenido del sitio, marca, textos, diseño y materiales son propiedad de Gleam Peak AI o se usan con autorización.",
        ],
      },
      {
        title: "3. Sin garantía de resultados",
        body: [
          "La información presentada en este sitio tiene carácter general y no constituye garantía de resultados específicos. Cualquier alcance o propuesta final dependerá del análisis concreto del caso.",
        ],
      },
      {
        title: "4. Enlaces y herramientas externas",
        body: [
          "El sitio puede incluir enlaces a herramientas o plataformas externas, como sistemas de agenda. No somos responsables del contenido o prácticas de terceros fuera de nuestro control.",
        ],
      },
      {
        title: "5. Limitación de responsabilidad",
        body: [
          "En la medida permitida por la ley, Gleam Peak AI no será responsable por daños indirectos, incidentales o consecuentes derivados del uso del sitio.",
        ],
      },
      {
        title: "6. Cambios",
        body: [
          "Podemos actualizar estos términos en cualquier momento. El uso continuado del sitio implica aceptación de las versiones vigentes.",
        ],
      },
      {
        title: "7. Contacto",
        body: [
          "Para cualquier consulta relacionada con estos términos, escríbenos a hello@gleampeak.ai.",
        ],
      },
    ],
  },
  en: {
    title: "Terms of Service",
    intro:
      "These terms govern the use of the Gleam Peak AI website and any initial interaction with our services.",
    sections: [
      {
        title: "1. Website use",
        body: [
          "You may use this website for legitimate informational and business purposes. You must not use it for unlawful, harmful or disruptive activities.",
        ],
      },
      {
        title: "2. Content and intellectual property",
        body: [
          "Unless otherwise stated, the site content, brand assets, copy, design and materials are owned by Gleam Peak AI or used with permission.",
        ],
      },
      {
        title: "3. No guarantee of outcomes",
        body: [
          "Information presented on this site is general in nature and does not guarantee specific outcomes. Any final scope or proposal depends on the specific business case reviewed.",
        ],
      },
      {
        title: "4. External links and tools",
        body: [
          "The website may contain links to external tools or platforms, such as scheduling systems. We are not responsible for the content or practices of third parties outside our control.",
        ],
      },
      {
        title: "5. Limitation of liability",
        body: [
          "To the extent permitted by law, Gleam Peak AI will not be liable for indirect, incidental or consequential damages arising from use of the website.",
        ],
      },
      {
        title: "6. Changes",
        body: [
          "We may update these terms at any time. Continued use of the website means acceptance of the current version.",
        ],
      },
      {
        title: "7. Contact",
        body: [
          "For any questions related to these terms, contact us at hello@gleampeak.ai.",
        ],
      },
    ],
  },
} as const;

export default function TermsPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080210] flex items-center justify-center text-white">Cargando...</div>}>
      <TermsContent />
    </Suspense>
  );
}

function TermsContent() {
  const searchParams = useSearchParams();
  const lang = (searchParams.get("lang") as "es" | "en") || "es";
  const t = useMemo(() => content[lang], [lang]);

  return (
    <main className="min-h-screen bg-[#080210] px-5 py-16 text-white lg:px-8">
      <div className="mx-auto max-w-4xl">
        <a
          href={`/?lang=${lang}`}
          className="mb-8 inline-block text-sm text-white/60 transition hover:text-white"
        >
          ← {lang === "es" ? "Volver al sitio" : "Back to site"}
        </a>

        <h1 className="mb-6 text-4xl font-semibold">{t.title}</h1>
        <p className="mb-10 text-white/70">{t.intro}</p>

        <div className="space-y-8">
          {t.sections.map((section) => (
            <section key={section.title}>
              <h2 className="mb-3 text-xl font-medium text-white">
                {section.title}
              </h2>
              <div className="space-y-3 text-white/70">
                {section.body.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
      </div>
    </main>
  );
}