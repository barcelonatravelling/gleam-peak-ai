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
import { pagesContent } from "./content-pages";
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
    </figure>
  );
}

// Inner pages close with the same neon line and title as Control, Passport and Soluciones.
function CtaBand() {
  const { t } = useLang();
  return <PageClosing title={t.collaborate.title} />;
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
              {c.title[1]}
            </h1>
            <p className="lead">{c.lead}</p>
            <div className="hero-actions">
              <Link className="button button-primary button-arrow" href={href("talk")}>
                {c.ctaPrimary}
              </Link>
              <Link className="button button-secondary button-arrow" href={href("gateway")}>
                {c.ctaSecondary}
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <ProductVisual />
            <div className="passport-card" aria-hidden="true">
              <div className="passport-head">
                <span>{c.passport.title}</span>
                <span className="passport-state">{c.passport.state}</span>
              </div>
              <ul>
                {c.passport.rows.map((row) => (
                  <li key={row}>{row}</li>
                ))}
              </ul>
              <code>{c.passport.proof}</code>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell statement problem reveal">
          <span className="kicker">{c.problemKicker}</span>
          <blockquote>{c.problemTitle}</blockquote>
          <p>{c.problemCopy}</p>
        </div>
      </section>

      <section className="section" id="que-resuelve">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <span className="kicker">{c.solvesKicker}</span>
              <h2>{c.solvesTitle}</h2>
            </div>
          </div>
          <div className="solves reveal">
            {c.solves.map(([area, title, text], i) => (
              <article className="solve" key={area}>
                <span className="solve-area">
                  {num(i)} · {area}
                </span>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <span className="kicker">{c.sidesKicker}</span>
              <h2>{c.sidesTitle}</h2>
            </div>
          </div>
          <div className="sides reveal">
            {c.sides.map(([name, where, text], i) => (
              <article className={`side${i === 0 ? " side-control" : " side-passport"}`} key={name}>
                <span className="side-where">{where}</span>
                <h3>{name}</h3>
                <p>{text}</p>
              </article>
            ))}
            <div className="sides-link" aria-hidden="true">
              <span />
            </div>
          </div>
          <p className="sides-line reveal">{c.sidesLine}</p>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <span className="kicker">{c.flowKicker}</span>
              <h2>{c.flowTitle}</h2>
            </div>
            <p className="section-copy">{c.flowCopy}</p>
          </div>
          <Sequence lanes={c.flowLanes} messages={c.flow} />
        </div>
      </section>

      <section className="section" id="passport">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <span className="kicker">{c.caseKicker}</span>
              <h2>{c.caseTitle}</h2>
            </div>
            <p className="section-copy">{c.caseCopy}</p>
          </div>
          <Sequence lanes={c.caseLanes} messages={c.case} />
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <span className="kicker">{c.integrationKicker}</span>
              <h2>{c.integrationTitle}</h2>
            </div>
            <p className="section-copy">{c.integrationCopy}</p>
          </div>
          <div className="architecture reveal">
            {c.nodes.map(([title, role], i) => (
              <div className={`architecture-node${i === 1 || i === 4 ? " gateway" : ""}`} key={title}>
                <strong>{title}</strong>
                <span>{role}</span>
              </div>
            ))}
          </div>
          <div className="stack reveal">
            <span className="stack-label">{c.stackLabel}</span>
            <ul>
              {c.stack.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell norms reveal">
          <div>
            <span className="kicker">{c.normsKicker}</span>
            <h2>{c.normsTitle}</h2>
            <p className="section-copy">{c.normsNote}</p>
          </div>
          <ul className="norms-list">
            {c.norms.map((norm) => (
              <li key={norm}>{norm}</li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section" id="hoja-de-ruta">
        <div className="shell">
          <div className="section-heading reveal">
            <div>
              <span className="kicker">{c.roadmapKicker}</span>
              <h2>{c.roadmapTitle}</h2>
            </div>
            <p className="section-copy">{c.roadmapNote}</p>
          </div>
          <ol className="stages reveal">
            {c.roadmap.map(([when, title, text], i) => (
              <li className={`stage${i === 0 ? " current" : ""}`} key={title}>
                <span className="stage-when">{when}</span>
                <h3>{title}</h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="closing">
        <div className="shell closing-inner reveal">
          <h2>{c.closingTitle}</h2>
          <Link className="button button-primary button-arrow" href={href("talk")}>
            {c.closingCta}
          </Link>
        </div>
      </section>
    </div>
  );
}

function Heading({ kicker, title, copy }: { kicker: string; title: string; copy?: string }) {
  return (
    <div className="section-heading reveal">
      <div>
        <span className="kicker">{kicker}</span>
        <h2>{title}</h2>
      </div>
      {copy && <p className="section-copy">{copy}</p>}
    </div>
  );
}

// Illustrative only: fictitious names and values, matching the blocked export shown in the Control hero.
const POLICY_EXPORT = `policy: datos-clientes
version: 2
when:
  action: customers.export
  records: "> 50"
require:
  mandate: [atencion-cliente]
  purpose: consulta-individual
  data: personal → minimo-necesario
otherwise: block + alert(seguridad)`;

const RECEIPT_EXPORT = `{
  "operation": "customers.export",
  "agent": "agent:atencion-cliente",
  "on_behalf_of": "org:ejemplo/atencion",
  "policy": "datos-clientes@v2",
  "decision": "blocked",
  "reason": "mandate.scope",
  "payload_hash": "sha256:4c9e…a71b",
  "signature": "ed25519:2f8a…d3c0"
}`;

function ControlConsole() {
  const { lang, t } = useLang();
  const v = pagesContent[lang].control.console;
  return (
    <figure className="console-wrap control-console" aria-label={v.label}>
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
            <strong className="operation-amount">{v.detail}</strong>
            <div className="flow-list">
              {v.rows.map(([icon, label, state, kind]) => (
                <div className="flow-row" key={icon}>
                  <span className="flow-icon">{icon}</span>
                  <span>{label}</span>
                  <span className={kind === "pass" ? "flow-pass" : "flow-fail"}>{state}</span>
                </div>
              ))}
            </div>
            <div className="decision decision-blocked">
              <span>{v.decision}</span>
              <span className="stop-button">{v.stop}</span>
            </div>
          </div>
          <div className="receipt">
            <span>
              {v.receipt} · <code>sha256:4c9e…a71b</code>
            </span>
            <span className="receipt-signed">{v.signed}</span>
          </div>
        </div>
      </div>
    </figure>
  );
}

function SplitHero({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: string;
  lead: string;
  children: React.ReactNode;
}) {
  return (
    <section className="subhero split-hero">
      <div className="shell split-hero-grid">
        <div>
          <span className="eyebrow">{eyebrow}</span>
          <h1>{title}</h1>
          <p className="lead">{lead}</p>
        </div>
        {children}
      </div>
    </section>
  );
}

function PageClosing({ title }: { title: string }) {
  const { t, href } = useLang();
  return (
    <section className="page-closing">
      <div className="shell page-closing-inner reveal">
        <h2>{title}</h2>
        <Link className="button button-primary button-arrow" href={href("talk")}>
          {t.home.closingCta}
        </Link>
      </div>
    </section>
  );
}


export function GatewayPage() {
  const { lang } = useLang();
  const c = pagesContent[lang].control;
  return (
    <div className="page">
      <SplitHero eyebrow={c.eyebrow} title={c.title} lead={c.lead}>
        <ControlConsole />
      </SplitHero>
      <section className="section">
        <div className="shell">
          <Heading kicker={c.decideKicker} title={c.decideTitle} />
          <div className="prose-cols reveal">
            {c.decideCopy.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
          <div className="verdict-strip reveal">
            {c.verdicts.map(([title, when, kind]) => (
              <div className={`verdict-row verdict-${kind}`} key={title}>
                <span className="verdict-pill">{title}</span>
                <span>{when}</span>
              </div>
            ))}
          </div>
          <p className="rule-line reveal">{c.ruleLine}</p>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <Heading kicker={c.codeKicker} title={c.codeTitle} copy={c.codeCopy} />
          <div className="code-pair reveal">
            <figure className="code-panel">
              <figcaption>
                <span>{c.policyLabel}</span>
                <code>datos-clientes.yaml</code>
              </figcaption>
              <pre>{POLICY_EXPORT}</pre>
            </figure>
            <figure className="code-panel">
              <figcaption>
                <span>{c.receiptLabel}</span>
                <code>receipt.json</code>
              </figcaption>
              <pre>{RECEIPT_EXPORT}</pre>
            </figure>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <Heading kicker={c.modulesKicker} title={c.modulesTitle} />
          <div className="text-cols reveal">
            {c.modulesText.map(([title, text]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <PageClosing title={c.closingTitle} />
    </div>
  );
}

export function PassportPage() {
  const { lang } = useLang();
  const c = pagesContent[lang].passport;
  return (
    <div className="page">
      <SplitHero eyebrow={c.eyebrow} title={c.title} lead={c.lead}>
        <figure className="passport-hero">
          <div className="verify-card">
            <div className="passport-head">
              <span>{c.result.title}</span>
              <span className="passport-state">{c.result.state}</span>
            </div>
            <dl className="verify-rows">
              {c.result.rows.map(([k, v]) => (
                <div key={k}>
                  <dt>{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
            </dl>
            <ul className="verify-conditions">
              {c.result.conditions.map(([cond, source]) => (
                <li key={cond}>
                  <span>{cond}</span>
                  <em>{source}</em>
                </li>
              ))}
            </ul>
            <code>{c.result.exposed}</code>
          </div>
          <figcaption className="proof-flow">
            <span className="proof-steps">
              {c.flow.map((f, i) => (
                <span key={f}>
                  {i > 0 && <i aria-hidden="true">→</i>}
                  {f}
                </span>
              ))}
            </span>
            <strong>{c.flowNote}</strong>
          </figcaption>
        </figure>
      </SplitHero>
      <section className="section">
        <div className="shell">
          <Heading kicker={c.layersKicker} title={c.layersTitle} />
          <ol className="layer-list reveal">
            {c.layers.map(([n, title, text, source, state]) => (
              <li key={n} className={`layer-${state}`}>
                <span className="layer-num">{n}</span>
                <div>
                  <strong>
                    {title}
                    {state === "next" && <em className="layer-badge">{c.layersNext}</em>}
                  </strong>
                  <p>{text}</p>
                </div>
                <span className="layer-source">{source}</span>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <Heading kicker={c.caseKicker} title={c.caseTitle} />
          <div className="prose-cols reveal">
            {c.caseCopy.map((para) => (
              <p key={para}>{para}</p>
            ))}
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell faq-grid">
          <Heading kicker={c.faqKicker} title={c.faqTitle} />
          <div className="faq reveal">
            {c.faq.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>
      <PageClosing title={c.closingTitle} />
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
            <div>
              <span className="kicker">{c.architectureKicker}</span>
              <h2>{c.architectureTitle}</h2>
            </div>
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
      <CtaBand />
    </div>
  );
}

export function ApplicationsPage() {
  const { lang } = useLang();
  const c = pagesContent[lang].solutions;
  return (
    <div className="page">
      <Subhero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <nav className="solution-tabs shell" aria-label={c.eyebrow}>
        {c.items.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.tag}
          </a>
        ))}
      </nav>
      <section className="section">
        <div className="shell">
          <Heading kicker={c.matrixKicker} title={c.matrixTitle} />
          <div className="matrix-wrap reveal">
            <table className="matrix">
              <thead>
                <tr>
                  {c.matrixHead.map((h) => (
                    <th key={h} scope="col">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {c.matrix.map(([sector, norm, signer, audience]) => (
                  <tr key={sector}>
                    <th scope="row">{sector}</th>
                    <td data-label={c.matrixHead[1]}>{norm}</td>
                    <td data-label={c.matrixHead[2]}>{signer}</td>
                    <td data-label={c.matrixHead[3]}>{audience}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {c.items.map((item) => (
        <section className="section sector-section" id={item.id} key={item.id}>
          <div className="shell prose-split reveal">
            <div>
              <span className="kicker">
                {item.tag} · <span className="kicker-norm">{item.norm}</span>
              </span>
              <h2>{item.title}</h2>
            </div>
            <div className="prose">
              {item.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
            </div>
          </div>
        </section>
      ))}
      <PageClosing title={c.closingTitle} />
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
      <CtaBand />
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
                {self ? lanes[from] : `${lanes[from]} → ${lanes[to]}`}
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
            <div>
              <span className="kicker">{c.scopeKicker}</span>
              <h2>{c.scopeTitle}</h2>
            </div>
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
      <CtaBand />
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
            <div>
              <span className="kicker">{c.glossaryKicker}</span>
              <h2>{c.glossaryTitle}</h2>
            </div>
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
            <div>
              <span className="kicker">{c.faqKicker}</span>
              <h2>{c.faqTitle}</h2>
            </div>
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
      <CtaBand />
    </div>
  );
}
