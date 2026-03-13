"use client"

import Image from "next/image"


interface FullscreenSectionProps {
  sectionId: string
  leftImageSrc?: string
  rightImageSrc?: string
  singleImageSrc?: string
  mobileImageSrc?: string
  activeIndex: number
}

const FullscreenSection = ({
  sectionId,
  leftImageSrc,
  rightImageSrc,
  singleImageSrc,
  mobileImageSrc,
}: FullscreenSectionProps) => {
  return (
    <section id={sectionId} className="h-screen w-full relative overflow-hidden snap-start">
      {/* Mobile image (shown only on small screens when mobileImageSrc is provided) */}
      {mobileImageSrc && (
        <div className="block md:hidden absolute inset-0">
          <Image
            src={mobileImageSrc}
            alt="Section background mobile"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      )}

      {/* Desktop layout (always visible on md+, visible on mobile when no mobileImageSrc) */}
      <div className={`absolute inset-0 ${mobileImageSrc ? "hidden md:block" : "block"}`}>
        {/* Split Image Layout or Single Image */}
        {singleImageSrc ? (
          <div className="absolute inset-0">
            <Image
              src={singleImageSrc}
              alt="Section background"
              fill
              className="object-cover object-[25%_center] md:object-center"
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
      </div>

      {/* Dark overlay for text contrast */}
      <div className="absolute inset-0 bg-black/10" />
    </section>
  )
}

export default FullscreenSection
