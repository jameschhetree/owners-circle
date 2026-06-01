"use client";

import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { WaitlistButton } from "@/components/Waitlist";

const beliefs = [
  { n: "01", t: "Real over famous", d: "We spotlight people building real companies — not the loudest, the realest." },
  { n: "02", t: "Stories before pitches", d: "The podcast tells the truth of the build: the bet, the wall, the turn." },
  { n: "03", t: "The room is the point", d: "Media is the start. The community is where it goes — relationships, referrals, access." },
];

export default function AboutPage() {
  return (
    <>
      <Nav tone="field" />
      <PageHero eyebrow="About" word="Real owners." emphasis="Real rooms.">
        Owner&apos;s Circle is a DMV-first podcast, newsletter, and private
        network — and the start of a room for the people actually building.
      </PageHero>

      {/* Story */}
      <section className="on-paper-sec" style={{ padding: "clamp(100px,14vw,160px) clamp(28px,5vw,56px)" }}>
        <div style={{ maxWidth: "760px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--field)", display: "block", marginBottom: "30px" }}>
              The story
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.6vw,52px)", lineHeight: 1.12, color: "var(--ink)", marginBottom: "40px" }}>
              Built by someone who kept{" "}
              <em className="serif-it" style={{ color: "var(--field)" }}>
                meeting the builders.
              </em>
            </h2>
            <div style={{ fontSize: "clamp(16px,1.5vw,18px)", lineHeight: 1.85, color: "#5a4a3c", display: "flex", flexDirection: "column", gap: "24px" }}>
              <p>
                Owner&apos;s Circle is built by James Chhetree — a podcast studio
                owner, interviewer, builder, and connector in the DMV.
              </p>
              <p>
                After producing shows, working with founders, and sitting across
                from operators doing real work, one thing kept showing up: there
                was no central room for the people building. The talent was here.
                The stories were here. The connective tissue was not.
              </p>
              <p>
                Owner&apos;s Circle was created to fix that — to spotlight the
                people building, keep the audience close through the newsletter,
                and eventually bring the room together in person. The podcast is
                where it starts. The community is where it&apos;s going.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Beliefs */}
      <section className="on-field-sec" style={{ padding: "clamp(100px,13vw,140px) clamp(28px,5vw,56px)" }}>
        <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--ember)", display: "block", marginBottom: "24px" }}>
              What we believe
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.4vw,48px)", lineHeight: 1.1, marginBottom: "56px" }}>
              The room runs on{" "}
              <em className="serif-it">three things.</em>
            </h2>
          </Reveal>
          <RevealGroup>
            {beliefs.map((b) => (
              <RevealItem key={b.n}>
                <div className="oc-ledger-row">
                  <span className="serif serif-it" style={{ fontSize: "20px", color: "var(--ember)", minWidth: "54px" }}>
                    {b.n}
                  </span>
                  <span className="serif" style={{ fontSize: "clamp(22px,3vw,32px)", flex: "0 0 280px" }}>
                    {b.t}
                  </span>
                  <span style={{ fontSize: "15px", color: "rgba(243,236,225,0.72)", lineHeight: 1.6, flex: 1 }}>
                    {b.d}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      {/* CTA */}
      <section className="on-paper-sec" style={{ padding: "clamp(100px,14vw,160px) clamp(28px,5vw,56px) clamp(110px,15vw,170px)", textAlign: "center" }}>
        <Reveal>
          <h2 className="serif" style={{ fontSize: "clamp(34px,5.4vw,64px)", lineHeight: 1.08, color: "var(--ink)", maxWidth: "760px", margin: "0 auto" }}>
            Don&apos;t just watch the circle.{" "}
            <em className="serif-it" style={{ color: "var(--field)" }}>
              Join it.
            </em>
          </h2>
          <div style={{ marginTop: "44px", display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" }}>
            <WaitlistButton
              intent="Waitlist"
              source="About · CTA"
              className="pill"
              style={{ background: "var(--field)", color: "var(--bone)" }}
            >
              Join the Waitlist
            </WaitlistButton>
            <WaitlistButton
              intent="Nominate a guest"
              source="About · Nominate a Guest"
              className="pill-outline on-paper"
            >
              Nominate a Guest
            </WaitlistButton>
          </div>
        </Reveal>
      </section>

      <style>{`
        .oc-ledger-row { display:flex; align-items:baseline; gap:32px; border-top:1px solid rgba(243,236,225,.2); padding:32px 0; }
        .oc-ledger-row:last-child { border-bottom:1px solid rgba(243,236,225,.2); }
        @media (max-width:760px){ .oc-ledger-row { flex-wrap:wrap; gap:12px; } }
      `}</style>
    </>
  );
}
