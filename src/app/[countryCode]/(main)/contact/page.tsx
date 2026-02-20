import { Metadata } from "next"

export const metadata: Metadata = {
  title: "İletişim",
  description: "LounjStudio İletişim Bilgileri",
}

export default function ContactPage() {
  return (
    <div className="content-container py-12 small:py-24 pt-[120px] md:pt-32">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-light tracking-wide mb-12 text-center uppercase">İletişim</h1>
        
        <div className="space-y-8 text-gray-600 font-light">
          <p className="text-lg leading-relaxed text-center">
            Sorularınız, önerileriniz veya iş birlikleri için bize aşağıdaki kanallardan ulaşabilirsiniz.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
            <div className="bg-gray-50 p-8 text-center">
              <h3 className="text-lg font-medium mb-4 uppercase">Müşteri Hizmetleri</h3>
              <p className="mb-2">E-posta: info@lounjstudio.com</p>
              <p>Telefon: +90 212 123 45 67</p>
              <p className="text-sm text-gray-500 mt-4">Pazartesi - Cuma: 09:00 - 18:00</p>
            </div>

            <div className="bg-gray-50 p-8 text-center">
              <h3 className="text-lg font-medium mb-4 uppercase">Adres</h3>
              <p>LounjStudio Genel Merkez</p>
              <p>İstanbul, Türkiye</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
