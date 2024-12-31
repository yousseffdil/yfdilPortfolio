import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function BoxShow({ scrollProgress }: { scrollProgress: number }) {
  const mesh = useRef<THREE.Mesh>(null!);

  useFrame(() => {
    mesh.current.position.x = THREE.MathUtils.lerp(5, -5, scrollProgress);

    mesh.current.position.y = THREE.MathUtils.lerp(2, -2, scrollProgress);

    mesh.current.rotation.x = scrollProgress * Math.PI * 2;
    mesh.current.rotation.y = scrollProgress * Math.PI * 2;
  });

  return (
    <mesh ref={mesh} position={[5, 2, 0]}>
      <boxGeometry args={[1, 1, 1]} />
      <meshStandardMaterial />
    </mesh>
  );
}

export function AnimatedCube({ scrollProgress }: { scrollProgress: number }) {

  return (
    <div style={{ height: "200vh", position: "fixed", width: "100%" }}>
      <Canvas style={{ height: "100vh" }}>
        <perspectiveCamera position={[0, 0, 5]} />
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <BoxShow scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
