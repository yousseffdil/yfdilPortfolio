import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { OrbitControls, Torus, Sphere } from "@react-three/drei";
import { useTheme } from "../context/ThemeContext";
import * as THREE from "three";

function Planet() {
  const { theme } = useTheme();

  return (
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial
        color={theme === "light" ? "#eb3434" : "#e0e0e0"}
        roughness={0.7}
        metalness={0.3}
        emissive={theme === "light" ? "#eb3434" : "#d0d0d0"}

      />
    </Sphere>
  );
}

function PlanetRings() {
  const { theme } = useTheme();
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.x = Math.PI / 2; // Rotate 90 degrees
    }
  });

  return (
    <Torus ref={ringRef} args={[1.5, 0.1, 16, 100]}>
      <meshStandardMaterial
        color={theme === "light" ? "#2a2a2a" : "#d0d0d0"}
        metalness={4}
        emissive={theme === "light" ? "#2a2a2a" : "#d0d0d0"}
      />
    </Torus>
  );
}

function Asteroid({ position }: { position: [number, number, number] }) {
  const { theme } = useTheme();

  return (
    <Sphere args={[0.1, 16, 16]} position={position}>
      <meshStandardMaterial
        color={theme === "light" ? "#eb8f34" : "#b0b0b0"}
        roughness={0.8}
        metalness={0.2}
        emissive={theme === "light" ? "#eb8f34" : "#d0d0d0"}

      />
    </Sphere>
  );
}

export function SpaceScene() {
  const { camera } = useThree();
  const groupRef = useRef<THREE.Group>(null);
  const radius = 5; // Radio de la órbita
  const speed = 0.5; // Velocidad de rotación
  const height = 2; // Altura fija de la cámara

  const asteroidPositions = [
    [2, 0, 0],
    [-2, 1, 1],
    [0, -1.5, 2],
    [1.5, 1, -1.5],
    [-2, -1, 1.5],
    [-1, -1, -2],
  ] as [number, number, number][];

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    // Calcula la posición de la cámara en un círculo horizontal
    camera.position.x = radius * Math.cos(elapsedTime * speed);
    camera.position.z = radius * Math.sin(elapsedTime * speed);
    camera.position.y = height; // Mantén la altura constante
    camera.lookAt(0, 0, 0); // Apunta siempre al centro de la escena
  });

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} />
      <ambientLight intensity={0.3} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <group ref={groupRef}>
        <Planet />
        <PlanetRings />
        {asteroidPositions.map((position, index) => (
          <Asteroid key={index} position={position} />
        ))}
      </group>
    </>
  );
}
