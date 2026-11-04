import type { Lang } from "./content";

type Pair = readonly [string, string];
type Triple = readonly [string, string, string];
type Quad = readonly [string, string, string, string];
type ConsoleRow = readonly [string, string, string, "pass" | "fail"];
type Verdict = readonly [string, string, "ok" | "danger" | "hold"];
type Module = readonly [string, string, string, "now" | "next"];
type Layer = readonly [string, string, string, string, "now" | "next"];
type Solution = {
  id: string;
  tag: string;
  norm: string;
  title: string;
  challenge: string;
  help: string;
  steps: readonly string[];
  body: readonly string[];
};

const es = {
  control: {
    eyebrow: "Control · Prototipo en desarrollo",
    title: "Cada acción de un agente pasa por el control antes de ejecutarse.",
    lead: "Control se sitúa entre tus agentes de IA y tus sistemas. Comprueba cada acción, la permite, la bloquea o pide la firma de una persona, y deja un recibo firmado.",
    console: {
      label: "Ilustración de una acción bloqueada por Control",
      window: "gleam-peak · control",
      operation: "Exportar fichas de clientes",
      detail: "12.000 fichas · agente de atención al cliente",
      rows: [
        ["ID", "Identidad del agente", "Verificada", "pass"],
        ["M", "Mandato", "No incluye exportar", "fail"],
        ["D", "Datos personales", "Fuera de finalidad", "fail"],
      ] as ConsoleRow[],
      decision: "Bloqueada · motivo enviado al agente y aviso a seguridad",
      stop: "Parar agente",
      receipt: "Recibo firmado",
      signed: "Firmado",
    },
    decideKicker: "Cómo decide",
    decideTitle: "Cinco preguntas, tres respuestas.",
    decideCopy: [
      "Antes de que un agente actúe, Control se hace cinco preguntas: quién lo pide, en nombre de quién, para qué, con qué datos y qué impacto tiene. Comprueba que el agente está identificado y tiene un responsable, que su mandato cubre la acción, que la finalidad encaja con lo autorizado, que solo usa los datos necesarios y qué impacto tiene por importe, destinatario, datos sensibles o efectos sobre personas.",
      "Con eso responde de tres formas. Si la acción es de bajo riesgo y está dentro del mandato, la permite. Si es crítica o pasa de un límite, espera a que una persona competente la revise y la firme. Si está fuera de mandato o es sospechosa, la bloquea, explica el motivo al agente y avisa al responsable.",
    ],
    checks: [
      ["Identidad", "¿Quién lo pide?", "Agente identificado, con responsable y activo."],
      ["Mandato", "¿En nombre de quién?", "Para quién actúa, con qué límites y hasta cuándo."],
      ["Finalidad", "¿Para qué?", "Que la acción encaje con el propósito autorizado."],
      ["Datos", "¿Con qué datos?", "Solo los necesarios; el resto se oculta o se bloquea."],
      ["Riesgo", "¿Qué impacto tiene?", "Importe, destinatario, datos sensibles o efectos sobre personas."],
    ] as Triple[],
    verdicts: [
      ["Permitir", "Bajo riesgo y dentro del mandato", "ok"],
      ["Esperar a una persona", "Crítica o fuera de límite", "hold"],
      ["Bloquear", "Fuera de mandato o sospechosa", "danger"],
    ] as Verdict[],
    ruleLine: "Solo las reglas y la firma de una persona dan luz verde. La IA nunca aprueba ni bloquea sola: la privacidad y la seguridad solo pueden restringir, ocultando datos, subiendo el riesgo o parando al agente.",
    codeKicker: "Por dentro",
    codeTitle: "Reglas legibles, recibos verificables.",
    codeCopy: "Las reglas están versionadas. Cada decisión deja un recibo firmado que un tercero puede verificar sin depender de Gleam Peak AI.",
    policyLabel: "Regla",
    receiptLabel: "Recibo firmado",
    modulesKicker: "Qué incluye",
    modulesTitle: "Todo lo que hace Control.",
    modulesNote: "Todo está en desarrollo. La primera versión demostrable está prevista para marzo de 2027, según el plan sujeto a equipo y financiación.",
    modulesText: [
      ["Conocer y autorizar", "Un registro de los agentes y de quién responde de cada uno. Mandatos que dicen en nombre de quién actúa cada agente, para qué y hasta cuándo. Y reglas que deciden qué se permite, qué se bloquea y qué espera a una persona."],
      ["Controlar y decidir", "Un punto de control por el que pasa toda acción antes de ejecutarse. Privacidad para usar solo los datos necesarios, seguridad para detectar manipulaciones con un botón de parada, y aprobaciones en las que una persona firma la acción exacta."],
      ["Demostrar", "Recibos firmados que un tercero puede verificar sin depender de nosotros, y paquetes de evidencia para auditorías y para las personas afectadas por una decisión."],
    ] as Pair[],
    modulesNow: "En el prototipo",
    modulesNext: "En diseño",
    modules: [
      ["Conocer", "Registro", "Qué agentes hay, quién responde de cada uno y si están activos.", "now"],
      ["Autorizar", "Mandatos", "En nombre de quién actúa cada agente, para qué y hasta cuándo.", "now"],
      ["Autorizar", "Reglas", "Permitir, bloquear o esperar a una persona, y por qué.", "now"],
      ["Controlar", "Punto de control", "Toda acción pasa por aquí antes de ejecutarse.", "now"],
      ["Controlar", "Privacidad", "Solo los datos necesarios para la finalidad.", "next"],
      ["Controlar", "Seguridad", "Detección de manipulación y botón de parada.", "next"],
      ["Decidir", "Aprobaciones", "Una persona competente firma la acción exacta.", "now"],
      ["Demostrar", "Evidencias", "Recibos firmados que un tercero puede verificar.", "now"],
      ["Demostrar", "Cumplimiento", "Paquetes para auditoría y portal para personas afectadas.", "next"],
    ] as Module[],
    closingTitle: "¿Quieres probar Control con uno de tus agentes?",
  },
  passport: {
    eyebrow: "Passport · En desarrollo",
    title: "Demuestra que usas la IA con control, sin enseñar tus datos.",
    lead: "Una credencial verificable, basada en estándares abiertos, que presentas a un banco, un cliente o un auditor. Con pruebas zero knowledge comprueban que cumples sin ver tus datos. Caduca y se puede revocar.",
    flow: ["Datos firmados", "Pruebas zero knowledge", "Verificación", "Válido, caducado o revocado"],
    flowNote: "Los datos se quedan en casa. Solo viaja la prueba.",
    result: {
      title: "Resultado de la verificación",
      state: "Válido",
      rows: [
        ["Titular", "Proveedor de ejemplo"],
        ["Emisor", "Gleam Peak AI"],
        ["Caduca", "30-06-2027"],
      ] as Pair[],
      conditions: [
        ["Agentes registrados con responsable", "Recibos"],
        ["Firma humana en operaciones críticas", "Recibos"],
        ["Sin acceso a datos fuera de mandato", "Recibos"],
        ["Autenticación multifactor", "Herramienta"],
        ["Copias de seguridad probadas", "Auditor"],
      ] as Pair[],
      exposed: "Datos expuestos: ninguno",
    },
    layersKicker: "Qué demuestra",
    layersTitle: "Tres capas que se suman con el tiempo.",
    layersNext: "Más adelante",
    layers: [
      ["01", "Ciberseguridad básica", "Autenticación multifactor, copias probadas y parches al día.", "Fuente: herramienta conectada, auditor o declaración de la empresa marcada como tal.", "now"],
      ["02", "Uso responsable de la IA", "Agentes con responsable, firma humana en lo crítico y ningún dato fuera de mandato.", "Fuente: recibos firmados de Control.", "now"],
      ["03", "Condiciones para recibir mandatos", "Lo que otra organización exige antes de que tus agentes actúen en su nombre.", "Base de la red entre organizaciones.", "next"],
    ] as Layer[],
    caseKicker: "En la práctica",
    caseTitle: "Un banco da de alta a un proveedor sin enviarle otro cuestionario.",
    caseCopy: [
      "Un banco tiene que vigilar la seguridad de sus proveedores. Hoy eso significa cuestionarios, documentos y auditorías que se repiten con cada cliente. Con Passport, el proveedor presenta su credencial y el banco la comprueba al momento.",
      "Control aporta los recibos firmados del periodo, Gleam Peak AI emite el Passport con pruebas zero knowledge y el banco comprueba la firma, la caducidad y la revocación. El resultado es válido y el banco no ha visto ningún dato del proveedor ni de sus clientes.",
    ],
    caseSteps: [
      "Control aporta los recibos firmados del periodo.",
      "Gleam Peak AI emite el Passport con pruebas zero knowledge.",
      "El banco comprueba firma, caducidad y revocación: válido, sin ver datos.",
    ],
    faqKicker: "Preguntas frecuentes",
    faqTitle: "Qué es y qué no es.",
    faq: [
      ["¿Qué es?", "Es una credencial verificable."],
      ["¿Sustituye una auditoría?", "No. Hace la confianza más rápida y continua entre auditorías."],
      ["¿Y si un dato es falso?", "Una prueba no convierte en verdadero un dato falso. Por eso cada condición indica su fuente."],
      ["¿Cómo se verifica?", "Desde una página o con una llamada a la API. Quien verifica ve el estado y las condiciones, nunca las evidencias."],
    ] as Pair[],
    closingTitle: "¿Te piden pruebas de cómo controlas tus agentes?",
  },
  solutions: {
    eyebrow: "Soluciones",
    title: "El mismo núcleo, adaptado a cada sector.",
    lead: "Control y Passport son iguales para todos. Cambian las reglas, quién firma y a quién hay que demostrarlo.",
    matrixKicker: "Qué cambia",
    matrixTitle: "Cuatro sectores, tres diferencias.",
    matrixHead: ["Sector", "Marco", "Quién firma", "A quién se demuestra"] as Quad,
    matrix: [
      ["Banca y seguros", "DORA", "Perito o persona responsable", "Supervisores y socios"],
      ["Administración pública", "Reglamento de IA", "Órgano competente", "Ciudadanía, con derecho a revisión"],
      ["Gran empresa y proveedores", "NIS2", "Verifica la empresa", "La propia empresa, de forma automática"],
      ["Proveedores de IA e integradores", "Lo que exija el cliente", "Quien defina el cliente", "Clientes regulados y licitaciones"],
    ] as Quad[],
    challengeLabel: "Reto",
    helpLabel: "Con Gleam Peak AI",
    stepsLabel: "Caso de uso",
    items: [
      {
        id: "banca",
        tag: "Banca y seguros",
        norm: "DORA",
        title: "Pagos y siniestros con firma humana donde importa.",
        body: [
          "Los agentes de IA ya preparan pagos y resuelven siniestros, y DORA exige controlar la tecnología y a los proveedores. Control fija límites por importe y riesgo y pide la firma de una persona en lo crítico. Passport lo demuestra ante supervisores y socios.",
          "Por ejemplo, un agente propone pagar un siniestro de 8.400 € cuando su límite es de 5.000 €. Control lo retiene y pide la firma del perito con el expediente completo. El perito firma, se paga y queda el recibo.",
        ],
        challenge: "Los agentes ya preparan pagos y siniestros, y DORA exige controlarlos.",
        help: "Límites por importe y riesgo, firma humana en lo crítico y Passport para supervisores.",
        steps: [
          "Un agente propone pagar un siniestro de 8.400 €, con un límite de 5.000 €.",
          "Control lo retiene y pide la firma del perito con el expediente.",
          "El perito firma; se paga y queda el recibo.",
        ],
      },
      {
        id: "administracion",
        tag: "Administración pública",
        norm: "Reglamento de IA",
        title: "La IA prepara el expediente. La persona competente decide.",
        body: [
          "Una resolución con efectos sobre derechos no puede firmarla una máquina, y la ciudadanía tiene derecho a pedir revisión. Control deja que la IA prepare el expediente, pero exige la firma del órgano competente. El recibo explica qué hizo la IA y quién decidió.",
          "Por ejemplo, un agente prepara la resolución de una ayuda pública. Como tiene efectos jurídicos, Control exige una decisión humana. El órgano competente revisa y firma, se notifica que intervino una IA y la persona interesada puede pedir revisión.",
        ],
        challenge: "Una resolución con efectos sobre derechos no puede firmarla una máquina.",
        help: "La IA prepara, firma el órgano competente y el recibo explica quién decidió.",
        steps: [
          "Un agente prepara la resolución de una ayuda pública.",
          "Control exige decisión humana por sus efectos jurídicos.",
          "El órgano firma; se notifica que intervino una IA y se puede pedir revisión.",
        ],
      },
      {
        id: "proveedores",
        tag: "Gran empresa y proveedores",
        norm: "NIS2",
        title: "Verifica a cientos de proveedores sin repetir cuestionarios.",
        body: [
          "NIS2 obliga a gestionar la seguridad de la cadena de proveedores, y cada vez más proveedores usan IA. La empresa pide el Passport a cada uno y lo verifica de forma automática. Si una credencial caduca o se revoca, lo sabe al momento.",
          "Por ejemplo, en la revisión trimestral la empresa verifica todas las credenciales a la vez y solo pide más información a quien no cumple.",
        ],
        challenge: "NIS2 obliga a vigilar la cadena de proveedores, y cada vez más usan IA.",
        help: "Pide el Passport a cada proveedor y verifícalo de forma automática.",
        steps: [
          "En la revisión trimestral, la empresa pide el Passport a sus proveedores.",
          "Los verifica todos a la vez: válidos, caducados o revocados.",
          "Solo pide más información a quien no cumple.",
        ],
      },
      {
        id: "integradores",
        tag: "Proveedores de IA e integradores",
        norm: "Clientes regulados",
        title: "Vende a clientes regulados con el control ya incluido.",
        body: [
          "Los clientes regulados piden pruebas de control antes de dejar que un agente toque sus sistemas. Integra Control en tu producto y entrega tu propio Passport: tu cliente ve las reglas, las firmas y los recibos desde el primer día.",
          "Por ejemplo, un integrador despliega sus agentes en un hospital, detrás de Control. El hospital define las reglas y quién firma, recibe un recibo de cada acción, y el integrador presenta su Passport en la licitación.",
        ],
        challenge: "Los clientes regulados piden pruebas de control antes de abrir sus sistemas.",
        help: "Integra Control en tu producto y entrega tu propio Passport.",
        steps: [
          "Un integrador despliega sus agentes en un hospital, detrás de Control.",
          "El hospital define reglas y quién firma, y recibe un recibo de cada acción.",
          "El integrador presenta su Passport en la licitación.",
        ],
      },
    ] as Solution[],
    closingTitle: "¿Tu sector no aparece? Cuéntanos tu caso.",
  },
};

