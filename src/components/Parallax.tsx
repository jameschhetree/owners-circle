"use client";

import { useRef, type ReactNode, type CSSProperties } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * Scroll-linked parallax + optional scale/opacity drift — the carcompany.ai
 * "imagery moves with me" feel, extended beyond the hero. Transform/opacity
 * only (60fps, zero layout thrash, zero CLS). Fully collapses to a static
 * element under prefers-reduced-motion.
 */
export function Parallax({
  children,
  className = "",
  style,
  /** vertical travel in px across the element's scroll pass (− = up) */
  y = -60,
  /** scale at start → end */
  scaleFrom = 1,
  scaleTo = 1,
  /** opacity at start → end (1,1 = no fade) */
  opacityFrom = 1,
  opacityTo = 1,
  ariaHidden = false,
}: {
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  ariaHidden?: boolean;
  y?: number;
  scaleFrom?: number;
  scaleTo?: number;
  opacityFrom?: number;
  opacityTo?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const ty = useTransform(scrollYProgress, [0, 1], [0, y]);
  const sc = useTransform(scrollYProgress, [0, 1], [scaleFrom, scaleTo]);
  const op = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [opacityFrom, 1, opacityTo]
  );

  if (reduce) {
    return (
      <div className={className} style={style} aria-hidden={ariaHidden || undefined}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      aria-hidden={ariaHidden || undefined}
      style={{
        ...style,
        y: ty,
        scale: scaleFrom === scaleTo ? undefined : sc,
        opacity:
          opacityFrom === 1 && opacityTo === 1 ? undefined : op,
        willChange: "transform",
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * Sticky scrubbed section frame: pins an inner column while the section
 * scrolls past, scrubbing a headline's scale/letter-spacing/opacity to
 * progress. Used to give one more section (the pillar ledger) the
 * signature pinned moment. Layout-only under reduced motion (no scrub).
 */
export function StickyScrub({
  children,
  heading,
  className = "",
  trackHeight = "220vh",
}: {
  children: ReactNode;
  heading: ReactNode;
  className?: string;
  trackHeight?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const headScale = useTransform(scrollYProgress, [0, 0.5], [0.92, 1]);
  const headOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.85, 1],
    [0.35, 1, 1, 0.4]
  );
  const headLetter = useTransform(
    scrollYProgress,
    [0, 0.5],
    ["0.04em", "-0.02em"]
  );
  const railWidth = useTransform(
    scrollYProgress,
    [0.05, 0.95],
    ["0%", "100%"]
  );

  if (reduce) {
    return (
      <div className={className}>
        <div style={{ marginBottom: "70px" }}>{heading}</div>
        {children}
      </div>
    );
  }

  return (
    <div ref={ref} className={className} style={{ height: trackHeight }}>
      <div
        style={{
          position: "sticky",
          top: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "clamp(80px,12vw,140px) 0",
          maxWidth: "1240px",
          marginInline: "auto",
        }}
      >
        <motion.div
          style={{
            scale: headScale,
            opacity: headOpacity,
            letterSpacing: headLetter,
            transformOrigin: "left center",
            willChange: "transform",
          }}
        >
          {heading}
        </motion.div>
        <div
          aria-hidden
          style={{
            height: "1px",
            background: "var(--rule)",
            margin: "44px 0 56px",
            position: "relative",
            overflow: "hidden",
          }}
        >
          <motion.div
            style={{
              position: "absolute",
              inset: 0,
              background: "var(--field)",
              width: railWidth,
              transformOrigin: "left center",
            }}
          />
        </div>
        {children}
      </div>
    </div>
  );
}
