
"use client";
import AssistantChat from "../components/AssistantChat";
import type { ReactNode, FormEvent } from "react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import FloatingButton from "@/components/FloatingButton";
import Footer from "@/components/Footer";
import {
  ArrowRight,
  Bot,
  BrainCircuit,
  Building2,
  ChevronRight,
  Cpu,
  Globe,
  Layers3,
  LineChart,
  Menu,
  MessageSquareText,
  ShieldCheck,
  Sparkles,
  Workflow,
  X,
} from "lucide-react";

type Lang = "en" | "es";
type PageKey = "home" | "solutions" | "automation" | "industries" | "cases" | "call";
type IconKey =
  | "brain"
  | "cpu"
  | "layers"
  | "chart"
  | "shield"
  | "workflow"
  | "building"
  | "bot"
  | "message";

const iconMap = {
  brain: BrainCircuit,
  cpu: Cpu,
  layers: Layers3,
  chart: LineChart,
  shield: ShieldCheck,
  workflow: Workflow,
  building: Building2,
  bot: Bot,
  message: MessageSquareText,
} as const;

const content = {
  en: {
    brand: "Gleam Peak AI",
    nav: {
      home: "Home",
      solutions: "Cyber Trust Passport",
      automation: "Platform",
      industries: "Sectors",
      cases: "Values",
      call: "Collaborate",
    },
    common: {
      switchLanguage: "ES",
      backHome: "Back to Home",
      nextStep: "Next",
      discuss: "Let's talk",
      sendRequest: "Send message",
      trustedTitle: "Flagship project · Cyber Trust Passport",
      trustedHeadline: "Trusted AI and digital trust infrastructure",
      trustedItems: [
        "AI-powered cybersecurity",
        "Verifiable digital trust",
        "AI agent governance",
        "Privacy-preserving technologies",
      ],
      trustBlocks: [
        {
          title: "Evidence, not promises",
          text: "Security and governance proven with evidence drawn from real systems.",
          icon: "shield",
        },
        {
          title: "Privacy by design",
          text: "We prove that a control is met without exposing the data behind it.",
          icon: "workflow",
        },
        {
          title: "Built for ecosystems",
          text: "One institutional deployment raises the security of an entire region or supply chain.",
          icon: "chart",
        },
      ],
      form: {
        name: "Name",
        company: "Organisation",
        email: "Work email",
        message: "Tell us what interests you: a pilot, a consortium, research or the investor dossier",
      },
      statusBadge: "In development",
      formSending: "Sending...",
      formSuccessTitle: "Message sent",
      formSuccessText: "We have received your message and will get back to you as soon as possible.",
      formError: "The form could not be sent. Please try again.",
    },
    home: {
      kicker: "Trusted AI and digital trust infrastructure",
      title: "Trusted AI infrastructure for public impact",
      subtitle:
        "We develop responsible AI and cybersecurity infrastructure that helps organisations and public administrations assess risk, govern AI systems and demonstrate digital trust through verifiable evidence.",
      ctas: {
        primary: "Collaborate with us",
        secondary: "Discover the passport",
      },
      stats: [
        {
          value: "Assess risk",
          text: "Automated assessment of cybersecurity and AI risks in real systems.",
        },
        {
          value: "Govern AI",
          text: "Control what each AI agent can do, with human oversight and auditable logs.",
        },
        {
          value: "Prove trust",
          text: "Verifiable evidence that can be shared without revealing sensitive information.",
        },
      ],
      impact: {
        kicker: "The problem",
        title: "AI is moving faster than our ability to oversee it",
        intro:
          "Organisations are adopting artificial intelligence faster than they can control it. Today's oversight mechanisms are fragmented, manual and hard to verify.",
        items: [
          "No visibility: many organisations do not know which AI systems they use or what data those systems access",
          "Static compliance: an audit captures one moment, and days later everything has changed",
          "Transparency versus privacy: proving you are secure should not mean exposing your data",
          "AI agents with no clear record of who authorised them, what they did or how to stop them",
          "Unequal access: SMEs and local bodies cannot afford large security teams",
          "Evidence scattered across documents, questionnaires and screenshots that nobody can verify",
        ],
      },
      orchestration: {
        title: "Prove you comply without revealing what you protect",
        text:
          "The Cyber Trust Passport lets an organisation demonstrate its security and AI governance to clients, auditors and public authorities.",
        cards: [
          {
            title: "Evidence from real systems",
            text: "Security controls, backups, updates and access rights collected automatically, not from forms.",
            icon: "message",
          },
          {
            title: "Continuous trust",
            text: "The security status is updated all the time, not once a year.",
            icon: "workflow",
          },
          {
            title: "Privacy by design",
            text: "Selective disclosure and zero-knowledge proofs: prove without exposing internal data.",
            icon: "chart",
          },
        ],
      },
      solutionsSection: {
        kicker: "Capabilities",
        title: "One platform to assess, control and prove",
        intro:
          "Cybersecurity, AI governance and privacy technologies share the same architecture, intellectual property and team. Each module adds value to the others.",
      },
      solutions: [
        {
          title: "AI-powered cybersecurity",
          text: "Risk assessment, configuration analysis, vulnerability prioritisation and incident response support.",
          icon: "cpu",
        },
        {
          title: "AI agent governance",
          text: "Agent inventory, permissions, human approval for sensitive decisions and an auditable log of every action.",
          icon: "bot",
        },
        {
          title: "Verifiable digital trust",
          text: "Automatic, current and traceable evidence, with selective disclosure and zero-knowledge proofs, that auditors and authorities can check.",
          icon: "brain",
        },
        {
          title: "Cyber resilience and simulation",
          text: "Simulated attacks, supplier failures and agents acting beyond their permissions, to prepare the response. Future line.",
          icon: "chart",
        },
      ],
      industriesSection: {
        kicker: "Sectors",
        title: "One institutional deployment, a safer ecosystem",
        intro:
          "A public authority, a Cyber Hub or a large company can deploy the platform for every organisation in a region or supply chain.",
      },
      industries: [
        {
          title: "Public administrations",
          text: "Oversight of algorithmic systems, control of AI agents and assessment of technology suppliers.",
          icon: "shield",
        },
        {
          title: "Cyber Hubs and European bodies",
          text: "Raise the cybersecurity of an entire region with shared infrastructure.",
          icon: "brain",
        },
        {
          title: "Critical infrastructure",
          text: "Water, energy, mobility, health and emergencies: verify the security of the whole supply chain.",
          icon: "workflow",
        },
        {
          title: "Large companies",
          text: "Monitor the security of hundreds of suppliers from a single dashboard.",
          icon: "chart",
        },
        {
          title: "Cyber insurers",
          text: "Assess risk with continuous, verifiable information instead of questionnaires.",
          icon: "bot",
        },
        {
          title: "Chambers and business associations",
          text: "Give members an affordable way to improve and prove their security.",
          icon: "building",
        },
        {
          title: "SMEs and public suppliers",
          text: "Understand their risks, fix them and prove their security to clients and authorities.",
          icon: "message",
        },
        {
          title: "European digital ecosystems",
          text: "Interoperable trust between companies, auditors and authorities.",
          icon: "sparkles",
        },
      ],
      finalCta: {
        kicker: "Let's collaborate",
        title: "Build the digital trust that AI needs, together",
        text:
          "We are open to institutional co-development, European consortia, research partnerships and controlled pilot environments.",
        button: "Collaborate with us",
      },
    },
    solutionsPage: {
      kicker: "Flagship project · Cyber Trust Passport",
      title: "Prove you comply. Without revealing what you protect.",
      intro:
        "The Cyber Trust Passport lets an organisation demonstrate its cybersecurity level and the governance of its AI systems continuously and verifiably, without handing over its infrastructure, internal data or vulnerabilities.",
      cards: [
        {
          title: "Connect",
          text:
            "The organisation securely connects its workplace tools, cloud and devices through connectors and a signed software agent.",
          icon: "brain",
        },
        {
          title: "Analyse",
          text:
            "AI assesses risk, prioritises vulnerabilities and recommends fixes against NIS2, DORA, the Cyber Resilience Act, the GDPR and the AI Act.",
          icon: "cpu",
        },
        {
          title: "Prove",
          text:
            "A verifiable credential is issued and shared by link, QR code, API or the client’s supplier portal.",
          icon: "bot",
        },
        {
          title: "Zero knowledge",
          text:
            "A cryptographic proof confirms that a condition holds, such as “more than 95% of devices are up to date”, without showing the data behind it.",
          icon: "chart",
        },
      ],
      listTitle: "What an organisation can prove",
      items: [
        "Which cybersecurity controls are in place",
        "Which AI agents and systems it uses",
        "Who can access sensitive information",
        "Whether backups are verified and systems are up to date",
        "Whether technology suppliers have been assessed",
        "How incidents have been handled",
      ],
    },
    automationPage: {
      kicker: "Platform · in development",
      title: "One core infrastructure that adapts to each institutional context",
      intro:
        "The platform analyses, protects and collects evidence. The passport demonstrates the organisation’s trust status. They are two sides of the same technology.",
      items: [
        "Automated risk assessment",
        "Vulnerability prioritisation",
        "Incident response assistant",
        "AI agent permission control",
        "Human approval for sensitive decisions",
        "Auditable log of decisions and actions",
      ],
      processTitle: "Development phases",
      processSubtitle: "From the passport to public trust infrastructure",
      process: [
        {
          step: "01",
          title: "Passport and risk assessment",
          text: "Organisation registration, initial assessment, evidence repository, controls dashboard, first credential and a zero-knowledge demonstration.",
        },
        {
          step: "02",
          title: "Assistance and response",
          text: "Alerts, AI recommendations, incident assistant, recovery plans and notifications.",
        },
        {
          step: "03",
          title: "Agent governance",
          text: "Inventory, permissions, human oversight, action logs and stopping anomalous behaviour.",
        },
        {
          step: "04",
          title: "Public sector and critical infrastructure",
          text: "Adaptation to public environments, cities, health, water, energy, mobility and emergencies.",
        },
      ],
    },
    industriesPage: {
      kicker: "Sectors",
      title: "Where digital trust has the greatest public impact",
      intro:
        "A shared infrastructure raises the security of an entire ecosystem, not only of those who can afford the most expensive solutions.",
      cards: [
        {
          title: "Public administrations",
          text: "Supplier assessment, oversight of algorithmic systems, a register of automated decisions and audits of AI bought from third parties. Always with human oversight.",
          icon: "shield",
        },
        {
          title: "Cyber Hubs and European bodies",
          text: "Regional deployment of the passport and a future connection with CSIRTs and authorities for incident reporting.",
          icon: "brain",
        },
        {
          title: "Critical infrastructure",
          text: "Water, energy, mobility, health and emergency services depend on many suppliers. The platform helps verify the security of the whole chain.",
          icon: "workflow",
        },
        {
          title: "Large companies",
          text: "A dashboard to see which suppliers comply, get alerts when one stops complying and verify cryptographic proofs.",
          icon: "chart",
        },
        {
          title: "Cyber insurers",
          text: "Continuous, verifiable risk information to assess and support policyholders.",
          icon: "bot",
        },
        {
          title: "Chambers and business associations",
          text: "A service for members that raises the security of a region’s business community.",
          icon: "building",
        },
        {
          title: "SMEs and public suppliers",
          text: "An affordable way to understand risks, fix them and prove security without large technical teams.",
          icon: "message",
        },
        {
          title: "European digital ecosystems",
          text: "Evidence that is interoperable with European digital identity and credential frameworks.",
          icon: "sparkles",
        },
      ],
    },
    casesPage: {
      kicker: "Values",
      title: "AI that extends human capabilities without reducing rights",
      intro:
        "We design systems that can be supervised, challenged and audited. Our goal is not to accelerate AI at any cost, but to build the trust needed to use it responsibly.",
      cards: [
        {
          title: "Dignity and autonomy",
          result: "Human oversight",
          text:
            "Mandatory human approval for sensitive decisions. AI recommends; people decide and remain accountable.",
        },
        {
          title: "Data protection",
          result: "Privacy by design",
          text:
            "Selective disclosure and zero-knowledge proofs to prove without exposing more information than necessary.",
        },
        {
          title: "Accountability",
          result: "Full traceability",
          text:
            "A record of who authorised each agent, what it did, why, and who answers for the consequences.",
        },
      ],
    },
    callPage: {
      kicker: "Collaborate",
      title: "Let’s build the digital trust that AI needs, together",
      intro:
        "We are open to institutional co-development, European consortia, research partnerships, controlled pilots and conversations with investors.",
      bullets: [
        "Institutions: co-development and pilots",
        "Research: European consortia",
        "Companies: join a pilot",
        "Investors: request the dossier",
      ],
    },
  },

  es: {
    brand: "Gleam Peak AI",
    nav: {
      home: "Inicio",
      solutions: "Cyber Trust Passport",
      automation: "Plataforma",
      industries: "Ámbitos",
      cases: "Valores",
      call: "Colabora",
    },
    common: {
      switchLanguage: "EN",
      backHome: "Volver al inicio",
      nextStep: "Siguiente",
      discuss: "Hablemos",
      sendRequest: "Enviar mensaje",
      trustedTitle: "Proyecto insignia · Cyber Trust Passport",
      trustedHeadline: "Infraestructura de confianza digital e IA responsable",
      trustedItems: [
        "Ciberseguridad con IA",
        "Confianza digital verificable",
        "Gobernanza de agentes de IA",
        "Tecnologías de privacidad",
      ],
      trustBlocks: [
        {
          title: "Evidencias, no promesas",
          text: "Seguridad y gobernanza demostradas con evidencias obtenidas de sistemas reales.",
          icon: "shield",
        },
        {
          title: "Privacidad por diseño",
          text: "Demostramos que se cumple un control sin exponer los datos que lo sostienen.",
          icon: "workflow",
        },
        {
          title: "Pensado para ecosistemas",
          text: "Un despliegue institucional eleva la seguridad de todo un territorio o cadena de suministro.",
          icon: "chart",
        },
      ],
      form: {
        name: "Nombre",
        company: "Organización",
        email: "Correo profesional",
        message: "Cuéntanos qué te interesa: un piloto, un consorcio, investigación o el dossier para inversores",
      },
      statusBadge: "En desarrollo",
      formSending: "Enviando...",
      formSuccessTitle: "Mensaje enviado",
      formSuccessText: "Hemos recibido tu mensaje. Te responderemos lo antes posible.",
      formError: "No se pudo enviar el formulario. Inténtalo de nuevo.",
    },
    home: {
      kicker: "Infraestructura de confianza digital e IA responsable",
      title: "Infraestructura de confianza para una IA de impacto público",
      subtitle:
        "Desarrollamos infraestructura de inteligencia artificial responsable y ciberseguridad para que organizaciones y administraciones evalúen riesgos, gobiernen sus sistemas de IA y demuestren confianza digital con evidencias verificables.",
      ctas: {
        primary: "Colaborar con nosotros",
        secondary: "Conocer el pasaporte",
      },
      stats: [
        {
          value: "Evaluar riesgos",
          text: "Evaluación automatizada de riesgos de ciberseguridad e IA en sistemas reales.",
        },
        {
          value: "Gobernar la IA",
          text: "Controlar qué puede hacer cada agente de IA, con supervisión humana y registros auditables.",
        },
        {
          value: "Demostrar confianza",
          text: "Evidencias verificables que se comparten sin revelar información sensible.",
        },
      ],
      impact: {
        kicker: "El problema",
        title: "La IA avanza más rápido que la capacidad de supervisarla",
        intro:
          "Las organizaciones adoptan inteligencia artificial más rápido de lo que pueden controlarla. Los mecanismos actuales de supervisión son fragmentados, manuales y difíciles de verificar.",
        items: [
          "Falta de visibilidad: muchas organizaciones no saben qué sistemas de IA usan ni qué datos consultan",
          "Cumplimiento estático: una auditoría refleja un momento y, días después, todo ha cambiado",
          "Transparencia frente a privacidad: demostrar que eres seguro no debería obligarte a exponer tus datos",
          "Agentes de IA sin registro claro de quién los autorizó, qué hicieron ni cómo detenerlos",
          "Desigualdad de acceso: pymes y organismos locales no pueden pagar grandes equipos de seguridad",
          "Evidencias dispersas en documentos, cuestionarios y capturas que nadie puede verificar",
        ],
      },
      orchestration: {
        title: "Demuestra que cumples sin revelar lo que proteges",
        text:
          "El Cyber Trust Passport permite a una organización demostrar su seguridad y la gobernanza de su IA ante clientes, auditores y administraciones.",
        cards: [
          {
            title: "Evidencias de sistemas reales",
            text: "Controles de seguridad, copias, actualizaciones y accesos recogidos automáticamente, no en formularios.",
            icon: "message",
          },
          {
            title: "Confianza continua",
            text: "El estado de seguridad se actualiza todo el tiempo, no una vez al año.",
            icon: "workflow",
          },
          {
            title: "Privacidad por diseño",
            text: "Divulgación selectiva y pruebas de conocimiento cero: se demuestra sin exponer datos internos.",
            icon: "chart",
          },
        ],
      },
      solutionsSection: {
        kicker: "Capacidades",
        title: "Una sola plataforma para evaluar, controlar y demostrar",
        intro:
          "Ciberseguridad, gobernanza de IA y tecnologías de privacidad comparten arquitectura, propiedad intelectual y equipo. Cada módulo aumenta el valor de los demás.",
      },
      solutions: [
        {
          title: "Ciberseguridad con IA",
          text: "Evaluación de riesgos, análisis de configuraciones, priorización de vulnerabilidades y asistencia ante incidentes.",
          icon: "cpu",
        },
        {
          title: "Gobernanza de agentes de IA",
          text: "Inventario de agentes, permisos, autorización humana en decisiones sensibles y registro auditable de cada actuación.",
          icon: "bot",
        },
        {
          title: "Confianza digital verificable",
          text: "Evidencias automáticas, actualizadas y trazables, con divulgación selectiva y pruebas de conocimiento cero, que auditores y administraciones pueden comprobar.",
          icon: "brain",
        },
        {
          title: "Ciberresiliencia y simulación",
          text: "Simulación de ataques, fallos de proveedores y agentes fuera de sus permisos para preparar la respuesta. Línea futura.",
          icon: "chart",
        },
      ],
      industriesSection: {
        kicker: "Ámbitos",
        title: "Un despliegue institucional, un ecosistema más seguro",
        intro:
          "Una administración, un Cyber Hub o una gran empresa puede desplegar la plataforma para todas las organizaciones de un territorio o de una cadena de suministro.",
      },
      industries: [
        {
          title: "Administraciones públicas",
          text: "Supervisión de sistemas algorítmicos, control de agentes de IA y evaluación de proveedores tecnológicos.",
          icon: "shield",
        },
        {
          title: "Cyber Hubs y organismos europeos",
          text: "Elevar la ciberseguridad de todo un territorio con una infraestructura compartida.",
          icon: "brain",
        },
        {
          title: "Infraestructuras críticas",
          text: "Agua, energía, movilidad, salud y emergencias: verificar la seguridad de toda la cadena de proveedores.",
          icon: "workflow",
        },
        {
          title: "Grandes empresas",
          text: "Controlar la seguridad de cientos de proveedores desde un solo panel.",
          icon: "chart",
        },
        {
          title: "Aseguradoras de ciberriesgo",
          text: "Evaluar el riesgo con información continua y verificable, no con cuestionarios.",
          icon: "bot",
        },
        {
          title: "Cámaras y asociaciones empresariales",
          text: "Ofrecer a sus miembros una forma asequible de mejorar y demostrar su seguridad.",
          icon: "building",
        },
        {
          title: "Pymes y proveedores públicos",
          text: "Conocer sus riesgos, corregirlos y demostrar su seguridad ante clientes y administraciones.",
          icon: "message",
        },
        {
          title: "Ecosistemas digitales europeos",
          text: "Confianza interoperable entre empresas, auditores y autoridades.",
          icon: "sparkles",
        },
      ],
      finalCta: {
        kicker: "Colaboremos",
        title: "Construyamos juntos la confianza digital que necesita la IA",
        text:
          "Estamos abiertos al co-desarrollo institucional, a consorcios europeos, a colaboraciones de investigación y a entornos piloto controlados.",
        button: "Colaborar con nosotros",
      },
    },
    solutionsPage: {
      kicker: "Proyecto insignia · Cyber Trust Passport",
      title: "Demuestra que cumples. Sin revelar lo que proteges.",
      intro:
        "El Cyber Trust Passport permite a una organización demostrar de forma continua y verificable su nivel de ciberseguridad y la gobernanza de sus sistemas de IA, sin entregar su infraestructura, sus datos internos ni sus vulnerabilidades.",
      cards: [
        {
          title: "Conectar",
          text:
            "La organización conecta de forma segura sus herramientas de trabajo, su nube y sus equipos mediante conectores y un agente de software firmado.",
          icon: "brain",
        },
        {
          title: "Analizar",
          text:
            "La IA evalúa riesgos, prioriza vulnerabilidades y recomienda cómo corregirlas según NIS2, DORA, el Cyber Resilience Act, el RGPD y el Reglamento de IA.",
          icon: "cpu",
        },
        {
          title: "Demostrar",
          text:
            "Se genera una credencial verificable que se comparte por enlace, código QR, API o el portal de proveedores del cliente.",
          icon: "bot",
        },
        {
          title: "Conocimiento cero",
          text:
            "Una prueba criptográfica confirma que se cumple una condición, como «más del 95 % de los equipos actualizados», sin mostrar los datos que la sostienen.",
          icon: "chart",
        },
      ],
      listTitle: "Qué puede demostrar una organización",
      items: [
        "Qué controles de ciberseguridad tiene implantados",
        "Qué agentes y sistemas de IA utiliza",
        "Quién puede acceder a información sensible",
        "Si tiene copias verificadas y sistemas actualizados",
        "Si ha evaluado a sus proveedores tecnológicos",
        "Cómo ha gestionado sus incidentes",
      ],
    },
    automationPage: {
      kicker: "Plataforma · en desarrollo",
      title: "Una infraestructura central que se adapta a cada contexto institucional",
      intro:
        "La plataforma analiza, protege y recopila evidencias. El pasaporte demuestra la situación de confianza de la organización. Son dos caras de la misma tecnología.",
      items: [
        "Evaluación automatizada de riesgos",
        "Priorización de vulnerabilidades",
        "Asistente de respuesta ante incidentes",
        "Control de permisos de agentes de IA",
        "Autorización humana en decisiones sensibles",
        "Registro auditable de decisiones y acciones",
      ],
      processTitle: "Fases de desarrollo",
      processSubtitle: "Del pasaporte a la infraestructura pública de confianza",
      process: [
        {
          step: "01",
          title: "Pasaporte y evaluación de riesgos",
          text: "Registro de la organización, evaluación inicial, repositorio de evidencias, panel de controles, primera credencial y demostración de conocimiento cero.",
        },
        {
          step: "02",
          title: "Asistencia y respuesta",
          text: "Alertas, recomendaciones con IA, asistente de incidentes, planes de recuperación y notificaciones.",
        },
        {
          step: "03",
          title: "Gobernanza de agentes",
          text: "Inventario, permisos, supervisión humana, registro de actuaciones e interrupción de comportamientos anómalos.",
        },
        {
          step: "04",
          title: "Administraciones e infraestructuras críticas",
          text: "Adaptación a entornos públicos, ciudades, salud, agua, energía, movilidad y emergencias.",
        },
      ],
    },
    industriesPage: {
      kicker: "Ámbitos de aplicación",
      title: "Donde la confianza digital tiene mayor impacto público",
      intro:
        "Una infraestructura compartida eleva la seguridad de todo un ecosistema, no solo la de quien puede pagar las soluciones más caras.",
      cards: [
        {
          title: "Administraciones públicas",
          text: "Evaluación de proveedores, supervisión de sistemas algorítmicos, registro de decisiones automatizadas y auditoría de IA adquirida a terceros. Siempre con supervisión humana.",
          icon: "shield",
        },
        {
          title: "Cyber Hubs y organismos europeos",
          text: "Despliegue territorial del pasaporte y conexión futura con CSIRT y autoridades para la notificación de incidentes.",
          icon: "brain",
        },
        {
          title: "Infraestructuras críticas",
          text: "Agua, energía, movilidad, salud y emergencias dependen de muchos proveedores. La plataforma ayuda a verificar la seguridad de toda la cadena.",
          icon: "workflow",
        },
        {
          title: "Grandes empresas",
          text: "Un panel para ver qué proveedores cumplen, recibir alertas cuando uno deja de cumplir y verificar pruebas criptográficas.",
          icon: "chart",
        },
        {
          title: "Aseguradoras de ciberriesgo",
          text: "Información de riesgo continua y verificable para evaluar y acompañar a sus asegurados.",
          icon: "bot",
        },
        {
          title: "Cámaras y asociaciones empresariales",
          text: "Un servicio para sus miembros que eleva la seguridad del tejido empresarial de un territorio.",
          icon: "building",
        },
        {
          title: "Pymes y proveedores públicos",
          text: "Una forma asequible de conocer sus riesgos, corregirlos y demostrar su seguridad sin grandes equipos técnicos.",
          icon: "message",
        },
        {
          title: "Ecosistemas digitales europeos",
          text: "Evidencias interoperables con los marcos europeos de identidad y credenciales digitales.",
          icon: "sparkles",
        },
      ],
    },
    casesPage: {
      kicker: "Valores",
      title: "IA que amplía las capacidades humanas sin reducir derechos",
      intro:
        "Diseñamos sistemas que puedan ser supervisados, cuestionados y auditados. Nuestro objetivo no es acelerar la IA a cualquier coste, sino construir la confianza necesaria para usarla de forma responsable.",
      cards: [
        {
          title: "Dignidad y autonomía",
          result: "Supervisión humana",
          text:
            "Autorización humana obligatoria en decisiones sensibles. La IA recomienda; las personas deciden y responden.",
        },
        {
          title: "Protección de datos",
          result: "Privacidad por diseño",
          text:
            "Divulgación selectiva y pruebas de conocimiento cero para demostrar sin exponer más información de la necesaria.",
        },
        {
          title: "Responsabilidad",
          result: "Trazabilidad completa",
          text:
            "Registro de quién autorizó cada agente, qué hizo, por qué y quién responde de sus consecuencias.",
        },
      ],
    },
    callPage: {
      kicker: "Colabora",
      title: "Construyamos juntos la confianza digital que necesita la IA",
      intro:
        "Estamos abiertos al co-desarrollo institucional, a consorcios europeos, a colaboraciones de investigación, a pilotos controlados y a conversaciones con inversores.",
      bullets: [
        "Instituciones: co-desarrollo y pilotos",
        "Investigación: consorcios europeos",
        "Empresas: participar en un piloto",
        "Inversores: solicitar el dossier",
      ],
    },
  },
};

