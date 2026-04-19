export default function Footer() {
  return (
    <footer className="mt-24 border-t border-white/10 pt-10 pb-6 text-sm text-white/60">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-col gap-8 md:flex-row md:justify-between">
          <div>
            <div className="mb-2 font-semibold text-white">Gleam Peak AI</div>
            <p className="max-w-xs text-white/50">
              AI infrastructure, intelligent automation and decision systems for
              modern businesses.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-3">
            <div>
              <div className="mb-2 text-white">Company</div>
              <ul className="space-y-1">
                <li>
                  <a href="#solutions" className="hover:text-white">
                    AI Solutions
                  </a>
                </li>
                <li>
                  <a href="#automation" className="hover:text-white">
                    AI Automation
                  </a>
                </li>
                <li>
                  <a href="#industries" className="hover:text-white">
                    Industries
                  </a>
                </li>
                <li>
                  <a href="#cases" className="hover:text-white">
                    Case Studies
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="mb-2 text-white">Legal</div>
              <ul className="space-y-1">
                <li>
                  <a href="#" className="hover:text-white">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <div className="mb-2 text-white">Contact</div>
              <ul className="space-y-1">
                <li>
                  <a
                    href="https://calendly.com/gleampeak/30min"
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-white"
                  >
                    Book a Call
                  </a>
                </li>
                <li>
                  <a
                    href="mailto:hello@gleampeak.ai"
                    className="hover:text-white"
                  >
                    hello@gleampeak.ai
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 md:flex-row">
          <p>© {new Date().getFullYear()} Gleam Peak AI. All rights reserved.</p>

          <div className="flex gap-4">
            <a href="#" className="hover:text-white">
              Privacy
            </a>
            <a href="#" className="hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

type FooterProps = {
  lang: "es" | "en";
};

export default function Footer({ lang }: FooterProps) {
  return (
    <footer className="border-t border-white/10 bg-white/[0.02] backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-5 py-6 text-sm text-white/60 lg:px-8 md:flex-row md:items-center md:justify-between">
        <p className="tracking-[0.01em]">
          © 2026 <span className="font-medium text-white/85">Gleam Peak AI</span>. All rights reserved.
        </p>

        <div className="flex flex-wrap items-center gap-3 text-white/55">
          <a
            href={`/privacy?lang=${lang}`}
            className="transition duration-200 hover:text-white"
          >
            Privacy Policy
          </a>

          <span className="text-white/20">|</span>

          <a
            href={`/terms?lang=${lang}`}
            className="transition duration-200 hover:text-white"
          >
            Terms of Service
          </a>
        </div>
      </div>
    </footer>
  );
}