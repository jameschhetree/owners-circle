"use client";

import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { SponsorInquiryForm } from "@/components/SponsorInquiryForm";
import { WaitlistButton } from "@/components/Waitlist";
import { sponsorTiers, sponsorInventory, audienceTypes } from "@/data/sponsors";

export default function SponsorsPage() {
  return (
    <>
      <Nav tone="field" />
      <PageHero eyebrow="For partners" word="Partner with the room" emphasis="for DMV builders.">
        Reach founders, owners, executives, creators, and decision-makers across
        the podcast, newsletter, and live events.
      </PageHero>

      {/* Audience */}
      <section className="on-paper-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--field)", display: "block", marginBottom: "24px" }}>
              Who you reach
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.6vw,52px)", lineHeight: 1.1, color: "var(--ink)", marginBottom: "56px", maxWidth: "640px" }}>
              The people{" "}
              <em className="serif-it" style={{ color: "var(--field)" }}>
                actually building
              </em>{" "}
              the DMV.
            </h2>
          </Reveal>
          <RevealGroup className="oc-aud-grid" stagger={0.05}>
            {audienceTypes.map((a) => (
              <RevealItem key={a}>
                <div className="oc-aud-cell serif" style={{ fontSize: "clamp(20px,2.4vw,28px)", color: "var(--ink)" }}>
                  {a}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Inventory */}
      <section className="on-field-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--ember)", display: "block", marginBottom: "24px" }}>
              Where you show up
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.4vw,48px)", lineHeight: 1.1, marginBottom: "56px" }}>
              Across the whole{" "}
              <em className="serif-it">platform.</em>
            </h2>
          </Reveal>
          <RevealGroup>
            {sponsorInventory.map((s) => (
              <RevealItem key={s.asset}>
                <div className="oc-inv-row">
                  <span className="serif" style={{ fontSize: "clamp(22px,3vw,32px)", flex: "0 0 220px" }}>
                    {s.asset}
                  </span>
                  <span style={{ fontSize: "15px", color: "rgba(243,236,225,0.72)", flex: 1, lineHeight: 1.6 }}>
                    {s.placement}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Packages */}
      <section className="on-paper-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--field)", display: "block", marginBottom: "24px" }}>
              Partnership tiers
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.4vw,48px)", lineHeight: 1.1, color: "var(--ink)", marginBottom: "20px" }}>
              Built around your{" "}
              <em className="serif-it" style={{ color: "var(--field)" }}>
                goals.
              </em>
            </h2>
            <p style={{ fontSize: "15px", color: "#5a4a3c", marginBottom: "56px" }}>
              Custom packages available. Pricing shared on inquiry.
            </p>
          </Reveal>
          <RevealGroup className="oc-tier-grid" stagger={0.08}>
            {sponsorTiers.map((t) => (
              <RevealItem key={t.name}>
                <div className={`oc-tier ${t.featured ? "oc-tier-feat" : ""}`}>
                  {t.featured && <div className="oc-tier-badge">Most popular</div>}
                  <h3 className="serif" style={{ fontSize: "28px", color: t.featured ? "var(--bone)" : "var(--ink)", marginBottom: "14px" }}>
                    {t.name}
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.65, color: t.featured ? "rgba(243,236,225,0.72)" : "#5a4a3c", marginBottom: "26px" }}>
                    {t.description}
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "12px", marginBottom: "30px" }}>
                    {t.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          fontSize: "13.5px",
                          display: "flex",
                          gap: "12px",
                          color: t.featured ? "rgba(243,236,225,0.82)" : "var(--ink)",
                        }}
                      >
                        <span style={{ color: "var(--ember)" }}>—</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <WaitlistButton
                    intent="Sponsor / Partner"
                    source={`Sponsors · ${t.name} tier`}
                    className={t.featured ? "pill" : "pill-outline on-paper"}
                    style={{ fontSize: "11px" }}
                  >
                    Inquire
                  </WaitlistButton>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Inquiry form */}
      <section id="inquire" className="on-field-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px) 150px", background: "var(--field)" }}>
        <div style={{ maxWidth: "720px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--ember)", display: "block", marginBottom: "24px", textAlign: "center" }}>
              Start the conversation
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.4vw,48px)", lineHeight: 1.1, textAlign: "center", marginBottom: "48px" }}>
              Let&apos;s build a{" "}
              <em className="serif-it">partnership.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="oc-form-card">
              <SponsorInquiryForm />
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .oc-aud-grid { display:grid; grid-template-columns:repeat(3,1fr); }
        .oc-aud-cell { padding:40px 28px; border-top:1px solid var(--rule); border-left:1px solid var(--rule); }
        .oc-aud-grid > div:nth-child(3n) .oc-aud-cell { border-right:1px solid var(--rule); }
        .oc-aud-grid > div:nth-last-child(-n+1) .oc-aud-cell { border-bottom:1px solid var(--rule); }
        .oc-inv-row { display:flex; align-items:baseline; gap:32px; border-top:1px solid rgba(243,236,225,.2); padding:30px 0; }
        .oc-inv-row:last-child { border-bottom:1px solid rgba(243,236,225,.2); }
        .oc-tier-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:24px; align-items:start; }
        .oc-tier { border:1px solid var(--rule); background:#fff; padding:38px 32px; position:relative; }
        .oc-tier-feat { background:var(--field); border-color:var(--field); }
        .oc-tier-badge { position:absolute; top:-13px; left:32px; background:var(--ember); color:var(--field-lo); font-size:10px; letter-spacing:.16em; text-transform:uppercase; font-weight:600; padding:6px 14px; border-radius:999px; }
        .oc-form-card { border:1px solid rgba(243,236,225,.2); background:rgba(243,236,225,.04); padding:clamp(28px,4vw,48px); }
        @media (max-width:980px){ .oc-tier-grid { grid-template-columns:1fr; } .oc-aud-grid { grid-template-columns:repeat(2,1fr);} }
        @media (max-width:620px){ .oc-aud-grid { grid-template-columns:1fr;} .oc-inv-row { flex-wrap:wrap; gap:10px;} }
      `}</style>
    </>
  );
}
