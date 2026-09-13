'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Mail,
  Linkedin,
  Github,
  Send,
  CheckCircle2,
  Loader2,
  MapPin,
  Phone,
  Cpu,
  User,
  Shield,
  FileText,
  AlertCircle,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { profile } from "@/lib/portfolio-data";
import { submitContactMessage } from "@/lib/actions/contact";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
    consent: false,
    honeypot: "",
  });

  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const update =
    (k: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((s) => ({ ...s, [k]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.consent) return;

    setStatus("sending");
    setErrorMessage(null);

    const res = await submitContactMessage({
      name: form.name,
      email: form.email,
      phone: form.phone,
      subject: form.subject,
      message: form.message,
      consent: form.consent,
      honeypot: form.honeypot,
    });

    if (res.success) {
      setStatus("sent");
      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
        consent: false,
        honeypot: "",
      });
      setTimeout(() => setStatus("idle"), 6000);
    } else {
      setStatus("error");
      setErrorMessage(res.error || "Failed to send message.");
    }
  };

  return (
    <section id="contact" className="section-anchor relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Contact & System Connection"
          title={
            <>
              Let&apos;s build something <span className="gradient-text">intelligent</span>.
            </>
          }
          description="Establish a direct connection for AI Engineering opportunities, research collaborations, or technical roles."
        />

        {/* AI System Connection Visual Node Bar */}
        <div className="glass-strong glow-border mb-8 overflow-hidden rounded-3xl p-6 sm:p-7">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 text-white shadow-lg shadow-violet-500/30">
                <Cpu className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Prajwal PG — AI Node</h4>
                <p className="text-xs font-mono text-cyan-300">STATUS: READY FOR CONNECTION</p>
              </div>
            </div>

            {/* Connection Link Graphic */}
            <div className="hidden items-center gap-2 font-mono text-xs text-white/50 sm:flex">
              <span>[SYSTEM NODE A]</span>
              <div className="relative w-24 h-0.5 bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400">
                <div className="absolute inset-y-0 h-full w-4 bg-white animate-pulse" />
              </div>
              <span>[YOUR NEXT AI TEAM]</span>
            </div>

            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
                <User className="h-6 w-6" />
              </div>
              <div>
                <h4 className="text-base font-bold text-white">Recruiter / Partner</h4>
                <p className="text-xs font-mono text-emerald-300">ACTIVE INBOUND LINK</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-5 lg:grid-cols-5">
          {/* Direct Channels Column */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="flex flex-col gap-3 lg:col-span-2"
          >
            <a
              href={`mailto:${profile.email}`}
              className="glass glow-border group flex items-center gap-3 rounded-2xl p-4 transition-colors hover:bg-white/8"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-blue-500/20 ring-1 ring-white/10">
                <Mail className="h-5 w-5 text-violet-200" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-white/45">Email</div>
                <div className="truncate text-sm font-medium text-white">{profile.email}</div>
              </div>
            </a>

            <a
              href={`tel:${profile.phone.replace(/[^0-9+]/g, "")}`}
              className="glass glow-border group flex items-center gap-3 rounded-2xl p-4 transition-colors hover:bg-white/8"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20 ring-1 ring-white/10">
                <Phone className="h-5 w-5 text-emerald-200" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-white/45">Phone</div>
                <div className="truncate text-sm font-medium text-white">{profile.phone}</div>
              </div>
            </a>

            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="glass glow-border group flex items-center gap-3 rounded-2xl p-4 transition-colors hover:bg-white/8"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/20 ring-1 ring-white/10">
                <Linkedin className="h-5 w-5 text-cyan-200" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-white/45">LinkedIn</div>
                <div className="truncate text-sm font-medium text-white">
                  /in/prajwal-pg-6ba947253
                </div>
              </div>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="glass glow-border group flex items-center gap-3 rounded-2xl p-4 transition-colors hover:bg-white/8"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-purple-500/30 to-violet-500/20 ring-1 ring-white/10">
                <Github className="h-5 w-5 text-purple-200" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-white/45">GitHub</div>
                <div className="truncate text-sm font-medium text-white">/prajwalpg</div>
              </div>
            </a>

            <a
              href="/resume/ResumePrajwal(1).pdf"
              download="ResumePrajwal(1).pdf"
              target="_blank"
              rel="noreferrer"
              className="glass glow-border group flex items-center gap-3 rounded-2xl p-4 transition-colors hover:bg-white/8"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-fuchsia-500/30 to-pink-500/20 ring-1 ring-white/10">
                <FileText className="h-5 w-5 text-fuchsia-200" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-white/45">Resume</div>
                <div className="truncate text-sm font-semibold text-fuchsia-300">
                  DOWNLOAD RESUME (PDF)
                </div>
              </div>
            </a>

            <div className="glass mt-1 flex items-center gap-3 rounded-2xl p-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 ring-1 ring-white/10">
                <MapPin className="h-5 w-5 text-amber-200" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-white/45">Location</div>
                <div className="text-sm font-medium text-white">{profile.location}</div>
              </div>
            </div>
          </motion.div>

          {/* Form Column */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-strong glow-border relative flex flex-col gap-4 overflow-hidden rounded-3xl p-6 sm:p-7 lg:col-span-3"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl" />

            {/* Honeypot field */}
            <input
              type="text"
              name="company_url_hp"
              value={form.honeypot}
              onChange={(e) => setForm((s) => ({ ...s, honeypot: e.target.value }))}
              className="hidden"
              tabIndex={-1}
              autoComplete="off"
            />

            {status === "sent" && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-emerald-300 flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 shrink-0" />
                <span>Message sent successfully. I&apos;ll get back to you soon.</span>
              </div>
            )}

            {status === "error" && errorMessage && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs text-red-300 flex items-center gap-2">
                <AlertCircle className="h-5 w-5 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div className="relative grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs font-medium text-white/65">
                  Your name <span className="text-violet-400">*</span>
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Recruiter / Hiring Manager"
                  className="rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-violet-400/40 focus:bg-black/40"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs font-medium text-white/65">
                  Your email <span className="text-violet-400">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder="name@company.com"
                  className="rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-violet-400/40 focus:bg-black/40"
                />
              </div>
            </div>

            <div className="relative grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="phone" className="text-xs font-medium text-white/65">
                  Phone <span className="text-white/40">(Optional)</span>
                </label>
                <input
                  id="phone"
                  value={form.phone}
                  onChange={update("phone")}
                  placeholder="+91-XXXXX XXXXX"
                  className="rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-violet-400/40 focus:bg-black/40"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="subject" className="text-xs font-medium text-white/65">
                  Subject <span className="text-white/40">(Optional)</span>
                </label>
                <input
                  id="subject"
                  value={form.subject}
                  onChange={update("subject")}
                  placeholder="AI Engineer Opportunity / Project Inquiry"
                  className="rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-violet-400/40 focus:bg-black/40"
                />
              </div>
            </div>

            <div className="relative flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs font-medium text-white/65">
                Message <span className="text-violet-400">*</span>
              </label>
              <textarea
                id="message"
                required
                value={form.message}
                onChange={update("message")}
                rows={4}
                placeholder="Hi Prajwal, we would like to discuss an AI Engineer opportunity with you…"
                className="resize-none rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-violet-400/40 focus:bg-black/40"
              />
            </div>

            {/* Consent Checkbox */}
            <div className="relative space-y-2 rounded-xl bg-white/[0.02] p-3.5 border border-white/5 text-[11px] text-white/70">
              <label className="flex items-start gap-2.5 cursor-pointer">
                <input
                  type="checkbox"
                  required
                  checked={form.consent}
                  onChange={(e) => setForm((s) => ({ ...s, consent: e.target.checked }))}
                  className="mt-0.5 rounded border-white/20 bg-white/10 text-violet-600 focus:ring-violet-500"
                />
                <span className="text-white/80">
                  I agree to have my message stored so I can be contacted regarding this inquiry. <span className="text-violet-400">*</span>
                </span>
              </label>
              <div className="flex items-center gap-1 text-[10px] text-white/40 pt-1 border-t border-white/5">
                <Shield className="h-3 w-3 text-violet-400" />
                <span>
                  Your message is stored securely so I can respond to your inquiry. Visitor names are only collected when voluntarily submitted.
                </span>
              </div>
            </div>

            <div className="relative flex items-center justify-between gap-3 pt-1">
              <p className="text-[11px] text-white/40">
                Direct transmission into Prajwal PG&apos;s contact portal.
              </p>
              <button
                type="submit"
                disabled={status === "sending" || !form.consent}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-40"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Transmitting…
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    Transmit message
                  </>
                )}
              </button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
