import type { PostStatus } from "@prisma/client";

export type JournalPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  contentHtml: string;
  coverImage: string | null;
  category: string;
  status: PostStatus;
  publishedAt: Date | null;
  scheduledAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
};

const now = new Date("2026-06-07T09:00:00.000Z");

export const samplePosts: JournalPost[] = [
  {
    id: "sample-1",
    title: "Curating the Intangible: On Luxury and Space",
    slug: "curating-the-intangible",
    excerpt:
      "Luxury is not the presence of abundance, but the absence of noise. A study in negative space, silence, and modern elegance.",
    category: "Design",
    status: "PUBLISHED",
    publishedAt: new Date("2026-05-24T09:00:00.000Z"),
    scheduledAt: null,
    createdAt: now,
    updatedAt: now,
    coverImage: null,
    contentHtml:
      "<p>There is a particular quietness that appears when a room has been edited with conviction. It is not emptiness. It is a form of attention.</p><h2>The Geometry of Solitude</h2><p>Negative space gives proportion its authority. It allows light to become visible, texture to carry meaning, and every object to feel intentional rather than accumulated.</p><blockquote>True luxury is the permission to leave room for thought.</blockquote><p>In interiors, wardrobes, and daily rituals, restraint is not denial. It is a disciplined invitation to notice what remains.</p>",
  },
  {
    id: "sample-2",
    title: "The Monochromatic Palette in Interior Design",
    slug: "monochromatic-palette-interior-design",
    excerpt:
      "Understanding the depth of off-white and charcoal through the lens of a Parisian atelier.",
    category: "Interiors",
    status: "PUBLISHED",
    publishedAt: new Date("2026-05-18T09:00:00.000Z"),
    scheduledAt: null,
    createdAt: now,
    updatedAt: now,
    coverImage: null,
    contentHtml:
      "<p>Monochrome succeeds when it is treated as a material system rather than a color shortcut. Chalk, linen, smoke, and ink each carry a different temperature.</p><p>The most composed rooms rarely announce themselves. They hold the eye through shadow, proportion, and repeated tonal intervals.</p>",
  },
  {
    id: "sample-3",
    title: "Slow Mornings in the Kyoto Suburbs",
    slug: "slow-mornings-kyoto-suburbs",
    excerpt:
      "Finding beauty in deliberate rituals, tea, and the quietude of early morning mist over the Kamo riverbanks.",
    category: "Living",
    status: "PUBLISHED",
    publishedAt: new Date("2026-05-11T09:00:00.000Z"),
    scheduledAt: null,
    createdAt: now,
    updatedAt: now,
    coverImage: null,
    contentHtml:
      "<p>The city wakes without hurry. Porcelain warms between two hands, cedar doors slide open, and the morning finds its own exact rhythm.</p><p>Ritual is design at the scale of the hour.</p>",
  },
  {
    id: "sample-4",
    title: "The Architecture of Silence",
    slug: "architecture-of-silence",
    excerpt:
      "A meditation on raw concrete, diffused light, and the deliberate luxury of stillness.",
    category: "Architecture",
    status: "DRAFT",
    publishedAt: null,
    scheduledAt: null,
    createdAt: now,
    updatedAt: now,
    coverImage: null,
    contentHtml:
      "<p>Draft study for a future essay on acoustics, mass, and architectural calm.</p>",
  },
];
