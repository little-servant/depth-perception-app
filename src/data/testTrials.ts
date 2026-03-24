import type { TestTrial } from "@/types";

export const testTrials: TestTrial[] = [
  { id: 1, condition: "baseline", objectAZ: 1.5, objectBZ: -3.0, objectAScale: 1.0, objectBScale: 1.0, correctAnswer: "A" },
  { id: 2, condition: "baseline", objectAZ: -2.5, objectBZ: 0.8, objectAScale: 1.0, objectBScale: 1.0, correctAnswer: "B" },
  { id: 3, condition: "baseline", objectAZ: 2.0, objectBZ: -1.5, objectAScale: 1.0, objectBScale: 1.0, correctAnswer: "A" },
  { id: 4, condition: "baseline", objectAZ: -3.5, objectBZ: 1.2, objectAScale: 1.0, objectBScale: 1.0, correctAnswer: "B" },
  { id: 5, condition: "baseline", objectAZ: 0.5, objectBZ: -2.8, objectAScale: 1.0, objectBScale: 1.0, correctAnswer: "A" },
  { id: 6, condition: "noTexture", objectAZ: 1.5, objectBZ: -3.0, objectAScale: 1.0, objectBScale: 1.0, correctAnswer: "A" },
  { id: 7, condition: "noTexture", objectAZ: -2.5, objectBZ: 0.8, objectAScale: 1.0, objectBScale: 1.0, correctAnswer: "B" },
  { id: 8, condition: "noTexture", objectAZ: 2.0, objectBZ: -1.5, objectAScale: 1.0, objectBScale: 1.0, correctAnswer: "A" },
  { id: 9, condition: "noTexture", objectAZ: -3.5, objectBZ: 1.2, objectAScale: 1.0, objectBScale: 1.0, correctAnswer: "B" },
  { id: 10, condition: "noTexture", objectAZ: 0.5, objectBZ: -2.8, objectAScale: 1.0, objectBScale: 1.0, correctAnswer: "A" },
  { id: 11, condition: "distortedSize", objectAZ: 1.5, objectBZ: -3.0, objectAScale: 0.55, objectBScale: 1.0, correctAnswer: "A" },
  { id: 12, condition: "distortedSize", objectAZ: -2.5, objectBZ: 0.8, objectAScale: 1.0, objectBScale: 0.55, correctAnswer: "B" },
  { id: 13, condition: "distortedSize", objectAZ: 2.0, objectBZ: -1.5, objectAScale: 0.55, objectBScale: 1.0, correctAnswer: "A" },
  { id: 14, condition: "distortedSize", objectAZ: -3.5, objectBZ: 1.2, objectAScale: 1.0, objectBScale: 0.55, correctAnswer: "B" },
  { id: 15, condition: "distortedSize", objectAZ: 0.5, objectBZ: -2.8, objectAScale: 0.55, objectBScale: 1.0, correctAnswer: "A" },
];
