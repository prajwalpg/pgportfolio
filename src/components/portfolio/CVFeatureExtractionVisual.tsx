'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Eye, Scan, Cpu, Layers, Sparkles } from "lucide-react";

export default function CVFeatureExtractionVisual() {
  const [step, setStep] = useState<"input" | "scan" | "features" | "vector">("scan");

  useEffect(() => {
    const timer = setInterval(() => {
      setStep((prev) => {
        if (prev === "input") return "scan";
        if (prev === "scan") return "features";
        if (prev === "features") return "vector";
        return "input";
      });
    }, 2800);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-strong glow-border relative overflow-hidden rounded-3xl p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/20 ring-1 ring-white/15">
            <Eye className="h-5 w-5 text-cyan-300" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Computer Vision Feature Extractor</h4>
            <p className="text-xs text-white/55">
              OpenCV · SSD Face Detection · MobileNetV2 Embeddings
            </p>
          </div>
        </div>

        {/* Step Indicator Buttons */}
        <div className="flex flex-wrap gap-1 font-mono text-[11px]">
          {(["input", "scan", "features", "vector"] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStep(st)}
              className={`rounded-lg px-2.5 py-1 transition-all ${
                step === st
                  ? "bg-cyan-500 text-black font-bold shadow-md shadow-cyan-500/20"
                  : "bg-white/5 text-white/60 hover:bg-white/10"
              }`}
            >
              {st.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Visual Canvas Area */}
      <div className="relative mt-5 flex h-[240px] items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-black/50 p-4">
        {/* Step 1: Input Frame */}
        <div className="relative h-44 w-64 rounded-xl border border-cyan-500/30 bg-gradient-to-br from-slate-900 to-indigo-950/80 p-4 flex flex-col justify-between overflow-hidden shadow-inner">
          {/* Facial Landmark & Feature Points */}
          <div className="relative h-full w-full flex items-center justify-center">
            <div className="relative h-28 w-28 rounded-full border-2 border-cyan-400/40 flex items-center justify-center">
              {/* Scan Beam */}
              {step === "scan" && (
                <motion.div
                  className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_12px_#22d3ee]"
                  animate={{ top: ["0%", "100%", "0%"] }}
                  transition={{ repeat: Infinity, duration: 1.6, ease: "linear" }}
                />
              )}

              {/* Feature Points Overlay */}
              {(step === "features" || step === "vector") && (
                <div className="absolute inset-0">
                  {[
                    { x: 30, y: 35 },
                    { x: 70, y: 35 },
                    { x: 50, y: 55 },
                    { x: 35, y: 75 },
                    { x: 65, y: 75 },
                  ].map((pt, i) => (
                    <motion.span
                      key={i}
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="absolute h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-cyan-300 ring-2 ring-cyan-500/50 shadow-[0_0_8px_#22d3ee]"
                      style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
                    />
                  ))}

                  {/* Connective Feature Net */}
                  <svg className="absolute inset-0 h-full w-full stroke-cyan-400/40" strokeWidth="1">
                    <line x1="30%" y1="35%" x2="70%" y2="35%" />
                    <line x1="30%" y1="35%" x2="50%" y2="55%" />
                    <line x1="70%" y1="35%" x2="50%" y2="55%" />
                    <line x1="50%" y1="55%" x2="35%" y2="75%" />
                    <line x1="50%" y1="55%" x2="65%" y2="75%" />
                  </svg>
                </div>
              )}
            </div>
          </div>

          {/* Status Label Overlay */}
          <div className="flex items-center justify-between text-[10px] font-mono text-cyan-300">
            <span>SSD_FACE_DETECT</span>
            <span className="animate-pulse">
              {step === "input" && "READY"}
              {step === "scan" && "SCANNING GRID..."}
              {step === "features" && "EXTRACTING KEYPOINTS"}
              {step === "vector" && "EMBEDDING VECTOR (128d)"}
            </span>
          </div>
        </div>

        {/* Vector Output Box */}
        {step === "vector" && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="ml-4 hidden w-48 rounded-xl border border-emerald-500/30 bg-black/80 p-3 font-mono text-[10px] text-emerald-300 sm:block"
          >
            <div className="flex items-center gap-1 text-emerald-400 font-bold border-b border-emerald-500/20 pb-1">
              <Sparkles className="h-3 w-3" /> MobileNetV2 Output
            </div>
            <div className="mt-2 space-y-1 text-white/80">
              <div>[0.482, -0.119, 0.893,</div>
              <div> 0.045, 0.762, -0.341,</div>
              <div> 0.912, 0.228, 0.504...]</div>
            </div>
            <div className="mt-2 text-[9px] text-emerald-400/80">Match Conf: 98.4%</div>
          </motion.div>
        )}
      </div>
    </div>
  );
}
