import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/components/Nav";
import { EpisodePreview } from "@/components/EpisodePreview";
import {
  episodeAudio,
  episodeLabel,
  episodes,
  type Episode,
} from "@/data/episodes";

type Props = { params: Promise<{ id: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return episodes.map((episode) => ({ id: episode.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const episode = episodes.find((item) => item.id === id);
  if (!episode) return { title: "Episode | Owner's Circle" };
  return {
    title: `${episode.title} | Owner's Circle`,
    description: episode.description,
  };
}

function showGuestName(episode: Episode): boolean {
  const name = episode.guestName.trim();
  return name.length > 0 && name.toLowerCase() !== "coming soon";
}

export default async function EpisodePage({ params }: Props) {
  const { id } = await params;
  const index = episodes.findIndex((item) => item.id === id);
  if (index < 0) notFound();
  const episode = episodes[index];
  const audio = episodeAudio(episode);

  return (
    <>
      <Nav tone="ivory" />
      <article className="oc-episode">
        <div className="oc-episode-inner">
          <p className="tag oc-episode-kicker">
            Episode {episodeLabel(index)}
            <span aria-hidden="true"> · </span>
            {episode.category}
          </p>
          <p className="oc-episode-role">{episode.role}</p>
          {showGuestName(episode) ? (
            <p className="oc-episode-guest">{episode.guestName}</p>
          ) : null}
          <h1>{episode.title}</h1>
          <p className="oc-episode-desc">{episode.description}</p>
          {episode.comingSoon && !audio ? (
            <p className="oc-episode-soon">Coming soon</p>
          ) : null}
          <div className="oc-episode-action">
            <EpisodePreview
              episode={episode}
              variant="page"
              source={`Episode page ${episode.id}`}
            />
          </div>
          <p className="oc-episode-back">
            <Link href="/episodes" className="link-ul-ink">
              All episodes
            </Link>
          </p>
        </div>
      </article>
      <style>{`
        .oc-episode {
          background: var(--ivory);
          color: var(--espresso);
          padding: 148px clamp(24px, 5vw, 56px) 120px;
        }
        .oc-episode-inner { max-width: 720px; margin: 0 auto; }
        .oc-episode-kicker { color: var(--burgundy); }
        .oc-episode-role {
          margin: 18px 0 0;
          font-size: 12px;
          letter-spacing: 0.16em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--burgundy);
        }
        .oc-episode-guest {
          margin: 10px 0 0;
          font-size: 16px;
          color: var(--espresso);
        }
        .oc-episode h1 {
          margin: 14px 0 0;
          font-family: var(--font-serif), "Playfair Display", Georgia, serif;
          font-weight: 500;
          font-size: clamp(36px, 6vw, 64px);
          line-height: 1.02;
          letter-spacing: -0.02em;
          color: var(--burgundy-deep);
        }
        .oc-episode-desc {
          margin: 22px 0 0;
          max-width: 58ch;
          font-size: 17px;
          line-height: 1.7;
        }
        .oc-episode-soon {
          margin: 22px 0 0;
          font-size: 12px;
          letter-spacing: 0.14em;
          text-transform: uppercase;
          font-weight: 600;
          color: var(--burgundy);
        }
        .oc-episode-action { margin-top: 28px; }
        .oc-episode-back { margin: 36px 0 0; }
        .oc-episode a:focus-visible,
        .oc-episode button:focus-visible {
          outline: 2px solid var(--burgundy);
          outline-offset: 3px;
        }
      `}</style>
    </>
  );
}
