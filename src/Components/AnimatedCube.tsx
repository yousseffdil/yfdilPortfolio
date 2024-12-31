import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function BoxShow({ scrollProgress }: { scrollProgress: number }) {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    mesh.current.position.x = THREE.MathUtils.lerp(
      8,
      -8,
      Math.pow(scrollProgress, 2)
    );
    mesh.current.position.y = THREE.MathUtils.lerp(
      2,
      -2,
      Math.pow(scrollProgress, 2)
    );

    mesh.current.rotation.x =
      Math.sin(Math.pow(scrollProgress, 2) * Math.PI * 2) * Math.PI * 0.5;
    mesh.current.rotation.y =
      Math.cos(Math.pow(scrollProgress, 2) * Math.PI * 2) * Math.PI * 0.5;
  });

  return (
    <mesh ref={mesh} position={[5, 2, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color={"#eb3434"} emissive={"#eb3434"}  />
    </mesh>
  );
}

export function AnimatedCube({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div
      style={{ height: "200vh", position: "fixed", width: "100%", zIndex: -1 }}
    >
      <Canvas style={{ height: "100vh" }}>
        <perspectiveCamera position={[0, 0, 5]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <BoxShow scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
