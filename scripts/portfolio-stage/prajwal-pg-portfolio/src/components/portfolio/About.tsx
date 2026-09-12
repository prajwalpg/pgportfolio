'use client';

import { motion } from "framer-motion";
import { GraduationCap, Target, MapPin, Cpu, Code2, Layers } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { profile } from "@/lib/portfolio-data";

const FOCUS = [
  { icon: Cpu, label: "GenAI / RAG systems" },
  { icon: Code2, label: "Computer Vision in browsers" },
  { icon: Layers, label: "Full-stack AI products" },
];

export default function About() {
  return (
    <section id="about" className="section-anchor relative py-24">
      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="About Me"
          title={
            <>
              CSE-AIML student building{" "}
              <span className="gradient-text">production-grade AI</span>.
            </>
          }
          description="I blend ML theory with engineering reality — clean code, real datasets, shipped to users."
        />

        <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
          {/* Narrative card */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5 }}
            className="glass-strong glow-border relative overflow-hidden rounded-3xl p-7 lg:col-span-2"
          >
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-violet-500/10 blur-3xl" />

            <div className="relative space-y-5 text-[15px] leading-relaxed text-white/75">
              {profile.about.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>

            <div className="relative mt-7 flex flex-wrap gap-2">
              {FOCUS.map((f) => (
                <span
                  key={f.label}
                  className="inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/4 px-3 py-1.5 text-xs font-medium text-white/70"
                >
                  <f.icon className="h-3.5 w-3.5 text-violet-400" />
                  {f.label}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Side card: facts + goal */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col gap-4"
          >
            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-blue-500/20 ring-1 ring-white/10">
                  <GraduationCap className="h-5 w-5 text-violet-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    CSE — Artificial Intelligence & Machine Learning
                  </div>
                  <div className="text-xs text-white/50">
                    B.E. / B.Tech, ongoing
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-cyan-500/30 to-blue-500/20 ring-1 ring-white/10">
                  <Target className="h-5 w-5 text-cyan-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    Career goal
                  </div>
                  <div className="text-xs leading-relaxed text-white/55">
                    Ship AI/ML systems where evaluation, latency, and UX matter
                    as much as accuracy.
                  </div>
                </div>
              </div>
            </div>

            <div className="glass rounded-3xl p-6">
              <div className="flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl bg-gradient-to-br from-emerald-500/30 to-teal-500/20 ring-1 ring-white/10">
                  <MapPin className="h-5 w-5 text-emerald-300" />
                </div>
                <div>
                  <div className="text-sm font-semibold text-white">
                    {profile.location}
                  </div>
                  <div className="text-xs text-white/50">
                    Open to remote · relocate
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
