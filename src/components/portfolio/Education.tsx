'use client';

import { motion } from "framer-motion";
import { GraduationCap, CalendarDays, Award, MapPin, ArrowRight } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { educationList } from "@/lib/portfolio-data";

export default function Education() {
  return (
    <section id="education" className="section-anchor relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Education & Progression"
          title={
            <>
              Academic Journey &amp; <span className="gradient-text">AI Foundation</span>.
            </>
          }
          description="Educational progression in Computer Science, Artificial Intelligence, and Machine Learning."
        />

        {/* Progression Chain Indicator */}
        <div className="mb-6 flex flex-wrap items-center justify-center gap-3 font-mono text-xs text-violet-300">
          <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1">
            Diploma CSE (CPC Polytechnic)
          </span>
          <ArrowRight className="h-4 w-4 text-cyan-400" />
          <span className="rounded-full border border-violet-400/30 bg-violet-500/20 px-3 py-1 font-bold text-white">
            B.E. CSE AIML (PES College of Engg)
          </span>
          <ArrowRight className="h-4 w-4 text-cyan-400" />
          <span className="rounded-full border border-emerald-400/30 bg-emerald-500/20 px-3 py-1 text-emerald-300 font-bold">
            AI Engineer
          </span>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {educationList.map((edu, i) => (
            <motion.div
              key={edu.degree + edu.institution}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-strong glow-border group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-violet-500/10 blur-3xl opacity-60 transition-opacity group-hover:opacity-100" />

              <div>
                {/* Header Badge */}
                <div className="flex items-center justify-between gap-2">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-violet-500/30 to-blue-500/20 ring-1 ring-white/10">
                    <GraduationCap className="h-6 w-6 text-violet-200" />
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-black/30 px-3 py-1 text-xs font-mono font-medium text-white/70 backdrop-blur">
                    <CalendarDays className="h-3.5 w-3.5 text-violet-300" />
                    {edu.period}
                  </span>
                </div>

                {/* Degree & Field */}
                <h3 className="mt-5 text-xl font-bold tracking-tight text-white">
                  {edu.degree}
                </h3>
                <p className="mt-1 text-sm font-semibold text-violet-300">
                  {edu.field}
                </p>

                {/* Institution */}
                <div className="mt-4 flex items-center gap-2 text-xs font-medium text-white/75 sm:text-sm">
                  <MapPin className="h-4 w-4 text-white/40 flex-shrink-0" />
                  <span>{edu.institution}</span>
                </div>
              </div>

              {/* Score / CGPA */}
              <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4">
                <Award className="h-4 w-4 text-emerald-400" />
                <span className="text-xs font-mono font-semibold text-emerald-300 sm:text-sm">
                  {edu.score}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
