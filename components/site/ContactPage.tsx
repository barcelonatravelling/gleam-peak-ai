"use client";

import Link from "next/link";
import { useState, type FormEvent } from "react";
import { useLang } from "./LangContext";

type Status = "idle" | "sending" | "success" | "error";

export function ContactPage() {
  const { t, href } = useLang();
  const c = t.collaborate;
  const f = c.form;
  const [status, setStatus] = useState<Status>("idle");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setStatus("sending");
    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(data),
      });
      const result = await response.json();
      if (result.success) {
        setStatus("success");
        form.reset();
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="page">
      <section className="subhero">
        <div className="shell contact-grid">
          <div>
            <span className="eyebrow">{c.eyebrow}</span>
            <h1>{c.title}</h1>
            <p className="lead">{c.lead}</p>
            <div className="contact-options">
              {c.options.map((option) => (
                <div className="contact-option" key={option}>
                  {option}
                </div>
              ))}
            </div>
          </div>

          <form className="form-card" onSubmit={handleSubmit}>
            <input type="hidden" name="access_key" value="12e58551-aa3f-45d1-8cac-508dbd82cc17" />
            <input type="hidden" name="subject" value="New lead from Gleam Peak" />
            <input type="hidden" name="from_name" value="Gleam Peak Website" />
            <input type="checkbox" name="botcheck" style={{ display: "none" }} tabIndex={-1} autoComplete="off" />

            <div className="grid-2">
              <div className="field">
                <label htmlFor="name">{f.name}</label>
                <input id="name" name="name" autoComplete="name" required />
              </div>
              <div className="field">
                <label htmlFor="org">{f.org}</label>
                <input id="org" name="organisation" autoComplete="organization" required />
              </div>
            </div>
            <div className="field">
              <label htmlFor="email">{f.email}</label>
              <input id="email" type="email" name="email" autoComplete="email" required />
            </div>
            <div className="field">
              <label htmlFor="interest">{f.interest}</label>
              <select id="interest" name="interest" required defaultValue="">
                <option value="" disabled>
                  {f.choose}
                </option>
                {f.interests.map((option) => (
                  <option key={option}>{option}</option>
                ))}
              </select>
            </div>
            <div className="field">
              <label htmlFor="message">{f.message}</label>
              <textarea id="message" name="message" required />
            </div>
            <label className="consent">
              <input type="checkbox" name="privacy_consent" value="yes" required />
              <span>
                {f.consentBefore}
                <Link href={href("privacy")} className="text-link">
                  {f.consentLink}
                </Link>
                {f.consentAfter}
              </span>
            </label>
            <button className="button button-primary button-arrow" type="submit" disabled={status === "sending"}>
              {status === "sending" ? f.sending : f.send}
            </button>
            <p className="form-note">
              {f.direct} <a className="text-link" href="mailto:hello@gleampeak.ai">hello@gleampeak.ai</a>
            </p>
            <p className={`notice${status === "success" ? " show" : ""}`} role="status">
              {status === "success" ? f.success : ""}
            </p>
            <p className={`notice notice-error${status === "error" ? " show" : ""}`} role="alert">
              {status === "error" ? f.error : ""}
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
