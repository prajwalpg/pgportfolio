'use client';

import { motion } from "framer-motion";
import { Trophy, Award, Medal, CheckCircle2 } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { achievements } from "@/lib/portfolio-data";

export default function Achievements() {
  return (
    <section id="achievements" className="section-anchor relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Achievements & Honors"
          title={
            <>
              Recognitions & <span className="gradient-text">Competitions</span>.
            </>
          }
          description="Hackathon awards and leadership credentials from my engineering journey."
        />

        <div className="grid gap-6 md:grid-cols-2">
          {achievements.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass-strong glow-border group relative flex flex-col justify-between overflow-hidden rounded-3xl p-7 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute -right-12 -top-12 h-36 w-36 rounded-full bg-amber-500/10 blur-3xl opacity-60 transition-opacity group-hover:opacity-100" />

              <div>
                <div className="flex items-center justify-between gap-2">
                  <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-amber-500/30 to-orange-500/20 ring-1 ring-white/10">
                    {i === 0 ? (
                      <Trophy className="h-6 w-6 text-amber-300" />
                    ) : (
                      <Medal className="h-6 w-6 text-emerald-300" />
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
                    <Award className="h-3.5 w-3.5" />
                    {item.focus}
                  </span>
                </div>

                <h3 className="mt-5 text-xl font-bold tracking-tight text-white">
                  {item.title}
                </h3>
                <p className="mt-1 text-xs font-semibold text-white/50">
                  {item.issuer}
                </p>

                <p className="mt-4 text-xs leading-relaxed text-white/75 sm:text-sm">
                  {item.description}
                </p>
              </div>

              <div className="mt-6 flex items-center gap-2 border-t border-white/10 pt-4 text-xs font-medium text-white/60">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
                <span>Verified Resume Achievement</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
