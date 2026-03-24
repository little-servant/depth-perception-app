import type { SceneObjectProps } from "@/types";

type LampProps = SceneObjectProps;

export function Lamp({
  position,
  opacity = 1,
  castShadow = false,
  receiveShadow = false,
}: LampProps) {
  const materialProps = opacity < 1 ? { transparent: true, opacity } : {};

  return (
    <group position={position}>
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0.03, 0]}>
        <cylinderGeometry args={[0.25, 0.25, 0.06, 24]} />
        <meshStandardMaterial
          color="#444"
          roughness={0.58}
          metalness={0.28}
          {...materialProps}
        />
      </mesh>

      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0.93, 0]}>
        <cylinderGeometry args={[0.025, 0.025, 1.8, 20]} />
        <meshStandardMaterial
          color="#555"
          roughness={0.34}
          metalness={0.42}
          {...materialProps}
        />
      </mesh>

      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 1.95, 0]}>
        <cylinderGeometry args={[0, 0.38, 0.42, 28]} />
        <meshStandardMaterial
          color="#ddbb66"
          emissive="#ffcc77"
          emissiveIntensity={0.45}
          roughness={0.72}
          {...materialProps}
        />
      </mesh>

      <pointLight
        castShadow={castShadow}
        color="#ffcc77"
        decay={2}
        distance={9}
        intensity={1.4}
        position={[0, 1.85, 0]}
      />
    </group>
  );
}
