"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { ArrowRight, Bot, Send, X } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type AssistantChatProps = {
  bookingUrl: string;
};

const WELCOME_MESSAGE: ChatMessage = {
  role: "assistant",
  content:
    "Hola, soy el asistente estratégico de Gleam Peak AI. Puedo ayudarte a detectar dónde la inteligencia artificial puede aumentar eficiencia, automatizar operaciones y desbloquear oportunidades de crecimiento en tu empresa. Cuéntame brevemente a qué te dedicas y qué te gustaría mejorar.",
};

export default function AssistantChat({ bookingUrl }: AssistantChatProps) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [error, setError] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);

  const canSend = useMemo(
    () => input.trim().length > 0 && !loading,
    [input, loading]
  );

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, loading]);

  useEffect(() => {
    if (open) {
      const timeout = setTimeout(() => {
        textareaRef.current?.focus();
      }, 150);
      return () => clearTimeout(timeout);
    }
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

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply },
      ]);
    } catch (err: any) {
      setError(
        err?.message ||
          "El asistente no pudo responder ahora mismo. Inténtalo de nuevo en unos segundos."
      );
    } finally {
      setLoading(false);
    }
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    void sendMessage();
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  }

  const bookingHref =
    bookingUrl && bookingUrl !== "#" ? bookingUrl : "mailto:info@gleampeak.ai";

  const fullConversation = messages
    .map((m) => m.content.toLowerCase())
    .join(" ");

  const isHotLead =
    fullConversation.includes("automatizar") ||
    fullConversation.includes("automatización") ||
    fullConversation.includes("automation") ||
    fullConversation.includes("ventas") ||
    fullConversation.includes("sales") ||
    fullConversation.includes("clientes") ||
    fullConversation.includes("customers") ||
    fullConversation.includes("leads") ||
    fullConversation.includes("escalar") ||
    fullConversation.includes("scale") ||
    fullConversation.includes("crecer") ||
    fullConversation.includes("growth") ||
    fullConversation.includes("equipo") ||
    fullConversation.includes("team") ||
    fullConversation.includes("ahorrar tiempo") ||
    fullConversation.includes("save time");

  const ctaText = fullConversation.includes("ventas") || fullConversation.includes("sales")
    ? "Ver cómo aumentar ventas con IA"
    : fullConversation.includes("clientes") || fullConversation.includes("customers")
    ? "Ver cómo atender más clientes con IA"
    : fullConversation.includes("automatizar") || fullConversation.includes("automation")
    ? "Ver qué automatizar con IA"
    : "Ver cómo escalar mi negocio con IA";

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-[9999] inline-flex items-center gap-3 rounded-full border border-fuchsia-300/20 bg-[#11061d]/95 px-5 py-3 text-white shadow-[0_18px_40px_rgba(65,20,120,0.35)] backdrop-blur-xl transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/35"
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
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`max-w-[88%] rounded-2xl px-4 py-3 text-sm leading-7 ${
                      message.role === "assistant"
                        ? "border border-white/10 bg-white/[0.04] text-white/85"
                        : "ml-auto bg-fuchsia-500/15 text-white"
                    }`}
                  >
                    {message.content}
                  </div>
                ))}

                {loading ? (
                  <div className="max-w-[88%] rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white/65">
                    Pensando…
                  </div>
                ) : null}

                {error ? (
                  <div className="rounded-2xl border border-red-400/20 bg-red-500/10 px-4 py-3 text-sm text-red-100">
                    {error}
                  </div>
                ) : null}

                {isHotLead ? (
                  <div className="rounded-2xl border border-fuchsia-300/10 bg-white/[0.03] px-4 py-4">
                    <p className="text-sm leading-6 text-white/75">
                      Esto parece un caso con potencial real para IA. Si quieres,
                      lo vemos aplicado a tu negocio en una sesión estratégica.
                    </p>

                    <div className="mt-3 flex gap-3">
                      <a
                        href={bookingHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl bg-white px-4 py-3 text-sm font-semibold text-[#12041e] transition hover:scale-[1.01]"
                      >
                        <ArrowRight className="h-4 w-4" />
                        {ctaText}
                      </a>
                    </div>

                    <p className="mt-2 text-xs leading-5 text-white/40">
                      Sesión estratégica de 30 min · Sin compromiso
                    </p>
                  </div>
                ) : null}

                <div ref={messagesEndRef} />
              </div>
            </div>

            <div className="border-t border-white/10 px-4 py-4">
              <form onSubmit={onSubmit} className="flex items-end gap-3">
                <textarea
                  ref={textareaRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  rows={2}
                  placeholder="Cuéntame brevemente tu negocio y qué te gustaría mejorar o automatizar..."
                  className="min-h-[52px] flex-1 resize-none rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white outline-none placeholder:text-white/30"
                />
                <button
                  type="submit"
                  disabled={!canSend}
                  className="inline-flex h-[52px] w-[52px] items-center justify-center rounded-2xl bg-fuchsia-500/90 text-white transition hover:bg-fuchsia-400 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>

              <p className="mt-3 text-xs leading-5 text-white/40">
                Press Enter to send · Shift + Enter for a new line
              </p>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}