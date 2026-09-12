'use client';

import { useEffect, useRef } from "react";
import { useInferenceMode } from "./InferenceModeContext";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  layer: number;
  label: string;
  pulseOffset: number;
}

interface Signal {
  fromNode: Node;
  toNode: Node;
  progress: number;
  speed: number;
  color: string;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  alpha: number;
}

export default function NeuralNetworkHeroCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const mouseRef = useRef({ x: -1000, y: -1000 });
  const ripplesRef = useRef<Ripple[]>([]);
  const { inferenceMode } = useInferenceMode();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    let width = (canvas.width = canvas.offsetWidth);
    let height = (canvas.height = canvas.offsetHeight);

    const layerLabels = [
      ["Text Data", "Images", "Prompts", "Documents"],
      ["Tokens", "CNN Filters", "OCR Bounding"],
      ["Vector Space", "RAG Chunks", "Embeddings"],
      ["Attention Heads", "Multi-Agent Router"],
      ["Generative Output", "AI Action"],
    ];

    let nodes: Node[] = [];
    let signals: Signal[] = [];

    const initNetwork = () => {
      nodes = [];
      const numLayers = layerLabels.length;
      const marginX = width * 0.12;
      const layerSpacing = (width - marginX * 2) / (numLayers - 1);

      layerLabels.forEach((labels, layerIndex) => {
        const x = marginX + layerIndex * layerSpacing;
        const count = labels.length;
        const marginY = height * 0.18;
        const verticalSpacing = count > 1 ? (height - marginY * 2) / (count - 1) : height / 2;

        labels.forEach((label, nodeIndex) => {
          const y = count > 1 ? marginY + nodeIndex * verticalSpacing : height / 2;
          nodes.push({
            x,
            y,
            baseX: x,
            baseY: y,
            layer: layerIndex,
            label,
            pulseOffset: Math.random() * Math.PI * 2,
          });
        });
      });

      signals = [];
      const signalCount = inferenceMode ? 25 : 12;
      for (let i = 0; i < signalCount; i++) {
        spawnRandomSignal();
      }
    };

    const spawnRandomSignal = () => {
      const sourceLayer = Math.floor(Math.random() * (layerLabels.length - 1));
      const layer1Nodes = nodes.filter((n) => n.layer === sourceLayer);
      const layer2Nodes = nodes.filter((n) => n.layer === sourceLayer + 1);

      if (layer1Nodes.length && layer2Nodes.length) {
        const fromNode = layer1Nodes[Math.floor(Math.random() * layer1Nodes.length)];
        const toNode = layer2Nodes[Math.floor(Math.random() * layer2Nodes.length)];
        const colors = ["#a78bfa", "#22d3ee", "#34d399", "#f472b6"];
        const speedMult = inferenceMode ? 1.8 : 1.0;
        signals.push({
          fromNode,
          toNode,
          progress: 0,
          speed: (0.008 + Math.random() * 0.012) * speedMult,
          color: colors[Math.floor(Math.random() * colors.length)],
        });
      }
    };

    initNetwork();

    const onResize = () => {
      width = canvas.width = canvas.offsetWidth;
      height = canvas.height = canvas.offsetHeight;
      initNetwork();
    };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };

    const onClick = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      ripplesRef.current.push({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 5,
        maxRadius: 180,
        alpha: 1,
      });
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("click", onClick);

    let animationId: number;

    const render = () => {
      ctx.clearRect(0, 0, width, height);
      const time = Date.now() * (inferenceMode ? 0.004 : 0.002);

      // Render activation click ripples
      for (let r = ripplesRef.current.length - 1; r >= 0; r--) {
        const rip = ripplesRef.current[r];
        rip.radius += 4;
        rip.alpha -= 0.015;

        ctx.strokeStyle = `rgba(34, 211, 238, ${rip.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rip.x, rip.y, rip.radius, 0, Math.PI * 2);
        ctx.stroke();

        if (rip.alpha <= 0 || rip.radius >= rip.maxRadius) {
          ripplesRef.current.splice(r, 1);
        }
      }

      // Update node positions
      nodes.forEach((n) => {
        const dx = mouseRef.current.x - n.baseX;
        const dy = mouseRef.current.y - n.baseY;
        const dist = Math.hypot(dx, dy);
        const maxDist = 180;
        if (dist < maxDist) {
          const factor = (1 - dist / maxDist) * 18;
          n.x = n.baseX + (dx / dist) * factor;
          n.y = n.baseY + (dy / dist) * factor;
        } else {
          n.x += (n.baseX - n.x) * 0.1;
          n.y += (n.baseY - n.y) * 0.1;
        }
      });

      // Draw connection lines
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        for (let j = 0; j < nodes.length; j++) {
          const nodeB = nodes[j];
          if (nodeB.layer === nodeA.layer + 1) {
            const dx = nodeB.x - nodeA.x;
            const dy = nodeB.y - nodeA.y;
            const dist = Math.hypot(dx, dy);
            if (dist < 320) {
              const alpha = inferenceMode ? 0.22 : 0.12;
              ctx.strokeStyle = `rgba(167, 139, 250, ${alpha})`;
              ctx.lineWidth = inferenceMode ? 1.0 : 0.8;
              ctx.beginPath();
              ctx.moveTo(nodeA.x, nodeA.y);
              ctx.lineTo(nodeB.x, nodeB.y);
              ctx.stroke();
            }
          }
        }
      }

      // Render signals
      for (let i = signals.length - 1; i >= 0; i--) {
        const s = signals[i];
        s.progress += s.speed;

        const currentX = s.fromNode.x + (s.toNode.x - s.fromNode.x) * s.progress;
        const currentY = s.fromNode.y + (s.toNode.y - s.fromNode.y) * s.progress;

        ctx.fillStyle = s.color;
        ctx.shadowColor = s.color;
        ctx.shadowBlur = inferenceMode ? 12 : 6;
        ctx.beginPath();
        ctx.arc(currentX, currentY, inferenceMode ? 3.5 : 2.5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        if (s.progress >= 1) {
          signals.splice(i, 1);
          spawnRandomSignal();
        }
      }

      // Draw Nodes
      nodes.forEach((n) => {
        const pulse = Math.sin(time + n.pulseOffset) * 1.5 + 4.5;
        const isHovered = Math.hypot(mouseRef.current.x - n.x, mouseRef.current.y - n.y) < 40;

        ctx.fillStyle = isHovered ? "rgba(34, 211, 238, 0.4)" : "rgba(167, 139, 250, 0.2)";
        ctx.beginPath();
        ctx.arc(n.x, n.y, pulse * 2.2, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = isHovered ? "#22d3ee" : "#a78bfa";
        ctx.beginPath();
        ctx.arc(n.x, n.y, isHovered ? 6 : pulse, 0, Math.PI * 2);
        ctx.fill();

        if (width > 640) {
          ctx.fillStyle = isHovered ? "#ffffff" : "rgba(255, 255, 255, 0.6)";
          ctx.font = isHovered ? "600 11px monospace" : "500 10px monospace";
          ctx.textAlign = "center";
          ctx.fillText(n.label, n.x, n.y + 18);
        }
      });

      animationId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("click", onClick);
      if (animationId) cancelAnimationFrame(animationId);
    };
  }, [inferenceMode]);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-auto absolute inset-0 h-full w-full opacity-70 cursor-pointer"
    />
  );
}
