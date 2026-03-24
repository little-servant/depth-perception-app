import type { SceneObjectProps } from "@/types";

type PlantProps = SceneObjectProps;

export function Plant({
  position,
  opacity = 1,
  castShadow = false,
  receiveShadow = false,
}: PlantProps) {
  const materialProps = opacity < 1 ? { transparent: true, opacity } : {};

  return (
    <group position={position}>
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0.21, 0]}>
        <cylinderGeometry args={[0.28, 0.2, 0.42, 24]} />
        <meshStandardMaterial color="#8b4513" roughness={0.86} {...materialProps} />
      </mesh>

      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0.43, 0]}>
        <cylinderGeometry args={[0.27, 0.27, 0.04, 24]} />
        <meshStandardMaterial color="#3d2b1a" roughness={0.95} {...materialProps} />
      </mesh>

      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0.72, 0]}>
        <cylinderGeometry args={[0.03, 0.03, 0.55, 14]} />
        <meshStandardMaterial color="#2d5a27" roughness={0.72} {...materialProps} />
      </mesh>

      <mesh castShadow={castShadow} position={[0.02, 1.12, 0.02]}>
        <sphereGeometry args={[0.32, 24, 24]} />
        <meshStandardMaterial color="#2d7a2d" roughness={0.78} {...materialProps} />
      </mesh>

      <mesh castShadow={castShadow} position={[-0.24, 1.02, 0.16]}>
        <sphereGeometry args={[0.28, 22, 22]} />
        <meshStandardMaterial color="#3a8a30" roughness={0.76} {...materialProps} />
      </mesh>

      <mesh castShadow={castShadow} position={[0.26, 0.98, -0.12]}>
        <sphereGeometry args={[0.24, 20, 20]} />
        <meshStandardMaterial color="#256020" roughness={0.8} {...materialProps} />
      </mesh>
    </group>
  );
}
