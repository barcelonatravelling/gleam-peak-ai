"use client";

import Image from "next/image";

type FloatingButtonProps = {
  lang: "en" | "es";
};

export default function FloatingButton({ lang }: FloatingButtonProps) {
  return (
    <div className="fixed bottom-6 right-6 z-[9999] flex flex-col items-end gap-2">

      <div className="rounded-full border border-white/10 bg-[#0a0614]/90 px-4 py-2 text-xs font-medium text-white/80 shadow-lg backdrop-blur-xl">
        {lang === "es"
          ? "Habla con nuestro asistente IA"
          : "Talk to our AI Assistant"}
      </div>

      <button
        onClick={() => {
          const event = new CustomEvent("open-assistant");
          window.dispatchEvent(event);
        }}
        className="group"
        aria-label={lang === "es" ? "Abrir asistente" : "Open assistant"}
      >
        <div className="relative h-[64px] w-[64px]">
          <div className="absolute inset-0 rounded-full bg-fuchsia-500/40 blur-xl transition duration-300 group-hover:bg-fuchsia-500/60" />

          <Image
            src="/assistant-icon.png"
            alt={lang === "es" ? "Asistente IA" : "AI Assistant"}
            fill
            className="relative object-contain"
          />
        </div>
      </button>

    </div>
  );
}