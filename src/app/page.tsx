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

      {/* ─── HERO ─── left-aligned, editorial, massive type */}
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

        {/* oversized watermark */}
        <span
          aria-hidden
          className="display"
          style={{
            position: "absolute",
            bottom: "-12%",
            right: "-6%",
            fontSize: "clamp(250px, 40vw, 600px)",
            lineHeight: 0.85,
            color: "rgba(184,146,63,0.025)",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          OC
        </span>

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

        {/* bottom drip line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "15%",
            width: "1px",
            height: "80px",
            background: "linear-gradient(to bottom, rgba(184,146,63,0.4), transparent)",
          }}
          aria-hidden
        />
      </section>

      {/* ─── TWO ARMS ─── glass cards on dark texture */}
      <section
        className="oc-grain"
        style={{
          padding: "clamp(90px, 13vw, 140px) 28px",
          backgroundImage:
            "linear-gradient(175deg, rgba(61,14,20,0.85) 0%, rgba(97,24,35,0.75) 50%, rgba(122,31,43,0.65) 100%), url(/brand/hero-texture.png)",
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <FloatingParticles color="rgba(184,146,63,0.4)" />
        <div style={{ maxWidth: "1000px", margin: "0 auto", position: "relative", zIndex: 2 }}>
          <Reveal>
            <div style={{ marginBottom: "60px" }}>
              <span className="tag gold-text-static" style={{ display: "block", marginBottom: "16px" }}>
                Two formats. One circle.
              </span>
              <h2
                className="display"
                style={{
                  fontSize: "clamp(32px, 5.5vw, 60px)",
                  lineHeight: 0.95,
                  color: "var(--parchment)",
                  maxWidth: "600px",
                }}
              >
                Content built{" "}
                <em className="serif-it" style={{ fontWeight: 500 }}>for the room.</em>
              </h2>
            </div>
          </Reveal>

          <div className="oc-arms-grid">
            <RevealGroup className="oc-arms-grid" stagger={0.12}>
              {contentArms.map((arm) => (
                <RevealItem key={arm.label}>
                  <div className="oc-arm-card glass-card">
                    <h3
                      className="display"
                      style={{
                        fontSize: "clamp(28px, 3.5vw, 44px)",
                        lineHeight: 1.0,
                        color: "var(--parchment)",
                        marginBottom: "18px",
                      }}
                    >
                      {arm.label}
                    </h3>
                    <p
                      style={{
                        fontSize: "15px",
                        lineHeight: 1.7,
                        color: "var(--parchment)",
                        opacity: 0.5,
                        marginBottom: "32px",
                      }}
                    >
                      {arm.desc}
                    </p>
                    <Link
                      href={arm.href}
                      className="pill-outline on-field oc-arrow-cta"
                      style={{ fontSize: "11px", padding: "12px 24px" }}
                    >
                      {arm.cta} <span className="oc-arrow">→</span>
                    </Link>
                  </div>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>

      {/* ─── NOT FOR EVERYONE ─── editorial statement */}
      <section
        style={{
          padding: "clamp(100px, 16vw, 200px) 28px",
          background: "var(--ivory)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Reveal>
          <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
            <h2
              className="display"
              style={{
                fontSize: "clamp(40px, 7vw, 90px)",
                lineHeight: 0.95,
                color: "var(--burgundy)",
              }}
            >
              This isn&apos;t for{" "}
              <em className="serif-it" style={{ fontWeight: 500 }}>everyone.</em>
            </h2>
            <p
              style={{
                margin: "36px auto 0",
                fontSize: "clamp(16px, 1.4vw, 19px)",
                lineHeight: 1.75,
                color: "var(--espresso)",
                opacity: 0.55,
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

      {/* ─── FEATURED EPISODES ─── */}
      <section
        className="on-field-sec oc-grain"
        style={{
          padding: "clamp(90px, 13vw, 140px) 28px",
          backgroundImage:
            "linear-gradient(170deg, rgba(122,31,43,0.65) 0%, rgba(97,24,35,0.7) 100%), url(/brand/hero-texture.png)",
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto", position: "relative", zIndex: 2 }}>
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
                <span className="tag gold-text-static">
                  Coming Soon
                </span>
                <h2
                  className="display"
                  style={{
                    fontSize: "clamp(36px, 5.5vw, 56px)",
                    lineHeight: 0.95,
                    marginTop: "14px",
                    color: "var(--parchment)",
                  }}
                >
                  The conversations
                </h2>
              </div>
              <Link href="/episodes" className="link-ul">
                All episodes →
              </Link>
            </div>
          </Reveal>

          <RevealGroup stagger={0.06}>
            {featuredEps.map((ep, i) => (
              <RevealItem key={ep.id}>
                <div
                  className="oc-ep-row"
                  style={{
                    borderTop: "1px solid rgba(245,239,229,0.12)",
                    padding: "28px 0",
                    display: "flex",
                    gap: "20px",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    borderBottom:
                      i === featuredEps.length - 1
                        ? "1px solid rgba(245,239,229,0.12)"
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
                      color: "rgba(245,239,229,0.4)",
                      minWidth: "100px",
                    }}
                  >
                    {ep.category}
                  </span>
                  <span
                    className="serif"
                    style={{
                      fontSize: "clamp(20px, 2.5vw, 28px)",
                      color: "var(--parchment)",
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

      {/* ─── NEWSLETTER CTA ─── deep dark */}
      <section
        className="oc-grain"
        style={{
          padding: "clamp(110px, 16vw, 180px) 28px",
          backgroundImage:
            "linear-gradient(175deg, rgba(18,10,11,0.85) 0%, rgba(31,15,19,0.78) 40%, rgba(61,14,20,0.65) 100%), url(/brand/dark-texture.png)",
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

      {/* ─── FOR BUILDERS / FOR PARTNERS ─── */}
      <section style={{ borderTop: "none" }}>
        <div className="oc-apply-grid">
          <Reveal className="oc-apply-c oc-apply-dark oc-grain">
            <span className="tag gold-text-static" style={{ display: "block", marginBottom: "18px" }}>
              For builders
            </span>
            <h3
              className="display"
              style={{
                fontSize: "clamp(28px, 4vw, 44px)",
                lineHeight: 0.95,
                color: "var(--parchment)",
              }}
            >
              Know someone
              <br />
              who{" "}
              <em className="serif-it gold-text" style={{ fontWeight: 500 }}>belongs?</em>
            </h3>
            <p
              style={{
                marginTop: "20px",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--parchment)",
                opacity: 0.5,
                maxWidth: "340px",
              }}
            >
              We spotlight people building real companies. They don&apos;t need
              to be famous. They need to be real.
            </p>
            <WaitlistButton
              intent="Nominate a guest"
              source="Home · Nominate"
              className="pill-outline on-field oc-arrow-cta"
              style={{ marginTop: "36px", display: "inline-flex" }}
            >
              Nominate <span className="oc-arrow">→</span>
            </WaitlistButton>
          </Reveal>

          <Reveal className="oc-apply-c oc-apply-light" delay={0.06}>
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

        .oc-arms-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 20px; }
        .oc-arm-card {
          padding: 44px 40px;
          transition: transform 0.5s cubic-bezier(0.16,1,0.3,1), box-shadow 0.5s ease, border-color 0.5s ease;
        }
        .oc-arm-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 60px -12px rgba(0,0,0,0.3);
          border-color: rgba(184,146,63,0.25);
        }

        .oc-ep-row {
          transition: background 0.3s ease, padding-left 0.3s ease;
          border-radius: 4px;
          margin: 0 -12px;
          padding-left: 12px !important;
          padding-right: 12px !important;
        }
        .oc-ep-row:hover {
          background: rgba(245, 239, 229, 0.05);
          padding-left: 20px !important;
        }

        .oc-apply-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .oc-apply-c { padding: clamp(80px, 12vw, 140px) clamp(40px, 5vw, 80px); position: relative; overflow: hidden; }
        .oc-apply-dark {
          background-image: linear-gradient(165deg, rgba(61,14,20,0.8) 0%, rgba(97,24,35,0.7) 100%), url(/brand/hero-texture.png);
          background-size: cover, cover;
          background-position: center, center;
        }
        .oc-apply-light { background: var(--parchment); }

        @media (max-width: 760px) {
          .oc-arms-grid { grid-template-columns: 1fr; }
          .oc-arm-card { padding: 32px 28px; }
          .oc-apply-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
