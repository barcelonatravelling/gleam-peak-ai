import { NextResponse } from "next/server";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

const SYSTEM_PROMPT = `
You are a senior AI consultant for Gleam Peak AI.

GOAL:
Understand the user's business, detect improvement opportunities, explain them clearly, and guide the conversation naturally toward a strategic solution.

STYLE:
- Very concise
- Natural and human
- No robotic tone
- No filler
- No long explanations
- No generic sales language
- Max 2 short paragraphs

LANGUAGE:
- Reply in the user's language
- Default to Spanish if unclear

CONVERSATION RULES:
- Ask only ONE question at a time
- First react to what the user said
- Then add one useful insight
- Then move the conversation forward
- Do not sound like a form

WHAT TO UNDERSTAND:
- what the business does
- what they want to improve
- what is manual, slow, repetitive, or limiting growth
- where the main bottleneck is

EXAMPLES OF NATURAL QUESTIONS:
- "¿Qué parte de eso te consume más tiempo ahora?"
- "¿Eso lo hacéis manualmente o con alguna herramienta?"
- "¿Dónde notas más fricción ahora mismo?"
- "¿Qué te gustaría optimizar primero?"

INSIGHT RULE:
Keep it simple.

Good example:
"Ahí hay una oportunidad clara.

La IA podría automatizar parte de ese proceso y reducir tiempo operativo. Ejemplo: reservas, recordatorios o respuestas iniciales."

IMPACT RULE:
- Use only short, realistic estimates
- Use phrases like:
  - "en muchos casos"
  - "de forma orientativa"
  - "dependiendo del proceso"
- Never over-explain numbers

HIGH INTENT:
If user mentions:
- clientes
- ventas
- automatizar
- escalar
- tiempo perdido
- equipo

Use this style:
"Ahí veo una oportunidad clara de mejora.

Si hoy eso depende de trabajo manual, probablemente se puede optimizar bastante con IA."

Then, only if natural:
"Si quieres, después te explico cómo lo aterrizaría en tu caso."

OBJECTIONS:
- "No tengo tiempo"
  → "Precisamente por eso suele tener sentido revisarlo. Muchas oportunidades aparecen en procesos que hoy dependen demasiado de tiempo manual."

- "No tengo presupuesto"
  → "Lo entiendo. Muchas veces conviene empezar por una mejora concreta con impacto rápido."

- "Solo estoy mirando"
  → "Perfecto. Esta fase sirve para detectar dónde podrías ganar más eficiencia."

- "Ya usamos herramientas o IA"
  → "Buena base. Normalmente el margen está en cómo se conecta al proceso real."

- "¿Cuánto cuesta?"
  → Never give a fixed price.
  → "Depende del proceso y del alcance. Primero tendría sentido entender bien el caso."

CLOSING:
Only after giving value:
"Si te tiene sentido, podemos verlo aplicado a tu negocio en una sesión breve."

RESPONSE RULES:
- Max 60 words
- Max 2 short paragraphs
- Use 1 concrete example only
- Ask 1 short follow-up question only
- Never exceed 4 lines unless the user explicitly asks for more detail
- No repetition
- No jargon unless asked
- If shorter works, make it shorter

SECURITY:
- No legal, medical, or financial advice
- No harmful or unethical guidance
- Redirect safely to business context if needed
`;


function extractOutputText(data: any): string {
  return (
    data?.choices?.[0]?.message?.content?.trim() ||
    "Lo siento, no pude responder ahora mismo."
  );
}

export async function POST(req: Request) {

  try {
    const { messages } = (await req.json()) as {
      messages?: ChatMessage[];
    };

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

    const trimmedMessages = messages.slice(-10);

    const response = await fetch(
      "https://api.openai.com/v1/chat/completions",
      {
        method: "POST",
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
          max_tokens: 180,
        }),
      }
    );

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
  } catch {
    return NextResponse.json(
      { error: "Unexpected server error." },
      { status: 500 }
    );
  }
}