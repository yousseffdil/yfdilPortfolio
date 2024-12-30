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
      <Sphere args={[1, 15, 15]}>
        <meshStandardMaterial
          color={theme === "light" ? "#eb3434" : "#e0e0e0"}
          emissive={theme === "light" ? "#eb3434" : "#d0d0d0"}
          emissiveIntensity={1}
        />
      </Sphere>
    </group>
  );
}

function PlanetRings({RotationValue} : {RotationValue: number}) {
  const { theme } = useTheme();
  const ringRef = useRef<THREE.Group>(null);

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.x = RotationValue; // Rotate 90 degrees
    }
  });

  return (
    <group ref={ringRef}>
      <Torus args={[1.5, 0.1, 16, 50]}>
        <meshStandardMaterial
          color={theme === "light" ? "#2a2a2a" : "#d0d0d0"}
          emissive={theme === "light" ? "#2a2a2a" : "#d0d0d0"}
          emissiveIntensity={1}
        />
      </Torus>
    </group>
  );
}

function Asteroid({ position }: { position: [number, number, number] }) {
  const { theme } = useTheme();

  return (
    <group position={position}>
      <Sphere args={[0.1, 10, 10]}>
        <meshStandardMaterial
          color={theme === "light" ? "#eb8f34" : "#b0b0b0"}
          emissive={theme === "light" ? "#eb8f34" : "#d0d0d0"}
          emissiveIntensity={1}
        />
      </Sphere>
    </group>
  );
}

export function SpaceScene({activatedAnimation}: {activatedAnimation: boolean}) {
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

  const asteroidPositions = useMemo(() => generateRandomAsteroids(100), []);

  useFrame(({ clock }) => {
    if(activatedAnimation){
      const elapsedTime = clock.getElapsedTime();
      camera.position.x = radius * Math.cos(elapsedTime * speed) / 1.5;
      camera.position.z = radius * Math.sin(elapsedTime * speed) / 1.8;
      camera.position.y = 1;
      camera.lookAt(0, -1, 0);
    }else{
      camera.lookAt(0, -1, 0);
    }
  });


  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} />
      {theme !== "dark" && <ambientLight intensity={1.2} />}
      <pointLight position={[10, 10, 10]} intensity={1} />
      <group ref={groupRef}>
        <Planet />
        <PlanetRings RotationValue={Math.PI / 2}/>
        {asteroidPositions.map((position, index) => (
          <Asteroid key={index} position={position} />
        ))}
      </group>
      <EffectComposer>
        <Bloom
            intensity={0.4}
            luminanceThreshold={0.1}
            luminanceSmoothing={1}
            height={300}
          />
      </EffectComposer>
    </>
  );
}
