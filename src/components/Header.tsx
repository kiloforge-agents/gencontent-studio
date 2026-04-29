"use client";

import { useEffect, useState } from "react";

export function Header() {
  const [online, setOnline] = useState(true);
  const [installed, setInstalled] = useState(false);

  useEffect(() => {
    setOnline(navigator.onLine);
    const on = () => setOnline(true);
    const off = () => setOnline(false);
    window.addEventListener("online", on);
    window.addEventListener("offline", off);

    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error iOS Safari
      window.navigator.standalone === true;
    setInstalled(Boolean(standalone));

    return () => {
      window.removeEventListener("online", on);
      window.removeEventListener("offline", off);
    };
  }, []);

  return (
    <header className="sticky top-0 z-30 border-b border-[var(--line)] bg-[var(--bg)]/85 backdrop-blur supports-[backdrop-filter]:bg-[var(--bg)]/70">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-4 px-5 sm:px-8">
        <a href="/" className="flex items-center gap-2.5 group">
          <span
            aria-hidden
            className="grid h-7 w-7 place-items-center rounded-md bg-[var(--ink)] text-[var(--bg)] font-serif text-[15px] leading-none"
          >
            G
          </span>
          <span className="font-serif text-[17px] tracking-tight">GenContent</span>
          <span className="hidden sm:inline-block font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--ink-muted)] mt-0.5">
            Studio
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-6 ml-6 text-sm">
          <a href="#studio" className="text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors">
            Studio
          </a>
          <a href="#drafts" className="text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors">
            Drafts
          </a>
          <a href="#about" className="text-[var(--ink-soft)] hover:text-[var(--ink)] transition-colors">
            How it works
          </a>
        </nav>

        <div className="ml-auto flex items-center gap-2.5">
          <span
            className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--bg-elev)] px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-[var(--ink-soft)]"
            title={online ? "Connected — drafts sync nothing; everything stays local." : "Offline — all features still work."}
          >
            <span
              className={`h-1.5 w-1.5 rounded-full ${online ? "bg-[var(--green)]" : "bg-[var(--accent)]"} dot-pulse`}
            />
            {online ? "Online" : "Offline"}
          </span>
          {installed ? null : (
            <span className="hidden md:inline-flex items-center rounded-full border border-[var(--line)] bg-[var(--bg-elev)] px-2.5 py-1 text-[11px] font-mono uppercase tracking-[0.14em] text-[var(--ink-soft)]">
              Installable PWA
            </span>
          )}
        </div>
      </div>
    </header>
  );
}
