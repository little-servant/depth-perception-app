import { useCallback, useState } from "react";
import type { DepthCueState } from "@/types";

export type { DepthCueState } from "@/types";

export const defaultDepthCueState: DepthCueState = {
  perspective: true,
  occlusion: true,
  shadows: true,
  atmospheric: true,
  textureGradient: true,
  relativeSize: true,
  motionParallax: true,
};

export function useDepthCues() {
  const [cues, setCues] = useState<DepthCueState>(defaultDepthCueState);

  const toggle = useCallback((key: keyof DepthCueState) => {
    setCues((prev) => ({ ...prev, [key]: !prev[key] }));
  }, []);

  return { cues, toggle };
}
