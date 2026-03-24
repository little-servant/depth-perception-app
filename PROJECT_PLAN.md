# 지각심리학 체험형 웹앱 프로젝트 기획서

> **과목**: 지각심리학
> **과제**: 인지/지각과 심리학 관련 콘텐츠를 바이브 코딩으로 앱 형태로 제작
> **평가 기준**: 창의성, 독창성 위주
> **제출 기한**: 2026년 6월 중순
> **작성일**: 2026-03-21

---

## 1. 프로젝트 개요

### 핵심 컨셉: "Depth Lab — 깊이를 해부하다"

**한 줄 요약**: 평면 화면에서 3D를 느끼는 이유를 직접 체험하고, 깊이 단서를 하나씩 꺼보며 지각이 무너지는 순간을 경험하는 인터랙티브 웹앱

**왜 이 주제인가?**
- 깊이 지각은 착시/색채보다 학생 프로젝트에서 희소성이 높음
- 인스타 릴스의 2.5D 패럴랙스, Apple Spatial Scenes 등 대중적 관심과 직결
- "깊이 단서를 개별 토글하여 분리 체험하는 웹 기반 교육용 인터랙티브 앱"은 **기존에 존재하지 않는 것으로 조사됨** (단, 실험실용 연구 소프트웨어에서는 깊이 단서를 개별 조작하는 실험 패러다임이 존재함 — e.g., IJsselsteijn et al., 2006)
- 스마트폰 자이로스코프만으로 motion parallax를 체험할 수 있어 접근성 높음

### 차별화 포인트

| 기존 | 이 프로젝트 |
|------|------------|
| 깊이 단서를 텍스트/영상으로 "설명" | 각 단서를 **토글 on/off**하며 지각 변화를 직접 체험 |
| 정적인 착시 이미지 제시 | **3D 장면에서 실시간 조작** |
| 결과 없이 체험만 제공 | **POE(예측→관찰→설명) 흐름 + 개인 데이터 시각화** |
| 데스크톱 전용 | **모바일 자이로센서 활용** — 폰을 기울여 체험 |

---

## 2. 주제 후보 비교 분석

4개 연구 에이전트의 병렬 조사 결과를 종합한 상위 후보:

### A. 깊이 지각 — "Depth Lab" (최종 추천)

| 항목 | 평가 |
|------|------|
| 학술적 깊이 | 9/10 — Cutting & Vishton(1995), IJsselsteijn(2006) 등 풍부한 연구 기반 |
| 웹 구현 가능성 | 8/10 — Three.js + DeviceOrientation API로 핵심 구현 가능 |
| 와우 팩터 | 9/10 — 단서를 끄면 3D가 납작해지는 순간이 극적 |
| 독창성 | 10/10 — 개별 단서 토글 체험 앱은 조사 범위 내 미발견 |
| **총점** | **36/40** |

### B. 시간 지각 — Oddball Paradigm

| 항목 | 평가 |
|------|------|
| 학술적 깊이 | 9/10 — Tse et al.(2004), Pariyadath & Eagleman(2007) |
| 웹 구현 가능성 | 9/10 — jsPsych으로 이미 검증된 구현 존재 |
| 와우 팩터 | 8/10 — "같은 시간이 다르게 느껴진다"는 체험 |
| 독창성 | 9/10 — 학생 프로젝트로 거의 없음 |
| **총점** | **35/40** |

### C. 생물학적 운동 — Point-Light Walker

| 항목 | 평가 |
|------|------|
| 학술적 깊이 | 9/10 — Johansson(1973) 이후 50년 연구 |
| 웹 구현 가능성 | 8/10 — Canvas/WebGL + MediaPipe Pose |
| 와우 팩터 | 9/10 — 점 12개로 인간을 인식하는 놀라움 |
| 독창성 | 7/10 — BioMotionLab 데모 존재 (단, 교육용은 아님) |
| **총점** | **33/40** |

### 최종 결정: A안 "Depth Lab" 단독 or A+B 하이브리드

- **A안 단독**: 깊이 지각에 집중. 완성도 높이기 유리.
- **A+B 하이브리드**: "깊이를 해부하다"(메인) + "시간은 왜 늘어나는가"(서브) — 두 모듈로 구성. 야심적이나 작업량 증가.
- **추천**: A안 단독으로 시작. 여유 있으면 B 모듈 추가.

---

## 3. MVP 정의 및 성공 기준

### MVP (최소 기능 제품) — 반드시 완성

| 구성 | 내용 | 필수 여부 |
|------|------|-----------|
| **EXPLORE 탭** | 3D 장면 + **5개 핵심 토글** (선형원근법, 폐색, 그림자, 공기원근법, 텍스처그래디언트) | **MVP** |
| **TEST 탭** | 5문항 × 3조건 = 15문항 깊이 판단 과제 + 간단한 결과 프로필 | **MVP** |
| **모바일 대응** | 터치/마우스 인터랙션 + 반응형 UI | **MVP** |
| **학술 설명 패널** | 각 토글별 원리 설명 + 논문 인용 (최소 5개 단서) | **MVP** |

### 확장 목표 (Stretch Goals) — 시간 여유 시 추가

| 우선순위 | 구성 | 내용 |
|----------|------|------|
| 1순위 | 나머지 토글 2개 | 상대적 크기, 운동 시차 (난이도 높음) |
| 2순위 | 자이로 연동 | DeviceOrientation API로 운동 시차 체험 |
| 3순위 | CREATE 탭 | 강제 원근법 포토부스 |
| 4순위 | EMBODY 탭 | 손/얼굴 추적 기반 체험 (Section 9 참조) |

