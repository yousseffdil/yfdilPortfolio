import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

function Model({size}: {size: boolean}) {
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
              mat.roughness = 0;
              mat.metalness = 0;
              mat.needsUpdate = true;
            });
          } else {
            child.material.color.set(color);
            child.material.roughness = 0;
            child.material.metalness = 0;
            child.material.needsUpdate = true;
          }
        }
      });
    }
  }, [scene]);

  useFrame((_, delta) => {
    if (modelRef.current) {
      modelRef.current.rotation.y += delta * 2;
      modelRef.current.rotation.z = 0.1;
      if(size){
        modelRef.current.scale.x = 0.6;
        modelRef.current.scale.y = 0.6;
        modelRef.current.scale.z = 0.6;
      }else {
        modelRef.current.scale.x = 0.5;
        modelRef.current.scale.y = 0.5;
        modelRef.current.scale.z = 0.5;
      }
    }

  });

  return (
    <primitive
      object={scene}
      ref={modelRef}
      position={[0, -1, 0]}
      rotation={[0, 0, 0]}
      scale={[0.5, 0.5, 0.5]}
    />
  );
}

function BlobText({ textToDisplay }: {  textToDisplay: string }) {
  return (
    <div style={{ zIndex: 100 }} className="Container_BlobText">
      <div className="blobText" style={{zIndex: 1}}>
        {textToDisplay === "Cuack + 0" ? 
          <h2 style={{width: '100%'}}>CUACK ME 👇</h2> : 
          <><h2>{textToDisplay}</h2></>
        }
        <div className="blobText_Corner"></div>
      </div>
    </div>
  );
}

export function EnhancedScene() {
  const [clicks, setClicks] = useState(0);
  const [size, setSize] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setSize(false);
    }, 90);

    timeoutRef.current = setTimeout(() => {
      setClicks(0); 
    }, 3000); 

  };
  const handleClick = () => {
    setClicks((prev) => prev + 1);
    setSize(true);

    resetTimeout();
  };

  useEffect(() => {
    resetTimeout();
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="flex justify-center flex-col items-center Container_All">
        <BlobText textToDisplay={"Cuack + " + clicks} />
        <div style={{ zIndex: 10 }} className="Duck">
          <Canvas
            dpr={[1, 2]}
            camera={{ position: [0, -1, 3], fov: 50 }}
            onClick={handleClick}
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
            <Model size={size}/>
            <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
              <planeGeometry args={[10, 10]} />
              <shadowMaterial opacity={0.4} />
            </mesh>
          </Canvas>
        </div>
      </div>
    </>
  );
}