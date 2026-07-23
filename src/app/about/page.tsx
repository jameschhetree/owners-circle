"use client";

import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { WaitlistButton } from "@/components/Waitlist";

const beliefs = [
  { n: "01", t: "Real over famous", d: "We spotlight people building real companies -- not the loudest, the realest." },
  { n: "02", t: "Stories before pitches", d: "The podcast tells the truth of the build: the bet, the wall, the turn." },
  { n: "03", t: "The room is the point", d: "Media is the start. The community is where it goes -- relationships, referrals, access." },
];

export default function AboutPage() {
  return (
    <>
      <Nav tone="ivory" />
      <PageHero eyebrow="About" word="Real owners." emphasis="Real rooms.">
        Owner&apos;s Circle is a podcast, newsletter, and private
        network -- and the start of a room for the people actually building.
      </PageHero>

      <section className="on-paper-sec" style={{ padding: "clamp(100px,14vw,160px) clamp(28px,5vw,56px)" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto" }}>
          <Reveal>
            <div className="gold-divider" style={{ marginBottom: "32px" }} />
            <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "24px" }}>
              The story
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.6vw,52px)", lineHeight: 1.12, color: "var(--burgundy)", marginBottom: "36px" }}>
              Built by someone who kept{" "}
              <em className="serif-it" style={{ color: "var(--burgundy-deep)" }}>
                meeting the builders.
              </em>
            </h2>
            <div style={{ fontSize: "clamp(16px,1.5vw,18px)", lineHeight: 1.85, color: "var(--espresso)", opacity: 0.75, display: "flex", flexDirection: "column", gap: "24px" }}>
              <p>
                Owner&apos;s Circle is built by James Chhetree -- a podcast studio
                owner, interviewer, builder, and connector.
              </p>
              <p>
                After producing shows, working with founders, and sitting across
                from operators doing real work, one thing kept showing up: there
                was no central room for the people building. The talent was here.
                The stories were here. The connective tissue was not.
              </p>
              <p>
                Owner&apos;s Circle was created to fix that -- to spotlight the
                people building, keep the audience close through the newsletter,
                and eventually bring the room together in person. The podcast is
                where it starts. The community is where it&apos;s going.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="on-paper-sec" style={{ padding: "clamp(80px,11vw,120px) clamp(28px,5vw,56px)", borderTop: "1px solid var(--rule)" }}>
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <Reveal>
            <span className="tag" style={{ color: "var(--gold)", display: "block", marginBottom: "24px" }}>
              What we believe
            </span>
            <h2 className="serif" style={{ fontSize: "clamp(30px,4.4vw,48px)", lineHeight: 1.1, color: "var(--burgundy)", marginBottom: "48px" }}>
              The room runs on{" "}
              <em className="serif-it">three things.</em>
            </h2>
          </Reveal>
          <RevealGroup>
            {beliefs.map((b) => (
              <RevealItem key={b.n}>
                <div className="oc-ledger-row">
                  <span className="serif serif-it" style={{ fontSize: "20px", color: "var(--gold)", minWidth: "54px" }}>
                    {b.n}
                  </span>
                  <span className="serif" style={{ fontSize: "clamp(22px,3vw,32px)", color: "var(--burgundy)", flex: "0 0 280px" }}>
                    {b.t}
                  </span>
                  <span style={{ fontSize: "15px", color: "var(--espresso)", opacity: 0.7, lineHeight: 1.6, flex: 1 }}>
                    {b.d}
                  </span>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="on-paper-sec" style={{ padding: "clamp(100px,14vw,160px) clamp(28px,5vw,56px)", borderTop: "1px solid var(--rule)", textAlign: "center" }}>
        <Reveal>
          <h2 className="serif" style={{ fontSize: "clamp(34px,5.4vw,56px)", lineHeight: 1.08, color: "var(--burgundy)", maxWidth: "700px", margin: "0 auto" }}>
            Don&apos;t just watch the circle.{" "}
            <em className="serif-it" style={{ color: "var(--burgundy-deep)" }}>
              Join it.
            </em>
          </h2>
          <div style={{ marginTop: "40px", display: "flex", gap: "14px", justifyContent: "center", flexWrap: "wrap" }}>
            <WaitlistButton
              intent="Newsletter"
              source="About CTA"
              className="pill"
            >
              Subscribe Free
            </WaitlistButton>
            <WaitlistButton
              intent="Nominate a guest"
              source="About Nominate"
              className="pill-outline on-paper"
            >
              Nominate a Guest
            </WaitlistButton>
          </div>
        </Reveal>
      </section>

      <style>{`
        .oc-ledger-row { display:flex; align-items:baseline; gap:32px; border-top:1px solid var(--rule); padding:32px 0; }
        .oc-ledger-row:last-child { border-bottom:1px solid var(--rule); }
        @media (max-width:760px){ .oc-ledger-row { flex-wrap:wrap; gap:12px; } }
      `}</style>
    </>
  );
}
