import { FileText, Scissors, Brain, Database, Search, MessageSquare } from "lucide-react";

const steps = [
  { icon: FileText, label: "Document" },
  { icon: Scissors, label: "Chunk" },
  { icon: Brain, label: "Embedding" },
  { icon: Database, label: "Vector DB" },
  { icon: Search, label: "Search" },
  { icon: MessageSquare, label: "LLM Answer" },
];

export function PipelineFlow() {
  return (
    <div className="glass rounded-2xl p-4 sm:p-6">
      <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
        {steps.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2 sm:gap-3">
            <div className="flex flex-col items-center gap-2">
              <div className="grid h-12 w-12 place-items-center rounded-xl glass-strong glow-sm animate-float" style={{ animationDelay: `${i * 0.2}s` }}>
                <s.icon className="h-5 w-5 text-cyan-300" />
              </div>
              <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{s.label}</span>
            </div>
            {i < steps.length - 1 && (
              <svg width="32" height="20" viewBox="0 0 32 20" className="arrow-glow">
                <line x1="0" y1="10" x2="26" y2="10" stroke="url(#g)" strokeWidth="2" className="animate-flow" />
                <polygon points="26,4 32,10 26,16" fill="#22d3ee" />
                <defs>
                  <linearGradient id="g" x1="0" x2="1">
                    <stop offset="0" stopColor="#6366f1" />
                    <stop offset="1" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
