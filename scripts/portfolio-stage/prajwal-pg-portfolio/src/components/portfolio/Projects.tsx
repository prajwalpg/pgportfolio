'use client';

import { motion } from "framer-motion";
import { Github, ExternalLink, ArrowUpRight, Check } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { projects, type Project } from "@/lib/portfolio-data";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const isWide = index === 0; // first project gets the spotlight row

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay: (index % 2) * 0.1 }}
      className={`glass-strong glow-border group relative overflow-hidden rounded-3xl ${
        isWide ? "lg:col-span-2" : ""
      }`}
    >
      {/* Gradient accent backdrop */}
      <div
        className={`pointer-events-none absolute inset-0 bg-gradient-to-br ${project.accent} opacity-50 transition-opacity duration-500 group-hover:opacity-80`}
      />
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_bottom,transparent,rgba(8,8,16,0.85))]" />

      <div className="relative p-6 sm:p-7">
        {/* Header */}
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="rounded-full border border-white/10 bg-black/30 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-violet-200/80 backdrop-blur">
              {String(index + 1).padStart(2, "0")} · Featured
            </span>
            {project.featured && (
              <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/20 bg-amber-400/10 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-amber-200/90">
                <ArrowUpRight className="h-3 w-3" />
                Pinned
              </span>
            )}
          </div>

          <div className="flex items-center gap-1.5">
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} on GitHub`}
                className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Github className="h-4 w-4" />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer"
                aria-label={`${project.title} live demo`}
                className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </div>
        </div>

        {/* Title + tagline */}
        <h3 className="mt-4 text-xl font-bold tracking-tight text-white sm:text-[1.4rem]">
          {project.title}
        </h3>
        <p className="mt-1.5 text-sm font-medium text-violet-200/80">
          {project.tagline}
        </p>

        {/* Description */}
        <p className="mt-3 text-sm leading-relaxed text-white/65">
          {project.description}
        </p>

        {/* Highlights */}
        <ul className="mt-5 grid gap-2 sm:grid-cols-2">
          {project.highlights.map((h) => (
            <li
              key={h}
              className="flex items-start gap-2 text-[13px] leading-relaxed text-white/70"
            >
              <span className="mt-1 grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-emerald-400/15 ring-1 ring-emerald-400/30">
                <Check className="h-2.5 w-2.5 text-emerald-300" />
              </span>
              <span>{h}</span>
            </li>
          ))}
        </ul>

        {/* Stack */}
        <div className="mt-6 flex flex-wrap gap-1.5 border-t border-white/5 pt-5">
          {project.stack.map((s) => (
            <span
              key={s}
              className="inline-flex items-center rounded-md border border-white/8 bg-black/30 px-2 py-0.5 text-[11px] font-medium text-white/55 backdrop-blur"
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.article>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="section-anchor relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Featured Projects"
          title={
            <>
              Real AI products I&apos;ve{" "}
              <span className="gradient-text">designed, built & shipped</span>.
            </>
          }
          description="Each project below is end-to-end — model, backend, and frontend. Click through for source code and live demos."
        />

        {/* First project: spotlight (full width) */}
        <div className="grid gap-5 lg:grid-cols-2">
          {projects.slice(0, 1).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}

          {/* Stacked side cards for project #2 (compact) */}
          <div className="flex flex-col gap-5">
            {projects.slice(1, 2).map((p, i) => (
              <ProjectCard key={p.slug} project={p} index={i + 1} />
            ))}
          </div>
        </div>

        {/* Remaining two projects: 2-col grid */}
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {projects.slice(2).map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i + 2} />
          ))}
        </div>

        {/* View all on GitHub */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 flex justify-center"
        >
          <a
            href="https://github.com/prajwalpg"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-medium text-white/80 backdrop-blur transition-colors hover:bg-white/10 hover:text-white"
          >
            <Github className="h-4 w-4" />
            See all repositories on GitHub
            <ArrowUpRight className="h-4 w-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
