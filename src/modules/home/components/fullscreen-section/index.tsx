"use client"

import Image from "next/image"
import CategoryNav from "@modules/home/components/category-nav"

interface FullscreenSectionProps {
  sectionId: string
  leftImageSrc?: string
  rightImageSrc?: string
  singleImageSrc?: string
  activeIndex: number
}

const FullscreenSection = ({
  sectionId,
  leftImageSrc,
  rightImageSrc,
  singleImageSrc,
  activeIndex,
}: FullscreenSectionProps) => {
  return (
    <section id={sectionId} className="h-screen w-full relative overflow-hidden snap-start">
      {/* Split Image Layout or Single Image */}
      {singleImageSrc ? (
        <div className="absolute inset-0">
          <Image
            src={singleImageSrc}
            alt="Section background"
            fill
            className="object-cover"
            priority
          />
        </div>
      ) : (
        <div className="flex h-full">
          {/* Left Image */}
          <div className="w-1/2 h-full relative">
            {leftImageSrc ? (
              <Image
                src={leftImageSrc}
                alt="Left section"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-stone-200 to-stone-300" />
            )}
          </div>
          {/* Right Image */}
          <div className="w-1/2 h-full relative">
            {rightImageSrc ? (
              <Image
                src={rightImageSrc}
                alt="Right section"
                fill
                className="object-cover"
                priority
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-stone-300 to-stone-400" />
            )}
          </div>
        </div>
      )}

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/10" />

      {/* Bottom Category Navigation */}
      <div className="absolute bottom-8 left-0 right-0 z-10">
        <CategoryNav activeIndex={activeIndex} />
      </div>
    </section>
  )
}

export default FullscreenSection
