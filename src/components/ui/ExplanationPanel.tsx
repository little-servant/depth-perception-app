"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

import type { DepthCue } from "@/data/cues";
import type { POEStateMap } from "@/types";

type ExplanationPanelProps = {
  cues: DepthCue[];
  poeState: POEStateMap;
};

export function ExplanationPanel({ cues, poeState }: ExplanationPanelProps) {
  const [openCueId, setOpenCueId] = useState<DepthCue["id"] | null>(null);
  const visibleCues = cues.filter((cue) => {
    const stage = poeState[cue.id].stage;
    return stage === "observe" || stage === "explain";
  });

  return (
    <section className="scene-card rounded-[28px] p-5">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-deep">
          Explanation panel
        </p>
        <p className="mt-2 text-sm leading-6 text-text-secondary">
          예측 이후에는 단서가 왜 그렇게 작동하는지 원리와 예시를 함께 확인할 수 있습니다.
        </p>
      </div>

      {visibleCues.length === 0 ? (
        <div className="panel-line mt-5 rounded-[20px] p-4 text-sm leading-6 text-text-secondary">
          아직 학습을 시작한 단서가 없습니다. 토글을 눌러 예측을 시작해 보세요.
        </div>
      ) : (
        <div className="mt-5 grid gap-3">
          {visibleCues.map((cue) => {
            const cueState = poeState[cue.id];
            const isCorrect = cueState.prediction === cue.prediction.correctIndex;
            const isOpen = openCueId === cue.id;
            const feedback =
              cueState.prediction === null
                ? "이 단서는 이전 학습 기록으로 복원되었습니다."
                : isCorrect
                  ? "정확히 맞췄습니다! ✓"
                  : `아쉽네요. 정답은 ${cue.prediction.options[cue.prediction.correctIndex]}입니다.`;
            const feedbackClass =
              cueState.prediction === null
                ? "text-text-secondary"
                : isCorrect
                  ? "text-accent-primary"
                  : "text-text-secondary";

            return (
              <div key={cue.id} className="panel-line overflow-hidden rounded-[22px]">
                <button
                  className="w-full px-4 py-4 text-left"
                  onClick={() => setOpenCueId((prev) => (prev === cue.id ? null : cue.id))}
                  type="button"
                >
                  <p className="text-sm font-semibold text-text-primary">{cue.nameKo}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-text-secondary">
                    {cue.nameEn}
                  </p>
                  <p className={`mt-3 text-sm leading-6 ${feedbackClass}`}>{feedback}</p>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      animate={{ height: "auto", opacity: 1 }}
                      className="overflow-hidden"
                      exit={{ height: 0, opacity: 0 }}
                      initial={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <div className="border-t border-white/8 px-4 pb-4 pt-1 text-sm leading-6 text-text-secondary">
                        <p className="mt-3 text-text-primary">{cue.explanation.mechanismKo}</p>
                        <ul className="mt-4 list-disc space-y-2 pl-5">
                          {cue.explanation.examplesKo.map((example) => (
                            <li key={example}>{example}</li>
                          ))}
                        </ul>
                        <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.24em] text-accent-secondary">
                          Representative Study
                        </p>
                        <p className="mt-2 break-words text-xs leading-5 text-text-secondary/90">
                          {cue.explanation.referenceApa}
                        </p>
                        <p className="mt-3 rounded-2xl bg-white/4 px-3 py-3 text-sm text-text-primary">
                          {cue.explanation.funFactKo}
                        </p>
                      </div>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
