"use client";

import Link from "next/link";
import { BrandMark } from "./Brand";
import { useLang } from "./LangContext";

export default function Footer() {
  const { t, href } = useLang();

  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="footer-inner">
          <div className="footer-brand">
            <Link className="brand" href={href("home")} aria-label={t.a11y.homeLink}>
              <BrandMark />
            </Link>
            <p>{t.footer.line}</p>
          </div>
          <nav className="footer-col" aria-label={t.footer.product}>
            <p className="footer-title">{t.footer.product}</p>
            <ul>
              <li>
                <Link href={href("gateway")}>{t.nav.gateway}</Link>
              </li>
              <li>
                <Link href={href("how")}>{t.nav.how}</Link>
              </li>
              <li>
                <Link href={href("applications")}>{t.nav.applications}</Link>
              </li>
              <li>
                <Link href={href("security")}>{t.nav.security}</Link>
              </li>
            </ul>
          </nav>
          <nav className="footer-col" aria-label={t.footer.company}>
            <p className="footer-title">{t.footer.company}</p>
            <ul>
              <li>
                <Link href={href("principles")}>{t.nav.principles}</Link>
              </li>
              <li>
                <Link href={href("resources")}>{t.nav.resources}</Link>
              </li>
              <li>
                <Link href={href("talk")}>{t.nav.talk}</Link>
              </li>
              <li>
                <a href="https://linkedin.com/company/gleampeak" target="_blank" rel="noopener noreferrer">
                  LinkedIn
                </a>
              </li>
            </ul>
          </nav>
          <nav className="footer-col" aria-label={t.footer.legal}>
            <p className="footer-title">{t.footer.legal}</p>
            <ul>
              <li>
                <Link href={href("privacy")}>{t.footer.privacy}</Link>
              </li>
              <li>
                <Link href={href("terms")}>{t.footer.terms}</Link>
              </li>
              <li>
                <a href="mailto:hello@gleampeak.ai">hello@gleampeak.ai</a>
              </li>
            </ul>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Gleam Peak AI</span>
          <span>{t.common.development} · Trust Gateway</span>
        </div>
      </div>
    </footer>
  );
}
