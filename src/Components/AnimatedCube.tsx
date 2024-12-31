import { useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useGLTF } from "@react-three/drei";

function Model({ scrollProgress, setScale }: { scrollProgress: number; setScale: boolean }) {
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
      if (scrollProgress === 1) {
        // Rotación sobre su eje Y
        modelRef.current.rotation.y += delta * 2;
        modelRef.current.rotation.z = -0.1;

        // Ajustar escala si no está controlado por setScale
        if (!setScale) {
          modelRef.current.scale.set(2, 2, 2);
        }
      } else {
        // Restablecer valores cuando scrollProgress no es 1
        modelRef.current.position.set(0, 0, -10);
        modelRef.current.rotation.y = 0;
        modelRef.current.scale.set(0, 0, 0);
      }
    }
  });

  useEffect(() => {
    if (modelRef.current) {
      if (setScale) {
        modelRef.current.scale.set(2, 2, 2);
      } else if (scrollProgress !== 1) {
        modelRef.current.scale.set(1, 1, 1);
      }
    }
  }, [setScale, scrollProgress]);

  return (
    <primitive
      object={scene}
      ref={modelRef}
      position={[0, 0, 1]}
      rotation={[0, 0, 0]}
    />
  );
}

function BlobText({ scrollProgress, textToDisplay }: { scrollProgress: number, textToDisplay: string }) {
  const [showText, setShowText] = useState(false);
  useEffect(() => {
    if (scrollProgress == 1) {
      setShowText(true);
    } else {
      setShowText(false);
    }
  }, [scrollProgress]);

  return (
    <div style={{ zIndex: 100 }}>
      {showText ? (
        <div className="blobText" style={{zIndex: 1, top: "55%", left: "92%", transform: "translate(-50%, -50%)", bottom: "0", position: "fixed"}}>
          {textToDisplay === "Cuack + 0" ? <h2>Click me!</h2> : <><h2>{textToDisplay}</h2></>}
        </div>
      ) : <></>}
    </div>
  );
}

export function EnhancedScene({ scrollProgress }: { scrollProgress: number }) {
  const [clicks, setClicks] = useState(0);
  const [stateScale, setStateScale] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Función para reiniciar el temporizador
  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      console.log("0"); // Puedes enviar este valor a un backend o manejarlo como necesites
      setClicks(0); // Reinicia el contador de clics si es necesario
    }, 3000); // 3 segundos
  };

  // Manejador de clics
  const handleClick = () => {
    setClicks((prev) => prev + 1);
    resetTimeout();
  };

  useEffect(() => {
    // Iniciar temporizador en el montaje
    resetTimeout();

    return () => {
      // Limpiar el temporizador en el desmontaje
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <BlobText scrollProgress={scrollProgress} textToDisplay={"Cuack + " + clicks} />
      <div style={{ position: "fixed", zIndex: 10 }} className="cursor-pointer Duck">
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, -1, 3], fov: 50 }}
          onClick={handleClick}
          onMouseDown={() => setStateScale(true)}
          onMouseUp={() => setStateScale(false)}
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
          <Model scrollProgress={scrollProgress} setScale={stateScale} />
          <mesh receiveShadow rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.5, 0]}>
            <planeGeometry args={[10, 10]} />
            <shadowMaterial opacity={0.4} />
          </mesh>
        </Canvas>
      </div>
    </>
  );
}