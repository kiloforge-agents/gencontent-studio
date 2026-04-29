export function Hero() {
  return (
    <section className="relative border-b border-[var(--line)]">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-14 sm:py-20 grid md:grid-cols-12 gap-10 items-end">
        <div className="md:col-span-8">
          <div className="flex items-center gap-3 mb-6">
            <span className="font-mono text-[11px] uppercase tracking-[0.22em] text-[var(--ink-muted)]">
              Issue 01 — Working draft
            </span>
            <span className="h-px flex-1 bg-[var(--line-strong)]" />
          </div>
          <h1 className="font-serif text-[42px] sm:text-[60px] md:text-[76px] leading-[0.98] tracking-[-0.02em]">
            Drafts that sound
            <br />
            like <em className="italic font-medium">you</em> wrote them
            <span className="text-[var(--accent)]">.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-[17px] leading-[1.55] text-[var(--ink-soft)]">
            GenContent Studio is a small, opinionated PWA for the creators the big AI tools forget.
            Pick a niche, name your topic, get a structured draft for the channel you ship to —
            blog post, thread, LinkedIn, caption, or code. Everything stays on your device, online or off.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="#studio"
              className="btn-primary rounded-full px-5 py-2.5 text-sm font-medium"
            >
              Open the Studio →
            </a>
            <a
              href="#about"
              className="btn-ghost rounded-full px-5 py-2.5 text-sm font-medium"
            >
              How it works
            </a>
          </div>
        </div>

        <aside className="md:col-span-4 grid gap-3 text-sm">
          <div className="card p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              On the device
            </p>
            <p className="mt-2 leading-relaxed text-[var(--ink-soft)]">
              Drafts live in your browser&rsquo;s local storage. No accounts. No telemetry.
              Take it on the train.
            </p>
          </div>
          <div className="card p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              Across channels
            </p>
            <p className="mt-2 leading-relaxed text-[var(--ink-soft)]">
              One topic, five formats. The voice stays consistent because the niche profile does.
            </p>
          </div>
          <div className="card p-4">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)]">
              Yours to edit
            </p>
            <p className="mt-2 leading-relaxed text-[var(--ink-soft)]">
              Generation is a starting point, not a finished thought. Edit inline, copy, or export.
            </p>
          </div>
        </aside>
      </div>
      <div className="divider-dotted mx-auto max-w-7xl" />
    </section>
  );
}
