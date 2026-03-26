import Image from "next/image"
import LocalizedClientLink from "@modules/common/components/localized-client-link"

export default function AboutPage() {
  return (
    <div className="bg-white">
      <div className="flex flex-col pt-0 content-container">
        <div className="h-4 w-full"></div>
        <div className="hidden small:block px-4 pt-4 mb-6">
          <div className="text-[10px] text-gray-500 uppercase tracking-widest">
            <LocalizedClientLink href="/" className="hover:text-black">ANASAYFA</LocalizedClientLink>
            <span className="mx-2">/</span>
            <span className="text-black border-b border-black">HAKKIMIZDA</span>
          </div>
        </div>
      </div>
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
