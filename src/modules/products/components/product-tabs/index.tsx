"use client"

import Back from "@modules/common/icons/back"
import FastDelivery from "@modules/common/icons/fast-delivery"
import Refresh from "@modules/common/icons/refresh"

import Accordion from "./accordion"
import { HttpTypes } from "@medusajs/types"

type ProductTabsProps = {
  product: HttpTypes.StoreProduct
}

const ProductTabs = ({ product }: ProductTabsProps) => {
  const tabs = [
    {
      label: "Ürün Bilgileri",
      component: <ProductInfoTab product={product} />,
    },
    {
      label: "Kargo & İade",
      component: <ShippingInfoTab />,
    },
  ]

  return (
    <div className="w-full">
      <Accordion type="multiple">
        {tabs.map((tab, i) => (
          <Accordion.Item
            key={i}
            title={tab.label}
            headingSize="medium"
            value={tab.label}
          >
            {tab.component}
          </Accordion.Item>
        ))}
      </Accordion>
    </div>
  )
}

const ProductInfoTab = ({ product }: ProductTabsProps) => {
  return (
    <div className="text-small-regular py-8">
      <div className="flex flex-col gap-y-6">
        {product.material && (
          <div>
            <span className="font-semibold">İÇERİK</span>
            <p className="mt-1">{product.material}</p>
          </div>
        )}
        {product.mid_code && (
          <div>
            <span className="font-semibold">BAKIM</span>
            <p className="mt-1 whitespace-pre-line">{product.mid_code}</p>
          </div>
        )}
        {product.origin_country && (
          <div>
            <span className="font-semibold">MENŞEİ</span>
            <p className="mt-1">{product.origin_country}</p>
          </div>
        )}
      </div>
    </div>
  )
}

const ShippingInfoTab = () => {
  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Hızlı Teslimat</span>
            <p className="max-w-sm">
              Paketiniz 3-5 iş günü içinde teslim noktanıza veya evinize
              ulaşacaktır.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Kolay Değişim</span>
            <p className="max-w-sm">
              Beden uymadı mı? Sorun değil — ürününüzü yenisiyle
              değiştirebilirsiniz.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">Kolay İade</span>
            <p className="max-w-sm">
              Ürününüzü iade edin, paranızı iade edelim. Soru sormadan —
              iadenizi en kolay şekilde gerçekleştirmeye çalışacağız.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
