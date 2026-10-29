import type { Metadata } from "next";
import Link from "next/link";
import SiteShell, { viewport } from "@/components/site/SiteShell";
import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Página no encontrada · Page not found | Gleam Peak AI",
  robots: { index: false },
};
export { viewport };

export default function GlobalNotFound() {
  return (
    <SiteShell lang="es">
      <div className="page">
        <section className="subhero">
          <div className="shell not-found">
            <span className="eyebrow">404</span>
            <h1>Esta página no existe</h1>
            <p className="lead">Puede que el enlace haya cambiado. Vuelve al inicio o escríbenos a hello@gleampeak.ai.</p>
            <p className="lead" lang="en">
              This page does not exist. Go back to the home page or write to hello@gleampeak.ai.
            </p>
            <div className="hero-actions">
              <Link className="button button-primary" href="/">
                Ir al inicio
              </Link>
              <Link className="button button-secondary" href="/en" lang="en">
                English home
              </Link>
            </div>
          </div>
        </section>
      </div>
    </SiteShell>
  );
}
