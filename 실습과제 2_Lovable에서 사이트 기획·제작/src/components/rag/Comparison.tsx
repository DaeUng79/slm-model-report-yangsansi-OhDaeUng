import { Check, X, Bot, Sparkles } from "lucide-react";
import { SectionHeader } from "./PipelineOverview";

const rows = [
  { label: "외부 문서 활용", llm: "어려움", rag: "가능" },
  { label: "최신 정보 반영", llm: "제한적", rag: "가능" },
  { label: "답변 근거 제공", llm: "제한적", rag: "가능" },
  { label: "사내 문서 검색", llm: "어려움", rag: "가능" },
];

export function Comparison() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Comparison" title="일반 LLM vs RAG 기반 답변" desc="외부 지식이 답변 품질에 어떤 차이를 만드는지 비교해 보세요." />
        <div className="mt-12 grid gap-6 lg:grid-cols-2">
          <div className="glass rounded-3xl p-6">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl bg-white/10"><Bot className="h-5 w-5" /></div>
              <h3 className="text-lg font-semibold">일반 LLM 답변</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              "RAG는 일반적으로 검색 기반 생성을 의미하는 것 같습니다. 자세한 정보는 학습된 시점까지의 데이터에 기반하므로, 최신 또는 사내 문서에 대한 정확한 답변은 어려울 수 있습니다."
            </p>
            <span className="mt-4 inline-block rounded-full bg-white/5 px-3 py-1 text-xs text-muted-foreground">근거 없음 · 일반화된 답변</span>
          </div>
          <div className="glass gradient-border rounded-3xl p-6 glow-sm">
            <div className="flex items-center gap-3">
              <div className="grid h-10 w-10 place-items-center rounded-xl gradient-bg"><Sparkles className="h-5 w-5 text-white" /></div>
              <h3 className="text-lg font-semibold">RAG 기반 답변</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed">
              "RAG는 외부 문서를 검색해 LLM에 컨텍스트로 제공함으로써, 최신 정보와 사내 데이터를 반영한 근거 있는 답변을 생성합니다. 검색된 청크 ID와 함께 출처를 제공할 수 있어 신뢰도가 높습니다."
            </p>
            <span className="mt-4 inline-block rounded-full gradient-bg px-3 py-1 text-xs text-white">출처 포함 · 최신 데이터 반영</span>
          </div>
        </div>

        <div className="mt-10 glass overflow-hidden rounded-3xl">
          <table className="w-full text-left text-sm">
            <thead className="bg-white/5 text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-6 py-4">항목</th>
                <th className="px-6 py-4">일반 LLM</th>
                <th className="px-6 py-4">RAG</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {rows.map((r) => (
                <tr key={r.label} className="transition-colors hover:bg-white/5">
                  <td className="px-6 py-4 font-medium">{r.label}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2 text-muted-foreground"><X className="h-4 w-4 text-rose-400" /> {r.llm}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-2"><Check className="h-4 w-4 text-emerald-400" /> {r.rag}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
