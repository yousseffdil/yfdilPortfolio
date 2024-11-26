import { useRef, useEffect, useMemo, useState } from 'react'
import { useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useTheme } from '../context/ThemeContext'
import * as THREE from 'three'
import { createNoise4D } from 'simplex-noise'
import { EffectComposer, Noise } from '@react-three/postprocessing'

const noise4D = createNoise4D()

function CubeNode({ initialPosition, connections }: { initialPosition: [number, number, number], connections: [number, number, number][] }) {
  const { theme } = useTheme()
  const meshRef = useRef<THREE.Mesh>(null)
  const lineRef = useRef<THREE.LineSegments>(null)
  const [position, setPosition] = useState(initialPosition)

  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.getElapsedTime()
      const [x, y, z] = initialPosition
      const noiseX = noise4D(x, y, z, time * 0.5) * 0.1
      const noiseY = noise4D(x, y, z, time * 0.5 + 100) * 0.1
      const noiseZ = noise4D(x, y, z, time * 0.5 + 200) * 0.1
      
      const newPosition: [number, number, number] = [
        x + noiseX,
        y + noiseY,
        z + noiseZ
      ]
      
      setPosition(newPosition)
      meshRef.current.position.set(...newPosition)
      meshRef.current.rotation.x = Math.sin(time * 0.5) * 0.2
      meshRef.current.rotation.y = Math.sin(time * 0.3) * 0.2
    }
  })

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry()
    const vertices = connections.flatMap(conn => [...position, ...conn])
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(vertices, 3))
    return geometry
  }, [position, connections])

  useFrame(() => {
    if (lineRef.current) {
      const positions = lineRef.current.geometry.attributes.position.array as Float32Array
      for (let i = 0; i < positions.length; i += 6) {
        positions[i] = position[0]
        positions[i + 1] = position[1]
        positions[i + 2] = position[2]
      }
      lineRef.current.geometry.attributes.position.needsUpdate = true
    }
  })

  return (
    <group>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color={theme === 'light' ? "#000000" : "#ffffff"} wireframe />
      </mesh>
      <lineSegments ref={lineRef} geometry={lineGeometry}>
        <lineBasicMaterial color={theme === 'light' ? "#000000" : "#ffffff"} />
      </lineSegments>
    </group>
  )
}

export function Cubes() {
  const groupRef = useRef<THREE.Group>(null)

  const cubePositions = useMemo(() => {
    return Array.from({ length: 20 }, () => [
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4,
      (Math.random() - 0.5) * 4
    ] as [number, number, number])
  }, [])

  const connections = useMemo(() => {
    return cubePositions.map(pos => {
      return cubePositions
        .filter(otherPos => otherPos !== pos)
        .sort((a, b) => {
          const distA = new THREE.Vector3(...pos).distanceTo(new THREE.Vector3(...a))
          const distB = new THREE.Vector3(...pos).distanceTo(new THREE.Vector3(...b))
          return distA - distB
        })
        .slice(0, 3)
    })
  }, [cubePositions])

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      if (groupRef.current) {
        const x = (event.clientX / window.innerWidth) * 2 - 1
        const y = -(event.clientY / window.innerHeight) * 2 + 1
        groupRef.current.rotation.y = x * 0.5
        groupRef.current.rotation.x = y * 0.5
      }
    }

    window.addEventListener('pointermove', handlePointerMove)

    return () => {
      window.removeEventListener('pointermove', handlePointerMove)
    }
  }, [])

  return (
    <>
      <OrbitControls enableZoom={false} enablePan={false} enableRotate={false} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <group ref={groupRef}>
        {cubePositions.map((position, index) => (
          <CubeNode key={index} initialPosition={position} connections={connections[index]} />
        ))}
      </group>
      <EffectComposer>
        <Noise opacity={0.02} />
      </EffectComposer>
    </>
  )
}

