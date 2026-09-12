'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Zap, Eye, Cpu } from "lucide-react";

interface AttentionToken {
  id: string;
  name: string;
  category: string;
  related: string[];
}

const TOKENS: AttentionToken[] = [
  { id: "rag", name: "RAG", category: "GenAI", related: ["llm", "agents", "gemini", "postgresql"] },
  { id: "llm", name: "LLMs", category: "GenAI", related: ["rag", "nlp", "prompt", "agents"] },
  { id: "agents", name: "Multi-Agent AI", category: "GenAI", related: ["rag", "llm", "gemini"] },
  { id: "opencv", name: "OpenCV", category: "Vision", related: ["ocr", "tensorflow", "cnns"] },
  { id: "ocr", name: "Tesseract OCR", category: "Vision", related: ["opencv", "easyocr", "python"] },
  { id: "tensorflow", name: "TensorFlow", category: "Vision", related: ["opencv", "cnns", "python"] },
  { id: "nextjs", name: "Next.js", category: "Web", related: ["prisma", "postgresql", "javascript"] },
  { id: "postgresql", name: "PostgreSQL", category: "Web", related: ["prisma", "sql", "rag"] },
  { id: "python", name: "Python", category: "Language", related: ["opencv", "tensorflow", "ocr", "sql"] },
];

export default function AttentionMechanismVisual() {
  const [activeToken, setActiveToken] = useState<AttentionToken>(TOKENS[0]);

  return (
    <div className="glass-strong glow-border relative my-8 overflow-hidden rounded-3xl p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 ring-1 ring-white/15">
            <Zap className="h-5 w-5 text-violet-300" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">Transformer Attention Mechanism Visualizer</h4>
            <p className="text-xs text-white/55">
              Query-Key Softmax Attention Weights Demonstration
            </p>
          </div>
        </div>

        <span className="rounded-full border border-violet-400/30 bg-violet-500/10 px-3 py-1 text-xs font-mono font-semibold text-violet-300">
          Self-Attention (Q × Kᵀ) / √dₖ
        </span>
      </div>

      {/* Attention Tokens Matrix */}
      <div className="mt-6">
        <div className="flex flex-wrap items-center justify-between text-xs font-mono text-white/60 mb-4">
          <span>SELECT QUERY TOKEN TO CALCULATE ATTENTION:</span>
          {activeToken && (
            <span className="text-cyan-300 font-bold">
              ACTIVE QUERY: [{activeToken.name}]
            </span>
          )}
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          {TOKENS.map((token) => {
            const isQuery = activeToken.id === token.id;
            const isAttended = activeToken.related.includes(token.id);
            const score = isQuery ? "1.00" : isAttended ? "0.85" : "0.08";

            return (
              <motion.div
                key={token.id}
                onMouseEnter={() => setActiveToken(token)}
                whileHover={{ scale: 1.03 }}
                className={`interactive-node cursor-pointer rounded-2xl border p-4 transition-all ${
                  isQuery
                    ? "border-cyan-400 bg-cyan-500/20 shadow-lg shadow-cyan-500/20 ring-2 ring-cyan-400/50"
                    : isAttended
                    ? "border-violet-400/60 bg-violet-500/15"
                    : "border-white/5 bg-black/40 opacity-40"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white text-sm">{token.name}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[10px] ${
                      isQuery
                        ? "bg-cyan-500 text-black font-bold"
                        : isAttended
                        ? "bg-violet-500/30 text-violet-200"
                        : "bg-white/5 text-white/40"
                    }`}
                  >
                    Score: {score}
                  </span>
                </div>

                <div className="mt-2 text-[10px] font-mono text-white/50">
                  {isQuery ? "PRIMARY QUERY TOKEN" : isAttended ? "HIGH ATTENTION" : "LOW ATTENTION"}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
