import type { Lang } from "./content";

type Pair = readonly [string, string];

type SecurityContent = {
  eyebrow: string;
  title: string;
  lead: string;
  threatsKicker: string;
  threatsTitle: string;
  threats: Pair[];
  scopeKicker: string;
  scopeTitle: string;
  doesTag: string;
  does: string[];
  doesNotTag: string;
  doesNot: string[];
  evidenceTitle: string;
  evidenceCopy: string;
  regulationTitle: string;
  regulationCopy: string;
  reportTitle: string;
  reportCopy: string;
};

type ResourcesContent = {
  eyebrow: string;
  title: string;
  lead: string;
  glossaryKicker: string;
  glossaryTitle: string;
  glossary: Pair[];
  faqKicker: string;
  faqTitle: string;
  faq: Pair[];
};

export const security: Record<Lang, SecurityContent> = {
  es: {
    eyebrow: "Ciberseguridad y confianza",
    title: "Diseñado para los riesgos propios de los agentes de IA",
    lead: "Gleam Peak AI es un prototipo en desarrollo que lleva los controles de ciberseguridad a las acciones de los agentes de IA. Aquí explicamos qué amenazas aborda, qué hará, qué no hará y cómo se tratará la evidencia.",
    threatsKicker: "Modelo de amenazas",
    threatsTitle: "Qué riesgos aborda",
    threats: [
      ["Instrucciones ocultas", "Un documento o una web intenta que el agente haga algo que nadie pidió. Control compara la operación resultante con el mandato y la política, no con la conversación."],
      ["Escalada de mandato", "El agente intenta actuar más allá de lo autorizado: otro destinatario, más importe u otros datos. Lo que queda fuera de límites se bloquea o se retiene."],
      ["Aprobaciones manipuladas", "Una aprobación genérica se usa para cubrir otra operación. Cada aprobación queda vinculada a la operación exacta y a la versión de la política."],
      ["Autorizaciones reutilizadas", "Un permiso antiguo se reaprovecha. Los mandatos tienen vigencia y pueden revocarse; si algo cambia, se pide de nuevo."],
      ["Suplantación de agentes", "Un sistema se hace pasar por un agente autorizado. Cada solicitud debe presentar una identidad verificable del agente y de quien lo opera."],
      ["Evidencia alterable", "Un registro que se puede editar no prueba nada. Los recibos estarán firmados y enlazarán solicitud, política, decisión y resultado."],
    ],
    scopeKicker: "Alcance",
    scopeTitle: "Qué hará y qué no hará el primer prototipo",
    doesTag: "Hará",
    does: [
      "Interceptará las operaciones HTTP y MCP definidas como protegidas",
      "Evaluará mandato, finalidad, límites y riesgo con un motor básico de políticas",
      "Retendrá operaciones hasta que decida una persona competente",
      "Emitirá un recibo firmado por cada decisión",
      "Emitirá un Passport de prueba con una prueba zero knowledge que un tercero podrá verificar",
    ],
    doesNotTag: "No hará",
    doesNot: [
      "No sustituirá a los sistemas de identidad ni de permisos existentes",
      "No evitará que un modelo se equivoque: controlará lo que llega a ejecutarse",
      "No bastará por sí solo para cumplir ninguna normativa",
      "No se ofrecerá todavía como servicio en producción",
    ],
    evidenceTitle: "Cómo se tratará la evidencia",
    evidenceCopy: "El diseño prevé recibos firmados digitalmente que guardan un resumen criptográfico de la operación en lugar de sus datos completos, y que conserva la organización que usa Control. La retención, la ubicación de los datos y la gestión de claves se definirán con cada piloto.",
    regulationTitle: "Relación con la regulación",
    regulationCopy: "El Reglamento de IA pide registros (art. 12) y supervisión humana (art. 14) en los sistemas de alto riesgo, y DORA exige gestionar el riesgo tecnológico en el sector financiero. Control aporta controles técnicos y evidencia que pueden ayudar en esos procesos; no sustituye la evaluación jurídica de cada organización.",
    reportTitle: "Comunicar un problema de seguridad",
    reportCopy: "Si encuentras una vulnerabilidad en esta web o en nuestros materiales, escríbenos a hello@gleampeak.ai con el asunto «Seguridad». Te pedimos que no la hagas pública hasta que hayamos podido revisarla.",
  },
  en: {
    eyebrow: "Cybersecurity and trust",
    title: "Designed for the risks specific to AI agents",
    lead: "Gleam Peak AI is a prototype in development that brings cybersecurity controls to the actions of AI agents. Here we explain which threats it addresses, what it will do, what it will not do and how evidence will be handled.",
    threatsKicker: "Threat model",
    threatsTitle: "Which risks it addresses",
    threats: [
      ["Hidden instructions", "A document or web page tries to make the agent do something nobody asked for. Control evaluates the resulting operation against the mandate and policy, not the conversation."],
      ["Mandate escalation", "The agent tries to act beyond what was authorised: another recipient, a larger amount or other data. Anything out of bounds is blocked or held."],
      ["Manipulated approvals", "A generic approval is used to cover a different operation. Each approval is bound to the exact operation and policy version."],
      ["Reused authorisations", "An old permission is reused. Mandates expire and can be revoked; if anything changes, approval is requested again."],
      ["Agent impersonation", "A system pretends to be an authorised agent. Every request must present a verifiable identity for the agent and for whoever operates it."],
      ["Alterable evidence", "A record that can be edited proves nothing. Receipts will be signed and will link request, policy, decision and outcome."],
    ],
    scopeKicker: "Scope",
    scopeTitle: "What the first prototype will and will not do",
    doesTag: "Will do",
    does: [
      "It will intercept the HTTP and MCP operations defined as protected",
      "It will evaluate mandate, purpose, limits and risk with a basic policy engine",
      "It will hold operations until a competent person decides",
      "It will issue a signed receipt for every decision",
      "It will issue a test Passport with a zero knowledge proof that a third party can verify",
    ],
    doesNotTag: "Will not do",
    doesNot: [
      "It will not replace existing identity or permission systems",
      "It will not stop a model from making mistakes: it will control what gets executed",
      "It will not be enough on its own to comply with any regulation",
      "It will not yet be offered as a production service",
    ],
    evidenceTitle: "How evidence will be handled",
    evidenceCopy: "The design provides for digitally signed receipts that store a cryptographic digest of the operation instead of its full data, kept by the organisation that runs Control. Retention, data location and key management will be defined with each pilot.",
    regulationTitle: "How it relates to regulation",
    regulationCopy: "The EU AI Act requires record-keeping (art. 12) and human oversight (art. 14) for high-risk systems, and DORA requires financial entities to manage technology risk. Control provides technical controls and evidence that can help in those processes; it does not replace each organisation's legal assessment.",
    reportTitle: "Reporting a security issue",
    reportCopy: "If you find a vulnerability in this website or our materials, write to hello@gleampeak.ai with the subject “Security”. Please do not disclose it publicly until we have been able to review it.",
  },
};

