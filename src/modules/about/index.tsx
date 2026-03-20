import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="bg-white pt-[60px] md:pt-20">
      <div className="relative w-full md:w-3/5 md:mx-auto">
        <Image
          src="/images/about/hakkimizde.webp"
          alt="Hakkımızda - LOUNJ Studio"
          width={0}
          height={0}
          sizes="(min-width: 768px) 60vw, 100vw"
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  )
}
