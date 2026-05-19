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
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-center gap-5 px-5 py-8 text-center text-sm text-white/60 md:flex-row md:justify-between md:text-left lg:px-8">
        <p className="max-w-xs tracking-[0.01em] md:max-w-none">
          © {year}{" "}
          <span className="font-medium text-white/90">Gleam Peak AI</span>.{" "}
          {t.rights}
        </p>

        <div className="flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-white/50">
          <a
            href="https://linkedin.com/company/gleampeak"
            target="_blank"
            rel="noopener noreferrer"
            className="transition duration-200 hover:text-fuchsia-300"
          >
            LinkedIn
          </a>

          <span className="text-white/20">•</span>

          <a
            href="https://www.instagram.com/gleampeak?igsh=MWNiMjFuNmVoaXdjeg=="
            target="_blank"
            rel="noopener noreferrer"
            className="transition duration-200 hover:text-fuchsia-300"
          >
            Instagram
          </a>

          <span className="text-white/20">•</span>

          <a
            href="https://wa.me/34627964660?text=Hello%20Gleam%20Peak%20AI,%20I'd%20like%20to%20learn%20more%20about%20your%20AI%20solutions."
            target="_blank"
            rel="noopener noreferrer"
            className="transition duration-200 hover:text-fuchsia-300"
          >
            WhatsApp
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-2 text-white/60">
          <a
            href={`/privacy?lang=${lang}`}
            className="transition duration-200 hover:text-white"
          >
            {t.privacy}
          </a>

          <span className="text-white/20">|</span>

          <a
            href={`/terms?lang=${lang}`}
            className="transition duration-200 hover:text-white"
          >
            {t.terms}
          </a>
        </div>
      </div>
    </footer>
  );
}