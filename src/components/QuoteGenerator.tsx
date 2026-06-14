import { useCallback, useEffect, useMemo, useState } from "react";
import { Copy, Heart, Moon, Share2, Shuffle, Sun, Sparkles } from "lucide-react";
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
  }, []);

  const newQuote = useCallback(() => {
    setLoading(true);
    window.setTimeout(() => {
      setQuote((prev) => pickRandom(pool, prev?.id));
      setAnimKey((k) => k + 1);
      setLoading(false);
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

  return (
    <main className="relative min-h-screen px-5 py-10 sm:py-16">
      {/* Top bar */}
      <div className="mx-auto flex max-w-5xl items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="grid h-9 w-9 place-items-center rounded-xl bg-primary/10 text-primary">
            <Sparkles className="h-4 w-4" />
          </div>
          <span className="text-sm font-semibold tracking-tight">Lumen Quotes</span>
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
          aria-label="Toggle theme"
        >
          {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </Button>
      </div>

      {/* Hero */}
      <section className="mx-auto mt-10 max-w-3xl text-center sm:mt-16">
        <h1 className="text-balance text-4xl font-semibold tracking-tight sm:text-5xl">
          A little inspiration,
          <span className="block bg-gradient-to-r from-primary to-[oklch(0.6_0.2_220)] bg-clip-text text-transparent">
            on demand.
          </span>
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-sm text-muted-foreground sm:text-base">
          Hand-picked quotes for the moments you need a spark. Refresh anytime.
        </p>
      </section>

      {/* Category chips */}
      <div className="mx-auto mt-8 flex max-w-3xl flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all",
              "hover:-translate-y-0.5 hover:shadow-sm",
              category === c
                ? "border-transparent bg-foreground text-background"
                : "border-border bg-background/40 text-muted-foreground hover:text-foreground",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Card */}
      <section className="mx-auto mt-8 max-w-2xl">
        <article className="glass-card relative overflow-hidden rounded-3xl p-8 sm:p-12">
          <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-20 -left-10 h-40 w-40 rounded-full bg-[oklch(0.7_0.18_220)]/20 blur-3xl" />

          {quote ? (
            <div
              key={animKey}
              className={cn(
                "relative animate-[fade-in_0.5s_ease-out]",
                loading && "opacity-50",
              )}
            >
              <Badge variant="secondary" className="rounded-full px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider">
                {quote.category}
              </Badge>
              <p className="mt-5 text-pretty text-2xl font-medium leading-snug tracking-tight sm:text-3xl">
                <span className="mr-1 text-3xl text-primary/60 sm:text-4xl">“</span>
                {quote.text}
                <span className="ml-1 text-3xl text-primary/60 sm:text-4xl">”</span>
              </p>
              <p className="mt-6 text-sm font-medium text-muted-foreground">
                — {quote.author}
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              <div className="h-4 w-20 animate-pulse rounded bg-muted" />
              <div className="h-6 w-full animate-pulse rounded bg-muted" />
              <div className="h-6 w-5/6 animate-pulse rounded bg-muted" />
              <div className="h-4 w-32 animate-pulse rounded bg-muted" />
            </div>
          )}

          {/* Actions */}
          <div className="relative mt-8 flex flex-wrap items-center gap-2">
            <Button
              onClick={newQuote}
              disabled={loading}
              size="lg"
              className="group rounded-full shadow-md transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <Shuffle className={cn("mr-2 h-4 w-4 transition-transform", loading && "animate-spin")} />
              New Quote
            </Button>

            <div className="ml-auto flex items-center gap-1">
              <Button variant="ghost" size="icon" onClick={toggleFav} className="rounded-full" aria-label="Favorite">
                <Heart className={cn("h-4 w-4 transition-all", isFav && "fill-destructive text-destructive scale-110")} />
              </Button>
              <Button variant="ghost" size="icon" onClick={copy} className="rounded-full" aria-label="Copy">
                <Copy className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="icon" onClick={share} className="rounded-full" aria-label="Share">
                <Share2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </article>

        <p className="mt-6 text-center text-xs text-muted-foreground">
          {favorites.length > 0
            ? `${favorites.length} favorite${favorites.length === 1 ? "" : "s"} saved`
            : "Tap the heart to save your favorites"}
        </p>
      </section>
    </main>
  );
}