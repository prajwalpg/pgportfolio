'use client';

import { motion } from "framer-motion";
import { FileText, Download, Eye, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { profile } from "@/lib/portfolio-data";

export default function Resume() {
  return (
    <section id="resume" className="section-anchor relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Resume"
          title={
            <>
              View & Download{" "}
              <span className="gradient-text">Current Resume</span>.
            </>
          }
          description="Access the complete, recruiter-ready PDF resume summarizing my AI engineering background."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="glass-strong glow-border relative overflow-hidden rounded-3xl p-7 sm:p-10"
        >
          {/* Decorative glow */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-blue-500/15 blur-3xl" />

          <div className="relative flex flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
            <div className="flex items-start gap-4">
              <div className="grid h-14 w-14 flex-shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-blue-500/20 ring-1 ring-white/10">
                <FileText className="h-6 w-6 text-violet-200" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">
                  Prajwal PG — AI Engineer Resume
                </h3>
                <p className="mt-1 max-w-md text-sm text-white/65">
                  Generative AI · RAG · Multi-Agent Systems · Computer Vision · OCR
                </p>
                <div className="mt-3 flex flex-wrap items-center gap-3 text-[11px] text-white/50">
                  <span className="rounded-md border border-white/10 bg-black/30 px-2 py-0.5 font-mono">
                    PDF Document
                  </span>
                  <span className="inline-flex items-center gap-1 text-emerald-300">
                    <CheckCircle2 className="h-3 w-3" />
                    Verified Resume
                  </span>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-wrap gap-2.5 sm:w-auto">
              <a
                href={profile.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-transform hover:scale-[1.02] sm:flex-none"
              >
                <Eye className="h-4 w-4" />
                View Resume
              </a>
              <a
                href={profile.resumeUrl}
                download="Prajwal_PG_Resume.pdf"
                className="inline-flex flex-1 items-center justify-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur transition-colors hover:bg-white/10 hover:text-white sm:flex-none"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
