'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cpu, Activity, CheckCircle2, ChevronUp, ChevronDown } from "lucide-react";
import { useInferenceMode } from "./InferenceModeContext";

export default function AISystemStatusPill() {
  const { inferenceMode } = useInferenceMode();
  const [expanded, setExpanded] = useState(false);

  const statuses = [
    { name: "NEURAL NETWORK", state: inferenceMode ? "ACTIVE (HIGH)" : "STANDBY" },
    { name: "EMBEDDING SPACE", state: "768d VECTOR" },
    { name: "VISION ENGINE", state: "OPENCV / SSD" },
    { name: "RAG PIPELINE", state: "GEMINI / PG" },
    { name: "MULTI-AGENT", state: "5 AGENTS" },
  ];

  return (
    <div className="fixed bottom-4 left-4 z-40">
      <AnimatePresence>
        {expanded && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="glass-strong glow-border mb-2.5 w-64 rounded-2xl p-4 text-xs font-mono text-white shadow-2xl"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-cyan-300 font-bold">
              <span className="flex items-center gap-1.5">
                <Cpu className="h-3.5 w-3.5" /> AI SYSTEM METRICS
              </span>
              <span className="rounded bg-emerald-500/20 px-1.5 py-0.5 text-[9px] text-emerald-300">
                ONLINE
              </span>
            </div>

            <div className="mt-3 space-y-2">
              {statuses.map((s) => (
                <div key={s.name} className="flex items-center justify-between text-[11px]">
                  <span className="text-white/60">{s.name}:</span>
                  <span className="font-bold text-emerald-300">{s.state}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Pill Button */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="glass-strong glow-border flex items-center gap-2.5 rounded-full px-3.5 py-2 text-xs font-mono text-white backdrop-blur transition-transform hover:scale-105"
      >
        <span className="relative flex h-2 w-2">
          <span className={`absolute inline-flex h-full w-full animate-ping rounded-full ${inferenceMode ? "bg-cyan-400" : "bg-emerald-400"} opacity-70`} />
          <span className={`relative inline-flex h-2 w-2 rounded-full ${inferenceMode ? "bg-cyan-400" : "bg-emerald-400"}`} />
        </span>

        <span className="font-semibold text-white/90">
          AI SYSTEM {inferenceMode ? "[INFERENCE ON]" : "[STANDBY]"}
        </span>

        {expanded ? (
          <ChevronDown className="h-3.5 w-3.5 text-white/50" />
        ) : (
          <ChevronUp className="h-3.5 w-3.5 text-white/50" />
        )}
      </button>
    </div>
  );
}
