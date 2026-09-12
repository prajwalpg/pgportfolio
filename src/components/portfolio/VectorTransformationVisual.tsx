'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, ArrowRight, Layers, FileCode } from "lucide-react";

export default function VectorTransformationVisual() {
  const [stage, setStage] = useState<0 | 1 | 2 | 3>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setStage((prev) => ((prev + 1) % 4) as 0 | 1 | 2 | 3);
    }, 2500);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-strong glow-border relative my-8 overflow-hidden rounded-3xl p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/20 ring-1 ring-white/15">
            <Sparkles className="h-5 w-5 text-cyan-300" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Vector Embedding Transformation Pipeline</h4>
            <p className="text-xs text-white/55">
              Demonstrating Text → Tokenization → Dense Vector Representation
            </p>
          </div>
        </div>

        {/* Stage Buttons */}
        <div className="flex flex-wrap gap-1 font-mono text-[11px]">
          {["1. Text", "2. Tokens", "3. Dense Vector", "4. Vector Plot"].map((lbl, idx) => (
            <button
              key={lbl}
              onClick={() => setStage(idx as any)}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                stage === idx
                  ? "bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {lbl}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Transformation Stage Box */}
      <div className="relative mt-6 flex h-[200px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-6 text-center">
        {stage === 0 && (
          <motion.div
            key="text"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            <span className="rounded bg-violet-500/20 px-3 py-1 font-mono text-xs font-bold text-violet-300">
              STAGE 1: INPUT STRING
            </span>
            <h3 className="text-2xl font-bold text-white sm:text-3xl">
              &quot;Retrieval Augmented Generation&quot;
            </h3>
            <p className="text-xs text-white/50">Unstructured human text prompt</p>
          </motion.div>
        )}

        {stage === 1 && (
          <motion.div
            key="tokens"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <span className="rounded bg-cyan-500/20 px-3 py-1 font-mono text-xs font-bold text-cyan-300">
              STAGE 2: TOKENIZATION &amp; SUBWORDS
            </span>
            <div className="flex flex-wrap items-center justify-center gap-2 font-mono text-sm sm:text-base">
              <span className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-cyan-200">
                [Retrieval] (ID: 4892)
              </span>
              <span className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-cyan-200">
                [Augmented] (ID: 1042)
              </span>
              <span className="rounded-xl border border-cyan-400/40 bg-cyan-500/10 px-3 py-1.5 text-cyan-200">
                [Generation] (ID: 8812)
              </span>
            </div>
          </motion.div>
        )}

        {stage === 2 && (
          <motion.div
            key="vector"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-3"
          >
            <span className="rounded bg-emerald-500/20 px-3 py-1 font-mono text-xs font-bold text-emerald-300">
              STAGE 3: DENSE EMBEDDING VECTOR (768-DIMENSIONAL)
            </span>
            <div className="rounded-xl border border-emerald-500/30 bg-black/80 p-3 font-mono text-xs text-emerald-300">
              [+0.8241, -0.1429, +0.6710, +0.3184, -0.9052, +0.4431, +0.1089, -0.5521...]
            </div>
          </motion.div>
        )}

        {stage === 3 && (
          <motion.div
            key="plot"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-2"
          >
            <span className="rounded bg-amber-500/20 px-3 py-1 font-mono text-xs font-bold text-amber-300">
              STAGE 4: VECTOR SPACE COORDINATE
            </span>
            <div className="font-mono text-xl font-bold text-white">
              Vector Coordinate: (X: 25.0%, Y: 30.0%)
            </div>
            <p className="text-xs text-emerald-300">
              Mapped into semantic similarity cluster next to LLMs &amp; AI Agents
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}
