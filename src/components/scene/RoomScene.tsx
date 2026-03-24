"use client";

import { useEffect, useMemo, useRef, useState, type ReactNode } from "react";
import { OrthographicCamera, PerspectiveCamera } from "@react-three/drei";
import { Canvas, type ThreeElements, useFrame } from "@react-three/fiber";
import { Bloom, EffectComposer, SSAO, Vignette } from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";
import * as THREE from "three";

import {
  Bookshelf,
  Lamp,
  Plant,
  Sofa,
  Table,
  WindowFrame,
} from "@/components/scene/objects";
import { defaultDepthCueState } from "@/hooks/useDepthCues";
import type { DepthCueState, ScenePerformance } from "@/types";

type RoomSceneProps = {
  onPerformanceSample?: (sample: ScenePerformance) => void;
  cues?: DepthCueState;
  gyroscope?: {
    beta: number;
    gamma: number;
  } | null;
};

type CameraRigProps = {
  gyroscope: RoomSceneProps["gyroscope"];
  motionParallax: boolean;
};

type SceneObjectWrapperProps = {
  position: [number, number, number];
  rotation?: ThreeElements["group"]["rotation"];
  relativeSize: boolean;
  children: ReactNode;
};

type SceneObjectTransform = {
  position: [number, number, number];
  rotation?: [number, number, number];
};

const baseCameraPosition = new THREE.Vector3(0, 4.1, 11.8);
const baseCameraHeight = 4.1;
const baseCameraZ = 11.8;
const baseTargetHeight = 1.6;
const baseTargetZ = -3.8;
const sceneObjectTransforms: Record<string, SceneObjectTransform> = {
  windowFrame: { position: [0.2, 6.7, -9.78] },
  bookshelf: { position: [6.8, 0, -6.3], rotation: [0, -0.18, 0] },
  plant: { position: [-5.7, 0, -4.2] },
  table: { position: [0.4, 0, -1.6], rotation: [0, 0.12, 0] },
  lamp: { position: [-6.3, 0, 1.2] },
  sofa: { position: [-4.2, 0, 2.6], rotation: [0, 0.18, 0] },
};
const relativeSizeDistances = Object.values(sceneObjectTransforms).map(({ position }) => {
  return baseCameraPosition.distanceTo(new THREE.Vector3(...position));
});
const nearestObjectDistance = Math.min(...relativeSizeDistances);
const farthestObjectDistance = Math.max(...relativeSizeDistances);

function getRelativeSizeCompensation(position: [number, number, number]) {
  const distance = baseCameraPosition.distanceTo(new THREE.Vector3(...position));

  if (nearestObjectDistance === farthestObjectDistance) {
    return 1;
  }

  const normalizedDistance = THREE.MathUtils.inverseLerp(
    nearestObjectDistance,
    farthestObjectDistance,
    distance,
  );

  return THREE.MathUtils.lerp(0.72, 1.52, normalizedDistance);
}

function SceneObjectWrapper({
  position,
  rotation,
  relativeSize,
  children,
}: SceneObjectWrapperProps) {
  const groupRef = useRef<THREE.Group>(null);
  const compensatedScale = useMemo(() => {
    return getRelativeSizeCompensation(position);
  }, [position]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) {
      return;
    }

    const targetScale = relativeSize ? 1 : compensatedScale;
    const nextScale = THREE.MathUtils.damp(group.scale.x, targetScale, 4.4, delta);
    group.scale.setScalar(nextScale);
  });

  return (
    <group position={position} ref={groupRef} rotation={rotation}>
      {children}
    </group>
  );
}

function CameraRig({ gyroscope, motionParallax }: CameraRigProps) {
  const desiredPosition = useRef(new THREE.Vector3());
  const desiredTarget = useRef(new THREE.Vector3());
  const neutralGyroscope = useRef<RoomSceneProps["gyroscope"]>(null);

  useFrame((state, delta) => {
    const ease = 1 - Math.exp(-delta * 2.6);
    let swayInputX = state.pointer.x;
    let swayInputY = state.pointer.y;

    if (gyroscope) {
      if (neutralGyroscope.current === null || !motionParallax) {
        neutralGyroscope.current = gyroscope;
      }

      const neutral = neutralGyroscope.current;
      if (neutral) {
        swayInputX = THREE.MathUtils.clamp((gyroscope.gamma - neutral.gamma) / 18, -1, 1);
        swayInputY = THREE.MathUtils.clamp((gyroscope.beta - neutral.beta) / 24, -1, 1);
      }
    } else {
      neutralGyroscope.current = null;
    }

    const swayStrength = motionParallax ? 1 : 0;
    const swayX = swayInputX * 0.85 * swayStrength;
    const swayY = swayInputY * 0.42 * swayStrength;

    desiredPosition.current.set(swayX, baseCameraHeight + swayY * 0.35, baseCameraZ);
    desiredTarget.current.set(swayX * 0.45, baseTargetHeight + swayY * 0.22, baseTargetZ);

    state.camera.position.lerp(desiredPosition.current, ease);
    state.camera.lookAt(desiredTarget.current);
  });

  return null;
}

