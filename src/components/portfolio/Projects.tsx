'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Github, Check, Sparkles, Building2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import RAGPipelineVisual from "./RAGPipelineVisual";
import MultiAgentGraphVisual from "./MultiAgentGraphVisual";
import SmartAttendanceVisual from "./SmartAttendanceVisual";
import DocumentOCRVisual from "./DocumentOCRVisual";
import AIProctoringVisual from "./AIProctoringVisual";
import { projects, type Project } from "@/lib/portfolio-data";

export default function Projects() {
  const [sahayakTab, setSahayakTab] = useState<"rag" | "multi-agent">("rag");

  const [featured] = projects; // SAHAYAK

  return (
    <section id="projects" className="section-anchor relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Projects & Interactive AI Systems"
          title={
            <>
              Applied AI Projects &amp; <span className="gradient-text">Live Visualizations</span>.
            </>
          }
          description="Interactive breakdown of AI applications built using Gemini APIs, RAG, Multi-Agent systems, OpenCV, and TensorFlow."
        />

        {/* PRIMARY SPOTLIGHT PROJECT: SAHAYAK */}
        <motion.article
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55 }}
          className="glass-strong glow-border group relative overflow-hidden rounded-3xl p-6 sm:p-8 mb-12"
        >
          {/* Accent Backdrop */}
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-violet-500/20 via-fuchsia-500/15 to-blue-500/20 opacity-50 transition-opacity duration-500 group-hover:opacity-80" />
          <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(8,8,16,0.95))]" />

          <div className="relative z-10">
            {/* Header Badges */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-violet-400/30 bg-violet-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-violet-200 backdrop-blur">
                  <Sparkles className="h-3.5 w-3.5 text-violet-300" />
                  Primary Featured Case Study
                </span>
              </div>

              {featured.github && (
                <a
                  href={featured.github}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`${featured.title} on GitHub`}
                  className="inline-flex items-center gap-1.5 rounded-xl border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/80 backdrop-blur transition-all hover:bg-white/10 hover:text-white"
                >
                  <Github className="h-4 w-4" />
                  <span>GitHub Repository</span>
                </a>
              )}
            </div>

            {/* Title & Tagline */}
            <h3 className="mt-4 text-2xl font-bold tracking-tight text-white sm:text-3xl">
              {featured.title}
            </h3>
            <p className="mt-2 text-base font-medium text-violet-200/90 sm:text-lg">
              {featured.tagline}
            </p>

            {/* Problem & Solution Grid */}
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <div className="rounded-2xl border border-white/8 bg-black/40 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-amber-300/90">
                  Problem Context
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-white/70 sm:text-sm">
                  {featured.problem}
                </p>
              </div>

              <div className="rounded-2xl border border-white/8 bg-black/40 p-4">
                <div className="text-xs font-bold uppercase tracking-wider text-emerald-300/90">
                  AI Solution &amp; Architecture
                </div>
                <p className="mt-1.5 text-xs leading-relaxed text-white/70 sm:text-sm">
                  {featured.solution}
                </p>
              </div>
            </div>

            {/* Key Features List */}
            <div className="mt-6">
              <div className="text-xs font-semibold uppercase tracking-wider text-white/50">
                Core Capabilities &amp; Features
              </div>
              <ul className="mt-3 grid gap-2.5 sm:grid-cols-2">
                {featured.highlights.map((h) => (
                  <li
                    key={h}
                    className="flex items-start gap-2.5 text-xs leading-relaxed text-white/80 sm:text-sm"
                  >
                    <span className="mt-0.5 grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-emerald-400/20 text-emerald-300">
                      <Check className="h-3 w-3" />
                    </span>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Interactive Visualizations Switcher */}
            <div className="mt-8">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-3">
                <span className="text-xs font-mono font-bold uppercase tracking-wider text-violet-300">
                  Interactive System Visualizations
                </span>

                <div className="flex gap-2">
                  <button
                    onClick={() => setSahayakTab("rag")}
                    className={`rounded-xl px-3 py-1.5 text-xs font-mono font-bold transition-all ${
                      sahayakTab === "rag"
                        ? "bg-violet-500 text-white shadow-lg shadow-violet-500/30"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    1. RAG Retrieval Pipeline
                  </button>
                  <button
                    onClick={() => setSahayakTab("multi-agent")}
                    className={`rounded-xl px-3 py-1.5 text-xs font-mono font-bold transition-all ${
                      sahayakTab === "multi-agent"
                        ? "bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/30"
                        : "bg-white/5 text-white/60 hover:bg-white/10"
                    }`}
                  >
                    2. Multi-Agent Architecture
                  </button>
                </div>
              </div>

              <div className="mt-4">
                {sahayakTab === "rag" ? <RAGPipelineVisual /> : <MultiAgentGraphVisual />}
              </div>
            </div>

            {/* Stack Tags */}
            <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/10 pt-5">
              {featured.stack.map((s) => (
                <span
                  key={s}
                  className="inline-flex items-center rounded-md border border-white/10 bg-black/40 px-2.5 py-1 text-xs font-medium text-white/75 backdrop-blur"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        </motion.article>

        {/* ADDITIONAL PROJECTS WITH LIVE VISUALIZATIONS */}
        <div className="space-y-12">
          {/* Project 2: Smart Attendance System */}
          <div className="space-y-4">
            <ProjectHeaderCard project={projects[1]} index={2} />
            <SmartAttendanceVisual />
          </div>

          {/* Project 3: AI-Assisted Assessment Monitoring (HirePro POC) */}
          <div className="space-y-4">
            <ProjectHeaderCard project={projects[2]} index={3} />
            <AIProctoringVisual />
          </div>

          {/* Project 4: Document Intelligence & OCR Pipeline (Runshaw Internship) */}
          <div className="space-y-4">
            <ProjectHeaderCard project={projects[3]} index={4} />
            <DocumentOCRVisual />
          </div>
        </div>

        {/* GitHub link button */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-14 flex justify-center"
        >
          <a
            href="https://github.com/prajwalpg"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-6 py-3.5 text-sm font-medium text-white/80 backdrop-blur transition-colors hover:bg-white/10 hover:text-white"
          >
            <Github className="h-4 w-4" />
            Explore all repositories on GitHub
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function ProjectHeaderCard({ project, index }: { project: Project; index: number }) {
  return (
    <div className="glass-strong glow-border relative overflow-hidden rounded-3xl p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-2">
        {project.isInternshipPoc ? (
          <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-500/20 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-cyan-200">
            <Building2 className="h-3.5 w-3.5" />
            Internship Project
          </span>
        ) : (
          <span className="rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-white/60">
            Project #{index}
          </span>
        )}

        {project.github && (
          <a
            href={project.github}
            target="_blank"
            rel="noreferrer"
            aria-label={`${project.title} on GitHub`}
            className="inline-flex items-center gap-1.5 rounded-xl bg-white/5 px-3 py-1 text-xs font-medium text-white/70 ring-1 ring-white/10 hover:bg-white/10 hover:text-white"
          >
            <Github className="h-3.5 w-3.5" /> GitHub
          </a>
        )}
      </div>

      <h3 className="mt-3 text-xl font-bold text-white sm:text-2xl">{project.title}</h3>
      <p className="mt-1 text-xs font-medium text-violet-200/90 sm:text-sm">{project.tagline}</p>
      <p className="mt-3 text-xs leading-relaxed text-white/70 sm:text-sm">{project.description}</p>

      <div className="mt-4 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
        {project.stack.map((s) => (
          <span
            key={s}
            className="inline-flex items-center rounded-md border border-white/8 bg-black/30 px-2 py-0.5 text-[11px] font-medium text-white/65"
          >
            {s}
          </span>
        ))}
      </div>
    </div>
  );
}
