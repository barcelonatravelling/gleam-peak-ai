"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import {
  ArrowRight,
  BrainCircuit,
  Building2,
  ChevronRight,
  Cpu,
  Globe,
  LineChart,
  Menu,
  Sparkles,
  X,
  Bot,
  Briefcase,
  Layers3,
} from "lucide-react";

const content = {
  en: {
    brand: "Gleam Peak",
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
      discuss: "Discuss this solution",
      sendRequest: "Send request",
      trustedTitle: "Built for ambitious companies",
      trustedItems: [
        "Strategic AI consulting",
        "Workflow automation",
        "Customer-facing assistants",
        "Internal intelligence systems",
      ],
      form: {
        name: "Name",
        company: "Company",
        email: "Work email",
        message: "Tell us about your company, goals or workflow",
      },
    },
    home: {
  kicker: "Enterprise-grade AI for modern businesses",
  title: "AI infrastructure and intelligent automation for modern enterprises.",
  subtitle:
    "Gleam Peak helps companies deploy practical AI systems that improve operations, automate workflows, support decision-making and create measurable business value.",
      ctas: {
        primary: "Book a Strategy Call",
        secondary: "Explore AI Solutions",
      },
      stats: [
        {
          title: "B2B",
          text: "Built for ambitious companies and high-value service brands.",
        },
        {
          title: "ROI",
          text: "Focused on operational efficiency and measurable outcomes.",
        },
        {
          title: "Scale",
          text: "Designed to become a long-term competitive advantage.",
        },
      ],
      previewTitle: "AI orchestration layer",
      previewText:
        "Intelligent orchestration of workflows, data, automation and decision support across the organization.",
      previewCards: [
        {
          title: "Lead qualification",
          text: "Prioritize inquiries, capture data and trigger next actions automatically.",
        },
        {
          title: "Knowledge assistant",
          text: "Give your team fast, contextual answers grounded in your company information.",
        },
        {
          title: "Executive visibility",
          text: "Summaries, reports and performance signals generated in real time.",
        },
      ],
      sections: {
        solutionsTitle: "Core capabilities",
        solutionsText:
          "A modular AI offering aligned with real business priorities, operational needs and scalable growth.",
        industriesTitle: "Industry-aware execution",
        industriesText:
          "We adapt AI systems to the commercial logic, workflows and service expectations of each sector.",
        casesTitle: "Illustrative outcomes",
        casesText:
          "Examples of how AI can improve service quality, speed, operating efficiency and executive visibility.",
      },
    },
    solutionsPage: {
      kicker: "AI Solutions",
      title: "A modular AI offering built for real business environments.",
      intro:
        "Our AI solutions are designed to align with business priorities, integrate with existing workflows and create meaningful, sustainable advantages.",
      cards: [
  {
    title: "AI Consulting",
    text: "Strategic advisory for identifying high-impact AI opportunities, implementation priorities and scalable adoption plans.",
    icon: BrainCircuit,
  },
  {
    title: "AI Automation",
    text: "Automation of repetitive workflows, internal operations, reporting flows and customer-facing processes using AI.",
    icon: Cpu,
  },
  {
    title: "AI Agents",
    text: "Custom AI assistants for lead qualification, support, internal knowledge access and operational coordination.",
    icon: Layers3,
  },
  {
    title: "Decision Intelligence",
    text: "Systems that transform business data into real-time visibility, insights and decision support for leadership teams.",
    icon: LineChart,
  },
],
      listTitle: "What we can build",
      items: [
        "Executive AI roadmap and opportunity analysis",
        "Customer-facing AI assistants and chat experiences",
        "Internal copilots for teams and operations",
        "Lead capture, qualification and sales automation",
        "Knowledge bases connected to business documents",
        "Reporting, analytics and decision-support systems",
      ],
    },
    automationPage: {
      kicker: "AI Automation",
      title: "Automate what slows the business down.",
      intro:
        "From inquiry handling and routing to reporting, CRM actions, internal coordination and repetitive service workflows, we build AI automation layers that reduce friction and unlock capacity.",
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
          text: "We analyze your business model, workflows, friction points and strategic priorities.",
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
          text: "We optimize performance, expand use cases and turn AI into a long-term operating advantage.",
        },
      ],
    },
    industriesPage: {
      kicker: "Industries",
      title: "Industry-aware AI systems for service-led and experience-led businesses.",
      intro:
        "We adapt AI to the logic of each industry, making solutions more relevant, more adoptable and more commercially effective.",
      cards: [
        {
          title: "Hospitality & Travel",
          text: "AI for inquiries, booking support, multilingual communication, upselling and guest experience optimization.",
        },
        {
          title: "Luxury & Wellness",
          text: "Premium AI experiences for concierge, customer care, lead nurturing and operational coordination.",
        },
        {
          title: "Professional Services",
          text: "Smarter intake, internal knowledge systems, document workflows and client communication automation.",
        },
        {
          title: "Ecommerce & Retail",
          text: "AI-driven support, product assistance, conversion flows, retention automation and operational visibility.",
        },
      ],
    },
    casesPage: {
      kicker: "Case Studies",
      title: "Illustrative examples of AI impact across the customer and operational journey.",
      intro:
        "These examples show how the right AI architecture can improve responsiveness, consistency, internal efficiency and strategic visibility.",
      cards: [
        {
          title: "Multichannel Lead Qualification",
          result: "+38% faster response time",
          text: "An AI assistant qualifies inbound leads, routes them to the right team and triggers personalized follow-up automatically.",
        },
        {
          title: "Internal Knowledge Copilot",
          result: "24/7 team access to answers",
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
      title: "Let’s identify where AI can create the most value in your business.",
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
    brand: "Gleam Peak",
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
      discuss: "Hablar sobre esta solución",
      sendRequest: "Enviar solicitud",
      trustedTitle: "Pensado para empresas ambiciosas",
      trustedItems: [
        "Consultoría estratégica de IA",
        "Automatización de flujos de trabajo",
        "Asistentes para clientes",
        "Sistemas internos de inteligencia",
      ],
      form: {
        name: "Nombre",
        company: "Empresa",
        email: "Correo corporativo",
        message: "Cuéntanos sobre tu empresa, objetivos o procesos",
      },
    },
    home: {
  kicker: "IA de nivel empresarial para negocios modernos",
  title: "Infraestructura de IA y automatización inteligente para empresas modernas.",
  subtitle:
    "Gleam Peak ayuda a las empresas a implementar sistemas de IA prácticos que mejoran operaciones, automatizan procesos, apoyan la toma de decisiones y generan valor de negocio medible.",
      ctas: {
        primary: "Reservar una llamada estratégica",
        secondary: "Explorar soluciones IA",
      },
      stats: [
        {
          title: "B2B",
          text: "Diseñado para empresas ambiciosas y marcas de servicios de alto valor.",
        },
        {
          title: "ROI",
          text: "Enfocado en eficiencia operativa y resultados medibles.",
        },
        {
          title: "Escala",
          text: "Pensado para convertirse en una ventaja competitiva a largo plazo.",
        },
      ],
      previewTitle: "Capa de orquestación de IA",
      previewText:
        "Orquestación inteligente de flujos de trabajo, datos, automatización y apoyo a la toma de decisiones en toda la organización.",
      previewCards: [
        {
          title: "Cualificación de leads",
          text: "Prioriza consultas, captura datos y activa automáticamente las siguientes acciones.",
        },
        {
          title: "Asistente de conocimiento",
          text: "Da a tu equipo respuestas rápidas y contextualizadas basadas en la información de tu empresa.",
        },
        {
          title: "Visibilidad ejecutiva",
          text: "Resúmenes, informes y señales de rendimiento generados en tiempo real.",
        },
      ],
      sections: {
        solutionsTitle: "Capacidades principales",
        solutionsText:
          "Una oferta modular de IA alineada con prioridades reales de negocio, necesidades operativas y crecimiento escalable.",
        industriesTitle: "Ejecución adaptada por industria",
        industriesText:
          "Adaptamos los sistemas de IA a la lógica comercial, los procesos y las expectativas de servicio de cada sector.",
        casesTitle: "Resultados ilustrativos",
        casesText:
          "Ejemplos de cómo la IA puede mejorar la calidad del servicio, la velocidad, la eficiencia operativa y la visibilidad ejecutiva.",
      },
    },
    solutionsPage: {
      kicker: "Soluciones IA",
      title: "Una oferta modular de IA diseñada para entornos empresariales reales.",
      intro:
        "Nuestras soluciones de IA están diseñadas para alinearse con las prioridades del negocio, integrarse con los flujos de trabajo existentes y crear ventajas sostenibles y relevantes.",
      cards: [
  {
    title: "Consultoría IA",
    text: "Asesoría estratégica para identificar oportunidades de alto impacto con IA, prioridades de implementación y planes de adopción escalables.",
    icon: BrainCircuit,
  },
  {
    title: "Automatización IA",
    text: "Automatización de flujos repetitivos, operaciones internas, reporting y procesos orientados al cliente mediante IA.",
    icon: Cpu,
  },
  {
    title: "Agentes IA",
    text: "Asistentes de IA personalizados para cualificación de leads, soporte, acceso a conocimiento interno y coordinación operativa.",
    icon: Layers3,
  },
  {
    title: "Inteligencia para decisiones",
    text: "Sistemas que transforman los datos del negocio en visibilidad en tiempo real, insights y apoyo a la toma de decisiones para dirección.",
    icon: LineChart,
  },
],
      listTitle: "Lo que podemos construir",
      items: [
        "Hoja de ruta ejecutiva de IA y análisis de oportunidades",
        "Asistentes IA para clientes y experiencias conversacionales",
        "Copilotos internos para equipos y operaciones",
        "Captación, cualificación de leads y automatización comercial",
        "Bases de conocimiento conectadas a documentos del negocio",
        "Sistemas de reporting, analítica y apoyo a decisiones",
      ],
    },
    automationPage: {
      kicker: "Automatización IA",
      title: "Automatiza lo que frena a la empresa.",
      intro:
        "Desde la gestión y el enrutamiento de consultas hasta informes, acciones en CRM, coordinación interna y procesos repetitivos de servicio, construimos capas de automatización con IA que reducen fricción y liberan capacidad.",
      items: [
        "Clasificación de correos y consultas",
        "Secuencias de seguimiento",
        "Preparación y resúmenes de reuniones",
        "Enrutamiento de solicitudes internas",
        "Actualizaciones de CRM y pipeline",
        "Informes operativos",
      ],
      processTitle: "Marco de automatización",
      processSubtitle: "Del flujo manual al flujo operativo impulsado por IA",
      process: [
        {
          step: "01",
          title: "Descubrimiento",
          text: "Analizamos tu modelo de negocio, flujos de trabajo, puntos de fricción y prioridades estratégicas.",
        },
        {
          step: "02",
          title: "Arquitectura",
          text: "Definimos los sistemas de IA adecuados, integraciones, flujo de datos y la hoja de ruta de implementación.",
        },
        {
          step: "03",
          title: "Despliegue",
          text: "Construimos, probamos y refinamos la solución con foco en usabilidad, fiabilidad y resultados medibles.",
        },
        {
          step: "04",
          title: "Escalado",
          text: "Optimizamos el rendimiento, ampliamos casos de uso y convertimos la IA en una ventaja operativa duradera.",
        },
      ],
    },
    industriesPage: {
      kicker: "Industrias",
      title: "Sistemas de IA adaptados a negocios centrados en el servicio y la experiencia.",
      intro:
        "Adaptamos la IA a la lógica de cada industria, haciendo las soluciones más relevantes, más fáciles de adoptar y más eficaces comercialmente.",
      cards: [
        {
          title: "Hospitality y turismo",
          text: "IA para consultas, soporte en reservas, comunicación multilingüe, upselling y optimización de la experiencia del huésped.",
        },
        {
          title: "Lujo y wellness",
          text: "Experiencias premium con IA para concierge, atención al cliente, nutrición de leads y coordinación operativa.",
        },
        {
          title: "Servicios profesionales",
          text: "Admisión más inteligente, sistemas internos de conocimiento, flujos documentales y automatización de comunicación con clientes.",
        },
        {
          title: "Ecommerce y retail",
          text: "Soporte impulsado por IA, asistencia de producto, flujos de conversión, automatización de retención y visibilidad operativa.",
        },
      ],
    },
    casesPage: {
      kicker: "Casos de estudio",
      title: "Ejemplos ilustrativos del impacto de la IA en el recorrido del cliente y la operación.",
      intro:
        "Estos ejemplos muestran cómo la arquitectura de IA adecuada puede mejorar la capacidad de respuesta, la consistencia, la eficiencia interna y la visibilidad estratégica.",
      cards: [
        {
          title: "Cualificación multicanal de leads",
          result: "+38% más rapidez en la respuesta",
          text: "Un asistente IA cualifica los leads entrantes, los dirige al equipo adecuado y activa automáticamente seguimientos personalizados.",
        },
        {
          title: "Copiloto interno de conocimiento",
          result: "Acceso 24/7 a respuestas para el equipo",
          text: "Un entorno seguro de IA entrenado con documentación de la empresa reduce el tiempo de búsqueda y mejora la consistencia entre equipos.",
        },
        {
          title: "Capa de automatización operativa",
          result: "Horas recuperadas cada semana",
          text: "La automatización de informes, tareas y orquestación de flujos reduce cuellos de botella manuales y mejora la velocidad de ejecución.",
        },
      ],
    },
    callPage: {
      kicker: "Reservar llamada",
      title: "Identifiquemos dónde la IA puede crear más valor en tu empresa.",
      intro:
        "Reserva una conversación estratégica para explorar las oportunidades adecuadas de IA, la arquitectura correcta y el primer despliegue ideal para tu negocio.",
      bullets: [
        "Conversación enfocada en negocio",
        "Próximos pasos prácticos",
        "Recomendaciones adaptadas a tu empresa",
      ],
    },
  },
};

