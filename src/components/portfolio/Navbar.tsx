'use client';

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Github, Linkedin, Menu, X, Cpu, Zap } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { useInferenceMode } from "./InferenceModeContext";

const NAV_LINKS = [
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#experience", label: "Experience" },
  { href: "#education", label: "Education" },
  { href: "#achievements", label: "Achievements" },
  { href: "#certifications", label: "Certifications" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("#about");
  const { inferenceMode, toggleInferenceMode } = useInferenceMode();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.href.slice(1));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(`#${e.target.id}`);
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-xl bg-black/50 border-b border-white/10"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 py-3.5">
        <a
          href="#hero"
          className="group flex items-center gap-2.5"
          aria-label="Prajwal PG home"
        >
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-violet-500/40 to-blue-500/40 text-sm font-bold tracking-wider text-white ring-1 ring-white/15">
            PG
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-cyan-400 pulse-glow" />
          </span>
          <span className="hidden text-sm font-medium tracking-wide text-white/80 sm:block">
            Prajwal PG
            <span className="ml-2 text-xs text-cyan-300 font-mono">/ AI Engineer</span>
          </span>
        </a>

        {/* Section Links */}
        <div className="hidden items-center gap-1 xl:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className={`relative rounded-md px-2.5 py-1.5 text-xs font-medium transition-colors ${
                active === link.href
                  ? "text-white"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {link.label}
              {active === link.href && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 -z-10 rounded-md bg-white/10 ring-1 ring-white/15"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Controls & Social Links */}
        <div className="flex items-center gap-2">
          {/* Inference Mode Switch Button */}
          <button
            onClick={toggleInferenceMode}
            title="Toggle Inference Mode"
            className={`hidden sm:inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 font-mono text-xs font-bold transition-all ${
              inferenceMode
                ? "border-cyan-400/50 bg-cyan-500/20 text-cyan-300 shadow-md shadow-cyan-500/20"
                : "border-white/10 bg-white/5 text-white/60 hover:bg-white/10"
            }`}
          >
            <Zap className={`h-3.5 w-3.5 ${inferenceMode ? "text-cyan-300 animate-pulse" : ""}`} />
            <span>INFERENCE {inferenceMode ? "ON" : "OFF"}</span>
          </button>

          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="hidden h-9 w-9 place-items-center rounded-lg text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white sm:grid"
          >
            <Github className="h-4 w-4" />
          </a>

          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="hidden h-9 w-9 place-items-center rounded-lg text-white/70 ring-1 ring-white/10 transition-colors hover:bg-white/5 hover:text-white sm:grid"
          >
            <Linkedin className="h-4 w-4 text-blue-400" />
          </a>

          <a
            href="#contact"
            className="hidden rounded-lg bg-gradient-to-r from-violet-500 to-blue-500 px-4 py-2 text-sm font-medium text-white shadow-lg shadow-violet-500/20 transition-transform hover:scale-[1.02] sm:inline-block"
          >
            Contact
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={open}
            className="grid h-9 w-9 place-items-center rounded-lg text-white/80 ring-1 ring-white/10 xl:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-white/5 bg-black/90 backdrop-blur-xl xl:hidden"
          >
            <div className="flex flex-col gap-1 px-5 py-3">
              <button
                onClick={() => {
                  toggleInferenceMode();
                  setOpen(false);
                }}
                className="mb-2 flex items-center justify-between rounded-md bg-cyan-500/15 p-2 text-xs font-mono text-cyan-300"
              >
                <span>INFERENCE MODE</span>
                <span className="font-bold">{inferenceMode ? "ENABLED" : "DISABLED"}</span>
              </button>

              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="rounded-md px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
