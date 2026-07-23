"use client";

import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GuestNominationForm } from "@/components/GuestNominationForm";

export default function NominatePage() {
  return (
    <>
      <Nav tone="ivory" />
      <PageHero eyebrow="For builders" word="Know someone who" emphasis="belongs in the circle?">
        We&apos;re looking for people building real companies, real influence,
        and real rooms. They don&apos;t need to be famous. They need to be real.
      </PageHero>

      <section className="on-field-sec" style={{ padding: "clamp(90px,12vw,130px) clamp(28px,5vw,56px) 150px", background: "linear-gradient(170deg, var(--burgundy), var(--burgundy-deep))" }}>
        <div className="oc-nom-split">
          <Reveal>
            <div>
              <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "22px" }}>
                Who we&apos;re looking for
              </span>
              <h2 className="serif" style={{ fontSize: "clamp(30px,4.2vw,44px)", lineHeight: 1.12, color: "var(--parchment)", marginBottom: "24px" }}>
                Real owners.
                <br />
                <em className="serif-it" style={{ color: "var(--gold-champagne)" }}>
                  Real rooms.
                </em>
              </h2>
              <p style={{ fontSize: "15px", lineHeight: 1.75, color: "rgba(245,239,229,0.72)", maxWidth: "400px" }}>
                Business owners, operators, creators, and tech leaders with a
                strong story, a real business, an audience, or a network worth
                opening to the circle.
              </p>
              <ul style={{ marginTop: "30px", listStyle: "none", display: "flex", flexDirection: "column", gap: "12px" }}>
                {["A real story, not a highlight reel", "A real business or platform", "A real room -- relationships and reach"].map((x) => (
                  <li key={x} style={{ display: "flex", gap: "12px", alignItems: "baseline", fontSize: "14px", color: "rgba(245,239,229,0.8)" }}>
                    <span className="serif serif-it" style={{ color: "var(--gold)" }}>--</span>
                    {x}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="oc-form-card">
              <GuestNominationForm />
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .oc-nom-split { max-width:960px; margin:0 auto; display:grid; grid-template-columns:0.85fr 1.15fr; gap:60px; align-items:start; }
        .oc-form-card { border:1px solid rgba(245,239,229,.18); background:rgba(245,239,229,.05); padding:clamp(28px,4vw,44px); border-radius:12px; }
        @media (max-width:900px){ .oc-nom-split { grid-template-columns:1fr; gap:44px; } }
      `}</style>
    </>
  );
}
