import type { Lang } from "./content";
import type { RouteKey } from "./routes";

export type ArticleKey = Extract<RouteKey, "articleAuthorise" | "articleAiAct" | "articleMcp">;

// p: paragraphs before the list; after: paragraphs after it.
type Section = { h: string; p?: string[]; list?: string[]; after?: string[] };
type Source = readonly [string, string];

export type Article = {
  title: string;
  description: string;
  lead: string;
  sections: Section[];
  closingTitle: string;
  closing: string[];
  sources: Source[];
};

export const articleKeys: ArticleKey[] = ["articleAuthorise", "articleAiAct", "articleMcp"];

export const ARTICLE_DATE = "2026-11-05";

export const articleMeta: Record<Lang, { tag: string; date: string; author: string; sources: string; techLink: string; back: string; read: string }> = {
  es: {
    tag: "Artículo",
    date: "5 de noviembre de 2026",
    author: "Gleam Peak AI",
    sources: "Fuentes",
    techLink: "Ver el diseño técnico",
    back: "Volver a Recursos",
    read: "Leer el artículo",
  },
  en: {
    tag: "Article",
    date: "5 November 2026",
    author: "Gleam Peak AI",
    sources: "Sources",
    techLink: "See the technical design",
    back: "Back to Resources",
    read: "Read the article",
  },
};

