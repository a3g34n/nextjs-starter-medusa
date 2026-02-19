"use client"

import { useRouter } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const SearchModal = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const inputRef = useRef<HTMLInputElement>(null)
  const modalRef = useRef<HTMLDivElement>(null)

  const openSearch = () => setIsOpen(true)
  const closeSearch = () => {
    setIsOpen(false)
    setSearchQuery("")
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      router.push(`/store?q=${encodeURIComponent(searchQuery)}`)
      closeSearch()
    }
  }

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  // Close on click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
        closeSearch()
      }
    }

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside)
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [isOpen])

  // Close on escape key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeSearch()
      }
    }

    if (isOpen) {
      document.addEventListener("keydown", handleEsc)
    }

    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [isOpen])

  return (
    <>
      <div className="group relative w-max">
        <button 
          onClick={openSearch}
          className="text-base tracking-wide hover:opacity-80 transition-opacity"
        >
          ARA
        </button>
        <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-current opacity-100 transition-opacity duration-300 group-hover:opacity-50"></div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-start justify-center pt-32">
          <div 
            ref={modalRef}
            className="w-full max-w-2xl bg-white p-6 shadow-xl rounded-lg mx-4 transform transition-all animate-in fade-in slide-in-from-top-4"
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                ref={inputRef}
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Ne aramıştınız?"
                className="w-full text-2xl font-light border-b-2 border-gray-200 py-4 px-2 focus:outline-none focus:border-black transition-colors bg-transparent placeholder:text-gray-300"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm uppercase tracking-widest hover:opacity-70"
              >
                ARA
              </button>
            </form>
            <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
               <span>Enter'a basarak arayın</span>
               <button onClick={closeSearch} className="hover:text-black">KAPAT (ESC)</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchModal
