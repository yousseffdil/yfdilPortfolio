import { Canvas, useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { useRef } from "react";
import { DoubleSide, MeshStandardMaterial, Object3D } from "three";

function YFBModel({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  const { scene, materials } = useGLTF("/YFB.glb");
  const modelRef = useRef<Object3D>(null);

  // Configuración de materiales
  Object.values(materials).forEach((material) => {
    if (material instanceof MeshStandardMaterial) {
      material.transparent = true;
      material.side = DoubleSide;
      material.opacity = 1;
      material.alphaTest = 0.5;
      material.emissive = material.color.clone();
      material.emissiveIntensity = 2;
    }
  });

  // Actualizar rotación en cada frame
  useFrame(() => {
    if (modelRef.current) {
      const { x, y } = mousePosition;

      // Normalizar coordenadas del mouse (de -1 a 1)
      const normalizedX = (x / window.innerWidth) * 2 - 1;
      const normalizedY = -(y / window.innerHeight) * 2 + 1;

      // Aplicar rotación
      modelRef.current.rotation.x = normalizedY * 0.5; // Rotación en X
      modelRef.current.rotation.y = normalizedX * 0.5; // Rotación en Y
    }
  });

  return <primitive object={scene} scale={2} position={[0, -2, -1]} ref={modelRef} />;
}

export default function CanvasThreejs({ mousePosition }: { mousePosition: { x: number; y: number } }) {
  return (
    <div style={{ width: "100%", height: "50vh" }}>
      <Canvas>
        <ambientLight intensity={0.5} />
        <pointLight position={[0, 5, 5]} intensity={2} />

        <YFBModel mousePosition={mousePosition} />

        <EffectComposer>
          <Bloom
            intensity={0.5}
            luminanceThreshold={0.2}
            luminanceSmoothing={0.9}
          />
        </EffectComposer>
      </Canvas>
    </div>
  );
}
