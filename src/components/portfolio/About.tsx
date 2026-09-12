'use client';

import { motion } from "framer-motion";
import { GraduationCap, Target, MapPin, Cpu, Eye, Layers, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { profile } from "@/lib/portfolio-data";

export default function About() {
  return (
    <section id="about" className="section-anchor relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Model Profile"
          title={
            <>
              About the <span className="gradient-text">AI Engineer</span>.
            </>
          }
          description="System architecture view of my background, core AI capabilities, and practical engineering output."
        />

        {/* AI Model Pipeline System Panel */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* INPUT PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="glass-strong glow-border relative overflow-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-cyan-300">
                  1. INPUT DATA STREAM
                </span>
                <span className="rounded bg-cyan-500/20 px-2 py-0.5 font-mono text-[10px] text-cyan-200">
                  BACKGROUND
                </span>
              </div>

              <div className="mt-4 space-y-4 text-xs text-white/75 leading-relaxed">
                <div className="rounded-2xl border border-white/8 bg-black/40 p-4">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <GraduationCap className="h-4 w-4 text-violet-300" />
                    B.E. CSE (AI &amp; ML)
                  </div>
                  <div className="mt-1 text-white/60">PES College of Engineering, Mandya</div>
                  <div className="mt-1 text-[11px] font-mono text-emerald-300">CGPA: 7.18 / 10 (2023–2026)</div>
                </div>

                <div className="rounded-2xl border border-white/8 bg-black/40 p-4">
                  <div className="flex items-center gap-2 font-bold text-white text-sm">
                    <GraduationCap className="h-4 w-4 text-blue-300" />
                    Diploma CSE
                  </div>
                  <div className="mt-1 text-white/60">Govt. CPC Polytechnic, Mysuru</div>
                  <div className="mt-1 text-[11px] font-mono text-emerald-300">CGPA: 8.83 / 10 (2020–2023)</div>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-cyan-300/80 pt-3 border-t border-white/10">
              <ArrowRight className="h-4 w-4" /> Feeding into AI Neural Layers
            </div>
          </motion.div>

          {/* CAPABILITIES PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="glass-strong glow-border relative overflow-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-violet-300">
                  2. CORE CAPABILITIES
                </span>
                <span className="rounded bg-violet-500/20 px-2 py-0.5 font-mono text-[10px] text-violet-200">
                  NEURAL LAYERS
                </span>
              </div>

              <div className="mt-4 space-y-2.5">
                {[
                  { title: "Generative AI & LLMs", sub: "Gemini API, Multi-Agent Systems, Prompting" },
                  { title: "RAG & Vector Retrieval", sub: "Context-aware educational & search pipelines" },
                  { title: "Computer Vision & OCR", sub: "OpenCV, TensorFlow, Tesseract, EasyOCR" },
                  { title: "Full-Stack Web Architecture", sub: "Next.js, Node.js, Flask, PostgreSQL, Prisma" },
                  { title: "Assessment & Monitoring", sub: "Gaze estimation & multi-face detection POCs" },
                ].map((cap) => (
                  <div key={cap.title} className="rounded-xl border border-white/8 bg-white/4 p-3">
                    <div className="flex items-center gap-2 font-bold text-white text-xs">
                      <Zap className="h-3.5 w-3.5 text-violet-400" />
                      {cap.title}
                    </div>
                    <div className="mt-0.5 text-[11px] text-white/60">{cap.sub}</div>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-violet-300/80 pt-3 border-t border-white/10">
              <ArrowRight className="h-4 w-4" /> Synthesizing Shipped Products
            </div>
          </motion.div>

          {/* OUTPUT PANEL */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="glass-strong glow-border relative overflow-hidden rounded-3xl p-6 sm:p-7 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between border-b border-white/10 pb-3">
                <span className="font-mono text-xs font-bold uppercase tracking-wider text-emerald-300">
                  3. PRACTICAL OUTPUT
                </span>
                <span className="rounded bg-emerald-500/20 px-2 py-0.5 font-mono text-[10px] text-emerald-200">
                  APPLICATIONS
                </span>
              </div>

              <div className="mt-4 space-y-4 text-xs text-white/75 leading-relaxed">
                <div className="rounded-2xl border border-white/8 bg-black/40 p-4 space-y-2">
                  <div className="font-bold text-white text-sm">SAHAYAK Platform</div>
                  <p className="text-[11px] text-white/70">
                    Multi-Agent AI tutor with RAG, proctoring, and facial-recognition attendance.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/8 bg-black/40 p-4 space-y-2">
                  <div className="font-bold text-white text-sm">Document Intelligence OCR</div>
                  <p className="text-[11px] text-white/70">
                    Deep learning package info extraction pipeline built at Runshaw Technologies.
                  </p>
                </div>

                <div className="rounded-2xl border border-white/8 bg-black/40 p-4 space-y-2">
                  <div className="font-bold text-white text-sm">Smart Attendance &amp; Assessment</div>
                  <p className="text-[11px] text-white/70">
                    Real-time SSD face detection, MobileNetV2 embeddings, and HirePro monitoring.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 font-mono text-[11px] text-emerald-300 pt-3 border-t border-white/10">
              <CheckCircle2 className="h-4 w-4" /> Ready for AI Engineer Roles
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
