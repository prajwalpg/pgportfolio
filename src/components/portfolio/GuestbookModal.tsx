'use client';

import { useState } from "react";
import { submitGuestbook } from "@/lib/actions/visitor";
import { X, Check, Radio, Shield, Send, Sparkles } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function GuestbookModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [consentStored, setConsentStored] = useState(false);
  const [publicConsent, setPublicConsent] = useState(false);
  const [honeypot, setHoneypot] = useState("");
  const [status, setStatus] = useState<"IDLE" | "SUBMITTING" | "SUCCESS" | "ERROR">("IDLE");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [submittedName, setSubmittedName] = useState("");
  const [animationStep, setAnimationStep] = useState<number>(0);

  if (!isOpen) return null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!consentStored) return;

    setStatus("SUBMITTING");
    setErrorMessage(null);

    const res = await submitGuestbook({
      name,
      message,
      publicConsent,
      honeypot,
    });

    if (res.success && res.name) {
      setSubmittedName(res.name);
      setStatus("SUCCESS");

      // Animate identity signal steps
      setAnimationStep(1); // VISITOR SIGNAL RECEIVED
      setTimeout(() => setAnimationStep(2), 1200); // IDENTITY PROVIDED
      setTimeout(() => setAnimationStep(3), 2400); // THANK YOU, [NAME]
    } else {
      setStatus("ERROR");
      setErrorMessage(res.error || "Failed to submit. Please try again.");
    }
  }

  function handleResetAndClose() {
    setName("");
    setMessage("");
    setConsentStored(false);
    setPublicConsent(false);
    setStatus("IDLE");
    setAnimationStep(0);
    onClose();
  }

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="relative w-full max-w-md overflow-hidden rounded-2xl border border-white/10 bg-[#0c0c16] p-6 shadow-2xl"
        >
          {/* Top border glowing gradient */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-violet-500 via-fuchsia-500 to-cyan-500" />

          {/* Close button */}
          <button
            onClick={handleResetAndClose}
            className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors"
          >
            <X className="h-5 w-5" />
          </button>

          {status === "SUCCESS" ? (
            <div className="py-8 flex flex-col items-center justify-center text-center space-y-6">
              {/* Step 1: VISITOR SIGNAL RECEIVED */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col items-center space-y-2"
              >
                <div className="grid h-12 w-12 place-items-center rounded-full bg-violet-500/20 text-violet-400 ring-1 ring-violet-500/40">
                  <Radio className="h-6 w-6 animate-pulse" />
                </div>
                <div className="text-xs font-mono tracking-widest text-violet-400">
                  VISITOR SIGNAL RECEIVED
                </div>
              </motion.div>

              {/* Step 2: IDENTITY PROVIDED */}
              {animationStep >= 2 && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center space-y-1"
                >
                  <div className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-mono text-emerald-400 border border-emerald-500/20">
                    <Check className="h-3.5 w-3.5" /> IDENTITY PROVIDED
                  </div>
                </motion.div>
              )}

              {/* Step 3: THANK YOU, [NAME] */}
              {animationStep >= 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-3 pt-2"
                >
                  <h3 className="text-xl font-bold text-white">
                    THANK YOU, <span className="text-violet-400">{submittedName}</span>
                  </h3>
                  <p className="text-xs text-white/60 max-w-xs mx-auto">
                    Your voluntary mark has been recorded into the portfolio guestbook.
                  </p>
                  <button
                    onClick={handleResetAndClose}
                    className="mt-4 rounded-lg bg-white/10 px-5 py-2 text-xs font-mono text-white hover:bg-white/20 transition-colors"
                  >
                    CLOSE
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="space-y-5">
              <div className="flex items-center gap-3">
                <div className="grid h-9 w-9 place-items-center rounded-xl bg-violet-500/20 text-violet-400 ring-1 ring-violet-500/30">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">LEAVE YOUR MARK</h2>
                  <p className="text-xs text-white/50">
                    Voluntarily identify yourself in the AI portfolio guestbook.
                  </p>
                </div>
              </div>

              {errorMessage && (
                <div className="rounded-lg bg-red-500/10 p-3 text-xs text-red-400 border border-red-500/30">
                  {errorMessage}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Honeypot field */}
                <input
                  type="text"
                  name="website_url"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  className="hidden"
                  tabIndex={-1}
                  autoComplete="off"
                />

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">
                    NAME <span className="text-violet-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name..."
                    required
                    maxLength={50}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-white/70 mb-1">
                    MESSAGE <span className="text-white/40">(OPTIONAL)</span>
                  </label>
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Leave a short note..."
                    rows={2}
                    maxLength={280}
                    className="w-full rounded-lg border border-white/10 bg-white/5 px-3.5 py-2 text-xs text-white placeholder-white/30 focus:border-violet-500 focus:outline-none focus:ring-1 focus:ring-violet-500 resize-none"
                  />
                </div>

                <div className="space-y-2.5 rounded-lg bg-white/[0.03] p-3.5 border border-white/5 text-[11px] text-white/70">
                  <div className="flex items-start gap-2">
                    <Shield className="h-4 w-4 shrink-0 text-violet-400 mt-0.5" />
                    <span>
                      Your name will only be visible to the portfolio owner unless you explicitly choose otherwise.
                    </span>
                  </div>

                  {/* Mandatory storage consent checkbox */}
                  <label className="flex items-start gap-2.5 cursor-pointer pt-1">
                    <input
                      type="checkbox"
                      checked={consentStored}
                      onChange={(e) => setConsentStored(e.target.checked)}
                      className="mt-0.5 rounded border-white/20 bg-white/10 text-violet-600 focus:ring-violet-500"
                    />
                    <span className="text-white/80">
                      By submitting, you agree that your name and message may be stored so the portfolio owner can see who left a message. <span className="text-violet-400">*</span>
                    </span>
                  </label>

                  {/* Optional public display checkbox */}
                  <label className="flex items-center gap-2.5 cursor-pointer pt-1 border-t border-white/5">
                    <input
                      type="checkbox"
                      checked={publicConsent}
                      onChange={(e) => setPublicConsent(e.target.checked)}
                      className="rounded border-white/20 bg-white/10 text-violet-600 focus:ring-violet-500"
                    />
                    <span className="text-white/60">
                      Show my name publicly on the portfolio (optional)
                    </span>
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={!consentStored || status === "SUBMITTING"}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-violet-600 py-2.5 text-xs font-semibold text-white hover:bg-violet-500 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-violet-600/20"
                >
                  <Send className="h-3.5 w-3.5" />
                  {status === "SUBMITTING" ? "TRANSMITTING..." : "SEND SIGNAL"}
                </button>
              </form>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
