import { useRef, useMemo } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Torus, Sphere } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useTheme } from "../context/ThemeContext";
import * as THREE from "three";

function Planet() {
  const { theme } = useTheme();

  return (
    <group>
      <Sphere args={[1, 32, 32]}>
        <meshStandardMaterial
          color={theme === "light" ? "#eb3434" : "#e0e0e0"}
          emissive={theme === "light" ? "#eb3434" : "#d0d0d0"}
          emissiveIntensity={0.5}
        />
      </Sphere>
      <Sphere args={[1.05, 32, 32]}>
        <meshBasicMaterial
          color={theme === "light" ? "#000000" : "#ffffff"}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

function PlanetRings() {
  const { theme } = useTheme();
  const ringRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2; // Rotate 90 degrees
    }
  });

  return (
    <group ref={ringRef}>
      <Torus args={[1.5, 0.1, 16, 100]}>
        <meshStandardMaterial
          color={theme === "light" ? "#2a2a2a" : "#d0d0d0"}
          emissive={theme === "light" ? "#2a2a2a" : "#d0d0d0"}
          emissiveIntensity={0.5}
        />
      </Torus>
      <Torus args={[1.5, 0.12, 16, 100]}>
        <meshBasicMaterial
          color={theme === "light" ? "#000000" : "#ffffff"}
          side={THREE.BackSide}
        />
      </Torus>
    </group>
  );
}

function Asteroid({ position }: { position: [number, number, number] }) {
  const { theme } = useTheme();

  return (
    <group position={position}>
      <Sphere args={[0.1, 16, 16]}>
        <meshStandardMaterial
          color={theme === "light" ? "#eb8f34" : "#b0b0b0"}
          emissive={theme === "light" ? "#eb8f34" : "#d0d0d0"}
          emissiveIntensity={0.5}
        />
      </Sphere>
      <Sphere args={[0.11, 16, 16]}>
        <meshBasicMaterial
          color={theme === "light" ? "#000000" : "#ffffff"}
          side={THREE.BackSide}
        />
      </Sphere>
    </group>
  );
}

export function SpaceScene() {
  const { theme } = useTheme();
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const radius = 8; // Radio de la órbita
  const speed = 0.4; // Velocidad de rotación

  const generateRandomAsteroids = (count: number) => {
    const positions: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10;
      const y = (Math.random() - 0.5) * 10;
      const z = (Math.random() - 0.5) * 10;
      positions.push([x, y, z]);
    }
    return positions;
  };

  // Memoize asteroid positions to generate them only once
  const asteroidPositions = useMemo(() => generateRandomAsteroids(100), []);

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    camera.position.x = radius * Math.cos(elapsedTime * speed) / 2;
    camera.position.z = radius * Math.sin(elapsedTime * speed) / 1.3;
    camera.position.y = 1;
    camera.lookAt(0, -1, 0);
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} />
      {theme !== "dark" && <ambientLight intensity={1.2} />}
      <pointLight position={[10, 10, 10]} intensity={1} />
      <group ref={groupRef}>
        <Planet />
        <PlanetRings />
        {asteroidPositions.map((position, index) => (
          <Asteroid key={index} position={position} />
        ))}
      </group>
      <EffectComposer>
        {theme !== "light" ? (
          <Bloom
            intensity={0.8}
            luminanceThreshold={0.1}
            luminanceSmoothing={1}
            height={300}
          />
        ) : (
          <></>
        )}
      </EffectComposer>
    </>
  );
}
