import { useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

function Model({ scrollProgress }: { scrollProgress: number }) {
  const modelRef = useRef<THREE.Group>(null!);
  const { scene } = useGLTF("/duck.glb");
  const color = "#ffffff";

  useEffect(() => {
    if (scene) {
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh && child.material) {
          if (Array.isArray(child.material)) {
            child.material.forEach((mat) => {
              mat.color.set(color);
              mat.roughness = 0.2; 
              mat.metalness = 0.8; 
              mat.needsUpdate = true;
            });
          } else {
            child.material.color.set(color);
            child.material.roughness = 0.2;
            child.material.metalness = 0.8;
            child.material.needsUpdate = true;
          }

          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }
  }, [scene]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.position.x = Math.sin(scrollProgress * Math.PI * 2) * 3;
      modelRef.current.position.y = Math.sin(scrollProgress * Math.PI);
      modelRef.current.rotation.y = scrollProgress * Math.PI * 2;
      modelRef.current.rotation.x = scrollProgress * Math.PI * 2;
    }
  });

  return <primitive object={scene} ref={modelRef} scale={[0.2, 0.2, 0.2]} />;
}

export function EnhancedScene({ scrollProgress }: { scrollProgress: number }) {
  return (
    <div style={{ height: "100vh", width: "100%", position: "fixed" }}>
      <Canvas
        dpr={[1, 2]} 
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{
          antialias: true,
          toneMapping: THREE.ACESFilmicToneMapping,
          outputColorSpace: THREE.SRGBColorSpace,
        }}
      >
        <ambientLight intensity={1} />
        <directionalLight
          position={[5, 10, 5]}
          intensity={1.5}
          shadow-mapSize-width={2048} 
          shadow-mapSize-height={2048}
        />
        <spotLight
          intensity={1}
          angle={0.3}
          penumbra={1}
          position={[10, 15, 10]}
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <Model scrollProgress={scrollProgress} />
        <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial opacity={0.4} />
        </mesh>
      </Canvas>
    </div>
  );
}
