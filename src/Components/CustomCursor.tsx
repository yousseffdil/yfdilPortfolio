import { useState, useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

export function CustomCursor() {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isPointer, setIsPointer] = useState(false)
  const { theme } = useTheme()

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY })
    }

    const updateCursorType = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      const isInteractive = ['A', 'BUTTON', 'INPUT', 'CANVAS'].includes(target.tagName) || 
                            target.hasAttribute('data-cursor-pointer') || 
                            target.classList.contains('cursor-pointer') 
      setIsPointer(isInteractive)
    }

    window.addEventListener('mousemove', updatePosition)
    window.addEventListener('mouseover', updateCursorType)

    return () => {
      window.removeEventListener('mousemove', updatePosition)
      window.removeEventListener('mouseover', updateCursorType)
    }
  }, [])

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
