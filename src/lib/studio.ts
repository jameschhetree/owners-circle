import { z } from "zod";
const text = z.string().trim().max(500);
const date = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/)
  .refine((v) => !Number.isNaN(Date.parse(v)), "Choose a valid date");
const url = z.union([
  z.literal(""),
  z
    .string()
    .url()
    .refine((v) => /^https?:\/\//.test(v), "Use an http or https link"),
]);
export const taskLabels = [
  "Video received from editor",
  "Put video in Opus",
  "Found best clips",
  "Captions and thumbnails reviewed",
  "Scheduled through Nuelink",
  "Full episode scheduled",
  "Published links verified",
] as const;
export const episodeSchema = z
  .object({
    id: z.string().uuid(),
    number: z.number().int().positive().max(99999),
    title: text.min(1),
    guest: text,
    dropDate: date.or(z.literal("")),
    shotDate: date.or(z.literal("")),
    stage: z.enum(["shot", "production", "published", "archived"]),
    owner: text,
    videoUrl: url,
    opusUrl: url,
    nuelinkUrl: url,
    notes: z.string().max(10000),
    tasks: z
      .array(
        z.object({
          label: z.enum(taskLabels),
          done: z.boolean(),
          completedAt: z.string().optional(),
        }),
      )
      .length(taskLabels.length),
    createdAt: z.string(),
  })
  .superRefine((e, ctx) => {
    if (e.stage === "production" && !e.dropDate)
      ctx.addIssue({
        code: "custom",
        message: "A submitted episode needs a drop date",
        path: ["dropDate"],
      });
    if (e.stage === "published" && e.tasks.some((t) => !t.done))
      ctx.addIssue({
        code: "custom",
        message: "Finish every publishing task before marking published",
        path: ["stage"],
      });
    if (new Set(e.tasks.map((t) => t.label)).size !== taskLabels.length)
      ctx.addIssue({
        code: "custom",
        message: "Checklist must contain each task once",
        path: ["tasks"],
      });
  });
export const prospectSchema = z.object({
  id: z.string().uuid(),
  name: text.min(1),
  company: text,
  role: text,
  email: z.union([z.literal(""), z.string().email()]),
  profileUrl: url,
  status: z.enum([
    "identified",
    "contacted",
    "interested",
    "booked",
    "recorded",
    "declined",
  ]),
  owner: text,
  followUp: date.or(z.literal("")),
  notes: z.string().max(10000),
  createdAt: z.string(),
});
export const metricSchema = z
  .object({
    id: z.string().uuid(),
    channel: z.enum([
      "Instagram",
      "YouTube",
      "TikTok",
      "LinkedIn",
      "Facebook",
      "X",
      "Other",
    ]),
    episodeNumber: z.number().int().positive().optional(),
    start: date,
    end: date,
    views: z.number().int().nonnegative(),
    engagements: z.number().int().nonnegative(),
    followers: z.number().int().nonnegative(),
    sourceUrl: url,
    notes: text,
    createdAt: z.string(),
  })
  .refine((m) => m.start <= m.end, "End date must follow start date");
export type StudioEpisode = z.infer<typeof episodeSchema>;
export type StudioProspect = z.infer<typeof prospectSchema>;
export type Metric = z.infer<typeof metricSchema>;
export type StudioStore = {
  episodes: StudioEpisode[];
  prospects: StudioProspect[];
  metrics: Metric[];
  activity: { id: string; label: string; at: string }[];
};
export const emptyStudio = (): StudioStore => ({
  episodes: [],
  prospects: [],
  metrics: [],
  activity: [],
});
export const makeTasks = () =>
  taskLabels.map((label) => ({ label, done: false }));
export const actionSchema = z.discriminatedUnion("type", [
  z.object({ type: z.literal("episode"), record: episodeSchema }),
  z.object({ type: z.literal("prospect"), record: prospectSchema }),
  z.object({ type: z.literal("metric"), record: metricSchema }),
]);
export function applyAction(
  store: StudioStore,
  action: z.infer<typeof actionSchema>,
): StudioStore {
  const next = structuredClone(store);
  const record = action.record;
  if (action.type === "episode") {
    if (
      next.episodes.some(
        (e) => e.number === action.record.number && e.id !== record.id,
      )
    )
      throw new Error("That episode number already exists");
    next.episodes = [
      action.record,
      ...next.episodes.filter((e) => e.id !== record.id),
    ];
  } else if (action.type === "prospect") {
    next.prospects = [
      action.record,
      ...next.prospects.filter((e) => e.id !== record.id),
    ];
  } else {
    next.metrics = [
      action.record,
      ...next.metrics.filter((e) => e.id !== record.id),
    ];
  }
  next.activity = [
    {
      id: crypto.randomUUID(),
      label:
        action.type === "episode"
          ? `Episode ${action.record.number} · ${action.record.title}`
          : action.type === "prospect"
            ? `Prospect updated · ${action.record.name}`
            : `${action.record.channel} report added`,
      at: new Date().toISOString(),
    },
    ...next.activity,
  ].slice(0, 60);
  return next;
}
