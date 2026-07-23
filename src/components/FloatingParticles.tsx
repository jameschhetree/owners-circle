"use client";

import { motion, useReducedMotion } from "framer-motion";

const particles = [
  { size: 6, x: "8%", y: "18%", delay: 0, dur: 7, drift: 30 },
  { size: 4, x: "22%", y: "72%", delay: 1.2, dur: 9, drift: -20 },
  { size: 8, x: "78%", y: "25%", delay: 0.6, dur: 8, drift: 25 },
  { size: 3, x: "65%", y: "80%", delay: 2.1, dur: 10, drift: -35 },
  { size: 5, x: "90%", y: "45%", delay: 0.3, dur: 7.5, drift: 20 },
  { size: 7, x: "35%", y: "90%", delay: 1.8, dur: 8.5, drift: -15 },
  { size: 4, x: "50%", y: "15%", delay: 3.0, dur: 9, drift: 28 },
  { size: 5, x: "15%", y: "55%", delay: 2.4, dur: 7, drift: -22 },
];

export function FloatingParticles({ color = "var(--gold)" }: { color?: string }) {
  const reduce = useReducedMotion();
  if (reduce) return null;

  return (
    <div
      aria-hidden
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden",
        zIndex: 1,
      }}
    >
      {particles.map((p, i) => (
        <motion.div
          key={i}
          style={{
            position: "absolute",
            left: p.x,
            top: p.y,
            width: p.size,
            height: p.size,
            borderRadius: p.size > 5 ? "2px" : "50%",
            background: color,
            opacity: 0,
          }}
          animate={{
            y: [0, p.drift, 0],
            x: [0, p.drift * 0.4, 0],
            opacity: [0, 0.35, 0],
            rotate: [0, 90, 180],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            delay: p.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
