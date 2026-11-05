"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type FloatingButtonProps = {
  lang: "en" | "es";
};

// The button appears once the page has scrolled past most of the first screen and the hero (the first
// section of <main>) has left the corner where the button sits, so it never covers the hero. On pages
// too short to scroll that far it appears near the end of the page (or at once if nothing scrolls).
// While hidden it is invisible and inert: not clickable, not focusable, not announced.
export default function FloatingButton({ lang }: FloatingButtonProps) {
  const [visible, setVisible] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const update = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const threshold = Math.min(window.innerHeight * 0.6, Math.max(0, maxScroll - 40));
      const hero = document.querySelector("main > div > section:first-child");
      const heroClear = !hero || hero.getBoundingClientRect().bottom < window.innerHeight - 120 || window.scrollY >= maxScroll - 40;
      setVisible(window.scrollY >= threshold && heroClear);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [pathname]);

  return (
    <div
      className={`fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-2 transition-[opacity,transform,visibility] duration-300 sm:bottom-6 sm:right-6 ${
        visible ? "visible translate-y-0 opacity-100" : "pointer-events-none invisible translate-y-3 opacity-0"
      }`}
      aria-hidden={!visible}
      inert={!visible}
    >

      <div className="mb-1 hidden rounded-md bg-black/70 px-2 py-1 text-[12px] font-semibold text-[#aea5bf] backdrop-blur-md sm:block">
        {lang === "es" ? "Asistente IA" : "AI assistant"}
      </div>

      <button
        onClick={() => {
          const event = new CustomEvent("open-assistant");
          window.dispatchEvent(event);
        }}
        className="group"
        aria-label={lang === "es" ? "Abrir asistente" : "Open assistant"}
      >
        <div className="relative h-[44px] w-[44px] sm:h-[64px] sm:w-[64px]">
          <div className="absolute inset-0 rounded-full bg-fuchsia-500/20 blur-xl transition duration-300 group-hover:bg-fuchsia-500/40 sm:bg-fuchsia-500/40 sm:group-hover:bg-fuchsia-500/60" />

          <Image
            src="/assistant-icon.webp"
            alt={lang === "es" ? "Asistente IA" : "AI assistant"}
            fill
            sizes="64px"
            className="relative object-contain"
          />
        </div>
      </button>

    </div>
  );
}