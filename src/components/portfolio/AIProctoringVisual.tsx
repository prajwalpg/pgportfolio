'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ShieldAlert, Eye, Monitor, Users, CopyCheck, AlertTriangle } from "lucide-react";

export default function AIProctoringVisual() {
  const [activeSignal, setActiveSignal] = useState(0);

  const signals = [
    { name: "Browser Activity", status: "Active / Tab Focused", ok: true },
    { name: "Fullscreen Violation", status: "No Exits Detected", ok: true },
    { name: "Copy/Paste Event", status: "Clipboard Monitored", ok: true },
    { name: "Gaze Estimation", status: "Center Screen Focus", ok: true },
    { name: "Multi-Face Alert", status: "Single Candidate Present", ok: true },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSignal((prev) => (prev + 1) % signals.length);
    }, 2000);
    return () => clearInterval(timer);
  }, [signals.length]);

  return (
    <div className="glass-strong glow-border relative overflow-hidden rounded-3xl p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20 ring-1 ring-white/15">
            <ShieldAlert className="h-5 w-5 text-emerald-300" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">AI-Assisted Assessment Monitoring</h4>
            <p className="text-xs text-white/55">
              HirePro Internship Proof-of-Concept · Behavioral Analytics &amp; Computer Vision
            </p>
          </div>
        </div>

        <span className="rounded-full border border-emerald-400/30 bg-emerald-500/10 px-3 py-1 text-xs font-mono font-semibold text-emerald-300">
          HirePro Internship POC
        </span>
      </div>

      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* Exam Monitor Screen Simulation */}
        <div className="relative h-[220px] rounded-2xl border border-white/10 bg-slate-950 p-4 flex flex-col justify-between overflow-hidden">
          {/* Header Bar */}
          <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[10px] font-mono text-white/60">
            <span className="flex items-center gap-1">
              <Monitor className="h-3 w-3 text-emerald-400" /> Online Exam Candidate Session #8921
            </span>
            <span className="flex items-center gap-1 text-emerald-400 font-bold">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> LIVE MONITOR
            </span>
          </div>

          {/* Video Feed Simulation with Bounding Box & Gaze Beam */}
          <div className="relative h-[140px] w-full rounded-xl border border-emerald-500/30 bg-black/60 p-3 overflow-hidden flex items-center justify-center">
            <div className="relative h-24 w-24 rounded-full border-2 border-emerald-400/60 flex items-center justify-center">
              {/* Gaze Vector Beam */}
              <motion.div
                className="absolute h-0.5 w-16 bg-gradient-to-r from-emerald-400 to-transparent shadow-[0_0_8px_#34d399]"
                animate={{ rotate: [-10, 10, -10] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
              />

              {/* Bounding Box overlay */}
              <div className="absolute inset-0 rounded border border-emerald-400/80 shadow-[0_0_10px_rgba(52,211,153,0.3)]">
                <span className="absolute -top-3 left-0 rounded bg-emerald-500 px-1 py-0.2 font-mono text-[8px] text-black font-bold">
                  FACE: 99.1% CONF
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Signal Checklist Status */}
        <div className="relative flex h-[220px] flex-col justify-between rounded-2xl border border-white/10 bg-black/80 p-4 font-mono text-xs">
          <div className="text-[11px] font-bold text-emerald-400 border-b border-white/10 pb-2">
            Real-Time Integrity Signal Vectors
          </div>

          <div className="my-2 space-y-2 text-xs">
            {signals.map((sig, idx) => {
              const isActive = activeSignal === idx;
              return (
                <div
                  key={sig.name}
                  className={`flex items-center justify-between rounded p-1.5 transition-all ${
                    isActive ? "bg-emerald-500/20 text-emerald-200 font-bold" : "text-white/70"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <span className={`h-1.5 w-1.5 rounded-full ${isActive ? "bg-emerald-400 animate-ping" : "bg-white/40"}`} />
                    {sig.name}
                  </span>
                  <span className="text-[10px] text-emerald-300/80">{sig.status}</span>
                </div>
              );
            })}
          </div>

          <div className="flex items-center gap-2 border-t border-white/10 pt-2 text-[10px] text-white/45">
            <AlertTriangle className="h-3.5 w-3.5 text-amber-400" />
            <span>Research &amp; evaluation module developed during HirePro internship</span>
          </div>
        </div>
      </div>
    </div>
  );
}