const pageAnimation = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -14 },
  transition: { duration: 0.35, ease: "easeOut" as const },
};

const pageOrder = ["home", "solutions", "automation", "industries", "cases", "call"];

export default function GleamPeakWebsite() {
  const [lang, setLang] = useState<"en" | "es">("en");
  const [page, setPage] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);
  const t = content[lang];

  const navItems = useMemo(
    () => [
      { key: "home", label: t.nav.home },
      { key: "solutions", label: t.nav.solutions },
      { key: "automation", label: t.nav.automation },
      { key: "industries", label: t.nav.industries },
      { key: "cases", label: t.nav.cases },
      { key: "call", label: t.nav.call },
    ],
    [t]
  );

  const changePage = (nextPage: string) => {
    setPage(nextPage);
    setMenuOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentIndex = pageOrder.indexOf(page);
  const nextPage =
    currentIndex >= 0 && currentIndex < pageOrder.length - 1 ? pageOrder[currentIndex + 1] : null;

  return (
    <div className="min-h-screen bg-[#06010e] text-white selection:bg-fuchsia-500/30 selection:text-white">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(168,85,247,0.34),transparent_30%),radial-gradient(circle_at_78%_16%,rgba(217,70,239,0.16),transparent_18%),radial-gradient(circle_at_20%_78%,rgba(124,58,237,0.16),transparent_22%),linear-gradient(to_bottom,#06010e,#120423,#06010e)]" />
        <motion.div
          animate={{ y: [0, -12, 0], opacity: [0.25, 0.38, 0.25] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute left-1/2 top-24 h-72 w-72 -translate-x-1/2 rounded-full bg-fuchsia-500/18 blur-3xl"
        />
        <motion.div
          animate={{ x: [0, 22, 0], y: [0, 14, 0] }}
          transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
          className="absolute right-12 top-56 h-64 w-64 rounded-full bg-violet-500/10 blur-3xl"
        />
      </div>

      <header className="sticky top-0 z-50 border-b border-white/8 bg-[#070114]/68 backdrop-blur-xl">
  <div className="mx-auto flex h-[72px] max-w-7xl items-center justify-between px-5 lg:px-8">
    
    <button
  onClick={() => changePage("home")}
  className="group flex items-center text-left"
>
  <Image
    src="/logo.png"
    alt="Gleam Peak AI"
    width={300}
    height={120}
    className="h-auto w-[150px] sm:w-[180px] md:w-[220px] transition duration-300 group-hover:scale-[1.02]"
  />
</button>

    <nav className="hidden items-center gap-7 text-[14px] font-medium text-white/72 md:flex">
      {navItems.map((item) => (
        <button
  onClick={() => setMenuOpen(!menuOpen)}
  className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 p-2.5 text-white transition hover:bg-white/10 md:hidden"
  aria-label="Open menu"
>
  {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
</button>
      ))}
    </nav>

    <div className="flex items-center gap-3 h-[80px]">
      <button
        onClick={() => setLang(lang === "en" ? "es" : "en")}
        className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/6 px-4 py-2 text-sm font-medium text-white transition hover:bg-white/10"
      >
        <Globe className="h-4 w-4" />
        {t.common.switchLanguage}
      </button>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="inline-flex items-center justify-center rounded-full border border-white/12 bg-white/6 p-2.5 md:hidden"
      >
        {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
      </button>
    </div>

  </div>
</header>
<AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.2, ease: "easeOut" as const }}
      className="border-b border-white/8 bg-[#070114]/95 px-5 py-4 backdrop-blur-xl md:hidden"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              changePage(item.key);
              setMenuOpen(false);
            }}
            className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
              page === item.key
                ? "border-fuchsia-400/30 bg-white/10 text-white"
                : "border-white/8 bg-white/5 text-white/78 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}

        <button
          onClick={() => setLang(lang === "en" ? "es" : "en")}
          className="mt-1 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10"
        >
          {t.common.switchLanguage}
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>
<AnimatePresence>
  {menuOpen && (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.22, ease: "easeOut" as const }}
      className="border-b border-white/10 bg-[#090214]/96 px-6 py-5 backdrop-blur-2xl md:hidden"
    >
      <div className="mx-auto flex max-w-7xl flex-col gap-3">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => {
              changePage(item.key);
              setMenuOpen(false);
            }}
            className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
              page === item.key
                ? "border-fuchsia-400/30 bg-white/10 text-white"
                : "border-white/8 bg-white/5 text-white/78 hover:bg-white/10 hover:text-white"
            }`}
          >
            {item.label}
          </button>
        ))}

        <button
          onClick={() => setLang(lang === "en" ? "es" : "en")}
          className="mt-2 inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white/85 transition hover:bg-white/10"
        >
          {t.common.switchLanguage}
        </button>
      </div>
    </motion.div>
  )}
</AnimatePresence>
      <main className="mx-auto max-w-7xl px-5 pb-16 pt-8 lg:px-8 lg:pb-24 lg:pt-10">
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
          <div>© {t.brand} AI</div>
          <div className="flex items-center gap-5">
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

function HomePage({ t, changePage }: any) {
  return (
    <div className="space-y-20 lg:space-y-24">
      <section className="grid items-center gap-14 lg:grid-cols-[1.12fr_0.88fr]">
        <div>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.22em] text-fuchsia-100/90">
            <Sparkles className="h-3.5 w-3.5" />
            {t.home.kicker}
          </div>

          <h1 className="max-w-[11ch] text-5xl font-semibold leading-[0.95] tracking-[-0.05em] text-white sm:text-6xl lg:text-7xl">
            {t.home.title}
          </h1>

          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70 sm:text-xl">
            {t.home.subtitle}
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <button
              onClick={() => changePage("call")}
              className="inline-flex items-center justify-center gap-2 rounded-2xl bg-white px-6 py-4 text-sm font-semibold text-[#12031c] transition hover:scale-[1.01]"
            >
              {t.home.ctas.primary}
              <ArrowRight className="h-4 w-4" />
            </button>
            <button
              onClick={() => changePage("solutions")}
              className="inline-flex items-center justify-center rounded-2xl border border-white/12 bg-white/6 px-6 py-4 text-sm font-semibold text-white transition hover:bg-white/10"
            >
              {t.home.ctas.secondary}
            </button>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {t.home.stats.map((item: any) => (
              <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.05] p-5">
                <p className="text-2xl font-semibold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-white/58">{item.text}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-5 rounded-[2rem] bg-gradient-to-br from-fuchsia-500/18 via-violet-500/10 to-white/5 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl">
            <div className="flex items-center justify-between border-b border-white/10 pb-5">
              <div>
                <p className="text-sm text-white/50">{t.common.trustedTitle}</p>
                <h3 className="mt-1 text-2xl font-semibold">{t.home.previewTitle}</h3>
              </div>
              <div className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-200">
                Live
              </div>
            </div>

            <p className="mt-5 text-sm leading-7 text-white/62">{t.home.previewText}</p>

            <div className="mt-6 space-y-4">
              {t.home.previewCards.map((card: any) => (
                <div key={card.title} className="rounded-2xl border border-white/10 bg-[#11051d]/80 p-5">
                  <p className="text-sm text-white/48">{card.title}</p>
                  <p className="mt-2 text-base leading-7 text-white/84">{card.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        <FeaturePanel
          icon={BrainCircuit}
          title={t.home.sections.solutionsTitle}
          text={t.home.sections.solutionsText}
          button={t.nav.solutions}
          onClick={() => changePage("solutions")}
        />
        <FeaturePanel
          icon={Building2}
          title={t.home.sections.industriesTitle}
          text={t.home.sections.industriesText}
          button={t.nav.industries}
          onClick={() => changePage("industries")}
        />
        <FeaturePanel
          icon={Briefcase}
          title={t.home.sections.casesTitle}
          text={t.home.sections.casesText}
          button={t.nav.cases}
          onClick={() => changePage("cases")}
        />
      </section>

      <section className="border-y border-white/8 bg-white/[0.02]">
        <div className="grid gap-6 px-6 py-8 text-sm text-white/50 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
          {t.common.trustedItems.map((item: string) => (
            <div key={item} className="rounded-xl border border-white/8 bg-white/[0.03] px-4 py-4 text-center">
              {item}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

function SolutionsPage({ t, changePage, nextPage }: any) {
  return (
    <PageShell kicker={t.solutionsPage.kicker} title={t.solutionsPage.title} intro={t.solutionsPage.intro}>
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {t.solutionsPage.cards.map((card: any) => {
          const Icon = card.icon;
          return (
            <div key={card.title} className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-6">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08]">
                <Icon className="h-5 w-5 text-fuchsia-200" />
              </div>
              <h3 className="mt-6 text-xl font-semibold">{card.title}</h3>
              <p className="mt-4 text-sm leading-7 text-white/65">{card.text}</p>
              <button onClick={() => changePage("call")} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/86">
                {t.common.discuss}
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          );
        })}
      </div>

      <div className="mt-12 rounded-[1.8rem] border border-white/10 bg-[#0d0618] p-8">
        <h3 className="text-2xl font-semibold">{t.solutionsPage.listTitle}</h3>
        <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {t.solutionsPage.items.map((item: string) => (
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

function AutomationPage({ t, changePage, nextPage }: any) {
  return (
    <PageShell kicker={t.automationPage.kicker} title={t.automationPage.title} intro={t.automationPage.intro}>
      <div className="grid gap-12 lg:grid-cols-[1fr_0.95fr] lg:items-start">
        <div>
          <div className="grid gap-4 sm:grid-cols-2">
            {t.automationPage.items.map((item: string) => (
              <div key={item} className="rounded-2xl border border-white/8 bg-[#0d0618] px-5 py-4 text-white/84">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/[0.08] to-white/[0.03] p-7">
          <div className="rounded-[1.5rem] border border-white/10 bg-[#11071d] p-6">
            <p className="text-sm text-white/48">{t.automationPage.processTitle}</p>
            <h3 className="mt-2 text-2xl font-semibold">{t.automationPage.processSubtitle}</h3>
            <div className="mt-8 space-y-4">
              {t.automationPage.process.map((item: any) => (
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

function IndustriesPage({ t, changePage, nextPage }: any) {
  return (
    <PageShell kicker={t.industriesPage.kicker} title={t.industriesPage.title} intro={t.industriesPage.intro}>
      <div className="grid gap-5 sm:grid-cols-2">
        {t.industriesPage.cards.map((industry: any) => (
          <div key={industry.title} className="rounded-[1.6rem] border border-white/10 bg-white/[0.05] p-6">
            <h3 className="text-xl font-semibold">{industry.title}</h3>
            <p className="mt-4 text-sm leading-7 text-white/66">{industry.text}</p>
          </div>
        ))}
      </div>

      <PageFooterNav t={t} changePage={changePage} nextPage={nextPage} />
    </PageShell>
  );
}

function CasesPage({ t, changePage, nextPage }: any) {
  return (
    <PageShell kicker={t.casesPage.kicker} title={t.casesPage.title} intro={t.casesPage.intro}>
      <div className="grid gap-6 lg:grid-cols-3">
        {t.casesPage.cards.map((item: any) => (
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

function CallPage({ t, changePage }: any) {
  return (
    <PageShell kicker={t.callPage.kicker} title={t.callPage.title} intro={t.callPage.intro}>
      <div className="overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-fuchsia-500/12 via-violet-500/8 to-white/[0.04] shadow-2xl">
        <div className="grid gap-0 lg:grid-cols-[0.9fr_1.1fr]">
          <div className="border-b border-white/8 p-8 lg:border-b-0 lg:border-r lg:p-10">
            <div className="space-y-4 text-sm text-white/62">
              {t.callPage.bullets.map((item: string) => (
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
          Back to Home
        </button>
      </div>
    </PageShell>
  );
}

function PageShell({ kicker, title, intro, children }: any) {
  return (
    <section>
      <div className="max-w-3xl">
        <p className="text-sm uppercase tracking-[0.24em] text-fuchsia-200/75">{kicker}</p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">{title}</h1>
        <p className="mt-5 text-lg leading-8 text-white/68">{intro}</p>
      </div>
      <div className="mt-12">{children}</div>
    </section>
  );
}

function FeaturePanel({ icon: Icon, title, text, button, onClick }: any) {
  return (
    <div className="rounded-[1.75rem] border border-white/10 bg-white/[0.05] p-7">
      <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.08]">
        <Icon className="h-5 w-5 text-fuchsia-200" />
      </div>
      <h3 className="mt-6 text-2xl font-semibold">{title}</h3>
      <p className="mt-4 text-sm leading-7 text-white/65">{text}</p>
      <button onClick={onClick} className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-white/86">
        {button}
        <ChevronRight className="h-4 w-4" />
      </button>
    </div>
  );
}

function PageFooterNav({ t, changePage, nextPage }: any) {
  return (
    <div className="mt-10 flex flex-col gap-4 border-t border-white/8 pt-8 sm:flex-row sm:items-center sm:justify-between">
      <button onClick={() => changePage("home")} className="inline-flex items-center gap-2 text-sm text-white/68 transition hover:text-white">
        <ChevronRight className="h-4 w-4 rotate-180" />
        Back to Home
      </button>

      {nextPage && (
        <button onClick={() => changePage(nextPage)} className="inline-flex items-center gap-2 text-sm font-medium text-white transition hover:text-fuchsia-200">
          Next step
          <ArrowRight className="h-4 w-4" />
        </button>
      )}
    </div>
  );
}