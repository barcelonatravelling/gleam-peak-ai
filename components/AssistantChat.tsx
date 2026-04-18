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
    thinking: "Pensando...",
    error: "El asistente no pudo responder.",
    bookNow: "Reservar llamada ahora",
    bookStrategic: "Reservar llamada estratégica",
  },
  en: {
    welcome: "Hi 👋 What does your company do?",
    placeholder: "Write your message...",
    thinking: "Thinking...",
    error: "The assistant could not respond.",
    bookNow: "Book a call now",
    bookStrategic: "Book a strategic call",
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
    return () => window.removeEventListener("open-assistant", handleOpen);
  }, []);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, loading]);

  function autoResizeTextarea() {
    if (!textareaRef.current) return;

    textareaRef.current.style.height = "0px";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }

  useEffect(() => {
    autoResizeTextarea();
  }, [input]);

  useEffect(() => {
    if (!open) return;

    const timeout = setTimeout(() => {
      textareaRef.current?.focus();
    }, 150);

    return () => clearTimeout(timeout);
  }, [open]);

  useEffect(() => {
    if (!hotLead) return;

    setCtaPulse(true);
    const timeout = setTimeout(() => setCtaPulse(false), 3000);

    return () => clearTimeout(timeout);
  }, [hotLead]);

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
      normalized.includes("aligns closely with what we optimize") ||
      normalized.includes("fits with what") ||
      normalized.includes("see it applied")
    );
  }

  useEffect(() => {
    if (leadStage === "cold") return;
    console.log("[Lead Stage]:", leadStage);
  }, [leadStage]);

  const shouldShowBookingButton = useMemo(() => {
    return hotLead;
  }, [hotLead]);

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

      if (!res.ok) {
        throw new Error(data?.error || "Assistant request failed.");
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);

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

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm">
          <div className="absolute bottom-24 right-6 w-[400px] rounded-2xl bg-[#0a0614] p-4 text-white shadow-2xl">
            <div className="mb-4 flex justify-between">
              <div>Gleam Peak AI</div>
              <button onClick={resetAssistant} aria-label="Close assistant">
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="max-h-[400px] space-y-3 overflow-y-auto pr-1">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={
                    m.role === "user"
                      ? "ml-auto rounded-2xl bg-fuchsia-500/20 px-4 py-3 text-right"
                      : "rounded-2xl bg-white/10 px-4 py-3"
                  }
                >
                  {m.content.split("\n").map((line, lineIndex, arr) => (
                    <span key={lineIndex}>
                      {line}
                      {lineIndex < arr.length - 1 && <br />}
                    </span>
                  ))}
                </div>
              ))}

              {loading && (
                <div className="text-white/60">{t.thinking}</div>
              )}

              {error && (
                <div className="rounded-2xl bg-red-500/20 px-4 py-3 text-red-100">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

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
                    void sendMessage();
                  }
                }}
                className="flex-1 rounded-xl bg-white/10 p-3 text-white outline-none placeholder:text-white/50"
                placeholder={hasTyped ? "" : t.placeholder}
                rows={1}
              />
              <button
                onClick={() => void sendMessage()}
                aria-label="Send message"
                className="rounded-xl bg-white px-3 py-3 text-black"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>

            {shouldShowBookingButton && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className={`mt-4 block rounded-xl bg-white px-4 py-3 text-center text-black transition-all duration-500 ${
                  ctaPulse
                    ? "opacity-0 translate-y-3 animate-[fadeInUp_0.6s_ease-out_forwards]"
                    : ""
                } ${hotLead ? "font-semibold shadow-lg ring-1 ring-white/20" : ""}`}
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