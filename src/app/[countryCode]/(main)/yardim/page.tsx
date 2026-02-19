import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Yardım",
  description: "LounjStudio Yardım Merkezi",
}

export default function HelpPage() {
  return (
    <div className="content-container py-12 small:py-24 pt-[120px] md:pt-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-light tracking-wide mb-12 text-center uppercase">Yardım Merkezi</h1>
        
        <div className="space-y-12">
          {/* Siparişler */}
          <section className="border-b border-gray-200 pb-12">
            <h2 className="text-xl font-medium mb-4 uppercase tracking-wide">Siparişler</h2>
            <div className="space-y-4 text-gray-600 font-light">
              <p>
                <strong>Siparişimin durumunu nasıl öğrenebilirim?</strong><br/>
                "Hesabım" sayfasından siparişlerinizin güncel durumunu takip edebilirsiniz. Siparişiniz kargoya verildiğinde size e-posta ile bildirim gönderilecektir.
              </p>
              <p>
                <strong>Siparişimde değişiklik yapabilir miyim?</strong><br/>
                Siparişiniz henüz hazırlanma aşamasındaysa müşteri hizmetlerimizle iletişime geçerek değişiklik talebinde bulunabilirsiniz. Kargoya verilen siparişlerde değişiklik yapılamamaktadır.
              </p>
            </div>
          </section>

          {/* İade ve Değişim */}
          <section className="border-b border-gray-200 pb-12">
            <h2 className="text-xl font-medium mb-4 uppercase tracking-wide">İade ve Değişim</h2>
            <div className="space-y-4 text-gray-600 font-light">
              <p>
                <strong>İade politikanız nedir?</strong><br/>
                Satın aldığınız ürünleri teslim aldıktan sonra 14 gün içinde iade edebilirsiniz. Ürünlerin kullanılmamış, etiketi üzerinde ve orijinal ambalajında olması gerekmektedir.
              </p>
              <p>
                <strong>Değişim yapabilir miyim?</strong><br/>
                Değişim işlemlerini yine 14 gün içerisinde başlatabilirsiniz. Stok durumuna göre değişim sağlanacaktır.
              </p>
            </div>
          </section>

          {/* Kargo ve Teslimat */}
          <section className="border-b border-gray-200 pb-12">
            <h2 className="text-xl font-medium mb-4 uppercase tracking-wide">Kargo ve Teslimat</h2>
            <div className="space-y-4 text-gray-600 font-light">
              <p>
                <strong>Kargo ücreti ne kadar?</strong><br/>
                Belirli bir tutarın üzerindeki siparişlerinizde kargo ücretsizdir. Diğer siparişler için kargo ücreti ödeme ekranında hesaplanarak tarafınıza bildirilir.
              </p>
              <p>
                <strong>Hangi kargo firması ile çalışıyorsunuz?</strong><br/>
                Siparişleriniz anlaşmalı olduğumuz kargo firmaları (Yurtiçi Kargo, MNG Kargo vb.) ile gönderilmektedir.
              </p>
            </div>
          </section>

          {/* İletişim */}
          <section>
            <h2 className="text-xl font-medium mb-4 uppercase tracking-wide">İletişim</h2>
            <div className="space-y-4 text-gray-600 font-light">
              <p>
                Başka sorularınız varsa bize ulaşabilirsiniz:
              </p>
              <p>
                <strong>E-posta:</strong> info@lounjstudio.com<br/>
                <strong>Telefon:</strong> +90 212 123 45 67<br/>
                <strong>Çalışma Saatleri:</strong> Pazartesi - Cuma, 09:00 - 18:00
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
