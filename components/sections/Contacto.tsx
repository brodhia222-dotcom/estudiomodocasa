"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Container } from "@/components/primitives/Container";
import { Eyebrow } from "@/components/primitives/Eyebrow";
import { Section } from "@/components/primitives/Section";
import { Hairline } from "@/components/primitives/Hairline";
import { Reveal } from "@/components/primitives/Reveal";
import { easeEditorial, viewportOnce } from "@/lib/motion";
import { copy, whatsappLink } from "@/lib/copy";

type State = "idle" | "sending" | "success" | "error";

export function Contacto() {
  const [state, setState] = useState<State>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setState("sending");
    setErrors({});

    const form = e.currentTarget;
    const formData = new FormData(form);
    const payload = {
      name: String(formData.get("name") || ""),
      email: String(formData.get("email") || ""),
      message: String(formData.get("message") || ""),
      website: String(formData.get("website") || ""),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = (await res.json()) as { ok: boolean; errors?: Record<string, string> };
      if (!data.ok) {
        if (data.errors) setErrors(data.errors);
        setState("error");
        return;
      }
      setState("success");
      form.reset();
    } catch {
      setState("error");
    }
  }

  return (
    <Section id="contacto" bg="ink">
      <Container>
        <div className="grid grid-cols-12 gap-x-6 gap-y-16 items-start">
          {/* Left column: copy + WhatsApp */}
          <div className="col-span-12 lg:col-span-5 flex flex-col gap-12">
            <Eyebrow number="—" inverted>
              {copy.contacto.eyebrow}
            </Eyebrow>
            <Reveal as="h2" className="display-l text-[var(--color-paper)]">
              {copy.contacto.headline}
            </Reveal>
            <Reveal as="p" className="body-l text-[var(--color-paper)]/70 max-w-[440px]" delay={0.1}>
              {copy.contacto.sub}
            </Reveal>

            <div className="flex flex-col gap-6 pt-6">
              <Hairline inverted />
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group inline-flex items-center justify-between gap-4 text-[var(--color-paper)] hover:opacity-70 transition-opacity"
              >
                <span className="flex items-center gap-3">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0 0 12.04 2zm0 18.15h-.01c-1.52 0-3.01-.41-4.31-1.18l-.31-.18-3.2.84.85-3.12-.2-.32a8.18 8.18 0 0 1-1.26-4.37c0-4.54 3.7-8.24 8.24-8.24 2.2 0 4.27.86 5.83 2.42a8.183 8.183 0 0 1 2.42 5.83c0 4.54-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.12-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.42-.14-.01-.31-.01-.48-.01-.17 0-.43.06-.66.31-.23.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.74 2.66 4.22 3.73.59.25 1.05.4 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.11-.22-.16-.46-.27z" />
                  </svg>
                  <span className="text-[15px] tracking-[0.04em]">{copy.contacto.whatsapp.label}</span>
                </span>
                <span aria-hidden="true">↗</span>
              </a>
              <Hairline inverted />
            </div>
          </div>

          {/* Right column: form */}
          <div className="col-span-12 lg:col-span-7 lg:col-start-7">
            <AnimatePresence mode="wait">
              {state === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.7, ease: easeEditorial }}
                  className="border border-[var(--color-paper)]/40 p-10 lg:p-16 flex flex-col gap-6"
                >
                  <div className="w-10 h-10 border border-[var(--color-paper)] flex items-center justify-center">
                    <motion.svg
                      width="16"
                      height="12"
                      viewBox="0 0 16 12"
                      fill="none"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ duration: 0.8, ease: easeEditorial, delay: 0.2 }}
                    >
                      <motion.path
                        d="M1 6L6 10L15 1"
                        stroke="var(--color-paper)"
                        strokeWidth="1.5"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.8, ease: easeEditorial, delay: 0.2 }}
                      />
                    </motion.svg>
                  </div>
                  <p className="display-s text-[var(--color-paper)] max-w-[480px]">
                    {copy.contacto.form.success}
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={viewportOnce}
                  transition={{ duration: 0.7, ease: easeEditorial }}
                  className="flex flex-col"
                  noValidate
                >
                  {/* honeypot */}
                  <input
                    type="text"
                    name="website"
                    tabIndex={-1}
                    autoComplete="off"
                    aria-hidden="true"
                    className="absolute -left-[9999px] w-px h-px opacity-0 pointer-events-none"
                  />

                  <Field
                    name="name"
                    label={copy.contacto.form.name}
                    type="text"
                    autoComplete="name"
                    required
                    error={errors.name}
                  />
                  <Field
                    name="email"
                    label={copy.contacto.form.email}
                    type="email"
                    autoComplete="email"
                    required
                    error={errors.email}
                  />
                  <Field
                    name="message"
                    label={copy.contacto.form.message}
                    type="textarea"
                    required
                    error={errors.message}
                  />

                  <div className="flex flex-col gap-6 pt-12">
                    <button
                      type="submit"
                      disabled={state === "sending"}
                      className="self-start inline-flex items-center gap-3 px-7 py-4 text-[14px] tracking-[0.06em] uppercase font-medium bg-[var(--color-paper)] text-[var(--color-ink)] border border-[var(--color-paper)] hover:bg-transparent hover:text-[var(--color-paper)] transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {state === "sending" ? copy.contacto.form.sending : copy.contacto.form.submit}
                      <svg width="14" height="10" viewBox="0 0 14 10" fill="none" aria-hidden="true">
                        <path d="M1 5H13M13 5L9 1M13 5L9 9" stroke="currentColor" strokeWidth="1.2" />
                      </svg>
                    </button>
                    {state === "error" && (
                      <p className="text-[13px] text-[var(--color-paper)]/70">
                        {copy.contacto.form.error}
                      </p>
                    )}
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </Container>
    </Section>
  );
}

function Field({
  name,
  label,
  type,
  autoComplete,
  required,
  error,
}: {
  name: string;
  label: string;
  type: "text" | "email" | "textarea";
  autoComplete?: string;
  required?: boolean;
  error?: string;
}) {
  const baseInput =
    "w-full bg-transparent text-[var(--color-paper)] text-[18px] py-5 border-b border-[var(--color-paper)]/30 focus:outline-none focus:border-[var(--color-paper)] transition-colors placeholder:text-[var(--color-paper)]/35";
  return (
    <div className="flex flex-col gap-2 pt-10 first:pt-0">
      <label
        htmlFor={name}
        className="eyebrow text-[var(--color-paper)]/60"
      >
        {label}
        {required && <span aria-hidden="true"> *</span>}
      </label>
      {type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          required={required}
          rows={3}
          aria-describedby={error ? `${name}-error` : undefined}
          className={`${baseInput} resize-none`}
        />
      ) : (
        <input
          id={name}
          name={name}
          type={type}
          required={required}
          autoComplete={autoComplete}
          aria-describedby={error ? `${name}-error` : undefined}
          className={baseInput}
        />
      )}
      {error && (
        <p id={`${name}-error`} className="text-[12px] text-[var(--color-paper)]/70 pt-1">
          {error}
        </p>
      )}
    </div>
  );
}
