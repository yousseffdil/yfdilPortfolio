import { useTheme } from "../context/ThemeContext"
export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <button 
      onClick={toggleTheme} 
      className="border border-foreground p-2 text-sm hover:bg-foreground hover:text-background transition-colors"
    >
      {theme === 'light' ? 'DARK' : 'LIGHT'}
    </button>
  )
}

