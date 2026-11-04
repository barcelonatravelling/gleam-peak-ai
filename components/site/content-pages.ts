import type { Lang } from "./content";

type Pair = readonly [string, string];
type Quad = readonly [string, string, string, string];
type ConsoleRow = readonly [string, string, string, "pass" | "fail"];
type Verdict = readonly [string, string, "ok" | "danger" | "hold"];
type Layer = readonly [string, string, string, string, "now" | "next"];
type Solution = {
  id: string;
  tag: string;
  norm: string;
  title: string;
  body: readonly string[];
};

const es = {
  control: {
    eyebrow: "Control · Prototipo en desarrollo",
    title: "Cada acción de un agente pasa por el control antes de ejecutarse.",
    lead: "Control está pensado para situarse entre tus agentes de IA y tus sistemas: comprobará cada acción, la permitirá, la bloqueará o pedirá la firma de una persona, y dejará un recibo firmado.",
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
      "Antes de que un agente actúe, Control se hará cinco preguntas: quién lo pide, en nombre de quién, para qué, con qué datos y con qué impacto. Para responderlas comprobará la identidad del agente y quién es su responsable, que el mandato cubre la acción, que la finalidad es la autorizada, que solo usa los datos necesarios y cuánto pesa la acción por importe, destinatario, datos sensibles o efectos sobre personas.",
      "Con eso responderá de tres formas. Si la acción es de bajo riesgo y está dentro del mandato, la permitirá. Si es crítica o pasa de un límite, esperará a que una persona competente la revise y la firme. Si está fuera de mandato o es sospechosa, la bloqueará, explicará el motivo al agente y avisará al responsable del agente.",
    ],
    verdicts: [
      ["Permitir", "Bajo riesgo y dentro del mandato", "ok"],
      ["Esperar a una persona", "Crítica o fuera de límite", "hold"],
      ["Bloquear", "Fuera de mandato o sospechosa", "danger"],
    ] as Verdict[],
    ruleLine: "Solo las reglas y la firma de una persona dan luz verde. Los módulos automáticos de privacidad y seguridad nunca aprueban nada: solo pueden añadir restricciones, como ocultar datos, subir el nivel de riesgo o parar al agente.",
    codeKicker: "Por dentro",
    codeTitle: "Reglas legibles, recibos verificables.",
    codeCopy: "Cada regla tiene su versión registrada. Cada decisión dejará un recibo firmado que un tercero podrá verificar sin depender de Gleam Peak AI.",
    policyLabel: "Regla",
    receiptLabel: "Recibo firmado",
    modulesKicker: "Qué incluye",
    modulesTitle: "Lo que hará Control.",
    modulesText: [
      ["Conocer y autorizar", "Un registro de los agentes y de quién responde de cada uno. Mandatos que dirán en nombre de quién actúa cada agente, para qué y hasta cuándo. Y reglas que decidirán qué se permite, qué se bloquea y qué espera a una persona."],
      ["Controlar y decidir", "Un punto de control por el que pasará toda acción antes de ejecutarse. Privacidad para usar solo los datos necesarios, seguridad para detectar manipulaciones con un botón de parada, y aprobaciones en las que una persona firma la acción exacta."],
      ["Demostrar", "Recibos firmados que un tercero podrá verificar sin depender de nosotros, y paquetes de evidencia para auditorías y para las personas afectadas por una decisión."],
    ] as Pair[],
    closingTitle: "¿Te interesa pilotar Control con uno de tus agentes?",
  },
  passport: {
    eyebrow: "Passport · Prototipo en desarrollo",
    title: "Demuestra que usas la IA con control, sin mostrar tus datos.",
    lead: "Una credencial verificable, basada en estándares abiertos, que presentas a un banco, un cliente o un auditor. Con pruebas zero knowledge comprueban que cumples sin ver tus datos. Caduca y se puede revocar.",
    flow: ["Datos firmados", "Pruebas zero knowledge", "Verificación", "Válido, caducado o revocado"],
    flowNote: "Los datos no salen de tu organización. Solo viaja la prueba.",
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
    faqKicker: "Preguntas frecuentes",
    faqTitle: "Qué es y qué no es.",
    faq: [
      ["¿Qué es?", "Una credencial verificable, basada en estándares abiertos. No es un sello oficial."],
      ["¿Sustituye una auditoría?", "No. Hace que demostrar la confianza sea más rápido y continuo entre auditorías."],
      ["¿Y si un dato es falso?", "Una prueba no convierte en verdadero un dato falso. Por eso cada condición indica su fuente."],
      ["¿Cómo se verifica?", "Se podrá verificar desde una página o con una llamada a la API. Quien verifica verá el estado y las condiciones, nunca las evidencias."],
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
      ["Banca y seguros", "DORA", "Perito o persona competente", "Supervisores y socios"],
      ["Administración pública", "Reglamento de IA", "Órgano competente", "Ciudadanía, con derecho a revisión"],
      ["Gran empresa y proveedores", "NIS2", "El responsable de compras o de seguridad", "La propia empresa, de forma automática"],
      ["Proveedores de IA e integradores", "Lo que exija el cliente", "Quien defina el cliente", "Clientes regulados y licitaciones"],
    ] as Quad[],
    items: [
      {
        id: "banca",
        tag: "Banca y seguros",
        norm: "DORA",
        title: "Pagos y siniestros con firma humana donde importa.",
        body: [
          "Cada vez más agentes de IA preparan pagos y gestionan siniestros, y DORA exige controlar la tecnología y a los proveedores. Control fijará límites por importe y riesgo y pedirá la firma de una persona en lo crítico. Passport lo demostrará ante supervisores y socios.",
          "Por ejemplo, un agente propone pagar un siniestro de 8.400 € cuando su límite es de 5.000 €. Control lo retiene y pide la firma del perito con el expediente completo. El perito firma, se paga y queda el recibo.",
        ],
      },
      {
        id: "administracion",
        tag: "Administración pública",
        norm: "Reglamento de IA",
        title: "La IA prepara el expediente. La persona competente decide.",
        body: [
          "Una resolución que afecta a derechos necesita una persona que responda de ella, y la ciudadanía puede pedir que se revise. Control dejará que la IA prepare el expediente, pero exigirá la firma del órgano competente. El recibo explicará qué hizo la IA y quién decidió.",
          "Por ejemplo, un agente prepara la resolución de una ayuda pública. Como tiene efectos jurídicos, Control exige una decisión humana. El órgano competente revisa y firma, se notifica que intervino una IA y la persona interesada puede pedir revisión.",
        ],
      },
      {
        id: "proveedores",
        tag: "Gran empresa y proveedores",
        norm: "NIS2",
        title: "Verifica a cientos de proveedores sin repetir cuestionarios.",
        body: [
          "NIS2 obliga a gestionar la seguridad de la cadena de proveedores, y cada vez más proveedores usan IA. La empresa podrá pedir el Passport a cada uno y verificarlo de forma automática. Si una credencial caduca o se revoca, lo sabrá al momento.",
          "Por ejemplo, en la revisión trimestral la empresa verifica todas las credenciales a la vez y solo pide más información a quien no cumple.",
        ],
      },
      {
        id: "integradores",
        tag: "Proveedores de IA e integradores",
        norm: "Lo que exija el cliente",
        title: "Llega a clientes regulados con el control integrado.",
        body: [
          "Los clientes regulados piden pruebas de control antes de dejar que un agente toque sus sistemas. Podrás integrar Control en tu producto y entregar tu propio Passport: tu cliente verá las reglas, las firmas y los recibos desde el primer día.",
          "Por ejemplo, un integrador despliega sus agentes en un hospital, detrás de Control. El hospital define las reglas y quién firma, recibe un recibo de cada acción, y el integrador presenta su Passport en la licitación.",
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
    lead: "Control is designed to sit between your AI agents and your systems: it will check every action, allow it, block it or ask a person to sign, and leave a signed receipt.",
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
      "Before an agent acts, Control will ask five questions: who is asking, on whose behalf, what for, with which data and with what impact. To answer them it will check the agent's identity and who owns it, that the mandate covers the action, that the purpose is the authorised one, that it only uses the data it needs and how much the action weighs in amount, recipient, sensitive data or effects on people.",
      "It will then answer in one of three ways. If the action is low risk and within the mandate, it will allow it. If it is critical or over a limit, it will wait for an approver to review and sign it. If it is outside the mandate or suspicious, it will block it, tell the agent why and alert the agent's owner.",
    ],
    verdicts: [
      ["Allow", "Low risk and within the mandate", "ok"],
      ["Wait for a person", "Critical or over the limit", "hold"],
      ["Block", "Outside the mandate or suspicious", "danger"],
    ],
    ruleLine: "Only rules and a person's signature can give the green light. The automated privacy and security modules never approve anything: they can only add restrictions, such as masking data, raising the risk level or stopping the agent.",
    codeKicker: "Under the hood",
    codeTitle: "Readable rules, verifiable receipts.",
    codeCopy: "Every rule has a recorded version. Every decision will leave a signed receipt that a third party can verify without relying on Gleam Peak AI.",
    policyLabel: "Rule",
    receiptLabel: "Signed receipt",
    modulesKicker: "What it includes",
    modulesTitle: "What Control will do.",
    modulesText: [
      ["Know and authorise", "A registry of agents and who owns each one. Mandates that will say on whose behalf each agent acts, what for and until when. And rules that will decide what is allowed, what is blocked and what waits for a person."],
      ["Control and decide", "A checkpoint every action will pass through before it runs. Privacy to use only the data needed, security to detect tampering with a stop button, and approvals where a person signs the exact action."],
      ["Prove", "Signed receipts a third party will be able to verify without relying on us, and evidence packages for audits and for the people affected by a decision."],
    ],
    closingTitle: "Interested in piloting Control with one of your agents?",
  },
  passport: {
    eyebrow: "Passport · Prototype in development",
    title: "Prove you use AI with control, without showing your data.",
    lead: "A verifiable credential, built on open standards, that you present to a bank, a client or an auditor. With zero knowledge proofs they check that you comply without seeing your data. It expires and can be revoked.",
    flow: ["Signed data", "Zero knowledge proofs", "Verification", "Valid, expired or revoked"],
    flowNote: "Your data never leaves your organisation. Only the proof travels.",
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
    faqKicker: "FAQ",
    faqTitle: "What it is and what it is not.",
    faq: [
      ["What is it?", "A verifiable credential, built on open standards. It is not an official seal."],
      ["Does it replace an audit?", "No. It makes demonstrating trust faster and continuous between audits."],
      ["What if some data is false?", "A proof cannot make false data true. That is why each condition shows its source."],
      ["How is it verified?", "It will be verifiable from a page or with an API call. The verifier will see the status and the conditions, never the evidence."],
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
      ["Banking and insurance", "DORA", "Adjuster or approver", "Supervisors and partners"],
      ["Public administration", "EU AI Act", "Competent body", "Citizens, with the right to review"],
      ["Large companies and suppliers", "NIS2", "Procurement or security lead", "The company itself, automatically"],
      ["AI vendors and integrators", "What the client requires", "Whoever the client sets", "Regulated clients and tenders"],
    ],
    items: [
      {
        id: "banca",
        tag: "Banking and insurance",
        norm: "DORA",
        title: "Payments and claims with a human signature where it matters.",
        body: [
          "More and more AI agents prepare payments and handle claims, and DORA requires control over technology and suppliers. Control will set limits by amount and risk and ask a person to sign critical actions. Passport will prove it to supervisors and partners.",
          "For example, an agent proposes paying a €8,400 claim when its limit is €5,000. Control holds it and asks the adjuster to sign with the full file. The adjuster signs, the claim is paid and the receipt is kept.",
        ],
      },
      {
        id: "administracion",
        tag: "Public administration",
        norm: "EU AI Act",
        title: "AI prepares the file. The competent person decides.",
        body: [
          "A decision affecting rights needs a person who answers for it, and citizens can ask for it to be reviewed. Control will let AI prepare the file but require the competent body's signature. The receipt will explain what AI did and who decided.",
          "For example, an agent prepares the decision on a public grant. Because it has legal effects, Control requires a human decision. The competent body reviews and signs, AI involvement is disclosed and the applicant can ask for review.",
        ],
      },
      {
        id: "proveedores",
        tag: "Large companies and suppliers",
        norm: "NIS2",
        title: "Verify hundreds of suppliers without repeating questionnaires.",
        body: [
          "NIS2 requires managing supply chain security, and more and more suppliers use AI. The company will be able to ask each supplier for its Passport and verify it automatically. If a credential expires or is revoked, it will know at once.",
          "For example, in the quarterly review the company verifies all credentials at once and only asks for more from those who fall short.",
        ],
      },
      {
        id: "integradores",
        tag: "AI vendors and integrators",
        norm: "What the client requires",
        title: "Reach regulated clients with control built in.",
        body: [
          "Regulated clients ask for proof of control before letting an agent touch their systems. You will be able to build Control into your product and deliver your own Passport: your client will see rules, signatures and receipts from day one.",
          "For example, an integrator deploys its agents in a hospital, behind Control. The hospital sets the rules and who signs, gets a receipt for every action, and the integrator presents its Passport in the tender.",
        ],
      },
    ],
    closingTitle: "Don't see your sector? Tell us about your case.",
  },
};

export const pagesContent: Record<Lang, PagesContent> = { es, en };
