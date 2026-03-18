"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
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
      trustedHeadline: "Enterprise AI with business discipline",
      trustedItems: [
        "Strategic AI consulting",
        "Workflow automation",
        "Customer-facing assistants",
        "Internal intelligence systems",
      ],
      trustBlocks: [
        {
          title: "Business-first strategy",
          text: "Every AI system is aligned with business priorities, operating realities and measurable impact.",
          icon: "shield",
        },
        {
          title: "Production-ready execution",
          text: "We design systems that integrate with real teams, real workflows and real company data.",
          icon: "workflow",
        },
        {
          title: "Scalable operating value",
          text: "We focus on speed, consistency, efficiency and long-term competitive advantage.",
          icon: "chart",
        },
      ],
      form: {
        name: "Name",
        company: "Company",
        email: "Work email",
        message: "Tell us about your company, goals or workflow",
      },
    },
    home: {
      kicker: "Enterprise AI systems for modern businesses",
      title:
        "AI infrastructure, intelligent automation and decision systems built for measurable business impact",
      subtitle:
        "Gleam Peak AI helps companies design and deploy practical AI systems that reduce operational friction, accelerate execution and turn workflows, data and internal knowledge into competitive advantage.",
      ctas: {
        primary: "Book a strategic AI consultation",
        secondary: "Explore AI solutions",
      },
      stats: [
        {
          value: "Up to 30%",
          text: "Potential reduction in operational costs when repetitive workflows are redesigned with AI automation.",
        },
        {
          value: "Up to 70%",
          text: "Potential automation of selected routine work across internal workflows.",
        },
        {
          value: "24/7",
          text: "Continuous access to AI assistants, copilots and knowledge systems for teams and customers.",
        },
      ],
      impact: {
        kicker: "Business impact",
        title: "What practical AI can unlock across the organization",
        intro:
          "The strongest AI systems do not create more noise. They create faster execution, cleaner operations and better decisions.",
        items: [
          "Reduce operational costs by up to 30%",
          "Automate up to 70% of repetitive workflows",
          "Deploy AI copilots for internal teams",
          "Accelerate decision-making with AI-driven insights",
          "Transform company knowledge into intelligent systems",
          "Integrate AI into existing enterprise infrastructure",
        ],
      },
      orchestration: {
        title: "AI orchestration layer",
        text:
          "An intelligent operating layer connecting workflows, data, internal knowledge, automation and decision support across the company.",
        cards: [
          {
            title: "Lead qualification",
            text: "Prioritize high-intent opportunities and reduce response time by up to 35% through AI-assisted qualification and routing.",
            icon: "message",
          },
          {
            title: "Knowledge assistant",
            text: "Give teams access to answers up to 70% faster with AI grounded in internal documents, SOPs and company knowledge.",
            icon: "brain",
          },
          {
            title: "Executive visibility",
            text: "Generate real-time summaries, reporting and performance signals for faster decisions and stronger management visibility.",
            icon: "chart",
          },
        ],
      },
      solutionsSection: {
        kicker: "Enterprise AI solutions",
        title: "Systems designed for real business environments",
        intro:
          "We build AI systems that fit the operating logic of the business, integrate with existing workflows and generate usable outcomes, not experiments.",
      },
      solutions: [
        {
          title: "AI Automation Systems",
          text: "Automate complex workflows across operations, finance, customer service and internal processes, with the potential to automate up to 70% of repetitive work in selected environments.",
          icon: "cpu",
        },
        {
          title: "AI Decision Systems",
          text: "Turn company data into decision-support systems that improve visibility, accelerate executive decisions and reduce reporting friction.",
          icon: "chart",
        },
        {
          title: "Enterprise AI Infrastructure",
          text: "Build scalable AI architecture integrated with your company’s tools, workflows and data environment.",
          icon: "layers",
        },
        {
          title: "AI Knowledge Systems",
          text: "Deploy internal AI copilots trained on company knowledge, documents and workflows, often giving teams access to critical answers up to 70% faster.",
          icon: "brain",
        },
      ],
            industriesSection: {
        kicker: "Industries",
        title: "AI transformation across high-value sectors",
        intro:
          "From financial services and technology to logistics, healthcare, retail, hospitality and professional services, Gleam Peak AI designs systems that improve speed, efficiency and decision quality in real business environments.",
      },
      industries: [
        {
          title: "Financial Services",
          text: "Risk analysis, fraud signals, compliance automation and decision intelligence for faster and more consistent execution.",
          icon: "shield",
        },
        {
          title: "Technology & SaaS",
          text: "AI copilots, internal automation and operating intelligence that accelerate execution across product and business teams.",
          icon: "brain",
        },
        {
          title: "Logistics & Operations",
          text: "Forecasting, workflow optimization and resource allocation systems that improve efficiency and reduce bottlenecks.",
          icon: "workflow",
        },
        {
          title: "Retail & Commerce",
          text: "Demand prediction, customer intelligence and smarter commercial operations for faster growth and cleaner execution.",
          icon: "chart",
        },
        {
          title: "Healthcare & Life Sciences",
          text: "Operational optimization, intelligent support workflows and better handling of complex data environments.",
          icon: "bot",
        },
        {
          title: "Professional Services",
          text: "Knowledge systems, internal copilots and workflow automation that increase speed, consistency and billable efficiency.",
          icon: "building",
        },
        {
          title: "Hospitality & Travel",
          text: "AI for inquiries, reservation support, multilingual communication, upselling and guest experience optimization.",
          icon: "message",
        },
        {
          title: "Luxury & Wellness",
          text: "Premium AI experiences for concierge, customer care, lead nurturing and operational coordination.",
          icon: "sparkles",
        },
      ],
      finalCta: {
        kicker: "Start your AI transformation",
        title: "Identify the highest-impact AI opportunities in your business",
        text:
          "We help companies define the right use cases, the right architecture and the right first deployment to create momentum and measurable value.",
        button: "Book a strategic AI consultation",
      },
    },
    solutionsPage: {
      kicker: "AI Solutions",
      title: "A modular AI offering built for real business priorities",
      intro:
        "Our solutions are designed to align with commercial goals, operational realities and long-term transformation plans. We do not sell generic AI. We build the right system for the right business problem.",
      cards: [
        {
          title: "AI Consulting",
          text: "Identify where AI can create the most value, prioritize high-impact opportunities and define a practical roadmap for implementation.",
          icon: "brain",
        },
        {
          title: "AI Automation",
          text: "Automate repetitive workflows and reduce operational friction, with the potential to automate up to 70% of routine work in selected processes.",
          icon: "cpu",
        },
        {
          title: "AI Agents",
          text: "Deploy AI assistants for qualification, support, coordination and internal knowledge access with faster response and better consistency.",
          icon: "bot",
        },
        {
          title: "Decision Intelligence",
          text: "Transform reporting and raw data into executive visibility, operating signals and decision support that move the business faster.",
          icon: "chart",
        },
      ],
      listTitle: "What we can build",
      items: [
        "Executive AI roadmap and opportunity analysis",
        "Customer-facing AI assistants and conversational systems",
        "Internal copilots for teams and operations",
        "Lead capture, qualification and sales automation",
        "Knowledge bases connected to business documentation",
        "Reporting, analytics and decision-support systems",
      ],
    },
    automationPage: {
      kicker: "AI Automation",
      title: "Automate what slows the business down",
      intro:
        "From inquiry handling and routing to reporting, CRM actions, internal coordination and repetitive service workflows, we build automation layers that reduce friction and free up execution capacity.",
      items: [
        "Inbox and inquiry triage",
        "Follow-up sequences",
        "Meeting preparation and summaries",
        "Internal request routing",
        "CRM and pipeline updates",
        "Operational reporting",
      ],
      processTitle: "Automation framework",
      processSubtitle: "From manual workflow to AI-enabled operating flow",
      process: [
        {
          step: "01",
          title: "Discovery",
          text: "We analyze your business model, workflows, bottlenecks and strategic priorities.",
        },
        {
          step: "02",
          title: "Architecture",
          text: "We define the right AI systems, integrations, data flow and implementation roadmap.",
        },
        {
          step: "03",
          title: "Deployment",
          text: "We build, test and refine the solution with usability, reliability and measurable outcomes in mind.",
        },
        {
          step: "04",
          title: "Scale",
          text: "We optimize performance, expand use cases and turn AI into a durable operating advantage.",
        },
      ],
    },
    industriesPage: {
      kicker: "Industries",
      title: "Sector-aware AI systems with real operating value",
      intro:
        "We adapt AI to the logic of each sector, making the solution more relevant, more adoptable and more commercially effective.",
      cards: [
        {
          title: "Financial Services",
          text: "AI for risk analysis, fraud detection, compliance workflows and faster internal decision support.",
          icon: "shield",
        },
        {
          title: "Technology & SaaS",
          text: "AI copilots, automation layers and intelligence systems for product, support and internal operations.",
          icon: "brain",
        },
        {
          title: "Logistics & Operations",
          text: "Forecasting, workflow optimization and allocation systems that improve speed and execution quality.",
          icon: "workflow",
        },
        {
          title: "Retail & Commerce",
          text: "Demand prediction, customer signals, support automation and smarter growth systems for modern commerce.",
          icon: "chart",
        },
        {
          title: "Healthcare & Life Sciences",
          text: "AI systems for operational optimization, support workflows and complex data environments.",
          icon: "bot",
        },
        {
          title: "Professional Services",
          text: "Internal knowledge systems, document flows and AI copilots that improve speed, consistency and billable leverage.",
          icon: "building",
        },
        {
          title: "Hospitality & Travel",
          text: "AI for inquiries, bookings, multilingual support, upselling and guest experience coordination.",
          icon: "message",
        },
        {
          title: "Luxury & Wellness",
          text: "Premium AI experiences for concierge, customer care, lead nurturing and high-touch operations.",
          icon: "sparkles",
        },
      ],
    },
        casesPage: {
      kicker: "Case Studies",
      title: "Illustrative examples of measurable AI impact",
      intro:
        "These examples show how the right AI architecture can improve responsiveness, consistency, internal efficiency and executive visibility.",
      cards: [
        {
          title: "Multichannel Lead Qualification",
          result: "+38% faster response time",
          text: "An AI assistant qualifies inbound leads, routes them to the right team and triggers personalized follow-up automatically.",
        },
        {
          title: "Internal Knowledge Copilot",
          result: "Up to 70% faster access to answers",
          text: "A secure AI workspace trained on company documentation reduces search time and improves consistency across teams.",
        },
        {
          title: "Operations Automation Layer",
          result: "Hours recovered every week",
          text: "Automated reporting, task handling and workflow orchestration reduce manual bottlenecks and improve execution speed.",
        },
      ],
    },
    callPage: {
      kicker: "Book a Call",
      title: "Let’s identify where AI can create the most value in your business",
      intro:
        "Book a strategic conversation to explore the right AI opportunities, the right architecture and the right first deployment for your company.",
      bullets: [
        "Business-focused conversation",
        "Practical next steps",
        "Tailored recommendations for your company",
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
      trustedHeadline: "IA empresarial con disciplina de negocio",
      trustedItems: [
        "Consultoría estratégica de IA",
        "Automatización de flujos de trabajo",
        "Asistentes para clientes",
        "Sistemas internos de inteligencia",
      ],
      trustBlocks: [
        {
          title: "Estrategia orientada a negocio",
          text: "Cada sistema de IA se alinea con prioridades comerciales, realidades operativas e impacto medible.",
          icon: "shield",
        },
        {
          title: "Ejecución lista para producción",
          text: "Diseñamos sistemas que se integran con equipos, procesos y datos reales de la empresa.",
          icon: "workflow",
        },
        {
          title: "Valor operativo escalable",
          text: "Nos centramos en velocidad, consistencia, eficiencia y ventaja competitiva a largo plazo.",
          icon: "chart",
        },
      ],
      form: {
        name: "Nombre",
        company: "Empresa",
        email: "Correo corporativo",
        message: "Cuéntanos sobre tu empresa, objetivos o procesos",
      },
    },
    home: {
      kicker: "Sistemas de IA empresarial para empresas modernas",
      title:
        "Infraestructura de IA, automatización inteligente y sistemas de decisión con impacto real de negocio",
      subtitle:
        "Gleam Peak AI ayuda a las empresas a diseñar e implementar sistemas de inteligencia artificial que reducen fricción operativa, aceleran la ejecución y convierten flujos, datos y conocimiento interno en ventaja competitiva.",
      ctas: {
        primary: "Reservar una consulta estratégica de IA",
        secondary: "Explorar soluciones de IA",
      },
      stats: [
        {
          value: "Hasta 30%",
          text: "Potencial reducción de costes operativos cuando los flujos repetitivos se rediseñan con automatización e IA.",
        },
        {
          value: "Hasta 70%",
          text: "Potencial automatización de trabajo rutinario en procesos internos seleccionados.",
        },
        {
          value: "24/7",
          text: "Acceso continuo a asistentes, copilotos y sistemas de conocimiento impulsados por IA.",
        },
      ],
      impact: {
        kicker: "Impacto de negocio",
        title: "Lo que una IA bien implementada puede desbloquear en la empresa",
        intro:
          "Los mejores sistemas de IA no generan más ruido. Generan más velocidad, mejores decisiones y operaciones más limpias.",
        items: [
          "Reducir los costes operativos hasta en un 30%",
          "Automatizar hasta el 70% de los flujos repetitivos",
          "Desplegar copilotos de IA para equipos internos",
          "Acelerar la toma de decisiones con insights impulsados por IA",
          "Transformar el conocimiento de la empresa en sistemas inteligentes",
          "Integrar IA en la infraestructura tecnológica existente",
        ],
      },
      orchestration: {
        title: "Capa de orquestación con IA",
        text:
          "Una capa operativa inteligente que conecta flujos de trabajo, datos, conocimiento interno, automatización y apoyo a la toma de decisiones en toda la empresa.",
        cards: [
          {
            title: "Cualificación de leads",
            text: "Prioriza oportunidades de alta intención y reduce el tiempo de respuesta hasta en un 35% con cualificación y enrutamiento asistidos por IA.",
            icon: "message",
          },
          {
            title: "Asistente de conocimiento",
            text: "Da a los equipos acceso a respuestas hasta un 70% más rápido con IA entrenada sobre documentos, SOPs y conocimiento interno.",
            icon: "brain",
          },
          {
            title: "Visibilidad ejecutiva",
            text: "Genera resúmenes, reporting y señales de rendimiento en tiempo real para mejorar visibilidad directiva y acelerar decisiones.",
            icon: "chart",
          },
        ],
      },
      solutionsSection: {
        kicker: "Soluciones de IA para empresas",
        title: "Sistemas diseñados para entornos de negocio reales",
        intro:
          "Construimos sistemas de IA que encajan con la lógica operativa de la empresa, se integran con los procesos existentes y generan resultados utilizables, no experimentos.",
      },
      solutions: [
        {
          title: "Sistemas de Automatización con IA",
          text: "Automatiza flujos complejos en operaciones, finanzas, atención al cliente y procesos internos, con potencial para automatizar hasta el 70% del trabajo repetitivo en entornos seleccionados.",
          icon: "cpu",
        },
        {
          title: "Sistemas de Decisión con IA",
          text: "Convierte los datos de la empresa en sistemas de apoyo a la decisión que mejoran visibilidad, aceleran decisiones directivas y reducen fricción en el reporting.",
          icon: "chart",
        },
                {
          title: "Infraestructura Empresarial de IA",
          text: "Construye arquitectura de IA escalable integrada con herramientas, procesos y entorno de datos de la empresa.",
          icon: "layers",
        },
        {
          title: "Sistemas de Conocimiento con IA",
          text: "Despliega copilotos internos entrenados con conocimiento, documentos y flujos de la empresa, dando a los equipos acceso a respuestas críticas hasta un 70% más rápido.",
          icon: "brain",
        },
      ],
      industriesSection: {
        kicker: "Industrias",
        title: "Transformación con IA en sectores de alto valor",
        intro:
          "Desde servicios financieros y tecnología hasta logística, salud, retail, hospitalidad y servicios profesionales, Gleam Peak AI diseña sistemas de IA que mejoran velocidad, eficiencia y calidad de decisión en entornos reales.",
      },
      industries: [
        {
          title: "Servicios Financieros",
          text: "Análisis de riesgo, señales de fraude, automatización de cumplimiento e inteligencia para decisiones más rápidas y consistentes.",
          icon: "shield",
        },
        {
          title: "Tecnología y SaaS",
          text: "Copilotos de IA, automatización interna e inteligencia operativa que aceleran la ejecución en equipos de producto y negocio.",
          icon: "brain",
        },
        {
          title: "Logística y Operaciones",
          text: "Previsión, optimización de procesos y sistemas de asignación de recursos que mejoran eficiencia y reducen cuellos de botella.",
          icon: "workflow",
        },
        {
          title: "Retail y Comercio",
          text: "Predicción de demanda, inteligencia de clientes y operaciones comerciales más inteligentes para crecer mejor y ejecutar con más claridad.",
          icon: "chart",
        },
        {
          title: "Salud y Ciencias de la Vida",
          text: "Optimización operativa, flujos inteligentes de soporte y mejor gestión de entornos de datos complejos.",
          icon: "bot",
        },
        {
          title: "Servicios Profesionales",
          text: "Sistemas de conocimiento, copilotos internos y automatización de flujos que aumentan velocidad, consistencia y eficiencia facturable.",
          icon: "building",
        },
        {
          title: "Hospitality y Turismo",
          text: "IA para consultas, soporte a reservas, comunicación multilingüe, upselling y optimización de la experiencia del cliente.",
          icon: "message",
        },
        {
          title: "Lujo y Wellness",
          text: "Experiencias premium con IA para concierge, atención al cliente, nutrición de leads y coordinación operativa.",
          icon: "sparkles",
        },
      ],
      finalCta: {
        kicker: "Empieza tu transformación con IA",
        title: "Identifica las oportunidades de IA con mayor impacto para tu empresa",
        text:
          "Ayudamos a las empresas a definir los casos de uso adecuados, la arquitectura correcta y el primer despliegue que genere valor medible y tracción real.",
        button: "Reservar una consulta estratégica de IA",
      },
    },
    solutionsPage: {
      kicker: "Soluciones IA",
      title: "Una oferta modular de IA construida para prioridades de negocio reales",
      intro:
        "Nuestras soluciones están diseñadas para alinearse con objetivos comerciales, realidades operativas y planes de transformación a largo plazo. No vendemos IA genérica. Construimos el sistema adecuado para el problema adecuado.",
      cards: [
        {
          title: "Consultoría de IA",
          text: "Identifica dónde la IA puede crear más valor, prioriza oportunidades de alto impacto y define una hoja de ruta práctica de implementación.",
          icon: "brain",
        },
        {
          title: "Automatización con IA",
          text: "Automatiza flujos repetitivos y reduce fricción operativa, con potencial para automatizar hasta el 70% del trabajo rutinario en procesos seleccionados.",
          icon: "cpu",
        },
        {
          title: "Agentes de IA",
          text: "Despliega asistentes de IA para cualificación, soporte, coordinación y acceso al conocimiento interno con respuestas más rápidas y mayor consistencia.",
          icon: "bot",
        },
        {
          title: "Inteligencia para Decisiones",
          text: "Convierte reporting y datos en visibilidad ejecutiva, señales operativas y apoyo a decisiones que mueven el negocio más rápido.",
          icon: "chart",
        },
      ],
      listTitle: "Lo que podemos construir",
      items: [
        "Hoja de ruta ejecutiva de IA y análisis de oportunidades",
        "Asistentes para clientes y sistemas conversacionales",
        "Copilotos internos para equipos y operaciones",
        "Captación, cualificación y automatización comercial",
        "Bases de conocimiento conectadas a documentación empresarial",
        "Reporting, analítica y sistemas de apoyo a decisiones",
      ],
    },
    automationPage: {
      kicker: "Automatización IA",
      title: "Automatiza lo que hoy frena a la empresa",
      intro:
        "Desde gestión de consultas y enrutamiento hasta reporting, acciones de CRM, coordinación interna y flujos repetitivos de servicio, construimos capas de automatización que reducen fricción y liberan capacidad de ejecución.",
      items: [
        "Clasificación de correos y consultas",
        "Secuencias de seguimiento",
        "Preparación y resúmenes de reuniones",
        "Enrutamiento de solicitudes internas",
        "Actualizaciones de CRM y pipeline",
        "Reporting operativo",
      ],
      processTitle: "Marco de automatización",
      processSubtitle: "Del flujo manual al flujo operativo impulsado por IA",
      process: [
        { step: "01", title: "Descubrimiento", text: "Analizamos modelo de negocio, flujos de trabajo, cuellos de botella y prioridades estratégicas." },
        { step: "02", title: "Arquitectura", text: "Definimos los sistemas adecuados, integraciones, flujo de datos y hoja de ruta de implementación." },
        { step: "03", title: "Despliegue", text: "Construimos, probamos y refinamos la solución con foco en usabilidad, fiabilidad y resultados." },
        { step: "04", title: "Escalado", text: "Optimizamos rendimiento, ampliamos casos de uso y convertimos la IA en una ventaja operativa duradera." },
      ],
    },
    industriesPage: {
      kicker: "Industrias",
      title: "Sistemas de IA por sector con valor operativo real",
      intro:
        "Adaptamos la IA a la lógica de cada industria, haciendo la solución más relevante, más adoptable y más efectiva comercialmente.",
      cards: [
        { title: "Servicios Financieros", text: "IA para análisis de riesgo, fraude, cumplimiento y apoyo interno a decisiones más rápidas.", icon: "shield" },
        { title: "Tecnología y SaaS", text: "Copilotos de IA, capas de automatización y sistemas de inteligencia para producto, soporte y operaciones.", icon: "brain" },
        { title: "Logística y Operaciones", text: "Previsión, optimización de procesos y asignación de recursos para mejorar velocidad y calidad de ejecución.", icon: "workflow" },
        { title: "Retail y Comercio", text: "Predicción de demanda, señales de cliente, automatización de soporte y sistemas de crecimiento comercial.", icon: "chart" },
        { title: "Salud y Ciencias de la Vida", text: "Sistemas de IA para optimización operativa, flujos de soporte y entornos complejos de datos.", icon: "bot" },
        { title: "Servicios Profesionales", text: "Sistemas de conocimiento, flujos documentales y copilotos internos para aumentar velocidad y consistencia.", icon: "building" },
        { title: "Hospitality y Turismo", text: "IA para consultas, reservas, soporte multilingüe, upselling y coordinación de la experiencia del cliente.", icon: "message" },
        { title: "Lujo y Wellness", text: "Experiencias premium con IA para concierge, atención al cliente, nutrición de leads y operaciones de alto nivel.", icon: "sparkles" },
      ],
    },
    casesPage: {
      kicker: "Casos de estudio",
      title: "Ejemplos ilustrativos de impacto medible con IA",
      intro:
        "Estos ejemplos muestran cómo la arquitectura adecuada puede mejorar capacidad de respuesta, consistencia, eficiencia interna y visibilidad estratégica.",
      cards: [
        { title: "Cualificación Multicanal de Leads", result: "+38% más rapidez en la respuesta", text: "Un asistente de IA cualifica leads entrantes, los dirige al equipo adecuado y activa seguimiento personalizado automáticamente." },
        { title: "Copiloto Interno de Conocimiento", result: "Hasta un 70% más rápido en acceso a respuestas", text: "Un entorno seguro de IA entrenado con documentación de la empresa reduce tiempos de búsqueda y mejora consistencia entre equipos." },
        { title: "Capa de Automatización Operativa", result: "Horas recuperadas cada semana", text: "Reporting automatizado, gestión de tareas y orquestación de flujos reducen cuellos de botella manuales y aceleran la ejecución." },
      ],
    },
    callPage: {
      kicker: "Reservar llamada",
      title: "Identifiquemos dónde la IA puede crear más valor en tu empresa",
      intro:
        "Reserva una conversación estratégica para explorar las oportunidades adecuadas, la arquitectura correcta y el primer despliegue con más impacto para tu empresa.",
      bullets: [
        "Conversación centrada en negocio",
        "Siguientes pasos prácticos",
        "Recomendaciones adaptadas a tu empresa",
      ],
    },
  },
} as const;

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
    trustedItems: string[];
    trustBlocks: {
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
export default function GleamPeakWebsite() {
  const [lang, setLang] = useState<Locale>("en");
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

  const t = content[lang] as any;

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
          <button onClick={() => changePage("home")} className="group flex items-center text-left">
            <Image
              src="/logo.png"
              alt="Gleam Peak AI"
              width={300}
              height={110}
              priority
              className={`h-auto transition-all duration-300 group-hover:scale-[1.02] ${scrolled ? "w-[148px] sm:w-[176px] md:w-[210px]" : "w-[160px] sm:w-[192px] md:w-[228px]"}`}
            />
          </button>

          <nav className="hidden items-center gap-7 text-[14px] font-medium text-white/72 md:flex">
            {navItems.map((item) => (
              <button key={item.key} onClick={() => changePage(item.key)} className={`transition hover:text-white ${page === item.key ? "text-white" : ""}`}>
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
          <motion.div initial={{ opacity: 0, y: -18, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -14, scale: 0.985 }} transition={{ duration: 0.24, ease: "easeOut" }} className="fixed inset-0 z-50 overflow-y-auto bg-[rgba(7,1,20,0.94)] px-5 pb-6 pt-24 backdrop-blur-2xl md:hidden">
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
            {page === "solutions" && <SolutionsPage t={t} changePage={changePage} nextPage={nextPage} />}
            {page === "automation" && <AutomationPage t={t} changePage={changePage} nextPage={nextPage} />}
            {page === "industries" && <IndustriesPage t={t} changePage={changePage} nextPage={nextPage} />}
            {page === "cases" && <CasesPage t={t} changePage={changePage} nextPage={nextPage} />}
            {page === "call" && <CallPage t={t} changePage={changePage} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <footer className="border-t border-white/8 bg-[#080210]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-8 text-sm text-white/45 md:flex-row lg:px-10">
          <div>© {t.brand}</div>
          <div className="flex flex-wrap items-center justify-center gap-5">
            {navItems.map((item) => (
              <button key={item.key} onClick={() => changePage(item.key)} className="transition hover:text-white/80">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
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

            <h1 className="mt-5 max-w-[12ch] text-[48px] font-semibold leading-[0.95] tracking-[-0.04em] text-white sm:text-[56px] lg:text-[60px]">
              {t.home.title}

            </h1>

            <p className="mt-5 max-w-xl text-[16px] leading-7 text-white/72">

              {t.home.subtitle}

            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">

              <button
                onClick={() => changePage("call")}
                className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-4 text-sm font-semibold text-[#12041e] shadow-[0_10px_30px_rgba(255,255,255,0.12)] transition duration-300 hover:-translate-y-0.5 hover:scale-[1.02]"
              >
                {t.home.ctas.primary}
                <ArrowRight className="h-4 w-4"/>
              </button>

              <button
                onClick={() => changePage("solutions")}
                className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/[0.04] px-6 py-4 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-fuchsia-300/20 hover:bg-white/[0.08] hover:shadow-[0_12px_32px_rgba(90,35,160,0.18)]"
              >
                {t.home.ctas.secondary}
                <ChevronRight className="h-4 w-4"/>
              </button>

            </div>

          </div>

          {/* RIGHT PANEL */}

          <div className="relative">

            <div className="absolute -inset-6 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/20 via-violet-500/10 to-cyan-400/10 blur-3xl"/>

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

                {t.home.orchestration.cards.map((card) => {

                  const Icon = iconMap[card.icon as IconKey] ?? Sparkles;

                  return (

                    <div
                      key={card.title}
                      className="rounded-[18px] border border-white/10 bg-[#12081f] p-3.5 transition duration-300 hover:-translate-y-1 hover:border-fuchsia-300/20 hover:shadow-[0_16px_40px_rgba(90,35,160,0.22)]"
                    >

                      <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04]">
                        <Icon className="h-5 w-5 text-fuchsia-200"/>
                      </div>

                      <h4 className="text-[16px] font-semibold text-white">

                        {card.title}

                      </h4>

                      <p className="mt-2 text-[14px] leading-6 text-white/72">

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

          {t.home.impact.items.map((item) => (

            <div
              key={item}
              className="rounded-[20px] border border-white/10 bg-[#0d0618] px-6 py-5 text-[16px] leading-7 text-white/82 shadow-[0_8px_24px_rgba(80,30,140,0.12)]"
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

          {t.home.solutions.map((item) => {

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

          {t.home.industries.map((item) => {

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
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {t.solutionsPage.cards.map((card) => {
          const Icon = iconMap[card.icon as IconKey] ?? BrainCircuit;
          return <FeatureCard key={card.title} icon={Icon} title={card.title} text={card.text} button={t.common.discuss} onClick={() => changePage("call")} />;
        })}
      </div>

      <div className="mt-12 rounded-[1.8rem] border border-white/10 bg-[#0d0618] p-8">
        <h3 className="text-2xl font-semibold">{t.solutionsPage.listTitle}</h3>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {t.solutionsPage.items.map((item) => (
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
      <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div className="grid gap-4 sm:grid-cols-2">
          {t.automationPage.items.map((item) => (
            <div key={item} className="rounded-2xl border border-white/8 bg-[#0d0618] px-5 py-4 text-white/84">
              {item}
            </div>
          ))}
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-7">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#11071d] p-6">
            <p className="text-sm text-white/48">{t.automationPage.processTitle}</p>
            <h3 className="mt-2 text-2xl font-semibold">{t.automationPage.processSubtitle}</h3>
            <div className="mt-8 space-y-4">
              {t.automationPage.process.map((item) => (
                <div key={item.step} className="flex gap-4 border-t border-white/8 pt-4 first:border-t-0 first:pt-0">
                  <div className="text-sm font-semibold tracking-[0.18em] text-fuchsia-200/80">{item.step}</div>
                  <div>
                    <h4 className="font-medium text-white">{item.title}</h4>
                    <p className="mt-1 text-sm leading-6 text-white/62">{item.text}</p>
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
      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {t.industriesPage.cards.map((industry) => {
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
      <div className="grid gap-6 lg:grid-cols-3">
        {t.casesPage.cards.map((item) => (
          <div key={item.title} className="rounded-[1.8rem] border border-white/10 bg-white/[0.05] p-7">
            <div className="flex items-center justify-between gap-4">
              <Bot className="h-5 w-5 text-fuchsia-200" />
              <span className="rounded-full border border-fuchsia-300/15 bg-fuchsia-500/10 px-3 py-1 text-xs font-medium text-fuchsia-100/90">
                {item.result}
              </span>
            </div>
            <h3 className="mt-7 text-2xl font-semibold">{item.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/66">{item.text}</p>
          </div>
        ))}
      </div>
      <PageFooterNav t={t} changePage={changePage} nextPage={nextPage} />
    </PageShell>
  );
}

function CallPage({ t, changePage }: { t: any; changePage: (page: PageKey) => void }) {
  return (
    <PageShell kicker={t.callPage.kicker} title={t.callPage.title} intro={t.callPage.intro}>
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-500/12 via-violet-500/8 to-white/[0.04] shadow-2xl">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/8 p-8 lg:border-b-0 lg:border-r lg:p-10">
            <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08]">
              <Sparkles className="h-6 w-6 text-fuchsia-200" />
            </div>
            <div className="space-y-4 text-sm text-white/62">
              {t.callPage.bullets.map((item) => (
                <div key={item}>• {item}</div>
              ))}
            </div>
          </div>

          <div className="p-8 lg:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-white/56">{t.common.form.name}</label>
                <input className="w-full rounded-2xl border border-white/10 bg-[#12071d] px-4 py-3 text-white placeholder:text-white/24 outline-none" placeholder={t.common.form.name} />
              </div>
              <div>
                <label className="mb-2 block text-sm text-white/56">{t.common.form.company}</label>
                <input className="w-full rounded-2xl border border-white/10 bg-[#12071d] px-4 py-3 text-white placeholder:text-white/24 outline-none" placeholder={t.common.form.company} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm text-white/56">{t.common.form.email}</label>
                <input className="w-full rounded-2xl border border-white/10 bg-[#12071d] px-4 py-3 text-white placeholder:text-white/24 outline-none" placeholder={t.common.form.email} />
              </div>
              <div className="sm:col-span-2">
                <label className="mb-2 block text-sm text-white/56">{t.common.form.message}</label>
                <textarea rows={5} className="w-full rounded-2xl border border-white/10 bg-[#12071d] px-4 py-3 text-white placeholder:text-white/24 outline-none" placeholder={t.common.form.message} />
              </div>
            </div>

            <button className="mt-6 inline-flex items-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-[#13031d] transition hover:scale-[1.01]">
              {t.common.sendRequest}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 flex justify-start">
        <button onClick={() => changePage("home")} className="inline-flex items-center gap-2 text-sm text-white/70 transition hover:text-white">
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
        <p className="text-sm uppercase tracking-[0.24em] text-fuchsia-200/75">{kicker}</p>
       <h1 className="mt-4 text-3xl font-semibold tracking-tight sm:text-4xl lg:text-5xl">
  {title}
</h1>

<p className="mt-5 text-[16px] leading-7 text-white/68">
  {intro}
</p>
      </div>
      <div className="mt-12">{children}</div>
    </section>
  );
}

function SectionHeader({ kicker, title, intro }: { kicker: string; title: string; intro: string }) {
  return (
    <div className="max-w-3xl">
      <p className="text-sm uppercase tracking-[0.24em] text-fuchsia-200/75">{kicker}</p>
      <h2 className="mt-4 text-3xl font-semibold tracking-tight text-white sm:text-4xl">{title}</h2>
      <p className="mt-5 text-base leading-8 text-white/68 sm:text-lg">{intro}</p>
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

      <h3 className="text-[28px] font-semibold tracking-[-0.02em] text-white">
        {title}
      </h3>

      <p className="mt-4 text-[16px] leading-7 text-white/80">
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
      <h3 className="text-[22px] font-semibold text-white">{title}</h3>
      <p className="mt-3 text-[16px] leading-7 text-white/80">{text}</p>
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
