'use client';

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Eye, Scan, Sparkles } from "lucide-react";

export default function PrajwalPortraitScanner() {
  const [hovered, setHovered] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement | null>(null);

  const onMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: y * -12, y: x * 12 });
  };

  const onMouseLeave = () => {
    setTilt({ x: 0, y: 0 });
    setHovered(false);
  };

  const landmarkPoints = [
    { x: 38, y: 38, name: "Right Eye" },
    { x: 62, y: 38, name: "Left Eye" },
    { x: 50, y: 52, name: "Nose" },
    { x: 38, y: 68, name: "Right Mouth" },
    { x: 62, y: 68, name: "Left Mouth" },
    { x: 50, y: 72, name: "Chin" },
  ];

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      className="relative flex flex-col items-center justify-center"
      style={{ perspective: 1000 }}
    >
      {/* HUD Top Status Card */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-strong glow-border mb-3 flex items-center gap-3 rounded-xl px-3.5 py-1.5 font-mono text-[11px] text-white shadow-xl backdrop-blur z-20"
      >
        <Scan className="h-3.5 w-3.5 text-cyan-300 animate-pulse" />
        <span className="font-bold text-cyan-300">FACE DETECTION:</span>
        <span className="flex items-center gap-1 text-emerald-300">
          <CheckCircle2 className="h-3 w-3" /> Face Found
        </span>
        <span className="flex items-center gap-1 text-cyan-300">
          <CheckCircle2 className="h-3 w-3" /> Processing
        </span>
        <span className="flex items-center gap-1 text-violet-300">
          <CheckCircle2 className="h-3 w-3" /> Identity Match
        </span>
      </motion.div>

      {/* Main Interactive Portrait Card with 3D Tilt */}
      <motion.div
        animate={{
          rotateX: tilt.x,
          rotateY: tilt.y,
          scale: hovered ? 1.02 : 1,
        }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="relative h-[340px] w-[270px] sm:h-[400px] sm:w-[320px] rounded-3xl border-2 border-cyan-400/50 overflow-hidden shadow-[0_0_40px_rgba(34,211,238,0.25)] bg-black"
      >
        {/* Actual Prajwal Portrait Image */}
        {/* eslint-disable-next-html-link */}
        <img
          src="/prajwal-portrait.jpg"
          alt="Prajwal PG — AI Engineer"
          className={`h-full w-full object-cover transition-transform duration-700 ${
            hovered ? "scale-105 filter brightness-110" : ""
          }`}
        />

        {/* Scan Beam Effect */}
        <motion.div
          className="absolute inset-x-0 h-1.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent shadow-[0_0_15px_#22d3ee] pointer-events-none z-10"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ repeat: Infinity, duration: 3.2, ease: "linear" }}
        />

        {/* Computer Vision Corner HUD Brackets */}
        <div className="pointer-events-none absolute inset-3 border border-cyan-400/30 rounded-2xl z-10">
          {/* Top Left Bracket */}
          <div className="absolute -top-1 -left-1 h-5 w-5 border-t-2 border-l-2 border-cyan-400" />
          {/* Top Right Bracket */}
          <div className="absolute -top-1 -right-1 h-5 w-5 border-t-2 border-r-2 border-cyan-400" />
          {/* Bottom Left Bracket */}
          <div className="absolute -bottom-1 -left-1 h-5 w-5 border-b-2 border-l-2 border-cyan-400" />
          {/* Bottom Right Bracket */}
          <div className="absolute -bottom-1 -right-1 h-5 w-5 border-b-2 border-r-2 border-cyan-400" />
        </div>

        {/* Facial Landmark Points & Connective Mesh */}
        <div className={`pointer-events-none absolute inset-0 transition-opacity duration-300 z-10 ${hovered ? "opacity-100" : "opacity-60"}`}>
          <svg className="absolute inset-0 h-full w-full stroke-cyan-400/50" strokeWidth="1.2">
            <line x1="38%" y1="38%" x2="62%" y2="38%" />
            <line x1="38%" y1="38%" x2="50%" y2="52%" />
            <line x1="62%" y1="38%" x2="50%" y2="52%" />
            <line x1="50%" y1="52%" x2="38%" y2="68%" />
            <line x1="50%" y1="52%" x2="62%" y2="68%" />
            <line x1="38%" y1="68%" x2="62%" y2="68%" />
            <line x1="38%" y1="68%" x2="50%" y2="72%" />
            <line x1="62%" y1="68%" x2="50%" y2="72%" />
          </svg>

          {landmarkPoints.map((pt, idx) => (
            <motion.div
              key={idx}
              className="absolute -translate-x-1/2 -translate-y-1/2 flex items-center justify-center"
              style={{ left: `${pt.x}%`, top: `${pt.y}%` }}
              animate={{ scale: hovered ? [1, 1.4, 1] : 1 }}
              transition={{ repeat: Infinity, duration: 1.5, delay: idx * 0.2 }}
            >
              <span className="h-2.5 w-2.5 rounded-full bg-cyan-300 ring-4 ring-cyan-500/40 shadow-[0_0_10px_#22d3ee]" />
            </motion.div>
          ))}
        </div>

        {/* Feature Points Legend Box */}
        <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/10 bg-black/80 p-2.5 backdrop-blur z-10 font-mono text-[10px] text-white/80">
          <div className="flex items-center justify-between text-cyan-300 font-bold border-b border-white/10 pb-1">
            <span className="flex items-center gap-1">
              <Sparkles className="h-3 w-3" /> FEATURE EXTRACTION
            </span>
            <span className="text-emerald-300 text-[9px]">LIVE LANDMARKS</span>
          </div>
          <div className="mt-1.5 flex justify-between text-white/60">
            <span>• Eyes</span>
            <span>• Nose</span>
            <span>• Mouth</span>
            <span>• Face Mesh</span>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
