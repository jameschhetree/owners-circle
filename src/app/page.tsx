"use client";

import Link from "next/link";
import { Nav } from "@/components/Nav";
import { HeroField } from "@/components/HeroField";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { NewsletterForm } from "@/components/NewsletterForm";
import { WaitlistButton } from "@/components/Waitlist";
import { Parallax, StickyScrub } from "@/components/Parallax";

const podcastRows = [
  { c: "Growth · Ep 02", h: "The systems behind a scaling operator." },
  { c: "Technology · Ep 03", h: "AI, automation, and the future of work." },
  { c: "The Room · Ep 04", h: "Relationships, referrals, and access." },
];

const pillars = [
  { n: "01", name: "Ownership", d: "The pressure, discipline, and mindset behind building something real." },
  { n: "02", name: "Growth", d: "Sales, marketing, hiring, capital, systems, and scale." },
  { n: "03", name: "Leadership", d: "The decisions, people, and lessons that shape operators." },
  { n: "04", name: "Technology", d: "AI, automation, tools, and the future of work." },
  { n: "05", name: "The Room", d: "Relationships, referrals, access, and community." },
];

const galleryTex = [
  { cls: "tex-flat", h: 200, mt: 60 },
  { cls: "tex-flat", h: 260, mt: 0 },
  { cls: "tex-ember", h: 300, mt: 30 },
  { cls: "tex-flat", h: 230, mt: 80 },
  { cls: "tex-deep", h: 280, mt: 0 },
];

