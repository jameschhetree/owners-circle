"use client";

import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { EventWaitlistForm } from "@/components/EventWaitlistForm";

const expect = [
  { t: "A private room", d: "An intimate evening for DMV owners, operators, creators, and tech leaders -- capped, curated, no badges-and-booths energy." },
  { t: "Real conversation", d: "A live conversation or panel with a featured builder, the kind of honesty the podcast is built on." },
  { t: "Curated introductions", d: "We make the introductions that matter -- matched on what you're building and who you need." },
  { t: "First look at membership", d: "The first preview of Founding Membership and what the circle becomes next." },
];

const whoAttends = ["Business owners", "Operators", "Founders", "Creators", "Tech leaders", "Investors"];

const eventFormat = [
  { n: "01", t: "Networking", d: "Arrival, curated mixing -- not random, matched on intent." },
  { n: "02", t: "Live conversation / panel", d: "A featured builder, on the record, in the room." },
  { n: "03", t: "Curated introductions", d: "Hosted intros between people who should know each other." },
  { n: "04", t: "Member & sponsor spotlights", d: "Short, sharp -- the people making the room possible." },
  { n: "05", t: "Founding Membership preview", d: "The first look at what comes after the podcast." },
];

export default function EventsPage() {
  return (
    <>
      <Nav tone="ivory" />
      <PageHero eyebrow="Owner's Circle Live" word="The room," emphasis="in one room.">
        A private evening for DMV owners, operators, creators, and tech leaders.
        Conversations, curated networking, and the first look at Founding
        Membership.
      </PageHero>

      <section className="on-paper-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px)" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <Reveal>
            <div className="gold-divider" style={{ marginBottom: "28px" }} />
            <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "24px" }}>
              What to expect
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.6vw,48px)", lineHeight: 1.1, color: "var(--burgundy)", marginBottom: "52px", maxWidth: "600px" }}>
              Not a conference.{" "}
              <em className="serif-it" style={{ color: "var(--burgundy-deep)" }}>
                A room.
              </em>
            </h2>
          </Reveal>
          <RevealGroup className="oc-exp-grid" stagger={0.07}>
            {expect.map((e) => (
              <RevealItem key={e.t}>
                <div className="oc-exp-card">
                  <h3 className="serif" style={{ fontSize: "24px", color: "var(--burgundy)", marginBottom: "12px" }}>
                    {e.t}
                  </h3>
                  <p style={{ fontSize: "15px", lineHeight: 1.65, color: "var(--espresso)", opacity: 0.7 }}>{e.d}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="on-field-sec" style={{ padding: "clamp(90px,12vw,130px) clamp(28px,5vw,56px)", background: "linear-gradient(170deg, var(--burgundy), var(--burgundy-deep))" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "20px" }}>
              Who should attend
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.8vw,52px)", lineHeight: 1.1, color: "var(--parchment)", marginBottom: "44px" }}>
              People who are{" "}
              <em className="serif-it">actually building.</em>
            </h2>
          </Reveal>
          <RevealGroup className="oc-who" stagger={0.05}>
            {whoAttends.map((w) => (
              <RevealItem key={w}>
                <span className="serif" style={{ fontSize: "clamp(22px,3vw,32px)", color: "var(--parchment)" }}>
                  {w}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="on-paper-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px)" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "24px" }}>
              Event format
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.4vw,48px)", lineHeight: 1.1, color: "var(--burgundy)", marginBottom: "48px" }}>
              How the night{" "}
              <em className="serif-it" style={{ color: "var(--burgundy-deep)" }}>
                runs.
              </em>
            </h2>
          </Reveal>
          <RevealGroup>
            {eventFormat.map((f) => (
              <RevealItem key={f.n}>
                <div className="oc-ledger-row">
                  <span className="serif serif-it" style={{ fontSize: "20px", color: "var(--gold)", minWidth: "54px" }}>
                    {f.n}
                  </span>
                  <span className="serif" style={{ fontSize: "clamp(22px,3vw,30px)", color: "var(--burgundy)", flex: "0 0 280px" }}>
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

      <section className="on-field-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px) 150px", background: "linear-gradient(170deg, var(--burgundy), var(--burgundy-deep))" }}>
        <div style={{ maxWidth: "560px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "20px", textAlign: "center" }}>
              The list
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.6vw,48px)", lineHeight: 1.1, textAlign: "center", color: "var(--parchment)", marginBottom: "18px" }}>
              Owner&apos;s Circle Live{" "}
              <em className="serif-it">is coming.</em>
            </h2>
            <p style={{ textAlign: "center", color: "rgba(245,239,229,0.72)", fontSize: "16px", marginBottom: "40px" }}>
              Get on the list -- we&apos;ll reach out when we have a date.
            </p>
          </Reveal>
          <Reveal delay={0.06}>
            <div className="oc-form-card">
              <EventWaitlistForm />
            </div>
          </Reveal>
        </div>
      </section>

      <style>{`
        .oc-exp-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:var(--taupe); border:1px solid var(--taupe); }
        .oc-exp-card { background:var(--ivory); padding:clamp(28px,4vw,44px); }
        .oc-who { display:flex; flex-wrap:wrap; justify-content:center; gap:14px 36px; }
        .oc-ledger-row { display:flex; align-items:baseline; gap:32px; border-top:1px solid var(--rule); padding:32px 0; }
        .oc-ledger-row:last-child { border-bottom:1px solid var(--rule); }
        .oc-form-card { border:1px solid rgba(245,239,229,.18); background:rgba(245,239,229,.05); padding:clamp(28px,4vw,44px); border-radius:12px; }
        @media (max-width:760px){
          .oc-exp-grid { grid-template-columns:1fr; }
          .oc-ledger-row { flex-wrap:wrap; gap:12px; }
        }
      `}</style>
    </>
  );
}
