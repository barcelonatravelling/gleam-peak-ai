"use client";

import Image from "next/image";

type FloatingButtonProps = {
  lang: "en" | "es";
};

export default function FloatingButton({ lang }: FloatingButtonProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">

      <div className="mb-1 hidden rounded-md bg-black/70 px-2 py-1 text-[10px] uppercase tracking-[0.15em] text-white/60 backdrop-blur-md sm:block">
        {lang === "es" ? "Asistente IA" : "AI Assistant"}
      </div>

      <button
        onClick={() => {
          const event = new CustomEvent("open-assistant");
          window.dispatchEvent(event);
        }}
        className="group"
        aria-label={lang === "es" ? "Abrir asistente" : "Open assistant"}
      >
        <div className="relative h-[48px] w-[48px] sm:h-[64px] sm:w-[64px]">
          <div className="absolute inset-0 rounded-full bg-fuchsia-500/40 blur-xl transition duration-300 group-hover:bg-fuchsia-500/60" />

          <Image
            src="/assistant-icon.webp"
            alt={lang === "es" ? "Asistente IA" : "AI Assistant"}
            fill
            sizes="64px"
            className="relative object-contain"
          />
        </div>
      </button>

    </div>
  );
}