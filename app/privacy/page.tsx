"use client";

import { Suspense, useMemo } from "react";
import { useSearchParams } from "next/navigation";

const content = {
  es: {
    title: "Política de Privacidad",
    intro:
      "En Gleam Peak AI valoramos tu privacidad. Esta política explica cómo recopilamos, usamos y protegemos tu información cuando interactúas con nuestro sitio web y nuestros servicios.",
    sections: [
      {
        title: "1. Información que recopilamos",
        body: [
          "Podemos recopilar información que nos proporcionas directamente, como tu nombre, correo electrónico, nombre de empresa y cualquier detalle compartido a través de formularios o del asistente.",
          "También podemos recopilar datos técnicos básicos como dirección IP, tipo de navegador, dispositivo y comportamiento de navegación para mejorar el rendimiento del sitio."
        ],
      },
      {
        title: "2. Cómo usamos la información",
        body: [
          "Utilizamos la información para responder consultas, evaluar oportunidades comerciales, mejorar nuestro sitio y ofrecer una experiencia más relevante.",
          "No vendemos tu información personal a terceros."
        ],
      },
      {
        title: "3. Compartición de datos",
        body: [
          "Podemos compartir información con proveedores de servicios necesarios para operar nuestro sitio, herramientas de análisis, alojamiento o comunicación, siempre bajo obligaciones razonables de confidencialidad.",
        ],
      },
      {
        title: "4. Conservación y seguridad",
        body: [
          "Aplicamos medidas razonables para proteger la información que procesamos. Conservamos los datos solo durante el tiempo necesario para fines operativos, legales o comerciales legítimos.",
        ],
      },
      {
        title: "5. Tus derechos",
        body: [
          "Puedes solicitar acceso, corrección o eliminación de tu información personal, sujeto a las leyes aplicables.",
        ],
      },
      {
        title: "6. Contacto",
        body: [
          "Si tienes preguntas sobre esta política, puedes escribirnos a hello@gleampeak.ai.",
        ],
      },
    ],
  },
  en: {
    title: "Privacy Policy",
    intro:
      "At Gleam Peak AI, we value your privacy. This policy explains how we collect, use and protect your information when you interact with our website and services.",
    sections: [
      {
        title: "1. Information we collect",
        body: [
          "We may collect information you provide directly, such as your name, email address, company name and any details shared through forms or the assistant.",
          "We may also collect basic technical data such as IP address, browser type, device information and browsing behavior to improve site performance."
        ],
      },
      {
        title: "2. How we use information",
        body: [
          "We use information to respond to inquiries, evaluate business opportunities, improve our website and deliver a more relevant experience.",
          "We do not sell your personal information to third parties."
        ],
      },
      {
        title: "3. Data sharing",
        body: [
          "We may share information with service providers required to operate our website, analytics tools, hosting or communications infrastructure, under reasonable confidentiality obligations.",
        ],
      },
      {
        title: "4. Retention and security",
        body: [
          "We apply reasonable measures to protect the information we process. We retain data only as long as necessary for operational, legal or legitimate business purposes.",
        ],
      },
      {
        title: "5. Your rights",
        body: [
          "You may request access, correction or deletion of your personal information, subject to applicable law.",
        ],
      },
      {
        title: "6. Contact",
        body: [
          "If you have questions about this policy, you can contact us at hello@gleampeak.ai.",
        ],
      },
    ],
  },
} as const;

export default function PrivacyPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#080210] flex items-center justify-center text-white">Cargando...</div>}>
      <PrivacyContent />
    </Suspense>
  );
}

function PrivacyContent() {
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