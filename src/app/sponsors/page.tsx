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
      <Nav tone="ivory" />
      <PageHero eyebrow="For partners" word="Partner with the room" emphasis="for builders.">
        Reach founders, owners, executives, creators, and decision-makers across
        the podcast, newsletter, and live events.
      </PageHero>

      <section className="on-paper-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px)" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <Reveal>
            <div className="gold-divider" style={{ marginBottom: "28px" }} />
            <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "24px" }}>
              Who you reach
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.6vw,48px)", lineHeight: 1.1, color: "var(--burgundy)", marginBottom: "48px", maxWidth: "600px" }}>
              The people{" "}
              <em className="serif-it" style={{ color: "var(--burgundy-deep)" }}>
                actually building
              </em>{" "}
              what&apos;s next.
            </h2>
          </Reveal>
          <RevealGroup className="oc-aud-grid" stagger={0.05}>
            {audienceTypes.map((a) => (
              <RevealItem key={a}>
                <div className="oc-aud-cell serif" style={{ fontSize: "clamp(20px,2.4vw,26px)", color: "var(--burgundy)" }}>
                  {a}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="on-field-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px)", background: "linear-gradient(170deg, var(--burgundy), var(--burgundy-deep))" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "24px" }}>
              Where you show up
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.4vw,48px)", lineHeight: 1.1, color: "var(--parchment)", marginBottom: "48px" }}>
              Across the whole{" "}
              <em className="serif-it">platform.</em>
            </h2>
          </Reveal>
          <RevealGroup>
            {sponsorInventory.map((s) => (
              <RevealItem key={s.asset}>
                <div className="oc-inv-row">
                  <span className="serif" style={{ fontSize: "clamp(22px,3vw,30px)", color: "var(--parchment)", flex: "0 0 200px" }}>
                    {s.asset}
                  </span>
                  <span style={{ fontSize: "15px", color: "rgba(245,239,229,0.72)", flex: 1, lineHeight: 1.6 }}>
                    {s.placement}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="on-paper-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px)" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "24px" }}>
              Partnership tiers
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.4vw,48px)", lineHeight: 1.1, color: "var(--burgundy)", marginBottom: "18px" }}>
              Built around your{" "}
              <em className="serif-it" style={{ color: "var(--burgundy-deep)" }}>
                goals.
              </em>
            </h2>
            <p style={{ fontSize: "15px", color: "var(--espresso)", opacity: 0.65, marginBottom: "48px" }}>
              Custom packages available. Pricing shared on inquiry.
            </p>
          </Reveal>
          <RevealGroup className="oc-tier-grid" stagger={0.08}>
            {sponsorTiers.map((t) => (
              <RevealItem key={t.name}>
                <div className={`oc-tier ${t.featured ? "oc-tier-feat" : ""}`}>
                  {t.featured && <div className="oc-tier-badge">Most popular</div>}
                  <h3 className="serif" style={{ fontSize: "26px", color: t.featured ? "var(--parchment)" : "var(--burgundy)", marginBottom: "12px" }}>
                    {t.name}
                  </h3>
                  <p style={{ fontSize: "14px", lineHeight: 1.65, color: t.featured ? "rgba(245,239,229,0.72)" : "var(--espresso)", opacity: t.featured ? 1 : 0.7, marginBottom: "24px" }}>
                    {t.description}
                  </p>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
                    {t.features.map((f) => (
                      <li
                        key={f}
                        style={{
                          fontSize: "13.5px",
                          display: "flex",
                          gap: "10px",
                          color: t.featured ? "rgba(245,239,229,0.82)" : "var(--espresso)",
                          opacity: t.featured ? 1 : 0.8,
                        }}
                      >
                        <span style={{ color: "var(--gold)" }}>--</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <WaitlistButton
                    intent="Sponsor / Partner"
                    source={`Sponsors ${t.name}`}
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

      <section id="inquire" className="on-field-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px) 150px", background: "linear-gradient(170deg, var(--burgundy), var(--burgundy-deep))" }}>
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "20px", textAlign: "center" }}>
              Start the conversation
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.4vw,44px)", lineHeight: 1.1, textAlign: "center", color: "var(--parchment)", marginBottom: "40px" }}>
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
        .oc-aud-cell { padding:36px 24px; border-top:1px solid var(--taupe); border-left:1px solid var(--taupe); }
        .oc-aud-grid > div:nth-child(3n) .oc-aud-cell { border-right:1px solid var(--taupe); }
        .oc-aud-grid > div:nth-last-child(-n+1) .oc-aud-cell { border-bottom:1px solid var(--taupe); }
        .oc-inv-row { display:flex; align-items:baseline; gap:32px; border-top:1px solid rgba(245,239,229,.15); padding:28px 0; }
        .oc-inv-row:last-child { border-bottom:1px solid rgba(245,239,229,.15); }
        .oc-tier-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:20px; align-items:start; }
        .oc-tier { border:1px solid var(--taupe); background:#fff; padding:34px 28px; position:relative; border-radius:12px; }
        .oc-tier-feat { background:var(--burgundy); border-color:var(--burgundy); }
        .oc-tier-badge { position:absolute; top:-13px; left:28px; background:var(--gold); color:var(--burgundy-deep); font-size:10px; letter-spacing:.14em; text-transform:uppercase; font-weight:600; padding:5px 14px; border-radius:999px; }
        .oc-form-card { border:1px solid rgba(245,239,229,.18); background:rgba(245,239,229,.05); padding:clamp(28px,4vw,44px); border-radius:12px; }
        @media (max-width:980px){ .oc-tier-grid { grid-template-columns:1fr; } .oc-aud-grid { grid-template-columns:repeat(2,1fr);} }
        @media (max-width:620px){ .oc-aud-grid { grid-template-columns:1fr;} .oc-inv-row { flex-wrap:wrap; gap:10px;} }
      `}</style>
    </>
  );
}