type PagesContent = typeof es;

const en: PagesContent = {
  control: {
    eyebrow: "Control · Prototype in development",
    title: "Every agent action passes through control before it runs.",
    lead: "Control sits between your AI agents and your systems. It checks every action, allows it, blocks it or asks a person to sign, and leaves a signed receipt.",
    console: {
      label: "Illustration of an action blocked by Control",
      window: "gleam-peak · control",
      operation: "Export customer records",
      detail: "12,000 records · customer service agent",
      rows: [
        ["ID", "Agent identity", "Verified", "pass"],
        ["M", "Mandate", "Does not cover export", "fail"],
        ["D", "Personal data", "Outside purpose", "fail"],
      ],
      decision: "Blocked · reason sent to the agent and security alerted",
      stop: "Stop agent",
      receipt: "Signed receipt",
      signed: "Signed",
    },
    decideKicker: "How it decides",
    decideTitle: "Five questions, three answers.",
    decideCopy: [
      "Before an agent acts, Control asks five questions: who is asking, on whose behalf, what for, with which data and what impact it has. It checks that the agent is identified and has an owner, that its mandate covers the action, that the purpose fits what was authorised, that it only uses the data it needs and what impact it has in amount, recipient, sensitive data or effects on people.",
      "Then it answers in one of three ways. If the action is low risk and within the mandate, it allows it. If it is critical or over a limit, it waits for a competent person to review and sign it. If it is outside the mandate or suspicious, it blocks it, tells the agent why and alerts the owner.",
    ],
    checks: [
      ["Identity", "Who is asking?", "An identified agent, with an owner, and active."],
      ["Mandate", "On whose behalf?", "Who it acts for, within which limits and until when."],
      ["Purpose", "What for?", "That the action fits the authorised purpose."],
      ["Data", "With which data?", "Only what is needed; the rest is masked or blocked."],
      ["Risk", "What impact?", "Amount, recipient, sensitive data or effects on people."],
    ],
    verdicts: [
      ["Allow", "Low risk and within the mandate", "ok"],
      ["Wait for a person", "Critical or over the limit", "hold"],
      ["Block", "Outside the mandate or suspicious", "danger"],
    ],
    ruleLine: "Only rules and a person's signature give the green light. AI never approves or blocks on its own: privacy and security can only restrict, by masking data, raising the risk or stopping the agent.",
    codeKicker: "Under the hood",
    codeTitle: "Readable rules, verifiable receipts.",
    codeCopy: "Rules are versioned. Every decision leaves a signed receipt that a third party can verify without relying on Gleam Peak AI.",
    policyLabel: "Rule",
    receiptLabel: "Signed receipt",
    modulesKicker: "What it includes",
    modulesTitle: "Everything Control does.",
    modulesNote: "Everything is in development. The first demonstrable version is planned for March 2027, in a plan subject to team and funding.",
    modulesText: [
      ["Know and authorise", "A registry of agents and who is accountable for each. Mandates that say on whose behalf each agent acts, what for and until when. And rules that decide what is allowed, what is blocked and what waits for a person."],
      ["Control and decide", "A checkpoint every action passes through before it runs. Privacy to use only the data needed, security to detect tampering with a stop button, and approvals where a person signs the exact action."],
      ["Prove", "Signed receipts a third party can verify without relying on us, and evidence packages for audits and for the people affected by a decision."],
    ],
    modulesNow: "In the prototype",
    modulesNext: "In design",
    modules: [
      ["Know", "Registry", "Which agents exist, who is accountable and whether they are active.", "now"],
      ["Authorise", "Mandates", "On whose behalf each agent acts, for what and until when.", "now"],
      ["Authorise", "Rules", "Allow, block or wait for a person, and why.", "now"],
      ["Control", "Checkpoint", "Every action passes here before it runs.", "now"],
      ["Control", "Privacy", "Only the data needed for the purpose.", "next"],
      ["Control", "Security", "Tampering detection and a stop button.", "next"],
      ["Decide", "Approvals", "A competent person signs the exact action.", "now"],
      ["Prove", "Evidence", "Signed receipts a third party can verify.", "now"],
      ["Prove", "Compliance", "Audit packages and a portal for affected people.", "next"],
    ],
    closingTitle: "Want to try Control with one of your agents?",
  },
  passport: {
    eyebrow: "Passport · In development",
    title: "Prove you use AI with control, without showing your data.",
    lead: "A verifiable credential, built on open standards, that you present to a bank, a client or an auditor. With zero knowledge proofs they check that you comply without seeing your data. It expires and can be revoked.",
    flow: ["Signed data", "Zero knowledge proofs", "Verification", "Valid, expired or revoked"],
    flowNote: "The data stays at home. Only the proof travels.",
    result: {
      title: "Verification result",
      state: "Valid",
      rows: [
        ["Holder", "Example supplier"],
        ["Issuer", "Gleam Peak AI"],
        ["Expires", "30-06-2027"],
      ],
      conditions: [
        ["Agents registered with an owner", "Receipts"],
        ["Human signature on critical operations", "Receipts"],
        ["No data access outside the mandate", "Receipts"],
        ["Multi-factor authentication", "Tool"],
        ["Tested backups", "Auditor"],
      ],
      exposed: "Data exposed: none",
    },
    layersKicker: "What it proves",
    layersTitle: "Three layers that add up over time.",
    layersNext: "Later",
    layers: [
      ["01", "Basic cybersecurity", "Multi-factor authentication, tested backups and up-to-date patches.", "Source: connected tool, auditor or a company declaration marked as such.", "now"],
      ["02", "Responsible use of AI", "Agents with an owner, human signature on critical actions and no data outside the mandate.", "Source: signed Control receipts.", "now"],
      ["03", "Conditions to receive mandates", "What another organisation requires before your agents act on its behalf.", "Basis of the network between organisations.", "next"],
    ],
    caseKicker: "In practice",
    caseTitle: "A bank onboards a supplier without sending another questionnaire.",
    caseCopy: [
      "A bank has to oversee its suppliers' security. Today that means questionnaires, documents and audits repeated for every client. With Passport, the supplier presents its credential and the bank checks it straight away.",
      "Control provides the period's signed receipts, Gleam Peak AI issues the Passport with zero knowledge proofs and the bank checks signature, expiry and revocation. The result is valid and the bank has not seen any data from the supplier or its clients.",
    ],
    caseSteps: [
      "Control provides the period's signed receipts.",
      "Gleam Peak AI issues the Passport with zero knowledge proofs.",
      "The bank checks signature, expiry and revocation: valid, without seeing data.",
    ],
    faqKicker: "Questions",
    faqTitle: "What it is and what it is not.",
    faq: [
      ["What is it?", "It is a verifiable credential."],
      ["Does it replace an audit?", "No. It makes trust faster and continuous between audits."],
      ["What if some data is false?", "A proof cannot make false data true. That is why each condition shows its source."],
      ["How is it verified?", "From a page or with an API call. The verifier sees the status and the conditions, never the evidence."],
    ],
    closingTitle: "Are you asked to prove how you control your agents?",
  },
  solutions: {
    eyebrow: "Solutions",
    title: "The same core, adapted to each sector.",
    lead: "Control and Passport are the same for everyone. What changes are the rules, who signs and who you need to prove it to.",
    matrixKicker: "What changes",
    matrixTitle: "Four sectors, three differences.",
    matrixHead: ["Sector", "Framework", "Who signs", "Proven to"],
    matrix: [
      ["Banking and insurance", "DORA", "Adjuster or accountable person", "Supervisors and partners"],
      ["Public administration", "AI Act", "Competent body", "Citizens, with the right to review"],
      ["Large companies and suppliers", "NIS2", "The company verifies", "The company itself, automatically"],
      ["AI vendors and integrators", "What the client requires", "Whoever the client sets", "Regulated clients and tenders"],
    ],
    challengeLabel: "Challenge",
    helpLabel: "With Gleam Peak AI",
    stepsLabel: "Use case",
    items: [
      {
        id: "banca",
        tag: "Banking and insurance",
        norm: "DORA",
        title: "Payments and claims with a human signature where it matters.",
        body: [
          "AI agents already prepare payments and settle claims, and DORA requires control over technology and suppliers. Control sets limits by amount and risk and asks a person to sign critical actions. Passport proves it to supervisors and partners.",
          "For example, an agent proposes paying a €8,400 claim when its limit is €5,000. Control holds it and asks the adjuster to sign with the full file. The adjuster signs, the claim is paid and the receipt is kept.",
        ],
        challenge: "Agents already prepare payments and claims, and DORA requires controlling them.",
        help: "Limits by amount and risk, human signature on critical actions and Passport for supervisors.",
        steps: [
          "An agent proposes paying a €8,400 claim, with a €5,000 limit.",
          "Control holds it and asks the adjuster to sign with the full file.",
          "The adjuster signs; it is paid and the receipt is kept.",
        ],
      },
      {
        id: "administracion",
        tag: "Public administration",
        norm: "AI Act",
        title: "AI prepares the file. The competent person decides.",
        body: [
          "A decision affecting rights cannot be signed by a machine, and citizens have the right to ask for review. Control lets AI prepare the file but requires the competent body's signature. The receipt explains what AI did and who decided.",
          "For example, an agent prepares the decision on a public grant. Because it has legal effects, Control requires a human decision. The competent body reviews and signs, AI involvement is disclosed and the applicant can ask for review.",
        ],
        challenge: "A decision affecting rights cannot be signed by a machine.",
        help: "AI prepares, the competent body signs and the receipt explains who decided.",
        steps: [
          "An agent prepares the decision on a public grant.",
          "Control requires a human decision because of its legal effects.",
          "The body signs; AI involvement is disclosed and review can be requested.",
        ],
      },
      {
        id: "proveedores",
        tag: "Large companies and suppliers",
        norm: "NIS2",
        title: "Verify hundreds of suppliers without repeating questionnaires.",
        body: [
          "NIS2 requires managing supply chain security, and more and more suppliers use AI. The company asks each supplier for its Passport and verifies it automatically. If a credential expires or is revoked, it knows at once.",
          "For example, in the quarterly review the company verifies all credentials at once and only asks for more from those who fall short.",
        ],
        challenge: "NIS2 requires overseeing the supply chain, and more suppliers use AI.",
        help: "Ask each supplier for its Passport and verify it automatically.",
        steps: [
          "In the quarterly review, the company asks suppliers for their Passport.",
          "It verifies them all at once: valid, expired or revoked.",
          "It only asks for more from those who fall short.",
        ],
      },
      {
        id: "integradores",
        tag: "AI vendors and integrators",
        norm: "Regulated clients",
        title: "Sell to regulated clients with control built in.",
        body: [
          "Regulated clients ask for proof of control before letting an agent touch their systems. Build Control into your product and deliver your own Passport: your client sees rules, signatures and receipts from day one.",
          "For example, an integrator deploys its agents in a hospital, behind Control. The hospital sets the rules and who signs, gets a receipt for every action, and the integrator presents its Passport in the tender.",
        ],
        challenge: "Regulated clients ask for proof of control before opening their systems.",
        help: "Build Control into your product and deliver your own Passport.",
        steps: [
          "An integrator deploys its agents in a hospital, behind Control.",
          "The hospital sets rules and who signs, and gets a receipt for every action.",
          "The integrator presents its Passport in the tender.",
        ],
      },
    ],
    closingTitle: "Your sector is not here? Tell us your case.",
  },
};

export const pagesContent: Record<Lang, PagesContent> = { es, en };
