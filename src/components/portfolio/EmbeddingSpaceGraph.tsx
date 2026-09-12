'use client';

import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Sparkles, Compass, Eye, Network } from "lucide-react";

interface VectorPoint {
  id: string;
  name: string;
  category: "GenAI" | "Vision" | "Web" | "Languages";
  x: number; // 0 to 100 percentage
  y: number; // 0 to 100 percentage
  similarity: string[];
}

const VECTOR_POINTS: VectorPoint[] = [
  { id: "rag", name: "RAG", category: "GenAI", x: 25, y: 30, similarity: ["llm", "multi-agent", "gemini", "prompt"] },
  { id: "llm", name: "LLMs", category: "GenAI", x: 38, y: 22, similarity: ["rag", "prompt", "gemini", "nlp"] },
  { id: "multi-agent", name: "Multi-Agent Systems", category: "GenAI", x: 20, y: 55, similarity: ["rag", "gemini", "llm"] },
  { id: "gemini", name: "Gemini API", category: "GenAI", x: 45, y: 40, similarity: ["rag", "llm", "multi-agent"] },
  { id: "prompt", name: "Prompt Engineering", category: "GenAI", x: 35, y: 58, similarity: ["llm", "rag"] },
  { id: "nlp", name: "NLP", category: "GenAI", x: 50, y: 20, similarity: ["llm", "ocr"] },

  { id: "opencv", name: "OpenCV", category: "Vision", x: 75, y: 35, similarity: ["ocr", "tesseract", "tensorflow", "easyocr"] },
  { id: "tensorflow", name: "TensorFlow", category: "Vision", x: 82, y: 55, similarity: ["opencv", "cnns", "transfer-learning"] },
  { id: "ocr", name: "OCR", category: "Vision", x: 68, y: 50, similarity: ["tesseract", "easyocr", "opencv"] },
  { id: "tesseract", name: "Tesseract OCR", category: "Vision", x: 60, y: 68, similarity: ["ocr", "easyocr", "opencv"] },
  { id: "easyocr", name: "EasyOCR", category: "Vision", x: 78, y: 72, similarity: ["ocr", "tesseract", "opencv"] },
  { id: "cnns", name: "CNNs", category: "Vision", x: 88, y: 30, similarity: ["tensorflow", "opencv"] },
  { id: "transfer-learning", name: "Transfer Learning", category: "Vision", x: 85, y: 75, similarity: ["tensorflow", "cnns"] },

  { id: "nextjs", name: "Next.js", category: "Web", x: 30, y: 80, similarity: ["nodejs", "tailwind", "prisma"] },
  { id: "postgresql", name: "PostgreSQL", category: "Web", x: 48, y: 82, similarity: ["prisma", "sql"] },
  { id: "prisma", name: "Prisma ORM", category: "Web", x: 42, y: 70, similarity: ["postgresql", "nextjs"] },
  { id: "flask", name: "Flask", category: "Web", x: 58, y: 85, similarity: ["python", "rest"] },

  { id: "python", name: "Python", category: "Languages", x: 55, y: 48, similarity: ["tensorflow", "opencv", "flask"] },
  { id: "sql", name: "SQL", category: "Languages", x: 52, y: 72, similarity: ["postgresql", "prisma"] },
  { id: "javascript", name: "JavaScript", category: "Languages", x: 22, y: 75, similarity: ["nextjs", "browser-apis"] },
];

