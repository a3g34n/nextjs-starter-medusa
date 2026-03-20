import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="bg-white pt-[60px] md:pt-20">
      <div className="relative w-full">
        <Image
          src="/images/about/hakkimizde.webp"
          alt="Hakkımızda - LOUNJ Studio"
          width={0}
          height={0}
          sizes="100vw"
          className="w-full h-auto"
          priority
        />
      </div>
    </div>
  )
}
