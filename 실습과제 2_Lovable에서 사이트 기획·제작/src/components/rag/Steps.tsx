import { FileText, Scissors, Brain, Database, Search, MessageSquare, ArrowRight, Sparkles } from "lucide-react";
import { SectionHeader } from "./PipelineOverview";

function StepBadge({ n, title }: { n: number; title: string }) {
  return (
    <div className="flex items-center gap-3">
      <div className="grid h-10 w-10 place-items-center rounded-full gradient-bg text-sm font-bold text-white glow-sm">{n}</div>
      <h3 className="text-2xl font-semibold tracking-tight">{title}</h3>
    </div>
  );
}

function ChunkCard({ id, text }: { id: string; text: string }) {
  return (
    <div className="glass rounded-xl p-3 text-xs">
      <div className="mb-1 flex items-center justify-between">
        <span className="text-[10px] text-cyan-300">{id}</span>
        <Scissors className="h-3 w-3 text-muted-foreground" />
      </div>
      <p className="text-muted-foreground">{text}</p>
    </div>
  );
}

function VectorPill({ values }: { values: string }) {
  return (
    <code className="block rounded-lg bg-black/40 px-3 py-2 font-mono text-[11px] text-cyan-300">
      [{values}]
    </code>
  );
}

export function Steps() {
  return (
    <section id="pipeline" className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <SectionHeader eyebrow="Step by Step" title="단계별로 살펴보는 RAG" desc="각 단계가 어떻게 연결되어 정확한 답변을 만드는지 확인해 보세요." />

        {/* Step 1 */}
        <div className="mt-16 glass-strong rounded-3xl p-6 sm:p-10">
          <StepBadge n={1} title="문서를 청크 단위로 분할" />
          <p className="mt-3 text-muted-foreground">긴 문서는 50~100단어 단위의 작은 청크로 나누고, Overlap을 적용해 문맥이 끊기지 않도록 합니다.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto_2fr] lg:items-center">
            <div className="glass rounded-2xl p-5">
              <div className="mb-3 flex items-center gap-2 text-xs text-cyan-300"><FileText className="h-4 w-4" /> Original Document</div>
              <p className="text-sm leading-relaxed text-muted-foreground">
                RAG는 외부 지식을 활용해 LLM의 답변 정확도를 높이는 기술입니다. 긴 문서를 그대로 전달하면 모델의 컨텍스트 한계를 초과하므로, 의미 단위로 분할하여 필요한 부분만 검색합니다. 문맥 단절을 방지하기 위해 Overlap을 적용하기도 합니다...
              </p>
            </div>
            <ArrowRight className="hidden h-6 w-6 mx-auto text-cyan-400 arrow-glow lg:block" />
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
              <ChunkCard id="chunk_001" text="RAG는 외부 지식을 활용해 LLM의 답변 정확도를..." />
              <ChunkCard id="chunk_002" text="긴 문서를 그대로 전달하면 모델의 컨텍스트 한계를..." />
              <ChunkCard id="chunk_003" text="의미 단위로 분할하여 필요한 부분만 검색합니다..." />
              <ChunkCard id="chunk_004" text="문맥 단절을 방지하기 위해 Overlap을 적용..." />
              <ChunkCard id="chunk_005" text="청크의 크기는 사용 사례에 따라 조정할 수 있으며..." />
              <ChunkCard id="chunk_006" text="작은 청크는 정밀도를, 큰 청크는 문맥성을 높입니다..." />
            </div>
          </div>
          <div className="mt-6 flex flex-wrap gap-2">
            <span className="rounded-full glass px-3 py-1 text-xs text-cyan-300">Chunk Size: 50~100 words</span>
            <span className="rounded-full glass px-3 py-1 text-xs text-indigo-300">Overlap: 문맥 유지</span>
          </div>
        </div>

        {/* Step 2 */}
        <div className="mt-10 glass-strong rounded-3xl p-6 sm:p-10">
          <StepBadge n={2} title="청크를 임베딩 벡터로 변환" />
          <p className="mt-3 text-muted-foreground">임베딩 모델은 각 청크의 의미를 수백~수천 차원의 벡터로 변환합니다. 의미가 비슷한 청크는 벡터 공간에서 가깝게 위치합니다.</p>
          <div className="mt-8 grid items-center gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
            <ChunkCard id="chunk_001" text="RAG는 외부 지식을 활용해 LLM의 답변 정확도를 높이는..." />
            <ArrowRight className="hidden h-6 w-6 mx-auto text-cyan-400 arrow-glow lg:block" />
            <div className="glass gradient-border rounded-2xl p-5 text-center">
              <Brain className="mx-auto h-8 w-8 text-cyan-300" />
              <div className="mt-2 text-sm font-semibold">Embedding Model</div>
              <div className="text-xs text-muted-foreground">text-embedding-3-small</div>
            </div>
            <ArrowRight className="hidden h-6 w-6 mx-auto text-cyan-400 arrow-glow lg:block" />
            <div className="glass rounded-2xl p-4">
              <div className="mb-2 text-xs text-cyan-300">Vector (1536-d)</div>
              <VectorPill values="0.12, -0.45, 0.88, 0.31, -0.07, 0.62, ..." />
            </div>
          </div>
        </div>

        {/* Step 3 */}
        <div className="mt-10 glass-strong rounded-3xl p-6 sm:p-10">
          <StepBadge n={3} title="벡터DB에 저장" />
          <p className="mt-3 text-muted-foreground">변환된 벡터는 Vector Database에 색인되어 빠른 유사도 검색의 기반이 됩니다.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-[auto_1fr] lg:items-center">
            <div className="glass gradient-border rounded-2xl p-6 text-center">
              <Database className="mx-auto h-10 w-10 text-cyan-300" />
              <div className="mt-2 font-semibold">Vector DB</div>
              <div className="text-xs text-muted-foreground">Pinecone · Weaviate · Chroma</div>
            </div>
            <div className="glass overflow-hidden rounded-2xl">
              <table className="w-full text-left text-sm">
                <thead className="bg-white/5 text-xs uppercase tracking-wider text-muted-foreground">
                  <tr>
                    <th className="px-4 py-3">Chunk ID</th>
                    <th className="px-4 py-3">Text Preview</th>
                    <th className="px-4 py-3">Vector</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {[
                    ["chunk_001", "RAG는 외부 지식을...", "[0.12, -0.45, ...]"],
                    ["chunk_002", "LLM의 답변 정확도를...", "[0.22, 0.09, ...]"],
                    ["chunk_003", "문맥 단절을 방지하기...", "[-0.31, 0.74, ...]"],
                  ].map((r) => (
                    <tr key={r[0]} className="transition-colors hover:bg-white/5">
                      <td className="px-4 py-3 text-cyan-300">{r[0]}</td>
                      <td className="px-4 py-3 text-muted-foreground">{r[1]}</td>
                      <td className="px-4 py-3 font-mono text-xs text-indigo-300">{r[2]}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Step 4 */}
        <div className="mt-10 glass-strong rounded-3xl p-6 sm:p-10">
          <StepBadge n={4} title="사용자 질문 임베딩 및 유사도 검색" />
          <p className="mt-3 text-muted-foreground">청크와 동일한 임베딩 모델로 질문을 벡터화한 뒤, 코사인 유사도로 가장 가까운 청크를 찾습니다.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto_1fr]">
            <div className="space-y-3">
              <div className="glass rounded-2xl p-4">
                <div className="mb-2 flex items-center gap-2 text-xs text-cyan-300"><Search className="h-3 w-3" /> Question</div>
                <p className="text-sm">"RAG에서 청크를 나누는 이유는 무엇인가요?"</p>
              </div>
              <div className="glass rounded-2xl p-4">
                <div className="mb-2 text-xs text-indigo-300">Question Vector</div>
                <VectorPill values="0.15, -0.41, 0.91, 0.28, -0.05, 0.59, ..." />
              </div>
            </div>
            <div className="hidden flex-col items-center justify-center lg:flex">
              <Search className="h-8 w-8 text-cyan-400 arrow-glow animate-float" />
              <div className="mt-2 text-xs text-muted-foreground">Cosine Similarity</div>
            </div>
            <div className="space-y-3">
              {[
                { rank: 1, id: "chunk_001", sim: 94, text: "RAG는 외부 지식을 활용해 LLM의 답변 정확도를 높이며..." },
                { rank: 2, id: "chunk_004", sim: 89, text: "긴 문서를 작은 단위로 나누면 필요한 부분만 정확히 검색..." },
              ].map((r) => (
                <div key={r.id} className="glass gradient-border rounded-2xl p-4">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-cyan-300">Top {r.rank} · {r.id}</span>
                    <span className="rounded-full gradient-bg px-2 py-0.5 text-white">유사도 {r.sim}%</span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Step 5 */}
        <div className="mt-10 glass-strong rounded-3xl p-6 sm:p-10">
          <StepBadge n={5} title="LLM 응답 생성" />
          <p className="mt-3 text-muted-foreground">검색된 청크가 컨텍스트로 LLM에 전달되어, 근거 있는 최종 답변을 생성합니다.</p>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1fr_auto_1fr_auto_1fr] lg:items-center">
            <div className="space-y-2">
              <ChunkCard id="chunk_001 · 94%" text="RAG는 외부 지식을 활용해 LLM의 답변 정확도를..." />
              <ChunkCard id="chunk_004 · 89%" text="긴 문서를 작은 단위로 나누면 필요한 부분만..." />
            </div>
            <ArrowRight className="hidden h-6 w-6 mx-auto text-cyan-400 arrow-glow lg:block" />
            <div className="glass gradient-border rounded-2xl p-6 text-center">
              <Sparkles className="mx-auto h-8 w-8 text-cyan-300" />
              <div className="mt-2 font-semibold">LLM</div>
              <div className="text-xs text-muted-foreground">GPT-4 · Claude · Gemini</div>
            </div>
            <ArrowRight className="hidden h-6 w-6 mx-auto text-cyan-400 arrow-glow lg:block" />
            <div className="glass gradient-border rounded-2xl p-5">
              <div className="mb-2 flex items-center gap-2 text-xs text-cyan-300"><MessageSquare className="h-3 w-3" /> Final Answer</div>
              <p className="text-sm leading-relaxed">
                RAG에서 청크를 나누는 이유는 긴 문서를 작은 단위로 나누어 검색 정확도를 높이고, 필요한 정보만 LLM에 전달하기 위해서입니다. 또한 Overlap을 적용하면 문맥 단절을 줄일 수 있습니다.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
