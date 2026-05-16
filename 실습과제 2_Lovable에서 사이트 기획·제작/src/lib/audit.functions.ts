import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import auditData from "@/data/audit.json";

type AuditRecord = {
  기관: string;
  제목: string;
  개요: string;
  문제점: string;
  판단: string;
  조치: string;
  키워드: string;
};

const records = auditData as AuditRecord[];

function tokenize(s: string): string[] {
  return s
    .toLowerCase()
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .split(/\s+/)
    .filter((t) => t.length >= 2);
}

function retrieve(question: string, topK = 3) {
  const qTokens = tokenize(question);
  if (qTokens.length === 0) return [];

  const scored = records.map((r, i) => {
    const hay = `${r.제목} ${r.키워드} ${r.기관} ${r.개요} ${r.문제점}`.toLowerCase();
    let score = 0;
    for (const t of qTokens) {
      // count occurrences (cap to avoid runaway)
      let idx = 0;
      let c = 0;
      while ((idx = hay.indexOf(t, idx)) !== -1 && c < 5) {
        c++;
        idx += t.length;
      }
      // weight title/keywords higher
      const titleHits = (r.제목 + " " + r.키워드).toLowerCase().split(t).length - 1;
      score += c + titleHits * 3;
    }
    return { i, score, r };
  });

  return scored
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, topK);
}

export const askAudit = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) =>
    z.object({ question: z.string().min(1).max(500) }).parse(input),
  )
  .handler(async ({ data }) => {
    const hits = retrieve(data.question, 3);

    const sources = hits.map(({ r, score }) => ({
      기관: r.기관,
      제목: r.제목,
      개요: r.개요.slice(0, 220),
      score,
    }));

    if (hits.length === 0) {
      return {
        answer:
          "관련된 감사 사례를 찾지 못했어요. 다른 키워드(예: '청주시 IoT', '징계', '경쟁입찰')로 다시 질문해 주세요.",
        sources,
        chunks: [],
      };
    }

    const context = hits
      .map(
        ({ r }, idx) =>
          `[자료 ${idx + 1}] 피감기관: ${r.기관}\n제목: ${r.제목}\n키워드: ${r.키워드}\n개요: ${r.개요}\n확인된 문제점: ${r.문제점}\n판단: ${r.판단}\n조치할 사항: ${r.조치}`,
      )
      .join("\n\n---\n\n");

    const apiKey = process.env.LOVABLE_API_KEY;
    if (!apiKey) {
      return {
        answer:
          "AI 게이트웨이가 구성되지 않아 RAG 답변을 생성할 수 없어요. 아래 검색된 자료를 참고하세요.",
        sources,
        chunks: hits.map((h) => h.r),
      };
    }

    const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content:
              "당신은 한국 정부합동감사 데이터베이스에 기반해 답변하는 RAG 챗봇입니다. 반드시 제공된 [자료]만 근거로 한국어로 답변하세요. 자료에 없는 내용은 추측하지 말고 '자료에 명시되지 않았습니다'라고 답하세요. 답변은 3~6문장으로 간결하게, 핵심 사례·기관·조치를 포함해 작성하세요.",
          },
          {
            role: "user",
            content: `다음은 사용자의 질문과 관련된 감사 자료입니다:\n\n${context}\n\n질문: ${data.question}\n\n위 자료를 바탕으로 답변하세요.`,
          },
        ],
      }),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => "");
      return {
        answer: `AI 응답 실패 (${res.status}). 검색된 자료만 표시합니다.`,
        sources,
        chunks: hits.map((h) => h.r),
        debug: errText.slice(0, 200),
      };
    }

    const json: any = await res.json();
    const answer: string =
      json?.choices?.[0]?.message?.content ?? "응답을 생성하지 못했습니다.";

    return { answer, sources, chunks: hits.map((h) => h.r) };
  });
