"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

/**
 * Coherent inner-page hero: oxblood field, eyebrow, enormous Fraunces word
 * on a broken axis over a faint inset glow. Word + glow parallax on scroll
 * to carry the home page's "site moves" feel across the whole site.
 */
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
  const wordY = useTransform(scrollYProgress, [0, 1], [0, -90]);
  const glowY = useTransform(scrollYProgress, [0, 1], [0, 70]);
  const fade = useTransform(scrollYProgress, [0, 0.85], [1, 0.3]);
  const sv = (mv: unknown, fb: number) => (reduce ? (fb as never) : (mv as never));

  return (
    <section
      ref={ref}
      className="on-field-sec"
      style={{
        minHeight: "min(620px, 88vh)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 clamp(28px,5vw,56px) clamp(70px,9vw,96px)",
        background:
          "radial-gradient(130% 110% at 70% 30%, var(--field-hi), var(--field) 55%, #3c0d0a 100%)",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "conic-gradient(from 210deg at 78% 34%, rgba(224,112,60,0.30), transparent 30%, transparent 70%, rgba(224,112,60,0.16))",
          mixBlendMode: "screen",
          opacity: 0.65,
        }}
      />
      <motion.div
        aria-hidden
        style={{
          position: "absolute",
          right: "8%",
          top: "26%",
          width: "min(420px,46vw)",
          height: "min(300px,36vh)",
          background:
            "radial-gradient(closest-side, rgba(255,210,170,0.22), transparent 70%)",
          filter: "blur(20px)",
          y: sv(glowY, 0),
        }}
      />
      <motion.div
        style={{
          maxWidth: "1240px",
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
          style={{ color: "var(--ember)", display: "block", marginBottom: "26px" }}
        >
          {eyebrow}
        </span>
        <h1
          className="serif"
          style={{
            fontSize: "clamp(52px,11vw,150px)",
            lineHeight: 0.88,
            letterSpacing: "-0.025em",
            color: "var(--bone)",
            textShadow: "0 30px 60px rgba(40,8,6,0.4)",
          }}
        >
          {word}
          {emphasis && (
            <>
              <br />
              <em className="serif-it">{emphasis}</em>
            </>
          )}
        </h1>
        {children && (
          <div
            style={{
              marginTop: "34px",
              maxWidth: "560px",
              fontSize: "clamp(15px,1.4vw,18px)",
              lineHeight: 1.7,
              color: "rgba(243,236,225,0.74)",
            }}
          >
            {children}
          </div>
        )}
      </motion.div>
    </section>
  );
}
