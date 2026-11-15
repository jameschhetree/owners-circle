"use client";

import { useEffect, useRef, useState } from "react";
import { WaitlistButton } from "@/components/Waitlist";
import { episodeAudio, type Episode } from "@/data/episodes";

function PlayIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M4.2 2.1v9.8L11.4 7 4.2 2.1z" fill="currentColor" />
    </svg>
  );
}

function PauseIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true">
      <path d="M3 2h2.6v10H3zM8.4 2H11v10H8.4z" fill="currentColor" />
    </svg>
  );
}

function PreviewButton({ src, title }: { src: string; title: string }) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    const onPlay = () => setPlaying(true);
    const onPause = () => setPlaying(false);
    audio.addEventListener("play", onPlay);
    audio.addEventListener("pause", onPause);
    audio.addEventListener("ended", onPause);
    return () => {
      audio.pause();
      audio.removeEventListener("play", onPlay);
      audio.removeEventListener("pause", onPause);
      audio.removeEventListener("ended", onPause);
    };
  }, [src]);

  async function toggle() {
    const audio = audioRef.current;
    if (!audio) return;
    if (audio.paused) {
      try {
        await audio.play();
      } catch {
        setPlaying(false);
      }
    } else {
      audio.pause();
    }
  }

  const label = playing ? `Pause preview: ${title}` : `Play preview: ${title}`;

  return (
    <>
      <audio ref={audioRef} className="oc-preview-audio" src={src} preload="none" />
      <button
        type="button"
        className="oc-play"
        aria-pressed={playing}
        aria-label={label}
        onClick={toggle}
      >
        {playing ? <PauseIcon /> : <PlayIcon />}
      </button>
    </>
  );
}

export function EpisodePreview({
  episode,
  variant = "card",
  source,
}: {
  episode: Episode;
  variant?: "card" | "page";
  source?: string;
}) {
  const audio = episodeAudio(episode);
  if (audio) {
    return <PreviewButton src={audio} title={episode.title} />;
  }

  return (
    <WaitlistButton
      intent="Episodes"
      source={source ?? `Episode ${episode.id}`}
      className={variant === "page" ? "pill" : "oc-notify"}
    >
      Notify me
    </WaitlistButton>
  );
}
