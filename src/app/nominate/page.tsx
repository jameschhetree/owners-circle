"use client";

import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { GuestNominationForm } from "@/components/GuestNominationForm";

export default function NominatePage() {
  return (
    <>
      <Nav tone="field" />
      <PageHero eyebrow="For builders" word="Know someone who" emphasis="belongs in the circle?">
        We&apos;re looking for people building real companies, real influence,
        and real rooms. They don&apos;t need to be famous. They need to be real.
      </PageHero>

      <section className="on-field-sec" style={{ padding: "clamp(90px,12vw,130px) clamp(28px,5vw,56px) 150px", background: "var(--field)" }}>
        <div className="oc-nom-split">
          <Reveal>
            <div>
              <span className="tag" style={{ color: "var(--ember)", display: "block", marginBottom: "26px" }}>
                Who we&apos;re looking for
              </span>
              <h2 className="serif" style={{ fontSize: "clamp(30px,4.2vw,46px)", lineHeight: 1.12, marginBottom: "28px" }}>
                Real owners.
                <br />
                <em className="serif-it" style={{ color: "var(--ember)" }}>
                  Real rooms.
                </em>
              </h2>
              <p style={{ fontSize: "16px", lineHeight: 1.75, color: "rgba(243,236,225,0.72)", maxWidth: "420px" }}>
                Business owners, operators, creators, and tech leaders with a
                strong story, a real business, an audience, or a network worth
                opening to the circle. If they&apos;re building something that
                matters in the DMV, we want to hear it.
              </p>
              <ul style={{ marginTop: "34px", listStyle: "none", display: "flex", flexDirection: "column", gap: "14px" }}>
                {["A real story, not a highlight reel", "A real business or platform", "A real room — relationships and reach"].map((x) => (
                  <li key={x} style={{ display: "flex", gap: "14px", alignItems: "baseline", fontSize: "15px", color: "rgba(243,236,225,0.8)" }}>
                    <span className="serif serif-it" style={{ color: "var(--ember)" }}>—</span>
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
        .oc-nom-split { max-width:1180px; margin:0 auto; display:grid; grid-template-columns:0.85fr 1.15fr; gap:72px; align-items:start; }
        .oc-form-card { border:1px solid rgba(243,236,225,.2); background:rgba(243,236,225,.04); padding:clamp(28px,4vw,48px); }
        @media (max-width:900px){ .oc-nom-split { grid-template-columns:1fr; gap:48px; } }
      `}</style>
    </>
  );
}
