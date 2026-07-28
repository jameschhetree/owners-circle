export interface ChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  completedAt?: string;
  notes?: string;
}

export interface ChecklistPhase {
  name: string;
  items: ChecklistItem[];
}

export interface Episode {
  id: string;
  title: string;
  type: "podcast" | "notes";
  status: "active" | "completed" | "archived";
  guestName?: string;
  guestCompany?: string;
  topic?: string;
  createdAt: string;
  checklist: ChecklistPhase[];
  notes: string;
}

export type ProspectStatus =
  | "identified"
  | "researched"
  | "contacted"
  | "confirmed"
  | "scheduled"
  | "completed"
  | "declined";

export interface Prospect {
  id: string;
  name: string;
  company: string;
  role: string;
  linkedIn?: string;
  twitter?: string;
  email?: string;
  status: ProspectStatus;
  notes: string;
  source: string;
  addedAt: string;
  lastContactedAt?: string;
  episodeId?: string;
}

export interface DashboardStore {
  podcastEpisodes: Episode[];
  notesEpisodes: Episode[];
  prospects: Prospect[];
}