const EURLEX_AI_ACT = { es: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/spa", en: "https://eur-lex.europa.eu/eli/reg/2024/1689/oj/eng" };
const EURLEX_OMNIBUS = { es: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj", en: "https://eur-lex.europa.eu/eli/reg/2026/1744/oj" };
const MCP_SPEC = "https://modelcontextprotocol.io/specification/2026-07-28";
const MCP_TOOLS = "https://modelcontextprotocol.io/specification/2026-07-28/server/tools";
const MCP_AUTH = "https://modelcontextprotocol.io/specification/2026-07-28/basic/authorization";
const MCP_BEST = "https://modelcontextprotocol.io/docs/2026-07-28/tutorials/security/security_best_practices";
const RFC_8785 = "https://www.rfc-editor.org/rfc/rfc8785";

export const articles: Record<Lang, Record<ArticleKey, Article>> = {
  es: {
    articleAuthorise: {
      title: "Cómo autorizar las operaciones de un agente de IA antes de que se ejecuten",
      description:
        "Guía práctica para decidir, operación por operación, qué puede hacer un agente de IA: las cinco preguntas antes de ejecutar, la firma ligada a la operación exacta, cómo evitar que el agente se salte el control y qué registro dejar.",
      lead: "Dar a un agente acceso a una API no es lo mismo que autorizar cada cosa que haga con ella. Esta guía explica cómo decidir, operación por operación, qué se ejecuta, qué espera a una persona y qué se bloquea.",
      sections: [
        {
          h: "El acceso no es una autorización",
          p: [
            "Los sistemas de identidad y permisos deciden a qué puede conectarse un agente: esta API, este servidor, esta base de datos. Es necesario, pero no responde a la pregunta importante: si esta operación concreta, ahora, con estos parámetros, está autorizada.",
            "Un agente con permiso para usar la API de pagos puede, en principio, pagar cualquier importe a cualquier destinatario. Un agente de atención al cliente que puede leer fichas también puede intentar exportarlas todas. La diferencia entre una operación rutinaria y un incidente está en los detalles de cada petición, no en el permiso de acceso.",
          ],
        },
        {
          h: "Cinco preguntas antes de ejecutar",
          p: ["Un punto de control delante de las herramientas puede hacer cinco comprobaciones sobre cada operación antes de dejarla pasar:"],
          list: [
            "¿Quién lo pide? La identidad verificable del agente y quién responde de él, sacada de su credencial, no de lo que diga la petición.",
            "¿En nombre de quién? Que exista un mandato vigente que cubra esa acción: alcance, límites y fecha de fin.",
            "¿Para qué? La finalidad debe venir del mandato o de la tarea que asignó una persona o un sistema autorizado, nunca de lo que declare el agente.",
            "¿Con qué datos? Solo los necesarios para esa finalidad.",
            "¿Con qué impacto? Importe, destinatario, datos sensibles, efectos sobre personas y si la acción se puede deshacer.",
          ],
        },
        {
          h: "Tres respuestas, siempre con motivo",
          p: [
            "Con esas respuestas, unas reglas escritas y versionadas deciden entre tres resultados: permitir, retener hasta que firme una persona competente o bloquear. Cada decisión lleva su motivo y la versión de la regla aplicada, para poder explicarla después.",
            "La fricción debe crecer con el impacto. Leer y clasificar documentos puede pasar directamente; un pago por encima del límite, una notificación a un ciudadano o el envío de datos fuera de la organización deberían esperar a una persona o bloquearse. Si se retiene todo, quien aprueba acabará firmando sin leer.",
          ],
        },
        {
          h: "Que se ejecute exactamente lo aprobado",
          p: [
            "Una aprobación genérica («sí, adelante») se puede usar para cubrir otra cosa. Para evitarlo, el control calcula una huella criptográfica de la operación en forma canónica, por ejemplo con el esquema de canonicalización de JSON (RFC 8785) y SHA-256, que incluya acción, parámetros, importe, destinatario y documentos. La firma de la persona queda ligada a esa huella.",
            "Justo antes de ejecutar, se recalcula la huella. Si el agente ha cambiado el importe o el destinatario, la firma deja de valer y hay que aprobar de nuevo. Además, cada aprobación debería servir una sola vez y caducar: si nadie responde a tiempo, la operación se descarta. El silencio nunca es un sí.",
          ],
        },
        {
          h: "Que el agente no pueda saltarse el control",
          p: [
            "Un control que el agente puede rodear no controla nada. Hay dos formas habituales de cerrarlo: que el sistema protegido solo acepte operaciones con una autorización firmada por el punto de control, ligada a esa operación, de un solo uso y de validez muy corta; o que el punto de control guarde las credenciales de acceso y el agente no las tenga nunca.",
            "Y si algo falla (el motor de reglas no responde, tarda demasiado o no se puede guardar el registro), lo prudente es bloquear: fallar cerrado.",
          ],
        },
        {
          h: "Que quede constancia verificable",
          p: [
            "Cada cambio de estado (propuesta, retención, aprobación, ejecución, bloqueo) debería dejar un registro firmado y encadenado al anterior, incluidos los intentos rechazados. Así un auditor o un cliente puede reconstruir qué pasó y detectar si alguien ha alterado el historial, sin tener que fiarse de una hoja de cálculo.",
          ],
        },
        {
          h: "Por dónde empezar",
          list: [
            "Haz una lista de las operaciones con efectos: escribir, enviar, pagar, notificar, borrar.",
            "Para cada una, define quién puede pedirla, con qué límites y quién debe firmarla.",
            "Pon esas operaciones detrás de un solo punto de control y cierra el acceso directo.",
            "Revisa durante unas semanas qué se retiene y qué se bloquea, y ajusta las reglas.",
          ],
        },
      ],
      closingTitle: "Cómo está pensado Gleam Peak Control",
      closing: [
        "Gleam Peak Control es un prototipo en desarrollo, no un producto disponible. Está diseñado para situarse entre los agentes y los sistemas que conectes, hacer estas cinco comprobaciones, permitir, retener o bloquear cada operación y dejar un recibo firmado que un tercero podrá verificar. El diseño completo, con sus decisiones abiertas, está en la página de diseño técnico.",
      ],
      sources: [["RFC 8785: JSON Canonicalization Scheme (JCS)", RFC_8785]],
    },
    articleAiAct: {
      title: "Supervisión humana y registros en el Reglamento de IA: qué piden los artículos 12 y 14 y cómo encajan las aprobaciones de agentes",
      description:
        "Qué exigen los artículos 12 (registros) y 14 (supervisión humana) del Reglamento de IA a los sistemas de alto riesgo, a quién se aplican, desde cuándo, y cómo pueden encajar las aprobaciones de las operaciones de agentes de IA. No es asesoramiento jurídico.",
      lead: "El Reglamento de IA dedica dos artículos a dos ideas que cualquier organización con agentes reconocerá: dejar registro de lo que hace el sistema y que una persona pueda supervisarlo y pararlo. Este artículo resume qué piden y cómo pueden encajar las aprobaciones de operaciones. No sustituye una evaluación jurídica.",
      sections: [
        {
          h: "Primero: ¿a quién se aplica?",
          p: [
            "Los artículos 12 y 14 forman parte de los requisitos para los sistemas de IA de alto riesgo del Reglamento (UE) 2024/1689. Que un agente lo sea no depende de que sea un agente, sino de para qué se usa. Entre los usos del anexo III están, por ejemplo, evaluar la solvencia de personas físicas, evaluar riesgos y fijar precios en seguros de vida y de salud, o decidir sobre el acceso a prestaciones y servicios públicos esenciales.",
            "Muchos agentes no serán de alto riesgo. Aun así, pueden aplicarse otras normas, como el RGPD o DORA, y los contratos con clientes regulados suelen pedir controles parecidos.",
          ],
        },
        {
          h: "Desde cuándo",
          p: [
            "El Reglamento entró en vigor en agosto de 2024 y se aplica por fases. El Reglamento (UE) 2026/1744, publicado en julio de 2026, aplazó las obligaciones de alto riesgo: según su texto, las de los sistemas del anexo III se aplicarán desde el 2 de diciembre de 2027, y las de los sistemas integrados en productos regulados por la legislación del anexo I, desde el 2 de agosto de 2028. Antes de planificar, comprueba la versión consolidada en EUR-Lex.",
          ],
        },
        {
          h: "Artículo 12: registros",
          p: [
            "Los sistemas de alto riesgo deben permitir técnicamente el registro automático de acontecimientos (archivos de registro) durante todo su ciclo de vida. Ese registro debe servir, entre otras cosas, para detectar situaciones que puedan suponer un riesgo o una modificación sustancial, para la vigilancia poscomercialización y para que quien despliega el sistema pueda vigilar su funcionamiento.",
            "El reglamento también fija cuánto se conservan: el proveedor y el responsable del despliegue deben guardar los registros que estén bajo su control durante al menos seis meses, salvo que otra norma diga otra cosa (artículos 19 y 26).",
          ],
        },
        {
          h: "Artículo 14: supervisión humana",
          p: ["El sistema debe diseñarse para que personas físicas puedan supervisarlo de forma efectiva mientras se usa. Según el artículo, esas personas deben poder, de forma proporcionada:"],
          list: [
            "entender las capacidades y limitaciones del sistema y vigilar su funcionamiento;",
            "ser conscientes de la tendencia a confiar en exceso en la salida automática (el sesgo de automatización);",
            "interpretar correctamente la salida;",
            "decidir no usarla, o descartarla, invalidarla o revertirla;",
            "intervenir o interrumpir el sistema con un botón de parada o un procedimiento similar.",
          ],
        },
        {
          h: "Cómo encajan las aprobaciones de agentes",
          p: [
            "Cuando un agente propone una acción con efectos, retenerla hasta que una persona competente la revise y la firme es una forma concreta de que esa persona pueda decidir no usar la salida o invalidarla antes de que tenga consecuencias. El artículo 26 añade que quien despliega el sistema debe encomendar la supervisión a personas con la competencia, la formación y la autoridad necesarias.",
            "Para que una aprobación sea supervisión de verdad y no un trámite, conviene que la persona vea la operación exacta en lenguaje claro, con el motivo de la retención; que su firma quede ligada a esa operación y deje de valer si cambia; que solo se retenga lo que lo merece, para evitar la fatiga; y que exista una parada efectiva.",
            "Y cada propuesta, decisión, aprobación y ejecución debería quedar registrada con fecha, regla aplicada y quién decidió. Un registro firmado y encadenado ayuda a demostrar después que la supervisión existió.",
          ],
        },
        {
          h: "Lo que una aprobación no resuelve",
          p: [
            "Aprobar operaciones no hace que un sistema cumpla el reglamento. Los sistemas de alto riesgo tienen más obligaciones: gestión de riesgos, gobernanza de datos, documentación técnica, transparencia, precisión y ciberseguridad, y evaluación de la conformidad, entre otras. Cada organización debe hacer su propia evaluación jurídica.",
          ],
        },
      ],
      closingTitle: "Cómo está pensado Gleam Peak Control",
      closing: [
        "Gleam Peak Control es un prototipo en desarrollo. Está diseñado para retener las operaciones críticas hasta que firme una persona competente, ligar esa firma a la operación exacta, ofrecer una parada por agente y dejar un recibo firmado de cada decisión. Podrá aportar controles técnicos y evidencia que ayuden a demostrar la supervisión y el registro; no sustituirá la evaluación jurídica ni el resto de obligaciones.",
      ],
      sources: [
        ["Reglamento (UE) 2024/1689 (Reglamento de IA), en EUR-Lex", EURLEX_AI_ACT.es],
        ["Reglamento (UE) 2026/1744, que modifica el Reglamento de IA, en EUR-Lex", EURLEX_OMNIBUS.es],
      ],
    },
    articleMcp: {
      title: "Seguridad en MCP: cómo controlar las herramientas que usa un agente de IA",
      description:
        "Qué dice la especificación del Model Context Protocol sobre seguridad, autorización y herramientas, y cinco controles prácticos para que un agente use herramientas MCP sin hacer lo que nadie autorizó.",
      lead: "MCP se ha convertido en una forma habitual de conectar agentes de IA con herramientas y datos. Eso hace que la pregunta de seguridad cambie: ya no es solo qué dice el modelo, sino qué hace. Esto es lo que pide la propia especificación y cómo llevarlo a la práctica.",
      sections: [
        {
          h: "Qué cambia cuando un agente usa herramientas",
          p: [
            "El Model Context Protocol (MCP) es un protocolo abierto: un servidor MCP expone herramientas (consultar una base de datos, enviar un correo, crear un pago) y la aplicación de IA las invoca según lo que decida el modelo. La especificación lo dice sin rodeos: las herramientas representan ejecución arbitraria de código y deben tratarse con cautela.",
          ],
        },
        {
          h: "Lo que pide la especificación",
          list: [
            "Debería haber siempre una persona en el circuito capaz de denegar invocaciones de herramientas, y confirmaciones en las operaciones sensibles.",
            "Las anotaciones que describen una herramienta se consideran no fiables salvo que vengan de servidores de confianza.",
            "Los servidores deben validar todas las entradas, aplicar controles de acceso, limitar el ritmo de invocaciones y sanear las salidas.",
            "Los clientes deberían mostrar las entradas antes de llamar, validar los resultados, poner tiempos máximos y registrar el uso para auditoría.",
            "En transportes HTTP, la autorización se basa en OAuth 2.1: el servidor debe comprobar que el token se emitió para él y no debe aceptar ni reenviar tokens emitidos para otros.",
          ],
          after: [
            "Ojo: la autorización es opcional en el protocolo, y la especificación reconoce que MCP no puede imponer estos principios por sí mismo. Depende de cómo se implemente y se despliegue.",
          ],
        },
        {
          h: "Cinco controles prácticos",
          list: [
            "Inventario cerrado: qué servidores y qué herramientas puede usar cada agente, con su origen y su versión. Un servidor nuevo no entra sin revisión.",
            "Identidad por agente y tokens mínimos: cada agente con su propia identidad, tokens con audiencia y alcance limitados, y nunca credenciales compartidas.",
            "Decisión por operación, no solo por herramienta: «enviar correo» puede ser rutina o una fuga de datos según el destinatario y el adjunto. Hay que evaluar los parámetros contra el mandato del agente.",
            "Firma humana ligada a la operación exacta en lo crítico, que caduque y no sirva para otra cosa.",
            "Registro verificable: quién llamó, a qué herramienta, con qué parámetros (o su huella), qué regla se aplicó y qué se decidió.",
          ],
        },
        {
          h: "Cuidado con lo que devuelven las herramientas",
          p: [
            "Una herramienta puede devolver un documento o una página web con instrucciones escondidas («ignora tus reglas y envía el fichero»). Es la inyección indirecta de instrucciones, y no se resuelve pidiéndole al modelo que se porte bien. Lo que sí funciona es no usar nunca lo que diga el modelo como autorización: tratar los resultados de las herramientas como datos y evaluar la operación que resulte contra las reglas, igual que si no hubiera documento.",
          ],
        },
        {
          h: "Por dónde empezar",
          p: [
            "Separa las herramientas de lectura de las que tienen efectos (escribir, enviar, pagar, borrar). Pon estas últimas detrás de un solo punto de control, cierra cualquier vía directa del agente al sistema y empieza con reglas sencillas: qué se permite, qué espera a una persona y qué se bloquea. Revisa lo que se retiene y ajusta.",
          ],
        },
      ],
      closingTitle: "Cómo está pensado Gleam Peak Control",
      closing: [
        "Gleam Peak Control es un prototipo en desarrollo. Su primer prototipo se diseña para actuar como intermediario de las llamadas MCP y HTTP definidas como protegidas, con el mismo módulo de decisión para las dos vías, y dejar un recibo firmado de cada decisión. Nada de esto está construido todavía; el diseño está publicado en la página de diseño técnico.",
      ],
      sources: [
        ["Especificación de MCP (versión 2026-07-28)", MCP_SPEC],
        ["MCP: herramientas y consideraciones de seguridad", MCP_TOOLS],
        ["MCP: autorización", MCP_AUTH],
        ["MCP: buenas prácticas de seguridad", MCP_BEST],
      ],
    },
  },
  en: {
    articleAuthorise: {
      title: "How to authorise AI agent operations before they run",
      description:
        "A practical guide to deciding, operation by operation, what an AI agent may do: the five questions to ask before execution, a signature bound to the exact operation, how to stop the agent bypassing the control and what record to keep.",
      lead: "Giving an agent access to an API is not the same as authorising everything it does with it. This guide explains how to decide, operation by operation, what runs, what waits for a person and what is blocked.",
      sections: [
        {
          h: "Access is not authorisation",
          p: [
            "Identity and access systems decide what an agent can connect to: this API, this server, this database. That is necessary, but it does not answer the question that matters: whether this specific operation, now, with these parameters, is authorised.",
            "An agent allowed to use the payments API can, in principle, pay any amount to anyone. A customer service agent that can read customer records can also try to export all of them. The difference between a routine operation and an incident lies in the details of each request, not in the access permission.",
          ],
        },
        {
          h: "Five questions before execution",
          p: ["A control point in front of the tools can make five checks on every operation before letting it through:"],
          list: [
            "Who is asking? The agent's verifiable identity and who is responsible for it, taken from its credential, not from what the request says.",
            "On whose behalf? A valid mandate that covers that action: scope, limits and end date.",
            "What for? The purpose must come from the mandate or the task assigned by a person or an authorised system, never from what the agent claims.",
            "With which data? Only what that purpose needs.",
            "With what impact? Amount, recipient, sensitive data, effects on people and whether the action can be undone.",
          ],
        },
        {
          h: "Three answers, always with a reason",
          p: [
            "With those answers, written and versioned rules choose between three outcomes: allow, hold until a competent person signs, or block. Each decision carries its reason and the version of the rule applied, so that it can be explained later.",
            "Friction should grow with impact. Reading and classifying documents can go straight through; a payment above the limit, a notification to a citizen or data sent outside the organisation should wait for a person or be blocked. If everything is held, approvers will end up signing without reading.",
          ],
        },
        {
          h: "Run exactly what was approved",
          p: [
            "A generic approval (“yes, go ahead”) can be used to cover something else. To prevent that, the control computes a cryptographic fingerprint of the operation in canonical form, for example with the JSON Canonicalization Scheme (RFC 8785) and SHA-256, covering action, parameters, amount, recipient and documents. The person's signature is bound to that fingerprint.",
            "Just before execution, the fingerprint is recomputed. If the agent has changed the amount or the recipient, the signature is no longer valid and the operation must be approved again. Each approval should also be single-use and expire: if nobody answers in time, the operation is discarded. Silence is never a yes.",
          ],
        },
        {
          h: "Make sure the agent cannot bypass the control",
          p: [
            "A control the agent can go around controls nothing. There are two common ways to close the gap: the protected system only accepts operations carrying an authorisation signed by the control point, bound to that operation, single-use and very short-lived; or the control point holds the access credentials and the agent never has them.",
            "And if something fails (the rules engine does not answer, takes too long, or the record cannot be stored), the safe choice is to block: fail closed.",
          ],
        },
        {
          h: "Keep a verifiable record",
          p: [
            "Every change of state (proposal, hold, approval, execution, block) should leave a signed record chained to the previous one, including rejected attempts. That way an auditor or a client can reconstruct what happened and detect whether someone has altered the history, without having to trust a spreadsheet.",
          ],
        },
        {
          h: "Where to start",
          list: [
            "List the operations that have effects: write, send, pay, notify, delete.",
            "For each one, define who may request it, within which limits and who must sign it.",
            "Put those operations behind a single control point and close direct access.",
            "Review what gets held and blocked for a few weeks, and adjust the rules.",
          ],
        },
      ],
      closingTitle: "How Gleam Peak Control is designed",
      closing: [
        "Gleam Peak Control is a prototype in development, not an available product. It is designed to sit between agents and the systems you connect, make these five checks, allow, hold or block each operation and leave a signed receipt that a third party will be able to verify. The full design, with its open decisions, is on the technical design page.",
      ],
      sources: [["RFC 8785: JSON Canonicalization Scheme (JCS)", RFC_8785]],
    },
    articleAiAct: {
      title: "Human oversight and logs in the EU AI Act: what Articles 12 and 14 require and where agent approvals fit",
      description:
        "What Articles 12 (record-keeping) and 14 (human oversight) of the EU AI Act require of high-risk systems, who they apply to, from when, and where approvals of AI agent operations can fit. Not legal advice.",
      lead: "The EU AI Act devotes two articles to two ideas any organisation running agents will recognise: keeping a record of what the system does, and making sure a person can oversee it and stop it. This article summarises what they require and where approvals of operations can fit. It does not replace a legal assessment.",
      sections: [
        {
          h: "First: who does it apply to?",
          p: [
            "Articles 12 and 14 are part of the requirements for high-risk AI systems in Regulation (EU) 2024/1689. Whether an agent is high-risk does not depend on it being an agent but on what it is used for. The uses listed in Annex III include, for example, assessing the creditworthiness of natural persons, risk assessment and pricing in life and health insurance, and decisions on access to essential public benefits and services.",
            "Many agents will not be high-risk. Even so, other rules may apply, such as the GDPR or DORA, and contracts with regulated clients often ask for similar controls.",
          ],
        },
        {
          h: "From when",
          p: [
            "The Regulation entered into force in August 2024 and applies in stages. Regulation (EU) 2026/1744, published in July 2026, postponed the high-risk obligations: according to its text, those for Annex III systems will apply from 2 December 2027, and those for systems built into products covered by the legislation in Annex I from 2 August 2028. Check the consolidated version on EUR-Lex before planning.",
          ],
        },
        {
          h: "Article 12: record-keeping",
          p: [
            "High-risk systems must technically allow for the automatic recording of events (logs) over their whole lifetime. Those logs must help, among other things, to identify situations that may present a risk or a substantial modification, to support post-market monitoring, and to let whoever deploys the system monitor how it operates.",
            "The Regulation also sets how long they are kept: providers and deployers must keep the logs under their control for at least six months, unless other law provides otherwise (Articles 19 and 26).",
          ],
        },
        {
          h: "Article 14: human oversight",
          p: ["The system must be designed so that natural persons can oversee it effectively while it is in use. According to the article, those people must be able, as appropriate and proportionate, to:"],
          list: [
            "understand the system's capacities and limitations and monitor its operation;",
            "remain aware of the tendency to over-rely on automated output (automation bias);",
            "correctly interpret the output;",
            "decide not to use the output, or disregard, override or reverse it;",
            "intervene in or interrupt the system through a stop button or a similar procedure.",
          ],
        },
        {
          h: "Where agent approvals fit",
          p: [
            "When an agent proposes an action with real effects, holding it until a competent person reviews and signs it is a concrete way for that person to decide not to use the output, or to override it, before it has consequences. Article 26 adds that deployers must assign oversight to people with the necessary competence, training and authority.",
            "For an approval to be real oversight rather than a formality, the person should see the exact operation in plain language, with the reason it was held; their signature should be bound to that operation and stop being valid if it changes; only what deserves it should be held, to avoid fatigue; and there should be an effective stop.",
            "Every proposal, decision, approval and execution should also be recorded with its date, the rule applied and who decided. A signed, chained record helps show afterwards that the oversight took place.",
          ],
        },
        {
          h: "What an approval does not solve",
          p: [
            "Approving operations does not make a system compliant. High-risk systems carry other obligations: risk management, data governance, technical documentation, transparency, accuracy and cybersecurity, and conformity assessment, among others. Each organisation needs its own legal assessment.",
          ],
        },
      ],
      closingTitle: "How Gleam Peak Control is designed",
      closing: [
        "Gleam Peak Control is a prototype in development. It is designed to hold critical operations until a competent person signs, bind that signature to the exact operation, offer a stop button per agent and leave a signed receipt for every decision. It will be able to provide technical controls and evidence that help demonstrate oversight and record-keeping; it will not replace a legal assessment or the other obligations.",
      ],
      sources: [
        ["Regulation (EU) 2024/1689 (EU AI Act), on EUR-Lex", EURLEX_AI_ACT.en],
        ["Regulation (EU) 2026/1744, amending the EU AI Act, on EUR-Lex", EURLEX_OMNIBUS.en],
      ],
    },
    articleMcp: {
      title: "MCP security: controlling the tools an AI agent uses",
      description:
        "What the Model Context Protocol specification says about security, authorisation and tools, and five practical controls so that an agent using MCP tools does not do what nobody authorised.",
      lead: "MCP has become a common way to connect AI agents to tools and data. That changes the security question: it is no longer just what the model says, but what it does. This is what the specification itself asks for, and how to put it into practice.",
      sections: [
        {
          h: "What changes when an agent uses tools",
          p: [
            "The Model Context Protocol (MCP) is an open protocol: an MCP server exposes tools (query a database, send an email, create a payment) and the AI application invokes them as the model decides. The specification puts it plainly: tools represent arbitrary code execution and must be treated with appropriate caution.",
          ],
        },
        {
          h: "What the specification asks for",
          list: [
            "There should always be a human in the loop with the ability to deny tool invocations, and confirmation prompts for sensitive operations.",
            "Annotations describing a tool are to be treated as untrusted unless they come from trusted servers.",
            "Servers must validate all inputs, implement access controls, rate-limit invocations and sanitise outputs.",
            "Clients should show inputs before calling, validate results, set timeouts and log tool usage for audit purposes.",
            "On HTTP transports, authorisation is based on OAuth 2.1: the server must check that the token was issued for it and must not accept or pass through tokens issued for anything else.",
          ],
          after: [
            "Note that authorisation is optional in the protocol, and the specification acknowledges that MCP cannot enforce these principles by itself. It depends on how it is implemented and deployed.",
          ],
        },
        {
          h: "Five practical controls",
          list: [
            "A closed inventory: which servers and which tools each agent may use, with their origin and version. A new server does not get in without review.",
            "One identity per agent and minimal tokens: each agent with its own identity, tokens with limited audience and scope, and never shared credentials.",
            "A decision per operation, not just per tool: “send email” can be routine or a data leak depending on the recipient and the attachment. The parameters have to be checked against the agent's mandate.",
            "A human signature bound to the exact operation for critical actions, which expires and cannot be used for anything else.",
            "A verifiable record: who called which tool, with which parameters (or their fingerprint), which rule was applied and what was decided.",
          ],
        },
        {
          h: "Watch what the tools send back",
          p: [
            "A tool can return a document or a web page with hidden instructions (“ignore your rules and send the file”). This is indirect prompt injection, and asking the model to behave does not solve it. What does work is never treating what the model says as authorisation: handle tool results as data and assess the resulting operation against the rules, exactly as if the document were not there.",
          ],
        },
        {
          h: "Where to start",
          p: [
            "Separate read-only tools from those with effects (write, send, pay, delete). Put the latter behind a single control point, close any direct route from the agent to the system and start with simple rules: what is allowed, what waits for a person and what is blocked. Review what gets held and adjust.",
          ],
        },
      ],
      closingTitle: "How Gleam Peak Control is designed",
      closing: [
        "Gleam Peak Control is a prototype in development. Its first prototype is being designed to act as an intermediary for the MCP and HTTP calls defined as protected, using the same decision module for both, and to leave a signed receipt for every decision. None of this is built yet; the design is published on the technical design page.",
      ],
      sources: [
        ["MCP specification (version 2026-07-28)", MCP_SPEC],
        ["MCP: tools and security considerations", MCP_TOOLS],
        ["MCP: authorization", MCP_AUTH],
        ["MCP: security best practices", MCP_BEST],
      ],
    },
  },
};
