'use client';

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FileSearch, CheckCircle, ArrowRight, Database, Code } from "lucide-react";

export default function DocumentOCRVisual() {
  const [activeField, setActiveField] = useState(0);

  const fields = [
    { label: "PRODUCT_NAME", val: "Organic Almond Milk 1L", box: { top: "18%", left: "15%", width: "70%", height: "20%" } },
    { label: "PRICE_TAG", val: "$4.99 USD", box: { top: "44%", left: "15%", width: "40%", height: "18%" } },
    { label: "BATCH_CODE", val: "LOT#2026-X892", box: { top: "44%", left: "60%", width: "30%", height: "18%" } },
    { label: "MANUFACTURER", val: "Runshaw Labs Ltd.", box: { top: "68%", left: "15%", width: "70%", height: "20%" } },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveField((prev) => (prev + 1) % fields.length);
    }, 2200);
    return () => clearInterval(timer);
  }, [fields.length]);

  return (
    <div className="glass-strong glow-border relative overflow-hidden rounded-3xl p-6 sm:p-7">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 ring-1 ring-white/15">
            <FileSearch className="h-5 w-5 text-amber-300" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Document Intelligence &amp; OCR Pipeline</h4>
            <p className="text-xs text-white/55">
              Runshaw Internship Project · Tesseract OCR · EasyOCR · ResNet / EfficientNet
            </p>
          </div>
        </div>

        <span className="rounded-full border border-amber-400/30 bg-amber-500/10 px-3 py-1 text-xs font-mono font-semibold text-amber-300">
          Packaging Info Extraction
        </span>
      </div>

      {/* Visual Workspace Grid */}
      <div className="mt-5 grid gap-4 lg:grid-cols-2">
        {/* Document Scanner Side */}
        <div className="relative h-[220px] rounded-2xl border border-white/10 bg-black/60 p-4 overflow-hidden">
          <div className="text-[10px] font-mono text-amber-400/80 mb-2 uppercase flex items-center gap-1">
            <ScanIcon /> Bounding Box Detection (OpenCV + EasyOCR)
          </div>

          <div className="relative h-[160px] w-full rounded-xl border border-white/10 bg-slate-900/90 p-3 overflow-hidden">
            {/* Mock Packaging Graphic lines */}
            <div className="space-y-2 opacity-30">
              <div className="h-4 w-3/4 rounded bg-white/40" />
              <div className="h-3 w-1/2 rounded bg-white/30" />
              <div className="h-3 w-2/3 rounded bg-white/30" />
              <div className="h-3 w-1/3 rounded bg-white/30" />
            </div>

            {/* Bounding Boxes */}
            {fields.map((f, idx) => {
              const isActive = activeField === idx;
              return (
                <motion.div
                  key={f.label}
                  className={`absolute rounded border-2 transition-all ${
                    isActive
                      ? "border-amber-400 bg-amber-400/20 shadow-[0_0_12px_#f59e0b]"
                      : "border-emerald-400/40 bg-emerald-400/5"
                  }`}
                  style={{
                    top: f.box.top,
                    left: f.box.left,
                    width: f.box.width,
                    height: f.box.height,
                  }}
                  animate={{ scale: isActive ? 1.03 : 1 }}
                >
                  <span className="absolute -top-3 left-1 rounded bg-black/90 px-1 py-0.2 font-mono text-[8px] text-amber-300">
                    {f.label}
                  </span>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Structured Data Output Side */}
        <div className="relative flex h-[220px] flex-col justify-between rounded-2xl border border-white/10 bg-black/80 p-4 font-mono text-xs">
          <div className="flex items-center justify-between border-b border-white/10 pb-2 text-[11px] text-emerald-400">
            <span className="flex items-center gap-1 font-bold">
              <Database className="h-3.5 w-3.5" /> Structured REST API JSON
            </span>
            <span className="text-[10px] text-white/40">Status: 200 OK</span>
          </div>

          <div className="my-2 space-y-1.5 overflow-y-auto text-[11px] text-white/80">
            <div>{"{"}</div>
            {fields.map((f, idx) => (
              <div
                key={f.label}
                className={`pl-4 transition-colors ${
                  activeField === idx ? "bg-amber-500/20 text-amber-200 font-bold rounded" : ""
                }`}
              >
                <span className="text-purple-300">&quot;{f.label}&quot;</span>:{" "}
                <span className="text-emerald-300">&quot;{f.val}&quot;</span>,
              </div>
            ))}
            <div>{"}"}</div>
          </div>

          <div className="flex items-center gap-2 border-t border-white/10 pt-2 text-[10px] text-white/50">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
            <span>Integrated into Flask REST APIs for downstream processing</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function ScanIcon() {
  return (
    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7V5a2 2 0 012-2h2m10 0h2a2 2 0 012 2v2m0 10v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2" />
    </svg>
  );
}
