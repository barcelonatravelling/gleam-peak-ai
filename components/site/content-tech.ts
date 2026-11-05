import type { Lang } from "./content";

type Pair = readonly [string, string];
type Triple = readonly [string, string, string];

// Public summary of the design documents (requirements v3, MVP and Passport v0 specs, threat model and
// decision records). It describes how the system is designed, not something already built.
type TechContent = {
  eyebrow: string;
  title: string;
  lead: string;
  tocLabel: string;
  components: { id: string; kicker: string; title: string; copy: string; items: Triple[] };
  lifecycle: { id: string; kicker: string; title: string; copy: string; states: Pair[]; rules: string };
  receipt: { id: string; kicker: string; title: string; copy: string; label: string; fields: Pair[]; note: string };
  keys: { id: string; kicker: string; title: string; items: Pair[] };
  passport: {
    id: string;
    kicker: string;
    title: string;
    copy: string;
    willTag: string;
    will: string[];
    wontTag: string;
    wont: string[];
  };
  threats: { id: string; kicker: string; title: string; copy: string; head: Pair; rows: Pair[]; outOfScope: string };
  open: { id: string; kicker: string; title: string; copy: string; items: Pair[] };
  measure: { id: string; kicker: string; title: string; copy: string; items: Pair[]; note: string };
  closingTitle: string;
};

