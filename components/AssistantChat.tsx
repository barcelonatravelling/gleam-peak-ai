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
    placeholder: "¿Qué área de tu empresa quieres optimizar?",
    thinking: "Pensando...",
    error: "El asistente no pudo responder.",
    bookNow: "Reservar llamada ahora",
    bookStrategic: "Reservar llamada estratégica",
  },
  en: {
    welcome: "Hi 👋 What does your company do?",
    placeholder: "Which area of your business do you want to optimize?",
    thinking: "Thinking...",
    error: "The assistant could not respond.",
    bookNow: "Book a call now",
    bookStrategic: "Book a strategic call",
  },
} as const;

export default function AssistantChat({ bookingUrl, lang }: AssistantChatProps) {
  const t = translations[lang];
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: "assistant", content: t.welcome },
  ]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (messages.length === 1 && messages[0].role === "assistant") {
      setMessages([{ role: "assistant", content: t.welcome }]);
    }
  }, [lang]);

  // 🔥 Lead logic
  const [hotLead, setHotLead] = useState(false);
  const [ctaPulse, setCtaPulse] = useState(false);
  const [leadStage, setLeadStage] = useState<"cold" | "warm" | "hot">("cold");

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  // ----------------------------
  // OPEN EVENT
  // ----------------------------
  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }

    window.addEventListener("open-assistant", handleOpen);
    return () => window.removeEventListener("open-assistant", handleOpen);
  }, []);

  // ----------------------------
  // AUTO SCROLL
  // ----------------------------
  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, loading]);

  // ----------------------------
  // AUTO RESIZE TEXTAREA
  // ----------------------------
  function autoResizeTextarea() {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }

  useEffect(() => {
    autoResizeTextarea();
  }, [input]);

  // ----------------------------
  // FOCUS INPUT
  // ----------------------------
  useEffect(() => {
    if (!open) return;

    const timeout = setTimeout(() => {
      textareaRef.current?.focus();
    }, 150);

    return () => clearTimeout(timeout);
  }, [open]);

  // ----------------------------
  // CTA PULSE (solo 3s)
  // ----------------------------
  useEffect(() => {
    if (!hotLead) return;

    setCtaPulse(true);
    const timeout = setTimeout(() => setCtaPulse(false), 3000);

    return () => clearTimeout(timeout);
  }, [hotLead]);

  // ----------------------------
  // LEAD DETECTION
  // ----------------------------
  function detectHotLead(text: string) {
    const normalized = text.toLowerCase();

    return (
      normalized.includes("me interesa") ||
      normalized.includes("quiero") ||
      normalized.includes("cómo lo haríamos") ||
      normalized.includes("como lo hariamos") ||
      normalized.includes("reservar") ||
      normalized.includes("agendar") ||
      normalized.includes("interested") ||
      normalized.includes("i want") ||
      normalized.includes("how would we") ||
      normalized.includes("book") ||
      normalized.includes("reserve") ||
      normalized.includes("schedule")
    );
  }

  function detectWarmLead(text: string) {
    const normalized = text.toLowerCase();

    return (
      normalized.includes("quiero mejorar") ||
      normalized.includes("no sé") ||
      normalized.includes("no se") ||
      normalized.includes("me gustaría") ||
      normalized.includes("me gustaria") ||
      normalized.includes("want to improve") ||
      normalized.includes("i don't know") ||
      normalized.includes("not sure") ||
      normalized.includes("i would like") ||
      normalized.includes("i'd like")
    );
  }

  function detectLeadStage(text: string): "cold" | "warm" | "hot" {
    if (detectHotLead(text)) return "hot";
    if (detectWarmLead(text)) return "warm";
    return "cold";
  }

  function shouldAssistantTriggerCTA(text: string) {
    const normalized = text.toLowerCase();

    return (
      normalized.includes("tiene sentido verlo") ||
      normalized.includes("encaja con lo que") ||
      normalized.includes("verlo aplicado") ||
      normalized.includes("makes sense to see") ||
      normalized.includes("fits with what") ||
      normalized.includes("see it applied")
    );
  }

  // ----------------------------
  // LEAD LOGGING (interno)
  // ----------------------------
  useEffect(() => {
    if (leadStage === "cold") return;
    console.log("[Lead Stage]:", leadStage);
  }, [leadStage]);

  // ----------------------------
  // CTA VISIBILITY
  // ----------------------------
  const shouldShowBookingButton = useMemo(() => {
    if (hotLead) return true;
    if (messages.length >= 4) return true;
    return false;
  }, [hotLead, messages]);

  // ----------------------------
  // SEND MESSAGE
  // ----------------------------
  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    const nextMessages: ChatMessage[] = [
  ...messages,
  { role: "user", content: text },
];
    setMessages(nextMessages);
    setInput("");
    setLoading(true);
    setError("");

    // detectar lead usuario
    const stage = detectLeadStage(text);

    if (stage === "warm") {
      setLeadStage((prev) => (prev === "hot" ? prev : "warm"));
    }

    if (stage === "hot") {
      setLeadStage("hot");
      setHotLead(true);
    }

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages, lang }),
      });

      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);

      // detectar lead assistant
      if (shouldAssistantTriggerCTA(data.reply)) {
        setLeadStage("hot");
        setHotLead(true);
      }
    } catch {
      setError(t.error);
    } finally {
      setLoading(false);
    }
  }

  // ----------------------------
  // RESET
  // ----------------------------
  function resetAssistant() {
    setOpen(false);
    setInput("");
    setHasTyped(false);
    setLoading(false);
    setMessages([{ role: "assistant", content: t.welcome }]);
    setError("");
    setHotLead(false);
    setCtaPulse(false);
    setLeadStage("cold");
  }

  // ----------------------------
  // RENDER
  // ----------------------------
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm">
          <div className="absolute bottom-24 right-6 w-[400px] rounded-2xl bg-[#0a0614] p-4 text-white shadow-2xl">
            
            {/* HEADER */}
            <div className="mb-4 flex justify-between">
              <div>Gleam Peak AI</div>
              <button onClick={resetAssistant}>
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* MESSAGES */}
            <div className="max-h-[400px] space-y-3 overflow-y-auto pr-1">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-auto bg-fuchsia-500/20 px-4 py-3 rounded-2xl text-right"
                      : "bg-white/10 px-4 py-3 rounded-2xl"
                  }
                >
                  {m.content.split("\n").map((line, i) => (
                    <span key={i}>
                      {line}
                      <br />
                    </span>
                  ))}
                </div>
              ))}

              {loading && <div className="text-white/60">{t.thinking}</div>}
              <div ref={messagesEndRef} />
            </div>

            {/* INPUT */}
            <div className="mt-4 flex gap-2">
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
                    sendMessage();
                  }
                }}
                className="flex-1 rounded-xl bg-white/10 p-3"
                placeholder={hasTyped ? "" : t.placeholder}
              />
              <button onClick={sendMessage}>
                <Send />
              </button>
            </div>

            {/* CTA */}
            {shouldShowBookingButton && (
              <a
                href={bookingUrl}
                target="_blank"
                className={`mt-4 block text-center px-4 py-3 rounded-xl bg-white text-black transition-all duration-500
                ${ctaPulse ? "opacity-0 translate-y-3 animate-[fadeInUp_0.6s_ease-out_forwards]" : ""}
                ${hotLead ? "shadow-lg ring-1 ring-white/20 font-semibold" : ""}
                `}
              >
                {hotLead ? t.bookNow : t.bookStrategic}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}