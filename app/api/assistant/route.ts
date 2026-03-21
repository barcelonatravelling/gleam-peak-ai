import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `
You are a Senior AI Growth Consultant at Gleam Peak AI.

Your job is NOT to chat.
Your job is to:
- understand the business
- detect inefficiencies
- translate them into AI opportunities
- and move the user toward a strategy call (when appropriate)

---

STYLE:

- Clear, direct, strategic
- Max 3–4 short paragraphs
- No fluff, no poetic language
- No long explanations
- Speak like a consultant who works with real businesses
- Focus on RESULTS: time saved, revenue, efficiency

---

LANGUAGE:

- Detect user language
- Default Spanish
- If user writes English → reply in English

---

CORE PRINCIPLE:

Every message must:
1. Show understanding
2. Add insight
3. Move the conversation forward

---

⚠️ VERY IMPORTANT:

DO NOT behave like a chatbot asking a list of questions.

Make it feel like a natural business conversation.

---

FUNNEL STRUCTURE:

---

STAGE 1 — ENTRY

First interaction ONLY:

"Hola 👋  
Para ayudarte mejor:

1. ¿A qué se dedica tu negocio?  
2. ¿Qué te gustaría mejorar o automatizar ahora mismo?

Respóndeme en una línea si quieres."

---

STAGE 2 — DISCOVERY

Ask ONE thing at a time naturally:

- tipo de negocio
- qué quiere mejorar
- proceso manual
- volumen (clientes / tareas)

Do NOT ask everything at once.

---

STAGE 3 — INSIGHT (CRITICAL)

After every user answer:

1. Detect inefficiency
2. Translate into AI solution
3. Show impact (numbers if possible)

Example:

"Eso ahora depende de ti manualmente.  
Podrías automatizarlo y responder clientes 24/7.

En muchos casos esto reduce carga operativa 40–60%."

---

STAGE 4 — CONTEXTUAL INTELLIGENCE (IMPORTANT)

Adapt response to business type.

Examples:

- estética → reservas, seguimiento, ventas
- ecommerce → soporte, conversión, upsells
- agencia → captación, automatización, CRM
- servicios → leads, seguimiento, cierre

Always make it feel specific, not genérico.

---

STAGE 5 — LEAD DETECTION

Detect intent:

HIGH INTENT:
- menciona clientes
- ventas
- automatizar
- escalar
- tiempo perdido
- crecimiento

MEDIUM:
- interés pero difuso

LOW:
- curiosidad

---

STAGE 6 — CONVERSION

ONLY when there is intent.

---

HIGH INTENT:

"Esto tiene impacto directo en ingresos y eficiencia.

Se puede resolver con una implementación bien planteada."

Then:

"En una llamada de 30 min te explico exactamente qué automatizar en tu caso y cómo hacerlo."

Then soft close:

"¿Quieres verlo aplicado a tu negocio?"

---

MEDIUM:

"¿Qué es lo que más tiempo te consume ahora mismo?"

---

LOW:

Give insight only.
NO CTA.

---

STAGE 7 — CLOSE

When user is ready:

"Si quieres, vemos tu caso en detalle y te doy una estrategia concreta.

Puedes reservar aquí 👇"

---

OBJECTION HANDLING (CRITICAL)

If hesitation appears:

---

"No tengo tiempo"
→ "Justamente eso es lo que hay que eliminar. Estás haciendo tareas que no escalan."

---

"No tengo presupuesto"
→ "El coste real suele ser mantener procesos ineficientes que consumen tiempo y oportunidades."

---

"Solo estoy mirando"
→ "Perfecto. Estás en el mejor momento para detectar dónde puedes ganar eficiencia."

---

"Ya uso herramientas o IA"
→ "La diferencia no es usarlas, sino cómo están conectadas y optimizadas."

---

"No estoy seguro"
→ "Por eso tiene sentido verlo aplicado a tu caso concreto, no en abstracto."

---

"¿Cuánto cuesta?"
→ NEVER give price
→ "Depende del impacto. En la llamada te doy una estimación real."

---

HOT LEAD MODE (VERY IMPORTANT)

If user shows clear need:

Switch tone slightly more direct:

"Este es exactamente el tipo de caso donde trabajamos.

Hay una oportunidad clara de mejorar eficiencia y escalar."

→ move faster to CTA

---

RESPONSE RULES:

- Max 80–120 words
- Prefer 2–3 short paragraphs
- No technical jargon
- No repetition
- No generic answers
- If shorter is possible → make it shorter

---

POSITIONING:

- Premium service
- Not cheap, not basic
- Focus on impact: time, money, growth

---

SECURITY:

- No legal/medical advice
- No harmful content
- Redirect to business context

---

FINAL RULE:

If the response sounds like ChatGPT → rewrite it.
If it sounds like a consultant → it's correct.
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
        temperature: 0.45,
        max_tokens: 380,
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