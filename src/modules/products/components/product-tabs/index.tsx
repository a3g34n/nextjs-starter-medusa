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
      component: <ShippingInfoTab product={product} />,
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
        {product.metadata?.custom_description && (
          <div>
            <span className="font-semibold">AÇIKLAMA</span>
            <p className="mt-1 whitespace-pre-line">{product.metadata.custom_description as string}</p>
          </div>
        )}
        {product.material && (
          <div>
            <span className="font-semibold">İÇERİK</span>
            <p className="mt-1">{product.material}</p>
          </div>
        )}
        {product.metadata?.care_instructions && (
          <div>
            <span className="font-semibold">BAKIM</span>
            <p className="mt-1 whitespace-pre-line">{product.metadata.care_instructions as string}</p>
          </div>
        )}
        <div>
          <span className="font-semibold">MENŞEİ</span>
          <p className="mt-1">Türkiye</p>
        </div>
      </div>
    </div>
  )
}

const ShippingInfoTab = ({ product }: ProductTabsProps) => {
  const isCustomizable = product.metadata?.allows_customization === true

  if (isCustomizable) {
    return (
      <div className="text-small-regular py-8">
        <div className="grid grid-cols-1 gap-y-8">
          <div className="flex items-start gap-x-2">
            <FastDelivery />
            <div>
              <span className="font-semibold">Kargo</span>
              <p className="max-w-sm">
                Siparişiniz size özel hazırlanır.
                <br />
                3–7 iş günü içinde kargoya verilir.
              </p>
            </div>
          </div>
          <div className="flex items-start gap-x-2">
            <Back />
            <div>
              <span className="font-semibold">İade</span>
              <p className="max-w-sm">
                Kişiye özel ürünlerde iade kabul edilmemektedir.
                <br />
                Herhangi bir üretim hatasında bizimle iletişime geçebilirsiniz.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="text-small-regular py-8">
      <div className="grid grid-cols-1 gap-y-8">
        <div className="flex items-start gap-x-2">
          <FastDelivery />
          <div>
            <span className="font-semibold">Teslimat</span>
            <p className="max-w-sm">
              Siparişiniz 1–3 iş günü içinde kargoya verilir.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Refresh />
          <div>
            <span className="font-semibold">Değişim</span>
            <p className="max-w-sm">
              Ürününüz beklentinizi karşılamadıysa bizimle iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-x-2">
          <Back />
          <div>
            <span className="font-semibold">İade</span>
            <p className="max-w-sm">
              Teslimat tarihinden itibaren 14 gün içinde iade edebilirsiniz.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductTabs
