"use client";

import { useEffect, useMemo } from "react";
import { Html, PerspectiveCamera } from "@react-three/drei";
import { Canvas, type ThreeElements, useFrame } from "@react-three/fiber";
import * as THREE from "three";

import {
  Lamp,
  Plant,
  Table,
  WindowFrame,
} from "@/components/scene/objects";
import type { TestTrial } from "@/types";

type TrialSceneProps = {
  trial: TestTrial;
  onReady: () => void;
};

type TrialStimulusProps = {
  label: "A" | "B";
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
};

function CameraAim() {
  useFrame((state) => {
    state.camera.lookAt(0, 0.95, -1.8);
  });

  return null;
}

function TrialFloor({ textured }: { textured: boolean }) {
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
    nextTexture.repeat.set(12, 10);
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
    <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[22, 16]} />
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

function TrialShell() {
  return (
    <>
      <Wall color="#202734" position={[0, 6, -10]} />
      <Wall color="#171d28" position={[-10, 6, -1]} rotation={[0, Math.PI / 2, 0]} />
      <Wall color="#171d28" position={[10, 6, -1]} rotation={[0, -Math.PI / 2, 0]} />

      <mesh receiveShadow position={[0, 0.01, -2.1]}>
        <boxGeometry args={[7.4, 0.02, 4.8]} />
        <meshStandardMaterial color="#4d3c35" roughness={0.98} />
      </mesh>

      <WindowFrame
        castShadow
        opacity={0.78}
        position={[0.18, 6.55, -9.78]}
        receiveShadow
      />
      <Plant castShadow receiveShadow position={[-6.1, 0, -4.4]} />
      <Lamp castShadow receiveShadow position={[6.2, 0, 0.9]} />
    </>
  );
}

function TrialStimulus({ label, position, rotation, scale }: TrialStimulusProps) {
  return (
    <group position={position} rotation={rotation} scale={scale}>
      <Table castShadow receiveShadow />
      <Html center distanceFactor={9} position={[0, 1.45, 0]}>
        <span className="rounded-full bg-black/45 px-2 py-1 text-[11px] font-semibold tracking-[0.24em] text-white">
          {label}
        </span>
      </Html>
    </group>
  );
}

export function TrialScene({ trial, onReady }: TrialSceneProps) {
  useEffect(() => {
    onReady();
  }, [onReady, trial.id]);

  return (
    <div className="h-[420px] w-full">
      <Canvas
        shadows
        dpr={[1, 1.35]}
        gl={{ antialias: true, powerPreference: "high-performance" }}
      >
        <color attach="background" args={["#090b12"]} />
        <PerspectiveCamera makeDefault fov={50} position={[0, 3.35, 10.2]} />
        <CameraAim />
        <ambientLight intensity={0.82} />
        <directionalLight
          castShadow
          intensity={1.45}
          position={[5.2, 8.6, 5.2]}
          shadow-bias={-0.00015}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={1}
          shadow-camera-far={28}
          shadow-camera-top={10}
          shadow-camera-right={10}
          shadow-camera-bottom={-10}
          shadow-camera-left={-10}
        />

        <TrialShell />
        <TrialFloor textured={trial.condition !== "noTexture"} />
        <TrialStimulus
          label="A"
          position={[-2.65, 0, trial.objectAZ]}
          rotation={[0, 0.12, 0]}
          scale={trial.objectAScale}
        />
        <TrialStimulus
          label="B"
          position={[2.65, 0, trial.objectBZ]}
          rotation={[0, -0.12, 0]}
          scale={trial.objectBScale}
        />
      </Canvas>
    </div>
  );
}
