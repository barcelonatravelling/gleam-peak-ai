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
  techKicker: string;
  techTitle: string;
  techCopy: string;
  techFaq: Pair[];
  evidenceTitle: string;
  evidenceCopy: string;
  regulationTitle: string;
  regulationCopy: string[];
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
    lead: "Gleam Peak AI es un prototipo en desarrollo que llevará los controles de ciberseguridad a las acciones de los agentes de IA. Aquí explicamos qué amenazas abordará, qué hará, qué no hará y cómo se tratará la evidencia.",
    threatsKicker: "Modelo de amenazas",
    threatsTitle: "Qué riesgos abordará",
    threats: [
      ["Instrucciones ocultas", "Un documento o una web intenta que el agente haga algo que nadie pidió. Control comparará la operación resultante con el mandato y la política, no con la conversación. La finalidad vendrá del mandato o de la tarea asignada, no de lo que diga el agente."],
      ["Escalada de mandato", "El agente intenta actuar más allá de lo autorizado: otro destinatario, más importe u otros datos. Lo que quede fuera de límites se bloqueará o se retendrá."],
      ["Aprobaciones manipuladas", "Una aprobación genérica se usa para cubrir otra operación. Cada aprobación quedará vinculada a la operación exacta y a la versión de la política."],
      ["Autorizaciones reutilizadas", "Un permiso antiguo se reaprovecha. Los mandatos tendrán vigencia y podrán revocarse; si algo cambia, se pedirá de nuevo."],
      ["Suplantación de agentes", "Un sistema se hace pasar por un agente autorizado. Cada solicitud deberá presentar una identidad verificable del agente y de quien lo opera, por ejemplo con TLS mutuo o credenciales de cliente OAuth."],
      ["Evidencia alterable", "Un registro que se puede editar no prueba nada. Los recibos estarán firmados y enlazarán solicitud, política, decisión y resultado."],
    ],
    scopeKicker: "Alcance",
    scopeTitle: "Qué hará y qué no hará el primer prototipo",
    doesTag: "Hará",
    does: [
      "Actuará como intermediario de las llamadas HTTP y MCP definidas como protegidas",
      "Evaluará mandato, finalidad, límites y riesgo con un motor básico de políticas",
      "Retendrá operaciones hasta que decida una persona competente",
      "Emitirá un recibo firmado por cada decisión",
      "Emitirá un Passport v0 con una condición demostrada con zero knowledge, que un tercero podrá verificar",
    ],
    doesNotTag: "No hará",
    doesNot: [
      "No sustituirá a los sistemas de identidad ni de permisos existentes",
      "No evitará que un modelo se equivoque: controlará lo que llega a ejecutarse",
      "No bastará por sí solo para cumplir ninguna normativa",
      "No se ofrecerá todavía como servicio en producción",
    ],
    techKicker: "Para equipos técnicos",
    techTitle: "Preguntas de un responsable técnico",
    techCopy: "Respuestas según los requisitos técnicos del prototipo. Describen cómo está diseñado, no algo ya construido.",
    techFaq: [
      ["¿Cómo se evita que el agente eluda Control?", "El sistema protegido solo aceptará operaciones que lleguen con una autorización de ejecución firmada por Control, ligada a esa operación, de un solo uso y de validez muy corta. Está pensado para que el agente no tenga una vía directa: una llamada que no pase por Control se rechazará. Para eso, el sistema protegido tendrá que verificar esa autorización, o Control guardará las credenciales de acceso para que el agente no las tenga."],
      ["¿Qué pasa si Control no responde?", "Se bloqueará por defecto. Si el motor de reglas falla, tarda demasiado o da una respuesta incompleta, la operación quedará bloqueada con su motivo y se avisará. Si no se puede guardar el recibo, no se ejecutará nada. Si una ejecución queda sin confirmar, se marcará como pendiente de conciliar y no se repetirá automáticamente. El procedimiento de emergencia, con su propio registro, se acordará con cada piloto."],
      ["¿Cómo se consigue que se ejecute exactamente lo aprobado?", "Control calculará la huella criptográfica de la operación: acción, parámetros, importe, destinatario, documentos y mandato. La firma de la persona quedará ligada a esa huella; justo antes de ejecutar se recalculará y, si algo ha cambiado, habrá que aprobar de nuevo."],
      ["¿Cómo se distinguen un intento, una autorización y una ejecución?", "Cada operación seguirá una lista cerrada de estados, como recibida, retenida, aprobada, ejecutada o bloqueada, y solo Control podrá cambiarlos. Cada cambio dejará su propio recibo firmado y encadenado, y un intento rechazado también quedará registrado."],
      ["¿Qué demuestra cada prueba de Passport y sobre qué periodo?", "Cada credencial dirá qué condiciones se cumplen, de qué fuente sale cada una, cuándo se emitió y cuándo caduca. La prueba zero knowledge demostrará que esas condiciones se cumplen a partir de datos firmados por su fuente, sin revelar fechas, herramientas ni detalles. Cada condición fijará su propio periodo de referencia."],
      ["¿Demuestra que todas las operaciones pasaron por Control?", "No por sí sola. Demostrará lo que dicen los recibos de las operaciones conectadas. Qué operaciones están conectadas se declarará en la credencial y, en su caso, lo revisará un auditor."],
      ["¿Quién firma, quién custodia las claves y cómo se revocan?", "Control firmará los recibos con una clave distinta de la que autoriza ejecuciones, y cada persona que aprueba firmará con la suya. La forma de autenticación y firma de quien aprueba se adaptará a la que ya use cada organización. Cada organización publicará sus claves públicas, y la lista de confianza de Passport la mantendrá el emisor. Una clave se podrá rotar dejando constancia firmada, y los mandatos y las credenciales se podrán revocar. La custodia se acordará con cada piloto."],
      ["¿Dónde se ejecutará Control?", "Previsto para desplegarse en la infraestructura del cliente o en su nube. Otras opciones se valorarán con cada piloto."],
      ["¿Qué rendimiento tendrá?", "Se medirá en la versión demostrable. No daremos cifras hasta tenerlas medidas."],
    ],
    evidenceTitle: "Cómo se tratará la evidencia",
    evidenceCopy: "El diseño prevé recibos firmados digitalmente que guardan un resumen criptográfico de la operación en lugar de sus datos completos, con una clave propia de cada organización para que el resumen no permita reconstruir los datos. Los conservará la organización que usa Control. La retención, la ubicación de los datos y la gestión de claves se definirán con cada piloto.",
    regulationTitle: "Relación con la regulación",
    regulationCopy: [
      "El Reglamento de IA pide registros (art. 12) y supervisión humana (art. 14) en los sistemas de alto riesgo, y DORA exige gestionar el riesgo tecnológico en el sector financiero. NIS2 pide gestionar la seguridad de la cadena de proveedores: Passport podrá ayudar a demostrarla ante clientes.",
      "En el RGPD, Control podrá ayudar a demostrar que cada agente usa solo los datos necesarios para una finalidad autorizada y quién decidió en lo que afecta a personas. En el ENS, los recibos podrán servir de registro de la actividad y los accesos de los agentes, y ayudar a demostrar las medidas de trazabilidad y control de acceso.",
      "Control aportará controles técnicos y evidencia que pueden ayudar en esos procesos; no sustituirá la evaluación jurídica de cada organización.",
    ],
    reportTitle: "Comunicar un problema de seguridad",
    reportCopy: "Si encuentras una vulnerabilidad en esta web o en nuestros materiales, escríbenos a hello@gleampeak.ai con el asunto «Seguridad». Te pedimos que no la hagas pública hasta que hayamos podido revisarla.",
  },
  en: {
    eyebrow: "Cybersecurity and trust",
    title: "Designed for the risks specific to AI agents",
    lead: "Gleam Peak AI is a prototype in development that will bring cybersecurity controls to the actions of AI agents. This page explains which threats it will address, what it will and will not do, and how evidence will be handled.",
    threatsKicker: "Threat model",
    threatsTitle: "Which risks it will address",
    threats: [
      ["Hidden instructions", "A document or web page tries to make the agent do something nobody asked for. Control will assess the resulting operation against the mandate and the policy, not against the conversation. The purpose will come from the mandate or the assigned task, not from what the agent says."],
      ["Mandate escalation", "The agent tries to act beyond what was authorised: another recipient, a larger amount or other data. Anything out of bounds will be blocked or held."],
      ["Manipulated approvals", "A generic approval is used to cover a different operation. Each approval will be bound to the exact operation and policy version."],
      ["Reused authorisations", "An old permission is reused. Mandates will expire and can be revoked; if anything changes, approval will be requested again."],
      ["Agent impersonation", "A system pretends to be an authorised agent. Every request will have to present a verifiable identity for the agent and for whoever operates it, for example with mutual TLS or OAuth client credentials."],
      ["Alterable evidence", "A record that can be edited proves nothing. Receipts will be signed and will link request, policy, decision and outcome."],
    ],
    scopeKicker: "Scope",
    scopeTitle: "What the first prototype will and will not do",
    doesTag: "Will do",
    does: [
      "It will act as an intermediary for the HTTP and MCP calls defined as protected",
      "It will evaluate mandate, purpose, limits and risk with a basic policy engine",
      "It will hold operations until a competent person decides",
      "It will issue a signed receipt for every decision",
      "It will issue a Passport v0 with one condition proved with zero knowledge, which a third party can verify",
    ],
    doesNotTag: "Will not do",
    doesNot: [
      "It will not replace existing identity or permission systems",
      "It will not stop a model from making mistakes: it will control what gets executed",
      "It will not be enough on its own to comply with any regulation",
      "It will not yet be offered as a production service",
    ],
    techKicker: "For technical teams",
    techTitle: "Questions from a technical lead",
    techCopy: "Answers based on the prototype's technical requirements. They describe how it is designed, not something already built.",
    techFaq: [
      ["How do you stop the agent from bypassing Control?", "The protected system will only accept operations that arrive with an execution authorisation signed by Control, bound to that operation, single-use and very short-lived. It is designed so that the agent has no direct route: any call that does not go through Control will be rejected. For that, the protected system will have to verify that authorisation, or Control will hold the access credentials so that the agent does not have them."],
      ["What happens if Control does not respond?", "It will fail closed. If the rules engine fails, takes too long or returns an incomplete answer, the operation will be blocked with a reason and an alert will be raised. If the receipt cannot be stored, nothing will be executed. If an execution is left unconfirmed, it will be marked as pending reconciliation and will not be retried automatically. The emergency procedure, with its own record, will be agreed with each pilot."],
      ["How do you make sure exactly what was approved is executed?", "Control will compute a cryptographic fingerprint of the operation: action, parameters, amount, recipient, documents and mandate. The approver's signature will be bound to that fingerprint; just before execution it will be recomputed and, if anything has changed, the operation will need approving again."],
      ["How do you tell an attempt, an authorisation and an execution apart?", "Each operation will follow a closed set of states, such as received, held, approved, executed or blocked, and only Control will be able to change them. Every change will leave its own signed, chained receipt, and a rejected attempt will be recorded too."],
      ["What does each Passport proof show, and over what period?", "Each credential will state which conditions are met, the source of each one, when it was issued and when it expires. The zero knowledge proof will show that those conditions are met based on data signed by its source, without revealing dates, tools or details. Each condition will set its own reference period."],
      ["Does it prove that every operation went through Control?", "Not on its own. It will prove what the receipts of the connected operations say. Which operations are connected will be stated in the credential and, where appropriate, reviewed by an auditor."],
      ["Who signs, who holds the keys and how are they revoked?", "Control will sign receipts with a different key from the one that authorises executions, and each approver will sign with their own. How approvers authenticate and sign will adapt to what each organisation already uses. Each organisation will publish its public keys, and the Passport trust list will be maintained by the issuer. A key can be rotated with a signed record of the change, and mandates and credentials can be revoked. Key custody will be agreed with each pilot."],
      ["Where will Control run?", "It is planned to be deployed on the client's infrastructure or in its cloud. Other options will be considered with each pilot."],
      ["What performance will it have?", "It will be measured in the demonstrable version. We will not give figures until we have measured them."],
    ],
    evidenceTitle: "How evidence will be handled",
    evidenceCopy: "The design provides for digitally signed receipts that store a cryptographic digest of the operation instead of its full data, computed with a key of each organisation's own so that the digest cannot be used to rebuild the data. They will be kept by the organisation that runs Control. Retention, data location and key management will be defined with each pilot.",
    regulationTitle: "How it relates to regulation",
    regulationCopy: [
      "The EU AI Act requires record-keeping (art. 12) and human oversight (art. 14) for high-risk systems, and DORA requires financial entities to manage technology risk. NIS2 requires managing supply chain security: Passport will be able to help demonstrate it to clients.",
      "Under the GDPR, Control will be able to help show that each agent uses only the data needed for an authorised purpose, and who decided on matters affecting people. Under Spain's ENS, receipts will be able to serve as a record of agents' activity and access, and help demonstrate the traceability and access control measures.",
      "Control will provide technical controls and evidence that can help in those processes; it will not replace each organisation's legal assessment.",
    ],
    reportTitle: "Reporting a security issue",
    reportCopy: "If you find a vulnerability in this website or our materials, write to hello@gleampeak.ai with the subject “Security”. Please do not disclose it publicly until we have been able to review it.",
  },
};

