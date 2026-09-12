'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";

export default function HeroDataPipeline() {
  const [activeStage, setActiveStage] = useState(0);

  const stages = [
    { name: "INPUT", sub: "User Prompt / Image Matrix" },
    { name: "PROCESSING", sub: "Feature Extraction & Grid Scan" },
    { name: "EMBEDDING", sub: "768d Vector Space Projection" },
    { name: "INTELLIGENCE", sub: "Multi-Agent & Model Output" },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveStage((prev) => (prev + 1) % stages.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [stages.length]);

  return (
    <div className="glass-strong glow-border relative w-full max-w-4xl overflow-hidden rounded-2xl p-4 font-mono text-xs text-white">
      <div className="flex flex-wrap items-center justify-between gap-4">
        {stages.map((st, idx) => {
          const isActive = activeStage === idx;
          return (
            <div key={st.name} className="flex items-center gap-3 flex-1 min-w-[140px]">
              <div
                className={`flex flex-col rounded-xl border p-2.5 w-full transition-all ${
                  isActive
                    ? "border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/20 text-cyan-200"
                    : "border-white/10 bg-black/40 text-white/50"
                }`}
              >
                <div className="flex items-center justify-between font-bold text-[11px]">
                  <span>{st.name}</span>
                  {isActive && <Sparkles className="h-3 w-3 text-cyan-300 animate-spin" />}
                </div>
                <span className="mt-1 text-[9px] text-white/60 truncate">{st.sub}</span>
              </div>

              {idx < stages.length - 1 && (
                <ArrowRight className="h-4 w-4 text-white/30 flex-shrink-0 hidden sm:block" />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
