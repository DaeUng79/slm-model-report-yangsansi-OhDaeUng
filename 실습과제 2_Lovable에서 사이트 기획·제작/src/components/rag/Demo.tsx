import { useState, useRef, useEffect } from "react";
import { useServerFn } from "@tanstack/react-start";
import { Send, Sparkles, User, Database, Loader2, FileSearch } from "lucide-react";
import { askAudit } from "@/lib/audit.functions";
import { SectionHeader } from "./PipelineOverview";

type Source = { 기관: string; 제목: string; 개요: string; score: number };
type Message = {
  role: "user" | "assistant";
  content: string;
  sources?: Source[];
  loading?: boolean;
};

const SUGGESTIONS = [
  "청주시에서 발생한 시스템 구축 부적정 사례를 알려줘",
  "중소기업 직접생산확인 위반 사례는?",
  "공무원 징계 처분이 내려진 감사 사례는?",
  "경쟁입찰 관련 위반 사례를 요약해줘",
];

export function Demo() {
  const ask = useServerFn(askAudit);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "안녕하세요! 저는 정부합동감사 데이터베이스(1,520건)를 RAG로 검색하는 챗봇입니다. 궁금한 감사 사례를 한국어로 질문해 보세요.",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages]);

  async function send(question: string) {
    if (!question.trim() || loading) return;
    setInput("");
    setMessages((m) => [
      ...m,
      { role: "user", content: question },
      { role: "assistant", content: "관련 감사 자료를 검색하고 있어요…", loading: true },
    ]);
    setLoading(true);
    try {
      const result = await ask({ data: { question } });
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: result.answer,
          sources: result.sources,
        };
        return copy;
      });
    } catch (e: any) {
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = {
          role: "assistant",
          content: `오류가 발생했어요: ${e?.message ?? "알 수 없는 오류"}`,
        };
        return copy;
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="demo" className="py-24">
      <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
        <SectionHeader
          eyebrow="Live RAG Chatbot"
          title="정부합동감사 RAG 챗봇"
          desc="실제 정부합동감사 데이터베이스(1,520건)에서 관련 사례를 검색해 LLM이 답변을 생성합니다."
        />

        <div className="mt-12 glass-strong rounded-3xl overflow-hidden">
          {/* status bar */}
          <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3 text-xs">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <Database className="h-3.5 w-3.5 text-cyan-300" />
            <span className="text-muted-foreground">Connected · Vector DB</span>
            <span className="ml-auto text-muted-foreground">1,520 audit cases indexed</span>
          </div>

          {/* messages */}
          <div ref={scrollRef} className="h-[520px] overflow-y-auto px-4 py-6 sm:px-6 space-y-5">
            {messages.map((m, i) => (
              <MessageBubble key={i} m={m} />
            ))}
          </div>

          {/* suggestions */}
          {messages.length <= 1 && (
            <div className="border-t border-white/10 px-4 pt-4 pb-2 sm:px-6">
              <div className="mb-2 text-xs uppercase tracking-wider text-muted-foreground">추천 질문</div>
              <div className="flex flex-wrap gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => send(s)}
                    disabled={loading}
                    className="glass rounded-full px-3 py-1.5 text-xs hover:bg-white/10 transition disabled:opacity-50"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* input */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex items-center gap-2 border-t border-white/10 p-4 sm:p-5"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="감사 사례에 대해 질문해보세요…"
              disabled={loading}
              className="flex-1 rounded-xl bg-black/40 px-4 py-3 text-sm outline-none ring-1 ring-white/10 focus:ring-cyan-400/50 disabled:opacity-50"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="inline-flex items-center gap-2 rounded-xl gradient-bg px-4 py-3 text-sm font-medium text-white glow-sm disabled:opacity-40"
            >
              {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
              전송
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function MessageBubble({ m }: { m: Message }) {
  const isUser = m.role === "user";
  return (
    <div className={`flex gap-3 ${isUser ? "flex-row-reverse" : ""}`}>
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isUser ? "bg-white/10" : "gradient-bg glow-sm"
        }`}
      >
        {isUser ? <User className="h-4 w-4" /> : <Sparkles className="h-4 w-4 text-white" />}
      </div>
      <div className={`max-w-[85%] ${isUser ? "items-end" : "items-start"} flex flex-col gap-2`}>
        <div
          className={`rounded-2xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ${
            isUser ? "bg-white/10" : "glass gradient-border"
          }`}
        >
          {m.loading ? (
            <span className="inline-flex items-center gap-2 text-muted-foreground">
              <Loader2 className="h-3.5 w-3.5 animate-spin" />
              {m.content}
            </span>
          ) : (
            m.content
          )}
        </div>

        {m.sources && m.sources.length > 0 && (
          <div className="w-full space-y-2">
            <div className="flex items-center gap-1.5 text-[11px] uppercase tracking-wider text-cyan-300">
              <FileSearch className="h-3 w-3" /> 검색된 근거 자료 (Retrieved Chunks)
            </div>
            {m.sources.map((s, i) => (
              <div key={i} className="glass rounded-xl p-3 text-xs">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className="rounded-full bg-white/10 px-2 py-0.5 text-cyan-300 shrink-0">
                      #{i + 1}
                    </span>
                    <span className="truncate font-medium">{s.제목}</span>
                  </div>
                  <span className="shrink-0 rounded-full gradient-bg px-2 py-0.5 text-[10px] text-white">
                    {s.기관}
                  </span>
                </div>
                <p className="mt-1.5 text-muted-foreground line-clamp-3">{s.개요}…</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
