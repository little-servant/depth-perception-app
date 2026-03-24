import type { ThreeElements } from "@react-three/fiber";

import type { SceneObjectProps } from "@/types";

type SofaProps = SceneObjectProps & Pick<ThreeElements["group"], "rotation">;

export function Sofa({
  position,
  rotation,
  opacity = 1,
  castShadow = true,
  receiveShadow = true,
}: SofaProps) {
  const materialProps = opacity < 1 ? { transparent: true, opacity } : {};
  const legs = [
    [-1.14, 0.09, 0.46],
    [1.14, 0.09, 0.46],
    [-1.14, 0.09, -0.46],
    [1.14, 0.09, -0.46],
  ] as const;

  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0.225, 0]}>
        <boxGeometry args={[2.6, 0.45, 1.1]} />
        <meshStandardMaterial color="#5c3d2e" roughness={0.9} {...materialProps} />
      </mesh>

      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0.675, -0.44]}>
        <boxGeometry args={[2.6, 0.7, 0.22]} />
        <meshStandardMaterial color="#4a3025" roughness={0.92} {...materialProps} />
      </mesh>

      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[-1.21, 0.275, 0]}>
        <boxGeometry args={[0.18, 0.55, 1.1]} />
        <meshStandardMaterial color="#4a3025" roughness={0.92} {...materialProps} />
      </mesh>

      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[1.21, 0.275, 0]}>
        <boxGeometry args={[0.18, 0.55, 1.1]} />
        <meshStandardMaterial color="#4a3025" roughness={0.92} {...materialProps} />
      </mesh>

      {legs.map((legPosition, index) => (
        <mesh
          key={index}
          castShadow={castShadow}
          receiveShadow={receiveShadow}
          position={legPosition}
        >
          <boxGeometry args={[0.1, 0.18, 0.1]} />
          <meshStandardMaterial color="#2a1810" roughness={0.72} {...materialProps} />
        </mesh>
      ))}
    </group>
  );
}
