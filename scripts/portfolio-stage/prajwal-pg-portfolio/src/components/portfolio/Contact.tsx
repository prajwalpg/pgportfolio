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
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { profile } from "@/lib/portfolio-data";

type Status = "idle" | "sending" | "sent";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // Simulate async submission — wire up to a real endpoint or service (e.g. Formspree, Resend).
    await new Promise((r) => setTimeout(r, 1200));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
    setTimeout(() => setStatus("idle"), 3500);
  };

  const update = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((s) => ({ ...s, [k]: e.target.value }));

  return (
    <section id="contact" className="section-anchor relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Contact"
          title={
            <>
              Let&apos;s build something{" "}
              <span className="gradient-text">useful with AI</span>.
            </>
          }
          description="Recruiters, founders, or fellow builders — drop a message and I'll respond within 24–48 hours."
        />

        <div className="grid gap-5 lg:grid-cols-5">
          {/* Contact info column */}
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
                <div className="text-[11px] uppercase tracking-wider text-white/45">
                  Email
                </div>
                <div className="truncate text-sm font-medium text-white">
                  {profile.email}
                </div>
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
                <div className="text-[11px] uppercase tracking-wider text-white/45">
                  LinkedIn
                </div>
                <div className="truncate text-sm font-medium text-white">
                  /in/prajwalpg
                </div>
              </div>
            </a>

            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="glass glow-border group flex items-center gap-3 rounded-2xl p-4 transition-colors hover:bg-white/8"
            >
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20 ring-1 ring-white/10">
                <Github className="h-5 w-5 text-emerald-200" />
              </div>
              <div className="min-w-0">
                <div className="text-[11px] uppercase tracking-wider text-white/45">
                  GitHub
                </div>
                <div className="truncate text-sm font-medium text-white">
                  /prajwalpg
                </div>
              </div>
            </a>

            <div className="glass mt-1 flex items-center gap-3 rounded-2xl p-4">
              <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 ring-1 ring-white/10">
                <MapPin className="h-5 w-5 text-amber-200" />
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-wider text-white/45">
                  Location
                </div>
                <div className="text-sm font-medium text-white">
                  {profile.location}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Form column */}
          <motion.form
            onSubmit={onSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-strong glow-border relative flex flex-col gap-4 overflow-hidden rounded-3xl p-6 sm:p-7 lg:col-span-3"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet-500/15 blur-3xl" />

            <div className="relative grid gap-4 sm:grid-cols-2">
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="name"
                  className="text-xs font-medium text-white/65"
                >
                  Your name
                </label>
                <input
                  id="name"
                  required
                  value={form.name}
                  onChange={update("name")}
                  placeholder="Jane Recruiter"
                  className="rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-violet-400/40 focus:bg-black/40"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="email"
                  className="text-xs font-medium text-white/65"
                >
                  Your email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={form.email}
                  onChange={update("email")}
                  placeholder="jane@company.com"
                  className="rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-violet-400/40 focus:bg-black/40"
                />
              </div>
            </div>

            <div className="relative flex flex-col gap-1.5">
              <label
                htmlFor="message"
                className="text-xs font-medium text-white/65"
              >
                Message
              </label>
              <textarea
                id="message"
                required
                value={form.message}
                onChange={update("message")}
                rows={5}
                placeholder="Tell me about the role, the team, and the problem you're solving…"
                className="resize-none rounded-xl border border-white/10 bg-black/30 px-3.5 py-2.5 text-sm text-white placeholder:text-white/30 outline-none transition-colors focus:border-violet-400/40 focus:bg-black/40"
              />
            </div>

            <div className="relative flex items-center justify-between gap-3 pt-1">
              <p className="text-[11px] text-white/40">
                By sending, you agree to be contacted back at the email above.
              </p>
              <button
                type="submit"
                disabled={status !== "idle"}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-transform hover:scale-[1.02] disabled:cursor-not-allowed disabled:opacity-70"
              >
                {status === "idle" && (
                  <>
                    <Send className="h-4 w-4" />
                    Send message
                  </>
                )}
                {status === "sending" && (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Sending…
                  </>
                )}
                {status === "sent" && (
                  <>
                    <CheckCircle2 className="h-4 w-4" />
                    Message sent
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