function CheckerFloor({ textured }: { textured: boolean }) {
  const texture = useMemo(() => {
    if (!textured) {
      return null;
    }

    const size = 256;
    const cells = 8;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;

    const context = canvas.getContext("2d");
    if (!context) {
      return null;
    }

    const cellSize = size / cells;

    for (let y = 0; y < cells; y += 1) {
      for (let x = 0; x < cells; x += 1) {
        context.fillStyle = (x + y) % 2 === 0 ? "#283241" : "#121821";
        context.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }

    context.strokeStyle = "rgba(255,255,255,0.08)";
    context.lineWidth = 2;
    context.strokeRect(0, 0, size, size);

    const nextTexture = new THREE.CanvasTexture(canvas);
    nextTexture.wrapS = THREE.RepeatWrapping;
    nextTexture.wrapT = THREE.RepeatWrapping;
    nextTexture.repeat.set(16, 16);
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.anisotropy = 4;

    return nextTexture;
  }, [textured]);

  useEffect(() => {
    return () => {
      texture?.dispose();
    };
  }, [texture]);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow position={[0, 0, 0]}>
      <planeGeometry args={[30, 24]} />
      <meshStandardMaterial
        color={textured ? "#18202c" : "#1a1a24"}
        map={texture ?? undefined}
        roughness={0.95}
        metalness={0.05}
      />
    </mesh>
  );
}

function Wall(props: Omit<ThreeElements["mesh"], "children"> & { color: string }) {
  const { color, ...rest } = props;

  return (
    <mesh receiveShadow {...rest}>
      <planeGeometry args={[30, 12]} />
      <meshStandardMaterial color={color} roughness={0.98} />
    </mesh>
  );
}

function RoomShell() {
  return (
    <>
      <Wall color="#202734" position={[0, 6, -10]} />
      <Wall color="#171d28" position={[-10, 6, -1]} rotation={[0, Math.PI / 2, 0]} />
      <Wall color="#171d28" position={[10, 6, -1]} rotation={[0, -Math.PI / 2, 0]} />
      <Wall color="#131922" position={[0, 12, -1]} rotation={[Math.PI / 2, 0, 0]} />

      <mesh receiveShadow position={[0, 0.01, -2.1]}>
        <boxGeometry args={[7, 0.02, 4.8]} />
        <meshStandardMaterial color="#4d3c35" roughness={0.98} />
      </mesh>
    </>
  );
}

function PerformanceSampler({
  onSample,
}: {
  onSample: (sample: ScenePerformance) => void;
}) {
  const elapsedRef = useRef(0);
  const framesRef = useRef(0);
  const minimumRef = useRef(Number.POSITIVE_INFINITY);

  useFrame((_, delta) => {
    const fps = 1 / Math.max(delta, 0.0001);
    elapsedRef.current += delta;
    framesRef.current += 1;
    minimumRef.current = Math.min(minimumRef.current, fps);

    if (elapsedRef.current < 1.5) {
      return;
    }

    const averageFps = Math.round(framesRef.current / elapsedRef.current);
    const minimumFps = Math.round(minimumRef.current);
    const sampleSeconds = Number(elapsedRef.current.toFixed(1));

    onSample({
      averageFps,
      minimumFps,
      sampleSeconds,
      meetsTarget: averageFps >= 58 && minimumFps >= 45,
    });

    elapsedRef.current = 0;
    framesRef.current = 0;
    minimumRef.current = Number.POSITIVE_INFINITY;
  });

  return null;
}

