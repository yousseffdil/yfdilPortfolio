import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
// Componente para el modelo GLTF
function Model({ scrollProgress }: { scrollProgress: number }) {
  const { scene } = useGLTF("/toy_rocket.glb"); // Ruta correcta al modelo
  const modelRef = useRef<THREE.Group>(null!);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.x = THREE.MathUtils.lerp(
        8,
        -8,
        Math.pow(scrollProgress, 2)
      );
      modelRef.current.position.y = THREE.MathUtils.lerp(
        2,
        -2,
        Math.pow(scrollProgress, 2) / 2
      );
      modelRef.current.rotation.x =
        Math.sin(Math.pow(scrollProgress, 2) * Math.PI * 2) * Math.PI * 0.5;
      modelRef.current.rotation.y =
        Math.cos(Math.pow(scrollProgress, 2) * Math.PI * 2) * Math.PI * 0.5;
    }
  });

  return (
    <primitive ref={modelRef} object={scene} scale={0.2} position={[0, 0, 1]} />
  );
}

// Componente principal
export function AnimatedCube({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div
      style={{ height: "200vh", position: "fixed", width: "100%", zIndex: -1 }}
    >
      <Canvas style={{ height: "100vh" }}>
        <perspectiveCamera position={[0, 0, 5]} />
        <ambientLight intensity={5} />
        <pointLight position={[10, 10, 10]} />
        <Model scrollProgress={scrollProgress} />
      </Canvas>
    </div>
  );
}