### 성공 기준

- [ ] MVP 토글 5개 모두 정상 동작
- [ ] 모바일(iOS Safari, Android Chrome) + 데스크톱(Chrome)에서 테스트 완료
- [ ] TEST 탭 결과 프로필이 정상 생성됨
- [ ] 최소 3명 동료 대상 사용자 테스트 완료
- [ ] 학술 설명 패널에 논문 인용 포함
- [ ] Vercel 배포 완료 (시연용 URL 확보)

---

## 4. 앱 구조 설계

### 4.1 전체 구조 (3개 탭)

```
┌─────────────────────────────────────────────┐
│              Depth Lab                       │
│         "깊이를 해부하다"                      │
├──────────┬──────────┬───────────────────────┤
│ EXPLORE  │  CREATE  │  TEST                 │
│ 탐험     │  창작     │  측정                 │
├──────────┴──────────┴───────────────────────┤
│                                             │
│  각 탭의 하단에 학술 설명 패널               │
│  (POE 흐름: 예측 → 관찰 → 설명)             │
│                                             │
└─────────────────────────────────────────────┘
```

### 4.2 탭별 상세

#### Tab 1: EXPLORE — 깊이 단서 해부 실험실

**핵심 체험**: 3D 장면에서 깊이 단서를 하나씩 토글

```
┌────────────────────────────────────────┐
│  [3D 장면 - 방 안에 물체들]             │
│                                        │
│  ┌──────────────────────────────────┐  │
│  │  🏠 거실 장면 (Three.js)          │  │
│  │  - 소파, 테이블, 화분, 창문       │  │
│  │  - 폰 기울이면 시점 변화          │  │
│  └──────────────────────────────────┘  │
│                                        │
│  깊이 단서 토글 패널:                   │
│  ☑ 선형 원근법  ☑ 폐색(겹침)          │
│  ☑ 상대적 크기  ☑ 텍스처 그래디언트    │
│  ☑ 공기 원근법  ☑ 그림자              │
│  ☑ 운동 시차    (자이로/마우스 연동)    │
│                                        │
│  [📖 이 단서는 왜 중요한가?] 펼치기     │
└────────────────────────────────────────┘
```

**각 토글의 동작 및 구현 난이도:**

| 토글 | ON 상태 | OFF 상태 | 난이도 | MVP |
|------|---------|----------|--------|-----|
| 선형 원근법 | Perspective projection | Orthographic projection | ⭐ 쉬움 | ✅ |
| 폐색 | 불투명 렌더링 | 반투명(alpha 0.3) 처리 | ⭐ 쉬움 | ✅ |
| 그림자 | 광원 기반 그림자 | 그림자 제거 | ⭐ 쉬움 | ✅ |
| 공기 원근법 | 먼 물체 blur + 푸른 색조 | 모든 물체 동일 선명도 | ⭐⭐ 보통 | ✅ |
| 텍스처 그래디언트 | 바닥 텍스처 원근 적용 | 균일 밀도 텍스처 | ⭐⭐ 보통 | ✅ |
| 상대적 크기 | 거리에 따른 자연스러운 크기 | 모든 물체 동일 겉보기 크기 (각도 크기 재계산 필요) | ⭐⭐⭐ 어려움 | 확장 |
| 운동 시차 | 자이로/마우스에 레이어별 차등 반응 | 모든 레이어가 단일 평면처럼 동일 속도 반응 (깊이 효과만 제거, 입력은 유지) | ⭐⭐⭐ 어려움 | 확장 |

> **구현 순서**: 쉬움(3개) → 보통(2개) → 어려움(2개). 쉬운 토글 3개만으로도 깊이 단서 체험의 핵심을 전달할 수 있다.

**POE 흐름 적용:**
1. **예측(P)**: "이 단서를 끄면 장면이 어떻게 변할까요?" — 객관식 선택
2. **관찰(O)**: 토글 OFF → 실시간 변화 체험
3. **설명(E)**: 해당 단서의 신경과학적 메커니즘 + 일상 예시 제시

#### Tab 2: CREATE — 강제 원근법 포토부스

**핵심 체험**: 깊이 단서를 "속여서" 착각을 직접 만들어보기

```
┌────────────────────────────────────────┐
│  [3D 장면 - 물체 배치 가능]             │
│                                        │
│  미션: "작은 피규어가 큰 건물보다       │
│        커 보이는 사진을 찍어보세요"      │
│                                        │
│  - 물체 드래그로 위치 조절              │
│  - 카메라 앵글 조절                     │
│  - [📸 찍기] → 실제 크기/거리 공개      │
│                                        │
│  보너스: Ames Room 시뮬레이터           │
│  - 벽 기울기를 조절하여 착시 설계       │
│  - 특정 시점에서 착시 완성 → 벗어나면   │
│    왜곡된 방의 실체가 드러남            │
└────────────────────────────────────────┘
```

#### Tab 3: TEST — 깊이 지각 능력 측정

**핵심 체험**: 게임화된 깊이 지각 정확도 테스트

