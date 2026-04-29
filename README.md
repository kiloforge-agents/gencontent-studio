# GenContent Studio

A small, opinionated PWA for the creators big AI tools forget. Pick a niche, name a topic, get a structured draft for the channel you ship to — blog post, X thread, LinkedIn post, Instagram caption, or code snippet. Everything stays on your device, online or off.

## What's inside

- **Niche-aware generation** — eight niche profiles (indie software, creator economy, fitness, design, finance, food, travel, AI) each with their own tone, vocabulary, hooks, and pains.
- **Five formats** — blog post, X thread, LinkedIn post, Instagram caption, and code snippet (TypeScript, JavaScript, Python, Go, Rust).
- **Local-only drafts** — drafts persist in `localStorage`. No accounts, no telemetry, no server.
- **Offline-first PWA** — installable, with a service worker that caches the shell and runtime assets for offline drafting.
- **Editable inline** — every generation is a starting point. Edit before you ship.

## Stack

- Next.js 16 App Router (RSC + a thin client island for the studio)
- TypeScript everywhere
- Tailwind CSS v4
- Service worker for offline support
- Inter, Fraunces, and JetBrains Mono via `next/font`

## Run it locally

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`. To exercise the service worker / offline mode, run a production build:

```bash
npm run build
npm start
```

## Architecture

```
src/
├── app/
│   ├── layout.tsx          # fonts, metadata, viewport, SW registrar
│   ├── page.tsx            # composition: Hero · Studio · About
│   ├── manifest.ts         # PWA manifest
│   └── offline/page.tsx    # offline fallback
├── components/             # Header, Hero, Studio, OutputCard, DraftsShelf, About, Footer
└── lib/
    ├── niches.ts           # niche profiles (audience, tone, vocab, hooks)
    ├── generator.ts        # deterministic, seedable content engine
    ├── markdown.ts         # tiny dependency-free md → html
    └── storage.ts          # localStorage drafts CRUD
public/
├── icon.svg                # app icon
└── sw.js                   # service worker (network-first nav, SWR for assets)
```

## Why local generation?

Generic chatbots will write you a blog post. Most will write the same one. GenContent Studio is a deliberately small alternative: niche-aware drafting that runs entirely on your device. No API keys, no rate limits, no waiting on a server thousands of miles away. Quality scales by adding niches and templates, not by burning tokens.

## License

MIT — do whatever you want.
