"use client";

import {
  startTransition,
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
} from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";
import useSound from "use-sound";

import { cues as cueItems } from "@/data/cues";
import { ExplanationPanel } from "@/components/ui/ExplanationPanel";
import { POEFlow } from "@/components/ui/POEFlow";
import { TogglePanel } from "@/components/ui/TogglePanel";
import { useDeviceOrientation } from "@/hooks/useDeviceOrientation";
import { useDepthCues } from "@/hooks/useDepthCues";
import type { CuePOEState, DepthCueState, POEStateMap, ScenePerformance } from "@/types";

const RoomScene = dynamic(
  () => import("@/components/scene/RoomScene").then((mod) => mod.RoomScene),
  {
    ssr: false,
    loading: () => (
      <div className="panel-surface flex min-h-[460px] items-center justify-center rounded-[32px] text-sm text-text-secondary">
        장면을 준비하는 중입니다...
      </div>
    ),
  },
);

const storageKey = "dlab_poe_v1";
const toggleSoundVolume = 0.1;
const toggleBeepDurationSeconds = 0.08;
const emptyCompletedCueIds: Array<keyof DepthCueState> = [];
let cachedCompletedCueIdsRaw: string | null | undefined;
let cachedCompletedCueIdsSnapshot: Array<keyof DepthCueState> = emptyCompletedCueIds;

const defaultPOEState: POEStateMap = {
  perspective: { stage: "idle", prediction: null },
  occlusion: { stage: "idle", prediction: null },
  shadows: { stage: "idle", prediction: null },
  atmospheric: { stage: "idle", prediction: null },
  textureGradient: { stage: "idle", prediction: null },
  relativeSize: { stage: "idle", prediction: null },
  motionParallax: { stage: "idle", prediction: null },
};

type POEOverrides = Partial<Record<keyof DepthCueState, CuePOEState>>;
type ToggleSoundKind = "on" | "off";
type ToggleSoundAvailability = "loading" | "ready" | "missing";
type ToggleSoundStatus = Record<ToggleSoundKind, ToggleSoundAvailability>;
type GyroscopeReading = {
  beta: number;
  gamma: number;
};
type DeviceOrientationPermissionState = "idle" | "granted" | "denied" | "unsupported";
type DeviceOrientationPermissionResponse = "granted" | "denied";
type AudioContextConstructor = typeof AudioContext;
type DeviceOrientationEventConstructor = typeof DeviceOrientationEvent & {
  requestPermission?: () => Promise<DeviceOrientationPermissionResponse>;
};
type BrowserWindow = Window &
  typeof globalThis & {
    webkitAudioContext?: AudioContextConstructor;
    DeviceOrientationEvent?: DeviceOrientationEventConstructor;
  };

function getAudioContextConstructor(): AudioContextConstructor | null {
  if (typeof window === "undefined") {
    return null;
  }

  const browserWindow = window as BrowserWindow;
  return window.AudioContext ?? browserWindow.webkitAudioContext ?? null;
}

function getDeviceOrientationEventConstructor(): DeviceOrientationEventConstructor | null {
  if (typeof window === "undefined") {
    return null;
  }

  const browserWindow = window as BrowserWindow;
  return browserWindow.DeviceOrientationEvent ?? null;
}

function subscribeToOrientationCapability(onStoreChange: () => void) {
  void onStoreChange;
  return () => {};
}

function readOrientationCapabilityKey() {
  const DeviceOrientationClass = getDeviceOrientationEventConstructor();
  const supported = DeviceOrientationClass !== null;
  const permissionRequired = typeof DeviceOrientationClass?.requestPermission === "function";

  return `${supported ? "1" : "0"}:${permissionRequired ? "1" : "0"}`;
}

function isCueId(value: string): value is keyof DepthCueState {
  return value in defaultPOEState;
}

