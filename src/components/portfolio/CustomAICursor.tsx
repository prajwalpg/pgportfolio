'use client';

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomAICursor() {
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [hovered, setHovered] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Touch screen / reduced motion check
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduce) return;

    setVisible(true);

    const onMouseMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement | null;
      if (
        target &&
        (target.closest("a") ||
          target.closest("button") ||
          target.closest(".interactive-node") ||
          target.closest("[role='button']"))
      ) {
        setHovered(true);
      } else {
        setHovered(false);
      }
    };

    const onMouseLeave = () => setVisible(false);
    const onMouseEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseleave", onMouseLeave);
    document.body.addEventListener("mouseenter", onMouseEnter);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseleave", onMouseLeave);
      document.body.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  if (!visible) return null;

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[999] h-2.5 w-2.5 rounded-full bg-violet-400 mix-blend-screen"
        animate={{
          x: pos.x - 5,
          y: pos.y - 5,
          scale: hovered ? 1.5 : 1,
        }}
        transition={{ type: "spring", stiffness: 800, damping: 35, mass: 0.1 }}
      />

      {/* Outer Ring */}
      <motion.div
        className="pointer-events-none fixed top-0 left-0 z-[998] rounded-full border border-violet-400/40 bg-violet-500/5 mix-blend-screen"
        animate={{
          x: pos.x - 16,
          y: pos.y - 16,
          width: 32,
          height: 32,
          scale: hovered ? 1.8 : 1,
          borderColor: hovered ? "rgba(34, 211, 238, 0.7)" : "rgba(167, 139, 250, 0.4)",
        }}
        transition={{ type: "spring", stiffness: 350, damping: 25, mass: 0.2 }}
      />
    </>
  );
}