export const tech: Record<Lang, TechContent> = {
  es: {
    eyebrow: "Borrador de diseño · versión 0.1 · noviembre de 2026 · describe cómo está pensado, no algo ya construido",
    title: "Diseño técnico de Gleam Peak Control y Gleam Peak Passport",
    lead: "Resumen público del diseño para quien tenga que revisarlo: qué piezas habrá y dónde se ejecutarán, cómo vivirá una operación, qué llevará un recibo firmado, cómo se gestionarán las claves, qué demostrará la primera versión de Passport, de qué amenazas se defiende y qué está todavía sin decidir. Gleam Peak AI es un prototipo en desarrollo.",
    tocLabel: "Secciones de esta página",
    components: {
      id: "componentes",
      kicker: "Arquitectura",
      title: "Componentes y dónde se ejecutarán",
      copy: "Control está previsto para desplegarse en la infraestructura del cliente o en su nube. Los datos y los recibos se quedarán allí. Gleam Peak AI solo intervendrá para comprobar la prueba de Passport y firmar la credencial.",
      items: [
        ["Pasarela de Control", "Infraestructura o nube del cliente", "Recibirá cada operación conectada por API HTTP o por MCP. Las dos entradas usarán el mismo módulo de decisión: la misma operación dará la misma decisión por cualquiera de las dos."],
        ["Motor de reglas", "Junto a la pasarela", "Reglas escritas como código y versionadas. Devolverá permitir, retener o bloquear, siempre con motivo y nivel de riesgo. La huella de la versión aplicada quedará en cada recibo."],
        ["Registro de agentes y mandatos", "Infraestructura o nube del cliente", "Qué agentes hay, quién responde de cada uno y con qué mandato actúan: en nombre de quién, para qué, con qué límites y hasta cuándo."],
        ["Panel de aprobación", "Navegador o dispositivo de quien aprueba", "Mostrará la operación exacta en lenguaje claro. La persona entrará con el proveedor de identidad de su organización y firmará con su propia clave, que no saldrá de su dispositivo."],
        ["Registro de recibos", "Infraestructura o nube del cliente", "Recibos firmados y encadenados, solo de añadir. Cada cierto tiempo se exportará fuera de Control la huella del último recibo (un ancla) para detectar si alguien reescribe la cadena."],
        ["Verificador de recibos", "Donde lo ejecute quien verifica", "Comprobará firmas, cadena y ancla con las claves públicas de la organización, sin acceso al sistema protegido ni a Gleam Peak AI."],
        ["Generador de pruebas de Passport", "Dentro de la organización titular", "Calculará la prueba zero knowledge a partir de datos firmados por su fuente. Los datos no saldrán de la organización: solo viajará la prueba."],
        ["Emisión de Passport", "Gleam Peak AI", "Comprobará la prueba y firmará la credencial sin recibir los recibos ni los datos de la organización."],
        ["Verificador de Passport", "Página o API para quien verifica", "Dirá si la credencial es válida, ha caducado o se ha revocado, qué condición cumple, de qué tipo de fuente sale y si la prueba verifica. Nunca mostrará evidencias."],
      ],
    },
    lifecycle: {
      id: "operacion",
      kicker: "Estados",
      title: "La vida de una operación",
      copy: "Cada operación seguirá una lista cerrada de estados. Solo Control podrá cambiarlos, y cada cambio dejará su propio recibo firmado.",
      states: [
        ["Propuesta", "El agente, ya autenticado, envía una operación válida. Desde aquí todo deja recibo, también lo que se rechace."],
        ["Permitida", "La regla la permite sin aprobación. Se ejecuta en la misma petición."],
        ["Retenida", "Espera la firma de una persona competente. En las críticas, dos firmas de personas y roles distintos."],
        ["Aprobada", "Tiene todas las firmas necesarias. Antes de ejecutar se vuelven a comprobar la huella, el mandato y la versión de la regla."],
        ["Bloqueada", "Final. Fuera de mandato, regla que bloquea, mandato revocado o un fallo en la cadena de decisión."],
        ["Rechazada", "Final. Una persona la rechazó, con su motivo."],
        ["Caducada", "Final. Venció el plazo sin todas las firmas. El silencio nunca es un sí."],
        ["Ejecutada", "Final. El sistema protegido confirmó la acción."],
        ["Pendiente de conciliar", "El sistema protegido no confirmó a tiempo. Control lo consulta por el identificador de la operación y la marca como ejecutada o fallida. Nunca se repite automáticamente."],
        ["Fallida", "Final. El sistema protegido dio error. Para reintentar habrá que proponerla y aprobarla de nuevo."],
      ],
      rules: "Si algo cambia después de aprobar (importe, destinatario, documento, finalidad o versión de la regla), la huella deja de coincidir y habrá que aprobar de nuevo. Ante cualquier fallo en la cadena de decisión, Control bloqueará: si no se puede guardar el recibo, no se ejecuta nada.",
    },
    receipt: {
      id: "recibo",
      kicker: "Formato",
      title: "El recibo firmado",
      copy: "Cada recibo será un JSON firmado (JWS con Ed25519) que cualquiera con la clave pública podrá verificar. Este es el mismo ejemplo de la página de Control: un agente intenta exportar fichas de clientes y Control lo bloquea.",
      label: "Recibo firmado (ejemplo ilustrativo)",
      fields: [
        ["operation", "La acción que se pidió, con su nombre fijo del catálogo."],
        ["agent", "La identidad del agente, tomada de su credencial verificada, nunca de lo que diga la petición."],
        ["on_behalf_of", "En nombre de quién actúa, según su mandato."],
        ["policy", "La regla aplicada y su versión."],
        ["decision", "La decisión o el estado nuevo: por ejemplo allowed, held, blocked, approved, rejected, expired o executed."],
        ["reason", "El motivo, legible y nunca vacío."],
        ["payload_hash", "La huella SHA-256 de la operación en forma canónica (JSON Canonicalization Scheme, RFC 8785): acción, parámetros, importe, destinatario, documentos y mandato."],
        ["issued_at", "Fecha y hora en UTC."],
        ["key_id", "Qué clave firmó. Quien verifica la busca en su lista de confianza."],
        ["prev", "La huella del recibo anterior. Encadena el registro, de modo que borrar, reordenar o alterar un recibo se pueda detectar."],
        ["signature", "La firma de Control sobre todo lo anterior."],
      ],
      note: "Una operación dejará varios recibos, uno por cada cambio de estado. Las aprobaciones serán firmas aparte de cada persona, y el recibo las referenciará. Los datos personales no irán en claro: el recibo guardará solo huellas, y la organización conservará los datos aparte. Los nombres de los campos son los de este resumen público; el formato exacto se fijará en la versión demostrable.",
    },
    keys: {
      id: "claves",
      kicker: "Claves y confianza",
      title: "Quién firma qué",
      items: [
        ["Claves separadas", "Control firmará los recibos con una clave y las autorizaciones de ejecución con otra. Quien aprueba firmará con la suya."],
        ["Claves de las personas", "La clave de quien aprueba se generará y se quedará en su dispositivo. Ni Control ni Gleam Peak AI tendrán claves privadas de personas ni firmarán en su nombre."],
        ["Lista de confianza", "Cada organización publicará sus claves públicas. Quien verifica usará una lista de confianza que dice qué clave puede firmar qué tipo de documento, y nunca elegirá el algoritmo por lo que diga la cabecera de la firma."],
        ["Rotación y revocación", "Una clave se podrá rotar dejando constancia firmada por la clave saliente; las retiradas se conservarán para verificar recibos antiguos. Los mandatos y las credenciales se podrán revocar."],
        ["Custodia", "Antes de cualquier piloto, las claves de Control pasarán a un servicio separado (KMS o HSM). La custodia se acordará con cada piloto. La lista de confianza de Passport la mantendrá el emisor."],
      ],
    },
    passport: {
      id: "passport-v0",
      kicker: "Gleam Peak Passport v0",
      title: "Qué demostrará la primera versión y qué no",
      copy: "La versión demostrable, prevista para marzo de 2027, demostrará una sola condición con zero knowledge, solo con datos ficticios. Cuál será exactamente está por decidir.",
      willTag: "Demostrará",
      will: [
        "Una sola condición, demostrada con zero knowledge a partir de datos firmados por su fuente. Candidatas: que se cumplen controles básicos de ciberseguridad respaldados por fuentes firmadas (multifactor, copias probadas y parches), o un umbral sin revelar el valor exacto",
        "Que la prueba vale para esa verificación: la condición y un reto de un solo uso los fijará quien verifica, nunca quien prueba",
        "Una credencial con titular, condición, tipo de fuente, fecha de emisión, caducidad y estado de revocación, sin evidencias dentro",
        "Un verificador que dirá válida, caducada o revocada, sin mostrar los datos que hay detrás",
      ],
      wontTag: "No demostrará",
      wont: [
        "Que todas las operaciones pasaron por Control: solo lo que dicen los datos firmados que usa",
        "El uso responsable de la IA con recibos reales de Control, que llegará con el piloto",
        "Que un dato falso sea verdadero: una prueba solo vale tanto como la fuente que firmó el dato",
        "Nada con datos reales hasta que los circuitos pasen una revisión externa",
        "No sustituirá una auditoría ni bastará por sí sola para cumplir ninguna normativa",
      ],
    },
    threats: {
      id: "amenazas",
      kicker: "Modelo de amenazas",
      title: "Amenazas principales y defensa prevista",
      copy: "Resumen del modelo de amenazas del prototipo. Cada amenaza tendrá al menos una prueba automática.",
      head: ["Amenaza", "Defensa prevista"],
      rows: [
        ["Saltarse Control", "El sistema protegido solo aceptará operaciones con una autorización de ejecución firmada por Control, ligada a esa operación, de un solo uso y de validez muy corta; o Control guardará las credenciales para que el agente no las tenga."],
        ["Instrucciones ocultas", "La IA nunca decide. Control evaluará la operación resultante contra el mandato y la regla, y lo de riesgo alto se retendrá igual."],
        ["Actuar fuera de mandato", "El mandato se comprobará en cada operación y otra vez justo antes de ejecutar. Revocarlo bloqueará en el acto lo retenido y lo aprobado."],
        ["Cambiar la operación tras aprobarla", "La firma quedará ligada a la huella exacta, que se recalculará antes de ejecutar."],
        ["Reutilizar una aprobación o una autorización", "Cada firma tendrá identificador propio, caducidad y un solo uso."],
        ["Una sola persona en lo crítico", "Dos firmas de personas distintas con roles distintos."],
        ["Aprobar por silencio o por cansancio", "Lo que caduque no se ejecutará. Contexto claro, sin aprobaciones en bloque, y solo se retendrá lo necesario."],
        ["Suplantar a un agente o a quien aprueba", "Identidad verificable del agente (por ejemplo, OAuth con clave privada o TLS mutuo) y de la persona (OpenID Connect con el proveedor de su organización); la clave de aprobación, en su dispositivo."],
        ["Alterar o reescribir el historial", "Registro solo de añadir, encadenado y firmado, con un ancla exportada fuera de Control."],
        ["Fallo de un componente", "Fallo cerrado: se bloquea. Sin recibo guardado no se ejecuta, y una ejecución sin confirmar queda pendiente de conciliar."],
        ["Prueba zero knowledge engañosa o reutilizada", "Partirá de datos firmados por su fuente, con condición y reto fijados por quien verifica. Herramientas establecidas, sin criptografía propia, y revisión externa de los circuitos."],
        ["Passport falsificado, caducado o revocado", "Firma, caducidad y estado de revocación se comprobarán en cada verificación."],
        ["Fuga de datos al verificar", "Quien verifica recibirá estado, condición y tipo de fuente, nunca evidencias."],
      ],
      outOfScope: "Fuera del alcance del prototipo: ataques a la infraestructura de alojamiento, denegación de servicio y compromiso de un proveedor de identidad real. Se abordarán antes del piloto, con una auditoría de seguridad hecha por personas.",
    },
    open: {
      id: "decisiones-abiertas",
      kicker: "Sin decidir",
      title: "Decisiones abiertas",
      copy: "Lo que todavía no está decidido. Lo actualizaremos cuando se decida.",
      items: [
        ["Tecnología zero knowledge", "Se elegirá entre herramientas establecidas, con su sistema de prueba, si necesita configuración de confianza, su licencia y su madurez."],
        ["Condición exacta de Passport v0", "Controles básicos de ciberseguridad respaldados por fuentes firmadas, o un umbral sin revelar el valor exacto."],
        ["Formato de la credencial", "Basada en estándares abiertos. La candidata es SD-JWT VC, todavía en borrador en el IETF; tiene que encajar con la prueba zero knowledge."],
        ["Motor de reglas", "OPA o Cedar."],
        ["Revocación en la versión demostrable", "Con una lista de estado estándar. Si no se comprueba en la demostración, se dirá en pantalla."],
        ["Custodia de claves y nube", "Qué servicio de claves (KMS o HSM) y qué proveedor, con cada piloto."],
        ["Dónde se publica el ancla", "Fuera del control de la pasarela, por ejemplo con un sellado de tiempo o un registro de transparencia."],
        ["Cómo firma quien aprueba", "Clave en el navegador, passkey o el método que ya use cada organización."],
        ["Umbrales de las condiciones", "Por ejemplo, cuántos días sin parchear o cada cuánto se prueban las copias."],
      ],
    },
    measure: {
      id: "medicion",
      kicker: "Piloto",
      title: "Cómo se medirá la ventaja frente a combinar herramientas existentes",
      copy: "Ya existen herramientas de identidad, de reglas, de aprobación y de registro. En el piloto compararemos, con las mismas operaciones y en el mismo periodo, el método que ya use cada participante con Control y Passport. Esto es lo que mediremos:",
      items: [
        ["Evidencia para una revisión", "Cuánto se tarda en reunir la evidencia que pide la revisión de un cliente o una evaluación de proveedores."],
        ["Verificación por un tercero", "Si un tercero puede verificar un recibo sin acceso al sistema protegido, qué necesita y cuántos pasos le lleva."],
        ["Operaciones retenidas y bloqueadas", "Cuántas operaciones se retuvieron o se bloquearon, por qué motivo, y si alguna operación conectada llegó al sistema protegido sin pasar por Control."],
        ["Aprobaciones", "El tiempo de aprobación y cuántas aprobaciones hubo que repetir porque la operación cambió."],
        ["Cuestionarios", "Qué preguntas de un cuestionario de seguridad de proveedores se pueden responder con la credencial y cuáles no."],
        ["Esfuerzo de integración", "Lo que costó conectar cada operación y adaptar el sistema protegido."],
      ],
      note: "No hay resultados todavía. Los publicaremos cuando estén medidos y con el acuerdo de cada participante.",
    },
    closingTitle: "¿Quieres revisar el diseño con tu equipo técnico?",
  },
  en: {
    eyebrow: "Design draft · version 0.1 · November 2026 · describes how it is designed, not something already built",
    title: "Technical design of Gleam Peak Control and Gleam Peak Passport",
    lead: "A public summary of the design for anyone who needs to review it: which components there will be and where they will run, how an operation will flow, what a signed receipt will contain, how keys will be handled, what the first version of Passport will prove, which threats it defends against and what is still undecided. Gleam Peak AI is a prototype in development.",
    tocLabel: "Sections on this page",
    components: {
      id: "components",
      kicker: "Architecture",
      title: "Components and where they will run",
      copy: "Control is planned to be deployed on the client's infrastructure or in its cloud. Data and receipts will stay there. Gleam Peak AI will only be involved to check the Passport proof and sign the credential.",
      items: [
        ["Control gateway", "Client infrastructure or cloud", "It will receive every connected operation through an HTTP API or MCP. Both entry points will use the same decision module: the same operation will get the same decision through either."],
        ["Rules engine", "Next to the gateway", "Rules written as code and versioned. It will return allow, hold or block, always with a reason and a risk level. The fingerprint of the version applied will be stored in every receipt."],
        ["Agent and mandate registry", "Client infrastructure or cloud", "Which agents exist, who is responsible for each one and the mandate it acts under: on whose behalf, for what, within which limits and until when."],
        ["Approval panel", "The approver's browser or device", "It will show the exact operation in plain language. The approver will sign in with their organisation's identity provider and sign with their own key, which will not leave their device."],
        ["Receipt log", "Client infrastructure or cloud", "Signed, chained, append-only receipts. The fingerprint of the latest receipt (an anchor) will be exported outside Control at intervals, to detect if someone rewrites the chain."],
        ["Receipt verifier", "Wherever the verifier runs it", "It will check signatures, chain and anchor with the organisation's public keys, without access to the protected system or to Gleam Peak AI."],
        ["Passport proof generator", "Inside the holder organisation", "It will compute the zero knowledge proof from data signed by its source. The data will not leave the organisation: only the proof travels."],
        ["Passport issuance", "Gleam Peak AI", "It will check the proof and sign the credential without receiving the organisation's receipts or data."],
        ["Passport verifier", "A page or API for the verifier", "It will say whether the credential is valid, expired or revoked, which condition it meets, what type of source it comes from and whether the proof verifies. It will never show evidence."],
      ],
    },
    lifecycle: {
      id: "operation",
      kicker: "States",
      title: "The life of an operation",
      copy: "Each operation will follow a closed set of states. Only Control will be able to change them, and every change will leave its own signed receipt.",
      states: [
        ["Proposed", "The agent, already authenticated, sends a valid operation. From here on everything leaves a receipt, including what is rejected."],
        ["Allowed", "The rule allows it without approval. It runs in the same request."],
        ["Held", "Waiting for a competent person to sign. Critical ones need two signatures from different people in different roles."],
        ["Approved", "It has every signature it needs. Before execution, the fingerprint, the mandate and the rule version are checked again."],
        ["Blocked", "Final. Outside the mandate, blocked by a rule, mandate revoked or a failure in the decision chain."],
        ["Rejected", "Final. A person rejected it, with a reason."],
        ["Expired", "Final. The deadline passed without every signature. Silence is never a yes."],
        ["Executed", "Final. The protected system confirmed the action."],
        ["Pending reconciliation", "The protected system did not confirm in time. Control asks it by operation identifier and marks the operation as executed or failed. It is never retried automatically."],
        ["Failed", "Final. The protected system returned an error. To retry, it must be proposed and approved again."],
      ],
      rules: "If anything changes after approval (amount, recipient, document, purpose or rule version), the fingerprint no longer matches and the operation must be approved again. On any failure in the decision chain, Control will block: if the receipt cannot be stored, nothing runs.",
    },
    receipt: {
      id: "receipt",
      kicker: "Format",
      title: "The signed receipt",
      copy: "Each receipt will be signed JSON (JWS with Ed25519) that anyone with the public key will be able to verify. This is the same example as on the Control page: an agent tries to export customer records and Control blocks it.",
      label: "Signed receipt (illustrative example)",
      fields: [
        ["operation", "The action requested, with its fixed name from the catalogue."],
        ["agent", "The agent's identity, taken from its verified credential, never from what the request says."],
        ["on_behalf_of", "On whose behalf it acts, according to its mandate."],
        ["policy", "The rule applied and its version."],
        ["decision", "The decision or the new state: for example allowed, held, blocked, approved, rejected, expired or executed."],
        ["reason", "The reason, readable and never empty."],
        ["payload_hash", "The SHA-256 fingerprint of the operation in canonical form (JSON Canonicalization Scheme, RFC 8785): action, parameters, amount, recipient, documents and mandate."],
        ["issued_at", "Date and time in UTC."],
        ["key_id", "Which key signed it. The verifier looks it up in its trust list."],
        ["prev", "The fingerprint of the previous receipt. It chains the log, so that deleting, reordering or altering a receipt can be detected."],
        ["signature", "Control's signature over all of the above."],
      ],
      note: "An operation will leave several receipts, one for each change of state. Approvals will be separate signatures by each person, referenced by the receipt. Personal data will not be stored in the clear: the receipt will only hold fingerprints, and the organisation will keep the data separately. The field names are those of this public summary; the exact format will be fixed in the demonstrable version.",
    },
    keys: {
      id: "keys",
      kicker: "Keys and trust",
      title: "Who signs what",
      items: [
        ["Separate keys", "Control will sign receipts with one key and execution authorisations with another. Each approver will sign with their own."],
        ["People's keys", "An approver's key will be generated and kept on their device. Neither Control nor Gleam Peak AI will hold people's private keys or sign on their behalf."],
        ["Trust list", "Each organisation will publish its public keys. The verifier will use a trust list that says which key may sign which type of document, and will never choose the algorithm from what the signature header says."],
        ["Rotation and revocation", "A key can be rotated with a record signed by the outgoing key; retired keys will be kept to verify old receipts. Mandates and credentials can be revoked."],
        ["Custody", "Before any pilot, Control's keys will move to a separate service (KMS or HSM). Custody will be agreed with each pilot. The Passport trust list will be maintained by the issuer."],
      ],
    },
    passport: {
      id: "passport-v0",
      kicker: "Gleam Peak Passport v0",
      title: "What the first version will prove, and what it will not",
      copy: "The demonstrable version, expected in March 2027, will prove a single condition with zero knowledge, using fictitious data only. Exactly which condition is still to be decided.",
      willTag: "Will prove",
      will: [
        "A single condition, proved with zero knowledge from data signed by its source. Candidates: that basic cybersecurity controls backed by signed sources are in place (multi-factor authentication, tested backups and patching), or a threshold without revealing the exact value",
        "That the proof is valid for this verification: the condition and a single-use challenge will be set by the verifier, never by the prover",
        "A credential with holder, condition, source type, issue date, expiry and revocation status, with no evidence inside",
        "A verifier that will say valid, expired or revoked, without showing the data behind it",
      ],
      wontTag: "Will not prove",
      wont: [
        "That every operation went through Control: only what the signed data it uses says",
        "Responsible use of AI from real Control receipts, which will come with the pilot",
        "That false data is true: a proof is only as good as the source that signed the data",
        "Anything with real data until the circuits have passed an external review",
        "It will not replace an audit or be enough on its own to comply with any regulation",
      ],
    },
    threats: {
      id: "threats",
      kicker: "Threat model",
      title: "Main threats and the planned defence",
      copy: "A summary of the prototype's threat model. Every threat will have at least one automated test.",
      head: ["Threat", "Planned defence"],
      rows: [
        ["Bypassing Control", "The protected system will only accept operations with an execution authorisation signed by Control, bound to that operation, single-use and very short-lived; or Control will hold the credentials so that the agent does not have them."],
        ["Hidden instructions", "AI never decides. Control will assess the resulting operation against the mandate and the rule, and high-risk operations will be held regardless."],
        ["Acting outside the mandate", "The mandate will be checked on every operation and again just before execution. Revoking it will immediately block anything held or approved."],
        ["Changing the operation after approval", "The signature will be bound to the exact fingerprint, which will be recomputed before execution."],
        ["Reusing an approval or an authorisation", "Each signature will have its own identifier, an expiry and a single use."],
        ["A single person on critical actions", "Two signatures from different people in different roles."],
        ["Approval by silence or fatigue", "Anything that expires will not run. Clear context, no bulk approvals, and only what is necessary will be held."],
        ["Impersonating an agent or an approver", "A verifiable identity for the agent (for example, OAuth with a private key or mutual TLS) and for the person (OpenID Connect with their organisation's provider); the approval key stays on their device."],
        ["Altering or rewriting the history", "An append-only, chained and signed log, with an anchor exported outside Control."],
        ["A component fails", "Fail closed: it blocks. Without a stored receipt nothing runs, and an unconfirmed execution is left pending reconciliation."],
        ["A misleading or reused zero knowledge proof", "It will start from data signed by its source, with the condition and challenge set by the verifier. Established tools, no home-made cryptography, and an external review of the circuits."],
        ["A forged, expired or revoked Passport", "Signature, expiry and revocation status will be checked at every verification."],
        ["Data leaking during verification", "The verifier will receive status, condition and source type, never evidence."],
      ],
      outOfScope: "Out of scope for the prototype: attacks on the hosting infrastructure, denial of service and compromise of a real identity provider. They will be addressed before the pilot, with a security audit carried out by people.",
    },
    open: {
      id: "open-decisions",
      kicker: "Undecided",
      title: "Open decisions",
      copy: "What has not been decided yet. We will update this when it is.",
      items: [
        ["Zero knowledge technology", "To be chosen from established tools, with its proof system, whether it needs a trusted setup, its licence and its maturity."],
        ["Exact Passport v0 condition", "Basic cybersecurity controls backed by signed sources, or a threshold without revealing the exact value."],
        ["Credential format", "Based on open standards. The candidate is SD-JWT VC, still an IETF draft; it has to fit the zero knowledge proof."],
        ["Rules engine", "OPA or Cedar."],
        ["Revocation in the demonstrable version", "With a standard status list. If it is not checked in the demonstration, the screen will say so."],
        ["Key custody and cloud", "Which key service (KMS or HSM) and which provider, with each pilot."],
        ["Where the anchor is published", "Outside the gateway's control, for example with a timestamping service or a transparency log."],
        ["How approvers sign", "A key in the browser, a passkey or the method each organisation already uses."],
        ["Condition thresholds", "For example, how many days without patching or how often backups are tested."],
      ],
    },
    measure: {
      id: "measurement",
      kicker: "Pilot",
      title: "How the advantage over combining existing tools will be measured",
      copy: "Identity, policy, approval and logging tools already exist. In the pilot we will compare, on the same operations and over the same period, the method each participant already uses with Control and Passport. This is what we will measure:",
      items: [
        ["Evidence for a review", "How long it takes to gather the evidence a client review or a supplier assessment asks for."],
        ["Third-party verification", "Whether a third party can verify a receipt without access to the protected system, what they need and how many steps it takes."],
        ["Operations held and blocked", "How many operations were held or blocked, for what reason, and whether any connected operation reached the protected system without going through Control."],
        ["Approvals", "Approval time and how many approvals had to be repeated because the operation changed."],
        ["Questionnaires", "Which questions in a supplier security questionnaire can be answered with the credential and which cannot."],
        ["Integration effort", "What it took to connect each operation and adapt the protected system."],
      ],
      note: "There are no results yet. We will publish them once they have been measured and with each participant's agreement.",
    },
    closingTitle: "Would you like to review the design with your technical team?",
  },
};
