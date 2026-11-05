import type { Lang } from "./content";

type Pair = readonly [string, string];
type Quad = readonly [string, string, string, string];
type ConsoleRow = readonly [string, string, string, "pass" | "fail"];
type Verdict = readonly [string, string, string, "ok" | "danger" | "hold"];
type Status = "dev" | "pilot" | "planned";
type StatusTriple = readonly [string, string, Status];
type Layer = readonly [string, string, string, string, Status];
type Solution = {
  id: string;
  tag: string;
  norm: string;
  title: string;
  body: readonly string[];
  check: string;
  private: string;
};

const es = {
  status: { dev: "En desarrollo", pilot: "Se validará en el piloto", planned: "Previsto" } as Record<Status, string>,
  control: {
    eyebrow: "Control · Pasarela de autorización para agentes de IA",
    title: "Cada operación que conectes a Control tendrá que pasar por él antes de ejecutarse.",
    lead: "Control está pensado para situarse entre tus agentes de IA y tus sistemas: comprobará cada operación conectada, la permitirá, la bloqueará o pedirá la firma de una persona, y dejará un recibo firmado.",
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
    decideIntro: "Antes de que un agente actúe, Control comprobará cinco cosas:",
    questions: [
      ["¿Quién lo pide?", "La identidad del agente y quién es su responsable."],
      ["¿En nombre de quién?", "Que el mandato cubra esa acción."],
      ["¿Para qué?", "Que la finalidad sea la autorizada. Vendrá del mandato o de la tarea que asignó una persona o un sistema autorizado, no de lo que diga el agente."],
      ["¿Con qué datos?", "Solo los necesarios."],
      ["¿Con qué impacto?", "Importe, destinatario, datos sensibles, efectos sobre personas o irreversibles."],
    ] as Pair[],
    verdicts: [
      ["Permitir", "Bajo riesgo y dentro del mandato", "La acción se ejecutará y quedará su recibo firmado.", "ok"],
      ["Esperar a una persona", "Crítica o por encima de un límite", "Control la retendrá hasta que una persona competente la revise y la firme.", "hold"],
      ["Bloquear", "Fuera de mandato o sospechosa", "Control la bloqueará, explicará el motivo al agente y avisará a su responsable.", "danger"],
    ] as Verdict[],
    ruleLine: "Solo las reglas y la firma de una persona darán luz verde. Los módulos automáticos de privacidad y seguridad nunca aprobarán nada: solo podrán añadir restricciones, como ocultar datos, subir el nivel de riesgo o parar al agente.",
    codeKicker: "Por dentro",
    codeTitle: "Reglas legibles, recibos verificables.",
    codeCopy: "Cada regla tendrá su versión registrada. Cada decisión dejará un recibo firmado que un tercero podrá verificar sin depender de Gleam Peak AI.",
    policyLabel: "Regla",
    receiptLabel: "Recibo firmado",
    modulesKicker: "Qué incluye",
    modulesTitle: "Lo que hará Control.",
    modulesText: [
      ["Conocer y autorizar", "Un registro de los agentes y de quién responde de cada uno. Mandatos que dirán en nombre de quién actúa cada agente, para qué y hasta cuándo. Y reglas que decidirán qué se permite, qué se bloquea y qué espera a una persona.", "dev"],
      ["Controlar y decidir", "Un punto de control por el que pasará cada operación conectada antes de ejecutarse. Privacidad para usar solo los datos necesarios, controles de seguridad que podrán subir el nivel de riesgo o parar al agente ante señales sospechosas, con un botón de parada, y aprobaciones en las que una persona firmará la acción exacta.", "dev"],
      ["Demostrar", "Recibos firmados y encadenados de cada decisión. La verificación por un tercero, sin depender de nosotros, se validará en el piloto. Más adelante, paquetes de evidencia para auditorías y para las personas afectadas por una decisión.", "dev"],
    ] as StatusTriple[],
    closingTitle: "¿Te interesa pilotar Control con uno de tus agentes?",
  },
  passport: {
    eyebrow: "Passport · Credencial verificable de controles",
    title: "Demuestra que usas la IA con control, sin mostrar tus datos.",
    lead: "Una credencial verificable de controles, basada en estándares abiertos, que podrás presentar a un banco, un cliente o un auditor. Con pruebas zero knowledge comprobarán que cumples las condiciones de la credencial (agentes registrados, firma humana en lo crítico y controles básicos) sin ver tus datos. Caducará y se podrá revocar.",
    flow: ["Datos firmados", "Pruebas zero knowledge", "Verificación", "Resultado"],
    flowNote: "Los datos no salen de tu organización. Solo viaja la prueba.",
    flowDetail: "La prueba se calculará dentro de tu organización a partir de los recibos firmados. Gleam Peak AI comprobará la prueba y firmará la credencial sin recibir tus recibos ni tus datos.",
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
      exposed: ["El banco ve: condiciones, emisor y validez.", "No ve: tus datos internos."] as Pair,
    },
    layersKicker: "Qué demuestra",
    layersTitle: "Tres capas que se suman con el tiempo.",
    layers: [
      ["01", "Ciberseguridad básica", "Autenticación multifactor, copias probadas y parches al día.", "Fuente: herramienta conectada, auditor o declaración de la empresa marcada como tal.", "dev"],
      ["02", "Uso responsable de la IA", "Agentes con responsable, firma humana en lo crítico y ningún dato fuera de mandato.", "Fuente: recibos firmados de Control.", "pilot"],
      ["03", "Condiciones para recibir mandatos", "Lo que otra organización exige antes de que tus agentes actúen en su nombre.", "Base de la red entre organizaciones.", "planned"],
    ] as Layer[],
    falseData: "Una prueba no convierte en verdadero un dato falso. Por eso cada condición indicará su fuente: una herramienta conectada, un auditor o una declaración de la empresa marcada como tal. Más adelante, la credencial podrá llevar también la firma de un auditor o de otra entidad que el verificador ya conozca.",
    caseKicker: "Ejemplo ilustrativo",
    caseTitle: "Un banco podría dar de alta a un proveedor con menos cuestionarios repetidos.",
    caseCopy: [
      "Un banco tiene que vigilar la seguridad de sus proveedores. Hoy eso significa cuestionarios, documentos y auditorías que se repiten con cada cliente. Con Passport, el proveedor podría presentar su credencial y el banco, comprobarla en ese momento.",
      "La prueba zero knowledge se calcularía dentro del proveedor a partir de los recibos firmados de Control del periodo. Gleam Peak AI la comprobaría y firmaría el Passport sin recibir esos recibos, y el banco comprobaría la firma, la caducidad y la revocación. Vería las condiciones, el emisor y la validez, pero no los datos internos del proveedor ni los de sus clientes.",
    ],
    faqKicker: "Preguntas frecuentes",
    faqTitle: "Qué es y qué no es.",
    faq: [
      ["¿Y si un dato es falso?", "Una prueba no convierte en verdadero un dato falso: solo demuestra algo sobre datos firmados por su fuente. Por eso cada condición indicará de dónde sale, y una atestación sin firma válida no se aceptará."],
      ["¿Qué es?", "Una credencial verificable de controles, basada en estándares abiertos. No es un sello oficial."],
      ["¿Qué recibe Gleam Peak AI para emitirla?", "Solo la prueba. Según el diseño previsto, la prueba se calculará dentro de tu organización a partir de los recibos firmados; Gleam Peak AI comprobará la prueba y firmará la credencial sin recibir tus recibos ni tus datos. Más adelante, la credencial podrá llevar también la firma de un auditor o de otra entidad que el verificador ya conozca."],
      ["¿Demuestra que todas las operaciones pasaron por Control?", "No por sí sola. Demostrará lo que dicen los recibos de las operaciones conectadas. Qué operaciones están conectadas se declarará en la credencial y, en su caso, lo revisará un auditor."],
      ["¿Hace falta usar Control?", "No. Control aportará valor desde el primer día dentro de tu organización. Passport lo ampliará cuando tus clientes o auditores quieran verificarlo, y la capa de ciberseguridad básica no depende de Control."],
      ["¿Sustituye una auditoría?", "No. Está pensado para que demostrar la confianza sea más rápido y continuo entre auditorías. Tampoco bastará por sí solo para cumplir el Reglamento de IA: el cumplimiento depende de cada organización y de su evaluación jurídica."],
      ["¿Cómo se verifica?", "Se podrá verificar desde una página o con una llamada a la API. Quien verifica verá el estado y las condiciones, nunca las evidencias."],
    ] as Pair[],
    closingTitle: "¿Te piden pruebas de cómo controlas tus agentes?",
  },
  solutions: {
    eyebrow: "Integradores, banca, seguros y administración",
    tabsLabel: "Sectores",
    title: "El mismo núcleo, adaptado a cada sector.",
    lead: "Empezamos por integradores y proveedores de agentes que ejecutan operaciones sensibles para banca, seguros o administración. Control y Passport serán iguales para todos: cambian las reglas, quién firma y a quién hay que demostrarlo.",
    firstLabel: "Primer perfil",
    othersKicker: "Aplicaciones posibles",
    othersTitle: "El mismo núcleo en otros sectores.",
    checkLabel: "Qué necesita comprobar el otro",
    privateLabel: "Qué sigue siendo privado",
    matrixKicker: "Qué cambia",
    matrixTitle: "Cuatro sectores, tres diferencias.",
    matrixHead: ["Sector", "Marco", "Quién firma", "A quién se demuestra"] as Quad,
    matrix: [
      ["Integradores y proveedores de agentes", "Lo que exija el cliente", "Quien defina el cliente", "Clientes regulados y licitaciones"],
      ["Banca y seguros", "DORA", "Perito o persona competente", "Supervisores y socios"],
      ["Administración pública", "Reglamento de IA", "Órgano competente", "Ciudadanía, con derecho a revisión"],
      ["Gran empresa y proveedores", "NIS2", "El responsable de compras o de seguridad", "La propia empresa, de forma automática"],
    ] as Quad[],
    items: [
      {
        id: "integradores",
        tag: "Integradores y proveedores de agentes",
        norm: "Lo que exija el cliente",
        title: "Llega a clientes regulados con el control integrado.",
        body: [
          "Los clientes regulados piden pruebas de control antes de dejar que un agente toque sus sistemas. Podrás integrar Control en tu producto y entregar tu propio Passport: tu cliente verá las reglas, las firmas y los recibos desde el primer día.",
          "Tú integras y operas Control; tu cliente define las reglas y quién firma, y conserva los recibos.",
          "Por ejemplo, un integrador desplegaría sus agentes en un banco, detrás de Control. El banco definiría las reglas y quién firma y recibiría un recibo de cada acción, y el integrador presentaría su Passport en la evaluación de proveedores del banco.",
        ],
        check: "Tu cliente regulado necesita comprobar que tus agentes están registrados, actúan bajo mandato y piden firma humana en lo crítico.",
        private: "Los datos de tus otros clientes y los detalles internos de tu producto.",
      },
      {
        id: "banca",
        tag: "Banca y seguros",
        norm: "DORA",
        title: "Pagos y siniestros con firma humana donde importa.",
        body: [
          "Cada vez más agentes de IA preparan pagos y gestionan siniestros, y DORA exige controlar la tecnología y a los proveedores. Control fijará límites por importe y riesgo y pedirá la firma de una persona en lo crítico. Passport lo demostrará ante supervisores y socios.",
          "Por ejemplo, un agente propondría pagar un siniestro de 8.400 € cuando su límite es de 5.000 €. Control lo retendría y pediría la firma del perito con el expediente completo. El perito firmaría, se pagaría y quedaría el recibo.",
        ],
        check: "Supervisores y socios necesitan comprobar que los pagos y siniestros por encima del límite llevan la firma de una persona competente.",
        private: "Los expedientes, los importes concretos y los datos de clientes y asegurados.",
      },
      {
        id: "administracion",
        tag: "Administración pública",
        norm: "Reglamento de IA",
        title: "La IA prepara el expediente. La persona competente decide.",
        body: [
          "Control dejará que la IA prepare el expediente. Cuando la organización decida que una resolución necesita decisión humana, Control exigirá la firma del órgano competente. El recibo explicará qué hizo la IA y quién decidió, y servirá de apoyo si la ciudadanía pide que se revise.",
          "Por ejemplo, un agente prepararía la resolución de una ayuda pública. Si la organización ha decidido que esa resolución necesita decisión humana, Control la retendría hasta que el órgano competente la revisara y la firmara. Se notificaría que intervino una IA y la persona interesada podría pedir revisión.",
        ],
        check: "La ciudadanía y los órganos de control necesitan comprobar que decidió una persona competente y que se informó de la intervención de la IA.",
        private: "Ante terceros, los datos personales de quienes solicitan y el contenido de cada expediente.",
      },
      {
        id: "proveedores",
        tag: "Gran empresa y proveedores",
        norm: "NIS2",
        title: "Verificar proveedores con menos cuestionarios repetidos.",
        body: [
          "NIS2 obliga a gestionar la seguridad de la cadena de proveedores, y cada vez más proveedores usan IA. La empresa podrá pedir el Passport a cada uno y verificarlo de forma automática. Si una credencial caduca o se revoca, lo sabrá en la siguiente verificación.",
          "Por ejemplo, en la revisión trimestral la empresa verificaría todas las credenciales a la vez y solo pediría más información a quien no cumpla.",
        ],
        check: "La empresa necesita comprobar que cada proveedor cumple las condiciones de seguridad que le exige, como autenticación multifactor o copias probadas.",
        private: "La configuración interna, las herramientas y los registros de cada proveedor.",
      },
    ] as Solution[],
    closingTitle: "¿Tu sector no aparece? Cuéntanos tu caso.",
  },
};

