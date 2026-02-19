"use client"

import React, { createContext, useContext, useState, useCallback } from "react"

type HeaderHoverContextType = {
  isHovered: boolean
  setNavHovered: (hovered: boolean) => void
  setSubHeaderHovered: (hovered: boolean) => void
}

const HeaderHoverContext = createContext<HeaderHoverContextType | null>(null)

export function HeaderHoverProvider({ children }: { children: React.ReactNode }) {
  const [navHovered, setNavHovered] = useState(false)
  const [subHeaderHovered, setSubHeaderHovered] = useState(false)

  // Combined hover state - true if either is hovered
  const isHovered = navHovered || subHeaderHovered

  const handleNavHover = useCallback((hovered: boolean) => {
    setNavHovered(hovered)
  }, [])

  const handleSubHeaderHover = useCallback((hovered: boolean) => {
    setSubHeaderHovered(hovered)
  }, [])

  return (
    <HeaderHoverContext.Provider
      value={{
        isHovered,
        setNavHovered: handleNavHover,
        setSubHeaderHovered: handleSubHeaderHover,
      }}
    >
      {children}
    </HeaderHoverContext.Provider>
  )
}

export function useHeaderHover() {
  const context = useContext(HeaderHoverContext)
  if (!context) {
    // Return safe defaults if used outside provider (e.g., on pages without sub-header)
    return {
      isHovered: false,
      setNavHovered: () => {},
      setSubHeaderHovered: () => {},
    }
  }
  return context
}
