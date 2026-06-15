import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { FolderPlus, Plus, Trash2, X, Pencil, FolderHeart } from "lucide-react";
import { SiteShell } from "@/components/SiteShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { QUOTES } from "@/lib/quotes";
import {
  createCollection,
  loadCollections,
  saveCollections,
  type Collection,
} from "@/lib/collections";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/collections")({
  head: () => ({
    meta: [
      { title: "Collections — Lumen Quotes" },
      { name: "description", content: "Create custom folders to organize the quotes that matter to you." },
      { property: "og:title", content: "Collections — Lumen Quotes" },
      { property: "og:description", content: "Organize quotes into your own collections." },
    ],
  }),
  component: CollectionsPage,
});

function CollectionsPage() {
  const [collections, setCollections] = useState<Collection[]>([]);
  const [newName, setNewName] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");

  useEffect(() => {
    const cs = loadCollections();
    setCollections(cs);
    if (cs.length > 0) setActiveId(cs[0].id);
  }, []);

  const persist = (next: Collection[]) => {
    setCollections(next);
    saveCollections(next);
  };

  const addCollection = () => {
    const name = newName.trim();
    if (!name) return;
    const c = createCollection(name);
    const next = [c, ...collections];
    persist(next);
    setNewName("");
    setActiveId(c.id);
    toast(`Created "${c.name}"`);
  };

  const removeCollection = (id: string) => {
    const target = collections.find((c) => c.id === id);
    const next = collections.filter((c) => c.id !== id);
    persist(next);
    if (activeId === id) setActiveId(next[0]?.id ?? null);
    if (target) toast(`Deleted "${target.name}"`);
  };

  const renameCollection = (id: string) => {
    const name = renameValue.trim();
    if (!name) return;
    persist(collections.map((c) => (c.id === id ? { ...c, name } : c)));
    setRenamingId(null);
    setRenameValue("");
  };

  const removeFromCollection = (collectionId: string, quoteId: string) => {
    persist(
      collections.map((c) =>
        c.id === collectionId
          ? { ...c, quoteIds: c.quoteIds.filter((id) => id !== quoteId) }
          : c,
      ),
    );
  };

  const active = useMemo(
    () => collections.find((c) => c.id === activeId) ?? null,
    [collections, activeId],
  );

  const activeQuotes = useMemo(() => {
    if (!active) return [];
    return active.quoteIds
      .map((id) => QUOTES.find((q) => q.id === id))
      .filter((q): q is (typeof QUOTES)[number] => Boolean(q));
  }, [active]);

  return (
    <SiteShell>
      <section className="text-center animate-[fade-in_0.6s_ease-out]">
        <div className="inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-white/40 dark:bg-white/10 px-3 py-1 text-[11px] font-medium text-muted-foreground backdrop-blur-md">
          <FolderHeart className="h-3 w-3" />
          {collections.length} collection{collections.length === 1 ? "" : "s"}
        </div>
        <h1 className="font-display mt-5 text-balance text-5xl leading-[1.05] sm:text-6xl">
          Your <span className="italic text-primary">collections</span>.
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-pretty text-[15px] leading-relaxed text-muted-foreground">
          Build custom folders for the quotes you want to keep close — by mood, project, or whatever you like.
        </p>
      </section>

      {/* Create */}
      <div className="mx-auto mt-8 flex max-w-xl items-center gap-2 rounded-full border border-border/60 bg-white/50 dark:bg-white/10 px-2 py-1.5 shadow-sm backdrop-blur-md">
        <Input
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") addCollection();
          }}
          placeholder="New collection name…"
          className="h-9 border-0 bg-transparent px-3 shadow-none focus-visible:ring-0"
        />
        <Button
          onClick={addCollection}
          disabled={!newName.trim()}
          size="sm"
          className="rounded-full"
        >
          <Plus className="mr-1 h-3.5 w-3.5" /> Create
        </Button>
      </div>

      {/* Main grid */}
      <div className="mt-10 grid gap-6 lg:grid-cols-[320px_1fr]">
        {/* Sidebar list */}
        <aside className="glass-card flex max-h-[600px] flex-col rounded-2xl p-4">
          <div className="mb-2 flex items-center justify-between px-1">
            <span className="text-[10px] font-semibold uppercase tracking-[0.16em] text-white/70">
              Collections
            </span>
            <span className="text-[11px] text-white/70">{collections.length}</span>
          </div>

          {collections.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center text-center">
              <div className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10">
                <FolderPlus className="h-5 w-5 text-white/60" strokeWidth={1.5} />
              </div>
              <p className="mt-3 max-w-[200px] text-xs text-white/70">
                Create your first collection above.
              </p>
            </div>
          ) : (
            <ul className="flex-1 space-y-1 overflow-y-auto pr-1">
              {collections.map((c) => {
                const isActive = c.id === activeId;
                const isRenaming = renamingId === c.id;
                return (
                  <li key={c.id}>
                    {isRenaming ? (
                      <div className="flex items-center gap-1 rounded-xl bg-white/15 p-1.5">
                        <Input
                          autoFocus
                          value={renameValue}
                          onChange={(e) => setRenameValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === "Enter") renameCollection(c.id);
                            if (e.key === "Escape") setRenamingId(null);
                          }}
                          className="h-7 border-0 bg-white/20 px-2 text-xs text-white placeholder:text-white/50 focus-visible:ring-1"
                        />
                        <button
                          onClick={() => renameCollection(c.id)}
                          className="text-[11px] font-medium text-white/90 hover:text-white"
                        >
                          Save
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setActiveId(c.id)}
                        className={cn(
                          "group/col flex w-full items-center justify-between gap-2 rounded-xl border px-3 py-2.5 text-left transition-all duration-150",
                          isActive
                            ? "border-white/30 bg-white/20"
                            : "border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10",
                        )}
                      >
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium">{c.name}</p>
                          <p className="text-[11px] text-white/60">
                            {c.quoteIds.length} quote{c.quoteIds.length === 1 ? "" : "s"}
                          </p>
                        </div>
                        <div className="flex items-center gap-0.5 opacity-0 transition-opacity group-hover/col:opacity-100">
                          <span
                            role="button"
                            tabIndex={0}
                            aria-label="Rename"
                            onClick={(e) => {
                              e.stopPropagation();
                              setRenamingId(c.id);
                              setRenameValue(c.name);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                e.stopPropagation();
                                setRenamingId(c.id);
                                setRenameValue(c.name);
                              }
                            }}
                            className="grid h-6 w-6 cursor-pointer place-items-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
                          >
                            <Pencil className="h-3 w-3" />
                          </span>
                          <span
                            role="button"
                            tabIndex={0}
                            aria-label="Delete"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeCollection(c.id);
                            }}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                e.preventDefault();
                                e.stopPropagation();
                                removeCollection(c.id);
                              }
                            }}
                            className="grid h-6 w-6 cursor-pointer place-items-center rounded-full text-white/70 hover:bg-destructive/30 hover:text-white"
                          >
                            <Trash2 className="h-3 w-3" />
                          </span>
                        </div>
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </aside>

        {/* Active collection */}
        <section className="min-h-[400px]">
          {!active ? (
            <div className="glass-card flex h-full flex-col items-center justify-center rounded-2xl p-10 text-center">
              <div className="grid h-14 w-14 place-items-center rounded-2xl bg-white/10">
                <FolderHeart className="h-6 w-6 text-white/70" strokeWidth={1.5} />
              </div>
              <p className="mt-4 font-display text-2xl">Nothing here yet</p>
              <p className="mt-2 max-w-sm text-sm text-white/70">
                Create a collection on the left, then add quotes to it from the Library or Discover pages.
              </p>
            </div>
          ) : (
            <>
              <div className="mb-4 flex items-baseline justify-between px-1">
                <h2 className="font-display text-3xl">{active.name}</h2>
                <span className="text-xs text-muted-foreground">
                  {activeQuotes.length} quote{activeQuotes.length === 1 ? "" : "s"}
                </span>
              </div>

              {activeQuotes.length === 0 ? (
                <div className="glass-card rounded-2xl p-10 text-center">
                  <p className="text-sm text-white/70">
                    This collection is empty. Open the{" "}
                    <span className="font-medium text-white">Library</span> and tap the folder icon to add quotes here.
                  </p>
                </div>
              ) : (
                <div className="grid gap-4 sm:grid-cols-2">
                  {activeQuotes.map((quote, i) => (
                    <article
                      key={quote.id}
                      className="glass-card group relative flex flex-col rounded-2xl p-6 lift animate-[fade-in_0.4s_ease-out]"
                      style={{ animationDelay: `${i * 30}ms` }}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <span className="rounded-full border border-white/20 bg-white/15 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-white/80">
                          {quote.category}
                        </span>
                        <button
                          onClick={() => removeFromCollection(active.id, quote.id)}
                          aria-label="Remove from collection"
                          className="grid h-7 w-7 place-items-center rounded-full text-white/60 transition-colors hover:bg-white/10 hover:text-white"
                        >
                          <X className="h-3.5 w-3.5" />
                        </button>
                      </div>
                      <p className="font-display mt-3 text-pretty text-xl leading-snug">
                        “{quote.text}”
                      </p>
                      <p className="mt-auto pt-4 text-xs font-medium text-white/70">
                        — {quote.author}
                      </p>
                    </article>
                  ))}
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </SiteShell>
  );
}