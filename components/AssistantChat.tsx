  "use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Send, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type AssistantChatProps = {
  bookingUrl: string;
};

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content: "Hola 👋 ¿A qué se dedica tu empresa?",
};

export default function AssistantChat({ bookingUrl }: AssistantChatProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [hasTyped, setHasTyped] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [error, setError] = useState("");
  const [hotLead, setHotLead] = useState(false);
  const [ctaPulse, setCtaPulse] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  useEffect(() => {
    function handleOpen() {
      setOpen(true);
    }

    window.addEventListener("open-assistant", handleOpen);
    return () => {
      window.removeEventListener("open-assistant", handleOpen);
    };
  }, []);

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
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

  useEffect(() => {
    if (!open) return;

    const timeout = window.setTimeout(() => {
      textareaRef.current?.focus();
    }, 150);

    return () => window.clearTimeout(timeout);
  }, [open]);

  function renderMessageContent(content: string) {
    return content.split("\n").map((line, index, arr) => (
      <span key={`${line}-${index}`}>
        {line}
        {index < arr.length - 1 && <br />}
      </span>
    ));
  }

  function detectHotLead(text: string) {
    const normalized = text.toLowerCase();

    return (
      normalized.includes("me interesa") ||
      normalized.includes("quiero verlo") ||
      normalized.includes("cómo lo haríamos") ||
      normalized.includes("quiero mejorar") ||
      normalized.includes("quiero automatizar") ||
      normalized.includes("lo hacemos manual") ||
      normalized.includes("tenemos todo manual") ||
      normalized.includes("perdemos mucho tiempo") ||
      normalized.includes("por whatsapp") ||
      normalized.includes("por redes sociales") ||
      normalized.includes("no sé qué mejorar") ||
      normalized.includes("no se qué mejorar") ||
      normalized.includes("no se que mejorar")
    );
  }

  function shouldAssistantTriggerCTA(text: string) {
    const normalized = text.toLowerCase();

    return (
      normalized.includes("verlo aplicado a tu caso") ||
      normalized.includes("encaja bastante con lo que solemos optimizar") ||
      normalized.includes("merece la pena verlo") ||
      normalized.includes("puedes reservar una llamada") ||
      normalized.includes("esto es justo donde solemos intervenir")
    );
  }

  const canSend = useMemo(() => {
    return input.trim().length > 0 && !loading;
  }, [input, loading]);

  const shouldShowBookingButton = useMemo(() => {
    if (hotLead) return true;

    return messages.some((message) => {
      const text = message.content.toLowerCase();

      if (message.role === "assistant") {
        return shouldAssistantTriggerCTA(text);
      }

      if (message.role === "user") {
        return detectHotLead(text);
      }

      return false;
    });
  }, [hotLead, messages]);

  useEffect(() => {
    if (!shouldShowBookingButton) return;

    setCtaPulse(true);
    const timeout = window.setTimeout(() => {
      setCtaPulse(false);
    }, 3000);

    return () => window.clearTimeout(timeout);
  }, [shouldShowBookingButton]);

  async function sendMessage() {
    const text = input.trim();
    if (!text || loading) return;

    if (detectHotLead(text)) {
      setHotLead(true);
    }

    const nextMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: text },
    ];

    setMessages(nextMessages);
    setInput("");
    requestAnimationFrame(() => {
      autoResizeTextarea();
    });
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/assistant", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ messages: nextMessages }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data?.error || "Assistant request failed.");
      }

      if (shouldAssistantTriggerCTA(data.reply)) {
        setHotLead(true);
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch {
      setError("El asistente no pudo responder. Intenta nuevamente.");
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    void sendMessage();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  }

  function resetAssistant() {
    setOpen(false);
    setInput("");
    setHasTyped(false);
    setLoading(false);
    setMessages([WELCOME_MESSAGE]);
    setError("");
    setHotLead(false);
    setCtaPulse(false);
  }

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm">
          <div className="absolute bottom-24 right-6 w-[400px] max-w-[calc(100vw-24px)] rounded-2xl bg-[#0a0614] p-4 text-white shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-medium">Gleam Peak AI</div>
              <button
                onClick={resetAssistant}
                aria-label="Cerrar asistente"
                className="rounded-full p-1 text-white/80 hover:bg-white/10 hover:text-white"
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
                      ? "ml-auto max-w-[85%] rounded-2xl bg-fuchsia-500/20 px-4 py-3 text-right"
                      : "max-w-[85%] rounded-2xl bg-white/10 px-4 py-3"
                  }
                >
                  {renderMessageContent(message.content)}
                </div>
              ))}

              {loading && (
                <div className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-3 text-white/70 animate-pulse">
                  Pensando...
                </div>
              )}

              {error && (
                <div className="rounded-2xl bg-red-500/20 px-4 py-3 text-red-100">
                  {error}
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={onSubmit} className="mt-4 flex items-end gap-2">
              <textarea
                ref={textareaRef}
                value={input}
                onChange={(e) => {
                  setInput(e.target.value);
                  if (!hasTyped) setHasTyped(true);
                }}
                onKeyDown={handleKeyDown}
                rows={1}
                placeholder={hasTyped ? "" : "Escribe tu mensaje..."}
                className="min-h-[52px] max-h-[140px] flex-1 resize-none overflow-y-auto rounded-xl bg-white/10 p-3 text-white placeholder:text-white/40 outline-none"
              />
              <button
                type="submit"
                disabled={!canSend}
                className="rounded-xl bg-white px-3 py-3 text-black disabled:opacity-50"
                aria-label="Enviar mensaje"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>

            {bookingUrl && bookingUrl !== "#" && shouldShowBookingButton && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className={`mt-4 block rounded-xl bg-white px-4 py-3 text-center text-sm text-black transition hover:opacity-90 ${
                  hotLead ? "font-semibold shadow-lg" : "font-medium"
                } ${ctaPulse ? "animate-pulse" : ""}`}
              >
                {hotLead
                  ? "Reservar llamada ahora"
                  : "Reservar llamada estratégica"}
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}