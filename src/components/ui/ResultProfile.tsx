"use client";

import { useRef, useState } from "react";
import html2canvas from "html2canvas";

import type { TestResult } from "@/types";

type ResultProfileProps = {
  result: TestResult;
  onRetry: () => void;
  onLearnMore: () => void;
};

type AccuracyRow = {
  label: string;
  value: number;
};

function toPercent(value: number) {
  return Math.round(value * 100);
}

export function ResultProfile({ result, onRetry, onLearnMore }: ResultProfileProps) {
  const resultRef = useRef<HTMLDivElement | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const accuracyRows: AccuracyRow[] = [
    { label: "기준선 (Baseline)", value: result.baselineAccuracy },
    { label: "텍스처 제거 (No Texture)", value: result.noTextureAccuracy },
    { label: "크기 왜곡 (Distorted Size)", value: result.distortedSizeAccuracy },
  ];
  const textureDependencyPercent = toPercent(result.cueDependency.texture);
  const sizeDependencyPercent = toPercent(result.cueDependency.size);
  const interpretation =
    textureDependencyPercent <= 20 && sizeDependencyPercent <= 20
      ? "균형 잡힌 깊이 지각을 보였습니다."
      : textureDependencyPercent >= 40 && sizeDependencyPercent >= 40
        ? "텍스처와 크기 단서 모두에 높은 의존도를 보였습니다."
        : textureDependencyPercent >= 40
          ? "텍스처 단서에 높은 의존도를 보였습니다."
          : sizeDependencyPercent >= 40
            ? "크기 단서에 높은 의존도를 보였습니다."
            : null;

  const handleSaveScreenshot = async () => {
    if (!resultRef.current || isSaving) {
      return;
    }

    setIsSaving(true);

    try {
      const canvas = await html2canvas(resultRef.current, {
        backgroundColor: "#11131a",
        scale: 2,
      });
      const url = canvas.toDataURL("image/png");
      const link = document.createElement("a");
      link.href = url;
      link.download = "depth-perception-profile.png";
      link.click();
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="space-y-5">
      <div ref={resultRef} className="panel-surface rounded-[32px] p-6 sm:p-8">
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-primary">
          Result
        </p>
        <h2 className="mt-3 text-balance text-3xl font-semibold tracking-[-0.04em] text-text-primary">
          당신의 깊이 지각 프로필
        </h2>
        <p className="mt-3 text-sm leading-7 text-text-secondary">
          조건별 정답률과 단서 의존도를 통해 어떤 시각 단서에 더 기대고 있는지 볼 수
          있습니다.
        </p>

        <div className="mt-6 flex items-center gap-4 rounded-[24px] bg-accent-primary/10 px-5 py-4">
          <p className="text-sm text-text-secondary">전체 정확도</p>
          <p className="ml-auto font-mono text-3xl font-semibold text-accent-primary">
            {toPercent(result.overallScore)}%
          </p>
        </div>

        <div className="mt-4 grid gap-4">
          {accuracyRows.map((row) => (
            <div key={row.label} className="panel-line rounded-[24px] p-4">
              <div className="flex items-center justify-between gap-4 text-sm text-text-primary">
                <span>{row.label}</span>
                <span className="font-mono">{toPercent(row.value)}%</span>
              </div>
              <div className="mt-3 h-3 overflow-hidden rounded-full bg-white/8">
                <div
                  className="h-full rounded-full bg-accent-primary transition-[width] duration-500"
                  style={{ width: `${toPercent(row.value)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <div className="panel-line rounded-[24px] p-4">
            <p className="text-sm text-text-secondary">텍스처 의존도</p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {textureDependencyPercent}%
            </p>
          </div>
          <div className="panel-line rounded-[24px] p-4">
            <p className="text-sm text-text-secondary">크기 의존도</p>
            <p className="mt-2 text-2xl font-semibold text-text-primary">
              {sizeDependencyPercent}%
            </p>
          </div>
        </div>

        {interpretation ? (
          <p className="mt-4 text-sm leading-6 text-text-secondary">{interpretation}</p>
        ) : null}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row">
        <button
          className="rounded-[22px] bg-accent-primary px-5 py-3 text-sm font-semibold text-[#052017] transition-transform duration-200 hover:-translate-y-0.5"
          onClick={handleSaveScreenshot}
          type="button"
        >
          {isSaving ? "저장 중..." : "스크린샷 저장"}
        </button>
        <button
          className="panel-line rounded-[22px] px-5 py-3 text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-white/20 hover:bg-white/8"
          onClick={onRetry}
          type="button"
        >
          다시 하기
        </button>
        <button
          className="panel-line rounded-[22px] px-5 py-3 text-sm font-semibold text-text-primary transition-colors duration-200 hover:border-white/20 hover:bg-white/8"
          onClick={onLearnMore}
          type="button"
        >
          원리 알아보기
        </button>
      </div>
    </div>
  );
}
