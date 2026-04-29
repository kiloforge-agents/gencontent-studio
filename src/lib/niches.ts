export type Niche = {
  id: string;
  label: string;
  emoji: string;
  audience: string;
  tone: string;
  hooks: string[];
  pains: string[];
  outcomes: string[];
  vocabulary: string[];
  examples: string[];
};

export const NICHES: Niche[] = [
  {
    id: "indie-dev",
    label: "Indie Software",
    emoji: "⌘",
    audience: "indie hackers and small SaaS founders",
    tone: "candid, technical, slightly contrarian",
    hooks: [
      "I shipped this in a weekend",
      "The boring part nobody talks about",
      "Most teams overcomplicate this",
      "I rebuilt it from scratch — here's why",
    ],
    pains: [
      "shipping velocity stalls past month three",
      "growth loops feel theoretical, not lived",
      "feature creep eats your roadmap",
      "you can't tell what's actually working",
    ],
    outcomes: [
      "fewer dependencies, faster builds",
      "a shippable demo by Friday",
      "metrics that survive contact with users",
      "a roadmap your team can actually defend",
    ],
    vocabulary: [
      "TTFB", "self-hosted", "p95", "feature flag", "SQLite", "RSC", "edge runtime", "bundle size",
    ],
    examples: [
      "edge functions", "local-first sync", "feature flags", "bundle splitting",
    ],
  },
  {
    id: "creator-economy",
    label: "Creator Economy",
    emoji: "✍︎",
    audience: "newsletter writers and full-time creators",
    tone: "warm, voice-driven, lightly editorial",
    hooks: [
      "Your audience doesn't want more — they want closer",
      "I deleted half my back catalog",
      "The metric that finally moved my newsletter",
      "Stop publishing. Start editing.",
    ],
    pains: [
      "a feed full of strangers and zero signal",
      "another launch that landed quietly",
      "the algorithm rearranges what you worked on",
      "you write for everyone, so it lands for no one",
    ],
    outcomes: [
      "readers who reply, not just open",
      "a body of work you'd hand a stranger",
      "evergreen pieces that keep earning",
      "a calmer publishing rhythm",
    ],
    vocabulary: [
      "editorial calendar", "reader persona", "open rate", "subscriber LTV", "RSS", "long tail",
    ],
    examples: [
      "newsletter cadence", "lead magnets", "podcast guesting", "evergreen sequences",
    ],
  },
  {
    id: "fitness",
    label: "Fitness & Health",
    emoji: "◎",
    audience: "everyday lifters and recreational athletes",
    tone: "encouraging, no-nonsense, evidence-led",
    hooks: [
      "Stop chasing the perfect program",
      "What I'd tell my untrained self",
      "The workout most people skip",
      "Three small habits, six months later",
    ],
    pains: [
      "two months in and motivation drops",
      "the plateau no app can explain",
      "soreness becomes an identity",
      "you train hard, recover badly",
    ],
    outcomes: [
      "a training week you actually finish",
      "lifts that climb without burning out",
      "sleep that stops sabotaging your sets",
      "a plan you can run for a year",
    ],
    vocabulary: [
      "RPE", "deload", "VO2 max", "macro split", "zone 2", "hypertrophy",
    ],
    examples: [
      "progressive overload", "zone 2 cardio", "mobility blocks", "sleep latency",
    ],
  },
  {
    id: "design",
    label: "Design & UX",
    emoji: "◐",
    audience: "product designers and design leads",
    tone: "thoughtful, opinionated, craft-led",
    hooks: [
      "Stop redesigning, start removing",
      "Your design system is a memo, not a product",
      "The interaction nobody notices",
      "I rebuilt this flow with two screens",
    ],
    pains: [
      "specs ship, intent doesn't",
      "the system is documented and ignored",
      "delight is the first thing cut",
      "you're shipping pixels, not decisions",
    ],
    outcomes: [
      "decisions traceable in the artifact",
      "a system engineers reach for first",
      "screens that age slowly",
      "a portfolio that reads like a thesis",
    ],
    vocabulary: [
      "affordance", "design tokens", "wayfinding", "accessibility audit", "motion system",
    ],
    examples: [
      "empty states", "loading skeletons", "form validation", "onboarding flows",
    ],
  },
  {
    id: "finance",
    label: "Personal Finance",
    emoji: "$",
    audience: "salaried professionals investing for the long run",
    tone: "calm, numerate, lightly skeptical",
    hooks: [
      "The advice that quietly compounds",
      "What your spreadsheet keeps missing",
      "A boring portfolio, on purpose",
      "The fee you stopped seeing",
    ],
    pains: [
      "saving feels noisy, not deliberate",
      "every dollar has three opinions about it",
      "you optimize the small, forget the structural",
      "you can't tell what 'enough' looks like",
    ],
    outcomes: [
      "a portfolio that survives a bad decade",
      "a spending plan you don't resent",
      "tax moves that you actually make",
      "a runway you can name in months",
    ],
    vocabulary: [
      "expense ratio", "Roth conversion", "asset allocation", "rebalancing", "withdrawal rate",
    ],
    examples: [
      "index funds", "tax-loss harvesting", "emergency funds", "Roth ladders",
    ],
  },
  {
    id: "food",
    label: "Food & Recipes",
    emoji: "♨",
    audience: "home cooks who want fewer, better dishes",
    tone: "sensory, instructive, generous",
    hooks: [
      "The weeknight dinner I never get tired of",
      "One technique, a dozen meals",
      "What restaurants do that you can copy",
      "Stop following recipes. Read them.",
    ],
    pains: [
      "a fridge of half-finished projects",
      "recipes that lie about the time",
      "the same five dinners on repeat",
      "you cook well, plate badly",
    ],
    outcomes: [
      "a weekday repertoire of ten dishes",
      "a pantry that does the heavy lifting",
      "leftovers your future self thanks you for",
      "dinners that take 30 minutes — actually",
    ],
    vocabulary: [
      "fond", "deglaze", "mise en place", "bloom", "rest", "carryover",
    ],
    examples: [
      "one-pan dinners", "make-ahead grains", "stock from scraps", "sheet-pan suppers",
    ],
  },
  {
    id: "travel",
    label: "Travel & Slow Living",
    emoji: "✈",
    audience: "remote workers planning intentional trips",
    tone: "reflective, grounded, specific",
    hooks: [
      "Skip the list. Pick a neighborhood.",
      "A week is the wrong unit",
      "What the guidebook forgot",
      "The trip I keep retaking",
    ],
    pains: [
      "an itinerary that performs, not lives",
      "the souvenir of being constantly tired",
      "a trip optimized for the camera roll",
      "you saw everything, remember nothing",
    ],
    outcomes: [
      "mornings that actually feel local",
      "a packing list you trust",
      "trips that cost less, mean more",
      "a notebook full of places you'd return to",
    ],
    vocabulary: [
      "shoulder season", "slow travel", "carry-on only", "neighborhood stay", "off-peak",
    ],
    examples: [
      "month-long stays", "local cafés", "walking days", "shoulder-season flights",
    ],
  },
  {
    id: "ai",
    label: "AI & Machine Learning",
    emoji: "✦",
    audience: "engineers and PMs shipping AI features",
    tone: "rigorous, pragmatic, lightly skeptical",
    hooks: [
      "Your eval set is the product",
      "Stop demoing. Start measuring.",
      "Why your prompt regressed silently",
      "The boring evals beat the clever prompts",
    ],
    pains: [
      "demos win, evals lose",
      "you can't reproduce yesterday's output",
      "every PR is a vibe check",
      "latency creeps, costs balloon",
    ],
    outcomes: [
      "evals that gate every release",
      "fewer model swaps, better hit rates",
      "p95 latency you can promise",
      "a roadmap built on data, not vibes",
    ],
    vocabulary: [
      "RAG", "few-shot", "tool use", "embedding drift", "prompt regression", "chain-of-thought",
    ],
    examples: [
      "retrieval pipelines", "function calling", "structured outputs", "fine-tuning",
    ],
  },
];

export const getNiche = (id: string): Niche => NICHES.find((n) => n.id === id) ?? NICHES[0];
