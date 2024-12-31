import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useTheme } from "../context/ThemeContext";
import { Sphere, Torus } from "@react-three/drei";

function BoxShow({ scrollProgress }: { scrollProgress: number }) {
  const mesh = useRef<THREE.Mesh>(null!);
  const { theme } = useTheme();

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
    <mesh ref={mesh}>
      <Sphere args={[0.3, 15, 15]} position={[0, 0, 1]}>
        <meshStandardMaterial
          color={theme === "light" ? "#eb3434" : "#e0e0e0"}
          emissive={theme === "light" ? "#eb3434" : "#d0d0d0"}
          emissiveIntensity={1}
        />
      </Sphere>
      <Torus
        args={[0.5, 0.05, 16, 50]}
        rotation={[Math.PI / 2, 0, 0]}
        position={[0, 0, 1]}
      >
        <meshStandardMaterial
          color={theme === "light" ? "#2a2a2a" : "#d0d0d0"}
          emissive={theme === "light" ? "#2a2a2a" : "#d0d0d0"}
          emissiveIntensity={1}
        />
      </Torus>
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
