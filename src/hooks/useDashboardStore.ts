"use client";

import { useState, useEffect, useCallback } from "react";
import type { DashboardStore, Episode, Prospect } from "@/lib/dashboard-types";

const STORAGE_KEY = "oc-dashboard-store";

const defaultStore: DashboardStore = {
  podcastEpisodes: [],
  notesEpisodes: [],
  prospects: [],
};

function loadStore(): DashboardStore {
  if (typeof window === "undefined") return defaultStore;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return defaultStore;
    return JSON.parse(raw) as DashboardStore;
  } catch {
    return defaultStore;
  }
}

function saveStore(store: DashboardStore) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(store));
}

export function useDashboardStore() {
  const [store, setStore] = useState<DashboardStore>(defaultStore);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setStore(loadStore());
    setLoaded(true);
  }, []);

  const persist = useCallback((next: DashboardStore) => {
    setStore(next);
    saveStore(next);
  }, []);

  const addPodcastEpisode = useCallback(
    (ep: Episode) => {
      const next = { ...store, podcastEpisodes: [ep, ...store.podcastEpisodes] };
      persist(next);
    },
    [store, persist]
  );

  const addNotesEpisode = useCallback(
    (ep: Episode) => {
      const next = { ...store, notesEpisodes: [ep, ...store.notesEpisodes] };
      persist(next);
    },
    [store, persist]
  );

  const updateEpisode = useCallback(
    (ep: Episode) => {
      if (ep.type === "podcast") {
        const next = {
          ...store,
          podcastEpisodes: store.podcastEpisodes.map((e) => (e.id === ep.id ? ep : e)),
        };
        persist(next);
      } else {
        const next = {
          ...store,
          notesEpisodes: store.notesEpisodes.map((e) => (e.id === ep.id ? ep : e)),
        };
        persist(next);
      }
    },
    [store, persist]
  );

  const addProspect = useCallback(
    (p: Prospect) => {
      const next = { ...store, prospects: [p, ...store.prospects] };
      persist(next);
    },
    [store, persist]
  );

  const updateProspect = useCallback(
    (p: Prospect) => {
      const next = {
        ...store,
        prospects: store.prospects.map((pr) => (pr.id === p.id ? p : pr)),
      };
      persist(next);
    },
    [store, persist]
  );

  const allEpisodes = [...store.podcastEpisodes, ...store.notesEpisodes];

  const recentActivity: { label: string; completedAt: string; episodeTitle: string }[] = [];
  for (const ep of allEpisodes) {
    for (const phase of ep.checklist) {
      for (const item of phase.items) {
        if (item.completed && item.completedAt) {
          recentActivity.push({
            label: item.label,
            completedAt: item.completedAt,
            episodeTitle: ep.title,
          });
        }
      }
    }
  }
  recentActivity.sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());

  return {
    store,
    loaded,
    addPodcastEpisode,
    addNotesEpisode,
    updateEpisode,
    addProspect,
    updateProspect,
    recentActivity: recentActivity.slice(0, 5),
  };
}
