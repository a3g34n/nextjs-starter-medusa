"use client"

import React, { useEffect, useState } from "react"
import Script from "next/script"
import { Spinner } from "@medusajs/icons"

type PaytrIframeProps = {
  token: string
}

declare global {
  interface Window {
    iFrameResize?: (options: any, selector: string) => void
  }
}

const PaytrIframe: React.FC<PaytrIframeProps> = ({ token }) => {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Basic timeout to hide spinner if script fails to load or iframe takes too long
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 5000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="w-full relative min-h-[400px]">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/50 z-10 transition-opacity">
          <Spinner className="animate-spin h-8 w-8 text-ui-fg-interactive" />
        </div>
      )}

      <Script
        src="https://www.paytr.com/js/iframeResizer.min.js"
        strategy="afterInteractive"
        onLoad={() => {
          if (window.iFrameResize) {
            window.iFrameResize({}, "#paytriframe")
          }
          setIsLoading(false)
        }}
      />

      <iframe
        src={`https://www.paytr.com/odeme/guvenli/${token}`}
        id="paytriframe"
        frameBorder="0"
        scrolling="no"
        style={{ width: "100%", opacity: isLoading ? 0 : 1, transition: "opacity 0.3s ease-in" }}
      />
    </div>
  )
}

export default PaytrIframe
