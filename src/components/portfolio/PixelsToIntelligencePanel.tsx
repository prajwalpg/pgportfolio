'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Layers, Sparkles, CheckCircle2 } from "lucide-react";

const STAGES = [
  { id: 1, title: "Original Portrait", desc: "RGB Input Tensor", filter: "brightness(1.0)" },
  { id: 2, title: "Feature Map", desc: "Convolutional Filters", filter: "contrast(180%) hue-rotate(180deg)" },
  { id: 3, title: "Face Landmarks", desc: "Facial Keypoint Alignment", filter: "grayscale(100%) brightness(120%)" },
  { id: 4, title: "Particle Mesh", desc: "Dense Landmark Cloud", filter: "invert(100%) opacity(70%)" },
  { id: 5, title: "Embedding Vector", desc: "Dense Vector Space (128d)", filter: "sepia(100%) hue-rotate(190deg)" },
];

export default function PixelsToIntelligencePanel() {
  const [activeStage, setActiveStage] = useState(0);

  return (
    <div className="glass-strong glow-border flex flex-col justify-between rounded-3xl p-4 sm:p-5 w-full max-w-[200px] border border-white/10 shadow-2xl">
      <div className="border-b border-white/10 pb-3 text-center">
        <div className="flex items-center justify-center gap-1.5 font-mono text-xs font-bold text-cyan-300">
          <Layers className="h-4 w-4" /> PIPELINE STAGES
        </div>
        <p className="mt-0.5 text-[9px] text-white/50">Pixels to Intelligence</p>
      </div>

      {/* 5 Progression Thumbnails */}
      <div className="my-4 space-y-2.5">
        {STAGES.map((st, idx) => {
          const isActive = activeStage === idx;
          return (
            <motion.div
              key={st.id}
              onClick={() => setActiveStage(idx)}
              whileHover={{ scale: 1.04 }}
              className={`group cursor-pointer overflow-hidden rounded-xl border transition-all ${
                isActive
                  ? "border-cyan-400 ring-2 ring-cyan-400/30 shadow-lg"
                  : "border-white/10 opacity-70 hover:opacity-100"
              }`}
            >
              <div className="relative h-16 w-full overflow-hidden bg-black">
                {/* eslint-disable-next-html-link */}
                <img
                  src="/prajwal-portrait.jpg"
                  alt={st.title}
                  className="h-full w-full object-cover object-top"
                  style={{ filter: st.filter }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <span className="absolute bottom-1 left-2 font-mono text-[9px] font-bold text-white">
                  0{st.id}. {st.title}
                </span>
                {isActive && (
                  <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-cyan-400 animate-ping" />
                )}
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Footer Caption */}
      <div className="border-t border-white/10 pt-3 text-center font-mono text-[10px] font-bold tracking-wider text-cyan-300">
        From Pixels to Intelligence
      </div>
    </div>
  );
}