function toFiniteNumber(value: unknown): number | null {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function createGyroscopeReading(beta: unknown, gamma: unknown): GyroscopeReading | null {
  const nextBeta = toFiniteNumber(beta);
  const nextGamma = toFiniteNumber(gamma);

  if (nextBeta === null || nextGamma === null) {
    return null;
  }

  return {
    beta: nextBeta,
    gamma: nextGamma,
  };
}

function readGyroscope(value: unknown): GyroscopeReading | null {
  if (!value || typeof value !== "object") {
    return null;
  }

  const record = value as Record<string, unknown>;
  const directReading = createGyroscopeReading(record.beta, record.gamma);
  if (directReading) {
    return directReading;
  }

  const nestedReadingKeys = ["orientation", "gyroscope"] as const;

  for (const key of nestedReadingKeys) {
    const nestedValue = record[key];
    if (!nestedValue || typeof nestedValue !== "object") {
      continue;
    }

    const nestedRecord = nestedValue as Record<string, unknown>;
    const nestedReading = createGyroscopeReading(nestedRecord.beta, nestedRecord.gamma);

    if (nestedReading) {
      return nestedReading;
    }
  }

  return null;
}

function readCompletedCueIds(): Array<keyof DepthCueState> {
  if (typeof window === "undefined") {
    return emptyCompletedCueIds;
  }

  const raw = window.localStorage.getItem(storageKey);
  if (raw === cachedCompletedCueIdsRaw) {
    return cachedCompletedCueIdsSnapshot;
  }

  cachedCompletedCueIdsRaw = raw;

  try {
    if (!raw) {
      cachedCompletedCueIdsSnapshot = emptyCompletedCueIds;
      return cachedCompletedCueIdsSnapshot;
    }

    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) {
      cachedCompletedCueIdsSnapshot = emptyCompletedCueIds;
      return cachedCompletedCueIdsSnapshot;
    }

    const nextCompletedCueIds = parsed.filter((value): value is keyof DepthCueState => {
      return typeof value === "string" && isCueId(value);
    });

    cachedCompletedCueIdsSnapshot =
      nextCompletedCueIds.length > 0 ? nextCompletedCueIds : emptyCompletedCueIds;

    return cachedCompletedCueIdsSnapshot;
  } catch {
    cachedCompletedCueIdsSnapshot = emptyCompletedCueIds;
    return cachedCompletedCueIdsSnapshot;
  }
}

function subscribeToCompletedCueIds(onStoreChange: () => void) {
  if (typeof window === "undefined") {
    return () => {};
  }

  const handleStorage = (event: StorageEvent) => {
    if (event.key === storageKey || event.key === null) {
      onStoreChange();
    }
  };

  window.addEventListener("storage", handleStorage);

  return () => {
    window.removeEventListener("storage", handleStorage);
  };
}

