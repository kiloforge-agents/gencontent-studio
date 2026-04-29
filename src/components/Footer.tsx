export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--paper)]/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 py-10 grid md:grid-cols-3 gap-8 text-[13.5px]">
        <div>
          <div className="flex items-center gap-2.5">
            <span
              aria-hidden
              className="grid h-6 w-6 place-items-center rounded-md bg-[var(--ink)] text-[var(--bg)] font-serif text-[12px] leading-none"
            >
              G
            </span>
            <span className="font-serif text-[15px] tracking-tight">GenContent Studio</span>
          </div>
          <p className="mt-3 max-w-xs leading-relaxed text-[var(--ink-soft)]">
            A small, opinionated PWA for creators. Drafts live on your device. Online or off.
          </p>
        </div>
        <div className="md:col-start-3 md:justify-self-end space-y-2">
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-[var(--ink-muted)]">
            Colophon
          </p>
          <ul className="space-y-1 text-[var(--ink-soft)]">
            <li>Set in Fraunces & Inter.</li>
            <li>Code in JetBrains Mono.</li>
            <li>Made for the creator economy gap.</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-[var(--line)]">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 py-4 flex flex-wrap items-center justify-between gap-3 text-[11px] font-mono uppercase tracking-[0.18em] text-[var(--ink-muted)]">
          <span>© {new Date().getFullYear()} GenContent Studio</span>
          <span>v1.0 · Issue 01</span>
        </div>
      </div>
    </footer>
  );
}
