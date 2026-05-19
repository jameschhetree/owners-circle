"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { episodes, categories } from "@/data/episodes";

const tex = ["tex-deep", "tex-flat", "tex-ember", "tex-flat", "tex-deep", "tex-flat"];

export default function EpisodesPage() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? episodes : episodes.filter((e) => e.category === active);

  return (
    <>
      <Nav tone="field" />
      <PageHero eyebrow="The Conversations" word="Conversations with the" emphasis="people building what's next.">
        Long-form conversations with the owners, operators, creators, and tech
        leaders building real companies across the DMV. New episodes coming
        soon.
      </PageHero>

      <section className="on-paper-sec" style={{ padding: "clamp(80px,11vw,120px) clamp(28px,5vw,56px) 140px" }}>
        <div style={{ maxWidth: "1240px", margin: "0 auto" }}>
          <Reveal>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                marginBottom: "64px",
              }}
            >
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={active === c ? "pill" : "pill-outline on-paper"}
                  style={{ fontSize: "11px", padding: "11px 22px" }}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <RevealGroup className="oc-ep-grid" stagger={0.07}>
            {filtered.map((ep, i) => (
              <RevealItem key={ep.id}>
                <article className="oc-ep-card">
                  <div className={`${tex[i % tex.length]} oc-ep-img`}>
                    <span className="oc-ep-cat">{ep.category}</span>
                    {ep.comingSoon && <span className="oc-ep-soon">Coming Soon</span>}
                  </div>
                  <div style={{ padding: "26px 26px 30px" }}>
                    <div
                      style={{
                        fontSize: "10.5px",
                        letterSpacing: "0.22em",
                        textTransform: "uppercase",
                        color: "var(--field)",
                        fontWeight: 600,
                      }}
                    >
                      {ep.role}
                    </div>
                    <h3
                      className="serif"
                      style={{
                        fontSize: "24px",
                        lineHeight: 1.2,
                        color: "var(--ink)",
                        marginTop: "12px",
                      }}
                    >
                      {ep.title}
                    </h3>
                    <p
                      style={{
                        marginTop: "14px",
                        fontSize: "14px",
                        lineHeight: 1.65,
                        color: "#5a4a3c",
                      }}
                    >
                      {ep.description}
                    </p>
                    <button
                      className="pill-outline on-paper"
                      style={{ marginTop: "24px", fontSize: "11px", padding: "11px 22px" }}
                      disabled
                    >
                      {ep.comingSoon ? "Coming Soon" : "Watch Episode"}
                    </button>
                  </div>
                </article>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <style>{`
        .oc-ep-grid { display:grid; grid-template-columns:repeat(3,1fr); gap:28px; }
        .oc-ep-card { border:1px solid var(--rule); background:#fff; overflow:hidden; transition:transform .55s cubic-bezier(.16,1,.3,1), box-shadow .55s ease; }
        .oc-ep-card:hover { transform:translateY(-6px); box-shadow:0 30px 60px -28px rgba(60,13,10,.35); }
        .oc-ep-img { height:220px; position:relative; }
        .oc-ep-cat { position:absolute; top:20px; left:20px; font-size:10px; letter-spacing:.22em; text-transform:uppercase; color:var(--bone); font-weight:600; }
        .oc-ep-soon { position:absolute; top:20px; right:20px; font-size:10px; letter-spacing:.16em; text-transform:uppercase; color:var(--field-lo); background:var(--bone); padding:5px 12px; border-radius:999px; font-weight:600; }
        @media (max-width:980px){ .oc-ep-grid { grid-template-columns:repeat(2,1fr);} }
        @media (max-width:620px){ .oc-ep-grid { grid-template-columns:1fr;} }
      `}</style>
    </>
  );
}
