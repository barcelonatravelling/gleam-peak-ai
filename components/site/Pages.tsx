"use client";

import {
  Ban,
  FileSearch,
  Lock,
  MessageSquareReply,
  Scale,
  UserCheck,
  type LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { security, resources } from "./content-extra";
import { useLang } from "./LangContext";

const PRINCIPLE_ICONS: Record<string, LucideIcon> = {
  oversight: UserCheck,
  privacy: Lock,
  review: MessageSquareReply,
  trace: FileSearch,
  revoke: Ban,
  proportion: Scale,
};

const num = (i: number) => String(i + 1).padStart(2, "0");

// Illustrative only: fictitious names and values, shown as such on the page.
const POLICY_EXAMPLE = `policy: pagos-tesoreria
version: 3
when:
  action: transfer.create
  amount_eur: "> 10000"
require:
  mandate: [tesoreria, proveedores]
  purpose: pago-de-factura
  approval: responsable-finanzas
otherwise: block`;

const RECEIPT_EXAMPLE = `{
  "operation": "transfer.create",
  "agent": "agent:cuentas-a-pagar",
  "on_behalf_of": "org:ejemplo/finanzas",
  "policy": "pagos-tesoreria@v3",
  "decision": "approved",
  "approved_by": "persona:responsable-finanzas",
  "payload_hash": "sha256:7f3a…c21e",
  "signature": "ed25519:9b1d…04fa"
}`;

function Subhero({
  eyebrow,
  title,
  lead,
  long = false,
}: {
  eyebrow: string;
  title: React.ReactNode;
  lead: string;
  long?: boolean;
}) {
  return (
    <section className="subhero">
      <div className="shell">
        <span className="eyebrow">{eyebrow}</span>
        <h1 className={long ? "h1-long" : undefined}>{title}</h1>
        <p className="lead">{lead}</p>
      </div>
    </section>
  );
}

function Statement({
  kicker,
  quote,
  copy,
}: {
  kicker?: string;
  quote: string;
  copy: string;
}) {
  return (
    <section className="section">
      <div className="shell statement reveal">
        {kicker && <span className="kicker">{kicker}</span>}
        <blockquote>{quote}</blockquote>
        <p>{copy}</p>
      </div>
    </section>
  );
}

function Card({
  number,
  title,
  text,
  className = "",
}: {
  number: string;
  title: string;
  text: string;
  className?: string;
}) {
  return (
    <article className={`card ${className}`}>
      <span className="card-number">{number}</span>
      <h3>{title}</h3>
      <p>{text}</p>
    </article>
  );
}

function ProductVisual() {
  const { t } = useLang();
  const v = t.visual;
  return (
    <figure className="console-wrap" aria-label={v.label}>
      <div className="console">
        <div className="console-inner">
          <div className="console-bar">
            <span className="dots" aria-hidden="true">
              <i />
              <i />
              <i />
            </span>
            <span className="console-title">{v.window}</span>
            <span className="status">{t.common.development}</span>
          </div>
          <div className="console-body">
            <span className="operation-label">{v.operation}</span>
            <strong className="operation-amount">{v.amount}</strong>
            <div className="flow-list">
              {v.rows.map(([icon, label, state, kind]) => (
                <div className="flow-row" key={icon}>
                  <span className="flow-icon">{icon}</span>
                  <span>{label}</span>
                  <span className={kind === "pass" ? "flow-pass" : "flow-hold"}>
                    {state}
                  </span>
                </div>
              ))}
            </div>
            <div className="decision">{v.decision}</div>
          </div>
          <div className="receipt">
            <span>
              {v.receipt} · <code>sha256:7f3a…c21e</code>
            </span>
            <span className="receipt-signed">{v.signed}</span>
          </div>
        </div>
      </div>
      <figcaption className="visual-caption">{v.example}</figcaption>
    </figure>
  );
}

// The home page closes with the full panel; inner pages use a lighter band so they do not all end the same way.
function CtaBand({ compact = false }: { compact?: boolean }) {
  const { t, href } = useLang();
  return (
    <section className={`cta-band${compact ? " compact" : ""}`}>
      <div className="shell cta-card reveal">
        <div>
          <h2>{t.collaborate.title}</h2>
          {!compact && <p>{t.collaborate.lead}</p>}
        </div>
        <Link
          className="button button-primary button-arrow"
          href={href("talk")}
        >
          {t.common.collaborate}
        </Link>
      </div>
    </section>
  );
}

export function HomePage() {
  const { t, href } = useLang();
  const c = t.home;
  return (
    <div className="page">
      <section className="hero">
        <div className="shell hero-grid">
          <div>
            <span className="eyebrow">{c.eyebrow}</span>
            <h1>
              {c.title[0]}
              <span className="gradient">{c.title[1]}</span>
            </h1>
            <p className="lead">{c.lead}</p>
            <div className="hero-actions">
              <Link
                className="button button-primary button-arrow"
                href={href("gateway")}
              >
                {t.common.discover}
              </Link>
              <Link
                className="button button-secondary button-arrow"
                href={href("talk")}
              >
                {t.common.collaborate}
              </Link>
            </div>
          </div>
          <ProductVisual />
        </div>
      </section>

      <section className="checks">
        <div className="shell reveal">
          <p className="checks-title">{c.checksTitle}</p>
          <div className="checks-grid">
            {c.checks.map(([title, text]) => (
              <div className="check" key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <span className="kicker">{c.problemKicker}</span>
              <h2>{c.problemTitle}</h2>
            </div>
            <p className="section-copy">{c.problemCopy}</p>
          </div>
          <div className="grid-3 scroller reveal">
            {c.pains.map(([title, text], i) => (
              <Card key={title} number={num(i)} title={title} text={text} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <span className="kicker">{c.propositionKicker}</span>
              <h2>{c.propositionTitle}</h2>
            </div>
            <p className="section-copy">{c.propositionCopy}</p>
          </div>
          <div className="comparison reveal" role="table">
            <div className="comparison-row" role="row">
              <div className="comparison-label" role="columnheader">
                {c.comparisonHead[0]}
              </div>
              <div className="comparison-label" role="columnheader">
                {c.comparisonHead[1]}
              </div>
            </div>
            {c.comparison.map(([layer, question], i) => (
              <div
                className={`comparison-row${i === c.comparison.length - 1 ? " highlight" : ""}`}
                role="row"
                key={layer}
              >
                <div role="cell">{layer}</div>
                <div role="cell">{question}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <span className="kicker">{c.roadmapKicker}</span>
              <h2>{c.roadmapTitle}</h2>
            </div>
            <p className="section-copy">{c.roadmapCopy}</p>
          </div>
          <div className="roadmap reveal">
            {c.roadmap.map(([stage, title, text, target, cta], i) => (
              <article
                className={`card roadmap-card${i === 0 ? " current" : ""}`}
                key={title}
              >
                <span className="card-tag">{stage}</span>
                <h3>{title}</h3>
                <p>{text}</p>
                <Link className="roadmap-link" href={href(target)}>
                  {cta} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>
      <Statement quote={c.visionQuote} copy={c.visionCopy} />
      <CtaBand />
    </div>
  );
}

export function GatewayPage() {
  const { t } = useLang();
  const c = t.gateway;
  return (
    <div className="page">
      <Subhero
        eyebrow={c.eyebrow}
        title={
          <>
            {c.title[0]}
            <span className="gradient">{c.title[1]}</span>
          </>
        }
        lead={c.lead}
      />
      <section className="section">
        <div className="shell">
          <div className="grid-3 reveal">
            {c.features.map(([number, title, text]) => (
              <Card key={number} number={number} title={title} text={text} />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <span className="kicker">{c.exampleKicker}</span>
              <h2>{c.exampleTitle}</h2>
            </div>
            <p className="section-copy">{c.exampleCopy}</p>
          </div>
          <div className="code-pair reveal">
            <figure className="code-panel">
              <figcaption>
                <span>{c.policyLabel}</span>
                <code>pagos-tesoreria.yaml</code>
              </figcaption>
              <pre>{POLICY_EXAMPLE}</pre>
            </figure>
            <figure className="code-panel">
              <figcaption>
                <span>{c.receiptLabel}</span>
                <code>receipt.json</code>
              </figcaption>
              <pre>{RECEIPT_EXAMPLE}</pre>
            </figure>
          </div>
        </div>
      </section>
      <Statement quote={c.exactTitle} copy={c.exactCopy} />
      <section className="section">
        <div className="shell">
          <div className="section-heading reveal">
            <h2>{c.statusTitle}</h2>
          </div>
          <div className="now-next reveal">
            <article className="phase">
              <span className="card-tag">{c.nowTag}</span>
              <ul>
                {c.now.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="phase phase-next">
              <span className="card-tag">{c.nextTag}</span>
              <ul>
                {c.next.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
      <CtaBand compact />
    </div>
  );
}

export function HowPage() {
  const { t } = useLang();
  const c = t.how;
  return (
    <div className="page">
      <Subhero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <section className="section">
        <div className="shell process reveal">
          {c.steps.map(([title, text]) => (
            <article className="process-step" key={title}>
              <h3>{title}</h3>
              <p>{text}</p>
            </article>
          ))}
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <span className="kicker">{c.sequenceKicker}</span>
              <h2>{c.sequenceTitle}</h2>
            </div>
            <p className="section-copy">{c.sequenceCopy}</p>
          </div>
          <Sequence lanes={c.lanes} messages={c.sequence} />
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="section-heading reveal">
            <h2>{c.architectureTitle}</h2>
            <p className="section-copy">{c.architectureCopy}</p>
          </div>
          <div className="architecture reveal">
            {c.nodes.map(([title, role], i) => (
              <div
                className={`architecture-node${i === 1 ? " gateway" : ""}`}
                key={title}
              >
                <strong>{title}</strong>
                <span>{role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Statement
        kicker="AI Mandate Network"
        quote={c.networkTitle}
        copy={c.networkCopy}
      />
      <CtaBand compact />
    </div>
  );
}

export function ApplicationsPage() {
  const { t } = useLang();
  const c = t.applications;
  return (
    <div className="page">
      <Subhero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <section className="section">
        <div className="shell">
          <div className="audience-block">
            <h2>{c.whoTitle}</h2>
            <div className="grid-3 reveal">
              {c.who.map(([title, text], i) => (
                <Card
                  key={title}
                  number={num(i)}
                  title={title}
                  text={text}
                  className="compact-card"
                />
              ))}
            </div>
          </div>
          <div className="audience-block">
            <h2>{c.whereTitle}</h2>
            <div className="grid-3 reveal">
              {c.where.map(([title, text], i) => (
                <Card
                  key={title}
                  number={num(i)}
                  title={title}
                  text={text}
                  className="compact-card"
                />
              ))}
            </div>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <span className="kicker">{c.caseKicker}</span>
              <h2>{c.caseTitle}</h2>
            </div>
            <p className="section-copy">{c.caseCopy}</p>
          </div>
          <ol className="case-steps reveal">
            {c.caseSteps.map(([actor, title, text], i) => (
              <li
                key={title}
                className={
                  actor === "Trust Gateway" ? "case-gateway" : undefined
                }
              >
                <span className="case-index">{num(i)}</span>
                <span className="case-actor">{actor}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <Statement
        kicker="Public Decisions Gateway"
        quote={c.demoTitle}
        copy={c.demoCopy}
      />
      <CtaBand compact />
    </div>
  );
}

export function PrinciplesPage() {
  const { t } = useLang();
  const c = t.principles;
  return (
    <div className="page">
      <Subhero eyebrow={c.eyebrow} title={c.title} lead={c.lead} long />
      <section className="section">
        <div className="shell">
          <div className="grid-3 reveal">
            {c.cards.map(([icon, title, text]) => {
              const Icon = PRINCIPLE_ICONS[icon] ?? UserCheck;
              return (
                <article className="card principle-card" key={title}>
                  <div className="principle-icon" aria-hidden="true">
                    <Icon size={22} strokeWidth={1.75} />
                  </div>
                  <h3>{title}</h3>
                  <p>{text}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
      <Statement quote={c.rightsTitle} copy={c.rightsCopy} />
      <CtaBand compact />
    </div>
  );
}

function Sequence({
  lanes,
  messages,
}: {
  lanes: readonly string[];
  messages: readonly (readonly [number, number, string])[];
}) {
  const count = lanes.length;
  return (
    <figure
      className="sequence reveal"
      style={{ "--lanes": count } as React.CSSProperties}
    >
      <div className="sequence-lanes" aria-hidden="true">
        {lanes.map((lane, i) => (
          <span key={lane} className={i === 1 ? "lane gateway" : "lane"}>
            {lane}
          </span>
        ))}
      </div>
      <ol className="sequence-steps">
        {messages.map(([from, to, label], i) => {
          const left = Math.min(from, to);
          const right = Math.max(from, to);
          const self = from === to;
          return (
            <li
              key={label}
              className={`seq${self ? " self" : ""}${to < from ? " back" : ""}`}
              style={
                {
                  "--col": `${left + 1} / span ${right - left + 1}`,
                  "--span": right - left + 1,
                } as React.CSSProperties
              }
            >
              <span className="seq-index">{num(i)}</span>
              <span className="seq-route">
                {lanes[from]} → {lanes[to]}
              </span>
              <span className="seq-label">{label}</span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}

export function SecurityPage() {
  const { lang } = useLang();
  const c = security[lang];
  return (
    <div className="page">
      <Subhero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <section className="section">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <span className="kicker">{c.threatsKicker}</span>
              <h2>{c.threatsTitle}</h2>
            </div>
          </div>
          <div className="grid-3 reveal">
            {c.threats.map(([title, text], i) => (
              <Card
                key={title}
                number={num(i)}
                title={title}
                text={text}
                className="compact-card"
              />
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="section-heading reveal">
            <h2>{c.scopeTitle}</h2>
          </div>
          <div className="now-next reveal">
            <article className="phase">
              <span className="card-tag">{c.doesTag}</span>
              <ul>
                {c.does.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
            <article className="phase phase-next phase-not">
              <span className="card-tag">{c.doesNotTag}</span>
              <ul>
                {c.doesNot.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell prose-grid reveal">
          <article>
            <h2>{c.evidenceTitle}</h2>
            <p>{c.evidenceCopy}</p>
          </article>
          <article>
            <h2>{c.regulationTitle}</h2>
            <p>{c.regulationCopy}</p>
          </article>
          <article>
            <h2>{c.reportTitle}</h2>
            <p>{c.reportCopy}</p>
          </article>
        </div>
      </section>
      <CtaBand compact />
    </div>
  );
}

export function ResourcesPage() {
  const { lang } = useLang();
  const c = resources[lang];
  return (
    <div className="page">
      <Subhero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <section className="section">
        <div className="shell">
          <div className="section-heading reveal">
            <h2>{c.glossaryTitle}</h2>
          </div>
          <dl className="glossary reveal">
            {c.glossary.map(([term, definition]) => (
              <div key={term}>
                <dt>{term}</dt>
                <dd>{definition}</dd>
              </div>
            ))}
          </dl>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <div className="section-heading reveal">
            <h2>{c.faqTitle}</h2>
          </div>
          <div className="faq reveal">
            {c.faq.map(([question, answer]) => (
              <details key={question}>
                <summary>{question}</summary>
                <p>{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <CtaBand compact />
    </div>
  );
}
