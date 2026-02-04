import React, { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  // Initialize theme from localStorage or system preference
  const getInitialTheme = () => {
    const savedTheme = localStorage.getItem('portfolio-theme')
    if (savedTheme) {
      return savedTheme
    }

    // Check system preference
    if (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    ) {
      return 'dark'
    }

    return 'light'
  }

  const [theme, setTheme] = useState(getInitialTheme)
  const [isTransitioning, setIsTransitioning] = useState(false)

  // Toggle theme with smooth transition
  const toggleTheme = () => {
    setIsTransitioning(true)

    // Short delay for transition animation
    setTimeout(() => {
      setTheme((prevTheme) => (prevTheme === 'light' ? 'dark' : 'light'))
    }, 50)

    // Reset transition state
    setTimeout(() => {
      setIsTransitioning(false)
    }, 650)
  }

  // Apply theme to document and save to localStorage
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    localStorage.setItem('portfolio-theme', theme)
  }, [theme])

  // Listen for system theme changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('portfolio-theme')) {
        setTheme(e.matches ? 'dark' : 'light')
      }
    }

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])

  const value = {
    theme,
    toggleTheme,
    isTransitioning,
    isDark: theme === 'dark',
    isLight: theme === 'light',
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}
