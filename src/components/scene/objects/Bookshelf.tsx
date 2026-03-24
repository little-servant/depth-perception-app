import type { ThreeElements } from "@react-three/fiber";

import type { SceneObjectProps } from "@/types";

type BookshelfProps = SceneObjectProps & Pick<ThreeElements["group"], "rotation">;

type Book = {
  position: [number, number, number];
  size: [number, number, number];
  color: string;
};

const books: Book[] = [
  { position: [-0.44, 0.33, 0.03], size: [0.1, 0.28, 0.2], color: "#c0392b" },
  { position: [-0.24, 0.38, 0.03], size: [0.12, 0.38, 0.2], color: "#2980b9" },
  { position: [0.02, 0.35, 0.03], size: [0.14, 0.32, 0.2], color: "#27ae60" },
  { position: [0.4, 0.83, 0.03], size: [0.11, 0.45, 0.2], color: "#8e44ad" },
  { position: [0.14, 0.79, 0.03], size: [0.09, 0.37, 0.2], color: "#f39c12" },
  { position: [-0.28, 1.29, 0.03], size: [0.13, 0.41, 0.2], color: "#16a085" },
  { position: [0.12, 1.25, 0.03], size: [0.08, 0.25, 0.2], color: "#d35400" },
];

export function Bookshelf({
  position,
  rotation,
  opacity = 1,
  castShadow = true,
  receiveShadow = true,
}: BookshelfProps) {
  const materialProps = opacity < 1 ? { transparent: true, opacity } : {};

  return (
    <group position={position} rotation={rotation}>
      <mesh castShadow={castShadow} receiveShadow={receiveShadow} position={[0, 1.1, 0]}>
        <boxGeometry args={[1.4, 2.2, 0.32]} />
        <meshStandardMaterial color="#6b4c33" roughness={0.78} {...materialProps} />
      </mesh>

      {[0.6, 1.1, 1.6].map((y) => (
        <mesh
          key={y}
          castShadow={castShadow}
          receiveShadow={receiveShadow}
          position={[0, y, 0.02]}
        >
          <boxGeometry args={[1.3, 0.04, 0.28]} />
          <meshStandardMaterial color="#7a5c3e" roughness={0.74} {...materialProps} />
        </mesh>
      ))}

      {books.map((book, index) => (
        <mesh
          key={index}
          castShadow={castShadow}
          receiveShadow={receiveShadow}
          position={book.position}
        >
          <boxGeometry args={book.size} />
          <meshStandardMaterial color={book.color} roughness={0.68} {...materialProps} />
        </mesh>
      ))}
    </group>
  );
}
