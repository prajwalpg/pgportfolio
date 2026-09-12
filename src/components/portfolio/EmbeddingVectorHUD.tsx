'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Cpu, Sparkles } from "lucide-react";

export default function EmbeddingVectorHUD() {
  const [bars, setBars] = useState([60, 85, 40, 95, 70, 50, 90, 65, 80, 45, 100, 75]);

  useEffect(() => {
    const timer = setInterval(() => {
      setBars((prev) =>
        prev.map(() => Math.floor(Math.random() * 60) + 40)
      );
    }, 400);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-strong glow-border relative overflow-hidden rounded-2xl p-4 font-mono text-xs text-white shadow-xl backdrop-blur">
      <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-cyan-300 font-bold">
        <span className="flex items-center gap-1.5">
          <Cpu className="h-3.5 w-3.5" /> EMBEDDING VECTOR
        </span>
        <span className="rounded bg-cyan-500/20 px-1.5 py-0.5 text-[9px] text-cyan-200">
          768d DENSE
        </span>
      </div>

      {/* Animated Frequency Bars */}
      <div className="my-3 flex items-end justify-between gap-1 h-12 px-1">
        {bars.map((h, i) => (
          <motion.div
            key={i}
            className="w-2 rounded-t bg-gradient-to-t from-violet-500 via-cyan-400 to-emerald-400"
            animate={{ height: `${h}%` }}
            transition={{ duration: 0.3 }}
          />
        ))}
      </div>

      {/* Vector Coordinates string */}
      <div className="rounded-lg border border-white/10 bg-black/60 p-2 text-center text-[10px] text-cyan-300">
        [ 0.82, -0.14, 0.67, 0.31, 0.94, -0.45 ... ]
      </div>
    </div>
  );
}
