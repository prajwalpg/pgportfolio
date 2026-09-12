'use client';

import { motion } from "framer-motion";
import { Briefcase, ChevronRight, CalendarDays } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { experiences } from "@/lib/portfolio-data";

export default function Experience() {
  return (
    <section id="experience" className="section-anchor relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Experience"
          title={
            <>
              Where I&apos;ve{" "}
              <span className="gradient-text">built for production</span>.
            </>
          }
          description="Internships and roles where I shipped AI products to real users."
        />

        <div className="relative">
          {/* Vertical line */}
          <div
            className="pointer-events-none absolute left-[19px] top-2 bottom-2 w-px bg-gradient-to-b from-violet-500/40 via-white/10 to-transparent sm:left-[27px]"
            aria-hidden
          />

          <div className="flex flex-col gap-5">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.company + exp.period}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="relative pl-12 sm:pl-16"
              >
                {/* Marker */}
                <span className="absolute left-0 top-1 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-blue-500/20 ring-1 ring-white/10 sm:h-14 sm:w-14">
                  <Briefcase className="h-4 w-4 text-violet-200 sm:h-5 sm:w-5" />
                </span>

                <div className="glass-strong glow-border overflow-hidden rounded-2xl p-6">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        {exp.role}
                      </h3>
                      <div className="mt-0.5 text-sm font-medium text-violet-200/80">
                        {exp.company}
                      </div>
                    </div>
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/8 bg-black/30 px-2.5 py-1 text-[11px] font-medium text-white/60 backdrop-blur">
                      <CalendarDays className="h-3 w-3" />
                      {exp.period}
                    </span>
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-white/65">
                    {exp.description}
                  </p>

                  <ul className="mt-4 grid gap-2">
                    {exp.bullets.map((b) => (
                      <li
                        key={b}
                        className="flex items-start gap-2 text-[13px] leading-relaxed text-white/70"
                      >
                        <ChevronRight className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-violet-400" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
