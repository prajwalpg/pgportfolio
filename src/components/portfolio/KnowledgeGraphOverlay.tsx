'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Network, X, ArrowUpRight, Cpu, Layers } from "lucide-react";

interface GraphNode {
  id: string;
  label: string;
  type: "root" | "concept" | "project";
  targetHref: string;
  x: number;
  y: number;
}

const NODES: GraphNode[] = [
  { id: "root", label: "Prajwal PG", type: "root", targetHref: "#hero", x: 50, y: 50 },

  { id: "genai", label: "Generative AI & RAG", type: "concept", targetHref: "#skills", x: 25, y: 30 },
  { id: "vision", label: "Computer Vision", type: "concept", targetHref: "#skills", x: 75, y: 30 },
  { id: "ocr", label: "OCR & Doc Intel", type: "concept", targetHref: "#skills", x: 75, y: 70 },
  { id: "proctoring", label: "AI Proctoring", type: "concept", targetHref: "#skills", x: 25, y: 70 },

  { id: "sahayak", label: "SAHAYAK Project", type: "project", targetHref: "#projects", x: 15, y: 15 },
  { id: "attendance", label: "Smart Attendance", type: "project", targetHref: "#projects", x: 85, y: 15 },
  { id: "runshaw", label: "Runshaw OCR Pipeline", type: "project", targetHref: "#experience", x: 85, y: 85 },
  { id: "hirepro", label: "HirePro Assessment POC", type: "project", targetHref: "#experience", x: 15, y: 85 },
];

const EDGES = [
  { from: "root", to: "genai" },
  { from: "root", to: "vision" },
  { from: "root", to: "ocr" },
  { from: "root", to: "proctoring" },

  { from: "genai", to: "sahayak" },
  { from: "vision", to: "attendance" },
  { from: "ocr", to: "runshaw" },
  { from: "proctoring", to: "hirepro" },
];

export default function KnowledgeGraphOverlay() {
  const [open, setOpen] = useState(false);
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Open Knowledge Graph Navigator"
        className="fixed bottom-4 right-4 z-40 glass-strong glow-border flex items-center gap-2 rounded-full px-4 py-2.5 text-xs font-mono font-bold text-white backdrop-blur shadow-2xl transition-transform hover:scale-105"
      >
        <Network className="h-4 w-4 text-cyan-300 animate-pulse" />
        <span>KNOWLEDGE GRAPH</span>
      </button>

      {/* Modal Dialog */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/80 p-4 backdrop-blur-xl"
          >
            <div className="glass-strong glow-border relative h-[90vh] w-full max-w-5xl overflow-hidden rounded-3xl p-6 sm:p-8 flex flex-col justify-between">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-white/10 pb-4">
                <div className="flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-cyan-500/20 text-cyan-300 border border-cyan-400/30">
                    <Network className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-white">Interactive Portfolio Knowledge Graph</h3>
                    <p className="text-xs text-white/50">
                      Click any node to navigate directly to its corresponding project or skill section.
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => setOpen(false)}
                  className="grid h-9 w-9 place-items-center rounded-xl bg-white/10 text-white hover:bg-white/20"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Canvas Graph View */}
              <div className="relative my-4 h-full w-full rounded-2xl border border-white/10 bg-black/60 overflow-hidden">
                {/* SVG Edges */}
                <svg className="absolute inset-0 h-full w-full">
                  {EDGES.map((edge) => {
                    const n1 = NODES.find((n) => n.id === edge.from);
                    const n2 = NODES.find((n) => n.id === edge.to);
                    if (!n1 || !n2) return null;
                    return (
                      <line
                        key={edge.from + edge.to}
                        x1={`${n1.x}%`}
                        y1={`${n1.y}%`}
                        x2={`${n2.x}%`}
                        y2={`${n2.y}%`}
                        stroke="rgba(34, 211, 238, 0.4)"
                        strokeWidth="1.5"
                        strokeDasharray="4 2"
                      />
                    );
                  })}
                </svg>

                {/* Graph Nodes */}
                {NODES.map((n) => (
                  <a
                    key={n.id}
                    href={n.targetHref}
                    onClick={() => setOpen(false)}
                    onMouseEnter={() => setHoveredNode(n)}
                    className="absolute -translate-x-1/2 -translate-y-1/2 group cursor-pointer"
                    style={{ left: `${n.x}%`, top: `${n.y}%` }}
                  >
                    <div
                      className={`grid place-items-center rounded-full border shadow-xl transition-all ${
                        n.type === "root"
                          ? "h-14 w-14 bg-violet-600 border-violet-400 text-white font-bold"
                          : n.type === "concept"
                          ? "h-10 w-10 bg-cyan-600/80 border-cyan-300 text-white"
                          : "h-9 w-9 bg-emerald-600/80 border-emerald-300 text-white"
                      }`}
                    >
                      <Cpu className="h-4 w-4" />
                    </div>

                    <span className="mt-1 block whitespace-nowrap rounded bg-black/80 px-2 py-0.5 font-mono text-[10px] font-bold text-white text-center border border-white/10 group-hover:border-cyan-400 group-hover:text-cyan-300">
                      {n.label}
                    </span>
                  </a>
                ))}
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between text-xs font-mono text-white/50 border-t border-white/10 pt-3">
                <span>Node Selected: {hoveredNode ? hoveredNode.label : "Hover over a node"}</span>
                <span>Click node to scroll section</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
