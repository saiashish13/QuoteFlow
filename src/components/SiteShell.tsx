import { useEffect, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";

const THEME_KEY = "qg:theme";

const NAV = [
  { label: "Discover", to: "/" as const },
  { label: "Library", to: "/library" as const },
  { label: "Collections", to: "/collections" as const },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    try {
      const stored = localStorage.getItem(THEME_KEY);
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const isDark = stored ? stored === "dark" : prefersDark;
      setDark(isDark);
      document.documentElement.classList.toggle("dark", isDark);
    } catch {}
  }, []);

  const toggleTheme = () => {
    const next = !dark;
    setDark(next);
    document.documentElement.classList.toggle("dark", next);
    try { localStorage.setItem(THEME_KEY, next ? "dark" : "light"); } catch {}
  };

  return (
    <main className="relative min-h-screen">
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-32 left-1/4 h-[28rem] w-[28rem] rounded-full bg-primary/15 blur-3xl animate-[fade-in_1.2s_ease-out]" />
        <div className="absolute bottom-0 right-0 h-[24rem] w-[24rem] rounded-full bg-[oklch(0.7_0.18_220)]/15 blur-3xl" />
        <div className="absolute top-1/2 left-0 h-[18rem] w-[18rem] rounded-full bg-[oklch(0.8_0.15_320)]/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-40 border-b border-border/40 backdrop-blur-xl bg-background/60">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-3.5 sm:px-8">
          <Link to="/" className="group/logo flex items-center relative">
            <div className="transition-all duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/logo:scale-[1.04] group-hover/logo:-translate-y-0.5 group-hover/logo:drop-shadow-[0_0_18px_rgba(0,242,254,0.55)] active:scale-[0.97] active:drop-shadow-none active:translate-y-0">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 120" width="160" height="40" className="transition-transform duration-300">
                <defs>
                  <linearGradient id="prismGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F2FE" />
                    <stop offset="100%" stopColor="#4FACFE" />
                  </linearGradient>
                  <linearGradient id="prismGradLight" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00F2FE" stopOpacity="0.4" />
                    <stop offset="100%" stopColor="#4FACFE" stopOpacity="0.4" />
                  </linearGradient>
                </defs>
                <rect width="500" height="120" rx="24" fill="#0D0D0E" stroke="url(#prismGradLight)" strokeWidth="2" opacity="0.92"/>
                <g transform="translate(20, 20)">
                  <rect width="80" height="80" rx="22" fill="#1C1C1E" stroke="#2C2C2E" strokeWidth="1.5"/>
                  <path d="M32,45 C32,33 42,28 52,28 L52,38 C46,38 43,41 43,45 L50,45 L50,58 L32,58 Z" fill="none" stroke="url(#prismGrad)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="56" y1="32" x2="62" y2="26" stroke="url(#prismGrad)" strokeWidth="2.5" strokeLinecap="round" />
                  <line x1="56" y1="44" x2="64" y2="44" stroke="url(#prismGrad)" strokeWidth="2.5" strokeLinecap="round" opacity="0.5" />
                </g>
                <text x="125" y="62" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" fontSize="32" fontWeight="800" fill="#FFFFFF" letterSpacing="-0.01em">LUMEN</text>
                <text x="238" y="62" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Segoe UI', sans-serif" fontSize="32" fontWeight="300" fill="#A1A1AA" letterSpacing="-0.01em">QUOTES</text>
                <text x="127" y="84" fontFamily="-apple-system, BlinkMacSystemFont, 'SF Pro Text', 'Segoe UI', sans-serif" fontSize="10" fontWeight="500" fill="#00F2FE" letterSpacing="0.4em">MINIMAL DESIGN ENGINE</text>
              </svg>
            </div>
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            {NAV.map((item) => {
              const active = pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={cn(
                    "relative rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors",
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground",
                  )}
                >
                  {item.label}
                  {active && (
                    <span className="absolute inset-x-3 -bottom-px h-px bg-linear-to-r from-transparent via-primary to-transparent" />
                  )}
                </Link>
              );
            })}
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
        {/* Mobile nav */}
        <nav className="flex items-center justify-center gap-1 border-t border-border/40 px-5 py-2 sm:hidden">
          {NAV.map((item) => {
            const active = pathname === item.to;
            return (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "rounded-full px-3 py-1 text-xs font-medium",
                  active ? "bg-foreground text-background" : "text-muted-foreground",
                )}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>

      <div className="mx-auto max-w-6xl px-5 pb-20 pt-10 sm:px-8 sm:pt-16">
        {children}
      </div>

      <Toaster />
    </main>
  );
}