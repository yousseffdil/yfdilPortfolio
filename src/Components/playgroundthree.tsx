import { useRef } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics, useBox, usePlane } from '@react-three/cannon';
import { OrbitControls } from '@react-three/drei';
import { useDrag } from '@use-gesture/react';
import { Mesh } from 'three';

const Plane = () => {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0], position: [0, -1, 0] }));
  return (
    <mesh ref={ref as React.RefObject<Mesh>} receiveShadow>
      <planeBufferGeometry args={[10, 10]} />
      <meshStandardMaterial color="lightblue" />
    </mesh>
  );
};

const InteractiveBox = () => {
  const boxRef = useRef<Mesh>(null);
  const [ref, api] = useBox(() => ({
    mass: 1,
    position: [0, 2, 0],
    args: [1, 1, 1],
  }));

  // Hook para manejar el drag
  const bind = useDrag(
    ({ offset: [x, y] }) => {
      api.position.set(x, -y, 0); // Movemos el objeto en base al arrastre
    },
    { bounds: { top: -5, bottom: 5, left: -5, right: 5 } } // Restricciones de movimiento
  );

  return (
    <mesh ref={boxRef} {...(bind() as any)} castShadow>
      <boxBufferGeometry args={[1, 1, 1]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
};

export const Scene = () => {
  return (
    <Canvas shadows camera={{ position: [5, 5, 5], fov: 50 }}>
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} castShadow intensity={0.8} />
      <Physics>
        <Plane />
        <InteractiveBox />
      </Physics>
      <OrbitControls />
    </Canvas>
  );
};

export default Scene;
