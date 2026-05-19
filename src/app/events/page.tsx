"use client";

import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { EventWaitlistForm } from "@/components/EventWaitlistForm";

const expect = [
  { t: "A private room", d: "An intimate evening for DMV owners, operators, creators, and tech leaders — capped, curated, no badges-and-booths energy." },
  { t: "Real conversation", d: "A live conversation or panel with a featured builder, the kind of honesty the podcast is built on." },
  { t: "Curated introductions", d: "We make the introductions that matter — matched on what you're building and who you need." },
  { t: "First look at membership", d: "The first preview of Founding Membership and what the circle becomes next." },
];

const whoAttends = ["Business owners", "Operators", "Founders", "Creators", "Tech leaders", "Investors"];

const eventFormat = [
  { n: "01", t: "Networking", d: "Arrival, curated mixing — not random, matched on intent." },
  { n: "02", t: "Live conversation / panel", d: "A featured builder, on the record, in the room." },
  { n: "03", t: "Curated introductions", d: "Hosted intros between people who should know each other." },
  { n: "04", t: "Member & sponsor spotlights", d: "Short, sharp — the people making the room possible." },
  { n: "05", t: "Founding Membership preview", d: "The first look at what comes after the podcast." },
];

export default function EventsPage() {
  return (
    <>
      <Nav tone="field" />
      <PageHero eyebrow="Owner's Circle Live" word="The room," emphasis="in one room.">
        A private evening for DMV owners, operators, creators, and tech leaders.
        Conversations, curated networking, and the first look at Founding
        Membership.
      </PageHero>

      {/* What to expect */}
      <section className="on-paper-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px)" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--field)", display: "block", marginBottom: "24px" }}>
              What to expect
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.6vw,52px)", lineHeight: 1.1, color: "var(--ink)", marginBottom: "60px", maxWidth: "640px" }}>
              Not a conference.{" "}
              <em className="serif-it" style={{ color: "var(--field)" }}>
                A room.
              </em>
            </h2>
          </Reveal>
          <RevealGroup className="oc-exp-grid" stagger={0.07}>
            {expect.map((e) => (
              <RevealItem key={e.t}>
                <div className="oc-exp-card">
                  <h3 className="serif" style={{ fontSize: "26px", color: "var(--ink)", marginBottom: "14px" }}>
                    {e.t}
                  </h3>
                  <p style={{ fontSize: "15px", lineHeight: 1.65, color: "#5a4a3c" }}>{e.d}</p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Who should attend */}
      <section className="on-field-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto", textAlign: "center" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--ember)", display: "block", marginBottom: "24px" }}>
              Who should attend
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.8vw,56px)", lineHeight: 1.1, marginBottom: "50px" }}>
              People who are{" "}
              <em className="serif-it">actually building.</em>
            </h2>
          </Reveal>
          <RevealGroup className="oc-who" stagger={0.05}>
            {whoAttends.map((w) => (
              <RevealItem key={w}>
                <span className="serif" style={{ fontSize: "clamp(22px,3vw,34px)", color: "var(--bone)" }}>
                  {w}
                </span>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* Event format */}
      <section className="on-paper-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--field)", display: "block", marginBottom: "24px" }}>
              Event format
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.4vw,48px)", lineHeight: 1.1, color: "var(--ink)", marginBottom: "56px" }}>
              How the night{" "}
              <em className="serif-it" style={{ color: "var(--field)" }}>
                runs.
              </em>
            </h2>
          </Reveal>
          <RevealGroup>
            {eventFormat.map((f) => (
              <RevealItem key={f.n}>
                <div className="oc-ledger-row">
                  <span className="serif serif-it" style={{ fontSize: "20px", color: "var(--ember)", minWidth: "54px" }}>
                    {f.n}
                  </span>
                  <span className="serif" style={{ fontSize: "clamp(22px,3vw,32px)", color: "var(--ink)", flex: "0 0 300px" }}>
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

      {/* Waitlist */}
      <section className="on-field-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px) 150px", background: "var(--field)" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--ember)", display: "block", marginBottom: "24px", textAlign: "center" }}>
              The list
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.6vw,52px)", lineHeight: 1.1, textAlign: "center", marginBottom: "20px" }}>
              Owner&apos;s Circle Live{" "}
              <em className="serif-it">is coming.</em>
            </h2>
            <p style={{ textAlign: "center", color: "rgba(243,236,225,0.7)", fontSize: "16px", marginBottom: "48px" }}>
              Get on the list — we&apos;ll reach out when we have a date.
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
        .oc-exp-grid { display:grid; grid-template-columns:repeat(2,1fr); gap:1px; background:var(--rule); border:1px solid var(--rule); }
        .oc-exp-card { background:var(--paper); padding:clamp(32px,4vw,52px); }
        .oc-who { display:flex; flex-wrap:wrap; justify-content:center; gap:14px 40px; }
        .oc-ledger-row { display:flex; align-items:baseline; gap:32px; border-top:1px solid var(--rule); padding:32px 0; }
        .oc-ledger-row:last-child { border-bottom:1px solid var(--rule); }
        .oc-form-card { border:1px solid rgba(243,236,225,.2); background:rgba(243,236,225,.04); padding:clamp(28px,4vw,48px); }
        @media (max-width:760px){
          .oc-exp-grid { grid-template-columns:1fr; }
          .oc-ledger-row { flex-wrap:wrap; gap:12px; }
        }
      `}</style>
    </>
  );
}
