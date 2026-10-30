"use client";

import { usePathname } from "next/navigation";
import { useEffect } from "react";

// Scroll reveal for `.reveal` blocks, the pointer glow on cards and the header's scrolled state.
export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    document.documentElement.classList.add("js");

    const onMove = (event: PointerEvent) => {
      const card = (event.target as Element | null)?.closest?.(".card") as HTMLElement | null;
      if (!card) return;
      const rect = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${event.clientX - rect.left}px`);
      card.style.setProperty("--my", `${event.clientY - rect.top}px`);
    };
    // The header gets a firmer background once the page has scrolled a little.
    const onScroll = () => document.documentElement.classList.toggle("scrolled", window.scrollY > 12);
    onScroll();
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const items = document.querySelectorAll<HTMLElement>(".reveal:not(.in)");
    if (!("IntersectionObserver" in window)) {
      items.forEach((item) => item.classList.add("in"));
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in");
            observer.unobserve(entry.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    items.forEach((item) => observer.observe(item));
    return () => observer.disconnect();
  }, [pathname]);

  return null;
}
