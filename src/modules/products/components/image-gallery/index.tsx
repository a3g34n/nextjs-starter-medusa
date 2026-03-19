"use client"

import { HttpTypes } from "@medusajs/types"
import { Container } from "@medusajs/ui"
import Image from "next/image"
import { useRef, useState } from "react"

type ImageGalleryProps = {
  images: HttpTypes.StoreProductImage[]
}

const ImageGallery = ({ images }: ImageGalleryProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToImage = (index: number) => {
    setActiveIndex(index)
    if (scrollRef.current) {
      const height = scrollRef.current.offsetHeight
      scrollRef.current.scrollTo({
        top: index * height,
        behavior: "smooth",
      })
    }
  }

  const handleScroll = () => {
    if (scrollRef.current) {
      const height = scrollRef.current.offsetHeight
      const index = Math.round(scrollRef.current.scrollTop / height)
      setActiveIndex(index)
    }
  }

  return (
    <div className="flex items-start relative w-full">
      {/* Mobile: vertical scroll snap within fixed-height container */}
      <div className="block small:hidden w-full">
        <div
          ref={scrollRef}
          className="snap-y snap-mandatory overflow-y-scroll"
          style={{
            height: "125vw",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          onScroll={handleScroll}
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className="relative w-full snap-start"
              style={{ height: "125vw" }}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  priority={index === 0}
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="100vw"
                  style={{ objectFit: "cover" }}
                />
              )}
            </div>
          ))}
        </div>

        {/* Thumbnail row */}
        {images.length > 1 && (
          <div
            className="flex gap-x-2 mt-2 px-4 overflow-x-auto"
            style={{ scrollbarWidth: "none" }}
          >
            {images.map((image, index) => (
              <button
                key={image.id}
                onClick={() => scrollToImage(index)}
                className={`relative flex-shrink-0 w-16 h-16 border-2 transition-colors ${
                  activeIndex === index
                    ? "border-gray-900"
                    : "border-transparent opacity-60"
                }`}
              >
                {!!image.url && (
                  <Image
                    src={image.url}
                    alt={`Thumbnail ${index + 1}`}
                    fill
                    sizes="64px"
                    style={{ objectFit: "cover" }}
                  />
                )}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Desktop: vertical stack */}
      <div className="hidden small:flex flex-col flex-1 small:mx-16 gap-y-4">
        {images.map((image, index) => {
          return (
            <Container
              key={image.id}
              className="relative aspect-[29/34] w-full overflow-hidden bg-ui-bg-subtle"
              id={image.id}
            >
              {!!image.url && (
                <Image
                  src={image.url}
                  priority={index <= 2 ? true : false}
                  className="absolute inset-0 rounded-rounded"
                  alt={`Product image ${index + 1}`}
                  fill
                  sizes="(max-width: 576px) 280px, (max-width: 768px) 360px, (max-width: 992px) 480px, 800px"
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}
            </Container>
          )
        })}
      </div>
    </div>
  )
}

export default ImageGallery
