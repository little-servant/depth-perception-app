import { useCallback, useRef, useState } from "react";

import { testTrials } from "@/data/testTrials";
import { calculateTestResult } from "@/lib/scoring";
import type { TestCondition, TestResult, TestTrial, TrialResult } from "@/types";

function shuffleTrials(trials: TestTrial[]): TestTrial[] {
  const shuffled = [...trials];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export function useTestSession() {
  const [shuffled, setShuffled] = useState(() => shuffleTrials(testTrials));
  const [trialIndex, setTrialIndex] = useState(0);
  const [results, setResults] = useState<TrialResult[]>([]);
  const [completed, setCompleted] = useState(false);
  const startTimeRef = useRef<number | null>(null);

  const currentTrial: TestTrial | null = shuffled[trialIndex] ?? null;
  const currentCondition: TestCondition | null = currentTrial?.condition ?? null;
  const testResult: TestResult | null = completed
    ? calculateTestResult(testTrials, results)
    : null;

  const startTrial = useCallback(() => {
    startTimeRef.current = Date.now();
  }, []);

  const answerTrial = useCallback(
    (answer: "A" | "B") => {
      if (!currentTrial || startTimeRef.current === null) {
        return;
      }

      const responseTimeMs = Date.now() - startTimeRef.current;
      const correct = answer === currentTrial.correctAnswer;
      const newResult: TrialResult = {
        trialId: currentTrial.id,
        userAnswer: answer,
        correct,
        responseTimeMs,
      };

      startTimeRef.current = null;
      setResults((prev) => [...prev, newResult]);

      if (trialIndex + 1 >= testTrials.length) {
        setCompleted(true);
      } else {
        setTrialIndex((prev) => prev + 1);
      }
    },
    [currentTrial, trialIndex],
  );

  const reset = useCallback(() => {
    setShuffled(shuffleTrials(testTrials));
    setTrialIndex(0);
    setResults([]);
    setCompleted(false);
    startTimeRef.current = null;
  }, []);

  return {
    currentTrial,
    currentCondition,
    trialIndex,
    totalTrials: shuffled.length,
    results,
    completed,
    testResult,
    startTrial,
    answerTrial,
    reset,
  };
}
