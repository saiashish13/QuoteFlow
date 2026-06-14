import { createFileRoute } from "@tanstack/react-router";
import { QuoteGenerator } from "@/components/QuoteGenerator";
import { SiteShell } from "@/components/SiteShell";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen Quotes — Daily Inspiration" },
      { name: "description", content: "A beautifully simple random quote generator. Get fresh inspiration on demand with curated quotes across motivation, wisdom, life and more." },
      { property: "og:title", content: "Lumen Quotes — Daily Inspiration" },
      { property: "og:description", content: "A beautifully simple random quote generator. Get fresh inspiration on demand." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <SiteShell>
      <QuoteGenerator />
    </SiteShell>
  );
}
