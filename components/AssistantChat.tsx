"use client";

import { useEffect, useRef, useState } from "react";
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
    welcome: "Hola, soy el asistente de Gleam Peak. ¿Quieres saber cómo funciona Trust Gateway o tienes un caso concreto en mente?",
    placeholder: "Escribe tu mensaje...",
    thinking: "Analizando...",
    error:
      "No he podido responder ahora mismo. Inténtalo de nuevo o escríbenos a hello@gleampeak.ai.",
    ctaDefault: "Hablar con el equipo",
    closeLabel: "Cerrar asistente",
    sendLabel: "Enviar mensaje",
    notice: "Asistente automático. Los mensajes se procesan con OpenAI; no compartas datos sensibles.",
  },
  en: {
    welcome: "Hi, I'm the Gleam Peak assistant. Would you like to know how Trust Gateway works, or do you have a specific use case in mind?",
    placeholder: "Write your message...",
    thinking: "Analyzing...",
    error:
      "I couldn't answer right now. Please try again or write to hello@gleampeak.ai.",
    ctaDefault: "Talk to the team",
    closeLabel: "Close assistant",
    sendLabel: "Send message",
    notice: "Automated assistant. Messages are processed with OpenAI; do not share sensitive data.",
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
  }
    return (
    <>
      {open && (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm">
          <div className="absolute bottom-20 right-3 w-[390px] max-w-[calc(100vw-24px)] sm:bottom-24 sm:right-6 rounded-2xl bg-[#0a0614]/95 p-4 text-white shadow-2xl ring-1 ring-white/10 backdrop-blur-xl">
           <div className="mb-4 flex items-center justify-between">
  <div>
    <div className="text-[15px] font-semibold text-white">
      {lang === "es" ? "Asistente de Gleam Peak AI" : "Gleam Peak AI Assistant"}
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

            <p className="mt-2 text-[11px] leading-snug text-white/45">{t.notice}</p>

            {messages.length > 2 && (
              <a
                href={bookingUrl && bookingUrl !== "#" ? bookingUrl : "/hablemos"}
                target={bookingUrl && bookingUrl !== "#" ? "_blank" : undefined}
                rel="noreferrer"
                className="mt-4 block rounded-xl bg-white px-4 py-3 text-center text-sm font-medium text-black transition hover:opacity-90"
              >
                {t.ctaDefault}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}