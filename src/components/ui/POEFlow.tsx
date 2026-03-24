"use client";

import { motion } from "framer-motion";

import type { DepthCue } from "@/data/cues";

type POEFlowProps = {
  cue: DepthCue;
  onPredict: (answerIndex: number) => void;
  onDismiss: () => void;
};

export function POEFlow({ cue, onPredict, onDismiss }: POEFlowProps) {
  return (
    <motion.div
      animate={{ opacity: 1 }}
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/65 px-4"
      exit={{ opacity: 0 }}
      initial={{ opacity: 0 }}
      onClick={onDismiss}
    >
      <motion.div
        animate={{ opacity: 1, scale: 1 }}
        className="panel-surface w-full max-w-xl rounded-[32px] border border-white/10 p-6 sm:p-8"
        exit={{ opacity: 0, scale: 0.95 }}
        initial={{ opacity: 0, scale: 0.95 }}
        onClick={(event) => event.stopPropagation()}
        role="dialog"
        transition={{ duration: 0.18 }}
      >
        <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-primary">
          Predict
        </p>
        <h3 className="mt-3 text-2xl font-semibold tracking-[-0.04em] text-text-primary">
          {cue.prediction.questionKo}
        </h3>
        <p className="mt-3 text-sm leading-7 text-text-secondary">
          먼저 결과를 예측해 본 뒤 장면 변화를 관찰해 보세요.
        </p>

        <div className="mt-6 grid gap-3">
          {cue.prediction.options.map((option, index) => (
            <button
              key={option}
              className="panel-line rounded-[22px] px-4 py-4 text-left text-sm leading-6 text-text-primary transition-colors duration-200 hover:border-white/20 hover:bg-white/8"
              onClick={() => onPredict(index)}
              type="button"
            >
              <span className="mr-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent-secondary">
                {index + 1}
              </span>
              {option}
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
}
