"use client";

import { useRef } from "react";
import { WaitlistButton } from "@/components/Waitlist";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";

/**
 * SIGNATURE SCROLL MOMENT (carcompany.ai pinned-hero replication).
 * A tall scroll track holds a sticky full-viewport oxblood field.
 * As you scroll THROUGH it, the giant "Owners." serif word scales up
 * and drifts, the inset photo parallaxes, and the whole field eases
 * away — scroll-linked + scrubbed, transform/opacity only, 60fps.
 * Under prefers-reduced-motion it is a static hero (layout, no scrub).
 */
export function HeroField() {
  const trackRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ["start start", "end start"],
  });

  // Scrubbed transforms — the word grows + drifts, photo parallaxes, field lifts.
  const wordScale = useTransform(scrollYProgress, [0, 1], [1, 1.42]);
  const wordY = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const wordLetter = useTransform(scrollYProgress, [0, 1], ["-0.025em", "0.01em"]);
  const insetY = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const insetScale = useTransform(scrollYProgress, [0, 1], [1, 1.08]);
  const fieldOpacity = useTransform(scrollYProgress, [0, 0.7, 1], [1, 1, 0.55]);
  const fieldScale = useTransform(scrollYProgress, [0, 1], [1, 1.04]);
  const chromeOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const sweepX = useTransform(scrollYProgress, [0, 1], [0, -120]);

  const sv = (mv: unknown, fallback: string | number) =>
    reduce ? (fallback as never) : (mv as never);

  return (
    <div ref={trackRef} style={{ height: reduce ? "100vh" : "210vh" }}>
      <motion.section
        style={{
          position: reduce ? "relative" : "sticky",
          top: 0,
          height: "100vh",
          minHeight: "640px",
          background:
            "radial-gradient(130% 110% at 70% 30%, var(--field-hi), var(--field) 55%, #3c0d0a 100%)",
          color: "var(--bone)",
          overflow: "hidden",
          opacity: sv(fieldOpacity, 1),
          scale: sv(fieldScale, 1),
        }}
      >
        {/* conic ember sweep */}
        <motion.div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "conic-gradient(from 210deg at 78% 34%, rgba(224,112,60,0.32), transparent 30%, transparent 70%, rgba(224,112,60,0.18))",
            mixBlendMode: "screen",
            opacity: 0.7,
            x: sv(sweepX, 0),
          }}
        />

        {/* inset photo field */}
        <motion.div
          className="tex-deep tex-frame oc-hero-inset"
          style={{
            position: "absolute",
            left: "clamp(20px, 8vw, 120px)",
            top: "clamp(120px, 21vh, 180px)",
            width: "min(560px, 62vw)",
            height: "min(380px, 44vh)",
            boxShadow: "0 60px 100px -30px rgba(40,8,6,0.7)",
            y: sv(insetY, 0),
            scale: sv(insetScale, 1),
          }}
        />

        {/* giant serif word */}
        <motion.h1
          className="serif oc-hero-word"
          style={{
            position: "absolute",
            left: "clamp(28px, 24vw, 340px)",
            top: "clamp(220px, 40vh, 330px)",
            zIndex: 5,
            fontSize: "clamp(96px, 16.5vw, 228px)",
            lineHeight: 0.82,
            color: "var(--bone)",
            textShadow: "0 30px 60px rgba(40,8,6,0.4)",
            scale: sv(wordScale, 1),
            y: sv(wordY, 0),
            letterSpacing: sv(wordLetter, "-0.025em"),
            transformOrigin: "left center",
          }}
        >
          Owners.
        </motion.h1>

        {/* side copy */}
        <motion.div
          className="oc-hero-side"
          style={{
            position: "absolute",
            right: "clamp(28px, 5vw, 64px)",
            top: "clamp(110px, 24vh, 200px)",
            zIndex: 5,
            textAlign: "right",
            maxWidth: "240px",
            opacity: sv(chromeOpacity, 1),
          }}
        >
          <div className="tag" style={{ color: "rgba(243,236,225,0.6)" }}>
            Podcast · Newsletter · Network
          </div>
          <p
            style={{
              marginTop: "18px",
              fontSize: "14px",
              lineHeight: 1.6,
              color: "rgba(243,236,225,0.78)",
            }}
          >
            A DMV-first room for the owners, operators, creators, and tech
            leaders building real companies.
          </p>
        </motion.div>

        {/* bottom badge row */}
        <motion.div
          className="oc-hero-bottom"
          style={{
            position: "absolute",
            left: "clamp(28px, 24vw, 340px)",
            bottom: "clamp(40px, 9vh, 74px)",
            zIndex: 5,
            display: "flex",
            alignItems: "center",
            gap: "24px",
            flexWrap: "wrap",
            opacity: sv(chromeOpacity, 1),
          }}
        >
          <span
            style={{
              border: "1px solid rgba(243,236,225,0.4)",
              padding: "9px 18px",
              borderRadius: "999px",
              fontSize: "11px",
              letterSpacing: "0.16em",
              textTransform: "uppercase",
              color: "rgba(243,236,225,0.85)",
            }}
          >
            DMV-first. Built to go national.
          </span>
          <WaitlistButton
            intent="Waitlist"
            source="Home hero"
            className="pill"
            style={{ background: "var(--bone)", color: "var(--field)" }}
          >
            Join the Waitlist
          </WaitlistButton>
          <WaitlistButton
            intent="Newsletter"
            source="Home hero · Watch Episodes"
            className="pill-outline on-field"
          >
            Watch Episodes
          </WaitlistButton>
          <span
            style={{
              fontSize: "11px",
              letterSpacing: "0.26em",
              textTransform: "uppercase",
              color: "rgba(243,236,225,0.5)",
            }}
          >
            Scroll to enter
          </span>
        </motion.div>
      </motion.section>

      <style>{`
        @media (max-width: 760px) {
          .oc-hero-side { display: none !important; }
          .oc-hero-word { left: 24px !important; top: 30vh !important; }
          .oc-hero-inset { left: 24px !important; right: 24px !important; width: auto !important; }
        }
      `}</style>
    </div>
  );
}
