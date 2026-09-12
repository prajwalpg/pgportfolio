'use client';

import { motion } from "framer-motion";
import {
  Code2,
  Brain,
  Sparkles,
  Eye,
  Server,
  Layout,
  type LucideIcon,
} from "lucide-react";
import SectionHeading from "./SectionHeading";
import { skillGroups } from "@/lib/portfolio-data";

const ICONS: Record<string, LucideIcon> = {
  code: Code2,
  brain: Brain,
  sparkles: Sparkles,
  eye: Eye,
  server: Server,
  layout: Layout,
};

export default function Skills() {
  return (
    <section id="skills" className="section-anchor relative py-24">
      {/* subtle top divider */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-6xl px-5">
        <SectionHeading
          eyebrow="Skills & Stack"
          title={
            <>
              The toolkit I use to ship{" "}
              <span className="gradient-text">AI products end-to-end</span>.
            </>
          }
          description="From model training to deployable APIs and the React front-ends that make AI feel real to users."
        />

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((group, i) => {
            const Icon = ICONS[group.icon] ?? Code2;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="glass glow-border group relative overflow-hidden rounded-2xl p-5 transition-transform duration-300 hover:-translate-y-1"
              >
                <div className="pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-violet-500/10 to-blue-500/5 blur-2xl transition-opacity duration-300 group-hover:opacity-100 opacity-50" />

                <div className="relative flex items-center gap-3">
                  <div className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-blue-500/20 ring-1 ring-white/10">
                    <Icon className="h-5 w-5 text-violet-200" />
                  </div>
                  <h3 className="text-sm font-semibold tracking-wide text-white">
                    {group.title}
                  </h3>
                </div>

                <div className="relative mt-4 flex flex-wrap gap-1.5">
                  {group.skills.map((skill) => (
                    <span
                      key={skill}
                      className="inline-flex items-center rounded-md border border-white/8 bg-white/4 px-2.5 py-1 text-xs font-medium text-white/65 transition-colors hover:border-violet-400/30 hover:bg-violet-500/10 hover:text-white"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
