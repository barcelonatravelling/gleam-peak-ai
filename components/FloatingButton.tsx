"use client";

import Image from "next/image";

type FloatingButtonProps = {
  lang: "en" | "es";
};

export default function FloatingButton({ lang }: FloatingButtonProps) {
  return (
    <div className="fixed bottom-4 right-4 z-[9999] flex flex-col items-end gap-2 sm:bottom-6 sm:right-6">

      <div className="mb-1 hidden rounded-md bg-black/70 px-2 py-1 text-[12px] font-semibold uppercase tracking-[0.14em] text-[#aea5bf] backdrop-blur-md sm:block">
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
        <div className="relative h-[44px] w-[44px] sm:h-[64px] sm:w-[64px]">
          <div className="absolute inset-0 rounded-full bg-fuchsia-500/20 blur-xl transition duration-300 group-hover:bg-fuchsia-500/40 sm:bg-fuchsia-500/40 sm:group-hover:bg-fuchsia-500/60" />

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