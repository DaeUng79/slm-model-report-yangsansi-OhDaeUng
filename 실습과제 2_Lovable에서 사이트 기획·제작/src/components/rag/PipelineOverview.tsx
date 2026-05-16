import { FileText, Scissors, Brain, Database, MessageSquare, ArrowRight } from "lucide-react";

const cards = [
  { icon: FileText, title: "문서 입력", desc: "PDF, 텍스트, 웹페이지 등 외부 지식 문서를 시스템에 업로드합니다." },
  { icon: Scissors, title: "청크 분할", desc: "긴 문서를 의미 단위의 작은 조각(Chunk)으로 나누어 검색 정확도를 높입니다." },
  { icon: Brain, title: "임베딩 변환", desc: "각 청크를 임베딩 모델로 통과시켜 의미를 담은 벡터로 변환합니다." },
  { icon: Database, title: "벡터DB 저장", desc: "변환된 벡터를 Vector Database에 저장해 빠른 유사도 검색을 가능하게 합니다." },
  { icon: MessageSquare, title: "검색 후 답변 생성", desc: "질문과 유사한 청크를 검색하여 LLM에 전달, 정확한 답변을 생성합니다." },
];

export function PipelineOverview() {
  return (
    <section id="overview" className="relative py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Overview" title="RAG 파이프라인 한눈에 보기" desc="다섯 단계를 거쳐 LLM은 외부 지식을 활용한 답변을 만들어냅니다." />
        <div className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-5">
          {cards.map((c, i) => (
            <div key={c.title} className="relative">
              <div className="glass gradient-border h-full rounded-2xl p-5 transition-transform hover:-translate-y-1">
                <div className="grid h-10 w-10 place-items-center rounded-lg gradient-bg glow-sm">
                  <c.icon className="h-5 w-5 text-white" />
                </div>
                <div className="mt-4 text-xs text-cyan-300">STEP 0{i + 1}</div>
                <h3 className="mt-1 text-lg font-semibold">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{c.desc}</p>
              </div>
              {i < cards.length - 1 && (
                <ArrowRight className="absolute -right-3 top-1/2 hidden h-5 w-5 -translate-y-1/2 text-cyan-400 arrow-glow lg:block" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SectionHeader({ eyebrow, title, desc }: { eyebrow: string; title: string; desc?: string }) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <span className="text-xs font-medium uppercase tracking-[0.2em] text-cyan-300">{eyebrow}</span>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h2>
      {desc && <p className="mt-4 text-muted-foreground">{desc}</p>}
    </div>
  );
}
