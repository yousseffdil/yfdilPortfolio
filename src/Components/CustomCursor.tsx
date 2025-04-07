
import { useEffect, useState } from "react"

export default function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isVisible, setIsVisible] = useState(false)
  const [orbitAngle, setOrbitAngle] = useState(0)

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Check for interactive elements
    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive =
        target.tagName === "BUTTON" ||
        target.tagName === "A" ||
        target.closest("button") ||
        target.closest("a") ||
        target.getAttribute("role") === "button" ||
        target.classList.contains("interactive")

      setIsHovering(Boolean(isInteractive))
    }

    // Animation for the orbiting element
    const animateOrbit = () => {
      setOrbitAngle((prev) => (prev + 2) % 360)
      requestAnimationFrame(animateOrbit)
    }

    window.addEventListener("mousemove", updatePosition)
    window.addEventListener("mouseenter", handleMouseEnter)
    window.addEventListener("mouseleave", handleMouseLeave)
    window.addEventListener("mouseover", handleMouseOver)

    const animationId = requestAnimationFrame(animateOrbit)

    return () => {
      window.removeEventListener("mousemove", updatePosition)
      window.removeEventListener("mouseenter", handleMouseEnter)
      window.removeEventListener("mouseleave", handleMouseLeave)
      window.removeEventListener("mouseover", handleMouseOver)
      cancelAnimationFrame(animationId)
    }
  }, [])

  if (!isVisible) return null

  // Calculate orbit position
  let orbitRadius = 22
  let orbitX = Math.cos((orbitAngle * Math.PI) / 180) * orbitRadius
  let orbitY = Math.sin((orbitAngle * Math.PI) / 180) * orbitRadius
  if (isHovering) {
    orbitRadius = 20
    orbitX = Math.cos((orbitAngle * Math.PI) / 180) * orbitRadius
    orbitY = Math.sin((orbitAngle * Math.PI) / 180) * orbitRadius
  }
  return (
    <div
      className="fixed pointer-events-none z-50"
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        transform: "translate(-50%, -50%)",
      }}
    >
      {/* Small center ball */}
      <div
        className={`absolute rounded-full bg-orange-500 transition-all duration-150 ease-out custom-cursor  ${
          isHovering ? "w-3 h-3 opacity-70" : "w-4 h-4"
        }`}
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Larger outline */}
      <div
        className={`absolute rounded-full border-2 border-orange-400 transition-all duration-300 custom-cursor ${
          isHovering ? "w-10 h-10" : "w-12 h-12"
        }`}
        style={{
          left: "50%",
          top: "50%",
          transform: "translate(-50%, -50%)",
        }}
      />

      {/* Orbiting element */}
      <div
        className={`absolute rounded-full bg-orange-300 transition-transform custom-cursor.pointer ${
          isHovering ? "w-3 h-3" : "w-3 h-3"
        }`}
        style={{
          left: `calc(50% + ${orbitX}px)`,
          top: `calc(50% + ${orbitY}px)`,
          transform: "translate(-50%, -50%)",
        }}
      />
    </div>
  )
}

