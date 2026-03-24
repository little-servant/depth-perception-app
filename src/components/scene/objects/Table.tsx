import type { ThreeElements } from "@react-three/fiber";

import type { SceneObjectProps } from "@/types";

type TableProps = SceneObjectProps & Pick<ThreeElements["group"], "rotation">;

export function Table({
  position,
  rotation,
  opacity = 1,
  castShadow = true,
  receiveShadow = true,
}: TableProps) {
  const materialProps = opacity < 1 ? { transparent: true, opacity } : {};
  const legPositions = [
    [-0.7, 0.38, -0.325],
    [0.7, 0.38, -0.325],
    [-0.7, 0.38, 0.325],
    [0.7, 0.38, 0.325],
  ] as const;

  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0.76, 0]}>
        <boxGeometry args={[1.6, 0.06, 0.85]} />
        <meshStandardMaterial
          color="#8b6343"
          roughness={0.85}
          metalness={0.05}
          {...materialProps}
        />
      </mesh>

      {legPositions.map((legPosition, index) => (
        <mesh
          key={index}
          castShadow={castShadow}
          receiveShadow={receiveShadow}
          position={legPosition}
        >
          <cylinderGeometry args={[0.035, 0.035, 0.76, 20]} />
          <meshStandardMaterial color="#6b4c33" roughness={0.7} {...materialProps} />
        </mesh>
      ))}
    </group>
  );
}
