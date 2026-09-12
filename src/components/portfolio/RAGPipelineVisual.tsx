'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Database, MessageSquare, ArrowRight, Layers, CheckCircle } from "lucide-react";

export default function RAGPipelineVisual() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      title: "1. User Query",
      icon: MessageSquare,
      desc: '"Generate a grade 8 science worksheet on photosynthesis in Kannada"',
      badge: "Input Stream",
    },
    {
      title: "2. Embedding Vector",
      icon: Sparkles,
      desc: "Query mapped into 768-dimensional dense vector space using Gemini embeddings",
      badge: "Dense Vector",
    },
    {
      title: "3. Vector Search & RAG",
      icon: Database,
      desc: "Top-k semantic retrieval over PostgreSQL + Prisma classroom curriculum chunks",
      badge: "Retrieval",
    },
    {
      title: "4. Context & LLM Answer",
      icon: Layers,
      desc: "Gemini API synthesizes grounded answer with classroom memory citations",
      badge: "Grounded Output",
    },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStep((prev) => (prev + 1) % steps.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [steps.length]);

  return (
    <div className="glass-strong glow-border relative overflow-hidden rounded-3xl p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 ring-1 ring-white/15">
            <Sparkles className="h-5 w-5 text-violet-300" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">SAHAYAK — RAG Retrieval Architecture</h4>
            <p className="text-xs text-white/55">
              Gemini API · PostgreSQL · Prisma ORM · Context-Aware Pipelines
            </p>
          </div>
        </div>

        <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-mono font-semibold text-violet-300">
          Retrieval Augmented Generation
        </span>
      </div>

      {/* Step Flow Bar */}
      <div className="mt-6 grid gap-3 sm:grid-cols-4">
        {steps.map((st, idx) => {
          const isActive = activeStep === idx;
          const Icon = st.icon;
          return (
            <div
              key={st.title}
              onClick={() => setActiveStep(idx)}
              className={`cursor-pointer rounded-2xl border p-4 transition-all ${
                isActive
                  ? "border-violet-400 bg-violet-500/20 shadow-lg shadow-violet-500/20"
                  : "border-white/8 bg-black/40 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-mono text-white/50">
                <span>{st.badge}</span>
                {isActive && <span className="h-2 w-2 rounded-full bg-cyan-400 animate-ping" />}
              </div>

              <div className="mt-2 flex items-center gap-2 font-bold text-white text-sm">
                <Icon className={`h-4 w-4 ${isActive ? "text-violet-300" : "text-white/40"}`} />
                <span>{st.title}</span>
              </div>

              <p className="mt-2 text-xs leading-relaxed text-white/70">
                {st.desc}
              </p>
            </div>
          );
        })}
      </div>

      {/* RAG Context Visualization Bar */}
      <div className="mt-5 rounded-2xl border border-white/10 bg-black/70 p-4 font-mono text-xs text-white/80">
        <div className="flex items-center justify-between text-[11px] text-violet-300 border-b border-white/10 pb-2">
          <span className="font-bold flex items-center gap-1">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-400" /> Pipeline Stage Execution
          </span>
          <span>Stage {activeStep + 1} of 4</span>
        </div>

        <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span className="text-white/40">QUERY:</span>
            <span className="text-cyan-300">&quot;Grade 8 Science Photosynthesis&quot;</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white/40">RETRIEVED CHUNKS:</span>
            <span className="rounded bg-emerald-500/20 px-2 py-0.5 text-emerald-300">3 Documents (Cosine Sim: 0.92)</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-white/40">LLM MODEL:</span>
            <span className="text-violet-300">Gemini Pro API</span>
          </div>
        </div>
      </div>
    </div>
  );
}
