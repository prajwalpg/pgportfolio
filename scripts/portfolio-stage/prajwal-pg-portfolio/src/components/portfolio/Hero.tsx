'use client';

import { motion } from "framer-motion";
import { Github, Linkedin, FileText, ArrowDown, Sparkles } from "lucide-react";
import ParticleBackground from "./ParticleBackground";
import { profile } from "@/lib/portfolio-data";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.12, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
  },
};

const TECH_MARQUEE = [
  "Python",
  "TensorFlow",
  "PyTorch",
  "OpenCV",
  "RAG",
  "LLMs",
  "LangChain",
  "Next.js",
  "PostgreSQL",
  "Prisma",
  "REST APIs",
  "OCR",
  "Computer Vision",
  "Git/GitHub",
  "Docker",
  "Hugging Face",
];

export default function Hero() {
  return (
    <section
      id="hero"
      className="section-anchor relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Background layers */}
      <div className="absolute inset-0 animated-gradient-bg" />
      <div className="absolute inset-0 grid-pattern" />
      <ParticleBackground />

      {/* Decorative orbs */}
      <div className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-blue-500/15 blur-3xl" />

      <div className="relative mx-auto w-full max-w-6xl px-5">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="flex flex-col items-start gap-6"
        >
          <motion.div
            variants={item}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-white/70 backdrop-blur"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
            </span>
            Open to AI/ML Engineer roles
          </motion.div>

          <motion.h1
            variants={item}
            className="text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl"
          >
            Hi, I&apos;m <span className="gradient-text">{profile.name}</span>.
            <br />
            I build <span className="gradient-text-cyan">AI systems</span> that
            ship.
          </motion.h1>

          <motion.p
            variants={item}
            className="max-w-2xl text-lg leading-relaxed text-white/65"
          >
            {profile.role} · {profile.tagline}. {profile.intro}
          </motion.p>

          <motion.div
            variants={item}
            className="flex flex-wrap items-center gap-3 pt-2"
          >
            <a
              href={profile.github}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-3 text-sm font-medium text-white ring-1 ring-white/10 transition-all hover:bg-white/10 hover:ring-white/20"
            >
              <Github className="h-4 w-4" />
              GitHub
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 rounded-xl bg-white/5 px-5 py-3 text-sm font-medium text-white ring-1 ring-white/10 transition-all hover:bg-white/10 hover:ring-white/20"
            >
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </a>
            <a
              href="#resume"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-500 to-blue-500 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-500/30 transition-transform hover:scale-[1.02]"
            >
              <span className="absolute inset-0 shimmer" aria-hidden />
              <FileText className="relative h-4 w-4" />
              <span className="relative">View Resume</span>
            </a>
          </motion.div>

          {/* Stats strip */}
          <motion.div
            variants={item}
            className="mt-6 grid w-full max-w-2xl grid-cols-3 gap-3"
          >
            {[
              { value: "4+", label: "Featured AI projects" },
              { value: "1+", label: "Production internship" },
              { value: "6+", label: "Certifications" },
            ].map((s) => (
              <div
                key={s.label}
                className="glass rounded-2xl px-4 py-3 text-center"
              >
                <div className="text-2xl font-bold gradient-text sm:text-3xl">
                  {s.value}
                </div>
                <div className="mt-0.5 text-[11px] uppercase tracking-wider text-white/50 sm:text-xs">
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Tech marquee */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="relative mt-14 w-full overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#0a0a14] to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#0a0a14] to-transparent" />
          <div className="flex w-max animate-marquee gap-3">
            {[...TECH_MARQUEE, ...TECH_MARQUEE].map((t, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full border border-white/8 bg-white/4 px-3.5 py-1.5 text-xs font-medium text-white/60"
              >
                <Sparkles className="h-3 w-3 text-violet-400" />
                {t}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-white/40 transition-colors hover:text-white/80 lg:flex"
      >
        <span className="text-[10px] uppercase tracking-[0.2em]">Scroll</span>
        <ArrowDown className="h-4 w-4 animate-bounce" />
      </a>
    </section>
  );
}
