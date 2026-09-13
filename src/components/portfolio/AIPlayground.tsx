'use client';

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Sparkles,
  Database,
  Eye,
  Bot,
  Brain,
  Search,
  ArrowRight,
  Layers,
  Cpu,
  CheckCircle2,
  Sliders,
  FileCode2,
} from "lucide-react";
import SectionHeading from "./SectionHeading";

export default function AIPlayground() {
  const [activeTab, setActiveTab] = useState<"rag" | "cv" | "agents" | "attention">("rag");

  return (
    <section id="ai-playground" className="relative py-24 px-5">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          title="AI PLAYGROUND"
          subtitle="Interactive demonstrations of RAG, Computer Vision, Multi-Agent orchestration, and Attention mechanisms."
        />

        {/* Tab Navigation */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2 sm:gap-4">
          <button
            onClick={() => setActiveTab("rag")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-mono font-semibold transition-all ${
              activeTab === "rag"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30 ring-1 ring-violet-400"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            <Database className="h-4 w-4" /> RAG EXPLORER
          </button>

          <button
            onClick={() => setActiveTab("cv")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-mono font-semibold transition-all ${
              activeTab === "cv"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30 ring-1 ring-violet-400"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            <Eye className="h-4 w-4" /> CV PIPELINE
          </button>

          <button
            onClick={() => setActiveTab("agents")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-mono font-semibold transition-all ${
              activeTab === "agents"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30 ring-1 ring-violet-400"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            <Bot className="h-4 w-4" /> MULTI-AGENT SYSTEM
          </button>

          <button
            onClick={() => setActiveTab("attention")}
            className={`flex items-center gap-2 rounded-xl px-4 py-2.5 text-xs font-mono font-semibold transition-all ${
              activeTab === "attention"
                ? "bg-violet-600 text-white shadow-lg shadow-violet-600/30 ring-1 ring-violet-400"
                : "bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/10"
            }`}
          >
            <Brain className="h-4 w-4" /> ATTENTION VISUALIZER
          </button>
        </div>

        {/* Tab Content Container */}
        <div className="mt-8 rounded-3xl border border-white/10 bg-black/40 p-6 sm:p-8 backdrop-blur-xl shadow-2xl relative overflow-hidden">
          {/* Top Label */}
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
            <span className="text-xs font-mono text-violet-400 flex items-center gap-2">
              <Sparkles className="h-3.5 w-3.5" /> INTERACTIVE SIMULATION MODE
            </span>
            <span className="rounded-full bg-amber-500/10 px-3 py-0.5 text-[10px] font-mono font-semibold text-amber-300 border border-amber-500/20">
              DEMO VISUALIZATION
            </span>
          </div>

          <AnimatePresence mode="wait">
            {activeTab === "rag" && <RAGExplorerDemo key="rag" />}
            {activeTab === "cv" && <CVPipelineDemo key="cv" />}
            {activeTab === "agents" && <MultiAgentDemo key="agents" />}
            {activeTab === "attention" && <AttentionDemo key="attention" />}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

// 1. RAG Explorer Demo
function RAGExplorerDemo() {
  const [selectedQuery, setSelectedQuery] = useState(0);

  const queries = [
    {
      query: "Generate a Grade 8 Science worksheet on Photosynthesis in Kannada",
      chunks: [
        { text: "Doc #104: Chloroplast light reactions & thylakoid membrane setup", sim: "0.94 (DEMO)" },
        { text: "Doc #88: Kannada vocabulary for Botany & Cellular respiration", sim: "0.91 (DEMO)" },
        { text: "Doc #12: Karnataka State Board Science Syllabus Grade 8", sim: "0.88 (DEMO)" },
      ],
      response: "ಕಣಗಳ ಬೆಳಕಿನ ಕ್ರಿಯೆ ಮತ್ತು ದ್ಯುತಿಸಂಶ್ಲೇಷಣೆ ಕುರಿತ 8ನೇ ತರಗತಿ ವಿಜ್ಞಾನ ಕಾರ್ಯಹಾಳೆ ಸಿದ್ಧವಾಗಿದೆ. (Interactive Worksheet Generated with Gemini API + RAG)",
    },
    {
      query: "Retrieve assessment guidelines for online proctoring",
      chunks: [
        { text: "Doc #201: Fullscreen violation & tab switches detection rules", sim: "0.95 (DEMO)" },
        { text: "Doc #154: Multiple face alert thresholds & camera calibration", sim: "0.92 (DEMO)" },
        { text: "Doc #45: Gaze direction threshold tolerance parameters", sim: "0.86 (DEMO)" },
      ],
      response: "Assessment Monitoring Guidelines loaded: Multi-face alerts enabled, Copy-paste restriction enforced, Gaze tracking sensitivity set.",
    },
  ];

  const current = queries[selectedQuery];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Database className="h-5 w-5 text-violet-400" /> RAG RETRIEVAL PIPELINE EXPLORER
        </h3>
        <p className="text-xs text-white/60 mt-1">
          Simulates user query vector embedding, top-k cosine similarity chunk retrieval, and grounded LLM generation.
        </p>
      </div>

      {/* Query Selector */}
      <div className="flex flex-wrap gap-2">
        {queries.map((q, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedQuery(idx)}
            className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all ${
              selectedQuery === idx
                ? "bg-violet-500/20 text-violet-300 border border-violet-500/40 font-semibold"
                : "bg-white/5 text-white/50 border border-white/10 hover:bg-white/10"
            }`}
          >
            Query {idx + 1}
          </button>
        ))}
      </div>

      {/* Pipeline Visual Flow */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
          <div className="font-mono text-[10px] text-violet-400">1. USER QUERY</div>
          <div className="text-white font-medium text-xs">&quot;{current.query}&quot;</div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
          <div className="font-mono text-[10px] text-cyan-400">2. VECTOR EMBEDDING</div>
          <div className="text-white/70 text-[11px] font-mono">
            Gemini Embeddings <br />
            [0.024, -0.118, 0.452, ...]
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
          <div className="font-mono text-[10px] text-emerald-400">3. VECTOR SEARCH</div>
          <div className="text-white/70 text-[11px]">
            PostgreSQL + Prisma <br /> Top-3 Chunk Matches
          </div>
        </div>

        <div className="rounded-xl border border-white/10 bg-white/5 p-4 space-y-2">
          <div className="font-mono text-[10px] text-fuchsia-400">4. GROUNDED ANSWER</div>
          <div className="text-white/70 text-[11px]">Synthesized by Gemini LLM</div>
        </div>
      </div>

      {/* Retrieved Context Chunks */}
      <div className="rounded-xl border border-white/10 bg-black/60 p-4 space-y-3">
        <div className="text-xs font-mono text-white/60 flex items-center justify-between">
          <span>RETRIEVED CONTEXT CHUNKS (SIMULATED)</span>
          <span className="text-[10px] text-amber-300">DEMO VALUES</span>
        </div>

        <div className="space-y-2">
          {current.chunks.map((ch, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-lg bg-white/5 px-3 py-2 text-xs border border-white/5"
            >
              <span className="text-white/80 font-mono">{ch.text}</span>
              <span className="rounded bg-emerald-500/10 px-2 py-0.5 text-[10px] font-mono text-emerald-400 border border-emerald-500/20">
                Similarity: {ch.sim}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* LLM Output Box */}
      <div className="rounded-xl border border-violet-500/30 bg-violet-500/10 p-4 text-xs text-white">
        <div className="font-mono text-[10px] text-violet-300 mb-1">GENERATED LLM RESPONSE</div>
        <div className="font-sans text-xs leading-relaxed text-violet-100">{current.response}</div>
      </div>
    </motion.div>
  );
}

// 2. Computer Vision Pipeline Demo
function CVPipelineDemo() {
  const [stage, setStage] = useState(0);

  const stages = [
    { title: "IMAGE INPUT", desc: "Raw input frame captured via camera or packaging image." },
    { title: "PREPROCESSING", desc: "Grayscale conversion, Gaussian blur, perspective alignment." },
    { title: "FEATURE EXTRACTION", desc: "Bounding box localization & edge gradient feature maps." },
    { title: "EMBEDDING VECTOR", desc: "MobileNetV2 / ResNet feature vector representation." },
    { title: "MATCH & RECOGNITION", desc: "Cosine match against identity / package product database." },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Eye className="h-5 w-5 text-cyan-400" /> COMPUTER VISION &amp; OCR PIPELINE
        </h3>
        <p className="text-xs text-white/60 mt-1">
          Demonstrates image preprocessing, bounding box localization, feature embeddings, and classification.
        </p>
      </div>

      {/* Pipeline Steps Interactive Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        {stages.map((st, i) => (
          <button
            key={i}
            onClick={() => setStage(i)}
            className={`rounded-xl border p-3 text-left transition-all ${
              stage === i
                ? "border-cyan-400 bg-cyan-500/20 text-white shadow-lg shadow-cyan-500/20"
                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            <div className="text-[9px] font-mono text-cyan-400">STAGE 0{i + 1}</div>
            <div className="text-xs font-bold mt-1 text-white truncate">{st.title}</div>
          </button>
        ))}
      </div>

      {/* Active Stage Simulation Visual */}
      <div className="rounded-xl border border-white/10 bg-black/60 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-3 max-w-md">
          <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-xs font-mono text-cyan-300 border border-cyan-500/30">
            {stages[stage].title}
          </span>
          <p className="text-xs text-white/80 leading-relaxed">{stages[stage].desc}</p>
          <div className="text-[11px] font-mono text-amber-300/80">
            SIMULATED PIPELINE OUTPUT · DEMO VISUALIZATION
          </div>
        </div>

        <div className="w-full md:w-64 h-40 rounded-lg border border-cyan-500/30 bg-cyan-950/20 flex flex-col items-center justify-center p-4 relative overflow-hidden">
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f2937_1px,transparent_1px),linear-gradient(to_bottom,#1f2937_1px,transparent_1px)] bg-[size:16px_16px] opacity-30" />

          <div className="relative z-10 flex flex-col items-center text-center space-y-2">
            <Cpu className="h-8 w-8 text-cyan-400 animate-pulse" />
            <div className="text-xs font-mono font-bold text-white">{stages[stage].title}</div>
            <div className="text-[10px] font-mono text-cyan-300">PROCESSING FRAME #104</div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}

// 3. Multi-Agent System Demo
function MultiAgentDemo() {
  const [activeAgent, setActiveAgent] = useState<"tutor" | "worksheet" | "memory">("tutor");

  const agents = {
    tutor: {
      name: "Tutor Agent",
      role: "Interactive Tutoring & Concept Clarification",
      action: "Retrieves RAG curriculum chunks and generates Socratic explanations in student's preferred language.",
    },
    worksheet: {
      name: "Worksheet Agent",
      role: "Automated Assessment & Practice Generator",
      action: "Structures customized multi-level practice worksheets with questions, solutions, and rubric guidelines.",
    },
    memory: {
      name: "Memory Agent",
      role: "Context & Classroom History Management",
      action: "Persists student learning state and past performance metrics across sessions in PostgreSQL database.",
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Bot className="h-5 w-5 text-emerald-400" /> MULTI-AGENT SYSTEM ORCHESTRATION
        </h3>
        <p className="text-xs text-white/60 mt-1">
          Demonstrates how the central Orchestrator delegates tasks to specialized AI agents in SAHAYAK.
        </p>
      </div>

      {/* Network Graph Visual */}
      <div className="rounded-xl border border-white/10 bg-black/60 p-6 flex flex-col items-center justify-center space-y-6">
        <div className="rounded-xl bg-violet-600/20 border border-violet-500/40 px-6 py-2.5 text-xs font-mono font-bold text-white flex items-center gap-2">
          <Sliders className="h-4 w-4 text-violet-400" /> CENTRAL ORCHESTRATOR
        </div>

        <div className="h-8 w-px bg-gradient-to-b from-violet-500 to-white/20" />

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
          {(["tutor", "worksheet", "memory"] as const).map((key) => {
            const ag = agents[key];
            const isSelected = activeAgent === key;
            return (
              <button
                key={key}
                onClick={() => setActiveAgent(key)}
                className={`rounded-xl border p-4 text-left transition-all ${
                  isSelected
                    ? "border-emerald-400 bg-emerald-500/20 text-white shadow-lg shadow-emerald-500/20"
                    : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
                }`}
              >
                <div className="text-xs font-bold text-white flex items-center gap-2">
                  <Bot className={`h-4 w-4 ${isSelected ? "text-emerald-400" : "text-white/40"}`} />
                  {ag.name}
                </div>
                <div className="text-[10px] text-white/50 mt-1">{ag.role}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Agent Detail Panel */}
      <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs text-white">
        <div className="font-mono text-[10px] text-emerald-300 mb-1">
          ACTIVE AGENT: {agents[activeAgent].name.toUpperCase()}
        </div>
        <p className="text-xs text-emerald-100 leading-relaxed">{agents[activeAgent].action}</p>
        <div className="mt-2 text-[10px] font-mono text-amber-300/80">
          DEMO SIMULATION · MULTI-AGENT ARCHITECTURE
        </div>
      </div>
    </motion.div>
  );
}

// 4. Attention Visualizer Demo
function AttentionDemo() {
  const [selectedWord, setSelectedWord] = useState(2); // "photosynthesis"

  const tokens = ["Generative", "AI", "photosynthesis", "RAG", "models", "embeddings"];
  const matrix = [
    [0.9, 0.4, 0.2, 0.3, 0.1, 0.2],
    [0.4, 0.8, 0.3, 0.4, 0.2, 0.3],
    [0.2, 0.3, 0.95, 0.7, 0.5, 0.8], // "photosynthesis"
    [0.3, 0.4, 0.7, 0.9, 0.4, 0.6],
    [0.1, 0.2, 0.5, 0.4, 0.8, 0.5],
    [0.2, 0.3, 0.8, 0.6, 0.5, 0.9],
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className="space-y-6"
    >
      <div>
        <h3 className="text-lg font-bold text-white flex items-center gap-2">
          <Brain className="h-5 w-5 text-fuchsia-400" /> TRANSFORMER SELF-ATTENTION VISUALIZER
        </h3>
        <p className="text-xs text-white/60 mt-1">
          Click tokens to observe self-attention weight distribution across input sequence tokens.
        </p>
      </div>

      {/* Token Selector */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="text-xs font-mono text-white/50 mr-2">Tokens:</span>
        {tokens.map((t, idx) => (
          <button
            key={idx}
            onClick={() => setSelectedWord(idx)}
            className={`rounded-lg px-3 py-1.5 text-xs font-mono transition-all ${
              selectedWord === idx
                ? "bg-fuchsia-600 text-white font-bold shadow-lg shadow-fuchsia-600/30"
                : "bg-white/5 text-white/70 border border-white/10 hover:bg-white/10"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      {/* Attention Heatmap Bar */}
      <div className="rounded-xl border border-white/10 bg-black/60 p-5 space-y-4">
        <div className="text-xs font-mono text-white/60">
          ATTENTION WEIGHTS FOR TOKEN: <span className="text-fuchsia-300 font-bold">&quot;{tokens[selectedWord]}&quot;</span>
        </div>

        <div className="space-y-2">
          {tokens.map((t, targetIdx) => {
            const weight = matrix[selectedWord][targetIdx];
            return (
              <div key={targetIdx} className="flex items-center gap-3 text-xs">
                <span className="w-24 font-mono text-white/70 text-right truncate">{t}</span>
                <div className="flex-1 h-3 rounded-full bg-white/10 overflow-hidden relative">
                  <div
                    className="h-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-400 transition-all duration-300"
                    style={{ width: `${weight * 100}%` }}
                  />
                </div>
                <span className="w-12 font-mono text-[10px] text-fuchsia-300">
                  {(weight * 100).toFixed(0)}%
                </span>
              </div>
            );
          })}
        </div>

        <div className="text-[10px] font-mono text-amber-300/80 pt-2 border-t border-white/5">
          SIMULATED ATTENTION MATRIX · EDUCATIONAL DEMO
        </div>
      </div>
    </motion.div>
  );
}