```
┌────────────────────────────────────────┐
│  라운드 1: 전체 단서 (기준선)           │
│  "어떤 물체가 더 가까운가?" × 10문항    │
│                                        │
│  라운드 2: 텍스처 제거                  │
│  동일 과제, 정확도 비교                 │
│                                        │
│  라운드 3: 크기 단서 왜곡               │
│  작은 물체를 가까이 = 뇌가 얼마나       │
│  속는지 측정                            │
│                                        │
│  결과 화면:                             │
│  ┌──────────────────────────────────┐  │
│  │ 당신의 깊이 지각 프로필           │  │
│  │                                  │  │
│  │ 선형 원근법 의존도: ██████░ 73%  │  │
│  │ 폐색 의존도:       ████░░░ 52%  │  │
│  │ 크기 단서 의존도:  █████░░ 61%  │  │
│  │ 운동 시차 의존도:  ███████ 89%  │  │
│  │                                  │  │
│  │ 종합 정확도: 상위 34%             │  │
│  └──────────────────────────────────┘  │
│                                        │
│  [공유하기] [다시 하기] [원리 알아보기]  │
└────────────────────────────────────────┘
```

---

## 5. 기술 스택

### 5.1 권장 스택

| 레이어 | 기술 | 역할 | 난이도 |
|--------|------|------|--------|
| 프레임워크 | **Next.js (React)** | 라우팅, SSR, 배포 | 중 |
| 3D 렌더링 | **Three.js + React Three Fiber** | 깊이 단서 장면, Ames Room | 중 |
| 3D 유틸리티 | **@react-three/drei** | OrbitControls, Environment 등 | 낮음 |
| 모션/기울기 | **DeviceOrientation API** | 자이로스코프 패럴랙스 | 중 |
| 애니메이션 | **Framer Motion** | UI 트랜지션, 토글 애니메이션 | 낮음 |
| 제스처 | **@use-gesture/react** | 드래그, 핀치 조작 | 낮음 |
| 사운드 | **use-sound** | 피드백 효과음 | 낮음 |
| 스타일링 | **Tailwind CSS** | 반응형 UI | 낮음 |
| 배포 | **Vercel** | 무료 HTTPS 호스팅 (센서 API 필수) | 낮음 |

### 5.2 브라우저 호환성 주의사항

| API | Android Chrome | iOS Safari | 데스크톱 | 비고 |
|-----|----------------|------------|----------|------|
| DeviceOrientation | 자동 허용 | iOS 13+ 권한 요청 필수 | 미지원 | HTTPS 필수 |
| Three.js WebGL | 완전 지원 | 완전 지원 | 완전 지원 | — |
| Touch Events | 완전 지원 | 완전 지원 | 마우스 폴백 | — |

**핵심**: iOS에서는 `DeviceOrientationEvent.requestPermission()` 호출이 반드시 사용자 제스처(버튼 클릭) 이후에 이루어져야 함. 데스크톱에서는 마우스 이동으로 motion parallax 폴백 제공.

---

## 6. 학술 기반 설계

### 6.1 교육적 흐름: POE (Predict-Observe-Explain)

각 체험 모듈마다 적용:

```
[1단계: 예측]
  "선형 원근법을 끄면 이 장면은 어떻게 보일까요?"
  → 사용자가 객관식 or 자유 기술로 예측 입력

[2단계: 관찰]
  → 토글 OFF → 실시간 변화 체험
  → 사용자 예측과 실제 결과 비교

[3단계: 설명]
  → 해당 단서의 원리 설명
  → 관련 논문 인용 (APA 스타일)
  → 일상 예시 (건축, 영화, 게임 등)
```

**근거**: Hong et al. (2014) — POE 탐구학습이 과학 학습 흥미와 지속 의도를 유의미하게 향상

### 6.2 정보 아키텍처 (CognitionLab 모델 참고)

각 체험 모듈의 하단에:
- **[체험]**: 인터랙티브 조작 영역
- **[원리]**: 지각 메커니즘 해설 (접이식 패널)
- **[참고문헌]**: 관련 논문 APA 인용
- **[일상 속 사례]**: 사진/영상으로 실생활 예시

### 6.3 핵심 참고 논문

| 논문 | 핵심 내용 | 활용 위치 |
|------|-----------|-----------|
| Cutting & Vishton (1995) | 거리별 깊이 단서 중요도 순위 | EXPLORE 탭 전체 |
| IJsselsteijn et al. (2008) | 단안 깊이 단서(motion parallax, blur, occlusion) 분리 실험 | EXPLORE 토글 설계 근거 |
| Gibson (1950) | 텍스처 그래디언트 이론 | 텍스처 토글 설명 |
| Rogers & Graham (1979) | 운동 시차가 독립적 깊이 단서임을 증명 | 운동 시차 토글 설명 |
| Gregory (1966) | 부적절 크기 항상성 이론 | Ames Room, Ponzo 설명 |
| Ittelson (1952) | Ames Room 원리 | CREATE 탭 |

---

## 7. 개발 일정 (약 12주)

### Phase 0: 학습 기간 (3월 4주 ~ 4월 2주) — 2주

- [ ] React/Next.js 기초 튜토리얼 완료 (공식 튜토리얼 + 바이브 코딩 활용)
- [ ] Three.js 공식 예제 따라하기 (장면, 카메라, 조명, 재질)
- [ ] React Three Fiber "hello cube" 튜토리얼 완료
- [ ] **Vercel 배포 세팅** (Day 1부터 지속 배포 — 항상 시연 가능한 URL 유지)

### Phase 1: 기반 구축 (4월 3주 ~ 4월 4주) — 2주

- [ ] Next.js + R3F 프로젝트 세팅
- [ ] 기본 3D 장면 구현 (거실/방 씬 — 소파, 테이블, 화분 등 5-7개 물체)
- [ ] 데스크톱 마우스 인터랙션 (OrbitControls or 마우스 위치 반응)
- [ ] 반응형 UI 기본 레이아웃

