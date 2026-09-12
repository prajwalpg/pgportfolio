'use client';

import { Github, Linkedin, Mail, ArrowUp } from "lucide-react";
import { profile } from "@/lib/portfolio-data";

export default function Footer() {
  return (
    <footer className="relative mt-auto border-t border-white/5 bg-black/30">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-5 py-10 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-blue-500/30 text-xs font-bold tracking-wider text-white ring-1 ring-white/10">
            PG
          </span>
          <div>
            <div className="text-sm font-semibold text-white">
              {profile.name}
            </div>
            <div className="text-xs text-white/45">
              {profile.role} · {profile.tagline}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="grid h-9 w-9 place-items-center rounded-lg text-white/60 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Github className="h-4 w-4" />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="grid h-9 w-9 place-items-center rounded-lg text-white/60 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Linkedin className="h-4 w-4" />
          </a>
          <a
            href={`mailto:${profile.email}`}
            aria-label="Email"
            className="grid h-9 w-9 place-items-center rounded-lg text-white/60 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white"
          >
            <Mail className="h-4 w-4" />
          </a>
          <a
            href="#hero"
            aria-label="Back to top"
            className="ml-1 grid h-9 w-9 place-items-center rounded-lg bg-white/5 text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/10 hover:text-white"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>

      <div className="border-t border-white/5 px-5 py-5 text-center text-[11px] text-white/35">
        © {new Date().getFullYear()} {profile.name}. Built with Next.js, Tailwind
        CSS &amp; Framer Motion.
      </div>
    </footer>
  );
}
