"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { BrandMark } from "./Brand";
import { useLang } from "./LangContext";
import { navOrder, routeKeyFor, routes } from "./routes";

const LANG_NAMES = { es: "Español", en: "English" } as const;

export default function Header() {
  const { lang, t, href } = useLang();
  const pathname = usePathname();
  // The menu remembers the page it was opened on, so it closes by itself after navigating.
  const [menuPath, setMenuPath] = useState<string | null>(null);
  const menuOpen = menuPath === pathname;
  const current = routeKeyFor(pathname, lang);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuPath(null);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

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
          <div className="lang-switch" role="group" aria-label={t.a11y.switchLang}>
            {(["es", "en"] as const).map((code) =>
              code === lang ? (
                <span key={code} className="lang-option active" aria-current="true" title={LANG_NAMES[code]}>
                  {code.toUpperCase()}
                </span>
              ) : (
                <a
                  key={code}
                  className="lang-option"
                  href={routes[code][current]}
                  hrefLang={code}
                  lang={code}
                  title={LANG_NAMES[code]}
                >
                  {code.toUpperCase()}
                </a>
              ),
            )}
          </div>
          <Link className="header-cta" href={href("talk")}>
            {t.nav.talk}
          </Link>
          <button
            className="menu-button"
            type="button"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? t.a11y.closeMenu : t.a11y.openMenu}
            onClick={() => setMenuPath(menuOpen ? null : pathname)}
          >
            <span />
            <span />
          </button>
        </div>
        <nav
          className={`mobile-nav${menuOpen ? " open" : ""}`}
          id="mobile-menu"
          aria-label={t.a11y.mobileNav}
          aria-hidden={!menuOpen}
          inert={!menuOpen}
        >
          {([...navOrder, "talk"] as const).map((key, i) => (
            <Link key={key} {...linkProps(key)} style={{ "--i": i } as React.CSSProperties}>
              {t.nav[key]}
            </Link>
          ))}
        </nav>
      </header>
    </>
  );
}
