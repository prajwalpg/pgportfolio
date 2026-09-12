'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Cpu, Sparkles } from "lucide-react";

interface OrbitConcept {
  id: string;
  name: string;
  href: string;
  angle: number; // in degrees
}

const CONCEPTS: OrbitConcept[] = [
  { id: "genai", name: "Generative AI", href: "#skills", angle: 0 },
  { id: "rag", name: "RAG", href: "#projects", angle: 72 },
  { id: "agents", name: "Multi-Agent Systems", href: "#projects", angle: 144 },
  { id: "vision", name: "Computer Vision", href: "#projects", angle: 216 },
  { id: "ocr", name: "OCR", href: "#experience", angle: 288 },
];

export default function AIConceptOrbit() {
  const [hoveredConcept, setHoveredConcept] = useState<OrbitConcept | null>(null);

  return (
    <div className="glass-strong glow-border relative h-56 w-72 rounded-3xl p-4 flex items-center justify-center overflow-hidden">
      {/* Orbit Rings */}
      <div className="pointer-events-none absolute h-40 w-40 rounded-full border border-cyan-400/30 animate-spin" style={{ animationDuration: "25s" }} />
      <div className="pointer-events-none absolute h-28 w-28 rounded-full border border-violet-400/20" />

      {/* Central AI Node */}
      <div className="relative z-10 grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-600 via-cyan-500 to-blue-600 text-white font-bold font-mono text-sm shadow-xl shadow-cyan-500/30 border border-white/20">
        AI
        <Sparkles className="absolute -top-1 -right-1 h-3.5 w-3.5 text-cyan-300 animate-pulse" />
      </div>

      {/* Orbiting Concepts */}
      {CONCEPTS.map((c) => {
        const rad = (c.angle * Math.PI) / 180;
        const radius = 75; // px from center
        const x = Math.cos(rad) * radius;
        const y = Math.sin(rad) * radius;
        const isHovered = hoveredConcept?.id === c.id;

        return (
          <a
            key={c.id}
            href={c.href}
            onMouseEnter={() => setHoveredConcept(c)}
            onMouseLeave={() => setHoveredConcept(null)}
            className="absolute z-20 transition-all duration-300"
            style={{
              transform: `translate(${x}px, ${y}px)`,
            }}
          >
            <span
              className={`inline-flex items-center rounded-full border px-2.5 py-1 font-mono text-[10px] font-bold shadow-lg transition-all ${
                isHovered
                  ? "border-cyan-400 bg-cyan-500 text-black scale-110 shadow-cyan-500/50"
                  : "border-white/10 bg-black/80 text-white/80 hover:border-cyan-400/50 hover:text-cyan-300"
              }`}
            >
              {c.name}
            </span>
          </a>
        );
      })}
    </div>
  );
}
