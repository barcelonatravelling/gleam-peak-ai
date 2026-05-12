type FooterProps = {
  lang: "es" | "en";
};

const footerText = {
  es: {
    rights: "Todos los derechos reservados.",
    privacy: "Política de Privacidad",
    terms: "Términos del Servicio",
  },
  en: {
    rights: "All rights reserved.",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
  },
} as const;

export default function Footer({ lang }: FooterProps) {
  const t = footerText[lang];
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-white/10 bg-gradient-to-b from-transparent to-white/[0.03] backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm text-white/60 lg:px-8 md:flex-row md:items-center md:justify-between">
        <p className="tracking-[0.01em]">
          © {year}{" "}
          <span className="font-medium text-white/90">Gleam Peak AI</span>.{" "}
          {t.rights}
        </p>

        <div className="flex flex-wrap items-center gap-3 text-white/50">
          <a
            href={`/privacy?lang=${lang}`}
            className="relative transition duration-200 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            {t.privacy}
          </a>

          <span className="text-white/20">|</span>

          <a
            href={`/terms?lang=${lang}`}
            className="relative transition duration-200 hover:text-white after:absolute after:left-0 after:-bottom-1 after:h-[1px] after:w-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full"
          >
            {t.terms}
          </a>
        </div>
      </div>
      <div className="mt-8 flex flex-col items-center gap-4">
  <div className="flex items-center gap-4 text-sm text-white/60">
    <a
      href="https://linkedin.com/company/gleampeak"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-fuchsia-300 transition-colors"
    >
      LinkedIn
    </a>

    <span>•</span>

    <a
      href="https://instagram.com/gleampeak.ai"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-fuchsia-300 transition-colors"
    >
      Instagram
    </a>

    <span>•</span>

    <a
      href="https://wa.me/34645654591"
      target="_blank"
      rel="noopener noreferrer"
      className="hover:text-fuchsia-300 transition-colors"
    >
      WhatsApp
    </a>
  </div>

  <p className="text-xs text-white/40">
    © 2026 Gleam Peak AI. All rights reserved.
  </p>
</div>
    </footer>
  );
}