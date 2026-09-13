'use client';

import { useState, useEffect } from "react";
import { UserCheck, CheckCircle2 } from "lucide-react";

export default function SmartAttendanceVisual() {
  const [phase, setPhase] = useState<0 | 1 | 2 | 3 | 4>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setPhase((prev) => ((prev + 1) % 5) as 0 | 1 | 2 | 3 | 4);
    }, 2400);
    return () => clearInterval(timer);
  }, []);

  const stages = [
    { title: "1. Face Input", detail: "Real-time webcam stream captured via OpenCV" },
    { title: "2. Face Detection", detail: "SSD (Single Shot MultiBox Detector) bounding box localization" },
    { title: "3. Feature Extraction", detail: "Deep facial landmark alignment and edge features" },
    { title: "4. MobileNetV2 Embedding", detail: "Feature vector mapping into dense embedding space" },
    { title: "5. Match & Attendance", detail: "Identity match verification & automated log registration" },
  ];

  return (
    <div className="glass-strong glow-border relative overflow-hidden rounded-3xl p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-cyan-500/30 to-blue-500/20 ring-1 ring-white/15">
            <UserCheck className="h-5 w-5 text-cyan-300" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Smart Attendance System Pipeline</h4>
            <p className="text-xs text-white/55">
              OpenCV · TensorFlow · SSD Face Detection · MobileNetV2
            </p>
          </div>
        </div>

        <span className="rounded-full border border-cyan-400/30 bg-cyan-500/10 px-3 py-1 text-xs font-mono font-semibold text-cyan-300">
          Real-Time Facial Recognition Pipeline
        </span>
      </div>

      {/* Stage Progression Display */}
      <div className="mt-5 grid gap-3 sm:grid-cols-5">
        {stages.map((st, idx) => {
          const isActive = phase === idx;
          return (
            <div
              key={st.title}
              onClick={() => setPhase(idx as any)}
              className={`cursor-pointer rounded-2xl border p-3.5 transition-all ${
                isActive
                  ? "border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/20"
                  : "border-white/8 bg-black/40 hover:bg-white/5"
              }`}
            >
              <div className="text-[11px] font-mono text-cyan-300 font-bold">{st.title}</div>
              <div className="mt-1.5 text-xs leading-relaxed text-white/70">{st.detail}</div>
            </div>
          );
        })}
      </div>

      {/* Live Pipeline Status Banner */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 rounded-2xl border border-white/10 bg-black/70 p-4 font-mono text-xs text-white">
        <div className="flex items-center gap-2">
          <CheckCircle2 className="h-4 w-4 text-emerald-400" />
          <span>
            IDENTITY MATCH CONFIDENCE: <strong className="text-emerald-300">98.4% (DEMO VALUE)</strong>
          </span>
        </div>
        <div className="text-white/60">
          ATTENDANCE STATUS: <strong className="text-emerald-300">PRESENT</strong> | <span className="text-amber-300">DEMO VISUALIZATION</span>
        </div>
      </div>
    </div>
  );
}
