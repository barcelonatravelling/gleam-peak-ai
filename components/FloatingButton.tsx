"use client";

import Image from "next/image";

export default function FloatingButton() {
  return (
    <button
      onClick={() => {
        const event = new CustomEvent("open-assistant");
        window.dispatchEvent(event);
      }}
      className="fixed bottom-6 right-6 z-[9999] group"
      aria-label="Abrir asistente"
    >
      <div className="relative h-[64px] w-[64px]">
        <div className="absolute inset-0 rounded-full bg-fuchsia-500/40 blur-xl transition duration-300 group-hover:bg-fuchsia-500/60" />
        <Image
          src="/assistant-icon.png"
          alt="AI Assistant"
          fill
          className="relative object-contain"
        />
      </div>
    </button>
  );
}