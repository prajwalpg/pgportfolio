'use client';

import { useState } from "react";
import { motion } from "framer-motion";
import { Network, Bot, BookOpen, Brain, ShieldCheck, Cpu } from "lucide-react";

interface AgentNode {
  id: string;
  name: string;
  role: string;
  desc: string;
  icon: any;
  color: string;
}

const AGENTS: AgentNode[] = [
  {
    id: "orchestrator",
    name: "Orchestrator Agent",
    role: "Central Task Router",
    desc: "Routes student queries, coordinates sub-agent workflows, and handles multi-turn conversation flow.",
    icon: Cpu,
    color: "from-violet-500 to-purple-600",
  },
  {
    id: "tutor",
    name: "Tutor Agent",
    role: "Interactive Educator",
    desc: "Provides step-by-step multilingual explanations tailored to grade levels and curriculum guidelines.",
    icon: Bot,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: "worksheet",
    name: "Worksheet Agent",
    role: "Exercise Generator",
    desc: "Generates custom worksheets, quizzes, and practice problems in 12+ Indian languages.",
    icon: BookOpen,
    color: "from-emerald-500 to-teal-600",
  },
  {
    id: "memory",
    name: "Classroom Memory",
    role: "Context & History",
    desc: "Maintains classroom state, student progress memory, and personalized learning history.",
    icon: Brain,
    color: "from-amber-500 to-orange-600",
  },
  {
    id: "proctor",
    name: "Proctoring & Attendance",
    role: "Integrity & Facial Auth",
    desc: "Handles AI-powered proctoring and facial-recognition attendance tracking.",
    icon: ShieldCheck,
    color: "from-fuchsia-500 to-pink-600",
  },
];

export default function MultiAgentGraphVisual() {
  const [activeAgent, setActiveAgent] = useState<AgentNode>(AGENTS[0]);

  return (
    <div className="glass-strong glow-border relative overflow-hidden rounded-3xl p-6 sm:p-7">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 pb-4">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-fuchsia-500/20 ring-1 ring-white/15">
            <Network className="h-5 w-5 text-fuchsia-300" />
          </div>
          <div>
            <h4 className="text-base font-bold text-white">SAHAYAK — Multi-Agent Network Architecture</h4>
            <p className="text-xs text-white/55">
              Collaborative Specialized Agents for AI Tutoring, Worksheets, Memory &amp; Proctoring
            </p>
          </div>
        </div>

        <span className="rounded-full border border-fuchsia-400/30 bg-fuchsia-500/10 px-3 py-1 text-xs font-mono font-semibold text-fuchsia-300">
          Multi-Agent AI
        </span>
      </div>

      {/* Agents Network Display */}
      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {AGENTS.map((agent) => {
          const isActive = activeAgent.id === agent.id;
          const Icon = agent.icon;
          return (
            <motion.div
              key={agent.id}
              onClick={() => setActiveAgent(agent)}
              whileHover={{ scale: 1.02 }}
              className={`interactive-node cursor-pointer rounded-2xl border p-4 transition-all ${
                isActive
                  ? "border-fuchsia-400 bg-fuchsia-500/20 shadow-lg shadow-fuchsia-500/20 ring-1 ring-fuchsia-400/40"
                  : "border-white/8 bg-black/40 hover:bg-white/5"
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${agent.color} text-white shadow-md`}>
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">{agent.name}</h5>
                  <span className="text-[11px] font-mono text-fuchsia-300/80">{agent.role}</span>
                </div>
              </div>

              <p className="mt-3 text-xs leading-relaxed text-white/70">
                {agent.desc}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
