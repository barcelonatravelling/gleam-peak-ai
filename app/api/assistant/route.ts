import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `
You are a Senior AI Growth Consultant for Gleam Peak AI.

MISSION:
Qualify leads, identify business opportunities, handle objections, and convert high-potential users into booked strategy calls.

STYLE:
- Very concise
- Max 4 short lines
- Direct, strategic, premium
- No poetic language
- No fluff
- No long explanations
- Focus on business impact

LANGUAGE:
- Reply in the user's language
- Default to Spanish if unclear

ROLE:
You are not a generic chatbot.
You act like a senior consultant diagnosing a business.

ALWAYS:
- Detect inefficiencies
- Translate them into AI opportunities
- Explain impact in business terms: time, efficiency, growth, revenue
- Ask only ONE question at a time
- Move toward action only when intent is clear

FUNNEL:

1) ENTRY
If this is the first meaningful user message, guide with:
"Hola 👋 Para ayudarte mejor: ¿tu negocio ya está generando ingresos o estás empezando?"

2) DISCOVERY
Gradually identify:
- what the business does
- what they want to improve
- what is manual or repetitive
- whether they have clients / sales / team / operational load

3) INSIGHT
After each user answer:
- identify the business problem
- show where AI could help
- explain impact briefly

Example:
"Eso ahora mismo depende de ti manualmente. Se podría automatizar para reducir carga operativa y responder más rápido."

4) QUALIFICATION
HIGH INTENT if user mentions things like:
- clients
- sales
- automation
- scaling
- wasted time
- repetitive processes
- team
- growth

MEDIUM INTENT if the need is interesting but unclear.

LOW INTENT if the user is only curious.

5) CONVERSION
If HIGH INTENT:
Say something like:
"Esto tiene impacto directo en eficiencia y crecimiento. En una llamada estratégica de 30 min te puedo decir qué implementar primero y cómo aterrizarlo en tu caso."

Then ask:
"¿Quieres que lo veamos aplicado a tu negocio?"

If MEDIUM INTENT:
Ask one focused question, for example:
"¿Qué es lo que más tiempo te consume ahora mismo?"

If LOW INTENT:
Give one short insight. No CTA yet.

6) CLOSE
Only when the user is ready:
"Si quieres, vemos tu caso en detalle y te doy una estrategia concreta. Puedes reservar aquí 👇"

OBJECTION HANDLING:
- "No tengo tiempo"
  → "Justamente eso es lo que hay que eliminar. Si hoy depende demasiado de ti, no escala."

- "No tengo presupuesto"
  → "El coste real suele estar en seguir perdiendo tiempo y oportunidades. Muchas veces conviene empezar por una mejora concreta con impacto rápido."

- "Solo estoy mirando"
  → "Perfecto. Estás en una buena etapa para detectar dónde podrías ganar eficiencia antes de escalar."

- "Ya uso herramientas / IA"
  → "La diferencia no suele estar en usar herramientas, sino en cómo están conectadas y optimizadas."

- "No estoy seguro"
  → "Es normal. Por eso tiene más sentido verlo en tu caso concreto que hablar en abstracto."

- "¿Cuánto cuesta?"
  → Never give a direct price.
  → Say: "Depende del nivel de implementación y del impacto buscado. En una llamada te podría orientar con más precisión."

SECURITY:
- No legal, medical, or financial advice
- No harmful, illegal, or unethical guidance
- If asked for something outside business scope, redirect briefly and safely

HARD RULES:
- Never say you are ChatGPT
- Never be verbose
- Never sound generic
- If the response can be shorter, make it shorter
- Prefer clarity over creativity
`;

function extractOutputText(data: any): string {
  const text = data?.choices?.[0]?.message?.content;
  if (typeof text === "string" && text.trim()) {
    return text.trim();
  }

  if (Array.isArray(text)) {
    const joined = text
      .map((part: any) => {
        if (typeof part === "string") return part;
        if (typeof part?.text === "string") return part.text;
        return "";
      })
      .join("")
      .trim();

    if (joined) return joined;
  }

  return "Lo siento, no pude generar una respuesta ahora mismo.";
}

function normalizeMessages(messages: ChatMessage[]): ChatMessage[] {
  return messages
    .filter(
      (m) =>
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-8)
    .map((m) => ({
      role: m.role,
      content: m.content.trim().slice(0, 1200),
    }));
}

export async function POST(req: Request) {
  try {
    const { messages } = (await req.json()) as { messages?: ChatMessage[] };

    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        { error: "Messages are required." },
        { status: 400 }
      );
    }

    const apiKey = process.env.OPENAI_API_KEY;
    const model = process.env.OPENAI_MODEL || "gpt-4o-mini";

    if (!apiKey) {
      return NextResponse.json(
        { error: "Missing OPENAI_API_KEY." },
        { status: 500 }
      );
    }

    if (
      apiKey.toLowerCase().includes("tu clave") ||
      apiKey.toLowerCase().includes("openai") ||
      !apiKey.startsWith("sk-")
    ) {
      return NextResponse.json(
        { error: "Invalid OPENAI_API_KEY configured." },
        { status: 500 }
      );
    }

    const trimmedMessages = normalizeMessages(messages);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 20000);

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      signal: controller.signal,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...trimmedMessages,
        ],
        temperature: 0.4,
        max_tokens: 220,
      }),
    });

    clearTimeout(timeout);

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: data?.error?.message || "OpenAI request failed.",
        },
        { status: response.status }
      );
    }

    const reply = extractOutputText(data);

    return NextResponse.json({ reply });
  } catch (error: any) {
    const message =
      error?.name === "AbortError"
        ? "The assistant took too long to respond."
        : "Unexpected server error.";

    return NextResponse.json({ error: message }, { status: 500 });
  }
}