export const resources: Record<Lang, ResourcesContent> = {
  es: {
    eyebrow: "Recursos",
    title: "Conceptos clave y preguntas frecuentes",
    lead: "Lo esencial para entender el control de agentes de IA y cómo encaja Gleam Peak AI en una organización.",
    glossaryKicker: "Conceptos",
    glossaryTitle: "Glosario",
    glossary: [
      ["Control", "La parte de Gleam Peak AI que trabaja dentro de tu organización: comprueba cada acción de un agente antes de que se ejecute."],
      ["Passport", "La parte que mira hacia fuera: una credencial verificable que ayuda a demostrar que cumples, sin mostrar tus datos."],
      ["Zero knowledge", "Un tipo de prueba criptográfica que permite comprobar que algo se cumple sin ver los datos que hay detrás."],
      ["Mandato", "La autorización con la que actúa un agente: en nombre de quién, para qué, con qué límites y hasta cuándo."],
      ["Finalidad", "El propósito declarado de una operación. Una misma acción puede estar permitida para una finalidad y no para otra."],
      ["Regla", "Lo que fija la organización para decidir si una operación se permite, se bloquea o necesita aprobación humana."],
      ["Aprobación vinculada", "Una aprobación que solo vale para la operación exacta que se revisó. Si cambia cualquier dato, deja de ser válida."],
      ["Recibo firmado", "El registro firmado que une la solicitud, la regla aplicada, la decisión humana y el resultado."],
      ["Revocación", "Retirar o limitar un mandato antes de que caduque. La autoridad no se presume indefinida."],
      ["Servidor MCP", "Un servidor que expone herramientas a los agentes de IA mediante el Model Context Protocol."],
    ],
    faqKicker: "Dudas habituales",
    faqTitle: "Preguntas frecuentes",
    faq: [
      ["¿Sustituye a nuestro sistema de identidad y permisos?", "No. Ese sistema decide quién puede conectarse y a qué recursos. Control añade una decisión por operación: si esta acción concreta está autorizada ahora, para esta finalidad y bajo estas condiciones."],
      ["¿Servirá para agentes que usan MCP?", "Está previsto. El primer prototipo se diseña para interceptar operaciones MCP y llamadas HTTP a API."],
      ["¿Hay que reescribir los agentes?", "El objetivo es que no: Control está pensado para situarse delante de las herramientas. Cada agente sí tendrá que presentar su identidad y el mandato con el que actúa."],
      ["¿Dónde se guardan los datos y la evidencia?", "El diseño prevé que la evidencia la conserve la organización que usa Control. Los detalles de despliegue se acordarán en cada piloto."],
      ["¿Basta para cumplir el Reglamento de IA?", "No. Aporta controles técnicos y evidencia que ayudan a ejercer y demostrar la supervisión humana y la trazabilidad. El cumplimiento depende de cada organización y de su evaluación jurídica."],
      ["¿Qué diferencia hay entre Control y Passport?", "Control trabajará dentro de tu organización: decidirá qué puede hacer cada agente y dejará un recibo firmado de cada acción. Passport mira hacia fuera: es una credencial verificable que ayuda a demostrar a un banco, un cliente o un auditor que cumples, sin mostrar tus datos."],
      ["¿Cuándo se podrá probar?", "Gleam Peak AI es un prototipo en desarrollo. Según nuestro plan, sujeto a equipo y financiación, la versión demostrable llegará entre noviembre de 2026 y marzo de 2027, y los pilotos con clientes reales, entre abril y septiembre de 2027. Si te interesa participar, escríbenos desde Hablemos."],
    ],
  },
  en: {
    eyebrow: "Resources",
    title: "Key concepts and frequently asked questions",
    lead: "The essentials for understanding control of AI agents and how Gleam Peak AI fits into an organisation.",
    glossaryKicker: "Concepts",
    glossaryTitle: "Glossary",
    glossary: [
      ["Control", "The part of Gleam Peak AI that works inside your organisation: it checks every agent action before it runs."],
      ["Passport", "The part that faces outwards: a verifiable credential that helps prove you comply, without showing your data."],
      ["Zero knowledge", "A kind of cryptographic proof that lets someone check that something holds without seeing the data behind it."],
      ["Mandate", "The authorisation under which an agent acts: on whose behalf, for what, within which limits and until when."],
      ["Purpose", "The declared aim of an operation. The same action may be allowed for one purpose and not for another."],
      ["Rule", "What the organisation sets to decide whether an operation is allowed, blocked or needs human approval."],
      ["Bound approval", "An approval that is only valid for the exact operation that was reviewed. If any detail changes, it is no longer valid."],
      ["Signed receipt", "The signed record that links the request, the rule applied, the human decision and the outcome."],
      ["Revocation", "Withdrawing or restricting a mandate before it expires. Authority is not presumed indefinite."],
      ["MCP server", "A server that exposes tools to AI agents through the Model Context Protocol."],
    ],
    faqKicker: "Common questions",
    faqTitle: "Frequently asked questions",
    faq: [
      ["Does it replace our identity and access management?", "No. That system decides who can connect and to which resources. Control adds a decision per operation: whether this specific action is authorised now, for this purpose and under these conditions."],
      ["Will it work with agents that use MCP?", "That is the plan. The first prototype is being designed to intercept MCP operations and HTTP calls to APIs."],
      ["Do agents need to be rewritten?", "The aim is that they do not: Control is designed to sit in front of the tools. Each agent will need to present its identity and the mandate it acts under."],
      ["Where are data and evidence stored?", "The design provides for the evidence to be kept by the organisation that runs Control. Deployment details will be agreed for each pilot."],
      ["Is it enough to comply with the EU AI Act?", "No. It provides technical controls and evidence that help exercise and demonstrate human oversight and traceability. Compliance depends on each organisation and its legal assessment."],
      ["What is the difference between Control and Passport?", "Control will work inside your organisation: it will decide what each agent can do and leave a signed receipt for every action. Passport faces outwards: it is a verifiable credential that helps demonstrate to a bank, a client or an auditor that you comply, without showing your data."],
      ["When can we try it?", "Gleam Peak AI is a prototype in development. Under our plan, subject to team and funding, the demonstrable version will arrive between November 2026 and March 2027, and pilots with real clients between April and September 2027. If you would like to take part, write to us from Let's talk."],
    ],
  },
};