export default function Home() {
  return (
    <>
      <Nav tone="field" />

      <HeroField />

      {/* MANIFESTO — vast whitespace */}
      <section className="on-paper-sec" style={{ padding: "clamp(120px,18vw,200px) 56px" }}>
        <Reveal className="oc-wrap" >
          <Parallax
            style={{ maxWidth: "1000px", margin: "0 auto", textAlign: "center" }}
            y={-46}
            opacityFrom={0.72}
            opacityTo={0.72}
          >
            <span className="tag" style={{ color: "var(--field)", display: "block", marginBottom: "40px" }}>
              Why Owner&apos;s Circle exists
            </span>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(34px,6vw,72px)",
                lineHeight: 1.12,
                letterSpacing: "-0.02em",
                color: "var(--ink)",
              }}
            >
              Most networking feels random.
              <br />
              <em className="serif-it" style={{ color: "var(--field)" }}>
                Owner&apos;s Circle is curated.
              </em>
            </h2>
            <p
              style={{
                margin: "46px auto 0",
                fontSize: "clamp(16px,1.4vw,18px)",
                lineHeight: 1.75,
                color: "#5a4a3c",
                maxWidth: "620px",
              }}
            >
              We&apos;re building a media platform and private community around
              people who are actually building. The podcast tells the stories.
              The newsletter keeps the audience close. The events bring the room
              to life.
            </p>
            <div
              style={{
                width: "60px",
                height: "1px",
                background: "var(--field)",
                margin: "60px auto 0",
              }}
            />
          </Parallax>
        </Reveal>
      </section>

      {/* PODCAST — broken-axis editorial split */}
      <section className="on-field-sec" style={{ padding: "clamp(110px,15vw,150px) 56px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <Reveal>
            <div className="oc-pod-head">
              <div>
                <span className="tag" style={{ color: "var(--ember)" }}>
                  The Conversations
                </span>
                <h2
                  className="serif"
                  style={{ fontSize: "clamp(40px,7vw,80px)", lineHeight: 0.92, marginTop: "14px" }}
                >
                  Real builders.
                  <br />
                  <em className="serif-it">Real rooms.</em>
                </h2>
              </div>
              <Link href="/episodes" className="link-ul">
                All episodes →
              </Link>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="oc-feat">
              <div className="oc-feat-big tex-frame">
                <Parallax
                  ariaHidden
                  className="tex-deep"
                  style={{
                    position: "absolute",
                    inset: "-12% 0",
                    zIndex: 0,
                  }}
                  y={56}
                  scaleFrom={1.06}
                  scaleTo={1.06}
                />
                <div
                  style={{
                    position: "absolute",
                    top: "26px",
                    left: "26px",
                    fontSize: "11px",
                    letterSpacing: "0.24em",
                    textTransform: "uppercase",
                    color: "var(--ember)",
                    zIndex: 2,
                  }}
                >
                  Episode 01 · Ownership · 58 min
                </div>
                <div
                  className="serif"
                  style={{
                    position: "absolute",
                    left: "26px",
                    bottom: "26px",
                    right: "26px",
                    fontSize: "clamp(26px,3.4vw,40px)",
                    lineHeight: 1.08,
                    zIndex: 2,
                  }}
                >
                  What it actually costs to build something real.
                  <span
                    style={{
                      display: "block",
                      fontFamily: "var(--font-sans), sans-serif",
                      fontSize: "13px",
                      letterSpacing: "0.05em",
                      color: "rgba(243,236,225,0.65)",
                      marginTop: "14px",
                    }}
                  >
                    A DMV founder on the pressure, discipline, and mindset behind
                    eight figures.
                  </span>
                </div>
              </div>

              <div className="oc-feat-col">
                {podcastRows.map((r, i) => (
                  <div
                    key={r.c}
                    style={{
                      borderTop: "1px solid rgba(243,236,225,0.22)",
                      borderBottom:
                        i === podcastRows.length - 1
                          ? "1px solid rgba(243,236,225,0.22)"
                          : "none",
                      padding: "24px 0",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "10.5px",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--ember)",
                      }}
                    >
                      {r.c}
                    </div>
                    <div
                      className="serif"
                      style={{ fontSize: "21px", marginTop: "10px", lineHeight: 1.25 }}
                    >
                      {r.h}
                    </div>
                  </div>
                ))}
                <WaitlistButton
                  intent="Newsletter"
                  source="Home · Watch Episodes"
                  className="pill"
                  style={{ marginTop: "30px", display: "inline-flex" }}
                >
                  Watch Episodes
                </WaitlistButton>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* PILLARS — sticky scrubbed ledger (signature pinned moment #2) */}
      <section className="on-paper-sec" style={{ padding: "clamp(110px,15vw,160px) 56px" }}>
        <StickyScrub
          trackHeight="240vh"
          heading={
            <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
              <span className="tag" style={{ color: "var(--field)", display: "block", marginBottom: "26px" }}>
                What we talk about
              </span>
              <h2
                className="serif"
                style={{
                  fontSize: "clamp(34px,5.5vw,64px)",
                  lineHeight: 1.05,
                  color: "var(--ink)",
                  maxWidth: "760px",
                }}
              >
                Five things that decide whether you{" "}
                <em className="serif-it" style={{ color: "var(--field)" }}>
                  build something real.
                </em>
              </h2>
            </div>
          }
        >
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <RevealGroup>
            {pillars.map((p) => (
              <RevealItem key={p.n}>
                <div className="oc-ledger-row">
                  <span
                    className="serif serif-it"
                    style={{ fontSize: "20px", color: "var(--ember)", minWidth: "54px" }}
                  >
                    {p.n}
                  </span>
                  <span
                    className="serif"
                    style={{
                      fontSize: "clamp(24px,3vw,34px)",
                      color: "var(--ink)",
                      flex: "0 0 240px",
                    }}
                  >
                    {p.name}
                  </span>
                  <span
                    style={{
                      fontSize: "15px",
                      color: "#5a4a3c",
                      lineHeight: 1.6,
                      flex: 1,
                    }}
                  >
                    {p.d}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
        </StickyScrub>
      </section>

      {/* NEWSLETTER — staggered gallery + signup */}
      <section className="on-paper-sec" style={{ padding: "clamp(120px,16vw,170px) 56px", background: "var(--paper)", borderTop: "1px solid var(--rule)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <RevealGroup
            className="oc-gallery"
            stagger={0.08}
          >
            {galleryTex.map((t, i) => (
              <RevealItem key={i}>
                <Parallax
                  ariaHidden
                  className={t.cls}
                  style={{
                    height: `${t.h}px`,
                    marginTop: `${t.mt}px`,
                  }}
                  y={i % 2 === 0 ? -54 : -22}
                  scaleFrom={1.04}
                  scaleTo={1.04}
                />
              </RevealItem>
            ))}
          </RevealGroup>

          <Reveal>
            <div style={{ textAlign: "center", maxWidth: "760px", margin: "110px auto 0" }}>
              <span className="tag" style={{ color: "var(--field)", display: "block", marginBottom: "30px" }}>
                Inside the Circle · Weekly
              </span>
              <h2
                className="serif"
                style={{ fontSize: "clamp(34px,5vw,60px)", lineHeight: 1.1, color: "var(--ink)" }}
              >
                The lessons, stories, and{" "}
                <em className="serif-it" style={{ color: "var(--field)" }}>
                  opportunities
                </em>{" "}
                from inside.
              </h2>
              <p
                style={{
                  margin: "28px auto 0",
                  fontSize: "16px",
                  lineHeight: 1.7,
                  color: "#5a4a3c",
                  maxWidth: "520px",
                }}
              >
                Every week — sharp takeaways from featured owners and leaders,
                plus the asks and introductions shaping the DMV business
                community.
              </p>
              <div style={{ marginTop: "46px" }}>
                <NewsletterForm variant="inline" tone="paper" />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* APPLY — for builders / for partners */}
      <section className="on-field-sec">
        <div className="oc-apply-grid">
          <Reveal className="oc-apply-c">
            <div className="serif serif-it" style={{ fontSize: "17px", color: "var(--ember)" }}>
              For builders
            </div>
            <h3
              className="serif"
              style={{ fontSize: "clamp(34px,4.6vw,52px)", lineHeight: 1.06, marginTop: "22px" }}
            >
              Know someone who{" "}
              <em className="serif-it">belongs?</em>
            </h3>
            <p
              style={{
                marginTop: "24px",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(243,236,225,0.72)",
                maxWidth: "420px",
              }}
            >
              We&apos;re looking for business owners, operators, creators, and
              tech leaders with real stories, real lessons, and real rooms. They
              don&apos;t need to be famous. They need to be real.
            </p>
            <WaitlistButton
              intent="Nominate a guest"
              source="Home · Nominate a Guest"
              className="pill"
              style={{ marginTop: "42px", display: "inline-flex" }}
            >
              Nominate a Guest
            </WaitlistButton>
          </Reveal>

          <Reveal className="oc-apply-c oc-apply-c2" delay={0.06}>
            <div className="serif serif-it" style={{ fontSize: "17px", color: "var(--ember)" }}>
              For partners
            </div>
            <h3
              className="serif"
              style={{ fontSize: "clamp(34px,4.6vw,52px)", lineHeight: 1.06, marginTop: "22px" }}
            >
              Reach the people{" "}
              <em className="serif-it">building</em> the DMV.
            </h3>
            <p
              style={{
                marginTop: "24px",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "rgba(243,236,225,0.72)",
                maxWidth: "420px",
              }}
            >
              Partner across the podcast, newsletter, and live events to reach
              founders, owners, executives, creators, and decision-makers.
            </p>
            <WaitlistButton
              intent="Sponsor / Partner"
              source="Home · Sponsor / Partner"
              className="pill"
              style={{ marginTop: "42px", display: "inline-flex" }}
            >
              Sponsor / Partner
            </WaitlistButton>
          </Reveal>
        </div>
      </section>

      <style>{`
        .oc-pod-head { display:flex; justify-content:space-between; align-items:flex-end; margin-bottom:60px; gap:24px; }
        .oc-feat { display:grid; grid-template-columns:1.7fr 1fr; gap:50px; align-items:end; }
        .oc-feat-big { height:480px; overflow:hidden; position:relative; }
        .oc-feat-col { padding-bottom:14px; }
        .oc-ledger-row { display:flex; align-items:baseline; gap:32px; border-top:1px solid var(--rule); padding:34px 0; }
        .oc-ledger-row:last-child { border-bottom:1px solid var(--rule); }
        .oc-gallery { display:grid; grid-template-columns:repeat(5,1fr); gap:22px; align-items:start; }
        .oc-apply-grid { max-width:1240px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; }
        .oc-apply-c { padding:clamp(90px,11vw,140px) clamp(36px,5vw,70px); }
        .oc-apply-c { border-right:1px solid rgba(243,236,225,0.2); }
        .oc-apply-c2 { border-right:none; }
        @media (max-width: 900px) {
          .oc-feat { grid-template-columns:1fr; gap:36px; }
          .oc-feat-big { height:360px; }
          .oc-gallery { grid-template-columns:repeat(2,1fr); }
          .oc-gallery > div:nth-child(n) > div { margin-top:0 !important; }
          .oc-apply-grid { grid-template-columns:1fr; }
          .oc-apply-c { border-right:none; border-bottom:1px solid rgba(243,236,225,0.2); }
          .oc-ledger-row { flex-wrap:wrap; gap:14px; }
        }
        @media (max-width: 560px) {
          .oc-pod-head { flex-direction:column; align-items:flex-start; }
        }
      `}</style>
    </>
  );
}
