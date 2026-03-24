"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";

import { ResultProfile } from "@/components/ui/ResultProfile";
import { useTestSession } from "@/hooks/useTestSession";

const TrialScene = dynamic(
  () => import("@/components/scene/TrialScene").then((mod) => mod.TrialScene),
  {
    ssr: false,
    loading: () => (
      <div className="panel-line flex h-[420px] items-center justify-center rounded-[28px] text-sm text-text-secondary">
        테스트 장면을 준비하는 중입니다...
      </div>
    ),
  },
);

type Phase = "intro" | "trial" | "result";

const conditionCards = [
  {
    title: "기준선",
    description: "모든 깊이 단서가 정상 작동합니다",
  },
  {
    title: "텍스처 제거",
    description: "바닥 텍스처 그래디언트를 제거합니다",
  },
  {
    title: "크기 왜곡",
    description: "가까운 물체의 크기를 축소하여 크기 단서를 교란합니다",
  },
] as const;

const conditionLabel: Record<string, string> = {
  baseline: "기준선",
  noTexture: "텍스처 제거",
  distortedSize: "크기 왜곡",
};

export default function TestPage() {
  const router = useRouter();
  const {
    currentTrial,
    currentCondition,
    trialIndex,
    totalTrials,
    completed,
    testResult,
    startTrial,
    answerTrial,
    reset,
  } = useTestSession();
  const [phase, setPhase] = useState<Phase>("intro");
  const effectivePhase: Phase = phase === "trial" && completed ? "result" : phase;
  const displayedTrialIndex = trialIndex + 1;
  const progressWidth = `${(displayedTrialIndex / totalTrials) * 100}%`;

  const handleStart = () => {
    reset();
    setPhase("trial");
  };

  const handleRetry = () => {
    reset();
    setPhase("intro");
  };

  if (effectivePhase === "intro") {
    return (
      <section className="panel-surface rounded-[32px] p-6 sm:p-8">
        <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-primary">
              Test
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.04em] text-text-primary">
              깊이 지각 테스트
            </h2>
            <p className="text-sm leading-7 text-text-secondary">
              3조건 × 5문제로 구성된 15개 트라이얼에서 두 물체 중 더 가까운 대상을
              선택해 보세요.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-3">
            {conditionCards.map((item) => (
              <div key={item.title} className="panel-line rounded-[24px] p-4">
                <p className="text-sm font-semibold text-text-primary">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <button
          className="mt-8 rounded-[24px] bg-accent-primary px-6 py-3 text-sm font-semibold text-[#052017] transition-transform duration-200 hover:-translate-y-0.5"
          onClick={handleStart}
          type="button"
        >
          테스트 시작
        </button>
      </section>
    );
  }

  if (effectivePhase === "trial" && currentTrial) {
    return (
      <section className="panel-surface rounded-[32px] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-primary">
              Trial
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-text-primary">
              {displayedTrialIndex} / {totalTrials}
            </h2>
            <div className="mt-3 h-1 overflow-hidden rounded-full bg-white/8">
              <div
                className="h-1 rounded-full bg-accent-primary transition-[width] duration-300"
                style={{ width: progressWidth }}
              />
            </div>
          </div>
          <div className="panel-line rounded-[20px] px-4 py-3 text-sm text-text-primary">
            {currentCondition ? conditionLabel[currentCondition] : "-"}
          </div>
        </div>

        <div
          aria-label="두 물체의 상대적 깊이를 비교하는 3D 테스트 장면"
          className="mt-6 overflow-hidden rounded-[28px] border border-white/10"
          role="img"
        >
          <TrialScene key={currentTrial.id} onReady={startTrial} trial={currentTrial} />
        </div>

        <p className="mt-5 text-center text-sm font-semibold text-text-secondary">
          어떤 물체가 더 가까운가요?
        </p>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <button
            className="rounded-[24px] bg-[#e74c3c] px-5 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            onClick={() => answerTrial("A")}
            type="button"
          >
            A가 더 가깝다
          </button>
          <button
            className="rounded-[24px] bg-[#3498db] px-5 py-4 text-sm font-semibold text-white transition-transform duration-200 hover:-translate-y-0.5"
            onClick={() => answerTrial("B")}
            type="button"
          >
            B가 더 가깝다
          </button>
        </div>
      </section>
    );
  }

  if (effectivePhase === "result" && testResult) {
    return (
      <section className="panel-surface rounded-[32px] p-6 sm:p-8">
        <ResultProfile
          onLearnMore={() => router.push("/explore")}
          onRetry={handleRetry}
          result={testResult}
        />
      </section>
    );
  }

  return (
    <section className="panel-surface rounded-[32px] p-6 text-sm text-text-secondary sm:p-8">
      테스트 데이터를 준비하는 중입니다...
    </section>
  );
}
