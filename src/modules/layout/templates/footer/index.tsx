import LocalizedClientLink from "@modules/common/components/localized-client-link"

// Social media icons as SVG components
const FacebookIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

const PinterestIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.627 0-12 5.372-12 12 0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146 1.124.347 2.317.535 3.554.535 6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/>
  </svg>
)

const YoutubeIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
  </svg>
)

const XIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
  </svg>
)

const SpotifyIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
  </svg>
)

const TiktokIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>
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
            <div className="flex items-center gap-4">
              <a href="https://facebook.com" className="text-gray-700 hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer"><FacebookIcon /></a>
              <a href="https://instagram.com" className="text-gray-700 hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer"><InstagramIcon /></a>
              <a href="https://pinterest.com" className="text-gray-700 hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer"><PinterestIcon /></a>
              <a href="https://youtube.com" className="text-gray-700 hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer"><YoutubeIcon /></a>
              <a href="https://x.com" className="text-gray-700 hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer"><XIcon /></a>
              <a href="https://spotify.com" className="text-gray-700 hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer"><SpotifyIcon /></a>
              <a href="https://tiktok.com" className="text-gray-700 hover:text-gray-900 transition-colors" target="_blank" rel="noopener noreferrer"><TiktokIcon /></a>
            </div>
          </div>

          {/* App QR Code */}
          <div className="text-center">
            <p className="text-xs text-gray-600 mb-4">{dictionary?.footer?.download_app ?? "Uygulamamızı indirin"}</p>
            <div className="w-24 h-24 bg-gray-100 border border-gray-200 flex items-center justify-center">
              {/* Placeholder for QR code */}
              <span className="text-xs text-gray-400">{dictionary?.footer?.qr_code ?? "QR"}</span>
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
              <li><LocalizedClientLink href="/content/careers" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.careers ?? "BİZİMLE ÇALIŞIN"}</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/content/press" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.press ?? "BASIN"}</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/store" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.store_feel ?? "MAĞAZA HİS"}</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/content/about" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.about ?? "HAKKIMIZDA"}</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/sitemap" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.sitemap ?? "SİTE HARİTASI"}</LocalizedClientLink></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-medium tracking-wider mb-4 underline underline-offset-4">{dictionary?.footer?.contact_title ?? "İLETİŞİM"}</h3>
            <ul className="space-y-2 text-xs text-gray-600">
              <li><LocalizedClientLink href="/contact" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.contact ?? "İLETİŞİM"}</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/faq" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.help ?? "YARDIM"}</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/checkout" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.guest_checkout ?? "MİSAFİR OLARAK ALIŞVERİŞ YAP"}</LocalizedClientLink></li>
              <li><LocalizedClientLink href="/store-locations" className="hover:text-gray-900 transition-colors">{dictionary?.footer?.stores ?? "MAĞAZALAR"}</LocalizedClientLink></li>
              <li className="font-medium text-gray-900">00800448828295</li>
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

      {/* Accessibility Buttons */}
      <div className="fixed bottom-4 right-4 flex gap-2">
        <button className="w-10 h-10 bg-white border border-gray-300 rounded flex items-center justify-center hover:border-gray-600 transition-colors">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        </button>
        <button className="w-10 h-10 bg-white border border-gray-300 rounded flex items-center justify-center hover:border-gray-600 transition-colors">
          <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </button>
      </div>
    </footer>
  )
}