### Phase 2: EXPLORE 탭 — MVP 토글 (5월 1주 ~ 5월 3주) — 3주

**주차별 마일스톤:**

- **Week 1**: 쉬운 토글 3개 완성 (선형 원근법, 폐색, 그림자)
  - 선형 원근법: `PerspectiveCamera` ↔ `OrthographicCamera` 전환
  - 폐색: 재질 opacity 토글
  - 그림자: `castShadow`/`receiveShadow` 토글
- **Week 2**: 보통 토글 2개 완성 (공기 원근법, 텍스처 그래디언트)
  - 공기 원근법: Three.js Fog + 먼 물체 색조 변경
  - 텍스처 그래디언트: 바닥 텍스처 밀도 조작
- **Week 3**: POE 흐름 UI + 학술 설명 패널
  - 예측 입력 → 체험 → 설명 3단계 UI
  - 5개 토글별 원리 설명 콘텐츠 작성 (논문 인용 포함)

> ⚠️ **체크포인트**: Week 1 완료 후 3개 토글이 정상 동작하지 않으면 일정 재조정 필요

### Phase 3: TEST 탭 (5월 4주 ~ 6월 1주) — 2주

- [ ] 깊이 판단 과제: **5문항 × 3조건 = 15문항** (절차적 생성으로 물체 위치 랜덤화)
- [ ] 정확도 계산: "단서 X 제거 시 정확도 하락률 = 단서 X 의존도"
- [ ] 결과 시각화 (막대 그래프 — 단서별 의존도 프로필)
- [ ] 결과 이미지 저장 (html2canvas 스크린샷)

### Phase 4: 사용자 테스트 + 폴리싱 (6월 2주) — 1주

- [ ] **3-5명 동료 대상 사용자 테스트** — 반응 관찰, 피드백 수집
- [ ] 피드백 기반 UI/UX 개선
- [ ] 전체 반응형 최적화 (모바일 테스트)
- [ ] 발표 시연 시나리오 작성 + **화면 녹화 백업** (라이브 데모 실패 대비)

### Phase 5: 확장 목표 + 제출 (6월 3주) — 여유분

- [ ] (여유 시) 어려운 토글 추가: 상대적 크기, 운동 시차
- [ ] (여유 시) 자이로센서 연동
- [ ] (여유 시) CREATE 탭 기본 구현
- [ ] 최종 버그 수정 + 제출

### 기술적 플랜 B

> Three.js/R3F 학습이 Phase 0에서 예상보다 어려울 경우, **2.5D CSS/Canvas 기반 접근**으로 전환한다.
> - CSS `perspective`, `translateZ`, `opacity`, `filter: blur()` 등으로 깊이 단서 토글 구현
> - Canvas API로 텍스처 그래디언트, 그림자 효과 직접 렌더링
> - 교육적 효과는 3D와 유사하게 유지하면서 기술 난이도를 대폭 낮출 수 있음

---

## 8. 리스크 및 대응

| 리스크 | 영향 | 대응 |
|--------|------|------|
| Three.js 학습 곡선 | 높음 | R3F + drei로 추상화, 바이브 코딩으로 핵심 로직 생성 |
| iOS 자이로 권한 이슈 | 중간 | 버튼 클릭 후 권한 요청 패턴 적용 + 마우스 폴백 |
| 3D 성능 (저사양 모바일) | 중간 | 장면 복잡도 제한, LOD 적용 |
| CREATE 탭 구현 시간 부족 | 낮음 | 우선순위 최하. EXPLORE + TEST만으로도 충분한 완성도 |
| 학술 내용 정확성 | 중간 | 교수 또는 TA에게 중간 피드백 요청 |

---

## 9. 참고 자료 모음

### 학술 참고
- Cutting, J.E. & Vishton, P.M. (1995). Perceiving layout and knowing distances. In *Perception of Space and Motion* (pp. 69-117). Academic Press.
- IJsselsteijn, W. et al. (2008). A Room with a Cue: The effect of monocular depth cues on depth perception. *Presence: Teleoperators and Virtual Environments*, 17(3), 269-282.
- Rogers, B. & Graham, M. (1979). Motion Parallax as an Independent Cue for Depth Perception. *Perception*, 8, 125-134.
- Gibson, J.J. (1950). *The Perception of the Visual World*. Houghton Mifflin.
- Gregory, R.L. (1966). *Eye and Brain: The Psychology of Seeing*. McGraw-Hill.
- Hong, J.-C. et al. (2014). Using a POE inquiry model to enhance student interest. *Computers & Education*, 72, 110-120.
- Mazuz, Y. et al. (2023). The BTPI: Online battery for measuring illusion susceptibility. *Journal of Vision*, 23(10), 2.

