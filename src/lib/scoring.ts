import type { TestCondition, TestResult, TestTrial, TrialResult } from "@/types";

export function calculateTestResult(
  trials: TestTrial[],
  results: TrialResult[],
): TestResult {
  const accuracyFor = (condition: TestCondition): number => {
    const conditionTrials = trials.filter((trial) => trial.condition === condition);
    if (conditionTrials.length === 0) {
      return 0;
    }

    const conditionIds = new Set(conditionTrials.map((trial) => trial.id));
    const correctCount = results.filter((result) => {
      return conditionIds.has(result.trialId) && result.correct;
    }).length;

    return correctCount / conditionTrials.length;
  };

  const baseline = accuracyFor("baseline");
  const noTexture = accuracyFor("noTexture");
  const distortedSize = accuracyFor("distortedSize");

  return {
    baselineAccuracy: baseline,
    noTextureAccuracy: noTexture,
    distortedSizeAccuracy: distortedSize,
    cueDependency: {
      texture: Math.max(0, baseline - noTexture),
      size: Math.max(0, baseline - distortedSize),
    },
    overallScore: (baseline + noTexture + distortedSize) / 3,
  };
}
