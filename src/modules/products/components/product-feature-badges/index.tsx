import { Tag, LockClosedSolid, InformationCircle } from "@medusajs/icons"

const TruckIcon = ({ small }: { small?: boolean }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    strokeWidth={1.5}
    stroke="currentColor"
    className={small ? "w-3.5 h-3.5" : "w-5 h-5"}
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12"
    />
  </svg>
)

const badges = [
  {
    icon: <TruckIcon />,
    text: "3.000 TL + SİPARİŞLERDE ÜCRETSİZ KARGO",
  },
  {
    icon: <Tag className="w-5 h-5" />,
    text: "'WELCOME15' KODU İLE İLK SİPARİŞE %15 İNDİRİM",
  },
  {
    icon: <LockClosedSolid className="w-5 h-5" />,
    text: "3D SECURE GÜVENLİ ONLINE ÖDEME",
  },
  {
    icon: <InformationCircle className="w-5 h-5" />,
    text: "15 GÜN İÇERİSİNDE KOLAY İADE SİSTEMİ",
  },
]

const BadgeCard = ({ icon, text, mobile }: { icon: React.ReactNode; text: string; mobile?: boolean }) => (
  mobile ? (
    <div className="flex flex-row items-center gap-x-3 border border-ui-border-base rounded-xl px-4 h-14 shrink-0">
      <span className="text-ui-fg-subtle shrink-0">{icon}</span>
      <span className="text-xs font-medium tracking-wide text-ui-fg-base whitespace-nowrap">
        {text}
      </span>
    </div>
  ) : (
    <div className="flex flex-col items-center justify-center gap-y-1.5 text-center border border-ui-border-base rounded-lg px-3 py-3 [&_svg]:w-3.5 [&_svg]:h-3.5">
      <span className="text-ui-fg-subtle">{icon}</span>
      <span className="text-[10px] font-medium tracking-wide text-ui-fg-base leading-snug">
        {text}
      </span>
    </div>
  )
)

const ProductFeatureBadges = () => {
  return (
    <>
      {/* Mobile: infinite marquee */}
      <div className="small:hidden w-full overflow-hidden">
        <style>{`
          @keyframes marquee {
            0%   { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .marquee-track {
            display: flex;
            width: max-content;
            animation: marquee 18s linear infinite;
          }
          .marquee-track:hover {
            animation-play-state: paused;
          }
        `}</style>
        <div className="marquee-track gap-x-3">
          {[...badges, ...badges].map((badge, i) => (
            <BadgeCard key={i} icon={badge.icon} text={badge.text} mobile />
          ))}
        </div>
      </div>

      {/* Desktop: 2×2 grid */}
      <div className="hidden small:grid grid-cols-2 gap-3 w-full">
        {badges.map((badge, i) => (
          <BadgeCard key={i} icon={badge.icon} text={badge.text} />
        ))}
      </div>
    </>
  )
}

export default ProductFeatureBadges
