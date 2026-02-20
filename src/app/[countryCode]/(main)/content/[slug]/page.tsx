import { Metadata } from "next"
import { notFound } from "next/navigation"

type Props = {
  params: Promise<{
    countryCode: string
    slug: string
  }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const { slug } = params
  
  const contentMap: Record<string, string> = {
    "about": "Hakkımızda",
    "terms": "Satın Alma Koşulları",
    "privacy": "Gizlilik Politikası",
    "careers": "Kariyer",
    "press": "Basın",
  }

  const title = contentMap[slug] || "LounjStudio"

  return {
    title: title,
    description: `${title} - LounjStudio`,
  }
}

export default async function ContentPage(props: Props) {
  const params = await props.params
  const { slug } = params

  // This is a simple static content mapping for demonstration.
  // In a real application, you might fetch this from a CMS or Medusa.
  const content: Record<string, { title: string; body: React.ReactNode }> = {
    "about": {
      title: "Hakkımızda",
      body: (
        <>
          <p>LounjStudio, modern yaşam tarzını yansıtan, konfor ve şıklığı bir araya getiren bir moda markasıdır.</p>
          <p>Kaliteli kumaşlar, özenli tasarımlar ve sürdürülebilir üretim anlayışıyla sizlere en iyisini sunmayı hedefliyoruz.</p>
        </>
      )
    },
    "terms": {
      title: "Satın Alma Koşulları",
      body: (
        <>
          <p>Lütfen alışveriş yapmadan önce satın alma koşullarımızı dikkatlice okuyunuz.</p>
          <h3 className="text-lg font-medium mt-6 mb-2">1. Sipariş</h3>
          <p>Sitemiz üzerinden verdiğiniz siparişler, stok durumuna göre işleme alınır.</p>
          <h3 className="text-lg font-medium mt-6 mb-2">2. Ödeme</h3>
          <p>Kredi kartı ve diğer güvenli ödeme yöntemleri ile alışveriş yapabilirsiniz.</p>
        </>
      )
    },
    "privacy": {
      title: "Gizlilik Politikası",
      body: (
        <>
          <p>Kişisel verilerinizin güvenliği bizim için önemlidir.</p>
          <p>Verileriniz, yasal düzenlemelere uygun olarak korunmakta ve işlenmektedir.</p>
        </>
      )
    },
    "careers": {
      title: "Kariyer",
      body: (
        <>
          <p>LounjStudio ekibine katılmak ister misiniz?</p>
          <p>Açık pozisyonlarımız için LinkedIn sayfamızı takip edebilirsiniz.</p>
        </>
      )
    },
     "press": {
      title: "Basın",
      body: (
        <>
          <p>Basın bültenleri ve medya kitimiz için iletişime geçebilirsiniz.</p>
        </>
      )
    }
  }

  const pageContent = content[slug]

  if (!pageContent) {
    return notFound()
  }

  return (
    <div className="content-container py-12 small:py-24 pt-[120px] md:pt-32">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-light tracking-wide mb-12 text-center uppercase">{pageContent.title}</h1>
        <div className="space-y-6 text-gray-600 font-light leading-relaxed">
          {pageContent.body}
        </div>
      </div>
    </div>
  )
}
