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
        <p className="statement-quote">{quote}</p>
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
                {t.common.discover}
              </Link>
            </div>
          </div>
          <div className="hero-visual">
            <ProductVisual />
            <div
              className="passport-card"
              role="img"
              aria-label={`${c.passport.title}: ${c.passport.state}. ${c.passport.rows.join(", ")}. ${c.passport.proof}`}
            >
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
          <p className="statement-quote">{c.problemTitle}</p>
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
            <p className="section-copy">{c.solvesCopy}</p>
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
            <p className="section-copy">{c.sidesCopy}</p>
          </div>
          <div className="sides reveal">
            {c.sides.map(([name, where, text], i) => (
              <article className={`card side${i === 0 ? " side-control" : " side-passport"}`} key={name}>
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
        <div className="shell case-split reveal">
          <div>
            <span className="kicker">{c.caseKicker}</span>
            <h2>{c.caseTitle}</h2>
            <p className="section-copy">{c.caseCopy}</p>
            <ol className="timeline case-steps">
              {c.caseSteps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
          <figure className="case-view">
            <figcaption>
              <span>{c.caseCard.view}</span>
              <span className="example-tag">{c.caseCard.label}</span>
            </figcaption>
            <div className="card passport-card passport-card-static">
              <div className="passport-head">
                <span>{c.caseCard.title}</span>
                <span className="passport-state">{c.caseCard.state}</span>
              </div>
              <ul>
                {c.caseCard.conditions.map((row) => (
                  <li key={row}>{row}</li>
                ))}
              </ul>
              <p className="passport-hidden">{c.caseCard.hidden}</p>
              <code>{c.caseCard.proof}</code>
            </div>
          </figure>
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
              <div
                className={`card architecture-node${i === 1 ? " node-control" : i === 4 ? " node-passport" : ""}`}
                key={title}
              >
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
        <div className="shell">
          <Heading kicker={c.diffKicker} title={c.diffTitle} />
          <div className="text-cols reveal">
            {c.diff.map(([title, text]) => (
              <div key={title}>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
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
            <p className="section-copy">
              {c.roadmapNote} <strong>{c.roadmapNext}</strong>
            </p>
          </div>
          <ol className="stages reveal">
            {c.roadmap.map(([when, title, text], i) => (
              <li className={`stage${i === 0 ? " current" : ""}`} key={title}>
                <span className="stage-when">{when}</span>
                <h3>
                  {title}
                  {i === 0 && <span className="status">{c.roadmapNow}</span>}
                </h3>
                <p>{text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="closing">
        <div className="shell closing-inner reveal">
          <h2>{c.closingTitle}</h2>
          <p className="section-copy">{c.closingCopy}</p>
          <Link className="button button-primary button-arrow" href={href("talk")}>
            {c.closingCta}
          </Link>
        </div>
      </section>
    </div>
  );
}

function Heading({ kicker, title, copy, id }: { kicker: string; title: string; copy?: string; id?: string }) {
  return (
    <div className="section-heading reveal">
      <div>
        <span className="kicker">{kicker}</span>
        <h2 id={id}>{title}</h2>
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
  "issued_at": "2026-11-05T10:42:17Z",
  "key_id": "control-receipts-2026-11",
  "prev": "sha256:91b2…e04d",
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
  const p = pagesContent[lang];
  const c = p.control;
  return (
    <div className="page">
      <SplitHero eyebrow={c.eyebrow} title={c.title} lead={c.lead}>
        <ControlConsole />
      </SplitHero>
      <section className="section">
        <div className="shell">
          <Heading kicker={c.decideKicker} title={c.decideTitle} copy={c.decideIntro} />
          <ol className="questions reveal">
            {c.questions.map(([q, check]) => (
              <li key={q}>
                <strong>{q}</strong> <span>{check}</span>
              </li>
            ))}
          </ol>
          <div className="verdict-strip reveal">
            {c.verdicts.map(([title, when, result, kind]) => (
              <div className={`card verdict-row verdict-${kind}`} key={title}>
                <span className="verdict-pill">{title}</span>
                <strong className="verdict-when">{when}</strong>
                <span>{result}</span>
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
              {/* Focusable so keyboard users can scroll it when it overflows on small screens */}
              <pre tabIndex={0} aria-label={`${c.policyLabel}: datos-clientes.yaml`}>
                {POLICY_EXPORT}
              </pre>
            </figure>
            <figure className="code-panel">
              <figcaption>
                <span>{c.receiptLabel}</span>
                <code>receipt.json</code>
              </figcaption>
              <pre tabIndex={0} aria-label={`${c.receiptLabel}: receipt.json`}>
                {RECEIPT_EXPORT}
              </pre>
            </figure>
          </div>
        </div>
      </section>
      <section className="section">
        <div className="shell">
          <Heading kicker={c.modulesKicker} title={c.modulesTitle} />
          <div className="text-cols reveal">
            {c.modulesText.map(([title, text, status]) => (
              <div key={title}>
                <h3>
                  {title}
                  <span className="status">{p.status[status]}</span>
                </h3>
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
  const p = pagesContent[lang];
  const c = p.passport;
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
            <code>
              {c.result.exposed[0]}
              <br />
              {c.result.exposed[1]}
            </code>
          </div>
          <figcaption className="proof-flow">
            <span className="proof-steps">
              {c.flow.map((f, i) => (
                // The arrow stays on the same line as the step before it, so no line starts with an arrow
                <span key={f} className="proof-step">
                  {f}
                  {i < c.flow.length - 1 && <i aria-hidden="true">→</i>}
                </span>
              ))}
            </span>
            <strong>{c.flowNote}</strong>
            <span>{c.flowDetail}</span>
          </figcaption>
        </figure>
      </SplitHero>
      <section className="section">
        <div className="shell">
          <Heading kicker={c.layersKicker} title={c.layersTitle} />
          <ol className="layer-list reveal">
            {c.layers.map(([n, title, text, source, status]) => (
              <li key={n} className={`card layer-${status === "planned" ? "next" : "now"}`}>
                <span className="layer-num">{n}</span>
                <div>
                  <strong>
                    {title}
                    <span className="status">{p.status[status]}</span>
                  </strong>
                  <p>{text}</p>
                </div>
                <span className="layer-source">{source}</span>
              </li>
            ))}
          </ol>
          <p className="rule-line reveal">{c.falseData}</p>
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

export function ApplicationsPage() {
  const { lang } = useLang();
  const c = pagesContent[lang].solutions;
  return (
    <div className="page">
      <Subhero eyebrow={c.eyebrow} title={c.title} lead={c.lead} />
      <nav className="solution-tabs shell" aria-label={c.tabsLabel}>
        {c.items.map((item) => (
          <a key={item.id} href={`#${item.id}`}>
            {item.tag}
          </a>
        ))}
      </nav>
      <section className="section">
        <div className="shell">
          <Heading kicker={c.matrixKicker} title={c.matrixTitle} id="matrix-title" />
          <div className="matrix-wrap reveal">
            <table className="matrix" role="table" aria-labelledby="matrix-title">
              {/* Explicit roles keep the table semantics when it is restyled as blocks on small screens */}
              <thead role="rowgroup">
                <tr role="row">
                  {c.matrixHead.map((h) => (
                    <th key={h} scope="col" role="columnheader">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody role="rowgroup">
                {c.matrix.map(([sector, norm, signer, audience]) => (
                  <tr key={sector} role="row">
                    <th scope="row" role="rowheader">
                      {sector}
                    </th>
                    <td role="cell" data-label={c.matrixHead[1]}>
                      {norm}
                    </td>
                    <td role="cell" data-label={c.matrixHead[2]}>
                      {signer}
                    </td>
                    <td role="cell" data-label={c.matrixHead[3]}>
                      {audience}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
      {c.items.map((item, i) => (
        <section className="section sector-section" id={item.id} key={item.id}>
          {i === 1 && (
            <div className="shell">
              <Heading kicker={c.othersKicker} title={c.othersTitle} />
            </div>
          )}
          <div className="shell prose-split reveal">
            <div>
              <span className="kicker">
                {i === 0 && `${c.firstLabel} · `}
                {item.tag} · <span className="kicker-norm">{item.norm}</span>
              </span>
              <h2>{item.title}</h2>
            </div>
            <div className="prose">
              {item.body.map((para) => (
                <p key={para}>{para}</p>
              ))}
              <p>
                <strong>{c.checkLabel}:</strong> {item.check}
              </p>
              <p>
                <strong>{c.privateLabel}:</strong> {item.private}
              </p>
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
      <section className="section" aria-labelledby="principles-title">
        <div className="shell">
          {/* Heading for screen readers so the cards' h3 follow an h2 */}
          <h2 id="principles-title" className="visually-hidden">
            {c.cardsTitle}
          </h2>
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
        <div className="shell faq-grid">
          <Heading kicker={c.techKicker} title={c.techTitle} copy={c.techCopy} />
          <div className="faq reveal">
            {c.techFaq.map(([q, a]) => (
              <details key={q}>
                <summary>{q}</summary>
                <p>{a}</p>
              </details>
            ))}
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
            {c.regulationCopy.map((para) => (
              <p key={para}>{para}</p>
            ))}
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
