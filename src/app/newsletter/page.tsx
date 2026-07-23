"use client";

import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { NewsletterForm } from "@/components/NewsletterForm";

const format = [
  { n: "01", t: "This Week Inside the Circle", d: "The signal from the rooms we were in this week -- quick, sharp, no filler." },
  { n: "02", t: "The Big Lesson", d: "One hard-won lesson from a featured owner or operator, broken down." },
  { n: "03", t: "The Story", d: "A real build -- the bet, the wall, the turn, told the way it happened." },
  { n: "04", t: "The Playbook", d: "A concrete system you can run: sales, hiring, capital, ops, or AI." },
  { n: "05", t: "The Ask", d: "Who in the circle is looking for what -- intros, talent, capital, partners." },
  { n: "06", t: "Join the Circle", d: "The next room, the next guest, and how to get closer to the network." },
];

export default function NewsletterPage() {
  return (
    <>
      <Nav tone="ivory" />
      <PageHero eyebrow="Owner's Notes -- Weekly" word="The brief from" emphasis="inside the circle.">
        Every week -- sharp takeaways from featured owners and leaders, plus the
        asks, opportunities, and introductions shaping the DMV business
        community.
      </PageHero>

      <section className="on-paper-sec" style={{ padding: "clamp(100px,14vw,150px) clamp(28px,5vw,56px)" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <Reveal>
            <div className="gold-divider" style={{ marginBottom: "32px" }} />
            <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "24px" }}>
              What lands in your inbox
            </span>
            <h2
              className="serif"
              style={{
                fontSize: "clamp(32px,5vw,52px)",
                lineHeight: 1.08,
                color: "var(--burgundy)",
                maxWidth: "600px",
                marginBottom: "56px",
              }}
            >
              Six sections.{" "}
              <em className="serif-it" style={{ color: "var(--burgundy-deep)" }}>
                Zero filler.
              </em>
            </h2>
          </Reveal>
          <RevealGroup>
            {format.map((f) => (
              <RevealItem key={f.n}>
                <div className="oc-ledger-row">
                  <span className="serif serif-it" style={{ fontSize: "20px", color: "var(--gold)", minWidth: "54px" }}>
                    {f.n}
                  </span>
                  <span className="serif" style={{ fontSize: "clamp(22px,3vw,30px)", color: "var(--burgundy)", flex: "0 0 260px" }}>
                    {f.t}
                  </span>
                  <span style={{ fontSize: "15px", color: "var(--espresso)", opacity: 0.7, lineHeight: 1.6, flex: 1 }}>
                    {f.d}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="on-field-sec" style={{ padding: "clamp(100px,14vw,150px) clamp(28px,5vw,56px)", background: "linear-gradient(170deg, var(--burgundy), var(--burgundy-deep))" }}>
        <div className="oc-news-split">
          <Reveal>
            <div className="oc-preview">
              <div className="tag" style={{ color: "var(--gold)", marginBottom: "18px" }}>
                Owner&apos;s Notes -- Issue 001 (Sample)
              </div>
              <h3 className="serif" style={{ fontSize: "26px", lineHeight: 1.2, color: "var(--parchment)", marginBottom: "18px" }}>
                What it actually costs to build something real
              </h3>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(245,239,229,0.72)", marginBottom: "16px" }}>
                <strong style={{ color: "var(--parchment)" }}>The Big Lesson --</strong>{" "}
                Discipline isn&apos;t a personality trait, it&apos;s a system. The
                owners who last build the system before they need it.
              </p>
              <p style={{ fontSize: "14px", lineHeight: 1.7, color: "rgba(245,239,229,0.72)" }}>
                <strong style={{ color: "var(--parchment)" }}>The Ask --</strong> A DMV
                operator scaling past 50 people is looking for a fractional
                finance lead. Reply to connect.
              </p>
            </div>
          </Reveal>
          <Reveal delay={0.06}>
            <div>
              <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "20px" }}>
                Subscribe free
              </span>
              <h2 className="serif" style={{ fontSize: "clamp(30px,4.4vw,44px)", lineHeight: 1.1, color: "var(--parchment)", marginBottom: "28px" }}>
                Get the next issue.
              </h2>
              <NewsletterForm variant="full" tone="burgundy" />
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .oc-ledger-row { display:flex; align-items:baseline; gap:32px; border-top:1px solid var(--rule); padding:32px 0; }
        .oc-ledger-row:last-child { border-bottom:1px solid var(--rule); }
        .oc-news-split { max-width:960px; margin:0 auto; display:grid; grid-template-columns:1fr 1fr; gap:56px; align-items:start; }
        .oc-preview { border:1px solid rgba(245,239,229,.18); padding:36px; background:rgba(245,239,229,.05); border-radius:12px; }
        @media (max-width:860px){
          .oc-news-split { grid-template-columns:1fr; gap:44px; }
          .oc-ledger-row { flex-wrap:wrap; gap:12px; }
        }
      `}</style>
    </>
  );
}
