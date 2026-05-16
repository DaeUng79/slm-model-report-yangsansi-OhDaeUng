import { Scissors, Brain, Database, Search, MessageSquare, RotateCcw, PlayCircle } from "lucide-react";
import { SectionHeader } from "./PipelineOverview";

const items = [
  { icon: Scissors, text: "문서를 작은 청크로 나눈다." },
  { icon: Brain, text: "각 청크를 임베딩 벡터로 변환한다." },
  { icon: Database, text: "벡터를 벡터DB에 저장한다." },
  { icon: Search, text: "사용자 질문도 벡터로 변환해 유사한 청크를 찾는다." },
  { icon: MessageSquare, text: "검색된 청크를 LLM에 전달해 답변을 생성한다." },
];

export function Summary() {
  return (
    <section id="summary" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Summary" title="RAG 핵심 5단계 요약" desc="기억해야 할 다섯 가지 핵심 단계입니다." />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {items.map((it, i) => (
            <div key={i} className="glass gradient-border rounded-2xl p-5 transition-transform hover:-translate-y-1">
              <div className="flex items-center justify-between">
                <div className="grid h-10 w-10 place-items-center rounded-xl gradient-bg glow-sm">
                  <it.icon className="h-5 w-5 text-white" />
                </div>
                <span className="text-3xl font-bold gradient-text">0{i + 1}</span>
              </div>
              <p className="mt-4 text-sm leading-relaxed">{it.text}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 glass-strong rounded-3xl p-10 text-center">
          <h3 className="text-2xl font-bold sm:text-3xl">이제 RAG의 흐름이 머릿속에 그려지나요?</h3>
          <p className="mt-3 text-muted-foreground">처음부터 다시 보거나, 인터랙티브 데모를 다시 실행해 보세요.</p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#top" className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10">
              <RotateCcw className="h-4 w-4" /> 처음부터 다시 보기
            </a>
            <a href="#demo" className="inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-semibold text-white glow transition-transform hover:scale-105">
              <PlayCircle className="h-4 w-4" /> RAG 데모 실행하기
            </a>
          </div>
        </div>

        <footer className="mt-16 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 text-xs text-muted-foreground sm:flex-row">
          <span>© RAG Pipeline Visualizer · 학습용 데모</span>
          <span className="gradient-text font-semibold">Built with React · TypeScript · Tailwind</span>
        </footer>
      </div>
    </section>
  );
}
