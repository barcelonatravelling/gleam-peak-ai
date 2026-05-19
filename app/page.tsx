
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
      solutions: "AI Solutions",
      automation: "AI Automation",
      industries: "Industries",
      cases: "Case Studies",
      call: "Book a Call",
    },
    common: {
      switchLanguage: "ES",
      backHome: "Back to Home",
      nextStep: "Next step",
      discuss: "Discuss this solution",
      sendRequest: "Send request",
      trustedTitle: "Built for ambitious companies",
      trustedHeadline: "AI systems designed to work inside real operations",
      trustedItems: [
        "AI strategy",
        "Workflow automation",
        "Customer assistants",
        "Internal knowledge systems",
      ],
      trustBlocks: [
        {
          title: "Clear business focus",
          text: "We start with the process, the team and the business goal — before designing anything.",
          icon: "shield",
        },
        {
          title: "Built for real workflows",
          text: "We connect AI directly to your existing tools, data and daily operations.",
          icon: "workflow",
        },
        {
          title: "Designed to scale",
          text: "We reduce manual work, improve response speed and create measurable operational value from day one.",
          icon: "chart",
        },
      ],
      form: {
        name: "Name",
        company: "Company",
        email: "Work email",
        message: "Tell us what you want to improve, automate or scale",
      },
    },
    home: {
      kicker: "AI automation for modern operations",
      title: "We help companies automate processes with AI",
      subtitle:
        "We design AI systems that reduce operational load, accelerate execution and help businesses scale with less friction.",
      ctas: {
        primary: "Book a strategic call",
        secondary: "Explore solutions",
      },
      stats: [
        {
          value: "Eliminate manual load",
          text: "Automate repetitive tasks across sales, operations, support and internal workflows.",
        },
        {
          value: "Respond before competitors do",
          text: "Use AI assistants to qualify, route and respond to customers with more speed and consistency.",
        },
        {
          value: "Decisions backed by real data",
          text: "Turn business data and internal knowledge into practical decision support.",
        },
      ],
      impact: {
        kicker: "Business impact",
        title: "What AI can improve in your company",
        intro:
          "The right AI system should make the business faster, clearer and easier to scale.",
        items: [
          "Automate repetitive operational tasks",
          "Respond faster to customers and leads",
          "Reduce manual follow-up and internal coordination",
          "Improve visibility across teams and processes",
          "Turn company knowledge into useful answers",
          "Create systems that support growth without adding complexity",
        ],
      },
      orchestration: {
        title: "What we can automate",
        text:
          "We identify the workflows where AI can reduce manual load and improve speed, consistency and execution.",
        cards: [
          {
            title: "Customer response",
            text: "Automate replies, lead qualification, follow-up and routing so opportunities are handled faster.",
            icon: "message",
          },
          {
            title: "Internal operations",
            text: "Reduce repetitive tasks, manual coordination and process bottlenecks across the business.",
            icon: "workflow",
          },
          {
            title: "Business intelligence",
            text: "Transform documents, data and internal knowledge into answers, reports and decision support.",
            icon: "chart",
          },
        ],
      },
      solutionsSection: {
        kicker: "AI solutions",
        title: "Practical AI systems for real business processes",
        intro:
          "We do not build generic AI tools. We design systems around your workflows, your team and the outcomes you want to improve.",
      },
      solutions: [
        {
          title: "AI Automation",
          text: "Automate repetitive tasks, internal workflows and operational processes that slow the business down.",
          icon: "cpu",
        },
        {
          title: "AI Assistants",
          text: "Deploy assistants for customer support, lead qualification, reservations, internal requests or knowledge access.",
          icon: "bot",
        },
        {
          title: "AI Knowledge Systems",
          text: "Convert company documents, procedures and internal knowledge into searchable, useful and secure AI systems.",
          icon: "brain",
        },
        {
          title: "Decision Support",
          text: "Use AI to summarize data, generate reports and give teams clearer visibility to make better decisions.",
          icon: "chart",
        },
      ],
      industriesSection: {
        kicker: "Industries",
        title: "AI adapted to the way each business operates",
        intro:
          "From logistics and retail to hospitality, services and wellness, we adapt AI to the real workflows of each sector.",
      },
      industries: [
        {
          title: "Financial Services",
          text: "Automation for risk review, compliance workflows, internal support and faster decision processes.",
          icon: "shield",
        },
        {
          title: "Technology & SaaS",
          text: "AI copilots, support automation and internal systems for faster product and business execution.",
          icon: "brain",
        },
        {
          title: "Logistics & Operations",
          text: "Workflow automation, customer updates, resource planning and operational visibility.",
          icon: "workflow",
        },
        {
          title: "Retail & Commerce",
          text: "Customer support, lead follow-up, demand signals and commercial automation.",
          icon: "chart",
        },
        {
          title: "Healthcare & Life Sciences",
          text: "Support workflows, operational coordination and knowledge systems for complex environments.",
          icon: "bot",
        },
        {
          title: "Professional Services",
          text: "Document workflows, internal copilots and knowledge systems that improve speed and consistency.",
          icon: "building",
        },
        {
          title: "Hospitality & Travel",
          text: "AI for inquiries, bookings, multilingual support, upselling and guest coordination.",
          icon: "message",
        },
        {
          title: "Luxury & Wellness",
          text: "AI built for premium service — concierge, client care and elite operations that demand consistency, discretion and high-touch execution.",
          icon: "sparkles",
        },
      ],
      finalCta: {
        kicker: "Start where it matters most",
        title: "Find where AI creates the highest business impact",
        text:
          "We help you identify the right use case, design the system and move from idea to measurable results.",
        button: "Book a strategic call",
      },
    },
    solutionsPage: {
      kicker: "AI Solutions",
      title: "Enterprise AI systems built around strategic business value",
      intro:
        "We design applied AI systems that become part of how your company operates — improving execution speed, operational intelligence and growth capacity at scale.",
      cards: [
        {
          title: "Enterprise AI Strategy",
          text:
            "Find where AI creates the fastest measurable return, define the right architecture and build a roadmap aligned with real business outcomes.",
          icon: "brain",
        },
        {
          title: "Operational AI Systems",
          text:
            "Deploy intelligent systems that coordinate workflows, automate execution and create operational capacity across business units.",
          icon: "cpu",
        },
        {
          title: "Enterprise AI Agents",
          text:
            "Private AI agents trained on company workflows, documentation and business logic that assist teams, customers and internal operations.",
          icon: "bot",
        },
        {
          title: "Decision Intelligence Layers",
          text:
            "Transform fragmented data into executive intelligence, predictive signals and systems that support faster, sharper decisions.",
          icon: "chart",
        },
      ],
      listTitle: "What we build",
      items: [
        "Private enterprise AI layers",
        "AI operating systems for workflows",
        "Executive intelligence infrastructure",
        "Autonomous operational coordination",
        "Knowledge systems connected to company data",
        "Predictive and decision-support engines",
      ],
    },
    automationPage: {
      kicker: "AI Automation",
      title: "Intelligent infrastructure for next-generation operations",
      intro:
        "We design AI systems that coordinate, prioritize and execute complex workflows across teams, tools and business units — without adding operational complexity.",
      items: [
        "Multi-system orchestration",
        "Decision engines",
        "Private enterprise copilots",
        "Predictive automation",
        "AI workflow intelligence",
        "AI-assisted autonomous operations",
      ],
      processTitle: "How we work",
      processSubtitle: "From manual process to intelligent operating system",
      process: [
        {
          step: "01",
          title: "Operational mapping",
          text: "We identify critical workflows, dependencies, bottlenecks and areas where AI can create leverage.",
        },
        {
          step: "02",
          title: "System architecture",
          text: "We define the AI logic, integrations, data flows, permissions and automation layers.",
        },
        {
          step: "03",
          title: "Deployment",
          text: "We build, test and refine the system with real operational scenarios and measurable outcomes.",
        },
        {
          step: "04",
          title: "Optimization",
          text: "We improve performance, expand use cases and turn AI into a scalable operating advantage.",
        },
      ],
    },
    industriesPage: {
      kicker: "Industries",
      title: "Sector-specific AI systems designed for real operational complexity",
      intro:
        "Every industry has unique workflows, operational pressure points and strategic priorities. We design AI systems that adapt to sector reality — not generic templates.",
      cards: [
        {
          title: "Financial Services",
          text: "Risk intelligence, compliance automation, fraud detection and operational decision systems for faster, sharper execution.",
          icon: "shield",
        },
        {
          title: "Technology & SaaS",
          text: "AI copilots, internal operating layers and intelligent support systems that accelerate execution across teams.",
          icon: "brain",
        },
        {
          title: "Logistics & Operations",
          text: "Predictive coordination, operational orchestration and intelligent resource allocation across complex workflows.",
          icon: "workflow",
        },
        {
          title: "Retail & Commerce",
          text: "Demand intelligence, personalized customer systems and commercial automation that improve margin and scale.",
          icon: "chart",
        },
        {
          title: "Healthcare & Life Sciences",
          text: "Operational intelligence, knowledge systems and AI-assisted coordination for highly complex environments.",
          icon: "bot",
        },
        {
          title: "Professional Services",
          text: "Private knowledge layers, document intelligence and AI systems that amplify execution quality and billable leverage.",
          icon: "building",
        },
        {
          title: "Hospitality & Travel",
          text: "Reservation intelligence, multilingual guest systems, concierge automation and revenue optimization layers.",
          icon: "message",
        },
        {
          title: "Luxury & Wellness",
          text: "AI built for premium service — concierge, client care and elite operations that demand consistency, discretion and high-touch execution.",
          icon: "sparkles",
        },
      ],
    },
    casesPage: {
      kicker: "Case Studies",
      title: "Applied AI in real business environments",
      intro:
        "Real-world examples of how AI creates measurable revenue, operational efficiency and strategic visibility across the business.",
      cards: [
        {
          title: "AI Revenue Engine",
          result: "+42% faster conversion cycle",
          text:
            "An AI system qualifies inbound opportunities, routes high-intent leads, personalizes follow-up and helps commercial teams move faster with higher precision.",
        },
        {
          title: "Enterprise Knowledge Layer",
          result: "Up to 75% faster access to answers",
          text:
            "A private AI layer connected to company documentation, SOPs and internal knowledge gives teams instant access to trusted operational intelligence.",
        },
        {
          title: "Operational Intelligence System",
          result: "300+ hours recovered per quarter",
          text:
            "AI-driven coordination, automated execution and operational visibility reduce friction, improve consistency and free teams for higher-value work — at scale.",
        },
      ],
    },
    callPage: {
      kicker: "Book a Call",
      title: "Let’s find where AI creates the most impact in your business",
      intro:
        "Tell us what you want to improve, automate or scale. We will help you define the right first step — no pitch, no templates.",
      bullets: [
        "We start with your process, not a pitch",
        "You leave with a concrete next step",
        "No templates. Built around your operation",
      ],
    },
  },

  es: {
    brand: "Gleam Peak AI",
    nav: {
      home: "Inicio",
      solutions: "Soluciones IA",
      automation: "Automatización IA",
      industries: "Industrias",
      cases: "Casos de estudio",
      call: "Reservar llamada",
    },
    common: {
      switchLanguage: "EN",
      backHome: "Volver al inicio",
      nextStep: "Siguiente paso",
      discuss: "Hablar sobre esta solución",
      sendRequest: "Enviar solicitud",
      trustedTitle: "Pensado para empresas ambiciosas",
      trustedHeadline: "Sistemas de IA diseñados para operaciones reales",
      trustedItems: [
        "Estrategia de IA",
        "Automatización",
        "Asistentes inteligentes",
        "Sistemas de conocimiento",
      ],
      trustBlocks: [
        {
          title: "Enfoque claro de negocio",
          text: "Primero entendemos el proceso, el equipo y el objetivo — antes de diseñar nada.",
          icon: "shield",
        },
        {
          title: "Construido para procesos reales",
          text: "Conectamos la IA directamente con tus herramientas, tus datos y tu operación diaria.",
          icon: "workflow",
        },
        {
          title: "Pensado para escalar",
          text: "Reducimos trabajo manual, mejoramos velocidad de respuesta y creamos valor operativo medible desde el primer día.",
          icon: "chart",
        },
      ],
      form: {
        name: "Nombre",
        company: "Empresa",
        email: "Correo corporativo",
        message: "Cuéntanos qué quieres mejorar, automatizar o escalar",
      },
    },
    home: {
      kicker: "Automatización operativa con IA",
      title: "Ayudamos a empresas a automatizar procesos con IA",
      subtitle:
        "Diseñamos sistemas de IA que reducen carga operativa, aceleran la ejecución y ayudan a las empresas a crecer con menos fricción.",
      ctas: {
        primary: "Reservar llamada estratégica",
        secondary: "Explorar soluciones",
      },
      stats: [
        {
          value: "Elimina la carga operativa",
          text: "Automatiza tareas repetitivas en ventas, operaciones, soporte y procesos internos.",
        },
        {
          value: "Responde antes que tu competencia",
          text: "Utiliza asistentes de IA para cualificar, dirigir y responder con mayor velocidad y consistencia.",
        },
        {
          value: "Decisiones respaldadas por datos reales",
          text: "Convierte datos y conocimiento interno en apoyo real para la toma de decisiones.",
        },
      ],
      impact: {
        kicker: "Impacto de negocio",
        title: "Lo que la IA puede mejorar en tu empresa",
        intro:
          "La IA correcta debe hacer tu empresa más ágil, más clara y más fácil de escalar.",
        items: [
          "Automatizar tareas operativas repetitivas",
          "Responder más rápido a clientes y oportunidades",
          "Reducir seguimiento manual y coordinación interna",
          "Mejorar visibilidad entre equipos y procesos",
          "Convertir conocimiento interno en respuestas útiles",
          "Crear sistemas que soporten crecimiento sin añadir complejidad",
        ],
      },
      orchestration: {
        title: "Qué podemos automatizar",
        text:
          "Identificamos procesos donde la IA puede reducir carga manual y mejorar velocidad, consistencia y ejecución.",
        cards: [
          {
            title: "Atención al cliente",
            text: "Automatiza respuestas, cualificación de leads, seguimiento y distribución de oportunidades.",
            icon: "message",
          },
          {
            title: "Operaciones internas",
            text: "Reduce tareas repetitivas, coordinación manual y cuellos de botella en la operación.",
            icon: "workflow",
          },
          {
            title: "Inteligencia de negocio",
            text: "Transforma documentos, datos y conocimiento interno en respuestas, reportes y apoyo a decisiones.",
            icon: "chart",
          },
        ],
      },
      solutionsSection: {
        kicker: "Soluciones IA",
        title: "Sistemas prácticos de IA para procesos reales",
        intro:
          "No construimos herramientas genéricas. Diseñamos soluciones alrededor de tus procesos, tu equipo y tus objetivos.",
      },
      solutions: [
        {
          title: "Automatización con IA",
          text: "Automatiza tareas repetitivas, flujos internos y procesos operativos que frenan la empresa.",
          icon: "cpu",
        },
        {
          title: "Asistentes de IA",
          text: "Despliega asistentes para soporte, ventas, reservas, solicitudes internas o acceso al conocimiento.",
          icon: "bot",
        },
        {
          title: "Sistemas de conocimiento",
          text: "Convierte documentos y conocimiento interno en sistemas inteligentes útiles y seguros.",
          icon: "brain",
        },
        {
          title: "Apoyo a decisiones",
          text: "Usa IA para resumir datos, generar reportes y dar mayor claridad a la dirección.",
          icon: "chart",
        },
      ],
      industriesSection: {
        kicker: "Industrias",
        title: "IA adaptada a la forma en que opera cada empresa",
        intro:
          "Desde logística y retail hasta hospitality, servicios y wellness, adaptamos la IA a los procesos reales de cada sector.",
      },
      industries: [
        {
          title: "Servicios Financieros",
          text: "Automatización para revisión de riesgos, cumplimiento, soporte interno y decisiones más rápidas.",
          icon: "shield",
        },
        {
          title: "Tecnología y SaaS",
          text: "Copilotos, automatización de soporte y sistemas internos para acelerar producto y negocio.",
          icon: "brain",
        },
        {
          title: "Logística y Operaciones",
          text: "Automatización de flujos, actualizaciones de cliente, planificación de recursos y visibilidad operativa.",
          icon: "workflow",
        },
        {
          title: "Retail y Comercio",
          text: "Soporte al cliente, seguimiento comercial, señales de demanda y automatización de ventas.",
          icon: "chart",
        },
        {
          title: "Salud y Ciencias de la Vida",
          text: "Flujos de soporte, coordinación operativa y sistemas de conocimiento para entornos complejos.",
          icon: "bot",
        },
        {
          title: "Servicios Profesionales",
          text: "Flujos documentales, copilotos internos y sistemas de conocimiento para mejorar velocidad y consistencia.",
          icon: "building",
        },
        {
          title: "Hospitality y Turismo",
          text: "IA para consultas, reservas, soporte multilingüe, upselling y coordinación de experiencia.",
          icon: "message",
        },
        {
          title: "Lujo y Wellness",
          text: "IA diseñada para servicio premium — concierge, atención al cliente de alto nivel y operaciones exclusivas que exigen consistencia y ejecución impecable.",
          icon: "sparkles",
        },
      ],
      finalCta: {
        kicker: "Empieza donde más importa",
        title: "Descubre dónde la IA genera mayor impacto para tu negocio",
        text:
          "Te ayudamos a identificar el caso de uso correcto, diseñar el sistema y convertir ideas en resultados medibles.",
        button: "Reservar llamada estratégica",
      },
    },
    solutionsPage: {
      kicker: "Soluciones IA",
      title: "Sistemas empresariales de IA construidos alrededor del valor estratégico",
      intro:
        "Diseñamos sistemas de IA aplicada que pasan a formar parte de cómo opera tu empresa — mejorando velocidad de ejecución, inteligencia operativa y capacidad de crecimiento.",
      cards: [
        {
          title: "Estrategia Empresarial de IA",
          text:
            "Identificamos dónde la IA genera retorno medible más rápido, definimos la arquitectura correcta y trazamos una hoja de ruta alineada con resultados reales.",
          icon: "brain",
        },
        {
          title: "Sistemas Operativos con IA",
          text:
            "Desplegamos sistemas inteligentes que coordinan flujos, automatizan ejecución y crean nueva capacidad operativa en toda la empresa.",
          icon: "cpu",
        },
        {
          title: "Agentes Empresariales de IA",
          text:
            "Agentes privados entrenados con procesos, documentación y lógica de negocio para asistir equipos, clientes y operaciones internas.",
          icon: "bot",
        },
        {
          title: "Capas de Inteligencia para Decisión",
          text:
            "Convertimos datos fragmentados en inteligencia ejecutiva, señales predictivas y sistemas que apoyan decisiones más rápidas y precisas.",
          icon: "chart",
        },
      ],
      listTitle: "Lo que construimos",
      items: [
        "Capas privadas empresariales de IA",
        "Sistemas operativos de IA para flujos",
        "Infraestructura de inteligencia ejecutiva",
        "Coordinación operativa autónoma",
        "Sistemas de conocimiento conectados a datos empresariales",
        "Motores predictivos y de apoyo a decisiones",
      ],
    },
    automationPage: {
      kicker: "Automatización IA",
      title: "Infraestructura inteligente para operaciones de nueva generación",
      intro:
        "Diseñamos sistemas de IA que coordinan, priorizan y ejecutan procesos complejos entre equipos, herramientas y áreas de negocio — sin añadir complejidad operativa.",
      items: [
        "Orquestación multi-sistema",
        "Motores inteligentes de decisión",
        "Copilotos empresariales privados",
        "Automatización predictiva",
        "Inteligencia de flujos operativos",
        "Operaciones autónomas asistidas por IA",
      ],
      processTitle: "Cómo trabajamos",
      processSubtitle: "Del proceso manual al sistema operativo inteligente",
      process: [
        {
          step: "01",
          title: "Mapeo operativo",
          text: "Identificamos flujos críticos, dependencias, cuellos de botella y áreas donde la IA puede crear ventaja.",
        },
        {
          step: "02",
          title: "Arquitectura del sistema",
          text: "Definimos lógica de IA, integraciones, flujos de datos, permisos y capas de automatización.",
        },
        {
          step: "03",
          title: "Despliegue",
          text: "Construimos, probamos y refinamos el sistema con escenarios reales y resultados medibles.",
        },
        {
          step: "04",
          title: "Optimización",
          text: "Mejoramos rendimiento, ampliamos casos de uso y convertimos la IA en ventaja operativa escalable.",
        },
      ],
    },
    industriesPage: {
      kicker: "Industrias",
      title: "Sistemas sectoriales de IA diseñados para complejidad operativa real",
      intro:
        "Cada industria tiene flujos, presiones operativas y prioridades estratégicas distintas. Diseñamos sistemas de IA adaptados a la realidad de cada sector — no soluciones genéricas.",
      cards: [
        {
          title: "Servicios Financieros",
          text: "Inteligencia de riesgo, automatización de cumplimiento, detección de fraude y sistemas de decisión para una ejecución más ágil y precisa.",
          icon: "shield",
        },
        {
          title: "Tecnología y SaaS",
          text: "Copilotos, capas operativas inteligentes y sistemas internos de IA que aceleran la ejecución entre equipos.",
          icon: "brain",
        },
        {
          title: "Logística y Operaciones",
          text: "Coordinación predictiva, orquestación operativa y asignación inteligente de recursos en flujos complejos.",
          icon: "workflow",
        },
        {
          title: "Retail y Comercio",
          text: "Inteligencia de demanda, sistemas personalizados para clientes y automatización comercial que mejora margen y escalabilidad.",
          icon: "chart",
        },
        {
          title: "Salud y Ciencias de la Vida",
          text: "Inteligencia operativa, sistemas de conocimiento y coordinación asistida por IA para entornos de alta complejidad.",
          icon: "bot",
        },
        {
          title: "Servicios Profesionales",
          text: "Capas privadas de conocimiento, inteligencia documental y sistemas de IA que multiplican calidad de ejecución y eficiencia facturable.",
          icon: "building",
        },
        {
          title: "Hospitality y Turismo",
          text: "Inteligencia para reservas, atención multilingüe, concierge automatizado y capas de optimización de ingresos.",
          icon: "message",
        },
        {
          title: "Lujo y Wellness",
          text: "IA diseñada para servicio premium — concierge, atención al cliente de alto nivel y operaciones exclusivas que exigen consistencia y ejecución impecable.",
          icon: "sparkles",
        },
      ],
    },
    casesPage: {
      kicker: "Casos de estudio",
      title: "IA aplicada en entornos empresariales reales",
      intro:
        "Ejemplos reales de cómo la IA genera crecimiento medible, eficiencia operativa y mayor visibilidad estratégica en la empresa.",
      cards: [
        {
          title: "Motor de Ingresos con IA",
          result: "+42% más rapidez en conversión",
          text:
            "Un sistema de IA cualifica oportunidades, prioriza leads de alta intención, personaliza seguimientos y ayuda a los equipos comerciales a cerrar más rápido y con mayor precisión.",
        },
        {
          title: "Capa Empresarial de Conocimiento",
          result: "Hasta un 75% más rápido en acceso a respuestas",
          text:
            "Una capa privada de IA conectada a documentación, SOPs y conocimiento interno da a los equipos acceso instantáneo a inteligencia operativa confiable.",
        },
        {
          title: "Sistema de Inteligencia Operativa",
          result: "Más de 300 horas recuperadas por trimestre",
          text:
            "Coordinación impulsada por IA, ejecución automatizada y mayor visibilidad operativa reducen fricción, mejoran consistencia y liberan equipos para trabajo de mayor valor — a escala.",
        },
      ],
    },
    callPage: {
      kicker: "Reservar llamada",
      title: "Veamos dónde la IA puede crear más impacto en tu empresa",
      intro:
        "Cuéntanos qué quieres mejorar, automatizar o escalar. Definiremos el mejor siguiente paso — sin pitch, sin plantillas.",
      bullets: [
        "Empezamos por tu proceso, no por un pitch",
        "Sales con un siguiente paso concreto",
        "Sin plantillas. Diseñado para tu operación",
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

            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/20 via-violet-500/10 to-cyan-400/10 blur-3xl"/>
            <div className="mb-6 overflow-hidden rounded-[1.5rem] border border-white/10">
  <Image
    src="/hero-ai-network.png"
    alt="Gleam Peak AI enterprise intelligence system"
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
                  Live
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
    <PageShell kicker={t.solutionsPage.kicker} title={t.solutionsPage.title} intro={t.solutionsPage.intro}>
      <div className="mb-10 mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10">
  <Image
    src="/enterprise-copilot.png"
    alt="Enterprise AI copilot assistant"
    width={1600}
    height={900}
    className="h-auto w-full object-cover"
  />
</div>
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
    <PageShell kicker={t.automationPage.kicker} title={t.automationPage.title} intro={t.automationPage.intro}>
     <div className="mb-10 mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-white/10">
  <Image
    src="/integrations.png"
    alt="AI automation and integrations"
    width={1600}
    height={900}
    className="h-auto w-full object-cover"
  />
</div>
      <div className="mb-12">
  <VisualImage
    src="/images/enterprise-copilot.png"
    alt="Enterprise AI copilot assistant"
  />
</div>
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
    <PageShell kicker={t.industriesPage.kicker} title={t.industriesPage.title} intro={t.industriesPage.intro}>
      <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/10">
  <Image
    src="/team-collaboration.png"
    alt="Team collaboration"
    width={1600}
    height={900}
    className="w-full h-auto object-cover"
  />
</div>
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
    <PageShell kicker={t.casesPage.kicker} title={t.casesPage.title} intro={t.casesPage.intro}>
      <div className="mb-10 overflow-hidden rounded-[2rem] border border-white/10">
  <Image
    src="/decision-intelligence.png"
    alt="Decision intelligence"
    width={1600}
    height={900}
    className="w-full h-auto object-cover"
  />
</div>
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
<div className="mb-10 overflow-hidden rounded-[2rem] border border-white/10">
  <Image
    src="/business-scaling.png"
    alt="Business scaling"
    width={1600}
    height={900}
    className="w-full h-auto object-cover"
  />
</div>

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
                  Solicitud enviada correctamente
                </h3>
                <p className="mt-4 text-[17px] leading-8 text-white/70">
                  Hemos recibido tu mensaje. Te contactaremos pronto para revisar cómo podemos ayudarte.
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
                    No se pudo enviar el formulario. Inténtalo nuevamente.
                  </p>
                )}

                <button
                  type="submit"
                  disabled={formStatus === "sending"}
                  className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-[15px] font-semibold text-[#13031d] transition hover:scale-[1.01] disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {formStatus === "sending" ? "Enviando..." : t.common.sendRequest}
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

function PageShell({ kicker, title, intro, children }: { kicker: string; title: string; intro: string; children: ReactNode }) {
  return (
    <section>
      <div className="max-w-4xl">
        <p className={textStyles.kicker}>{kicker}</p>
        <h1 className={textStyles.pageTitle}>{title}</h1>
        <p className={textStyles.pageIntro}>{intro}</p>
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
