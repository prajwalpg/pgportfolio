'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Sparkles, Terminal } from "lucide-react";

export default function SystemInitializer() {
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("Initializing neural weights...");

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      setLoading(false);
      return;
    }

    const statuses = [
      "Initializing neural weights...",
      "Loading vector embeddings...",
      "Connecting computer vision models...",
      "Warming multi-agent orchestrator...",
      "AI System Ready.",
    ];

    let currentStep = 0;
    const interval = setInterval(() => {
      currentStep += 1;
      const pct = Math.min(100, Math.round((currentStep / 5) * 100));
      setProgress(pct);
      if (statuses[currentStep - 1]) {
        setStatusText(statuses[currentStep - 1]);
      }
      if (currentStep >= 5) {
        clearInterval(interval);
        setTimeout(() => setLoading(false), 300);
      }
    }, 200);

    return () => clearInterval(interval);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4, ease: "easeInOut" }}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#08080f] px-5 text-white"
        >
          <div className="glass-strong glow-border flex w-full max-w-md flex-col items-center rounded-3xl p-8 text-center shadow-2xl">
            <div className="relative mb-6 grid h-16 w-16 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-blue-500/30 ring-1 ring-white/15">
              <Cpu className="h-8 w-8 text-violet-300 animate-pulse" />
              <Sparkles className="absolute -top-1 -right-1 h-4 w-4 text-cyan-300 animate-spin" />
            </div>

            <div className="flex items-center gap-2 text-xs font-mono tracking-widest text-violet-300 uppercase">
              <Terminal className="h-3.5 w-3.5" />
              Prajwal PG AI Engine
            </div>

            <h2 className="mt-2 text-xl font-bold tracking-tight text-white">
              INITIALIZING AI SYSTEM
            </h2>

            {/* Progress Bar */}
            <div className="mt-6 w-full space-y-2">
              <div className="relative h-2 w-full overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full bg-gradient-to-r from-violet-500 via-cyan-400 to-emerald-400"
                  style={{ width: `${progress}%` }}
                  transition={{ ease: "easeOut", duration: 0.15 }}
                />
              </div>
              <div className="flex items-center justify-between font-mono text-[11px] text-white/50">
                <span>{statusText}</span>
                <span className="font-bold text-violet-300">{progress}%</span>
              </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-1.5 text-[10px] font-mono text-white/40">
              <span className="rounded bg-white/5 px-2 py-0.5">Neural Net</span>
              <span className="rounded bg-white/5 px-2 py-0.5">Vector Space</span>
              <span className="rounded bg-white/5 px-2 py-0.5">Vision Model</span>
              <span className="rounded bg-white/5 px-2 py-0.5">Multi-Agent</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
