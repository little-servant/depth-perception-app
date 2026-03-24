import type { SceneObjectProps } from "@/types";

type WindowFrameProps = SceneObjectProps;

export function WindowFrame({
  position,
  opacity = 1,
  castShadow = false,
  receiveShadow = false,
}: WindowFrameProps) {
  const materialProps = opacity < 1 ? { transparent: true, opacity } : {};
  const glassOpacity = 0.12 * opacity;
  const frameColor = "#3a3a3a";

  return (
    <group position={position}>
      <mesh receiveShadow={receiveShadow} position={[0, 0, -0.02]}>
        <planeGeometry args={[3.4, 2.4]} />
        <meshStandardMaterial
          color="#b8d8f0"
          emissive="#aaddff"
          emissiveIntensity={0.08}
          roughness={0.05}
          metalness={0.9}
          transparent
          opacity={glassOpacity}
        />
      </mesh>

      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 1.24, 0]}>
        <boxGeometry args={[3.58, 0.12, 0.1]} />
        <meshStandardMaterial color={frameColor} roughness={0.72} {...materialProps} />
      </mesh>

      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, -1.24, 0]}>
        <boxGeometry args={[3.58, 0.12, 0.1]} />
        <meshStandardMaterial color={frameColor} roughness={0.72} {...materialProps} />
      </mesh>

      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[-1.73, 0, 0]}>
        <boxGeometry args={[0.12, 2.58, 0.1]} />
        <meshStandardMaterial color={frameColor} roughness={0.72} {...materialProps} />
      </mesh>

      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[1.73, 0, 0]}>
        <boxGeometry args={[0.12, 2.58, 0.1]} />
        <meshStandardMaterial color={frameColor} roughness={0.72} {...materialProps} />
      </mesh>

      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0, 0.03]}>
        <boxGeometry args={[0.08, 2.42, 0.08]} />
        <meshStandardMaterial color={frameColor} roughness={0.7} {...materialProps} />
      </mesh>

      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 0, 0.03]}>
        <boxGeometry args={[3.38, 0.08, 0.08]} />
        <meshStandardMaterial color={frameColor} roughness={0.7} {...materialProps} />
      </mesh>
    </group>
  );
}
