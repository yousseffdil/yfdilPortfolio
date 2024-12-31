import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const [isMobile, setIsMobile] = useState(false) 
  const { theme } = useTheme()

  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.matchMedia('(hover: none)').matches || 'ontouchstart' in window)
    }

    checkIfMobile()
    window.addEventListener('resize', checkIfMobile)

    const updatePosition = (e: MouseEvent) => {
      if (!isMobile) {
        setPosition({ x: e.clientX, y: e.clientY })
      }
    }

    const updateCursorType = (e: MouseEvent) => {
      if (!isMobile) {
        const target = e.target as HTMLElement
        const isInteractive = ['A', 'BUTTON', 'INPUT', 'CANVAS', 'LABEL', 'svg', 'SUMMARY'].includes(target.tagName) ||
                              target.hasAttribute('data-cursor-pointer') ||
                              target.classList.contains('cursor-pointer') ||
                              target.classList.contains('hovered')
        setIsPointer(isInteractive)
      }
    }

    if (!isMobile) {
      window.addEventListener('mousemove', updatePosition)
      window.addEventListener('mouseover', updateCursorType)
    }

    return () => {
      window.removeEventListener('resize', checkIfMobile)
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', updateCursorType)
    }
  }, [isMobile])

  if (isMobile) return null 

  return (
    <div
      className={`custom-cursor ${isPointer ? 'pointer' : ''}`}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
        borderColor: theme === 'dark' ? '#ffffff' : '#000000'
      }}
      />
  )
}