function SceneContent({
  onPerformanceSample,
  cues,
  gyroscope,
}: {
  onPerformanceSample: (sample: ScenePerformance) => void;
  cues: DepthCueState;
  gyroscope: RoomSceneProps["gyroscope"];
}) {
  const sceneOpacity = cues.occlusion ? 1 : 0.3;
  const aspect = 16 / 9;
  const orthoSize = Math.tan((58 * Math.PI) / 360) * baseCameraZ;

  return (
    <>
      <color attach="background" args={["#090b12"]} />
      {cues.atmospheric && <fog attach="fog" args={["#090b12", 15, 26]} />}

      {cues.perspective ? (
        <PerspectiveCamera makeDefault fov={58} position={[0, baseCameraHeight, baseCameraZ]} />
      ) : (
        <OrthographicCamera
          makeDefault
          bottom={-orthoSize}
          far={50}
          left={-orthoSize * aspect}
          near={1}
          position={[0, baseCameraHeight, baseCameraZ]}
          right={orthoSize * aspect}
          top={orthoSize}
        />
      )}
      <CameraRig gyroscope={gyroscope} motionParallax={cues.motionParallax} />
      <PerformanceSampler onSample={onPerformanceSample} />

      <ambientLight intensity={0.68} />
      <directionalLight
        castShadow={cues.shadows}
        intensity={1.55}
        position={[6.5, 9.5, 6.5]}
        shadow-bias={-0.00018}
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={1}
        shadow-camera-far={30}
        shadow-camera-top={11}
        shadow-camera-right={11}
        shadow-camera-bottom={-11}
        shadow-camera-left={-11}
      />

      <RoomShell />
      <CheckerFloor textured={cues.textureGradient} />
      <mesh
        position={[0, 0.01, -0.5]}
        receiveShadow={cues.shadows}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <planeGeometry args={[3.8, 2.6]} />
        <meshStandardMaterial color="#5c3d2e" roughness={0.97} />
      </mesh>

      <SceneObjectWrapper
        position={sceneObjectTransforms.windowFrame.position}
        relativeSize={cues.relativeSize}
      >
        <WindowFrame
          castShadow={cues.shadows}
          opacity={sceneOpacity}
          receiveShadow={cues.shadows}
        />
      </SceneObjectWrapper>
      <SceneObjectWrapper
        position={sceneObjectTransforms.bookshelf.position}
        relativeSize={cues.relativeSize}
        rotation={sceneObjectTransforms.bookshelf.rotation}
      >
        <Bookshelf
          castShadow={cues.shadows}
          opacity={sceneOpacity}
          receiveShadow={cues.shadows}
        />
      </SceneObjectWrapper>
      <SceneObjectWrapper
        position={sceneObjectTransforms.plant.position}
        relativeSize={cues.relativeSize}
      >
        <Plant castShadow={cues.shadows} opacity={sceneOpacity} receiveShadow={cues.shadows} />
      </SceneObjectWrapper>
      <SceneObjectWrapper
        position={sceneObjectTransforms.table.position}
        relativeSize={cues.relativeSize}
        rotation={sceneObjectTransforms.table.rotation}
      >
        <Table castShadow={cues.shadows} opacity={sceneOpacity} receiveShadow={cues.shadows} />
      </SceneObjectWrapper>
      <SceneObjectWrapper
        position={sceneObjectTransforms.lamp.position}
        relativeSize={cues.relativeSize}
      >
        <Lamp castShadow={cues.shadows} opacity={sceneOpacity} receiveShadow={cues.shadows} />
      </SceneObjectWrapper>
      <SceneObjectWrapper
        position={sceneObjectTransforms.sofa.position}
        relativeSize={cues.relativeSize}
        rotation={sceneObjectTransforms.sofa.rotation}
      >
        <Sofa castShadow={cues.shadows} opacity={sceneOpacity} receiveShadow={cues.shadows} />
      </SceneObjectWrapper>

      <EffectComposer depthBuffer enableNormalPass>
        <SSAO
          samples={16}
          radius={0.05}
          intensity={18}
          luminanceInfluence={0.6}
          bias={0.04}
        />
        <Bloom luminanceThreshold={0.55} intensity={0.3} mipmapBlur />
        <Vignette
          offset={0.15}
          darkness={0.6}
          blendFunction={BlendFunction.NORMAL}
        />
      </EffectComposer>
    </>
  );
}

export function RoomScene({
  onPerformanceSample,
  cues = defaultDepthCueState,
  gyroscope = null,
}: RoomSceneProps) {
  const [sample, setSample] = useState<ScenePerformance | null>(null);

  const handlePerformanceSample = (nextSample: ScenePerformance) => {
    setSample(nextSample);
    onPerformanceSample?.(nextSample);
  };

  return (
    <div className="scene-shell relative h-[58vh] min-h-[460px] w-full md:h-[64vh] md:min-h-[560px]">
      <Canvas
        shadows
        dpr={[1, 1.35]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <SceneContent
          cues={cues}
          gyroscope={gyroscope}
          onPerformanceSample={handlePerformanceSample}
        />
      </Canvas>

      <div className="pointer-events-none absolute left-4 top-4 rounded-2xl border border-white/10 bg-black/35 px-4 py-3 font-mono text-xs text-text-primary backdrop-blur-sm">
        <p className="text-[10px] uppercase tracking-[0.3em] text-text-secondary">
          FPS sample
        </p>
        <p className="mt-2">
          평균{" "}
          <span className={sample?.meetsTarget ? "text-accent-primary" : "text-accent-secondary"}>
            {sample?.averageFps ?? "--"}
          </span>
        </p>
        <p className="mt-1 text-text-secondary">
          최저 {sample?.minimumFps ?? "--"} / {sample?.sampleSeconds ?? "--"}s
        </p>
      </div>
    </div>
  );
}
