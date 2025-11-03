"use client"

import { useRef, useMemo, useState } from "react"
import { useFrame, useThree } from "@react-three/fiber"
import { OrbitControls, Torus, Sphere, Box } from "@react-three/drei"
import { EffectComposer, Bloom } from "@react-three/postprocessing"
import { useTheme } from "../context/ThemeContext"
import * as THREE from "three"

function Planet() {
  const { theme } = useTheme()
  const planetRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (planetRef.current) {
      planetRef.current.rotation.y += 0.002
    }
  })

  return (
    <group>
      <Sphere ref={planetRef} args={[1, 15, 15]}>
        <meshStandardMaterial
          color={theme === "light" ? "#eb3434" : "#e0e0e0"}
          emissive={theme === "light" ? "#eb3434" : "#d0d0d0"}
          emissiveIntensity={1}
        />
      </Sphere>
    </group>
  )
}

function PlanetRings({ RotationValue }: { RotationValue: number }) {
  const { theme } = useTheme()
  const ringRef = useRef<THREE.Group>(null)

  useFrame(() => {
    if (ringRef.current) {
      ringRef.current.rotation.x = RotationValue
    }
  })

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
  )
}

function Asteroid({ position }: { position: [number, number, number] }) {
  const { theme } = useTheme()
  const [hovered, setHovered] = useState(false)
  const asteroidRef = useRef<THREE.Mesh>(null)

  useFrame(() => {
    if (asteroidRef.current && hovered) {
      asteroidRef.current.scale.lerp(new THREE.Vector3(1.5, 1.5, 1.5), 0.1)
    } else if (asteroidRef.current) {
      asteroidRef.current.scale.lerp(new THREE.Vector3(1, 1, 1), 0.1)
    }
  })

  return (
    <group position={position}>
      <Sphere
        ref={asteroidRef}
        args={[0.1, 10, 10]}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
      >
        <meshStandardMaterial
          color={hovered ? (theme === "light" ? "#ffaa00" : "#ffffff") : theme === "light" ? "#eb8f34" : "#b0b0b0"}
          emissive={hovered ? (theme === "light" ? "#ffaa00" : "#ffffff") : theme === "light" ? "#eb8f34" : "#d0d0d0"}
          emissiveIntensity={hovered ? 1.5 : 1}
        />
      </Sphere>
    </group>
  )
}

function Satellite({ speed }: { speed: number }) {
  const { theme } = useTheme()
  const satelliteRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)

  useFrame(({ clock }) => {
    if (satelliteRef.current) {
      const elapsedTime = clock.getElapsedTime()
      const orbitRadius = 2.5
      satelliteRef.current.position.x = Math.cos(elapsedTime * speed) * orbitRadius
      satelliteRef.current.position.z = Math.sin(elapsedTime * speed) * orbitRadius
      satelliteRef.current.position.y = Math.sin(elapsedTime * speed * 2) * 0.3
      satelliteRef.current.rotation.y = elapsedTime * 2
    }
  })

  return (
    <group ref={satelliteRef} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      {/* Lowpoly satellite body */}
      <Box args={[0.15, 0.1, 0.15]} scale={hovered ? 1.3 : 1}>
        <meshStandardMaterial
          color={hovered ? (theme === "light" ? "#00ff88" : "#88ffff") : theme === "light" ? "#4a90e2" : "#6ab0ff"}
          emissive={hovered ? (theme === "light" ? "#00ff88" : "#88ffff") : theme === "light" ? "#4a90e2" : "#6ab0ff"}
          emissiveIntensity={hovered ? 2 : 1.2}
        />
      </Box>
      {/* Solar panels */}
      <Box args={[0.4, 0.02, 0.1]} position={[-0.25, 0, 0]}>
        <meshStandardMaterial
          color={theme === "light" ? "#2a2a2a" : "#4a4a4a"}
          emissive={theme === "light" ? "#2a2a2a" : "#4a4a4a"}
          emissiveIntensity={0.5}
        />
      </Box>
      <Box args={[0.4, 0.02, 0.1]} position={[0.25, 0, 0]}>
        <meshStandardMaterial
          color={theme === "light" ? "#2a2a2a" : "#4a4a4a"}
          emissive={theme === "light" ? "#2a2a2a" : "#4a4a4a"}
          emissiveIntensity={0.5}
        />
      </Box>
    </group>
  )
}

export function SpaceScene({ activatedAnimation }: { activatedAnimation: boolean }) {
  const { theme } = useTheme()
  const { camera } = useThree()
  const groupRef = useRef<THREE.Group>(null)
  const radius = 8
  const speed = 0.4
  const [satelliteSpeed, setSatelliteSpeed] = useState(0.5)

  const generateRandomAsteroids = (count: number) => {
    const positions: [number, number, number][] = []
    for (let i = 0; i < count; i++) {
      const x = (Math.random() - 0.5) * 10
      const y = (Math.random() - 0.5) * 10
      const z = (Math.random() - 0.5) * 10
      positions.push([x, y, z])
    }
    return positions
  }

  const asteroidPositions = useMemo(() => generateRandomAsteroids(100), [])

  useFrame(({ clock }) => {
    if (activatedAnimation) {
      const elapsedTime = clock.getElapsedTime()
      camera.position.x = (radius * Math.cos(elapsedTime * speed)) / 1.3
      camera.position.z = (radius * Math.sin(elapsedTime * speed)) / 1.8
      camera.position.y = 1
      camera.lookAt(0, -1, 0)
    } else {
      camera.lookAt(0, -1, 0)
    }
  })

  const handleSatelliteClick = () => {
    setSatelliteSpeed((prev) => (prev === 0.5 ? 1.5 : 0.5))
  }

  return (
    <>
      <OrbitControls enableZoom={true} enablePan={false} />
      {theme !== "dark" && <ambientLight intensity={1.2} />}
      <pointLight position={[10, 10, 10]} intensity={1} />
      <group ref={groupRef}>
        <Planet />
        <PlanetRings RotationValue={Math.PI / 2} />
        <group onClick={handleSatelliteClick}>
          <Satellite speed={satelliteSpeed} />
        </group>
        {asteroidPositions.map((position, index) => (
          <Asteroid key={index} position={position} />
        ))}
      </group>
      <EffectComposer>
        <Bloom intensity={0.4} luminanceThreshold={0.1} luminanceSmoothing={1} height={300} />
      </EffectComposer>
    </>
  )
}
