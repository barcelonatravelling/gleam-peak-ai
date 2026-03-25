"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Bot, Send, X } from "lucide-react";

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
    "Hola 👋 ¿Qué área de tu empresa te gustaría optimizar o escalar ahora mismo?",
};

export default function AssistantChat({ bookingUrl }: AssistantChatProps) {
  const [open, setOpen] = useState(false);
  useEffect(() => {
  function handleOpen() {
    setOpen(true);
  }

  window.addEventListener("open-assistant", handleOpen);

  return () => {
    window.removeEventListener("open-assistant", handleOpen);
  };
}, []);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([WELCOME_MESSAGE]);
  const [error, setError] = useState("");

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

  function renderMessageContent(content: string) {
    const parts = content.split(/(https?:\/\/[^\s]+)/g);

    return parts.map((part, index) => {
      const isUrl = /^https?:\/\/[^\s]+$/.test(part);

      if (isUrl) {
        return (
          <a
            key={index}
            href={part}
            target="_blank"
            rel="noreferrer"
            className="underline break-all text-white"
          >
            {part}
          </a>
        );
      }

      return <span key={index}>{part}</span>;
    });
  }

  const canSend = useMemo(() => {
    return input.trim().length > 0 && !loading;
  }, [input, loading]);

  useEffect(() => {
    if (open) {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, open, loading]);

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

  return (
    <>
      {open && (
        <div className="fixed inset-0 z-[9999] bg-black/40 backdrop-blur-sm">
          <div className="absolute bottom-24 right-6 w-[400px] max-w-[calc(100vw-24px)] rounded-2xl bg-[#0a0614] p-4 text-white shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <div className="font-medium">Gleam Peak AI</div>
              <button
                onClick={() => setOpen(false)}
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
                <div className="max-w-[85%] rounded-2xl bg-white/10 px-4 py-3 text-white/70">
                  Pensando…
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
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                rows={2}
                placeholder="¿Qué área de tu empresa quieres optimizar o escalar?"
                className="min-h-[52px] flex-1 resize-none rounded-xl bg-white/10 p-3 text-white placeholder:text-white/40 outline-none"
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

            {bookingUrl && bookingUrl !== "#" && (
              <a
                href={bookingUrl}
                target="_blank"
                rel="noreferrer"
                className="mt-3 block text-center text-sm text-white/70 underline hover:text-white"
              >
                Reservar llamada
              </a>
            )}
          </div>
        </div>
      )}
    </>
  );
}