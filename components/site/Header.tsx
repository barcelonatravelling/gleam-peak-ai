"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { BrandMark } from "./Brand";
import { useLang } from "./LangContext";
import { navOrder, routeKeyFor, routes } from "./routes";

export default function Header() {
  const { lang, t, href } = useLang();
  const pathname = usePathname();
  // The menu remembers the page it was opened on, so it closes by itself after navigating.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const current = routeKeyFor(pathname, lang);
  const otherLang = lang === "es" ? "en" : "es";

  const linkProps = (key: (typeof navOrder)[number] | "talk") => ({
    href: href(key),
    className: current === key ? "active" : undefined,
    "aria-current": current === key ? ("page" as const) : undefined,
  });

  return (
    <>
      <a className="skip-link" href="#main">
        {t.a11y.skip}
      </a>
      <header className="site-header">
        <Link className="brand" href={href("home")} aria-label={t.a11y.homeLink}>
          <BrandMark />
        </Link>
        <nav className="desktop-nav" aria-label={t.a11y.mainNav}>
          {navOrder.map((key) => (
            <Link key={key} {...linkProps(key)}>
              {t.nav[key]}
            </Link>
          ))}
        </nav>
        <div className="header-actions">
          <a
            className="lang-button"
            href={routes[otherLang][current]}
            hrefLang={otherLang}
            lang={otherLang}
            aria-label={t.a11y.switchLang}
          >
            {otherLang.toUpperCase()}
          </a>
          <Link className="header-cta" href={href("talk")}>
            {t.nav.talk}
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={t.a11y.openMenu}
            onClick={() => setMenuPath(menuOpen ? null : pathname)}
          >
            <span />
            <span />
          </button>
        </div>
        <nav className="mobile-nav" id="mobile-menu" aria-label={t.a11y.mobileNav} hidden={!menuOpen}>
          {([...navOrder, "talk"] as const).map((key) => (
            <Link key={key} {...linkProps(key)}>
              {t.nav[key]}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
