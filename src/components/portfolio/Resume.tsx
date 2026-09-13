'use client';

import { motion } from "framer-motion";
import { FileText, Download, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function Resume() {
  return (
    <section id="resume" className="section-anchor relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-5xl px-5">
        <SectionHeading
          eyebrow="Resume"
          title={
            <>
              Technical <span className="gradient-text">Background & Resume</span>
            </>
          }
          description="Download my latest resume for a detailed overview of my skills, experience, projects, education, and achievements."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="glass-strong glow-border relative overflow-hidden rounded-3xl p-8 sm:p-10 text-center flex flex-col items-center justify-center space-y-6"
        >
          {/* Background Ambient Blur */}
          <div className="pointer-events-none absolute -right-20 -top-20 h-60 w-60 rounded-full bg-violet-500/15 blur-3xl" />
          <div className="pointer-events-none absolute -bottom-20 -left-20 h-60 w-60 rounded-full bg-cyan-500/15 blur-3xl" />

          <div className="grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-blue-500/20 ring-1 ring-white/15 text-violet-300">
            <FileText className="h-8 w-8" />
          </div>

          <div className="max-w-xl space-y-2">
            <h3 className="text-2xl font-bold text-white">
              Interested in my background and technical experience?
            </h3>
            <p className="text-xs text-white/65 leading-relaxed">
              Download my latest resume for a detailed overview of my skills, experience, projects, education, and achievements.
            </p>
          </div>

          <div className="flex flex-col items-center gap-3 pt-2">
            <a
              href="/resume/ResumePrajwal(1).pdf"
              download="ResumePrajwal(1).pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-violet-600/30 transition-transform hover:scale-[1.02]"
            >
              <Download className="h-4 w-4" />
              DOWNLOAD RESUME &rarr;
            </a>
            <span className="text-[11px] font-mono text-white/40 flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5 text-emerald-400" /> PDF • Official Verified Resume
            </span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