export default function ExplorePage() {
  const { cues, toggle } = useDepthCues();
  const deviceOrientation = useDeviceOrientation();
  const [performanceSample, setPerformanceSample] = useState<ScenePerformance | null>(null);
  const completedCueIds = useSyncExternalStore(
    subscribeToCompletedCueIds,
    readCompletedCueIds,
    () => emptyCompletedCueIds,
  );
  const orientationCapabilityKey = useSyncExternalStore(
    subscribeToOrientationCapability,
    readOrientationCapabilityKey,
    () => "0:0",
  );
  const [poeOverrides, setPoeOverrides] = useState<POEOverrides>({});
  const [pendingCueId, setPendingCueId] = useState<keyof DepthCueState | null>(null);
  const [toggleSoundStatus, setToggleSoundStatus] = useState<ToggleSoundStatus>({
    on: "loading",
    off: "loading",
  });
  const [fallbackGyroscope, setFallbackGyroscope] = useState<GyroscopeReading | null>(null);
  const [requestedGyroscopePermission, setRequestedGyroscopePermission] = useState<
    DeviceOrientationPermissionResponse | null
  >(null);
  const explainTimeoutRef = useRef<number | null>(null);
  const audioContextRef = useRef<AudioContext | null>(null);
  const lastGyroscopeRef = useRef<GyroscopeReading | null>(null);
  const [browserOrientationSupportedFlag, browserPermissionRequiredFlag] =
    orientationCapabilityKey.split(":");
  const browserOrientationSupported = browserOrientationSupportedFlag === "1";
  const browserPermissionRequired = browserPermissionRequiredFlag === "1";
  const hookSupported =
    typeof deviceOrientation.supported === "boolean" ? deviceOrientation.supported : false;
  const hookPermissionRequired =
    typeof deviceOrientation.permissionRequired === "boolean"
      ? deviceOrientation.permissionRequired
      : false;
  const rawGyroscopeFromHook = readGyroscope(deviceOrientation);
  const hookGyroscopeBeta = rawGyroscopeFromHook?.beta ?? null;
  const hookGyroscopeGamma = rawGyroscopeFromHook?.gamma ?? null;
  const hookGyroscope = useMemo(() => {
    if (hookGyroscopeBeta === null || hookGyroscopeGamma === null) {
      return null;
    }

    return {
      beta: hookGyroscopeBeta,
      gamma: hookGyroscopeGamma,
    };
  }, [hookGyroscopeBeta, hookGyroscopeGamma]);
  const orientationSupported =
    hookSupported || hookGyroscope !== null || browserOrientationSupported;
  const orientationPermissionRequired =
    hookPermissionRequired || browserPermissionRequired;
  const gyroscopePermission = useMemo<DeviceOrientationPermissionState>(() => {
    if (hookGyroscope) {
      return "granted";
    }

    if (!orientationSupported) {
      return "unsupported";
    }

    if (!orientationPermissionRequired) {
      return "granted";
    }

    return requestedGyroscopePermission ?? "idle";
  }, [
    hookGyroscope,
    orientationPermissionRequired,
    orientationSupported,
    requestedGyroscopePermission,
  ]);
  const gyroscope =
    hookGyroscope ?? (gyroscopePermission === "granted" ? fallbackGyroscope : null);

  const updateToggleSoundStatus = (
    kind: ToggleSoundKind,
    status: ToggleSoundAvailability,
  ) => {
    setToggleSoundStatus((prev) => {
      if (prev[kind] === status) {
        return prev;
      }

      return {
        ...prev,
        [kind]: status,
      };
    });
  };

  const [playOn, { sound: toggleOnSound }] = useSound("/sounds/toggle-on.mp3", {
    volume: toggleSoundVolume,
    interrupt: true,
    onload: () => {
      updateToggleSoundStatus("on", "ready");
    },
    onloaderror: () => {
      updateToggleSoundStatus("on", "missing");
    },
  });
  const [playOff, { sound: toggleOffSound }] = useSound("/sounds/toggle-off.mp3", {
    volume: toggleSoundVolume,
    interrupt: true,
    onload: () => {
      updateToggleSoundStatus("off", "ready");
    },
    onloaderror: () => {
      updateToggleSoundStatus("off", "missing");
    },
  });

  const poeState = useMemo<POEStateMap>(() => {
    const restoredState: POEStateMap = {
      ...defaultPOEState,
    };

    completedCueIds.forEach((cueId) => {
      restoredState[cueId] = {
        stage: "explain",
        prediction: null,
      };
    });

    return {
      perspective: poeOverrides.perspective ?? restoredState.perspective,
      occlusion: poeOverrides.occlusion ?? restoredState.occlusion,
      shadows: poeOverrides.shadows ?? restoredState.shadows,
      atmospheric: poeOverrides.atmospheric ?? restoredState.atmospheric,
      textureGradient: poeOverrides.textureGradient ?? restoredState.textureGradient,
      relativeSize: poeOverrides.relativeSize ?? restoredState.relativeSize,
      motionParallax: poeOverrides.motionParallax ?? restoredState.motionParallax,
    };
  }, [completedCueIds, poeOverrides]);

  useEffect(() => {
    lastGyroscopeRef.current = null;
  }, [gyroscopePermission]);

  useEffect(() => {
    if (hookGyroscope || gyroscopePermission !== "granted") {
      return;
    }

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      const nextGyroscope = createGyroscopeReading(event.beta, event.gamma);
      if (!nextGyroscope) {
        return;
      }

      const lastGyroscope = lastGyroscopeRef.current;
      if (
        lastGyroscope &&
        Math.abs(lastGyroscope.beta - nextGyroscope.beta) < 0.35 &&
        Math.abs(lastGyroscope.gamma - nextGyroscope.gamma) < 0.35
      ) {
        return;
      }

      lastGyroscopeRef.current = nextGyroscope;
      startTransition(() => {
        setFallbackGyroscope(nextGyroscope);
      });
    };

    window.addEventListener("deviceorientation", handleDeviceOrientation, true);

    return () => {
      window.removeEventListener("deviceorientation", handleDeviceOrientation, true);
    };
  }, [hookGyroscope, gyroscopePermission]);

  useEffect(() => {
    return () => {
      if (explainTimeoutRef.current !== null) {
        window.clearTimeout(explainTimeoutRef.current);
      }

      const audioContext = audioContextRef.current;
      audioContextRef.current = null;

      if (audioContext && audioContext.state !== "closed") {
        void audioContext.close().catch(() => {});
      }
    };
  }, []);

  const handleGyroscopePermission = async () => {
    const DeviceOrientationClass = getDeviceOrientationEventConstructor();

    if (!DeviceOrientationClass) {
      return;
    }

    if (typeof DeviceOrientationClass.requestPermission !== "function") {
      setRequestedGyroscopePermission("granted");
      return;
    }

    lastGyroscopeRef.current = null;
    setFallbackGyroscope(null);

    try {
      const permission = await DeviceOrientationClass.requestPermission();
      setRequestedGyroscopePermission(permission);
    } catch {
      setRequestedGyroscopePermission("denied");
    }
  };

  const persistCompletedCue = (cueId: keyof DepthCueState) => {
    const completedCueIds = new Set(readCompletedCueIds());
    completedCueIds.add(cueId);
    const nextCompletedCueIds = Array.from(completedCueIds);
    const nextCompletedCueIdsRaw = JSON.stringify(nextCompletedCueIds);

    cachedCompletedCueIdsRaw = nextCompletedCueIdsRaw;
    cachedCompletedCueIdsSnapshot = nextCompletedCueIds;
    window.localStorage.setItem(storageKey, nextCompletedCueIdsRaw);
  };

  const playSyntheticToggleSound = (kind: ToggleSoundKind) => {
    const AudioContextClass = getAudioContextConstructor();
    if (!AudioContextClass) {
      return;
    }

    const activeContext =
      audioContextRef.current && audioContextRef.current.state !== "closed"
        ? audioContextRef.current
        : new AudioContextClass();

    audioContextRef.current = activeContext;

    const playBeep = () => {
      const oscillator = activeContext.createOscillator();
      const gainNode = activeContext.createGain();
      const now = activeContext.currentTime;
      const startFrequency = kind === "on" ? 680 : 420;
      const endFrequency = kind === "on" ? 1120 : 260;

      oscillator.type = kind === "on" ? "triangle" : "sine";
      oscillator.frequency.setValueAtTime(startFrequency, now);
      oscillator.frequency.exponentialRampToValueAtTime(
        endFrequency,
        now + toggleBeepDurationSeconds,
      );

      gainNode.gain.setValueAtTime(0.0001, now);
      gainNode.gain.exponentialRampToValueAtTime(0.075, now + 0.008);
      gainNode.gain.exponentialRampToValueAtTime(0.0001, now + toggleBeepDurationSeconds);

      oscillator.connect(gainNode);
      gainNode.connect(activeContext.destination);
      oscillator.start(now);
      oscillator.stop(now + toggleBeepDurationSeconds + 0.01);
    };

    if (activeContext.state === "suspended") {
      void activeContext.resume().then(playBeep).catch(() => {});
      return;
    }

    playBeep();
  };

  const playToggleFeedback = (kind: ToggleSoundKind) => {
    const soundReady =
      kind === "on"
        ? toggleSoundStatus.on === "ready" && toggleOnSound !== null
        : toggleSoundStatus.off === "ready" && toggleOffSound !== null;

    if (soundReady) {
      if (kind === "on") {
        playOn();
      } else {
        playOff();
      }

      return;
    }

    playSyntheticToggleSound(kind);
  };

  const handleToggle = (key: keyof DepthCueState) => {
    const nextSound: ToggleSoundKind = cues[key] ? "off" : "on";
    playToggleFeedback(nextSound);

    if (poeState[key].stage === "idle") {
      setPendingCueId(key);
      return;
    }

    toggle(key);
  };

  const handlePredict = (answerIndex: number) => {
    if (!pendingCueId) {
      return;
    }

    const cueId = pendingCueId;

    setPoeOverrides((prev) => ({
      ...prev,
      [cueId]: { stage: "observe", prediction: answerIndex },
    }));
    toggle(cueId);
    setPendingCueId(null);

    if (explainTimeoutRef.current !== null) {
      window.clearTimeout(explainTimeoutRef.current);
    }

    explainTimeoutRef.current = window.setTimeout(() => {
      setPoeOverrides((prev) => ({
        ...prev,
        [cueId]: {
          stage: "explain",
          prediction: prev[cueId]?.prediction ?? answerIndex,
        },
      }));
      persistCompletedCue(cueId);
    }, 3000);
  };

  const pendingCue = pendingCueId ? cueItems.find((cue) => cue.id === pendingCueId) : null;
  const shouldShowGyroscopePrompt =
    orientationSupported &&
    orientationPermissionRequired &&
    gyroscopePermission !== "granted";
  const gyroscopePromptDescription =
    gyroscopePermission === "denied"
      ? "자이로 권한이 거부되었습니다. 브라우저 설정에서 모션 센서 권한을 허용한 뒤 새로고침해 주세요. 현재는 마우스와 터치 기반 시점 이동만 사용 중입니다."
      : "모바일에서는 자이로를 허용하면 폰을 기울여 장면을 둘러볼 수 있습니다.";

  return (
    <>
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.5fr)_360px]">
        <div className="space-y-4">
          <div
            aria-label="깊이 단서 변화를 관찰할 수 있는 3D 실험 장면"
            className="panel-surface overflow-hidden rounded-[32px]"
            role="img"
          >
            <RoomScene
              cues={cues}
              gyroscope={gyroscope}
              onPerformanceSample={setPerformanceSample}
            />
          </div>

          {shouldShowGyroscopePrompt ? (
            <div className="panel-surface rounded-[28px] p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.22em] text-accent-deep">
                Gyroscope
              </p>
              <p className="mt-3 text-sm leading-6 text-text-secondary">
                {gyroscopePromptDescription}
              </p>
              <button
                className="mt-4 flex min-h-[44px] items-center justify-center rounded-full border border-white/12 bg-white/6 px-4 py-3 text-sm font-medium text-text-primary transition-colors duration-200 hover:border-white/20 hover:bg-white/10"
                onClick={() => {
                  void handleGyroscopePermission();
                }}
                type="button"
              >
                {gyroscopePermission === "denied" ? "설정 안내 확인" : "자이로 활성화"}
              </button>
            </div>
          ) : null}
        </div>

        <aside className="panel-surface flex flex-col gap-5 rounded-[32px] p-6 sm:p-8">
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-[0.32em] text-accent-primary">
              Explore
            </p>
            <h2 className="text-balance text-3xl font-semibold tracking-[-0.04em] text-text-primary">
              깊이 단서를 예측하고 관찰하며 원리까지 연결해서 학습할 수 있습니다
            </h2>
            <p className="text-sm leading-7 text-text-secondary">
              7개 깊이 단서를 개별적으로 켜고 끄며 장면 변화를 먼저 예측하고, 이어서
              작동 원리와 실제 사례까지 확인해 보세요.
            </p>
          </div>

          <TogglePanel cues={cues} onToggle={handleToggle} />
          <ExplanationPanel cues={cueItems} poeState={poeState} />

          <div className="panel-line rounded-[24px] p-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-accent-secondary">
              Performance
            </p>
            <p className="mt-2 text-sm leading-6 text-text-primary">
              2048 그림자 맵과 포스트프로세싱을 더했지만 보수적인 DPR과 단순 기하 구조로
              프레임 예산을 관리하고 있습니다.
            </p>
            <div className="mt-4 grid grid-cols-2 gap-3 font-mono text-xs">
              <div className="rounded-2xl border border-white/10 bg-white/4 px-3 py-2">
                <p className="text-text-secondary">AVG FPS</p>
                <p className="mt-1 text-lg text-text-primary">
                  {performanceSample?.averageFps ?? "--"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/4 px-3 py-2">
                <p className="text-text-secondary">MIN FPS</p>
                <p className="mt-1 text-lg text-text-primary">
                  {performanceSample?.minimumFps ?? "--"}
                </p>
              </div>
            </div>
            <p className="mt-3 text-xs leading-5 text-text-secondary">
              최근 {performanceSample?.sampleSeconds ?? "--"}초 표본 기준입니다.
              목표는 평균 58fps 이상, 최저 45fps 이상으로 잡았습니다.
            </p>
          </div>
        </aside>
      </section>

      <AnimatePresence>
        {pendingCue ? (
          <POEFlow
            cue={pendingCue}
            onDismiss={() => setPendingCueId(null)}
            onPredict={handlePredict}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
