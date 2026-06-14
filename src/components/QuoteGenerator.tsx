import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ArrowUpRight,
  Copy,
  Heart,
  Moon,
  Quote as QuoteIcon,
  Share2,
  Shuffle,
  Sparkles,
  Sun,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import { CATEGORIES, QUOTES, type Quote } from "@/lib/quotes";
import { cn } from "@/lib/utils";

const FAVS_KEY = "qg:favorites";
const THEME_KEY = "qg:theme";

function pickRandom(pool: Quote[], excludeId?: string): Quote {
  if (pool.length === 0) return QUOTES[0];
  if (pool.length === 1) return pool[0];
  let next = pool[Math.floor(Math.random() * pool.length)];
  let guard = 0;
  while (next.id === excludeId && guard++ < 10) {
    next = pool[Math.floor(Math.random() * pool.length)];
  }
  return next;
}

export function QuoteGenerator() {
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [quote, setQuote] = useState<Quote | null>(null);
  const [animKey, setAnimKey] = useState(0);
  const [loading, setLoading] = useState(false);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [dark, setDark] = useState(false);
  const [seenCount, setSeenCount] = useState(0);

  const pool = useMemo(
    () => (category === "All" ? QUOTES : QUOTES.filter((q) => q.category === category)),
    [category],
  );

  // Init theme + favorites
  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = stored ? stored === "dark" : prefersDark;
      setDark(isDark);
      document.documentElement.classList.toggle("dark", isDark);
      const favs = JSON.parse(localStorage.getItem(FAVS_KEY) || "[]");
      if (Array.isArray(favs)) setFavorites(favs);
    } catch {}
    setQuote(pickRandom(QUOTES));
    setSeenCount(1);
  }, []);

  const newQuote = useCallback(() => {
    setLoading(true);
    window.setTimeout(() => {
      setQuote((prev) => pickRandom(pool, prev?.id));
      setAnimKey((k) => k + 1);
      setLoading(false);
      setSeenCount((c) => c + 1);
    }, 220);
  }, [pool]);

  // Re-pick when category changes
  useEffect(() => {
    if (quote && !pool.find((q) => q.id === quote.id)) newQuote();
  }, [category]); // eslint-disable-line

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem(THEME_KEY, next ? "dark" : "light"); } catch {}
  };

  const isFav = quote ? favorites.includes(quote.id) : false;
  const toggleFav = () => {
    if (!quote) return;
    const next = isFav ? favorites.filter((id) => id !== quote.id) : [...favorites, quote.id];
    setFavorites(next);
    try { localStorage.setItem(FAVS_KEY, JSON.stringify(next)); } catch {}
    toast(isFav ? "Removed from favorites" : "Added to favorites");
  };

  const copy = async () => {
    if (!quote) return;
    try {
      await navigator.clipboard.writeText(`"${quote.text}" — ${quote.author}`);
      toast("Quote copied to clipboard");
    } catch {
      toast("Couldn't copy");
    }
  };

  const share = async () => {
    if (!quote) return;
    const data = { title: "A quote for you", text: `"${quote.text}" — ${quote.author}` };
    if (typeof navigator !== "undefined" && (navigator as any).share) {
      try { await (navigator as any).share(data); return; } catch {}
    }
    copy();
  };

  const favQuotes = useMemo(
    () => QUOTES.filter((q) => favorites.includes(q.id)),
    [favorites],
  );

  const removeFav = (id: string) => {
    const next = favorites.filter((f) => f !== id);
    setFavorites(next);
    try { localStorage.setItem(FAVS_KEY, JSON.stringify(next)); } catch {}
  };

  return (
    <main className="relative min-h-screen">
      {/* Decorative animated background orbs */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl animate-[fade-in_1.2s_ease-out]" />
        <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-[oklch(0.7_0.18_220)]/15 blur-3xl" />
        <div className="absolute top-1/2 left-0 h-[18rem] w-[18rem] rounded-full bg-[oklch(0.8_0.15_320)]/10 blur-3xl" />
      </div>

      {/* Navbar */}
      <header className="sticky top-0 z-40 border-b border-border/40 backdrop-blur-xl bg-background/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <div className="flex items-center gap-2.5">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-linear-to-br from-primary to-[oklch(0.5_0.22_310)] text-primary-foreground shadow-md transition-transform duration-300 hover:scale-105 hover:rotate-3">
              <Sparkles className="h-4 w-4" />
            </div>
            <div className="leading-tight">
              <div className="text-sm font-semibold tracking-tight">Lumen</div>
              <div className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">Quotes</div>
            </div>
          </div>
          <nav className="hidden items-center gap-1 sm:flex">
            {["Discover", "Library", "Collections"].map((item, i) => (
              <button
                key={item}
                className={cn(
                  "relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                  i === 0 ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                )}
              >
                {item}
                {i === 0 && (
                  <span className="absolute inset-x-3 -bottom-px h-px bg-linear-to-r from-transparent via-primary to-transparent" />
                )}
              </button>
            ))}
          </nav>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              className="rounded-full transition-transform duration-300 hover:rotate-12"
              aria-label="Toggle theme"
            >
              {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 sm:pt-16">
        {/* Hero */}
        <section className="text-center animate-[fade-in_0.7s_ease-out]">
          <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white/40 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur-md">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-primary" />
            </span>
            Curated daily · {QUOTES.length} quotes
          </div>
          <h1 className="font-display mt-6 text-balance text-5xl leading-[1.05] sm:text-7xl">
            A little inspiration,
            <span className="block italic bg-linear-to-r from-primary via-[oklch(0.6_0.22_300)] to-[oklch(0.6_0.2_220)] bg-clip-text text-transparent">
              on demand.
            </span>
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
            Hand-picked wisdom from history's brightest minds. Refresh anytime
            for a fresh spark — and save the ones that move you.
          </p>
        </section>

        {/* Category chips */}
        <div className="mt-10 flex flex-wrap justify-center gap-2 animate-[fade-in_0.9s_ease-out]">
          {CATEGORIES.map((c) => (
            <button
              key={c}
              onClick={() => setCategory(c)}
              className={cn(
                "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ease-out",
                "hover:-translate-y-0.5",
                category === c
                  ? "border-transparent bg-foreground text-background shadow-md"
                  : "border-border/70 bg-white/40 text-muted-foreground backdrop-blur-md hover:text-foreground hover:border-border hover:shadow-sm",
              )}
            >
              {c}
            </button>
          ))}
        </div>

        {/* Main grid */}
        <div className="mt-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          {/* Quote card */}
          <article className="glass-card group relative overflow-hidden rounded-[28px] p-8 sm:p-12">
            <div className="absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/20 blur-3xl transition-opacity duration-500 group-hover:opacity-80" />
            <div className="absolute -bottom-24 -left-12 h-48 w-48 rounded-full bg-[oklch(0.7_0.18_220)]/25 blur-3xl" />

            <QuoteIcon
              aria-hidden
              className="absolute right-8 top-8 h-12 w-12 text-white/[0.08] sm:h-16 sm:w-16"
              strokeWidth={1.5}
            />

            {quote ? (
              <div
                key={animKey}
                className={cn(
                  "relative animate-[fade-in_0.5s_cubic-bezier(0.22,1,0.36,1)]",
                  loading && "opacity-40",
                )}
              >
                <Badge
                  variant="secondary"
                  className="rounded-full border border-white/20 bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-md"
                >
                  {quote.category}
                </Badge>
                <p className="font-display mt-6 text-pretty text-3xl leading-[1.15] sm:text-[44px]">
                  <span className="mr-1 align-top text-primary/70">“</span>
                  {quote.text}
                  <span className="ml-1 align-top text-primary/70">”</span>
                </p>
                <div className="mt-8 flex items-center gap-3">
                  <div className="h-px flex-1 max-w-12 bg-linear-to-r from-border to-transparent" />
                  <p className="text-sm font-medium tracking-wide text-white/80">
                    {quote.author}
                  </p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="h-5 w-24 animate-pulse rounded-full bg-muted" />
                <div className="h-8 w-full animate-pulse rounded-lg bg-muted" />
                <div className="h-8 w-5/6 animate-pulse rounded-lg bg-muted" />
                <div className="h-4 w-32 animate-pulse rounded bg-muted" />
              </div>
            )}

            {/* Actions */}
            <div className="relative mt-10 flex flex-wrap items-center gap-2">
              <Button
                onClick={newQuote}
                disabled={loading}
                size="lg"
                className="group/btn rounded-full px-5 shadow-lg shadow-primary/25 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-xl hover:shadow-primary/40"
              >
                <Shuffle
                  className={cn(
                    "mr-2 h-4 w-4 transition-transform duration-500",
                    loading ? "animate-spin" : "group-hover/btn:rotate-180",
                  )}
                />
                New Quote
              </Button>

              <div className="ml-auto flex items-center gap-1 rounded-full border border-white/20 bg-white/10 p-1 backdrop-blur-md">
                <IconAction onClick={toggleFav} label={isFav ? "Unfavorite" : "Favorite"}>
                  <Heart
                    className={cn(
                      "h-4 w-4 transition-all duration-300",
                      isFav && "scale-110 fill-destructive text-destructive",
                    )}
                  />
                </IconAction>
                <IconAction onClick={copy} label="Copy quote">
                  <Copy className="h-4 w-4" />
                </IconAction>
                <IconAction onClick={share} label="Share quote">
                  <Share2 className="h-4 w-4" />
                </IconAction>
              </div>
            </div>
          </article>

          {/* Side column */}
          <aside className="flex flex-col gap-6">
            {/* Stats card */}
            <div className="glass-card rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                  Session
                </span>
                <ArrowUpRight className="h-3.5 w-3.5 text-white/70" />
              </div>
              <div className="mt-4 grid grid-cols-3 gap-3">
                <Stat label="Seen" value={seenCount} />
                <Stat label="Saved" value={favorites.length} />
                <Stat label="Pool" value={pool.length} />
              </div>
            </div>

            {/* Favorites */}
            <div className="glass-card flex min-h-[280px] flex-col rounded-2xl p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Heart className="h-3.5 w-3.5 text-destructive" />
                  <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
                    Favorites
                  </span>
                </div>
                <span className="text-[11px] text-white/70">{favQuotes.length}</span>
              </div>

              {favQuotes.length === 0 ? (
                <div className="mt-6 flex flex-1 flex-col items-center justify-center text-center">
                    <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                      <Heart className="h-5 w-5 text-white/50" strokeWidth={1.5} />
                  </div>
                  <p className="mt-3 text-xs text-white/70">
                    Tap the heart to save quotes you love.
                  </p>
                </div>
              ) : (
                <ul className="mt-4 flex-1 space-y-2 overflow-y-auto pr-1">
                  {favQuotes.map((q, i) => (
                    <li
                      key={q.id}
                      className="group/fav rounded-xl border border-white/20 bg-white/10 p-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-white/30 hover:bg-white/20 hover:shadow-sm animate-[fade-in_0.4s_ease-out]"
                      style={{ animationDelay: `${i * 40}ms` }}
                    >
                      <button
                        onClick={() => { setQuote(q); setAnimKey((k) => k + 1); }}
                        className="block w-full text-left"
                      >
                        <p className="line-clamp-2 text-[13px] font-medium leading-snug">
                          {q.text}
                        </p>
                        <p className="mt-1 text-[11px] text-white/60">— {q.author}</p>
                      </button>
                      <button
                        onClick={() => removeFav(q.id)}
                        className="mt-2 inline-flex items-center gap-1 text-[10px] text-white/70 opacity-0 transition-opacity duration-200 hover:text-destructive group-hover/fav:opacity-100"
                        aria-label="Remove favorite"
                      >
                        <Trash2 className="h-3 w-3" /> Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </aside>
        </div>

        {/* Footer */}
        <footer className="mt-16 flex flex-col items-center gap-1 text-center">
          <p className="text-[11px] text-muted-foreground">
            Crafted with care · Press <kbd className="rounded border border-border/70 bg-white/30 px-1.5 py-0.5 font-mono text-[10px]">Space</kbd> for a new quote
          </p>
        </footer>
      </div>

      <KeyboardShortcut onTrigger={newQuote} />
    </main>
  );
}

function IconAction({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      title={label}
      className="grid h-8 w-8 place-items-center rounded-full text-white/70 transition-all duration-200 hover:bg-white/10 hover:text-white hover:scale-110 active:scale-95"
    >
      {children}
    </button>
  );
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <div className="rounded-xl border border-border/40 bg-background/40 px-2.5 py-2.5 text-center transition-colors hover:border-border hover:bg-background/70">
      <div className="font-display text-2xl leading-none">{value}</div>
      <div className="mt-1 text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
    </div>
  );
}

function KeyboardShortcut({ onTrigger }: { onTrigger: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.code === "Space" && e.target === document.body) {
        e.preventDefault();
        onTrigger();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onTrigger]);
  return null;
}