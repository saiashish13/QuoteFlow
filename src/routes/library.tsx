import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Check, FolderPlus, Heart, Search } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { CATEGORIES, QUOTES } from "@/lib/quotes";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { toast } from "sonner";
import { loadCollections, saveCollections, type Collection } from "@/lib/collections";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const FAVS_KEY = "qg:favorites";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library - Quote Flow" },
      { name: "description", content: "Browse the full library of curated quotes by category and search." },
      { property: "og:title", content: "Library - Quote Flow" },
      { property: "og:description", content: "Browse every quote in the Quote Flow library." },
    ],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("All");
  const [favorites, setFavorites] = useState<string[]>([]);
  const [collections, setCollections] = useState<Collection[]>([]);

  useEffect(() => {
    try {
      const favs = JSON.parse(localStorage.getItem(FAVS_KEY) || "[]");
      if (Array.isArray(favs)) setFavorites(favs);
    } catch {}
    setCollections(loadCollections());
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return QUOTES.filter((quote) => {
      if (category !== "All" && quote.category !== category) return false;
      if (!q) return true;
      return (
        quote.text.toLowerCase().includes(q) ||
        quote.author.toLowerCase().includes(q)
      );
    });
  }, [query, category]);

  const toggleFav = (id: string) => {
    const has = favorites.includes(id);
    const next = has ? favorites.filter((f) => f !== id) : [...favorites, id];
    setFavorites(next);
    try { localStorage.setItem(FAVS_KEY, JSON.stringify(next)); } catch {}
    toast(has ? "Removed from favorites" : "Added to favorites");
  };

  const toggleInCollection = (collectionId: string, quoteId: string) => {
    const next = collections.map((c) => {
      if (c.id !== collectionId) return c;
      const has = c.quoteIds.includes(quoteId);
      return {
        ...c,
        quoteIds: has ? c.quoteIds.filter((id) => id !== quoteId) : [...c.quoteIds, quoteId],
      };
    });
    setCollections(next);
    saveCollections(next);
    const target = next.find((c) => c.id === collectionId);
    const has = target?.quoteIds.includes(quoteId);
    toast(has ? `Added to ${target?.name}` : `Removed from ${target?.name}`);
  };

  return (
    <SiteShell>
      <section className="text-center animate-[fade-in_0.6s_ease-out]">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white/40 dark:bg-white/10 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur-md">
          {QUOTES.length} quotes · {CATEGORIES.length - 1} categories
        </div>
        <h1 className="font-display mt-5 text-balance text-5xl leading-[1.05] sm:text-6xl">
          The full <span className="italic text-primary">library</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Every quote in one place. Search, filter, save favorites, and tuck them into collections.
        </p>
      </section>

      {/* Search */}
      <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full border border-border/60 bg-white/50 dark:bg-white/10 px-4 py-1.5 shadow-sm backdrop-blur-md">
        <Search className="h-4 w-4 text-muted-foreground" />
        <Input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search quotes or authors…"
          className="h-9 border-0 bg-transparent px-0 shadow-none focus-visible:ring-0"
        />
        {query && (
          <button
            onClick={() => setQuery("")}
            className="text-[11px] text-muted-foreground hover:text-foreground"
          >
            Clear
          </button>
        )}
      </div>

      {/* Category chips */}
      <div className="mt-6 flex flex-wrap justify-center gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c}
            onClick={() => setCategory(c)}
            className={cn(
              "rounded-full border px-3.5 py-1.5 text-xs font-medium transition-all duration-200 ease-out hover:-translate-y-0.5",
              category === c
                ? "border-transparent bg-foreground text-background shadow-md"
                : "border-border/70 bg-white/40 dark:bg-white/10 text-muted-foreground backdrop-blur-md hover:text-foreground hover:border-border hover:shadow-sm",
            )}
          >
            {c}
          </button>
        ))}
      </div>

      {/* Grid */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between px-1 text-[11px] text-muted-foreground">
          <span>{filtered.length} result{filtered.length === 1 ? "" : "s"}</span>
        </div>
        {filtered.length === 0 ? (
          <div className="glass-card rounded-2xl p-10 text-center text-sm text-white/70">
            No quotes match your search.
          </div>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2">
            {filtered.map((quote, i) => {
              const isFav = favorites.includes(quote.id);
              return (
                <article
                  key={quote.id}
                  className="glass-card group relative flex flex-col rounded-2xl p-6 lift animate-[fade-in_0.4s_ease-out]"
                  style={{ animationDelay: `${Math.min(i * 25, 400)}ms` }}
                >
                  <Badge
                    variant="secondary"
                    className="self-start rounded-full border border-white/20 bg-white/15 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80 backdrop-blur-md"
                  >
                    {quote.category}
                  </Badge>
                  <p className="font-display mt-4 text-pretty text-xl leading-snug">
                    “{quote.text}”
                  </p>
                  <div className="mt-auto flex items-end justify-between pt-5">
                    <p className="text-xs font-medium text-white/70">— {quote.author}</p>
                    <div className="flex items-center gap-1">
                      <IconBtn
                        onClick={() => toggleFav(quote.id)}
                        label={isFav ? "Unfavorite" : "Favorite"}
                      >
                        <Heart
                          className={cn(
                            "h-3.5 w-3.5",
                            isFav && "fill-destructive text-destructive",
                          )}
                        />
                      </IconBtn>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            aria-label="Add to collection"
                            className="grid h-7 w-7 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                          >
                            <FolderPlus className="h-3.5 w-3.5" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                          <DropdownMenuLabel>Add to collection</DropdownMenuLabel>
                          <DropdownMenuSeparator />
                          {collections.length === 0 ? (
                            <DropdownMenuItem disabled className="text-xs">
                              Create one in Collections
                            </DropdownMenuItem>
                          ) : (
                            collections.map((c) => {
                              const has = c.quoteIds.includes(quote.id);
                              return (
                                <DropdownMenuItem
                                  key={c.id}
                                  onClick={() => toggleInCollection(c.id, quote.id)}
                                  className="flex items-center justify-between gap-2 text-xs"
                                >
                                  <span className="truncate">{c.name}</span>
                                  {has && <Check className="h-3.5 w-3.5 text-primary" />}
                                </DropdownMenuItem>
                              );
                            })
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </div>
    </SiteShell>
  );
}

function IconBtn({
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
      className="grid h-7 w-7 place-items-center rounded-full text-white/70 transition-colors hover:bg-white/10 hover:text-white"
    >
      {children}
    </button>
  );
}
