import { Sparkles } from "lucide-react";

const nav = [
  { label: "Overview", href: "#overview" },
  { label: "Pipeline", href: "#pipeline" },
  { label: "Demo AI RAG", href: "#demo" },
  { label: "Summary", href: "#summary" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#020617]/70 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2">
          <span className="grid h-8 w-8 place-items-center rounded-lg gradient-bg glow-sm">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <span className="font-semibold tracking-tight">
            RAG <span className="gradient-text">Visualizer</span>
          </span>
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {nav.map((n) => (
            <a key={n.href} href={n.href} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
              {n.label}
            </a>
          ))}
        </nav>
        <a href="#demo" className="rounded-full gradient-bg px-4 py-2 text-xs font-medium text-white glow-sm transition-transform hover:scale-105">
          데모 실행
        </a>
      </div>
    </header>
  );
}
