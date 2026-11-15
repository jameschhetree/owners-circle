"use client";

import Link from "next/link";
import { EpisodePreview } from "@/components/EpisodePreview";
import { WaitlistButton } from "@/components/Waitlist";
import { pillars } from "@/data/pillars";
import {
  episodeAudio,
  episodeHref,
  episodeLabel,
  episodes,
  padCount,
} from "@/data/episodes";

function seasonThemes(): string[] {
  const seen: string[] = [];
  for (const episode of episodes) {
    if (!seen.includes(episode.category)) seen.push(episode.category);
  }
  const pillarOrder: string[] = pillars.map((pillar) => pillar.title);
  return [
    ...pillarOrder.filter((title) => seen.includes(title)),
    ...seen.filter((title) => !pillarOrder.includes(title)),
  ];
}

export function HomeHero() {
  const featured = episodes[0];
  const lineup = episodes.slice(1, 5);
  const themes = seasonThemes();
  const oneGuestEach =
    episodes.length > 0 && episodes.every((episode) => episode.role.trim().length > 0);
  const comingSoon =
    episodes.length > 0 &&
    episodes.every((episode) => episode.comingSoon && !episodeAudio(episode));
  const featuredIndex = featured
    ? episodes.findIndex((episode) => episode.id === featured.id)
    : -1;
  const lineupStart = lineup[0]
    ? episodes.findIndex((episode) => episode.id === lineup[0].id) + 1
    : 2;

  return (
    <section className="oc-grain oc-hero" aria-labelledby="home-hero-title">
      <div className="oc-hero-inner">
        <div className="oc-hero-grid">
          <div className="oc-hero-copy">
            <p className="oc-hero-eye">
              <span className="oc-hero-dot" aria-hidden="true" />
              Season 01
              {comingSoon ? " · Coming soon" : null}
            </p>
            <h1 id="home-hero-title">
              Behind every business.
              <em>A real story.</em>
            </h1>
            <p className="oc-hero-lede">
              {`Honest conversations with the owners, operators, and builders doing the work. ${episodes.length} seats at the table this season. Here's who's sitting down.`}
            </p>
            <div className="oc-hero-ctas">
              {featured ? (
                <WaitlistButton
                  intent="Episodes"
                  source="Home hero"
                  className="oc-hero-cta oc-arrow-cta"
                >
                  Get Episode {episodeLabel(featuredIndex)} first{" "}
                  <span className="oc-arrow" aria-hidden="true">
                    →
                  </span>
                </WaitlistButton>
              ) : null}
              <WaitlistButton
                intent="Nominate a guest"
                source="Home hero"
                className="oc-hero-ghost"
              >
                Nominate a guest
              </WaitlistButton>
            </div>
            <ul className="oc-hero-stats">
              <li>
                <span>{padCount(episodes.length)}</span>
                conversations
              </li>
              <li>
                <span>{padCount(themes.length)}</span>
                themes
              </li>
              {oneGuestEach ? (
                <li>
                  <span>{padCount(1)}</span>
                  guest per episode
                </li>
              ) : null}
            </ul>
          </div>

          {featured ? (
            <section className="oc-lineup" aria-labelledby="season-lineup-title">
              <h2 id="season-lineup-title">The Season 01 lineup</h2>
              <div className="oc-lineup-card">
                <div className="oc-lineup-feat">
                  <p className="oc-lineup-kicker">
                    <span>
                      Ep. {episodeLabel(featuredIndex)}
                      <span aria-hidden="true"> · </span>
                      {featured.category}
                    </span>
                    <span>{featured.role}</span>
                  </p>
                  <h3>
                    <Link href={episodeHref(featured)}>{featured.title}</Link>
                  </h3>
                  <p className="oc-lineup-desc">{featured.description}</p>
                  <div className="oc-lineup-actions">
                    <EpisodePreview
                      episode={featured}
                      variant="card"
                      source="Home hero lineup"
                    />
                  </div>
                </div>
                {lineup.length > 0 ? (
                  <ol className="oc-lineup-list" start={lineupStart}>
                    {lineup.map((episode) => {
                      const index = episodes.findIndex((item) => item.id === episode.id);
                      const soon = episode.comingSoon && !episodeAudio(episode);
                      return (
                        <li key={episode.id}>
                          <Link href={episodeHref(episode)}>
                            <span className="oc-lineup-num" aria-hidden="true">
                              {episodeLabel(index)}
                            </span>
                            <span className="oc-lineup-body">
                              <span className="oc-lineup-title">{episode.title}</span>
                              <span className="oc-lineup-meta">
                                {episode.role}
                                <span aria-hidden="true"> · </span>
                                {episode.category}
                              </span>
                            </span>
                            {soon ? <span className="oc-lineup-soon">Soon</span> : null}
                          </Link>
                        </li>
                      );
                    })}
                  </ol>
                ) : null}
              </div>
              <Link href="/episodes" className="oc-lineup-all">
                All episodes{" "}
                <span aria-hidden="true">→</span>
              </Link>
            </section>
          ) : null}
        </div>

        {themes.length > 0 ? (
          <ul className="oc-hero-rail" aria-label="Themes">
            {themes.map((theme, index) => (
              <li key={theme}>
                {index > 0 ? (
                  <span className="oc-hero-star" aria-hidden="true">
                    ✶
                  </span>
                ) : null}
                {theme}
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <style>{`
        .oc-hero {
          display: flex;
          flex-direction: column;
          padding: 128px 0 0;
          background-image:
            linear-gradient(165deg, rgba(122,31,43,0.55) 0%, rgba(97,24,35,0.6) 40%, rgba(61,14,20,0.72) 100%),
            url(/brand/hero-texture.png);
          background-size: cover, cover;
          background-position: center, center;
          position: relative;
          overflow: hidden;
        }
        .oc-hero-inner { position: relative; z-index: 2; }
        .oc-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1.05fr) minmax(320px, 0.95fr);
          gap: clamp(28px, 4vw, 56px);
          align-items: start;
          max-width: 1180px;
          margin: 0 auto;
          padding: 12px clamp(24px, 4vw, 56px) 8px;
        }
        .oc-hero-eye {
          display: flex;
          align-items: center;
          gap: 10px;
          margin: 0;
          font-size: 11px;
          letter-spacing: 0.22em;
          text-transform: uppercase;
          color: var(--gold-champagne);
          font-weight: 600;
        }
        .oc-hero-dot {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: var(--gold-light);
          box-shadow: 0 0 0 4px rgba(212, 175, 90, 0.2);
          flex: none;
        }
        .oc-hero h1 {
          font-family: var(--font-serif), "Playfair Display", Georgia, serif;
          font-weight: 500;
          font-size: clamp(44px, 5.4vw, 80px);
          line-height: 0.98;
          letter-spacing: -0.02em;
          color: var(--parchment);
          margin: 20px 0 0;
        }
        .oc-hero h1 em {
          display: block;
          font-style: italic;
          font-weight: 400;
          color: var(--gold-light);
        }
        .oc-hero-lede {
          margin: 22px 0 0;
          max-width: 460px;
          font-size: 16px;
          line-height: 1.6;
          color: rgba(245, 239, 229, 0.88);
        }
        .oc-hero-ctas {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 16px 22px;
          margin-top: 28px;
        }
        .oc-hero-cta {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: var(--gold-champagne);
          color: var(--burgundy-deep);
          border: none;
          border-radius: 6px;
          padding: 15px 22px;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          letter-spacing: 0;
          text-transform: none;
        }
        .oc-hero-cta:hover { background: var(--gold-light); }
        .oc-hero-ghost {
          background: none;
          border: none;
          border-bottom: 1px solid rgba(245, 239, 229, 0.45);
          color: var(--parchment);
          padding: 6px 0;
          font-size: 15px;
          font-weight: 500;
          cursor: pointer;
          border-radius: 0;
          letter-spacing: 0;
          text-transform: none;
        }
        .oc-hero-ghost:hover { border-bottom-color: var(--parchment); }
        .oc-hero-cta:focus-visible,
        .oc-hero-ghost:focus-visible,
        .oc-lineup a:focus-visible,
        .oc-notify:focus-visible,
        .oc-play:focus-visible {
          outline: 2px solid var(--gold-light);
          outline-offset: 3px;
        }
        .oc-hero-stats {
          display: flex;
          flex-wrap: wrap;
          gap: 18px 32px;
          list-style: none;
          margin: 34px 0 0;
          padding: 0;
        }
        .oc-hero-stats li {
          color: rgba(245, 239, 229, 0.88);
          font-size: 12px;
          line-height: 1.2;
        }
        .oc-hero-stats span {
          display: block;
          font-family: var(--font-serif), "Playfair Display", Georgia, serif;
          font-size: 30px;
          font-weight: 500;
          color: var(--parchment);
          letter-spacing: 0;
          margin-bottom: 4px;
        }
        .oc-lineup {
          display: grid;
          grid-template-columns: 1fr auto;
          gap: 12px 16px;
          align-items: end;
          min-width: 0;
        }
        .oc-lineup-card { grid-column: 1 / -1; grid-row: 1; }
        .oc-lineup h2,
        .oc-lineup-all {
          margin: 0 4px;
          font-family: var(--font-sans), "DM Sans", sans-serif;
          font-size: 11px;
          font-weight: 600;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          color: rgba(245, 239, 229, 0.9);
        }
        .oc-lineup h2 { grid-column: 1; grid-row: 2; }
        .oc-lineup-all { grid-column: 2; grid-row: 2; white-space: nowrap; }
        .oc-lineup-all:hover { color: var(--parchment); }
        .oc-lineup-card {
          background: var(--ivory);
          color: var(--espresso);
          border-radius: 14px;
          overflow: hidden;
          box-shadow: 0 40px 80px -30px rgba(0, 0, 0, 0.55);
        }
        .oc-lineup-feat {
          background: linear-gradient(160deg, #f5efe5, #e8dcc6);
          padding: 26px 28px 22px;
          border-bottom: 1px solid rgba(76, 58, 51, 0.12);
        }
        .oc-lineup-kicker {
          display: flex;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 8px 12px;
          margin: 0;
          font-size: 10px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          color: var(--burgundy);
          font-weight: 600;
        }
        .oc-lineup-feat h3 {
          font-family: var(--font-serif), "Playfair Display", Georgia, serif;
          font-weight: 500;
          font-size: clamp(26px, 2.4vw, 32px);
          line-height: 1.1;
          color: var(--burgundy-deep);
          margin: 14px 0 0;
          max-width: 18ch;
        }
        .oc-lineup-feat h3 a { color: inherit; }
        .oc-lineup-feat h3 a:hover { text-decoration: underline; text-underline-offset: 3px; }
        .oc-lineup-desc {
          margin: 10px 0 0;
          max-width: 42ch;
          font-size: 13px;
          line-height: 1.5;
          color: var(--espresso);
        }
        .oc-lineup-actions { margin-top: 18px; display: flex; align-items: center; }
        .oc-notify {
          display: inline-flex;
          align-items: center;
          font-size: 12px;
          font-weight: 600;
          color: var(--burgundy-deep);
          background: transparent;
          border: 1px solid rgba(122, 31, 43, 0.4);
          padding: 8px 14px;
          border-radius: 999px;
          cursor: pointer;
          letter-spacing: 0;
          text-transform: none;
        }
        .oc-notify:hover { background: rgba(122, 31, 43, 0.06); }
        .oc-play {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: none;
          background: var(--burgundy);
          color: var(--gold-champagne);
          display: grid;
          place-items: center;
          cursor: pointer;
        }
        .oc-play:hover { background: var(--burgundy-deep); }
        .oc-preview-audio {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }
        .oc-lineup-list { list-style: none; margin: 0; padding: 0; }
        .oc-lineup-list a {
          display: grid;
          grid-template-columns: 44px minmax(0, 1fr) auto;
          gap: 12px;
          align-items: center;
          padding: 13px 28px;
          border-bottom: 1px solid rgba(76, 58, 51, 0.09);
          color: inherit;
        }
        .oc-lineup-list li:last-child a { border-bottom: 0; }
        .oc-lineup-list a:hover { background: rgba(122, 31, 43, 0.05); }
        .oc-lineup-num {
          font-family: var(--font-serif), "Playfair Display", Georgia, serif;
          font-style: italic;
          font-weight: 500;
          font-size: 22px;
          color: var(--burgundy);
        }
        .oc-lineup-title {
          display: block;
          font-family: var(--font-serif), "Playfair Display", Georgia, serif;
          font-size: 16px;
          font-weight: 500;
          line-height: 1.25;
          color: var(--burgundy-deep);
        }
        .oc-lineup-meta {
          display: block;
          margin-top: 3px;
          font-size: 11px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--espresso);
        }
        .oc-lineup-soon {
          font-size: 10px;
          letter-spacing: 0.12em;
          text-transform: uppercase;
          color: var(--burgundy);
          font-weight: 600;
        }
        .oc-hero-rail {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          align-items: center;
          gap: 12px 0;
          list-style: none;
          margin: 48px 0 0;
          padding: 18px clamp(20px, 4vw, 40px);
          background: var(--parchment);
          color: var(--burgundy);
        }
        .oc-hero-rail li {
          display: flex;
          align-items: center;
          gap: 18px;
          font-size: 11px;
          letter-spacing: 0.18em;
          text-transform: uppercase;
          font-weight: 600;
          padding: 0 18px;
        }
        .oc-hero-star { color: var(--gold); font-size: 11px; }

        @media (max-width: 980px) {
          .oc-hero { padding-top: 112px; }
          .oc-hero-grid { grid-template-columns: 1fr; }
          .oc-hero h1 { font-size: clamp(42px, 12vw, 68px); }
          .oc-lineup-feat h3 { max-width: none; }
        }
        @media (max-width: 640px) {
          .oc-lineup { grid-template-columns: 1fr; }
          .oc-lineup h2,
          .oc-lineup-all { grid-column: 1; }
          .oc-lineup-all { grid-row: 3; justify-self: start; margin-top: 4px; }
          .oc-lineup-feat { padding: 22px 18px 18px; }
          .oc-lineup-list a { padding: 12px 18px; grid-template-columns: 36px minmax(0, 1fr) auto; }
          .oc-lineup-title { font-size: 15px; }
          .oc-hero-rail li { padding: 0 10px; letter-spacing: 0.12em; }
        }
      `}</style>
    </section>
  );
}
