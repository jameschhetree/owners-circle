import type { ChecklistPhase } from "./dashboard-types";

export function podcastChecklist(): ChecklistPhase[] {
  return [
    {
      name: "Pre-Production",
      items: [
        { id: crypto.randomUUID(), label: "Identify & confirm guest", completed: false },
        { id: crypto.randomUUID(), label: "Deep-research guest (background, company, recent news)", completed: false },
        { id: crypto.randomUUID(), label: "Draft 10-15 interview questions", completed: false },
        { id: crypto.randomUUID(), label: "Send guest prep sheet (topics, format, logistics)", completed: false },
        { id: crypto.randomUUID(), label: "Schedule recording date/time", completed: false },
        { id: crypto.randomUUID(), label: "Confirm equipment/studio setup", completed: false },
      ],
    },
    {
      name: "Production",
      items: [
        { id: crypto.randomUUID(), label: "Pre-interview briefing (5 min)", completed: false },
        { id: crypto.randomUUID(), label: "Record interview", completed: false },
        { id: crypto.randomUUID(), label: "Backup recording files", completed: false },
        { id: crypto.randomUUID(), label: "Log highlights/timestamps during recording", completed: false },
      ],
    },
    {
      name: "Post-Production",
      items: [
        { id: crypto.randomUUID(), label: "Edit audio/video (cut, levels, transitions)", completed: false },
        { id: crypto.randomUUID(), label: "Write show notes & episode description", completed: false },
        { id: crypto.randomUUID(), label: "Create episode thumbnail/cover art", completed: false },
        { id: crypto.randomUUID(), label: "Select 2-3 clip moments for social", completed: false },
        { id: crypto.randomUUID(), label: "Upload to hosting platform", completed: false },
        { id: crypto.randomUUID(), label: "Schedule publish date", completed: false },
      ],
    },
    {
      name: "Distribution",
      items: [
        { id: crypto.randomUUID(), label: "Publish episode", completed: false },
        { id: crypto.randomUUID(), label: "Post announcement on social media", completed: false },
        { id: crypto.randomUUID(), label: "Send newsletter to subscribers", completed: false },
        { id: crypto.randomUUID(), label: "Create 2-3 short clips for social", completed: false },
        { id: crypto.randomUUID(), label: "Thank guest & share their post", completed: false },
        { id: crypto.randomUUID(), label: "Track analytics (48hr check)", completed: false },
      ],
    },
  ];
}

export function notesChecklist(): ChecklistPhase[] {
  return [
    {
      name: "Ideation & Prep",
      items: [
        { id: crypto.randomUUID(), label: "Choose topic / thesis", completed: false },
        { id: crypto.randomUUID(), label: "Research & gather supporting data", completed: false },
        { id: crypto.randomUUID(), label: "Write outline (3-5 key points)", completed: false },
        { id: crypto.randomUUID(), label: "Draft talking points / script notes", completed: false },
      ],
    },
    {
      name: "Production",
      items: [
        { id: crypto.randomUUID(), label: "Set up shoot location (nature setting)", completed: false },
        { id: crypto.randomUUID(), label: "Equipment check (camera, audio, lighting)", completed: false },
        { id: crypto.randomUUID(), label: "Record episode (wide single-person shot)", completed: false },
        { id: crypto.randomUUID(), label: "Backup recording files", completed: false },
      ],
    },
    {
      name: "Post-Production",
      items: [
        { id: crypto.randomUUID(), label: "Edit video (pacing, b-roll if any, color grade)", completed: false },
        { id: crypto.randomUUID(), label: "Write episode description / show notes", completed: false },
        { id: crypto.randomUUID(), label: "Create thumbnail", completed: false },
        { id: crypto.randomUUID(), label: "Select 1-2 clip moments", completed: false },
        { id: crypto.randomUUID(), label: "Upload to hosting platform", completed: false },
        { id: crypto.randomUUID(), label: "Schedule publish date", completed: false },
      ],
    },
    {
      name: "Distribution",
      items: [
        { id: crypto.randomUUID(), label: "Publish episode", completed: false },
        { id: crypto.randomUUID(), label: "Post announcement on social media", completed: false },
        { id: crypto.randomUUID(), label: "Send newsletter blurb", completed: false },
        { id: crypto.randomUUID(), label: "Create social clips", completed: false },
        { id: crypto.randomUUID(), label: "Track analytics (48hr check)", completed: false },
      ],
    },
  ];
}
