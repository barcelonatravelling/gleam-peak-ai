"use client";

import { useState } from "react";
import { Bot, MessageSquareText, X } from "lucide-react";

type AssistantChatProps = {
  bookingUrl: string;
};

export default function AssistantChat({ bookingUrl }: AssistantChatProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] inline-flex items-center gap-3 rounded-full border border-fuchsia-300/20 bg-[#11061d] px-5 py-3 text-white shadow-[0_18px_40px_rgba(65,20,120,0.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/35"
        aria-label="Open AI assistant"
      >
        <div className="flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5">
          <Bot className="h-4 w-4 text-fuchsia-200" />
        </div>
        <div className="flex flex-col items-start leading-none">
          <span className="text-[11px] uppercase tracking-[0.18em] text-white/55">
            Gleam Peak AI
          </span>
          <span className="mt-1 text-sm font-medium text-white">
            AI Assistant
          </span>
        </div>
      </button>

      {open ? (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm">
          <div className="absolute bottom-24 right-6 flex h-[78vh] w-[min(420px,calc(100vw-24px))] flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#0a0614] shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.05]">
                  <Bot className="h-5 w-5 text-fuchsia-200" />
                </div>
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-fuchsia-200/75">
                    Gleam Peak AI
                  </div>
                  <div className="mt-1 text-lg font-semibold text-white">
                    AI Business Assistant
                  </div>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                className="rounded-full border border-white/10 bg-white/5 p-2 text-white/80 transition hover:bg-white/10 hover:text-white"
                aria-label="Close assistant"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-4">
              <div className="rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm leading-7 text-white/85">
                <div className="mb-3 flex items-center gap-2 text-fuchsia-200">
                  <MessageSquareText className="h-4 w-4" />
                  <span className="text-xs uppercase tracking-[0.18em]">
                    Assistant online
                  </span>
                </div>

                <p>
                  Hola, soy el asistente de Gleam Peak AI. Puedo ayudarte a
                  identificar cómo la inteligencia artificial puede mejorar tu
                  negocio, automatizar procesos y detectar oportunidades de alto
                  impacto.
                </p>

                <p className="mt-3 text-white/72">
                  También puedo responder en English.
                </p>

                <div className="mt-5 space-y-2 text-white/72">
                  <div>• Explorar oportunidades de IA</div>
                  <div>• Identificar automatizaciones útiles</div>
                  <div>• Preparar una llamada estratégica</div>
                </div>
              </div>
            </div>

            <div className="border-t border-white/10 px-4 py-4">
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#12041e] transition hover:scale-[1.01]"
              >
                <Bot className="h-4 w-4" />
                Book a call
              </a>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}