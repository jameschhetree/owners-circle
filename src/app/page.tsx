"use client";

import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { WaitlistButton } from "@/components/Waitlist";
import { Parallax } from "@/components/Parallax";
import { FloatingParticles } from "@/components/FloatingParticles";
import { episodes } from "@/data/episodes";

const contentArms = [
  {
    label: "The Podcast",
    desc: "Long-form conversations with the founders, operators, and builders shaping what's next.",
    href: "/episodes",
    cta: "Listen",
  },
  {
    label: "The Notes",
    desc: "Sharp frameworks and field notes from inside the circle. For builders who want the lesson without the fluff.",
    href: "/newsletter",
    cta: "Read",
  },
];

export default function Home() {
  const featuredEps = episodes.slice(0, 3);

  return (
    <>
      <Nav tone="burgundy" />

      {/* ═══ 1. HERO — RED ═══ */}
      <section
        className="oc-grain"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "160px 28px 120px",
          backgroundImage:
            "linear-gradient(165deg, rgba(122,31,43,0.55) 0%, rgba(97,24,35,0.6) 40%, rgba(61,14,20,0.72) 100%), url(/brand/hero-texture.png)",
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <FloatingParticles />

        <div style={{ maxWidth: "1100px", margin: "0 auto", width: "100%", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ display: "flex", alignItems: "center", gap: "16px", marginBottom: "48px" }}>
              <Image
                src="/brand/oc-logo.jpg"
                alt="Owner's Circle"
                width={72}
                height={72}
                style={{
                  borderRadius: "50%",
                  border: "2px solid rgba(184,146,63,0.4)",
                  boxShadow: "0 12px 40px -8px rgba(0,0,0,0.4)",
                }}
              />
              <span className="tag" style={{ color: "var(--gold-light)", fontSize: "12px" }}>
                A Private Network for Builders
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.06}>
            <h1
              className="display"
              style={{
                fontSize: "clamp(48px, 9vw, 110px)",
                lineHeight: 0.95,
                color: "var(--parchment)",
                maxWidth: "900px",
              }}
            >
              The modern-day
              <br />
              <span className="gold-text" style={{ display: "inline" }}>
                members only
              </span>{" "}
              club.
            </h1>
          </Reveal>

          <Reveal delay={0.14}>
            <p
              style={{
                fontSize: "clamp(16px, 1.5vw, 20px)",
                lineHeight: 1.65,
                color: "var(--parchment)",
                maxWidth: "480px",
                margin: "36px 0 0",
                opacity: 0.55,
                fontWeight: 400,
              }}
            >
              A podcast, newsletter, and private community for the owners
              and operators building real companies. Not for everyone.
            </p>
          </Reveal>

          <Reveal delay={0.22}>
            <div
              style={{
                marginTop: "48px",
                display: "flex",
                gap: "14px",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <WaitlistButton
                intent="Waitlist"
                source="Home hero"
                className="pill pill-gold oc-arrow-cta"
                style={{ fontSize: "13px", padding: "17px 38px" }}
              >
                Apply to Join <span className="oc-arrow">→</span>
              </WaitlistButton>
              <Link
                href="/episodes"
                className="pill-outline on-field oc-arrow-cta"
                style={{ fontSize: "12px", padding: "15px 30px" }}
              >
                Listen Now <span className="oc-arrow">→</span>
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ═══ 2. TWO ARMS — WHITE ═══ */}
      <section
        style={{
          background: "var(--ivory)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "clamp(80px, 10vw, 120px) 28px clamp(40px, 5vw, 60px)" }}>
          <Reveal>
            <div style={{ marginBottom: "0", textAlign: "center" }}>
              <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "16px" }}>
                Two formats. One circle.
              </span>
              <h2
                className="display"
                style={{
                  fontSize: "clamp(32px, 5.5vw, 60px)",
                  lineHeight: 0.95,
                  color: "var(--burgundy)",
                  maxWidth: "700px",
                  margin: "0 auto",
                }}
              >
                Content built{" "}
                <em className="serif-it" style={{ fontWeight: 500 }}>for the room.</em>
              </h2>
            </div>
          </Reveal>
        </div>

        <div style={{ borderTop: "1px solid var(--taupe)", maxWidth: "1200px", margin: "0 auto" }}>
          <RevealGroup className="oc-arms-grid" stagger={0.12}>
            {contentArms.map((arm) => (
              <RevealItem key={arm.label}>
                <div className="oc-arm-card">
                  <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "24px" }}>
                    {arm.cta === "Listen" ? "01" : "02"}
                  </span>
                  <h3
                    className="display"
                    style={{
                      fontSize: "clamp(32px, 4vw, 52px)",
                      lineHeight: 1.0,
                      color: "var(--burgundy)",
                      marginBottom: "24px",
                    }}
                  >
                    {arm.label}
                  </h3>
                  <p
                    style={{
                      fontSize: "16px",
                      lineHeight: 1.75,
                      color: "var(--espresso)",
                      opacity: 0.55,
                      marginBottom: "40px",
                      maxWidth: "360px",
                    }}
                  >
                    {arm.desc}
                  </p>
                  <Link
                    href={arm.href}
                    className="pill-outline on-paper oc-arrow-cta"
                    style={{ fontSize: "11px", padding: "14px 28px" }}
                  >
                    {arm.cta} <span className="oc-arrow">→</span>
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ═══ 3. NOT FOR EVERYONE — RED ═══ */}
      <section
        className="oc-grain"
        style={{
          padding: "clamp(100px, 16vw, 200px) 28px",
          backgroundImage:
            "linear-gradient(170deg, rgba(122,31,43,0.6) 0%, rgba(97,24,35,0.65) 100%), url(/brand/hero-texture.png)",
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <FloatingParticles color="rgba(184,146,63,0.35)" />
        <Reveal>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center", position: "relative", zIndex: 2 }}>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px, 7vw, 90px)",
                lineHeight: 0.95,
                color: "var(--parchment)",
              }}
            >
              This isn&apos;t for{" "}
              <em className="serif-it gold-text" style={{ fontWeight: 500 }}>everyone.</em>
            </h2>
            <p
              style={{
                margin: "36px auto 0",
                fontSize: "clamp(16px, 1.4vw, 19px)",
                lineHeight: 1.75,
                color: "var(--parchment)",
                opacity: 0.5,
                maxWidth: "520px",
              }}
            >
              A community with one common aim — designed for founders who
              want to become their best selves in every aspect of life.
            </p>
            <div className="gold-divider" style={{ margin: "48px auto 0" }} />
          </div>
        </Reveal>
      </section>

      {/* ═══ 4. FEATURED EPISODES — WHITE ═══ */}
      <section
        style={{
          padding: "clamp(90px, 13vw, 140px) 28px",
          background: "var(--ivory)",
          position: "relative",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <Reveal>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-end",
                marginBottom: "48px",
                flexWrap: "wrap",
                gap: "16px",
              }}
            >
              <div>
                <span className="tag" style={{ color: "var(--gold)" }}>
                  Coming Soon
                </span>
                <h2
                  className="display"
                  style={{
                    fontSize: "clamp(36px, 5.5vw, 56px)",
                    lineHeight: 0.95,
                    marginTop: "14px",
                    color: "var(--burgundy)",
                  }}
                >
                  The conversations
                </h2>
              </div>
              <Link href="/episodes" className="link-ul-ink">
                All episodes →
              </Link>
            </div>
          </Reveal>

          <RevealGroup stagger={0.06}>
            {featuredEps.map((ep, i) => (
              <RevealItem key={ep.id}>
                <div
                  className="oc-ep-row-light"
                  style={{
                    borderTop: "1px solid var(--taupe)",
                    padding: "28px 0",
                    display: "flex",
                    gap: "20px",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    borderBottom:
                      i === featuredEps.length - 1
                        ? "1px solid var(--taupe)"
                        : "none",
                  }}
                >
                  <span
                    className="serif serif-it gold-text-static"
                    style={{ fontSize: "20px", minWidth: "40px" }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="tag"
                    style={{
                      color: "var(--espresso)",
                      opacity: 0.4,
                      minWidth: "100px",
                    }}
                  >
                    {ep.category}
                  </span>
                  <span
                    className="serif"
                    style={{
                      fontSize: "clamp(20px, 2.5vw, 28px)",
                      color: "var(--burgundy)",
                      flex: 1,
                      lineHeight: 1.2,
                      fontWeight: 600,
                    }}
                  >
                    {ep.title}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* ═══ 5. NEWSLETTER CTA — RED ═══ */}
      <section
        className="oc-grain"
        style={{
          padding: "clamp(110px, 16vw, 180px) 28px",
          backgroundImage:
            "linear-gradient(175deg, rgba(97,24,35,0.65) 0%, rgba(122,31,43,0.55) 50%, rgba(61,14,20,0.7) 100%), url(/brand/hero-texture.png)",
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <FloatingParticles color="rgba(184,146,63,0.35)" />
        <Reveal>
          <div
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              textAlign: "center",
              position: "relative",
              zIndex: 2,
            }}
          >
            <span className="tag gold-text-static" style={{ display: "block", marginBottom: "24px" }}>
              Owner&apos;s Notes — Weekly
            </span>
            <h2
              className="display"
              style={{
                fontSize: "clamp(36px, 6vw, 72px)",
                lineHeight: 0.95,
                color: "var(--parchment)",
              }}
            >
              Stay inside{" "}
              <span className="gold-text">the circle.</span>
            </h2>
            <p
              style={{
                margin: "28px auto 0",
                fontSize: "17px",
                lineHeight: 1.7,
                color: "var(--parchment)",
                opacity: 0.45,
                maxWidth: "460px",
              }}
            >
              Lessons, stories, and opportunities from inside the circle.
              One email a week. For the people building.
            </p>
            <div style={{ marginTop: "44px" }}>
              <WaitlistButton
                intent="Newsletter"
                source="Home · Newsletter CTA"
                className="pill pill-gold oc-arrow-cta"
                style={{ fontSize: "13px", padding: "17px 38px" }}
              >
                Subscribe Free <span className="oc-arrow">→</span>
              </WaitlistButton>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ═══ 6. BUILDERS / PARTNERS — WHITE ═══ */}
      <section style={{ borderTop: "none" }}>
        <div className="oc-apply-grid">
          <Reveal className="oc-apply-c oc-apply-ivory">
            <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "18px" }}>
              For builders
            </span>
            <h3
              className="display"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 0.95,
                color: "var(--burgundy)",
              }}
            >
              Know someone
              <br />
              who{" "}
              <em className="serif-it" style={{ fontWeight: 500, color: "var(--gold)" }}>belongs?</em>
            </h3>
            <p
              style={{
                marginTop: "20px",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--espresso)",
                opacity: 0.55,
                maxWidth: "340px",
              }}
            >
              We spotlight people building real companies. They don&apos;t need
              to be famous. They need to be real.
            </p>
            <WaitlistButton
              intent="Nominate a guest"
              source="Home · Nominate"
              className="pill-outline on-paper oc-arrow-cta"
              style={{ marginTop: "36px", display: "inline-flex" }}
            >
              Nominate <span className="oc-arrow">→</span>
            </WaitlistButton>
          </Reveal>

          <Reveal className="oc-apply-c oc-apply-parchment" delay={0.06}>
            <span className="tag" style={{ color: "var(--burgundy)", display: "block", marginBottom: "18px" }}>
              For partners
            </span>
            <h3
              className="display"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 0.95,
                color: "var(--burgundy)",
              }}
            >
              Reach the
              <br />
              people{" "}
              <em className="serif-it" style={{ fontWeight: 500 }}>building.</em>
            </h3>
            <p
              style={{
                marginTop: "20px",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--espresso)",
                opacity: 0.6,
                maxWidth: "340px",
              }}
            >
              Partner across the podcast, newsletter, and live events to
              reach founders, owners, and decision-makers.
            </p>
            <WaitlistButton
              intent="Sponsor / Partner"
              source="Home · Partner"
              className="pill-outline on-paper oc-arrow-cta"
              style={{ marginTop: "36px", display: "inline-flex" }}
            >
              Partner <span className="oc-arrow">→</span>
            </WaitlistButton>
          </Reveal>
        </div>
      </section>

      <style>{`
        .oc-arrow-cta { gap: 8px; }
        .oc-arrow {
          display: inline-block;
          transition: transform 0.4s cubic-bezier(0.16,1,0.3,1);
          font-size: 1.1em;
        }
        .oc-arrow-cta:hover .oc-arrow { transform: translateX(5px); }

        .oc-arms-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0; }
        .oc-arm-card {
          padding: clamp(48px, 6vw, 80px) clamp(40px, 5vw, 64px);
          background: #fff;
          min-height: 420px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          transition: background 0.4s ease;
          position: relative;
        }
        .oc-arm-card:first-child {
          border-right: 1px solid var(--taupe);
        }
        .oc-arm-card:hover {
          background: var(--parchment);
        }

        .oc-ep-row-light {
          transition: background 0.3s ease, padding-left 0.3s ease;
          border-radius: 4px;
          margin: 0 -12px;
          padding-left: 12px !important;
          padding-right: 12px !important;
        }
        .oc-ep-row-light:hover {
          background: rgba(122, 31, 43, 0.04);
          padding-left: 20px !important;
        }

        .oc-apply-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .oc-apply-c { padding: clamp(80px, 12vw, 140px) clamp(40px, 5vw, 80px); }
        .oc-apply-ivory { background: var(--ivory); }
        .oc-apply-parchment { background: var(--parchment); }

        @media (max-width: 760px) {
          .oc-arms-grid { grid-template-columns: 1fr; }
          .oc-arm-card { padding: 48px 28px; min-height: auto; }
          .oc-arm-card:first-child { border-right: none; border-bottom: 1px solid var(--taupe); }
          .oc-apply-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
