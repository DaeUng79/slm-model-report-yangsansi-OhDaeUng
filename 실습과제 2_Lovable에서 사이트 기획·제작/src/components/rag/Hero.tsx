import { ArrowRight, PlayCircle } from "lucide-react";
import { PipelineFlow } from "./PipelineFlow";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="absolute inset-0 grid-bg opacity-40" />
      <div className="absolute -top-32 left-1/2 h-96 w-[800px] -translate-x-1/2 rounded-full bg-indigo-500/20 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32">
        <div className="mx-auto max-w-3xl text-center animate-fade-up">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3 py-1 text-xs text-cyan-300">
            <span className="h-1.5 w-1.5 rounded-full bg-cyan-400 animate-pulse-dot" />
            Retrieval-Augmented Generation
          </span>
          <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-6xl">
            <span className="gradient-text">RAG Pipeline</span>을<br className="hidden sm:block" /> 한눈에 이해하기
          </h1>
          <p className="mt-6 text-base text-muted-foreground sm:text-lg">
            문서에서 필요한 지식을 검색하고, LLM이 더 정확한 답변을 생성하는<br className="hidden sm:block" /> 과정을 시각적으로 살펴보세요.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#pipeline" className="group inline-flex items-center gap-2 rounded-full gradient-bg px-6 py-3 text-sm font-semibold text-white glow transition-transform hover:scale-105">
              파이프라인 보기
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>
            <a href="#demo" className="inline-flex items-center gap-2 rounded-full glass-strong px-6 py-3 text-sm font-semibold transition-colors hover:bg-white/10">
              <PlayCircle className="h-4 w-4 text-cyan-300" />
              예제로 이해하기
            </a>
          </div>
        </div>
        <div className="mt-16 animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <PipelineFlow />
        </div>
      </div>
    </section>
  );
}
