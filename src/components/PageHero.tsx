"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function PageHero({
  eyebrow,
  word,
  emphasis,
  children,
}: {
  eyebrow: string;
  word: ReactNode;
  emphasis?: ReactNode;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const wordY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.3]);
  const sv = (mv: unknown, fb: number) => (reduce ? (fb as never) : (mv as never));

  return (
    <section
      ref={ref}
      style={{
        minHeight: "min(520px, 78vh)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 clamp(28px, 5vw, 56px) clamp(60px, 8vw, 90px)",
        background: "var(--ivory)",
        borderBottom: "1px solid var(--rule)",
        position: "relative",
      }}
    >
      <motion.div
        style={{
          maxWidth: "960px",
          margin: "0 auto",
          width: "100%",
          position: "relative",
          zIndex: 2,
          opacity: sv(fade, 1),
          y: sv(wordY, 0),
        }}
      >
        <span
          className="tag"
          style={{ color: "var(--gold)", display: "block", marginBottom: "20px" }}
        >
          {eyebrow}
        </span>
        <h1
          className="serif"
          style={{
            fontSize: "clamp(40px, 8vw, 80px)",
            lineHeight: 0.95,
            letterSpacing: "-0.02em",
            color: "var(--burgundy)",
          }}
        >
          {word}
          {emphasis && (
            <>
              <br />
              <em className="serif-it" style={{ color: "var(--burgundy-deep)" }}>
                {emphasis}
              </em>
            </>
          )}
        </h1>
        {children && (
          <div
            style={{
              marginTop: "28px",
              maxWidth: "520px",
              fontSize: "clamp(15px, 1.4vw, 17px)",
              lineHeight: 1.7,
              color: "var(--espresso)",
              opacity: 0.7,
            }}
          >
            {children}
          </div>
        )}
      </motion.div>
    </section>
  );
}