type PagesContent = typeof es;

const en: PagesContent = {
  status: { dev: "In development", pilot: "To be validated in the pilot", planned: "Planned" },
  control: {
    eyebrow: "Control · Authorisation gateway for AI agents",
    title: "Every operation you connect to Control will have to pass through it before it runs.",
    lead: "Control is designed to sit between your AI agents and your systems: it will check every connected operation, allow it, block it or ask a person to sign it off, and leave a signed receipt.",
    console: {
      label: "Illustration of an action blocked by Control",
      window: "gleam-peak · control",
      operation: "Export customer records",
      detail: "12,000 records · customer service agent",
      rows: [
        ["ID", "Agent identity", "Verified", "pass"],
        ["M", "Mandate", "Does not cover exports", "fail"],
        ["D", "Personal data", "Outside the purpose", "fail"],
      ],
      decision: "Blocked · reason sent to the agent and security alerted",
      stop: "Stop agent",
      receipt: "Signed receipt",
      signed: "Signed",
    },
    decideKicker: "How it decides",
    decideTitle: "Five questions, three answers.",
    decideIntro: "Before an agent acts, Control will check five things:",
    questions: [
      ["Who is asking?", "The agent's identity and who is responsible for it."],
      ["On whose behalf?", "That the mandate covers the action."],
      ["What for?", "That the purpose is the authorised one. It will come from the mandate or from the task assigned by a person or an authorised system, not from what the agent says."],
      ["With which data?", "Only the data it needs."],
      ["With what impact?", "Amount, recipient, sensitive data, effects on people or irreversible effects."],
    ],
    verdicts: [
      ["Allow", "Low risk and within the mandate", "The action will run and leave a signed receipt.", "ok"],
      ["Wait for a person", "Critical or over a limit", "Control will hold it until a competent person reviews and signs it.", "hold"],
      ["Block", "Outside the mandate or suspicious", "Control will block it, tell the agent why and alert the person responsible.", "danger"],
    ],
    ruleLine: "Only rules and a person's signature will be able to give the green light. The automated privacy and security modules will never approve anything: they can only add restrictions, such as masking data, raising the risk level or stopping the agent.",
    codeKicker: "Under the hood",
    codeTitle: "Readable rules, verifiable receipts.",
    codeCopy: "Every rule will have a recorded version. Every decision will leave a signed receipt that a third party can verify without relying on Gleam Peak AI.",
    policyLabel: "Rule",
    receiptLabel: "Signed receipt",
    modulesKicker: "What it includes",
    modulesTitle: "What Control will do.",
    modulesText: [
      ["Know and authorise", "A registry of agents and of who is responsible for each one. Mandates that will state on whose behalf each agent acts, what for and until when. And rules that will decide what is allowed, what is blocked and what waits for a person.", "dev"],
      ["Control and decide", "A checkpoint that every connected operation will pass through before it runs. Privacy controls so that only the data needed is used, security controls that will be able to raise the risk level or stop the agent on suspicious signals, with a stop button, and approvals in which a person will sign off the exact action.", "dev"],
      ["Prove", "Signed, chained receipts for every decision. Third-party verification, without relying on us, will be validated in the pilot. Later, evidence packages for audits and for the people affected by a decision.", "dev"],
    ],
    closingTitle: "Interested in piloting Control with one of your agents?",
  },
  passport: {
    eyebrow: "Passport · Verifiable controls credential",
    title: "Prove your AI is under control, without showing your data.",
    lead: "A verifiable controls credential, built on open standards, that you will be able to present to a bank, a client or an auditor. With zero knowledge proofs they will check that you meet its conditions (registered agents, human sign-off on critical actions and basic controls) without seeing your data. It will expire and can be revoked.",
    flow: ["Signed data", "Zero knowledge proofs", "Verification", "Result"],
    flowNote: "Your data stays inside your organisation. Only the proof travels.",
    flowDetail: "The proof will be computed inside your organisation from the signed receipts. Gleam Peak AI will check the proof and sign the credential without receiving your receipts or your data.",
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
        ["Human sign-off on critical operations", "Receipts"],
        ["No data access outside the mandate", "Receipts"],
        ["Multi-factor authentication", "Tool"],
        ["Tested backups", "Auditor"],
      ],
      exposed: ["The bank sees: conditions, issuer and validity.", "It does not see: your internal data."],
    },
    layersKicker: "What it proves",
    layersTitle: "Three layers that build up over time.",
    layers: [
      ["01", "Basic cybersecurity", "Multi-factor authentication, tested backups and up-to-date patching.", "Source: a connected tool, an auditor or a company declaration marked as such.", "dev"],
      ["02", "Responsible use of AI", "Agents with an owner, human sign-off on critical actions and no data used outside the mandate.", "Source: signed receipts from Control.", "pilot"],
      ["03", "Conditions for receiving mandates", "What another organisation requires before your agents can act on its behalf.", "The basis of the network between organisations.", "planned"],
    ],
    falseData: "A proof cannot make false data true. That is why each condition will show its source: a connected tool, an auditor or a company declaration marked as such. Later on, the credential may also carry the signature of an auditor or another body the verifier already knows.",
    caseKicker: "Illustrative example",
    caseTitle: "A bank could onboard a supplier with fewer repeated questionnaires.",
    caseCopy: [
      "A bank has to keep an eye on its suppliers' security. Today that means questionnaires, documents and audits repeated for every client. With Passport, the supplier could present its credential and the bank could check it straight away.",
      "The zero knowledge proof would be computed inside the supplier from Control's signed receipts for the period. Gleam Peak AI would check it and sign the Passport without receiving those receipts, and the bank would check its signature, expiry and revocation status. It would see the conditions, the issuer and the validity, but not the internal data of the supplier or its clients.",
    ],
    faqKicker: "FAQ",
    faqTitle: "What it is and what it is not.",
    faq: [
      ["What if some of the data is false?", "A proof cannot make false data true: it only proves something about data signed by its source. That is why each condition will show where it comes from, and an attestation without a valid signature will be rejected."],
      ["What is it?", "A verifiable controls credential, built on open standards. It is not an official seal."],
      ["What does Gleam Peak AI receive to issue it?", "Only the proof. Under the planned design, the proof will be computed inside your organisation from the signed receipts; Gleam Peak AI will check the proof and sign the credential without receiving your receipts or your data. Later on, the credential may also carry the signature of an auditor or another body the verifier already knows."],
      ["Does it prove that every operation went through Control?", "Not on its own. It will prove what the receipts of the connected operations say. Which operations are connected will be stated in the credential and, where appropriate, reviewed by an auditor."],
      ["Do I need to use Control?", "No. Control will add value from day one inside your organisation. Passport will extend it when your clients or auditors want to verify it, and the basic cybersecurity layer does not depend on Control."],
      ["Does it replace an audit?", "No. It is designed to make demonstrating trust faster and continuous between audits. Nor will it be enough on its own to comply with the EU AI Act: compliance depends on each organisation and its legal assessment."],
      ["How is it verified?", "It will be verifiable from a web page or with an API call. The verifier will see the status and the conditions, never the evidence."],
    ],
    closingTitle: "Are you being asked to prove how you control your agents?",
  },
  solutions: {
    eyebrow: "Integrators, banking, insurance and the public sector",
    tabsLabel: "Sectors",
    title: "The same core, adapted to each sector.",
    lead: "We are starting with integrators and agent providers that run sensitive operations for banking, insurance or the public sector. Control and Passport will be the same for everyone: what changes are the rules, who signs and who you need to prove it to.",
    firstLabel: "First profile",
    othersKicker: "Possible applications",
    othersTitle: "The same core in other sectors.",
    checkLabel: "What the other party needs to check",
    privateLabel: "What stays private",
    matrixKicker: "What changes",
    matrixTitle: "Four sectors, three differences.",
    matrixHead: ["Sector", "Framework", "Who signs", "Proven to"],
    matrix: [
      ["Integrators and agent providers", "Whatever the client requires", "Whoever the client designates", "Regulated clients and tenders"],
      ["Banking and insurance", "DORA", "Claims adjuster or competent person", "Supervisors and partners"],
      ["Public sector", "EU AI Act", "Competent body", "Citizens, with the right to a review"],
      ["Large companies and suppliers", "NIS2", "Procurement or security lead", "The company itself, automatically"],
    ],
    items: [
      {
        id: "integradores",
        tag: "Integrators and agent providers",
        norm: "Whatever the client requires",
        title: "Reach regulated clients with control built in.",
        body: [
          "Regulated clients ask for proof of control before letting an agent anywhere near their systems. You will be able to build Control into your product and provide your own Passport: your client will see the rules, signatures and receipts from day one.",
          "You integrate and operate Control; your client sets the rules and who signs, and keeps the receipts.",
          "For example, an integrator would deploy its agents at a bank, behind Control. The bank would set the rules and who signs and get a receipt for every action, and the integrator would present its Passport in the bank's supplier assessment.",
        ],
        check: "Your regulated client needs to check that your agents are registered, act under a mandate and ask for a human signature on critical actions.",
        private: "Your other clients' data and the internals of your product.",
      },
      {
        id: "banca",
        tag: "Banking and insurance",
        norm: "DORA",
        title: "Payments and claims with a human signature where it matters.",
        body: [
          "More and more AI agents prepare payments and handle claims, and DORA requires control over technology and third-party providers. Control will set limits by amount and risk and ask a person to sign off critical actions. Passport will prove it to supervisors and partners.",
          "For example, an agent would propose paying a €8,400 claim when its limit is €5,000. Control would hold it and ask the claims adjuster to sign, with the full file in view. The adjuster would sign, the claim would be paid and the receipt would be kept.",
        ],
        check: "Supervisors and partners need to check that payments and claims above the limit carry a competent person's signature.",
        private: "The files, the exact amounts and the data of customers and policyholders.",
      },
      {
        id: "administracion",
        tag: "Public sector",
        norm: "EU AI Act",
        title: "AI prepares the file. The competent person decides.",
        body: [
          "Control will let AI prepare the file. When the organisation decides that a decision needs a human to take it, Control will require the competent body's signature. The receipt will explain what the AI did and who decided, and will support any review that citizens ask for.",
          "For example, an agent would prepare the decision on a public grant. If the organisation has decided that this decision needs a human to take it, Control would hold it until the competent body had reviewed and signed it. The use of AI would be disclosed and the applicant could ask for a review.",
        ],
        check: "Citizens and oversight bodies need to check that a competent person made the decision and that the use of AI was disclosed.",
        private: "Towards third parties: applicants' personal data and the content of each file.",
      },
      {
        id: "proveedores",
        tag: "Large companies and suppliers",
        norm: "NIS2",
        title: "Verify suppliers with fewer repeated questionnaires.",
        body: [
          "NIS2 requires companies to manage supply chain security, and more and more suppliers use AI. The company will be able to ask each supplier for its Passport and verify it automatically. If a credential expires or is revoked, it will know at the next verification.",
          "For example, in the quarterly review the company would verify every credential in one go and only ask for more information from those that fall short.",
        ],
        check: "The company needs to check that each supplier meets the security conditions it requires, such as multi-factor authentication or tested backups.",
        private: "Each supplier's internal configuration, tools and logs.",
      },
    ],
    closingTitle: "Don't see your sector? Tell us about your use case.",
  },
};

export const pagesContent: Record<Lang, PagesContent> = { es, en };
