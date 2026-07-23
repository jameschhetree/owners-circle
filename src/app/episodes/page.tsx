"use client";

import { useState } from "react";
import { Nav } from "@/components/Nav";
import { PageHero } from "@/components/PageHero";
import { Reveal, RevealGroup, RevealItem } from "@/components/Reveal";
import { episodes, categories } from "@/data/episodes";

export default function EpisodesPage() {
  const [active, setActive] = useState("All");
  const filtered =
    active === "All" ? episodes : episodes.filter((e) => e.category === active);

  return (
    <>
      <Nav tone="ivory" />
      <PageHero
        eyebrow="Owner's Circle Podcast"
        word="Conversations with the"
        emphasis="people building what's next."
      >
        Long-form conversations with the owners, operators, creators, and tech
        leaders building real companies across the DMV. New episodes coming
        soon.
      </PageHero>

      <section
        className="on-paper-sec"
        style={{
          padding:
            "clamp(80px,11vw,120px) clamp(28px,5vw,56px) 140px",
        }}
      >
        <div style={{ maxWidth: "960px", margin: "0 auto" }}>
          <Reveal>
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: "10px",
                marginBottom: "56px",
              }}
            >
              {categories.map((c) => (
                <button
                  key={c}
                  onClick={() => setActive(c)}
                  className={active === c ? "pill" : "pill-outline on-paper"}
                  style={{ fontSize: "11px", padding: "10px 20px" }}
                >
                  {c}
                </button>
              ))}
            </div>
          </Reveal>

          <RevealGroup className="oc-ep-grid" stagger={0.07}>
            {filtered.map((ep) => (
              <RevealItem key={ep.id}>
                <article className="oc-ep-card">
                  <div className="oc-ep-header">
                    <span className="oc-ep-cat">{ep.category}</span>
                    {ep.comingSoon && (
                      <span className="oc-ep-soon">Coming Soon</span>
                    )}
                  </div>
                  <div style={{ padding: "24px 24px 28px" }}>
                    <div
                      style={{
                        fontSize: "10.5px",
                        letterSpacing: "0.18em",
                        textTransform: "uppercase",
                        color: "var(--gold)",
                        fontWeight: 600,
                      }}
                    >
                      {ep.role}
                    </div>
                    <h3
                      className="serif"
                      style={{
                        fontSize: "22px",
                        lineHeight: 1.2,
                        color: "var(--burgundy)",
                        marginTop: "10px",
                      }}
                    >
                      {ep.title}
                    </h3>
                    <p
                      style={{
                        marginTop: "12px",
                        fontSize: "14px",
                        lineHeight: 1.65,
                        color: "var(--espresso)",
                        opacity: 0.7,
                      }}
                    >
                      {ep.description}
                    </p>
                    <button
                      className="pill-outline on-paper"
                      style={{
                        marginTop: "22px",
                        fontSize: "11px",
                        padding: "10px 20px",
                      }}
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
        .oc-ep-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
        .oc-ep-card {
          border: 1px solid var(--taupe);
          background: #fff;
          overflow: hidden;
          transition: transform 0.55s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.55s ease;
        }
        .oc-ep-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 24px 48px -20px rgba(122, 31, 43, 0.15);
        }
        .oc-ep-header {
          height: 160px;
          position: relative;
          background: linear-gradient(135deg, var(--parchment), var(--taupe));
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          padding: 16px;
        }
        .oc-ep-cat {
          font-size: 10px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: var(--burgundy);
          font-weight: 600;
        }
        .oc-ep-soon {
          font-size: 10px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          color: var(--burgundy-deep);
          background: var(--gold-champagne);
          padding: 5px 12px;
          border-radius: 999px;
          font-weight: 600;
        }
        @media (max-width: 980px) { .oc-ep-grid { grid-template-columns: repeat(2, 1fr); } }
        @media (max-width: 620px) { .oc-ep-grid { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