### 기술 참고
- [Three.js 공식 문서](https://threejs.org/docs/)
- [React Three Fiber](https://r3f.docs.pmnd.rs/)
- [DeviceOrientation API (MDN)](https://developer.mozilla.org/en-US/docs/Web/API/Window/deviceorientation_event)
- [Parallax.js (자이로 패럴랙스 엔진)](https://github.com/wagerfield/parallax)
- [vivien000/trompeloeil (웹캠 face-tracking 깊이 효과)](https://github.com/vivien000/trompeloeil)

### 영감 참고
- [Michael Bach 착시 모음 (154개)](https://michaelbach.de/ot/)
- [Superliminal 게임 (강제 원근법 퍼즐)](https://en.wikipedia.org/wiki/Superliminal)
- [NASA Depth Perception Report](https://ntrs.nasa.gov/api/citations/20180007277/downloads/20180007277.pdf)
- [Apple iOS 26 Spatial Scenes](https://www.cultofmac.com/how-to/spatial-scenes)
- [DepthCues Benchmark](https://danier97.github.io/depthcues/)

---

## 부록: 비채택 후보 요약

### 시간 지각 (Oddball Paradigm) — 서브 모듈 추가 후보

독립 프로젝트로도 충분히 매력적이나, 깊이 지각과의 연결고리가 약하여 별도 모듈로 추가 가능.
- 구현: jsPsych 기반 반복 자극 중 oddball의 주관적 시간 팽창 체험
- 효과 크기: 약 10-15% 과대추정 (Tse et al., 2004)
- 기존 학생 프로젝트에서 거의 선택되지 않는 주제

### 생물학적 운동 (Point-Light Walker) — 서브 모듈 추가 후보

MediaPipe Pose로 사용자 자신을 point-light로 변환하면 와우 팩터 극대화.
- 구현: Canvas 12-15개 점 애니메이션 + MediaPipe Pose 연동
- 역전 효과(inversion): 뒤집으면 인식률 50% 이하 감소
- BioMotionLab 데모 존재하나 "교육용 체험"으로의 재구성은 미존재

---

## 10. [확장 목표] 손/눈/얼굴 추적 기반 인터랙션 방향성

> ⚠️ **이 섹션은 MVP 범위 밖의 확장 목표입니다.** MVP(EXPLORE + TEST 탭) 완성 후 시간이 남을 경우에만 착수합니다. 기술적 난이도가 높으므로(MediaPipe + off-axis projection), 전문가 지인의 도움이 전제됩니다.

> **조사 배경**: 인스타그램 릴스(neorx_ 계정 등)에서 유행하는 "손 추적 + off-axis parallax + 실시간 3D" 효과를 참고하여, 깊이 지각 체험앱에 적용할 수 있는 독창적 인터랙션 방향을 조사함.
>
> **참고 릴스**:
> - https://www.instagram.com/reels/DTPl0gtCIAK/
> - https://www.instagram.com/reel/DSsUNnRDhaP/
>
> 해당 릴스들은 **off-axis parallax + hand tracking + 실시간 3D 렌더링**을 결합하여, 카메라 앞에서 손을 움직이면 화면 속 3D 오브젝트가 마치 실제 공간에 있는 것처럼 반응하는 효과를 보여준다.

### 10.1 핵심 트렌드: Off-Axis Projection + Body Tracking

**Off-axis projection**(비축 투영)은 Johnny Lee(2007)의 Wii 헤드트래킹에서 시작된 기술로, 카메라를 단순 회전시키는 것이 아니라 **투영 행렬 자체를 사용자 위치에 맞게 변형**하여 "화면이 현실 공간의 창문이 되는" 효과를 만든다.

2024-2026년 현재 이 기술이 MediaPipe + Three.js 조합으로 웹 브라우저에서 실현 가능해지면서, 인스타/틱톡에서 폭발적으로 유행하고 있다.

### 10.2 기존 사례 및 참고 프로젝트

#### A. 얼굴/머리 추적 (Face/Head Tracking) 기반

| 프로젝트 | 설명 | 기술 | 링크 |
|----------|------|------|------|
| **Ian Curtis — Off-Axis Shoe Demo** | MediaPipe 얼굴 추적 + Three.js off-axis projection으로 3D 스캔 신발을 실물처럼 보여주는 데모. 화면 크기 캘리브레이션 지원. Johnny Lee에서 직접 영감 받음 | MediaPipe Face, Three.js | [LinkedIn Post](https://www.linkedin.com/posts/ian-curtis-138492102_built-a-off-axis-projection-demo-using-mediapipe-activity-7414719697914519552-PV6_) |
| **Charlie Gerard — Interactive Digital Frame** | TensorFlow.js MoveNet으로 머리 위치 추적, Three.js `CameraUtils.frameCorners()`로 off-axis projection 구현. 화면 속 상자 안을 들여다보는 "창문 효과" | TF.js MoveNet, Three.js | [Dev.to 튜토리얼](https://dev.to/devdevcharlie/making-an-interactive-digital-frame-with-head-tracking-using-three-js-and-tensorflow-js-5dfo) / [GitHub](https://github.com/charliegerard/interactive-frame-tfjs) |
| **vivien000 — Trompe-l'oeil** | TensorFlow.js Face Landmarks + Three.js로 브라우저에서 motion parallax 체험. TF 커뮤니티 스포트라이트 수상작 | TF.js, Three.js | [GitHub](https://github.com/vivien000/trompeloeil) / [블로그](https://vivien000.github.io/blog/journal/motion-parallax-with-face-tracking.html) |
| **neorx_ (Instagram)** | Off-axis parallax + hand tracking + 실시간 3D 렌더링. "no visual effect, all running in real time on my screen" | MediaPipe, Three.js | [Instagram](https://www.instagram.com/reels/DR9MQbVCMoL/) |
| **True3D Labs — Window Mode** ⭐ | 전 Meta 엔지니어 Daniel Habib이 만든 **오픈소스** "Window Mode". 프론트 카메라로 머리 추적 → 화면을 3D 창문으로 변환. temporal smoothing + jitter rejection 적용 | MediaPipe Face, on-device AI | [GitHub](https://github.com/true3dlabs/window-mode) / [기술 블로그](https://danielhabib.substack.com/p/a-simpler-way-to-watch-3d) |
| **Shopify WonkaVision** | MediaPipe Iris로 눈(홍채) 3D 위치 추정 → off-axis projection 적용. Hacker News 프론트페이지 달성 | MediaPipe Iris, WASM, Three.js | [데모](https://shopify.github.io/spatial-commerce-projects/WonkaVision/) |
| **webgma.co.il — Window 3D Portal** | 웹캠 머리 추적 + perspective-correct 3D 렌더링. 복도 포탈 효과. 적청 안경 결합 시 스테레오까지 가능 | WebGL, MediaPipe | [데모](https://www.webgma.co.il/Articles/window-3d-tracking/en/) |

#### B. 손 추적 (Hand Tracking) 기반

| 프로젝트 | 설명 | 기술 | 링크 |
|----------|------|------|------|
| **Caio Bassetti — 3D Hand Controller** | MediaPipe 손 21개 랜드마크로 3D 커서 제어. 손 거리로 Z축 깊이 계산, 주먹 쥐기로 오브젝트 드래그. Spaceship 게임으로도 확장 | MediaPipe Hands, Three.js | [Codrops 튜토리얼](https://tympanus.net/codrops/2024/10/24/creating-a-3d-hand-controller-using-a-webcam-with-mediapipe-and-three-js/) / [GitHub](https://github.com/Cai3ra/webcam-3D-handcontrols) / [데모](https://tympanus.net/Tutorials/webcam-3D-handcontrols) |
| **Xavier (Jack) — Hand Tracking Three.js** | MediaPipe + Three.js로 브라우저에서 실시간 손 추적. 폐색(occlusion) 상황에서도 정확한 추적 | MediaPipe, Three.js | [80 Level](https://80.lv/articles/real-time-hand-tracking-in-the-browser-with-mediapipe) |
| **Bolt × MediaPipe Tutorial** | 4개 인터랙티브 앱 구축 튜토리얼: 회의 참여도 측정, 손 제스처 게임 등. MediaPipe Showcase로 얼굴/손/포즈 통합 데모 제공 | MediaPipe, Bolt.new | [블로그](https://bolt.new/blog/face-and-hand-tracking-bolt-mediapipe) |
| **TikTok Effect House — 3D Hand Tracker** | 3D 공간에서 양손의 골격 구조와 관절 키포인트를 추적. 장갑 인형극 같은 인터랙션, 가상 악세서리 착용 등 | TikTok AR SDK | [문서](https://effecthouse.tiktok.com/learn/guides/workspace/objects/ar-tracking/3d-hand-tracker) |
| **Spaceship Control Game** | 위 Caio Bassetti의 손 추적 기술을 게임으로 확장. 손을 우주선 조종간처럼 사용 | MediaPipe, Three.js | [데모](https://caiobassetti.com/experiments/spaceship-control/) |

#### C. 시선/눈 추적 (Eye/Gaze Tracking) 기반

| 프로젝트 | 설명 | 기술 | 링크 |
|----------|------|------|------|
| **WebGazer.js** | 웹캠 기반 실시간 시선 추적 라이브러리. 외부 하드웨어 없이 브라우저에서 시선 위치 예측 | WebGazer.js | [공식 사이트](https://webgazer.cs.brown.edu/) / [GitHub](https://github.com/brownhci/WebGazer) |
| **jsPsych + WebGazer 통합** | jsPsych 실험 프레임워크에 WebGazer 시선 추적을 플러그인으로 통합. 지각 실험에서 시선 데이터 수집 가능 | jsPsych, WebGazer | [jsPsych 문서](https://www.jspsych.org/latest/overview/eye-tracking/) |
| **Golan Levin — Eyecode** | 숨겨진 카메라로 관람자의 눈을 녹화, 눈 깜빡임 사이 클립으로 "관찰의 역사" 타이포그래피 태피스트리 생성. 뉴미디어 아트 선구적 사례 | 커스텀 CV | [프로젝트](https://www.flong.com/archive/projects/eyecode/index.html) |

#### D. 복합 입력 (얼굴+손 동시)

| 프로젝트 | 설명 | 기술 | 링크 |
|----------|------|------|------|
| **Torin Blankensmith — Genuary 2025** ⭐ | 30일 생성적 예술 챌린지에서 TouchDesigner + MediaPipe로 Brutalist 건축 구조물을 손으로 조작. **인스타 약 900만 뷰** 달성. 이 트렌드를 메인스트림으로 확산시킨 바이럴 콘텐츠 | TouchDesigner, MediaPipe | [TikTok](https://www.tiktok.com/@blankensmithing/video/7463793324361534766) / [YouTube 튜토리얼](https://www.youtube.com/watch?v=UFVvmCuM2Is) |
| **JARVIS-HUD** | Next.js + Three.js + MediaPipe로 아이언맨 JARVIS 같은 제스처 제어 홀로그래픽 HUD를 웹에서 60FPS 구현 | Next.js, Three.js, MediaPipe | [Medium](https://medium.com/@suryanshchourasia12/i-built-a-gesture-controlled-jarvis-in-react-and-it-runs-at-60-fps-696c8dbeb8be) |
| **Jeeliz FaceFilter** | 웹브라우저 실시간 얼굴 추적 경량 라이브러리. 30줄로 2D 얼굴 추적 구현. Cesium.js 지구 뷰의 머리 제어 네비게이션 데모 등 다수 | WebGL, 자체 경량 NN | [데모 모음](https://jeeliz.github.io/jeelizFaceFilter/) |

### 10.3 Depth Lab에 적용할 독창적 인터랙션 아이디어 (Top 5)

#### ★★★ 아이디어 1: "Your Hand IS the Depth Cue" — 손이 깊이 단서가 되는 체험

**컨셉**: 사용자의 손을 카메라로 추적하여, 손 자체가 3D 장면의 깊이 단서 역할을 한다.

- **손 거리 → Z축**: 손이 카메라에 가까우면 장면이 "가까이", 멀면 "멀리" — 운동 시차의 능동적 체험
- **손 폐색**: 손이 화면 속 가상 물체를 "가리면" 폐색 단서 발생 → 뇌가 자동으로 손을 "앞", 물체를 "뒤"로 해석
- **손 크기 vs 물체 크기**: 손의 겉보기 크기와 가상 물체의 겉보기 크기를 비교하며 크기 항상성(size constancy) 체험
- **교육적 흐름**: "당신의 손을 움직여 깊이를 만들어보세요" → 체험 후 "방금 당신이 사용한 깊이 단서는 '운동 시차'입니다" 설명

**기술**: MediaPipe Hands → 손 랜드마크 21개 → 손바닥 크기로 Z축 깊이 계산 → Three.js 카메라/오브젝트 연동

**지각심리학 연결**: 능동 지각(active perception), Gibson의 ecological approach — 관찰자가 능동적으로 환경을 탐색할 때 지각이 더 정확해진다

#### ★★★ 아이디어 2: "Window into Another World" — 얼굴 추적 off-axis 깊이 체험

**컨셉**: 머리 위치를 추적하여 화면을 "다른 세계로의 창문"으로 변환. 단순 패럴랙스가 아니라, **깊이 단서를 토글하면서 창문 효과가 어떻게 변하는지** 비교 체험.

- 머리를 좌우로 움직이면 → off-axis projection으로 장면 내부가 보임
- **토글 A**: off-axis projection ON/OFF → "운동 시차가 깊이감에 미치는 영향" 직접 비교
- **토글 B**: 텍스처/그림자/폐색 각각 ON/OFF → "motion parallax만으로 깊이가 충분한가, 아니면 다른 단서도 필요한가?"
- **결과 측정**: 각 조건에서 "이 장면이 얼마나 입체적으로 느껴지나요?" 주관 평가 (1-7 척도)

**기술**: MediaPipe Face Mesh → 얼굴 중심 좌표 추출 → Three.js `CameraUtils.frameCorners()` off-axis projection

**지각심리학 연결**: IJsselsteijn et al. (2006)의 단안 깊이 단서 분리 실험을 실시간 체험으로 재현

#### ★★ 아이디어 3: "Gaze-Contingent Depth" — 시선이 향하는 곳만 깊이가 생기는 체험

**컨셉**: WebGazer.js로 시선을 추적하여, 사용자가 바라보는 영역만 깊이 단서가 활성화되고 주변부는 평면으로 보이는 체험.

- 중심시(foveal vision) vs 주변시(peripheral vision)의 깊이 지각 차이 체험
- "왜 우리는 눈을 움직여야 세상을 제대로 볼 수 있는가?"
- 시선이 머무는 영역에만 텍스처 그래디언트, 그림자, 원근법이 적용됨

**기술**: WebGazer.js → 시선 좌표 → Three.js 셰이더로 시선 영역만 선택적 렌더링

**지각심리학 연결**: 주의(attention)와 지각의 관계, 비주의맹시(inattentional blindness)

#### ★★ 아이디어 4: "Depth Conflict" — 시각-체성감각 불일치 체험

**컨셉**: 손 추적으로 받은 실제 손 위치와 화면에 표시되는 가상 손 위치를 의도적으로 불일치시켜, 깊이 지각의 혼란을 체험.

- 실제 손은 20cm 거리에 있지만 가상 손은 "2m 멀리"에 표시
- 뇌가 어떤 정보(시각 vs 체성감각)를 우선시하는지 체험
- 고무손 착각(Rubber Hand Illusion)의 디지털 버전

**기술**: MediaPipe Hands → 좌표 왜곡 → Three.js에서 왜곡된 위치에 가상 손 렌더링

**지각심리학 연결**: 다감각 통합, 시각 우세(visual dominance), 체화된 인지

#### ★ 아이디어 5: "Biological Motion Detector" — 내 몸이 Point-Light Walker가 되는 체험

**컨셉**: MediaPipe Pose로 사용자의 전신을 추적하여 실시간으로 point-light display로 변환. 자신의 움직임이 점 12개로 환원되는 경험.

- 정상 조건 → 역전(inversion) 조건 → 스크램블 조건 비교
- "점 12개만으로도 나를 알아볼 수 있을까?"
- 다른 사람에게 보여주고 누구인지 맞추기 게임

**기술**: MediaPipe Pose → 33개 관절 → 12개 핵심 점으로 축소 → Canvas 렌더링

**지각심리학 연결**: Johansson(1973) 생물학적 운동 지각, 역전 효과

### 10.4 추천 방향: 기존 Depth Lab에 통합

기존 "Depth Lab" 3탭 구조에 **손/얼굴 추적 인터랙션**을 통합하는 방식:

```
┌─────────────────────────────────────────────────────────┐
│                    Depth Lab v2                          │
│              "깊이를 해부하다"                            │
├────────────┬────────────┬────────────┬──────────────────┤
│  EXPLORE   │  EMBODY    │  CREATE    │  TEST            │
│  탐험      │  체화      │  창작      │  측정            │
│  (토글)    │  (추적)    │  (포토부스) │  (능력 테스트)   │
└────────────┴────────────┴────────────┴──────────────────┘
```

**새로운 EMBODY 탭** (아이디어 1+2 결합):
1. **손 모드**: 손 추적으로 3D 장면의 깊이를 직접 조작 — "Your Hand IS the Depth Cue"
2. **머리 모드**: 얼굴 추적 off-axis projection — "Window into Another World"
3. 각 모드에서 깊이 단서 토글 가능 → EXPLORE 탭과 연결
4. 체험 후 "방금 당신이 사용한 깊이 단서" 설명 + 학술 논문 인용

### 10.5 기술 구현 로드맵 (EMBODY 탭)

| 단계 | 작업 | 난이도 | 예상 기간 |
|------|------|--------|-----------|
| 1 | MediaPipe Hands 웹캠 연동 기본 세팅 | 중 | 3일 |
| 2 | 손 랜드마크 → Z축 깊이 매핑 | 중 | 2일 |
| 3 | Three.js 장면과 손 위치 연동 | 중 | 3일 |
| 4 | MediaPipe Face Mesh → 얼굴 중심 좌표 추출 | 중 | 2일 |
| 5 | Three.js off-axis projection (frameCorners) | 높음 | 4일 |
| 6 | 깊이 단서 토글과 추적 모드 통합 | 높음 | 3일 |
| 7 | POE 흐름 + 설명 패널 연결 | 낮음 | 2일 |

### 10.6 참고 링크 종합

#### 핵심 참고 (구현에 직접 활용)
- [Codrops: 3D Hand Controller with MediaPipe + Three.js](https://tympanus.net/codrops/2024/10/24/creating-a-3d-hand-controller-using-a-webcam-with-mediapipe-and-three-js/) — 손 추적 → 3D 조작 구현의 가장 완성도 높은 튜토리얼
- [GitHub: webcam-3D-handcontrols](https://github.com/Cai3ra/webcam-3D-handcontrols) — 위 튜토리얼 소스코드
- [데모: Webcam 3D Hand Controls](https://tympanus.net/Tutorials/webcam-3D-handcontrols) — 라이브 데모
- [Dev.to: Interactive Digital Frame with Head-Tracking](https://dev.to/devdevcharlie/making-an-interactive-digital-frame-with-head-tracking-using-three-js-and-tensorflow-js-5dfo) — off-axis projection의 가장 명확한 설명
- [GitHub: interactive-frame-tfjs](https://github.com/charliegerard/interactive-frame-tfjs) — 위 프로젝트 소스코드
- [GitHub: trompeloeil (face tracking depth)](https://github.com/vivien000/trompeloeil) — face tracking motion parallax 브라우저 데모
- [Three.js CameraUtils.frameCorners() 문서](https://threejs.org/docs/#examples/en/utils/CameraUtils) — off-axis projection 핵심 API

#### 기술 참고 (MediaPipe)
- [MediaPipe Hands 공식 문서](https://mediapipe.readthedocs.io/en/latest/solutions/hands.html)
- [Google Research: On-Device Hand Tracking](https://research.google/blog/on-device-real-time-hand-tracking-with-mediapipe/)
- [80 Level: Real-Time Hand Tracking in Browser](https://80.lv/articles/real-time-hand-tracking-in-the-browser-with-mediapipe)
- [Towards Data Science: Hand/Finger Tracking in Browsers](https://towardsdatascience.com/exquisite-hand-and-finger-tracking-in-web-browsers-with-mediapipes-machine-learning-models-2c4c2beee5df/)
- [Bolt × MediaPipe 튜토리얼](https://bolt.new/blog/face-and-hand-tracking-bolt-mediapipe)

#### 시선 추적 참고
- [WebGazer.js 공식](https://webgazer.cs.brown.edu/)
- [WebGazer GitHub](https://github.com/brownhci/WebGazer)
- [jsPsych Eye-Tracking 가이드](https://www.jspsych.org/latest/overview/eye-tracking/)

#### 인스타/틱톡 트렌드 참고
- [neorx_ Off-Axis Parallax + Hand Tracking](https://www.instagram.com/reels/DR9MQbVCMoL/) — "no visual effect, all real time"
- [TikTok Effect House: 3D Hand Tracker](https://effecthouse.tiktok.com/learn/guides/workspace/objects/ar-tracking/3d-hand-tracker)
- [TikTok Effect House: Hand Tracker](https://effecthouse.tiktok.com/learn/guides/workspace/objects/ar-tracking/hand-tracker)

#### 게임/크리에이티브 참고
- [Spaceship Control Game (손 추적)](https://caiobassetti.com/experiments/spaceship-control/)
- [CodePen: Hand Controls Demo](https://codepen.io/caiera/project/full/ZnJpBK)

#### 학술 참고 (추가)
- Gibson, J.J. (1979). *The Ecological Approach to Visual Perception*. — 능동 지각 이론
- Held, R. & Hein, A. (1963). Movement-produced stimulation in the development of visually guided behavior. — 능동 vs 수동 지각
- IJsselsteijn, W. et al. (2006). Looking At or Looking Out. *PRESENCE 2006*. — 단안 깊이 단서 분리
- Botvinick, M. & Cohen, J. (1998). Rubber hands 'feel' touch that eyes see. *Nature*, 391, 756. — 고무손 착각
