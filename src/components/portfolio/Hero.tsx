'use client';

import { motion } from "framer-motion";
import { Github, Linkedin, FileText, FolderCode, Mail, Sparkles } from "lucide-react";
import NeuralNetworkHeroCanvas from "./NeuralNetworkHeroCanvas";
import PrajwalPortraitScanner from "./PrajwalPortraitScanner";
import EmbeddingVectorHUD from "./EmbeddingVectorHUD";
import PixelsToIntelligencePanel from "./PixelsToIntelligencePanel";
import AIConceptOrbit from "./AIConceptOrbit";
import HeroDataPipeline from "./HeroDataPipeline";
import { profile } from "@/lib/portfolio-data";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="section-anchor relative flex min-h-screen flex-col items-center justify-between overflow-hidden pt-24 pb-8"
    >
      {/* Neural Background */}
      <div className="absolute inset-0 animated-gradient-bg" />
      <div className="absolute inset-0 grid-pattern opacity-40" />
      <NeuralNetworkHeroCanvas />

      {/* Decorative Orbs */}
      <div className="pointer-events-none absolute -left-32 top-32 h-72 w-72 rounded-full bg-violet-500/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-24 bottom-10 h-80 w-80 rounded-full bg-cyan-500/20 blur-3xl" />

      {/* Main Grid: Left Content, Center Portrait, Right Panel */}
      <div className="relative z-10 mx-auto w-full max-w-7xl px-5">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid gap-8 lg:grid-cols-12 lg:items-center"
        >
          {/* LEFT COLUMN: Headline & Buttons & Orbit */}
          <motion.div variants={item} className="flex flex-col gap-5 lg:col-span-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1.5 font-mono text-xs font-bold text-emerald-300 backdrop-blur w-fit">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              OPEN TO AI ENGINEERING OPPORTUNITIES
            </div>

            <div>
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                {profile.name}
              </h1>
              <p className="mt-1 text-xs font-mono font-semibold tracking-widest text-violet-400">
                AI ENGINEER · MYSORE, INDIA
              </p>
              <p className="mt-2 text-xl font-bold tracking-tight text-white/90 sm:text-2xl">
                Building practical AI applications that understand, retrieve, and automate.
              </p>
            </div>

            <p className="text-sm font-semibold tracking-wide text-cyan-300">
              Generative AI • RAG • Computer Vision • AI Agents
            </p>

            <p className="text-xs leading-relaxed text-white/70 sm:text-sm">
              I build AI-powered applications across Generative AI, RAG, Multi-Agent Systems, Computer Vision, and OCR.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <a
                href="#projects"
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-violet-600 to-blue-600 px-5 py-2.5 text-xs font-semibold text-white shadow-lg shadow-violet-600/30 transition-transform hover:scale-[1.02]"
              >
                <FolderCode className="relative h-4 w-4" />
                <span className="relative">VIEW PROJECTS</span>
              </a>

              <a
                href="/resume/ResumePrajwal(1).pdf"
                download="ResumePrajwal(1).pdf"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-violet-500/10 border border-violet-500/30 px-4 py-2.5 text-xs font-medium text-white transition-all hover:bg-violet-500/20"
              >
                <FileText className="h-4 w-4 text-violet-300" />
                DOWNLOAD RESUME
              </a>

              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-xs font-medium text-white ring-1 ring-white/10 transition-all hover:bg-white/10"
              >
                <Github className="h-4 w-4" />
                GITHUB
              </a>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-3 text-white/70 pt-1">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Linkedin className="h-4 w-4 text-blue-400" />
              </a>
              <a
                href={`mailto:${profile.email}`}
                aria-label="Email"
                className="grid h-8 w-8 place-items-center rounded-lg bg-white/5 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
              >
                <Mail className="h-4 w-4 text-cyan-300" />
              </a>
            </div>

            {/* Orbiting Concept Graphic */}
            <div className="mt-2 hidden sm:block">
              <AIConceptOrbit />
            </div>
          </motion.div>

          {/* CENTER COLUMN: Central Prajwal Portrait & Embedding Vector HUD */}
          <motion.div variants={item} className="flex flex-col items-center justify-center gap-4 lg:col-span-5">
            <PrajwalPortraitScanner />
            <div className="w-full max-w-[320px]">
              <EmbeddingVectorHUD />
            </div>
          </motion.div>

          {/* RIGHT COLUMN: Vertical Pixels to Intelligence Progression Panel */}
          <motion.div variants={item} className="hidden lg:flex lg:col-span-3 lg:justify-end">
            <PixelsToIntelligencePanel />
          </motion.div>
        </motion.div>

        {/* BOTTOM PIPELINE: Input -> Processing -> Embedding -> Intelligence */}
        <motion.div
          variants={item}
          initial="hidden"
          animate="show"
          className="mt-8 flex justify-center w-full"
        >
          <HeroDataPipeline />
        </motion.div>
      </div>
    </section>
  );
}