export const resources: Record<Lang, ResourcesContent> = {
  es: {
    eyebrow: "Glosario y preguntas frecuentes",
    title: "Conceptos clave y preguntas frecuentes",
    lead: "Lo esencial para entender el control de agentes de IA y cómo encaja Gleam Peak AI en una organización.",
    glossaryKicker: "Conceptos",
    glossaryTitle: "Glosario",
    glossary: [
      ["Control", "La parte de Gleam Peak AI que trabajará dentro de tu organización: una pasarela de autorización que comprobará cada operación conectada antes de que se ejecute."],
      ["Passport", "La parte que mira hacia fuera: una credencial verificable de controles que ayudará a demostrar que cumples sus condiciones, sin mostrar tus datos."],
      ["Zero knowledge", "Un tipo de prueba criptográfica que permite comprobar que algo se cumple sin ver los datos que hay detrás."],
      ["Mandato", "La autorización con la que actúa un agente: en nombre de quién, para qué, con qué límites y hasta cuándo."],
      ["Finalidad", "El propósito de una operación, que vendrá del mandato o de la tarea asignada, no de lo que diga el agente. Una misma acción puede estar permitida para una finalidad y no para otra."],
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
      ["¿Servirá para agentes que usan MCP?", "Está previsto. El primer prototipo se diseña para actuar como intermediario de operaciones MCP y llamadas HTTP a API."],
      ["¿Hay que reescribir los agentes?", "El objetivo es que no: Control está pensado para situarse delante de las herramientas. Cada agente sí tendrá que presentar su identidad y el mandato con el que actúa."],
      ["¿Qué hay que cambiar en nuestros sistemas?", "En los agentes, poco: presentar su identidad y su mandato. En el sistema protegido, sí hay trabajo: aceptar solo operaciones autorizadas por Control, o dejar que Control guarde las credenciales de acceso para que el agente no las tenga. Lo concretaremos con cada piloto."],
      ["¿Dónde se ejecutará Control?", "Previsto para desplegarse en la infraestructura del cliente o en su nube. Otras opciones se valorarán con cada piloto."],
      ["¿Dónde se guardan los datos y la evidencia?", "El diseño prevé que la evidencia la conserve la organización que usa Control. Para emitir un Passport, la prueba se calculará dentro de tu organización a partir de los recibos firmados; Gleam Peak AI comprobará la prueba y firmará la credencial sin recibir tus recibos ni tus datos."],
      ["¿Qué diferencia hay entre Control y Passport?", "Control trabajará dentro de tu organización: aplicará las reglas y autorizaciones que define tu organización y dejará un recibo firmado de cada operación. Passport mirará hacia fuera: una credencial verificable de controles que ayudará a demostrar a un banco, un cliente o un auditor que cumples sus condiciones, sin mostrar tus datos. Control aportará valor por sí solo; Passport lo ampliará."],
      ["¿Cuándo se podrá probar?", "Gleam Peak AI es un prototipo en desarrollo. Según nuestro plan, sujeto a equipo y financiación, la versión demostrable llegará entre noviembre de 2026 y marzo de 2027: Control con recibos firmados, un verificador y un Passport v0 con una condición demostrada con zero knowledge. Los pilotos con clientes reales llegarán entre abril y septiembre de 2027. Si te interesa participar, escríbenos desde Hablemos."],
    ],
  },
  en: {
    eyebrow: "Glossary and FAQ",
    title: "Key concepts and frequently asked questions",
    lead: "The essentials for understanding control of AI agents and how Gleam Peak AI fits into an organisation.",
    glossaryKicker: "Concepts",
    glossaryTitle: "Glossary",
    glossary: [
      ["Control", "The part of Gleam Peak AI that will work inside your organisation: an authorisation gateway that will check every connected operation before it runs."],
      ["Passport", "The part that faces outwards: a verifiable controls credential that will help you show you meet its conditions, without showing your data."],
      ["Zero knowledge", "A kind of cryptographic proof that lets someone check that something holds without seeing the data behind it."],
      ["Mandate", "The authorisation under which an agent acts: on whose behalf, for what, within which limits and until when."],
      ["Purpose", "The aim of an operation, which will come from the mandate or the assigned task, not from what the agent says. The same action may be allowed for one purpose and not for another."],
      ["Rule", "What the organisation sets to decide whether an operation is allowed, blocked or needs human approval."],
      ["Bound approval", "An approval that is only valid for the exact operation that was reviewed. If any detail changes, it is no longer valid."],
      ["Signed receipt", "The signed record that links the request, the rule applied, the human decision and the outcome."],
      ["Revocation", "Withdrawing or restricting a mandate before it expires. Authority is not presumed to last indefinitely."],
      ["MCP server", "A server that exposes tools to AI agents through the Model Context Protocol."],
    ],
    faqKicker: "Common questions",
    faqTitle: "Frequently asked questions",
    faq: [
      ["Does it replace our identity and access management?", "No. That system decides who can connect and to which resources. Control adds a decision per operation: whether this specific action is authorised now, for this purpose and under these conditions."],
      ["Will it work with agents that use MCP?", "That is the plan. The first prototype is being designed to act as an intermediary for MCP operations and HTTP calls to APIs."],
      ["Do agents need to be rewritten?", "The aim is that they do not: Control is designed to sit in front of the tools. Each agent will need to present its identity and the mandate it acts under."],
      ["What do we need to change in our systems?", "In the agents, very little: presenting their identity and mandate. In the protected system, there is work to do: accepting only operations authorised by Control, or letting Control hold the access credentials so that the agent does not have them. We will work out the details with each pilot."],
      ["Where will Control run?", "It is planned to be deployed on the client's infrastructure or in its cloud. Other options will be considered with each pilot."],
      ["Where are data and evidence stored?", "The design provides for the evidence to be kept by the organisation that runs Control. To issue a Passport, the proof will be computed inside your organisation from the signed receipts; Gleam Peak AI will check the proof and sign the credential without receiving your receipts or your data."],
      ["What is the difference between Control and Passport?", "Control will work inside your organisation: it will apply the rules and authorisations your organisation sets and leave a signed receipt for every operation. Passport will face outwards: a verifiable controls credential that helps you show a bank, a client or an auditor that you meet its conditions, without showing your data. Control will add value on its own; Passport will extend it."],
      ["When can we try it?", "Gleam Peak AI is a prototype in development. Under our plan, subject to team and funding, the demonstrable version will arrive between November 2026 and March 2027: Control with signed receipts, a verifier and a Passport v0 with one condition proved with zero knowledge. Pilots with real clients will follow between April and September 2027. If you would like to take part, get in touch via Let's talk."],
    ],
  },
};
