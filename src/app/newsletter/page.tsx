"use client";

import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { NewsletterForm } from "@/components/NewsletterForm";

const format = [
  { n: "01", t: "This Week Inside the Circle", d: "The signal from the rooms we were in this week — quick, sharp, no filler." },
  { n: "02", t: "The Big Lesson", d: "One hard-won lesson from a featured owner or operator, broken down." },
  { n: "03", t: "The Story", d: "A real build — the bet, the wall, the turn, told the way it happened." },
  { n: "04", t: "The Playbook", d: "A concrete system you can run: sales, hiring, capital, ops, or AI." },
  { n: "05", t: "The Ask", d: "Who in the circle is looking for what — intros, talent, capital, partners." },
  { n: "06", t: "Join the Circle", d: "The next room, the next guest, and how to get closer to the network." },
];

export default function NewsletterPage() {
  return (
    <>
      <Nav tone="field" />
      <PageHero eyebrow="Inside the Circle · Weekly" word="The brief from" emphasis="inside the circle.">
        Every week — sharp takeaways from featured owners and leaders, plus the
        asks, opportunities, and introductions shaping the DMV business
        community.
      </PageHero>

      {/* Format breakdown */}
      <section className="on-paper-sec" style={{ padding: "clamp(100px,14vw,150px) clamp(28px,5vw,56px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--field)", display: "block", marginBottom: "24px" }}>
              What lands in your inbox
            </span>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(32px,5vw,56px)",
                lineHeight: 1.08,
                color: "var(--ink)",
                maxWidth: "640px",
                marginBottom: "64px",
              }}
            >
              Six sections.{" "}
              <em className="serif-it" style={{ color: "var(--field)" }}>
                Zero filler.
              </em>
            </h2>
          </Reveal>
          <RevealGroup>
            {format.map((f) => (
              <RevealItem key={f.n}>
                <div className="oc-ledger-row">
                  <span className="serif serif-it" style={{ fontSize: "20px", color: "var(--ember)", minWidth: "54px" }}>
                    {f.n}
                  </span>
                  <span className="serif" style={{ fontSize: "clamp(22px,3vw,32px)", color: "var(--ink)", flex: "0 0 280px" }}>
                    {f.t}
                  </span>
                  <span style={{ fontSize: "15px", color: "#5a4a3c", lineHeight: 1.6, flex: 1 }}>
                    {f.d}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Sample preview + signup */}
      <section className="on-field-sec" style={{ padding: "clamp(100px,14vw,150px) clamp(28px,5vw,56px)" }}>
        <div className="oc-news-split">
          <Reveal>
            <div className="oc-preview">
              <div className="tag" style={{ color: "var(--ember)", marginBottom: "20px" }}>
                Inside the Circle · Issue 001 — Sample
              </div>
              <h3 className="serif" style={{ fontSize: "28px", lineHeight: 1.2, marginBottom: "20px" }}>
                What it actually costs to build something real
              </h3>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(243,236,225,0.7)", marginBottom: "18px" }}>
                <strong style={{ color: "var(--bone)" }}>The Big Lesson —</strong>{" "}
                Discipline isn&apos;t a personality trait, it&apos;s a system. The
                owners who last build the system before they need it.
              </p>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(243,236,225,0.7)" }}>
                <strong style={{ color: "var(--bone)" }}>The Ask —</strong> A DMV
                operator scaling past 50 people is looking for a fractional
                finance lead. Reply to connect.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div>
              <span className="tag" style={{ color: "var(--ember)", display: "block", marginBottom: "24px" }}>
                Join free
              </span>
              <h2 className="serif" style={{ fontSize: "clamp(30px,4.4vw,48px)", lineHeight: 1.1, marginBottom: "30px" }}>
                Get the next issue.
              </h2>
              <NewsletterForm variant="full" tone="field" />
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .oc-ledger-row { display:flex; align-items:baseline; gap:32px; border-top:1px solid var(--rule); padding:32px 0; }
        .oc-ledger-row:last-child { border-bottom:1px solid var(--rule); }
        .oc-news-split { max-width:1100px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:64px; align-items:start; }
        .oc-preview { border:1px solid rgba(243,236,225,.2); padding:40px; background:rgba(243,236,225,.04); }
        @media (max-width:860px){
          .oc-news-split { grid-template-columns:1fr; gap:48px; }
          .oc-ledger-row { flex-wrap:wrap; gap:12px; }
        }
      `}</style>
    </>
  );
}
