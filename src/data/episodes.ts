export interface Episode {
  id: string;
  guestName: string;
  role: string;
  title: string;
  category: string;
  description: string;
  comingSoon: boolean;
}

export const episodes: Episode[] = [
  {
    id: "ep-001",
    guestName: "Coming Soon",
    role: "Founder / CEO",
    title: "Building from zero to acquisition",
    category: "Ownership",
    description: "A conversation about what it really takes to build a company from nothing, make hard decisions, and come out the other side.",
    comingSoon: true,
  },
  {
    id: "ep-002",
    guestName: "Coming Soon",
    role: "Tech Leader",
    title: "How AI is reshaping small business operations",
    category: "Technology",
    description: "From automation to customer experience, how one tech leader is helping local businesses compete with enterprise tools.",
    comingSoon: true,
  },
  {
    id: "ep-003",
    guestName: "Coming Soon",
    role: "Agency Owner",
    title: "Scaling a creative agency without losing the work",
    category: "Growth",
    description: "The tension between growth and craft, and how one agency owner found the balance.",
    comingSoon: true,
  },
  {
    id: "ep-004",
    guestName: "Coming Soon",
    role: "Real Estate Operator",
    title: "What commercial real estate teaches you about people",
    category: "Leadership",
    description: "Lessons from managing properties, tenants, and teams across multiple markets.",
    comingSoon: true,
  },
  {
    id: "ep-005",
    guestName: "Coming Soon",
    role: "Healthcare Executive",
    title: "Building a healthcare company with a mission",
    category: "Ownership",
    description: "How one executive navigated regulations, hiring, and purpose to build something that matters.",
    comingSoon: true,
  },
  {
    id: "ep-006",
    guestName: "Coming Soon",
    role: "Creator-Founder",
    title: "From content to company: turning a brand into a business",
    category: "The Room",
    description: "The path from creating content to owning a real business, and the relationships that made it happen.",
    comingSoon: true,
  },
];

export const categories = ["All", "Ownership", "Growth", "Leadership", "Technology", "The Room"];
