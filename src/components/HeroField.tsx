"use client";

import { useRef } from "react";
import { WaitlistButton } from "@/components/Waitlist";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

export function HeroField() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end start"],
  });

  const wordY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const chromeOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.55]);

  const sv = (mv: unknown, fallback: string | number) =>
    reduce ? (fallback as never) : (mv as never);

  return (
    <div ref={trackRef} style={{ height: reduce ? "100vh" : "160vh" }}>
      <motion.section
        style={{
          position: reduce ? "relative" : "sticky",
          top: 0,
          height: "100vh",
          minHeight: "600px",
          background: "var(--ivory)",
          color: "var(--espresso)",
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "120px 28px 80px",
          opacity: sv(fieldOpacity, 1),
        }}
      >
        <motion.div
          style={{
            maxWidth: "700px",
            position: "relative",
            zIndex: 5,
            y: sv(wordY, 0),
          }}
        >
          <motion.div style={{ opacity: sv(chromeOpacity, 1) }}>
            <div className="tag" style={{ color: "var(--gold)", marginBottom: "24px" }}>
              Podcast &middot; Newsletter &middot; Network
            </div>
          </motion.div>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(48px, 9vw, 100px)",
              lineHeight: 0.95,
              color: "var(--burgundy)",
              letterSpacing: "-0.02em",
            }}
          >
            Owner&apos;s{" "}
            <em className="serif-it" style={{ color: "var(--burgundy-deep)" }}>
              Circle.
            </em>
          </h1>
          <motion.div style={{ opacity: sv(chromeOpacity, 1) }}>
            <p
              style={{
                marginTop: "24px",
                fontSize: "clamp(15px, 1.4vw, 18px)",
                lineHeight: 1.7,
                color: "var(--espresso)",
                opacity: 0.7,
                maxWidth: "480px",
                margin: "24px auto 0",
              }}
            >
              A room for the owners, operators, creators, and tech
              leaders building real companies.
            </p>
            <div style={{ marginTop: "36px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
              <WaitlistButton
                intent="Newsletter"
                source="Home hero"
                className="pill"
              >
                Subscribe Free
              </WaitlistButton>
            </div>
          </motion.div>
        </motion.div>
      </motion.section>
    </div>
  );
}
