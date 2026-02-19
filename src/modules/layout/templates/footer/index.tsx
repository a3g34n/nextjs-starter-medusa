import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Social media icons as SVG components
const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

export default async function Footer({ dictionary }: { dictionary?: any }) {
  return (
    <footer className="bg-white w-full snap-start min-h-screen flex flex-col justify-between">
      {/* Main Footer Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 py-16">
        {/* Newsletter Section */}
        <div className="w-full max-w-xl mb-16">
          <div className="relative">
            <input
              type="email"
              placeholder={dictionary?.footer?.newsletter_placeholder ?? "BÜLTENİMİZE ABONE OLUN · E-POSTA ADRESİNİZİ GİRİN*"}
              className="w-full border-b border-gray-300 py-3 text-sm text-center text-gray-600 placeholder:text-gray-400 focus:outline-none focus:border-gray-600 transition-colors bg-transparent"
            />
            <button className="absolute right-0 top-1/2 -translate-y-1/2 w-8 h-8 border border-gray-400 rounded-full flex items-center justify-center hover:border-gray-600 transition-colors">
              <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Social Media & App Section */}
        <div className="flex flex-col sm:flex-row items-center gap-12 mb-16">
          {/* Social Links */}
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-4">{dictionary?.footer?.follow_us ?? "Bizi takip edin"}</p>
            <div className="flex items-center justify-center gap-4">
              <a href="https://www.instagram.com/lounjstudio/" className="text-gray-700 hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
            </div>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 sm:gap-16 text-center mb-16">
          {/* Policies */}
          <div>
            <h3 className="text-xs font-medium tracking-wider mb-4 underline underline-offset-4">{dictionary?.footer?.policies ?? "POLİTİKALAR"}</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><LocalizedClientLink href="/content/terms" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.purchase_terms ?? "SATIN ALMA KOŞULLARI"}</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/content/privacy" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.privacy ?? "GİZLİLİK POLİTİKASI"}</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/content/cookies" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.cookie_policy ?? "ÇEREZ POLİTİKASI"}</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/content/cookies-settings" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.cookie_settings ?? "TANIMLAMA BİLGİSİ AYARLARI"}</LocalizedClientLink></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-xs font-medium tracking-wider mb-4 underline underline-offset-4">{dictionary?.footer?.company ?? "ŞİRKET"}</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><LocalizedClientLink href="/content/about" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.about ?? "HAKKIMIZDA"}</LocalizedClientLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium tracking-wider mb-4 underline underline-offset-4">{dictionary?.footer?.contact_title ?? "İLETİŞİM"}</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><LocalizedClientLink href="/contact" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.contact ?? "İLETİŞİM"}</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/faq" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.help ?? "YARDIM"}</LocalizedClientLink></li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="border-t border-gray-200 py-6">
        <div className="flex items-center justify-center gap-2 text-xs text-gray-600">
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
          <span>{dictionary?.footer?.country_language ?? "TÜRKİYE / TÜRKÇE"}</span>
        </div>
      </div>
    </footer>
  )
}
