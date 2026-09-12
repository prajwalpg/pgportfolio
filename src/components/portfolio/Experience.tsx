'use client';

import { motion } from "framer-motion";
import { Briefcase, ChevronRight, CalendarDays, Building2, Cpu, Database } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { experiences } from "@/lib/portfolio-data";

export default function Experience() {
  return (
    <section id="experience" className="section-anchor relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Internships & Pipeline Timeline"
          title={
            <>
              Practical AI &amp; Engineering{" "}
              <span className="gradient-text">Internship Pipeline</span>.
            </>
          }
          description="Timeline of AI engineering internships at HirePro Technologies and Runshaw Technologies."
        />

        <div className="relative">
          {/* Vertical pipeline line */}
          <div
            className="pointer-events-none absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/50 via-cyan-500/40 to-emerald-500/20 sm:left-[27px]"
            aria-hidden
          />

          <div className="flex flex-col gap-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company + exp.period}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="relative pl-12 sm:pl-16"
              >
                {/* Active node marker */}
                <span className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-cyan-500/30 ring-1 ring-white/15 shadow-lg sm:h-14 sm:w-14">
                  {i === 0 ? (
                    <Cpu className="h-4 w-4 text-cyan-300 sm:h-5 sm:w-5" />
                  ) : (
                    <Database className="h-4 w-4 text-emerald-300 sm:h-5 sm:w-5" />
                  )}
                </span>

                <div className="glass-strong glow-border overflow-hidden rounded-3xl p-6 sm:p-7">
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div>
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-violet-300" />
                        <span className="text-sm font-semibold text-violet-200">
                          {exp.company}
                        </span>
                        <span className="rounded-full border border-violet-400/20 bg-violet-500/10 px-2 py-0.5 text-[10px] font-mono font-medium text-violet-300 uppercase tracking-wider">
                          Pipeline Node #{i + 1}
                        </span>
                      </div>
                      <h3 className="mt-1 text-xl font-bold text-white">
                        {exp.role}
                      </h3>
                    </div>

                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-black/40 px-3 py-1 text-xs font-mono font-medium text-white/70 backdrop-blur">
                      <CalendarDays className="h-3.5 w-3.5 text-violet-300" />
                      {exp.period}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-white/75">
                    {exp.description}
                  </p>

                  <ul className="mt-4 grid gap-2">
                    {exp.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2.5 text-xs leading-relaxed text-white/80 sm:text-sm"
                      >
                        <ChevronRight className="mt-0.5 h-4 w-4 flex-shrink-0 text-violet-400" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack tags */}
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-white/10 pt-4">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center rounded-md border border-white/8 bg-white/4 px-2.5 py-0.5 text-[11px] font-mono font-medium text-white/70"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
