"use client"

import { useRouter, useParams } from "next/navigation"
import { useEffect, useRef, useState } from "react"

const SearchModal = ({ mobile, dictionary }: { mobile?: boolean, dictionary?: any }) => {
  const router = useRouter()
  const params = useParams()
  const countryCode = params?.countryCode as string

  const [isOpen, setIsOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const modalRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const openSearch = () => setIsOpen(true)
  const closeSearch = () => setIsOpen(false)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery) {
      router.push(`/${countryCode}/search?q=${encodeURIComponent(searchQuery)}`)
      closeSearch()
    }
  }

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

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

      <div 
        onClick={openSearch}
        className={`group relative cursor-pointer ${mobile ? "w-full" : "w-max"}`}
      >
        {mobile ? (
          <div className="w-full border-b border-current/30 py-2 flex items-center justify-between">
            <span className="text-xs tracking-widest opacity-70 uppercase">{dictionary?.common?.search ?? "Ara"}</span>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 opacity-70">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
        ) : (
          <>
            <button className="text-base tracking-wide hover:opacity-80 transition-opacity uppercase">
              {dictionary?.nav?.search_trigger ?? "ARA"}
            </button>
            <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-current opacity-100 transition-opacity duration-300 group-hover:opacity-50"></div>
          </>
        )}
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
                placeholder={dictionary?.nav?.search_placeholder ?? "Search..."}
                className="w-full text-2xl font-light border-b-2 border-gray-200 py-4 px-2 focus:outline-none focus:border-black transition-colors bg-transparent placeholder:text-gray-300"
              />
              <button 
                type="submit"
                className="absolute right-2 top-1/2 -translate-y-1/2 text-sm uppercase tracking-widest hover:opacity-70"
              >
                {dictionary?.nav?.search_trigger ?? "ARA"}
              </button>
            </form>
            <div className="mt-4 flex justify-between items-center text-xs text-gray-500">
               <span>Enter</span>
               <button onClick={closeSearch} className="hover:text-black uppercase">{dictionary?.common?.cancel ?? "CLOSE"} (ESC)</button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default SearchModal