const pageOrder: PageKey[] = ["home", "solutions", "automation", "industries", "cases", "call"];
type Locale = "en" | "es";

type LocaleContent = {
  brand: string;
  nav: {
    home: string;
    solutions: string;
    automation: string;
    industries: string;
    cases: string;
    call: string;
  };
  common: {
    switchLanguage: string;
    backHome: string;
    nextStep: string;
    discuss: string;
    sendRequest: string;
    trustedTitle: string;
    trustedHeadline: string;
    trustedItems: any[];
    trustBlocks: readonly {
  title: string;
  text: string;
  icon: string;
}[];
    form: {
      name: string;
      company: string;
      email: string;
      message: string;
    };
    statusBadge: string;
    formSending: string;
    formSuccessTitle: string;
    formSuccessText: string;
    formError: string;
  };
  home: any;
  solutionsPage: any;
  automationPage: any;
  industriesPage: any;
  casesPage: any;
  callPage: any;
};
const pageAnimation = {
  initial: { opacity: 0, y: 18 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.32, ease: "easeOut" as const },
};

const textStyles = {
 heroTitle:
  "mt-5 max-w-[10.5ch] text-[34px] font-semibold leading-[0.96] tracking-[-0.045em] text-white sm:text-[44px] lg:text-[50px] xl:text-[56px]",

  heroSubtitle:
    "mt-6 max-w-2xl text-[19px] leading-9 text-white/80 sm:text-[20px]",

  sectionTitle:
  "mt-4 max-w-4xl text-[38px] font-semibold leading-[1.06] tracking-[-0.04em] text-white sm:text-[46px] lg:text-[54px]",

  sectionIntro:
  "mt-6 max-w-4xl text-[20px] leading-9 text-white/76 sm:text-[21px]",

  pageTitle:
    "mt-4 max-w-5xl text-[38px] font-semibold leading-[1.04] tracking-[-0.04em] text-white sm:text-[46px] lg:text-[54px]",

  pageIntro:
    "mt-6 max-w-4xl text-[19px] leading-9 text-white/76 sm:text-[20px]",

  cardTitle:
    "text-[26px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[28px]",

  cardText:
    "mt-4 text-[18px] leading-8 text-white/78 sm:text-[19px]",

  compactTitle:
    "text-[26px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[28px]",

  compactText:
    "mt-4 text-[18px] leading-8 text-white/78 sm:text-[18px]",

  kicker:
    "text-[13px] uppercase tracking-[0.24em] text-fuchsia-200/75",

  button:
    "text-[17px] font-semibold sm:text-[18px]",
};

export default function GleamPeakWebsite() {
  const [lang, setLang] = useState<Lang>("es");
  const [page, setPage] = useState<PageKey>("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
    return () => {
      document.body.style.overflow = "auto";
    };

  }, [menuOpen]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

const base = content.en as any;
const selected = (content as any)[lang] ?? base;

const t = {
  ...base,
  ...selected,

  home: {
    ...base.home,
    ...selected.home,

    impact: {
      ...base.home.impact,
      ...selected.home?.impact,
    },

    solutionsSection: {
      ...base.home.solutionsSection,
      ...selected.home?.solutionsSection,
    },

    industriesSection: {
      ...base.home.industriesSection,
      ...selected.home?.industriesSection,
    },

    orchestration: {
      ...base.home.orchestration,
      ...selected.home?.orchestration,
    },
  },

  solutionsPage: {
    ...base.solutionsPage,
    ...(selected.solutionsPage ?? selected.home?.solutionsPage),
  },

  automationPage: {
    ...base.automationPage,
    ...(selected.automationPage ?? selected.home?.automationPage),
  },

  industriesPage: {
    ...base.industriesPage,
    ...(selected.industriesPage ?? selected.home?.industriesPage),
  },

  casesPage: {
    ...base.casesPage,
    ...(selected.casesPage ?? selected.home?.casesPage),
  },

  callPage: {
    ...base.callPage,
    ...(selected.callPage ?? selected.home?.callPage),
  },
} as any;
  const navItems = useMemo(
    () => [
      { key: "home" as const, label: t.nav.home },
      { key: "solutions" as const, label: t.nav.solutions },
      { key: "automation" as const, label: t.nav.automation },
      { key: "industries" as const, label: t.nav.industries },
      { key: "cases" as const, label: t.nav.cases },
      { key: "call" as const, label: t.nav.call },
    ],
    [t]
  );

  const changePage = (nextPage: PageKey) => {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentIndex = pageOrder.indexOf(page);
  const nextPage = currentIndex >= 0 && currentIndex < pageOrder.length - 1 ? pageOrder[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#06010e] text-white selection:bg-fuchsia-500/30 selection:text-white">
      <BackgroundGlow />

      <header className="fixed left-0 right-0 top-0 z-[100] border-b border-white/10 bg-[#070114]/85 backdrop-blur-xl">
        <div className="mx-auto flex h-[70px] max-w-7xl items-center justify-between px-6 lg:px-8">
          <button
  onClick={() => changePage("home")}
  className="group cursor-pointer flex items-center"
>
            <Image
              src="/logo.png"
              alt="Gleam Peak AI"
              width={300}
              height={110}
              priority
              className={`h-auto transition-all duration-300 group-hover:scale-[1.02] ${scrolled ? "w-[148px] sm:w-[176px] md:w-[210px]" : "w-[160px] sm:w-[192px] md:w-[228px]"}`}
            />
          </button>

          <nav className="hidden md:flex items-center gap-7 text-[17px] font-medium text-white/72">
  {navItems.map((item) => (
    <button
      key={item.key}
      onClick={() => changePage(item.key)}
      style={{ cursor: "pointer" }}
      className={`cursor-pointer transition hover:text-white ${
        page === item.key ? "text-white" : "text-white/72"
      }`}
    >
      {item.label}
    </button>
  ))}
</nav>

          <div className="flex items-center gap-3">
            <button onClick={() => setLang(lang === "en" ? "es" : "en")} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/5 px-4 py-2 text-sm font-medium text-white/85 transition hover:bg-white/10">
              <Globe className="h-4 w-4" />
              {t.common.switchLanguage}
            </button>

            <button onClick={() => setMenuOpen((prev) => !prev)} className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/5 p-2.5 text-white transition hover:bg-white/10 md:hidden" aria-label="Open menu">
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
            
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div initial={{ opacity: 0, y: -18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -14, scale: 0.985 }} transition={{ duration: 0.24, ease: "easeOut" }} className="fixed inset-0 z-[9999] overflow-y-auto bg-[rgba(7,1,20,0.94)] px-5 pb-6 pt-24 backdrop-blur-2xl md:hidden">
            <div className="mx-auto flex max-w-7xl flex-col gap-3">
              {navItems.map((item) => (
                <button key={item.key} onClick={() => changePage(item.key)} className={`rounded-[22px] border px-4 py-4 text-left text-[15px] font-medium tracking-[-0.01em] transition duration-300 ${page === item.key ? "border-fuchsia-400/30 bg-white/10 text-white shadow-[0_8px_30px_rgba(120,40,180,0.12)]" : "border-white/8 bg-white/5 text-white/78 hover:bg-white/10 hover:text-white"}`}>
                  {item.label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
</AnimatePresence>

<main className="mx-auto max-w-7xl px-5 pb-16 pt-24 lg:px-8 lg:pb-24 lg:pt-28">
  <AnimatePresence mode="wait">
    <motion.div key={`${page}-${lang}`} {...pageAnimation}>
      {page === "home" && <HomePage t={t} changePage={changePage} />}
      {page === "solutions" && (
        <SolutionsPage
          t={t}
          changePage={changePage}
          nextPage={nextPage}
        />
      )}
      {page === "automation" && (
        <AutomationPage
          t={t}
          changePage={changePage}
          nextPage={nextPage}
        />
      )}
      {page === "industries" && (
        <IndustriesPage
          t={t}
          changePage={changePage}
          nextPage={nextPage}
        />
      )}
      {page === "cases" && (
        <CasesPage
          t={t}
          changePage={changePage}
          nextPage={nextPage}
        />
      )}
      {page === "call" && <CallPage t={t} changePage={changePage} />}
    </motion.div>
  </AnimatePresence>

  <FloatingButton lang={lang} />
</main>

<Footer lang={lang} />

<AssistantChat
  bookingUrl={process.env.NEXT_PUBLIC_BOOKING_URL || "#"}
  lang={lang}
/>
</div>
);
}

function BackgroundGlow() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.24),transparent_30%),radial-gradient(circle_at_78%_16%,rgba(217,70,239,0.12),transparent_18%),radial-gradient(circle_at_20%_78%,rgba(124,58,237,0.12),transparent_22%),linear-gradient(to_bottom,#05010d,#10031d,#05010d)]" />

      <motion.div
        animate={{ scale: [1, 1.08, 1], opacity: [0.18, 0.28, 0.18] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-[10%] top-24 h-64 w-64 rounded-full bg-fuchsia-500/20 blur-3xl"
      />

      <motion.div
        animate={{ x: [0, 18, 0], y: [0, 14, 0], opacity: [0.12, 0.2, 0.12] }}
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[8%] top-40 h-80 w-80 rounded-full bg-violet-500/20 blur-3xl"
      />

      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.08, 0.16, 0.08] }}
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
        className="absolute left-1/2 top-[28rem] h-72 w-72 -translate-x-1/2 rounded-full bg-blue-500/10 blur-3xl"
      />

      <div className="absolute left-1/2 top-[7rem] h-[28rem] w-[28rem] -translate-x-1/2 rounded-full border border-white/5" />
    </div>
  );
}

function HomePage({ t, changePage }: { t: any; changePage: (page: PageKey) => void }) {
  return (
    <>
      <section className="pt-1 pb-16 lg:pt-2">

        <div className="grid items-start gap-12 lg:grid-cols-[1.02fr_0.98fr]">

          {/* LEFT */}

          <div>

            <p className="inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-fuchsia-100/85">
              <Sparkles className="h-3.5 w-3.5"/>
              {t.home.kicker}
            </p>

            <h1 className={textStyles.heroTitle}>
  {t.home.title}
</h1>

            <p className="mt-7 max-w-2xl text-[22px] leading-10 text-white/82 sm:text-[24px]">

              {t.home.subtitle}

            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <button
                onClick={() => changePage("call")}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 text-[18px] font-semibold text-[#12041e] shadow-[0_10px_30px_rgba(255,255,255,0.12)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                {t.home.ctas.primary}
                <ArrowRight className="h-4 w-4"/>
              </button>

              <button
                onClick={() => changePage("solutions")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-4 text-[18px] font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/20 hover:bg-white/[0.08] hover:shadow-[0_12px_32px_rgba(90,35,160,0.18)]"
              >
                {t.home.ctas.secondary}
                <ChevronRight className="h-4 w-4"/>
              </button>

            </div>

          </div>
          
          
          {/* RIGHT PANEL */}

          <div className="relative">

            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/10 via-violet-500/5 to-transparent blur-3xl"/>
            <div className="mb-6 overflow-hidden rounded-[1.5rem] border border-white/10">
  <Image
    src="/hero-ai-network.webp"
    alt="Gleam Peak AI trusted AI infrastructure"
    width={1600}
    height={900}
    className="h-auto w-full object-cover"
    priority
  />
</div>

            <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[#0c0617]/90 p-8 shadow-[0_20px_80px_rgba(20,6,40,0.45)]">
            
              <div className="flex items-center justify-between mb-6">

                <div>

                  <p className="text-[12px] uppercase tracking-[0.22em] text-white/55">

                    {t.common.trustedTitle}

                  </p>

                  <h3 className="mt-2 text-[24px] font-semibold leading-tight text-white">

                    {t.home.orchestration.title}

                  </h3>

                </div>

                <div className="flex items-center gap-2 rounded-full border border-green-400/30 bg-green-400/10 px-3 py-1 text-xs text-green-300">
                  <span className="h-2 w-2 rounded-full bg-green-400"/>
                  {t.common.statusBadge}
                </div>

              </div>

              <div className="grid gap-4">

                {t.home.orchestration.cards.map((card: any) => {

                  const Icon = iconMap[card.icon as IconKey] ?? Sparkles;

                  return (

                    <div
                      key={card.title}
                      className="rounded-[18px] border border-white/10 bg-[#12081f] p-3.5 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/20 hover:shadow-[0_16px_40px_rgba(90,35,160,0.22)]"
                    >

                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                        <Icon className="h-5 w-5 text-fuchsia-200"/>
                      </div>

                      <h4 className="text-[18px] font-semibold leading-tight tracking-[-0.02em] text-white sm:text-[20px]">
  {card.title}
</h4>

<p className="mt-3 text-[15px] leading-7 text-white/76 sm:text-[16px]">
  {card.text}
</p>

                    </div>

                  );

                })}

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* IMPACT */}

      <section className="pt-10 pb-16">

        <SectionHeader
          kicker={t.home.impact.kicker}
          title={t.home.impact.title}
          intro={t.home.impact.intro}
        />

        <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">

          {t.home.impact.items.map((item: any) => (

            <div
              key={item}
              className="rounded-[20px] border border-white/10 bg-[#0d0618] px-6 py-5 text-[19px] leading-8 text-white/84 shadow-[0_8px_24px_rgba(80,30,140,0.12)]"
            >
              {item}
            </div>

          ))}

        </div>
      </section>

      {/* SOLUTIONS */}

      <section className="pb-20">

        <SectionHeader
          kicker={t.home.solutionsSection.kicker}
          title={t.home.solutionsSection.title}
          intro={t.home.solutionsSection.intro}
        />

        <div className="mt-14 grid gap-8 md:grid-cols-2">

          {t.home.solutions.map((item: any) => {

            const Icon = iconMap[item.icon as IconKey] ?? Sparkles;

            return (
              <FeatureCard
                key={item.title}
                icon={Icon}
                title={item.title}
                text={item.text}
              />
            );

          })}

        </div>

      </section>

      {/* INDUSTRIES */}

      <section className="pb-20">

        <SectionHeader
          kicker={t.home.industriesSection.kicker}
          title={t.home.industriesSection.title}
          intro={t.home.industriesSection.intro}
        />

        <div className="mt-14 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

          {t.home.industries.map((item: any) => {

            const Icon = iconMap[item.icon as IconKey] ?? Building2;

            return (
              <CompactCard
                key={item.title}
                icon={Icon}
                title={item.title}
                text={item.text}
              />
            );

          })}

        </div>

      </section>

    </>
  );
}

function SolutionsPage({ t, changePage, nextPage }: { t: any; changePage: (page: PageKey) => void; nextPage: PageKey | null }) {
  return (
    <PageShell
  kicker={t.solutionsPage.kicker}
  title={t.solutionsPage.title}
  intro={t.solutionsPage.intro}
  
>
      
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {t.solutionsPage.cards.map((card: any) => {

          const Icon = iconMap[card.icon as IconKey] ?? BrainCircuit;
          return <FeatureCard key={card.title} icon={Icon} title={card.title} text={card.text} button={t.common.discuss} onClick={() => changePage("call")} />;
        })}
      </div>

      <div className="mt-12 rounded-[1.8rem] border border-white/10 bg-[#0d0618] p-8">
        <h3 className="text-[30px] font-semibold tracking-[-0.03em] text-white sm:text-[34px]">{t.solutionsPage.listTitle}</h3>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {t.solutionsPage.items.map((item: any) => (
            <div key={item} className="rounded-2xl border border-white/8 bg-white/[0.03] px-5 py-4 text-white/82">
              {item}
            </div>
          ))}
        </div>
      </div>

      <PageFooterNav t={t} changePage={changePage} nextPage={nextPage} />
    </PageShell>
  );
}

function AutomationPage({ t, changePage, nextPage }: { t: any; changePage: (page: PageKey) => void; nextPage: PageKey | null }) {
  return (
    <PageShell
  kicker={t.automationPage.kicker}
  title={t.automationPage.title}
  intro={t.automationPage.intro}  
>
    

      <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div className="grid gap-4 sm:grid-cols-2">
          {t.automationPage.items.map((item: any) => (
            <div key={item} className="rounded-2xl border border-white/8 bg-[#0d0618] px-5 py-4 text-[17px] font-medium leading-7 text-white/84 sm:text-[18px]">
              {item}
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-7">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#11071d] p-6">
            <p className="text-[16px] font-medium text-white/58">{t.automationPage.processTitle}</p>
            <h3 className="mt-3 text-[34px] font-semibold leading-tight tracking-[-0.03em] text-white sm:text-[38px]">{t.automationPage.processSubtitle}</h3>
            <div className="mt-8 space-y-4">
              {t.automationPage.process.map((item: any) => (
                <div key={item.step} className="flex gap-4 border-t border-white/8 pt-4 first:border-t-0 first:pt-0">
                  <div className="text-[15px] font-semibold tracking-[0.18em] text-fuchsia-200/80">{item.step}</div>
                  <div>
                    <h4 className="text-[20px] font-semibold leading-tight text-white">{item.title}</h4>
                    <p className="mt-2 text-[16px] leading-7 text-white/72">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <PageFooterNav t={t} changePage={changePage} nextPage={nextPage} />
    </PageShell>
  );
}

function IndustriesPage({ t, changePage, nextPage }: { t: any; changePage: (page: PageKey) => void; nextPage: PageKey | null }) {
  return (
    <PageShell
  kicker={t.industriesPage.kicker}
  title={t.industriesPage.title}
  intro={t.industriesPage.intro}
  imageSrc="/team-collaboration.webp"
  imageAlt="Gleam Peak AI sectors"
>
      

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {t.industriesPage.cards.map((industry: any) => {
          const Icon = iconMap[industry.icon as IconKey] ?? Building2;
          return <CompactCard key={industry.title} icon={Icon} title={industry.title} text={industry.text} />;
        })}
      </div>

      <PageFooterNav t={t} changePage={changePage} nextPage={nextPage} />
    </PageShell>
  );
}

function CasesPage({ t, changePage, nextPage }: { t: any; changePage: (page: PageKey) => void; nextPage: PageKey | null }) {
  return (
    <PageShell
  kicker={t.casesPage.kicker}
  title={t.casesPage.title}
  intro={t.casesPage.intro}
  imageSrc="/decision-intelligence.webp"
  imageAlt="Gleam Peak AI values"
>
      

      <div className="grid gap-6 lg:grid-cols-3">
        {t.casesPage.cards.map((item: any) => (
          <div key={item.title} className="rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-7">
            <div className="flex items-center justify-between gap-4">
              <Bot className="h-5 w-5 text-fuchsia-200" />
              <span className="rounded-full border border-fuchsia-300/15 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-100/90">
                {item.result}
              </span>
            </div>
            <h3 className="mt-7 text-[30px] font-semibold leading-tight tracking-[-0.03em] text-white">{item.title}</h3>
            <p className="mt-5 text-[18px] leading-8 text-white/74">{item.text}</p>
          </div>
        ))}
      </div>

      <PageFooterNav t={t} changePage={changePage} nextPage={nextPage} />
    </PageShell>
  );
}

function CallPage({ t, changePage }: { t: any; changePage: (page: PageKey) => void }) {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
  event.preventDefault();
  setFormStatus("sending");

  const form = event.currentTarget;
  const formData = new FormData(form);
  const object = Object.fromEntries(formData);
  const json = JSON.stringify(object);

  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: json,
    });

    const result = await response.json();

    if (result.success) {
      setFormStatus("success");
      form.reset();
    } else {
      setFormStatus("error");
    }
  } catch {
    setFormStatus("error");
  }
};

  return (
    <PageShell
  kicker={t.callPage.kicker}
  title={t.callPage.title}
  intro={t.callPage.intro}
  
>


      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-500/12 via-violet-500/8 to-white/[0.04] shadow-2xl">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/8 p-8 lg:border-b-0 lg:border-r lg:p-10">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08]">
              <Sparkles className="h-6 w-6 text-fuchsia-200" />
            </div>

            <div className="space-y-4 text-sm text-white/62">
              {t.callPage.bullets.map((item: string) => (
                <div key={item}>• {item}</div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit} className="p-8 lg:p-10">
            <input
              type="hidden"
              name="access_key"
              value="12e58551-aa3f-45d1-8cac-508dbd82cc17"
            />

            <input
              type="hidden"
              name="subject"

              value="New lead from Gleam Peak"
            />

            <input
              type="hidden"
              name="from_name"
              value="Gleam Peak Website"
            />

            <input
              type="checkbox"
              name="botcheck"
              className="hidden"
              style={{ display: "none" }}
            />

            {formStatus === "success" ? (
              <div className="rounded-[1.5rem] border border-fuchsia-300/20 bg-white/[0.06] p-8 text-center">
                <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-300/20 bg-fuchsia-500/15 text-fuchsia-100">
                  ✓
                </div>
                <h3 className="text-[26px] font-semibold text-white">
                  {t.common.formSuccessTitle}
                </h3>
                <p className="mt-4 text-[17px] leading-8 text-white/70">
                  {t.common.formSuccessText}
                </p>
              </div>
            ) : (
              <>
                <div className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="mb-3 block text-[17px] font-medium text-white/72">
                      {t.common.form.name}
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      className="w-full rounded-2xl border border-white/10 bg-[#12071d] px-5 py-4 text-[17px] text-white placeholder:text-white/32 outline-none"
                      placeholder={t.common.form.name}
                    />
                  </div>

                  <div>
                    <label className="mb-3 block text-[17px] font-medium text-white/72">
                      {t.common.form.company}
                    </label>
                    <input
                      type="text"
                      name="company"
                      className="w-full rounded-2xl border border-white/10 bg-[#12071d] px-5 py-4 text-[17px] text-white placeholder:text-white/32 outline-none"
                      placeholder={t.common.form.company}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-3 block text-[17px] font-medium text-white/72">
                      {t.common.form.email}
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full rounded-2xl border border-white/10 bg-[#12071d] px-5 py-4 text-[17px] text-white placeholder:text-white/32 outline-none"
                      placeholder={t.common.form.email}
                    />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="mb-3 block text-[17px] font-medium text-white/72">
                      {t.common.form.message}
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      className="w-full rounded-2xl border border-white/10 bg-[#12071d] px-5 py-4 text-[17px] text-white placeholder:text-white/32 outline-none"
                      placeholder=""
                    />
                  </div>
                </div>

                {formStatus === "error" && (
                  <p className="mt-4 text-sm text-red-300">
                    {t.common.formError}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-[15px] font-semibold text-[#13031d] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {formStatus === "sending" ? t.common.formSending : t.common.sendRequest}
                  <ArrowRight className="h-4 w-4" />
                </button>
              </>
            )}
          </form>
        </div>
      </div>

      <div className="mt-8 flex justify-start">
        <button
          onClick={() => changePage("home")}
          className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white"
        >
          <ChevronRight className="h-4 w-4 rotate-180" />
          {t.common.backHome}
        </button>
      </div>
    </PageShell>
  );
}

function PageShell({
  kicker,
  title,
  intro,
  imageSrc,
  imageAlt,
  children,
}: {
  kicker: string;
  title: string;
  intro: string;
  imageSrc?: string;
  imageAlt?: string;
  children: ReactNode;
}) {
  const hasImage = Boolean(imageSrc && imageAlt);

  return (
    <section>
      <div
        className={
          hasImage
            ? "grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center"
            : "max-w-5xl"
        }
      >
        <div className="max-w-4xl">
          <p className={textStyles.kicker}>{kicker}</p>
          <h1 className={textStyles.pageTitle}>{title}</h1>
          <p className={textStyles.pageIntro}>{intro}</p>
        </div>

        {hasImage ? (
          <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(20,6,40,0.35)]">
            <Image
              src={imageSrc!}
              alt={imageAlt!}
              width={1600}
              height={900}
              className="h-auto w-full object-cover"
              sizes="(max-width: 768px) 100vw, 680px"
            />
          </div>
        ) : null}
      </div>

      <div className="mt-12">{children}</div>
    </section>
  );
}

function SectionHeader({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return (
    <div className="max-w-4xl">
      <p className={textStyles.kicker}>{kicker}</p>
      <h2 className={textStyles.sectionTitle}>{title}</h2>
      <p className={textStyles.sectionIntro}>{intro}</p>
    </div>
  );
}

function FeatureCard({
  icon: Icon,
  title,
  text,
  button,
  onClick,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
  button?: string;
  onClick?: () => void;
}) {
  return (
    <div className="rounded-[28px] border border-white/10 bg-white/[0.05] p-7 shadow-[0_10px_30px_rgba(30,10,60,0.18)] transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/20 hover:shadow-[0_16px_40px_rgba(90,35,160,0.22)]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08]">
        <Icon className="h-5 w-5 text-fuchsia-200" />
      </div>

      <h3 className={textStyles.cardTitle}>
        {title}
      </h3>

      <p className={textStyles.cardText}>
        {text}
      </p>

      {button && onClick ? (
        <button
          onClick={onClick}
          className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/86"
        >
          {button}
          <ChevronRight className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}

function CompactCard({
  icon: Icon,
  title,
  text,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  text: string;
}) {
  return (
    <div className="rounded-[24px] border border-white/10 bg-white/[0.04] p-6 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/20 hover:shadow-[0_16px_40px_rgba(90,35,160,0.22)]">
      <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.06]">
        <Icon className="h-5 w-5 text-fuchsia-200" />
      </div>
      <h3 className={textStyles.compactTitle}>
  {title}
</h3>

<p className={textStyles.compactText}>
  {text}
</p>
    </div>
  );
}

function VisualImage({
  src,
  alt,
}: {
  src: string;
  alt: string;
}) {
  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] shadow-[0_20px_80px_rgba(20,6,40,0.45)]">
      <Image
        src={src}
        alt={alt}
        width={1600}
        height={900}
        className="h-auto w-full object-cover"
      />
    </div>
  );
}

function PageFooterNav({ t, changePage, nextPage }: { t: any; changePage: (page: PageKey) => void; nextPage: PageKey | null }) {
  return (
    <div className="mt-10 flex flex-col gap-4 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
      <button onClick={() => changePage("home")} className="inline-flex items-center gap-2 text-sm text-white/68 transition hover:text-white">
        <ChevronRight className="h-4 w-4 rotate-180" />
        {t.common.backHome}
      </button>

      {nextPage ? (
        <button onClick={() => changePage(nextPage)} className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-fuchsia-200">
          {t.common.nextStep}
          <ArrowRight className="h-4 w-4" />
        </button>
      ) : null}
    </div>
  );
}
