"use client"

import { useEffect } from "react"
import { clearCartAction } from "./actions"

export default function ClearCartAndRevalidate() {
  useEffect(() => {
    clearCartAction()
  }, [])

  return null
}
