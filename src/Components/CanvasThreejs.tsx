import { Canvas } from "@react-three/fiber";
import { OrbitControls } from '@react-three/drei'
import {  Suspense } from 'react'


function Cube( {darkMode}: {darkMode: boolean} ) {
  return (
    <mesh rotation={[0, 0, 0]}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <meshStandardMaterial color={darkMode ? "#fde047" : "red"} />
    </mesh>
  )
}

export default function CanvasThreejs({ isDarkMode }: { isDarkMode: boolean}) {
  return (
    <>
        <div style={{ width: "100%", height: "50vh" }} className="mt-6 h-64 border-2 border-dashed border-current p-4">
      <Canvas>
        <ambientLight intensity={0.6} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} />
        <pointLight position={[0, 0, 0]} />
        <Suspense fallback={null}>
          <Cube darkMode={isDarkMode}/>
        </Suspense>
        <OrbitControls />
      </Canvas>
    </div>
    <p className="mt-4 text-sm italic">^ Interactive 3D cube (drag to rotate) ^</p>
    </>
  );
}
