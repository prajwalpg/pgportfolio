'use client';

import { useState, useEffect } from "react";
import { Github, Linkedin, Mail, ArrowUp, Sparkles, Activity, MessageSquare } from "lucide-react";
import { profile } from "@/lib/portfolio-data";
import { recordVisit, getPublicGuestbookEntries } from "@/lib/actions/visitor";
import { motion, AnimatePresence } from "framer-motion";
import GuestbookModal from "./GuestbookModal";

export default function Footer() {
  const [visitorCount, setVisitorCount] = useState<number | null>(null);
  const [isOffline, setIsOffline] = useState(false);
  const [guestbookOpen, setGuestbookOpen] = useState(false);
  const [publicGuestbook, setPublicGuestbook] = useState<{
    enabled: boolean;
    entries: { id: string; name: string; message: string | null; createdAt: Date }[];
  }>({ enabled: false, entries: [] });

  useEffect(() => {
    async function initVisitorData() {
      // 1. Record visit and get persistent server count
      const res = await recordVisit();
      if (res.success) {
        setVisitorCount(res.count);
      } else {
        setIsOffline(true);
      }

      // 2. Fetch public guestbook if enabled by owner
      const gbRes = await getPublicGuestbookEntries();
      if (gbRes.enabled && gbRes.entries) {
        setPublicGuestbook({ enabled: true, entries: gbRes.entries });
      }
    }

    initVisitorData();
  }, []);

  return (
    <>
      <footer className="relative mt-auto border-t border-white/10 bg-[#06060c] text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />

        <div className="mx-auto max-w-6xl px-5 py-12">
          {/* Main Footer Layout */}
          <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:items-start">
            {/* Owner Info & Role */}
            <div className="md:col-span-4 space-y-3">
              <div className="flex items-center gap-3">
                <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-violet-500/30 to-blue-500/30 text-xs font-bold tracking-wider text-white ring-1 ring-white/15">
                  PG
                </span>
                <div>
                  <div className="text-base font-bold tracking-wide text-white">
                    {profile.name}
                  </div>
                  <div className="text-xs font-mono text-violet-400">
                    {profile.role} · {profile.location}
                  </div>
                </div>
              </div>
              <p className="text-xs text-white/50 leading-relaxed max-w-xs">
                Generative AI • RAG • AI Agents • Computer Vision • OCR
              </p>
            </div>

            {/* AI Visitor Status Area */}
            <div className="md:col-span-5 rounded-2xl border border-white/10 bg-white/[0.03] p-5 space-y-4 backdrop-blur-md">
              <div className="flex items-center justify-between border-b border-white/10 pb-3 text-xs font-mono">
                <span className="text-violet-400 flex items-center gap-2">
                  <Activity className="h-3.5 w-3.5 animate-pulse" /> SYSTEM OBSERVATIONS
                </span>
                <span className="flex items-center gap-1.5 text-emerald-400 font-semibold">
                  <span className="h-2 w-2 rounded-full bg-emerald-400 animate-ping" /> ONLINE
                </span>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] font-mono text-white/50">PORTFOLIO VISITORS</div>
                  <div className="text-2xl font-bold font-mono text-white tracking-wider mt-0.5">
                    {isOffline ? (
                      <span className="text-xs text-amber-400 font-sans">
                        SYSTEM ANALYTICS OFFLINE
                      </span>
                    ) : visitorCount !== null ? (
                      <motion.span
                        key={visitorCount}
                        initial={{ opacity: 0, y: -5 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4 }}
                      >
                        {visitorCount.toLocaleString()}
                      </motion.span>
                    ) : (
                      <span className="text-xs text-white/30 animate-pulse">CONNECTING...</span>
                    )}
                  </div>
                </div>

                <button
                  onClick={() => setGuestbookOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600/20 border border-violet-500/40 px-3.5 py-2 text-xs font-mono font-semibold text-violet-300 hover:bg-violet-600/30 transition-all shadow-md shadow-violet-600/10"
                >
                  <Sparkles className="h-3.5 w-3.5" /> LEAVE YOUR MARK
                </button>
              </div>
            </div>

            {/* Social Links & Back To Top */}
            <div className="md:col-span-3 flex flex-col md:items-end justify-between space-y-4">
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
          </div>

          {/* Optional Public Guestbook Section */}
          {publicGuestbook.enabled && publicGuestbook.entries.length > 0 && (
            <div className="mt-8 rounded-xl border border-white/10 bg-black/40 p-4">
              <div className="text-xs font-mono text-violet-400 mb-2 flex items-center gap-2">
                <MessageSquare className="h-3.5 w-3.5" /> RECENT VISITORS
              </div>
              <div className="flex flex-wrap gap-4 text-xs">
                {publicGuestbook.entries.map((entry) => (
                  <div key={entry.id} className="rounded-lg bg-white/5 px-3 py-1.5 border border-white/5">
                    <span className="font-semibold text-white">{entry.name}</span>
                    {entry.message && (
                      <span className="text-white/60"> — &quot;{entry.message}&quot;</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Copyright Row */}
          <div className="mt-8 border-t border-white/5 pt-6 text-center text-[11px] text-white/35">
            © {new Date().getFullYear()} {profile.name}. AI Engineer · Mysore, India. Built with Next.js, Tailwind CSS &amp; Framer Motion.
          </div>
        </div>
      </footer>

      {/* Optional Voluntary Guestbook Modal */}
      <GuestbookModal isOpen={guestbookOpen} onClose={() => setGuestbookOpen(false)} />
    </>
  );
}
