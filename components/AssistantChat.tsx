"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Send, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type AssistantChatProps = {
  bookingUrl: string;
  lang: "en" | "es";
};

const translations = {
  es: {
    welcome: "Hola 👋 ¿A qué se dedica tu empresa?",
    placeholder: "Escribe tu mensaje...",
    thinking: "Analizando...",
    error:
      "Hubo un problema al procesar la respuesta. Puedes intentarlo de nuevo o reservar una llamada directamente.",
    ctaDefault: "Hablar con un experto",
    ctaHot: "Reservar llamada estratégica",
    ctaNextStep: "Analizar mi caso",
    closeLabel: "Cerrar asistente",
    sendLabel: "Enviar mensaje",
  },
  en: {
    welcome: "Hi 👋 What does your company do?",
    placeholder: "Write your message...",
    thinking: "Analyzing...",
    error:
      "There was a problem processing the response. You can try again or book a call directly.",
    ctaDefault: "Talk to an expert",
    ctaHot: "Book a strategic call",
    ctaNextStep: "Analyze my case",
    closeLabel: "Close assistant",
    sendLabel: "Send message",
  },
} as const;

export default function AssistantChat({
  bookingUrl,
  lang,
}: AssistantChatProps) {
  const t = translations[lang];

  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: t.welcome },
  ]);
  const [error, setError] = useState("");

  const [hotLead, setHotLead] = useState(false);
  const [ctaPulse, setCtaPulse] = useState(false);
  const [needsNextStep, setNeedsNextStep] = useState(false);
  const [leadStage, setLeadStage] = useState<"cold" | "warm" | "hot">("cold");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    setMessages((prev) => {
      if (prev.length === 1 && prev[0].role === "assistant") {
        return [{ role: "assistant", content: t.welcome }];
      }

      return prev;
    });
  }, [lang, t.welcome]);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }

    window.addEventListener("open-assistant", handleOpen);

    return () => {
      window.removeEventListener("open-assistant", handleOpen);
    };
  }, []);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, loading, error]);

  function autoResizeTextarea() {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height = `${Math.min(
      textareaRef.current.scrollHeight,
      120
    )}px`;
  }

  useEffect(() => {
    autoResizeTextarea();
  }, [input]);

  useEffect(() => {
    if (!open) return;

    const timeout = window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 150);

    return () => window.clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!hotLead && !needsNextStep) return;

    setCtaPulse(true);

    const timeout = window.setTimeout(() => {
      setCtaPulse(false);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [hotLead, needsNextStep]);

  function normalizeText(text: string) {
    return text.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  }

  function detectNextStepIntent(text: string) {
    const normalized = normalizeText(text);

    return (
      normalized.includes("que hago") ||
      normalized.includes("que hago entonces") ||
      normalized.includes("como lo corrijo") ||
      normalized.includes("como puedo mejorarlo") ||
      normalized.includes("y ahora") ||
      normalized.includes("siguiente paso") ||
      normalized.includes("what do i do") ||
      normalized.includes("what now") ||
      normalized.includes("how do i fix it") ||
      normalized.includes("how can i improve it") ||
      normalized.includes("next step")
    );
  }

  function detectHotLead(text: string) {
    const normalized = normalizeText(text);

    return (
      normalized.includes("me interesa") ||
      normalized.includes("quiero verlo") ||
      normalized.includes("quiero mejorar") ||
      normalized.includes("quiero automatizar") ||
      normalized.includes("como lo hariamos") ||
      normalized.includes("reservar") ||
      normalized.includes("agendar") ||
      normalized.includes("lo hacemos manual") ||
      normalized.includes("tenemos todo manual") ||
      normalized.includes("perdemos mucho tiempo") ||
      normalized.includes("por whatsapp") ||
      normalized.includes("por redes sociales") ||
      normalized.includes("interested") ||
      normalized.includes("i want to see") ||
      normalized.includes("i want to improve") ||
      normalized.includes("i want to automate") ||
      normalized.includes("how would we") ||
      normalized.includes("book") ||
      normalized.includes("reserve") ||
      normalized.includes("schedule") ||
      normalized.includes("manual")
    );
  }

  function detectWarmLead(text: string) {
    const normalized = normalizeText(text);

    return (
      normalized.includes("no se") ||
      normalized.includes("no tengo claro") ||
      normalized.includes("me gustaria") ||
      normalized.includes("quiero analizar") ||
      normalized.includes("quiero mejorar") ||
      normalized.includes("want to improve") ||
      normalized.includes("i don't know") ||
      normalized.includes("not sure") ||
      normalized.includes("i would like") ||
      normalized.includes("i'd like")
    );
  }

  function detectLeadStage(text: string): "cold" | "warm" | "hot" {
    if (detectHotLead(text) || detectNextStepIntent(text)) return "hot";
    if (detectWarmLead(text)) return "warm";
    return "cold";
  }

  function shouldAssistantTriggerCTA(text: string) {
    const normalized = normalizeText(text);

    return (
      normalized.includes("boton de abajo") ||
      normalized.includes("button below") ||
      normalized.includes("reservar la llamada") ||
      normalized.includes("book the call") ||
      normalized.includes("verlo aplicado") ||
      normalized.includes("applied to your case") ||
      normalized.includes("margen claro") ||
      normalized.includes("clear room for optimization") ||
      normalized.includes("impacto rapido") ||
      normalized.includes("fast impact")
    );
  }

  useEffect(() => {
    if (leadStage === "cold") return;

    console.log("[Lead Stage]:", leadStage);
  }, [leadStage]);

  const shouldShowBookingButton = useMemo(() => {
    return hotLead || needsNextStep;
  }, [hotLead, needsNextStep]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const stage = detectLeadStage(text);
    const nextStepIntent = detectNextStepIntent(text);

    if (nextStepIntent) {
      setNeedsNextStep(true);
      setHotLead(true);
      setLeadStage("hot");
    } else if (stage === "hot") {
      setHotLead(true);
      setLeadStage("hot");
    } else if (stage === "warm") {
      setLeadStage((prev) => (prev === "hot" ? prev : "warm"));
    }

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError("");

    requestAnimationFrame(() => {
      autoResizeTextarea();
    });

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, lang }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Assistant request failed.");
      }

      const assistantReply = data?.reply || t.error;

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: assistantReply },
      ]);

      if (shouldAssistantTriggerCTA(assistantReply)) {
        setHotLead(true);
        setLeadStage("hot");
      }
    } catch {
      setError(t.error);
      setHotLead(true);
    } finally {
      setLoading(false);
    }
  }

  function resetAssistant() {
    setOpen(false);
    setInput("");
    setHasTyped(false);
    setLoading(false);
    setMessages([{ role: "assistant", content: t.welcome }]);
    setError("");
    setHotLead(false);
    setCtaPulse(false);
    setNeedsNextStep(false);
    setLeadStage("cold");
  }
    return (
    <>
      {open && (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm">
          <div className="absolute bottom-24 right-6 w-[390px] max-w-[calc(100vw-24px)] rounded-2xl bg-[#0a0614]/95 p-4 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
           <div className="mb-4 flex items-center justify-between">
  <div>
    <div className="text-[15px] font-semibold text-white">
      Gleam Peak AI Assistant
    </div>

    
  </div>

              <button
                type="button"
                onClick={resetAssistant}
                aria-label={t.closeLabel}
                className="rounded-full p-1 text-white/70 transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[400px] space-y-3 overflow-y-auto pr-1">
              {messages.map((message, index) => (
                <div
                  key={`${message.role}-${index}`}
                  className={
                    message.role === "user"
                      ? "ml-auto max-w-[84%] rounded-2xl bg-fuchsia-500/20 px-3.5 py-2.5 text-right text-sm leading-relaxed"
                      : "max-w-[84%] rounded-2xl bg-white/10 px-3.5 py-2.5 text-sm leading-relaxed text-white/90"
                  }
                >
                  {message.content.split("\n").map((line, lineIndex, arr) => (
                    <span key={lineIndex}>
                      {line}
                      {lineIndex < arr.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              ))}

              {loading && (
                <div className="max-w-[84%] animate-pulse rounded-2xl bg-white/10 px-3.5 py-2.5 text-[15px] text-white/60">
                  {t.thinking}
                </div>
              )}

              {error && (
                <div className="rounded-2xl bg-red-500/20 px-3.5 py-2.5 text-sm text-red-100">
                  {error}
                </div>
              )}
              

              <div ref={messagesEndRef} />
            </div>

            <div className="mt-4 flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (!hasTyped) setHasTyped(true);
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    void sendMessage();
                  }
                }}
                className="min-h-[44px] max-h-[120px] flex-1 resize-none overflow-y-auto rounded-xl bg-white/10 p-3 text-[16px] text-white outline-none ring-1 ring-white/10 placeholder:text-white/35 focus:ring-white/30"
                placeholder={hasTyped ? "" : t.placeholder}
                rows={1}
              />

              <button
                type="button"
                onClick={() => void sendMessage()}
                disabled={!input.trim() || loading}
                aria-label={t.sendLabel}
                className="rounded-xl bg-white px-3 py-3 text-black transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            {shouldShowBookingButton && bookingUrl && bookingUrl !== "#" && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                aria-label={
                  needsNextStep
                    ? t.ctaNextStep
                    : hotLead
                      ? t.ctaHot
                      : t.ctaDefault
                }
                className={`mt-4 block rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-black transition-all duration-500 hover:opacity-90 ${
                  ctaPulse
                    ? "translate-y-3 opacity-0 animate-[fadeInUp_0.6s_ease-out_forwards]"
                    : ""
                } ${hotLead || needsNextStep ? "shadow-lg ring-1 ring-white/20" : ""}`}
              >
                {needsNextStep
                  ? t.ctaNextStep
                  : hotLead
                    ? t.ctaHot
                    : t.ctaDefault}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}