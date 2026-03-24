export type TabId = "explore" | "test";

export type DepthCueState = {
  perspective: boolean;
  occlusion: boolean;
  shadows: boolean;
  atmospheric: boolean;
  textureGradient: boolean;
  relativeSize: boolean;
  motionParallax: boolean;
};

export type ScenePerformance = {
  averageFps: number;
  minimumFps: number;
  sampleSeconds: number;
  meetsTarget: boolean;
};

export type SceneObjectProps = {
  position?: [number, number, number];
  opacity?: number;
  castShadow?: boolean;
  receiveShadow?: boolean;
};

export type POEStage = "idle" | "observe" | "explain";

export type CuePOEState = {
  stage: POEStage;
  prediction: number | null;
};

export type POEStateMap = Record<keyof DepthCueState, CuePOEState>;

export type TestCondition = "baseline" | "noTexture" | "distortedSize";

export type TestTrial = {
  id: number;
  condition: TestCondition;
  objectAZ: number;
  objectBZ: number;
  objectAScale: number;
  objectBScale: number;
  correctAnswer: "A" | "B";
};

export type TrialResult = {
  trialId: number;
  userAnswer: "A" | "B";
  correct: boolean;
  responseTimeMs: number;
};

export type TestResult = {
  baselineAccuracy: number;
  noTextureAccuracy: number;
  distortedSizeAccuracy: number;
  cueDependency: { texture: number; size: number };
  overallScore: number;
};
