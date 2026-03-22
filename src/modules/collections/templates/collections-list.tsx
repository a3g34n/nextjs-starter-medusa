import { listCollections } from "@lib/data/collections"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import Image from "next/image"
import PlaceholderImage from "@modules/common/icons/placeholder-image"

function CollectionMosaic({ thumbnails, title }: { thumbnails: string[], title: string }) {
  const count = thumbnails.length

  if (count === 0) {
    return (
      <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
        <PlaceholderImage size={24} />
      </div>
    )
  }

  if (count === 1) {
    return (
      <Image
        src={thumbnails[0]}
        alt={title}
        fill
        className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 640px) 100vw, 50vw"
        quality={70}
      />
    )
  }

  if (count === 2) {
    return (
      <div className="absolute inset-0 flex gap-0.5">
        {thumbnails.slice(0, 2).map((src, i) => (
          <div key={i} className="relative flex-1 overflow-hidden">
            <Image
              src={src}
              alt={title}
              fill
              className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
              sizes="25vw"
              quality={70}
            />
          </div>
        ))}
      </div>
    )
  }

  if (count === 3) {
    // 1 large left (60%) + 2 stacked right (40%)
    return (
      <div className="absolute inset-0 flex gap-0.5">
        <div className="relative w-[60%] overflow-hidden">
          <Image
            src={thumbnails[0]}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="30vw"
            quality={70}
          />
        </div>
        <div className="flex flex-col flex-1 gap-0.5">
          {thumbnails.slice(1, 3).map((src, i) => (
            <div key={i} className="relative flex-1 overflow-hidden">
              <Image
                src={src}
                alt={title}
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="20vw"
                quality={70}
              />
            </div>
          ))}
        </div>
      </div>
    )
  }

  // 4+ images: 1 large top-left + 3 smaller (top-right, bottom-left, bottom-right)
  return (
    <div className="absolute inset-0 grid grid-cols-3 grid-rows-2 gap-0.5">
      <div className="relative col-span-2 row-span-2 overflow-hidden">
        <Image
          src={thumbnails[0]}
          alt={title}
          fill
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
          sizes="33vw"
          quality={70}
        />
      </div>
      {thumbnails.slice(1, 4).map((src, i) => (
        <div key={i} className="relative overflow-hidden">
          <Image
            src={src}
            alt={title}
            fill
            className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
            sizes="17vw"
            quality={70}
          />
        </div>
      ))}
    </div>
  )
}

export default async function CollectionsListTemplate() {
  const { collections } = await listCollections({
    fields: "*products,+products.thumbnail",
  })

  return (
    <div className="flex flex-col py-6 pt-0 content-container">
      <div className="h-32 md:h-28 w-full"></div>

      {/* Breadcrumb + title */}
      <div className="px-4 pt-4 mb-10">
        <div className="text-xs text-gray-500 uppercase tracking-widest mb-4">
          <LocalizedClientLink href="/" className="hover:text-black">ANASAYFA</LocalizedClientLink>
          <span className="mx-2">/</span>
          <span className="text-black border-b border-black">KOLEKSİYONLAR</span>
        </div>
        <h1 className="text-2xl tracking-wide">Koleksiyonlar</h1>
      </div>

      {/* Collections grid */}
      <div className="grid grid-cols-1 small:grid-cols-2 medium:grid-cols-3 gap-8 px-4">
        {collections.map((col) => {
          const thumbnails = (col.products ?? [])
            .map((p: any) => p.thumbnail)
            .filter(Boolean) as string[]

          return (
            <LocalizedClientLink
              key={col.id}
              href={`/collections/${col.handle}`}
              className="group flex flex-col gap-3"
            >
              {/* Card image area — fixed aspect, mosaic inside */}
              <div className="relative aspect-[4/3] overflow-hidden bg-gray-100">
                <CollectionMosaic thumbnails={thumbnails} title={col.title} />
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm uppercase tracking-widest group-hover:text-gray-500 transition-colors">
                  {col.title}
                </span>
                <span className="text-xs text-gray-400">
                  {col.products?.length ? `${col.products.length} ürün` : "Yakında"}
                </span>
              </div>
            </LocalizedClientLink>
          )
        })}
      </div>
    </div>
  )
}
