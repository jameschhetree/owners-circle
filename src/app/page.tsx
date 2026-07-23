"use client";

import Image from "next/image";
import Link from "next/link";
import { Nav } from "@/components/Nav";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { WaitlistButton } from "@/components/Waitlist";
import { Parallax } from "@/components/Parallax";
import { episodes } from "@/data/episodes";

const contentArms = [
  {
    label: "Owner's Circle",
    sub: "The Podcast",
    desc: "Long-form conversations with the founders, operators, and builders shaping what's next. Real stories, real lessons, real rooms.",
    href: "/episodes",
    cta: "View Episodes",
  },
  {
    label: "Owner's Notes",
    sub: "Solo Episodes & Articles",
    desc: "Sharp takeaways, frameworks, and field notes from inside the circle. Written for builders who want the lesson without the fluff.",
    href: "/newsletter",
    cta: "Read Notes",
  },
];

export default function Home() {
  const featuredEps = episodes.slice(0, 3);

  return (
    <>
      <Nav tone="burgundy" />

      {/* HERO — burgundy with generated texture */}
      <section
        className="oc-grain"
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          padding: "140px 28px 100px",
          backgroundImage: "linear-gradient(165deg, rgba(122,31,43,0.7) 0%, rgba(97,24,35,0.75) 40%, rgba(61,14,20,0.85) 100%), url(/brand/hero-texture.png)",
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* atmospheric gold glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "-20%",
            right: "-10%",
            width: "50vw",
            height: "50vw",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,162,94,0.08) 0%, transparent 70%)",
            pointerEvents: "none",
          }}
        />
        {/* oversized typographic watermark */}
        <span
          aria-hidden
          className="serif"
          style={{
            position: "absolute",
            bottom: "-8%",
            right: "-4%",
            fontSize: "clamp(200px, 35vw, 500px)",
            lineHeight: 1,
            color: "rgba(201,162,94,0.03)",
            fontWeight: 700,
            letterSpacing: "-0.04em",
            pointerEvents: "none",
            userSelect: "none",
          }}
        >
          OC
        </span>
        {/* diagonal gold accent line */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "12%",
            left: "-2%",
            width: "180px",
            height: "1px",
            background: "linear-gradient(90deg, transparent, rgba(201,162,94,0.25), transparent)",
            transform: "rotate(-35deg)",
            pointerEvents: "none",
          }}
        />
        <Reveal>
          <Image
            src="/brand/oc-logo.jpg"
            alt="Owner's Circle"
            width={160}
            height={160}
            style={{
              borderRadius: "50%",
              margin: "0 auto 44px",
              border: "3px solid var(--gold)",
              width: "clamp(120px, 20vw, 200px)",
              height: "clamp(120px, 20vw, 200px)",
              boxShadow: "0 20px 56px -8px rgba(0,0,0,0.4)",
            }}
          />
        </Reveal>
        <Reveal delay={0.08}>
          <h1
            className="serif"
            style={{
              fontSize: "clamp(40px, 7vw, 78px)",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
              color: "var(--parchment)",
              maxWidth: "800px",
              margin: "0 auto",
            }}
          >
            Where the builders{" "}
            <em className="serif-it" style={{ color: "var(--gold)" }}>
              gather.
            </em>
          </h1>
        </Reveal>
        <Reveal delay={0.16}>
          <p
            style={{
              fontSize: "clamp(15px, 1.4vw, 18px)",
              lineHeight: 1.75,
              color: "var(--parchment)",
              maxWidth: "500px",
              margin: "28px auto 0",
              opacity: 0.65,
            }}
          >
            A podcast, newsletter, and private network for the owners,
            operators, and leaders building real companies.
          </p>
        </Reveal>
        <Reveal delay={0.24}>
          <div
            style={{
              marginTop: "44px",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "16px",
            }}
          >
            <WaitlistButton
              intent="Newsletter"
              source="Home hero"
              className="pill pill-gold"
              style={{ fontSize: "13px", padding: "16px 36px" }}
            >
              Subscribe to the Newsletter
            </WaitlistButton>
            <span
              style={{
                fontSize: "11.5px",
                color: "var(--parchment)",
                opacity: 0.35,
                letterSpacing: "0.06em",
              }}
            >
              Free. Weekly. For builders only.
            </span>
          </div>
        </Reveal>
        <div
          style={{
            position: "absolute",
            bottom: "0",
            left: "50%",
            transform: "translateX(-50%)",
            width: "1px",
            height: "60px",
            background: "linear-gradient(to bottom, var(--gold-champagne), transparent)",
          }}
          aria-hidden
        />
      </section>

      {/* gold rule */}
      <hr className="gold-hr" style={{ margin: "0 auto" }} />

      {/* WHAT IS OWNER'S CIRCLE — parchment bg */}
      <section
        style={{
          padding: "clamp(100px, 14vw, 160px) 28px",
          background: "var(--parchment)",
          position: "relative",
        }}
      >
        <Reveal>
          <Parallax
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              textAlign: "center",
            }}
            y={-30}
            opacityFrom={0.8}
            opacityTo={0.8}
          >
            <div
              className="gold-divider"
              style={{ margin: "0 auto 36px" }}
            />
            <h2
              className="serif"
              style={{
                fontSize: "clamp(30px, 5vw, 54px)",
                lineHeight: 1.1,
                color: "var(--burgundy)",
              }}
            >
              Two arms. One circle.
            </h2>
            <p
              style={{
                margin: "28px auto 0",
                fontSize: "clamp(15px, 1.3vw, 17px)",
                lineHeight: 1.75,
                color: "var(--espresso)",
                opacity: 0.75,
                maxWidth: "560px",
              }}
            >
              Owner&apos;s Circle lives in two formats -- the podcast brings the
              conversations, and Owner&apos;s Notes delivers the lessons, frameworks,
              and field notes directly to you.
            </p>
          </Parallax>
        </Reveal>

        <div
          className="oc-arms-grid"
          style={{
            maxWidth: "960px",
            margin: "72px auto 0",
          }}
        >
          <RevealGroup className="oc-arms-grid" stagger={0.1}>
            {contentArms.map((arm) => (
              <RevealItem key={arm.label}>
                <div className="oc-arm-card">
                  <span
                    className="tag"
                    style={{
                      color: "var(--gold)",
                      display: "block",
                      marginBottom: "14px",
                    }}
                  >
                    {arm.sub}
                  </span>
                  <h3
                    className="serif"
                    style={{
                      fontSize: "clamp(26px, 3vw, 36px)",
                      lineHeight: 1.15,
                      color: "var(--burgundy)",
                      marginBottom: "16px",
                    }}
                  >
                    {arm.label}
                  </h3>
                  <p
                    style={{
                      fontSize: "15px",
                      lineHeight: 1.7,
                      color: "var(--espresso)",
                      opacity: 0.75,
                      marginBottom: "28px",
                    }}
                  >
                    {arm.desc}
                  </p>
                  <Link
                    href={arm.href}
                    className="pill-outline on-paper"
                    style={{ fontSize: "11px", padding: "11px 22px" }}
                  >
                    {arm.cta}
                  </Link>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* FEATURED EPISODES TEASER — burgundy */}
      <section
        className="on-field-sec"
        style={{
          padding: "clamp(90px, 13vw, 140px) 28px",
          background:
            "linear-gradient(170deg, var(--burgundy) 0%, var(--burgundy-deep) 100%)",
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
                  className="serif"
                  style={{
                    fontSize: "clamp(32px, 5vw, 52px)",
                    lineHeight: 1.05,
                    marginTop: "12px",
                    color: "var(--parchment)",
                  }}
                >
                  The conversations
                </h2>
              </div>
              <Link href="/episodes" className="link-ul">
                All episodes
              </Link>
            </div>
          </Reveal>

          <RevealGroup stagger={0.06}>
            {featuredEps.map((ep, i) => (
              <RevealItem key={ep.id}>
                <div
                  className="oc-ep-row"
                  style={{
                    borderTop: "1px solid rgba(245,239,229,0.15)",
                    padding: "28px 0",
                    display: "flex",
                    gap: "20px",
                    alignItems: "baseline",
                    flexWrap: "wrap",
                    borderBottom:
                      i === featuredEps.length - 1
                        ? "1px solid rgba(245,239,229,0.15)"
                        : "none",
                  }}
                >
                  <span
                    className="serif serif-it"
                    style={{
                      fontSize: "18px",
                      color: "var(--gold)",
                      minWidth: "40px",
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className="tag"
                    style={{
                      color: "rgba(245,239,229,0.5)",
                      minWidth: "100px",
                    }}
                  >
                    {ep.category}
                  </span>
                  <span
                    className="serif"
                    style={{
                      fontSize: "clamp(20px, 2.5vw, 26px)",
                      color: "var(--parchment)",
                      flex: 1,
                      lineHeight: 1.25,
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

      {/* NEWSLETTER CTA — deep dark with generated texture */}
      <section
        className="oc-grain"
        style={{
          padding: "clamp(100px, 14vw, 160px) 28px",
          textAlign: "center",
          backgroundImage: "linear-gradient(175deg, rgba(18,10,11,0.88) 0%, rgba(31,15,19,0.82) 40%, rgba(97,24,35,0.75) 100%), url(/brand/dark-texture.png)",
          backgroundSize: "cover, cover",
          backgroundPosition: "center, center",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* gold radial glow */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: "80vw",
            height: "80vw",
            maxWidth: "700px",
            maxHeight: "700px",
            borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,162,94,0.06) 0%, transparent 60%)",
            pointerEvents: "none",
          }}
        />
        <Reveal>
          <div style={{ maxWidth: "620px", margin: "0 auto", position: "relative", zIndex: 2 }}>
            <div
              className="gold-divider"
              style={{ margin: "0 auto 36px" }}
            />
            <span
              className="tag"
              style={{
                color: "var(--gold)",
                display: "block",
                marginBottom: "20px",
              }}
            >
              Owner&apos;s Notes — Weekly
            </span>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(32px, 5vw, 56px)",
                lineHeight: 1.08,
                color: "var(--parchment)",
              }}
            >
              Stay inside{" "}
              <em className="serif-it" style={{ color: "var(--gold-champagne)" }}>
                the circle.
              </em>
            </h2>
            <p
              style={{
                margin: "24px auto 0",
                fontSize: "16px",
                lineHeight: 1.7,
                color: "var(--parchment)",
                opacity: 0.55,
                maxWidth: "480px",
              }}
            >
              Lessons, stories, and opportunities from inside the circle.
              One email a week. For the people building.
            </p>
            <div style={{ marginTop: "40px" }}>
              <WaitlistButton
                intent="Newsletter"
                source="Home · Newsletter CTA"
                className="pill pill-gold"
                style={{ fontSize: "13px", padding: "16px 36px" }}
              >
                Subscribe Free
              </WaitlistButton>
            </div>
          </div>
        </Reveal>
      </section>

      {/* FOR BUILDERS / FOR PARTNERS — editorial split */}
      <section style={{ borderTop: "none" }}>
        <div className="oc-apply-grid">
          <Reveal className="oc-apply-c oc-apply-dark">
            <span
              className="tag"
              style={{ color: "var(--gold)", display: "block", marginBottom: "18px" }}
            >
              For builders
            </span>
            <h3
              className="serif"
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                lineHeight: 1.1,
                color: "var(--parchment)",
              }}
            >
              Know someone who{" "}
              <em className="serif-it" style={{ color: "var(--gold-champagne)" }}>belongs?</em>
            </h3>
            <p
              style={{
                marginTop: "18px",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--parchment)",
                opacity: 0.6,
                maxWidth: "380px",
              }}
            >
              We spotlight people building real companies. They don&apos;t need
              to be famous. They need to be real.
            </p>
            <WaitlistButton
              intent="Nominate a guest"
              source="Home · Nominate"
              className="pill-outline on-field"
              style={{ marginTop: "32px", display: "inline-flex" }}
            >
              Nominate a Guest
            </WaitlistButton>
          </Reveal>

          <Reveal className="oc-apply-c oc-apply-light" delay={0.06}>
            <span
              className="tag"
              style={{ color: "var(--burgundy)", display: "block", marginBottom: "18px" }}
            >
              For partners
            </span>
            <h3
              className="serif"
              style={{
                fontSize: "clamp(28px, 4vw, 42px)",
                lineHeight: 1.1,
                color: "var(--burgundy)",
              }}
            >
              Reach the people{" "}
              <em className="serif-it">building.</em>
            </h3>
            <p
              style={{
                marginTop: "18px",
                fontSize: "15px",
                lineHeight: 1.7,
                color: "var(--espresso)",
                opacity: 0.7,
                maxWidth: "380px",
              }}
            >
              Partner across the podcast, newsletter, and live events to reach
              founders, owners, and decision-makers.
            </p>
            <WaitlistButton
              intent="Sponsor / Partner"
              source="Home · Partner"
              className="pill-outline on-paper"
              style={{ marginTop: "32px", display: "inline-flex" }}
            >
              Partner With Us
            </WaitlistButton>
          </Reveal>
        </div>
      </section>

      <style>{`
        .oc-arms-grid { display: grid; grid-template-columns: 1fr; gap: 24px; max-width: 800px; margin: 72px auto 0; }
        .oc-arm-card {
          background: var(--ivory);
          padding: 48px 52px;
          border-left: 3px solid var(--burgundy);
          border-radius: 0 16px 16px 0;
          transition: background 0.5s cubic-bezier(0.16,1,0.3,1), border-color 0.5s ease, box-shadow 0.5s ease, transform 0.5s cubic-bezier(0.16,1,0.3,1);
        }
        .oc-arm-card:hover {
          background: #fff;
          border-left-color: var(--gold);
          box-shadow: 0 20px 56px -16px rgba(122, 31, 43, 0.12);
          transform: translateX(6px);
        }
        @media (max-width: 760px) {
          .oc-arm-card { padding: 32px 28px; }
        }
        .oc-ep-row {
          transition: background 0.3s ease;
          border-radius: 4px;
          margin: 0 -12px;
          padding-left: 12px !important;
          padding-right: 12px !important;
        }
        .oc-ep-row:hover {
          background: rgba(245, 239, 229, 0.06);
        }
        .oc-apply-grid { display: grid; grid-template-columns: 1fr 1fr; }
        .oc-apply-c { padding: clamp(70px, 10vw, 120px) clamp(40px, 5vw, 72px); }
        .oc-apply-dark { background: var(--burgundy); }
        .oc-apply-light { background: var(--parchment); }
        @media (max-width: 760px) {
          .oc-apply-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