export default function EmbeddingSpaceGraph() {
  const [activePoint, setActivePoint] = useState<VectorPoint | null>(VECTOR_POINTS[0]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [mouseOffset, setMouseOffset] = useState({ x: 0, y: 0 });

  const onMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setMouseOffset({ x: cx * 18, y: cy * 18 });
  };

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={() => setMouseOffset({ x: 0, y: 0 })}
      className="glass-strong glow-border relative my-8 overflow-hidden rounded-3xl p-6 sm:p-8"
    >
      {/* Background Grid & Header */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(120,119,198,0.1),transparent_70%)]" />
      <div className="pointer-events-none absolute inset-0 grid-pattern opacity-40" />

      <div className="relative z-10 flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-blue-500/20 ring-1 ring-white/15">
            <Compass className="h-5 w-5 text-cyan-300" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-white">Interactive Skill Embedding Space</h3>
            <p className="text-xs text-white/55">
              Hover over vector nodes to explore concept similarities &amp; technology clusters.
            </p>
          </div>
        </div>

        {/* Categories Legend */}
        <div className="flex flex-wrap gap-2 text-[11px]">
          <span className="inline-flex items-center gap-1 rounded-full border border-violet-400/30 bg-violet-500/10 px-2.5 py-1 text-violet-300">
            <Sparkles className="h-3 w-3" /> GenAI &amp; RAG
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-cyan-400/30 bg-cyan-500/10 px-2.5 py-1 text-cyan-300">
            <Eye className="h-3 w-3" /> Vision &amp; OCR
          </span>
          <span className="inline-flex items-center gap-1 rounded-full border border-emerald-400/30 bg-emerald-500/10 px-2.5 py-1 text-emerald-300">
            <Network className="h-3 w-3" /> Web &amp; Database
          </span>
        </div>
      </div>

      {/* Embedding Plot Canvas */}
      <div className="relative mt-6 h-[380px] w-full overflow-hidden rounded-2xl border border-white/8 bg-black/40 sm:h-[420px]">
        {/* Connection Lines to Active Point */}
        {activePoint && (
          <svg className="pointer-events-none absolute inset-0 h-full w-full">
            {VECTOR_POINTS.filter((p) => activePoint.similarity.includes(p.id)).map((target) => (
              <line
                key={target.id}
                x1={`${activePoint.x}%`}
                y1={`${activePoint.y}%`}
                x2={`${target.x}%`}
                y2={`${target.y}%`}
                stroke="rgba(34, 211, 238, 0.45)"
                strokeWidth="1.5"
                strokeDasharray="4 2"
                className="animate-pulse"
              />
            ))}
          </svg>
        )}

        {/* Render Vector Nodes */}
        {VECTOR_POINTS.map((pt) => {
          const isActive = activePoint?.id === pt.id;
          const isRelated = activePoint?.similarity.includes(pt.id);

          const getCategoryColor = () => {
            switch (pt.category) {
              case "GenAI":
                return "bg-violet-400 border-violet-300 text-violet-200";
              case "Vision":
                return "bg-cyan-400 border-cyan-300 text-cyan-200";
              case "Web":
                return "bg-emerald-400 border-emerald-300 text-emerald-200";
              default:
                return "bg-amber-400 border-amber-300 text-amber-200";
            }
          };

          return (
            <motion.div
              key={pt.id}
              className="interactive-node absolute cursor-pointer"
              style={{
                left: `${pt.x}%`,
                top: `${pt.y}%`,
              }}
              animate={{
                x: mouseOffset.x * (isActive ? 1.5 : 0.6),
                y: mouseOffset.y * (isActive ? 1.5 : 0.6),
                scale: isActive ? 1.25 : isRelated ? 1.1 : 1,
                opacity: activePoint ? (isActive || isRelated ? 1 : 0.35) : 0.85,
              }}
              onMouseEnter={() => setActivePoint(pt)}
              transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
              <div className="relative -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
                {/* Node Ring */}
                <div
                  className={`grid h-7 w-7 place-items-center rounded-full border shadow-lg transition-colors ${getCategoryColor()} ${
                    isActive ? "ring-4 ring-cyan-400/30" : ""
                  }`}
                >
                  <span className="h-2 w-2 rounded-full bg-white animate-ping" />
                </div>

                {/* Label */}
                <span
                  className={`mt-1 whitespace-nowrap rounded-md px-2 py-0.5 font-mono text-[10px] font-semibold backdrop-blur transition-all ${
                    isActive
                      ? "bg-cyan-500 text-black shadow-lg shadow-cyan-500/30"
                      : isRelated
                      ? "bg-white/20 text-white"
                      : "bg-black/60 text-white/70"
                  }`}
                >
                  {pt.name}
                </span>
              </div>
            </motion.div>
          );
        })}

        {/* Active Vector Tooltip Footer */}
        {activePoint && (
          <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center justify-between gap-2 rounded-xl border border-white/10 bg-black/80 px-4 py-2.5 text-xs text-white backdrop-blur">
            <div className="flex items-center gap-2">
              <span className="font-mono text-cyan-300 font-bold">Vector Node:</span>
              <span className="font-bold text-white">{activePoint.name}</span>
              <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-white/60">
                {activePoint.category}
              </span>
            </div>

            <div className="flex items-center gap-2 text-white/70">
              <span className="font-mono text-[11px] text-violet-300">
                Connected Embeddings ({activePoint.similarity.length}):
              </span>
              <div className="flex flex-wrap gap-1">
                {activePoint.similarity.map((simId) => {
                  const item = VECTOR_POINTS.find((v) => v.id === simId);
                  return (
                    <span key={simId} className="rounded bg-violet-500/20 px-1.5 py-0.5 text-[10px] font-mono text-violet-200">
                      {item?.name}
                    </span>
                  );
                })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
