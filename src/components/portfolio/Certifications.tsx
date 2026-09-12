'use client';

import { motion } from "framer-motion";
import { Award, BadgeCheck } from "lucide-react";
import SectionHeading from "./SectionHeading";
import { certifications } from "@/lib/portfolio-data";

export default function Certifications() {
  return (
    <section id="certifications" className="section-anchor relative py-24">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Certifications"
          title={
            <>
              Verified Technical{" "}
              <span className="gradient-text">Certifications</span>.
            </>
          }
          description="Certifications across Generative AI, Azure DevOps, Networking, and Leadership."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className="glass glow-border group relative flex flex-col justify-between overflow-hidden rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
            >
              <div className="pointer-events-none absolute -right-8 -top-8 h-24 w-24 rounded-full bg-violet-500/10 blur-2xl opacity-60 transition-opacity group-hover:opacity-100" />

              <div>
                <div className="relative flex items-start justify-between gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-blue-500/20 ring-1 ring-white/10">
                    <Award className="h-5 w-5 text-violet-200" />
                  </div>
                  <span className="rounded-full border border-white/8 bg-black/30 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-white/55">
                    {cert.year}
                  </span>
                </div>

                <h3 className="relative mt-4 text-sm font-semibold leading-snug text-white">
                  {cert.title}
                </h3>
                <div className="relative mt-1 text-xs text-white/55">
                  {cert.issuer}
                </div>
              </div>

              <div className="relative mt-4 flex flex-wrap gap-1.5 border-t border-white/8 pt-3">
                {cert.skills.map((s) => (
                  <span
                    key={s}
                    className="inline-flex items-center gap-1 rounded-md border border-white/8 bg-white/4 px-2 py-0.5 text-[10px] font-medium text-white/60"
                  >
                    <BadgeCheck className="h-2.5 w-2.5 text-emerald-400/80" />
                    {s}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
