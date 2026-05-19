export const sponsorTiers = [
  {
    name: "Community Sponsor",
    description: "Support the mission and get visible across the Owner's Circle ecosystem.",
    features: [
      "Logo on event page",
      "Social mention",
      "Newsletter mention",
      "2 event tickets",
    ],
    featured: false,
  },
  {
    name: "Circle Sponsor",
    description: "Deeper integration across podcast, newsletter, and live events.",
    features: [
      "Everything in Community",
      "Table at event",
      "Short intro at event",
      "4 event tickets",
      "Included in recap content",
    ],
    featured: true,
  },
  {
    name: "Presenting Partner",
    description: "Full brand partnership across the entire Owner's Circle platform.",
    features: [
      "\"Presented by\" branding",
      "Logo on all assets",
      "Speaking slot at event",
      "Newsletter feature",
      "6-10 event tickets",
      "Recap video mention",
      "Optional podcast ad read",
    ],
    featured: false,
  },
] as const;

export const sponsorInventory = [
  { asset: "Podcast", placement: "Episode sponsorship and ad reads" },
  { asset: "Newsletter", placement: "Featured sponsor block in Inside the Circle" },
  { asset: "Events", placement: "Logo, booth, shoutout, and tickets" },
  { asset: "Website", placement: "Sponsor logo placement" },
  { asset: "Content", placement: "Branded clip and content collaborations" },
  { asset: "Community", placement: "Member perks and partner offers" },
] as const;

export const audienceTypes = [
  "Business Owners",
  "Founders",
  "Operators",
  "Creators",
  "Tech Leaders",
  "Investors",
  "Decision-Makers",
] as const;
