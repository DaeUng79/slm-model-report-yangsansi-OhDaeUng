import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/rag/Header";
import { Hero } from "@/components/rag/Hero";
import { PipelineOverview } from "@/components/rag/PipelineOverview";
import { Steps } from "@/components/rag/Steps";
import { Demo } from "@/components/rag/Demo";
import { VectorSpace } from "@/components/rag/VectorSpace";
import { Comparison } from "@/components/rag/Comparison";
import { Summary } from "@/components/rag/Summary";

export const Route = createFileRoute("/")({
  component: Index,
  head: () => ({
    meta: [
      { title: "RAG Pipeline Visualizer · RAG 파이프라인을 한눈에" },
      { name: "description", content: "문서에서 지식을 검색하고 LLM이 더 정확한 답변을 생성하는 RAG 파이프라인을 시각적으로 학습하세요." },
      { property: "og:title", content: "RAG Pipeline Visualizer" },
      { property: "og:description", content: "RAG 파이프라인을 시각화한 한국어 학습용 인터랙티브 가이드" },
    ],
  }),
});

function Index() {
  return (
    <div className="dark min-h-screen">
      <Header />
      <main>
        <Hero />
        <PipelineOverview />
        <Steps />
        <Demo />
        <VectorSpace />
        <Comparison />
        <Summary />
      </main>
    </div>
  );
}
