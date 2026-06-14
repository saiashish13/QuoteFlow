export interface Collection {
  id: string;
  name: string;
  quoteIds: string[];
  createdAt: number;
}

export const COLLECTIONS_KEY = "qg:collections";

export function loadCollections(): Collection[] {
  try {
    const raw = localStorage.getItem(COLLECTIONS_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function saveCollections(cols: Collection[]) {
  try {
    localStorage.setItem(COLLECTIONS_KEY, JSON.stringify(cols));
  } catch {}
}

export function createCollection(name: string): Collection {
  return {
    id: `c_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 7)}`,
    name: name.trim() || "Untitled",
    quoteIds: [],
    createdAt: Date.now(),
  };
}