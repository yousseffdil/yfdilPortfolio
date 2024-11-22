import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei';
import { EffectComposer, Bloom } from "@react-three/postprocessing";
import { Suspense, useRef } from 'react';
import * as THREE from 'three';

function Cube({ darkMode }: { darkMode: boolean }) {
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame(() =>{
    if(meshRef.current){
      meshRef.current.rotation.x += 0.01 / 2;
      meshRef.current.rotation.y += 0.01 / 2;
    }
  })
  return (
    <mesh rotation={[0, 0, 0]} ref={meshRef}>
      <sphereGeometry args={[2, 10, 5]} />
      <meshStandardMaterial 
        color={darkMode ? "#fde047" : "#5376bf"} 
        emissive={darkMode ? "#dcb903" : "#000000"} 
        emissiveIntensity={darkMode ? 3 : 0} 
        wireframe={true}
      />
    </mesh>
  );
}

export default function CanvasThreejs({ isDarkMode }: { isDarkMode: boolean }) {
  return (
    <>
      <div style={{ width: "100%", height: "50vh" }} className="mt-6 h-64 border-2 border-dashed border-current p-4">
        <Canvas>
          <ambientLight intensity={1} />
          <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
          <pointLight position={[10,10, 10]} />
          <Suspense fallback={null}>
            <Cube darkMode={isDarkMode} />
          </Suspense>
          {isDarkMode && (
            <EffectComposer>
              <Bloom 
                intensity={1} 
                luminanceThreshold={0.2} 
                luminanceSmoothing={1} 
              />
            </EffectComposer>
          )}
          <OrbitControls enableZoom={false}/>
        </Canvas>
      </div>
      <p className="mt-4 text-sm italic">^ Interactive 3D cube (drag to rotate) ^</p>
    </>
  );
}
