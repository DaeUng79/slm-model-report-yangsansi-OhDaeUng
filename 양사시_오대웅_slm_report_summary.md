# 양사시 오대웅 SLM 모델 조사 보고서 요약 (최신본)

이 문서는 `양사시_오대웅_slm_report.html`의 최신 입력 내용을 GitHub에서 빠르게 확인하기 위한 요약본입니다.

- 원본 HTML: [양사시_오대웅_slm_report.html](./양사시_오대웅_slm_report.html)
- 선택 모델: `gemma-3-4b`
- 모델 링크: https://huggingface.co/google/gemma-3-4b-it

## 1. 모델 선택 이유
정보화 부서 전산장비 관리자로서 기존 인프라(HP DL580 Gen9 5대, Rocky Linux 10)를 활용한 AX 기반 환경 조성 업무를 추진 중이며, 고가 GPU 도입이 어려운 상황에서 NVIDIA T4 16GB 기반 테스트와 Ollama API 챗봇 PoC를 성공적으로 수행했습니다. 이에 따라 현 서버 사양에 맞는 4B급 경량 모델 `gemma-3-4b`를 선정했습니다.

- 효율적 리소스: 낮은 자원으로도 전직원 대상 동시접속 10명 수준 확인
- 업무 적합성: 행정 문서 요약, 민원 초안 작성 등 텍스트 업무 활용 가능
- 기술 신뢰도: Google DeepMind Gemma 계열로 향후 모델 발전(gemma4 등)에 따른 업데이트 용이

## 2. 모델 기본 정보
- 모델명: `gemma-3-4b`
- 개발 주체: Google DeepMind (Google)
- 모델 규모: 4B (약 40억 파라미터급)
- 라이선스: Gemma 라이선스(사용 약관 동의형)
- 모델 유형: Instruction-tuned 멀티모달 모델 (Image-Text-to-Text, IT)

## 3. 학습 데이터와 튜닝 방식
Gemma 3 4B 모델은 약 4T 토큰 규모 데이터(웹 문서, 코드, 수학, 이미지)로 학습되었고 140개 이상 언어를 다루도록 구성되었습니다. 안전성과 품질 확보를 위한 필터링이 적용되었으며, IT 버전은 사전학습 후 지시 이행 성능 향상을 위한 후속 튜닝이 반영되었습니다. 세부 데이터셋 비율과 전 하이퍼파라미터는 공개 범위 제한이 있습니다.

## 4. 파라미터 및 구조적 특징
- Architecture: Gemma3ForConditionalGeneration (텍스트 디코더 + SigLIP 기반 비전 인코더)
- Context Length: 입력 최대 128K(131072), 출력 최대 8192
- Hidden Size: 텍스트 2560 / 비전 1152
- Layers: 텍스트 34 / 비전 27
- Attention Heads: 텍스트 8 / KV 4 (GQA), 비전 16
- Tokenizer: SentencePiece 계열, vocab 262,208

## 5. 모델 파일 구성 (상세)
`gemma-3-4b-it` 저장소는 "구조 + 가중치 + 토크나이저 + 전처리/생성 규칙"으로 구성됩니다.

- 구조/런타임: `config.json`, `generation_config.json`
- 가중치: `model-*.safetensors`, `model.safetensors.index.json`
- 토크나이저: `tokenizer.model`, `tokenizer.json`, `tokenizer_config.json`, `special_tokens_map.json`, `added_tokens.json`
- 멀티모달 전처리: `preprocessor_config.json`, `processor_config.json`, `chat_template.json`

운영 체크포인트: 파일 버전 불일치(예: config 최신 + tokenizer 구버전)는 품질 저하/로딩 오류를 유발할 수 있어, 모델 리비전 고정 및 체크섬 검증 절차가 필요합니다.

## 6. 활용 가능 업무
현재 내부정보를 인공지능이 관리·안내하는 "메모마인드" PoC를 진행 중입니다.

- 리눅스 서버 + Ollama Serve API 기반 운영
- 내부 자료 JSON 관리 및 RAG 방식 답변
- 관리자: 예산편성 요청자료/보고자료/사업현황 관리
- 실무자: 업무 메모 관리, 인사이동 시 인수인계 지원
- 내부정보 기반 AI 활용 서비스 확장

## 7. 한계와 주의사항
- 복합 추론/최신 사실성/도메인 초정밀 답변에서 상위 대형 모델 대비 한계
- 환각(hallucination) 가능성 존재로 활용 방식 교육 및 검수 체계 필요

## 8. 종합 의견
`gemma-3-4b` 같은 경량 모델 채택은 기존 서버 자원 극대화와 단계적 AI 서비스 확대를 동시에 달성할 수 있는 실용적 방안입니다. 예산 효율성과 현장 적용성을 함께 확보해 지방정부 AX 선도 사례로 발전할 가능성이 높습니다.

## 9. 참고 링크
- Hugging Face 모델 페이지: https://huggingface.co/google/gemma-3-4b-it
- Gemma 3 Technical Report: https://arxiv.org/abs/2503.19786
- Gemma 공식 문서: https://ai.google.dev/gemma
