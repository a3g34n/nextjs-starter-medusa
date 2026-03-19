import { HttpTypes } from "@medusajs/types"
import { clx } from "@medusajs/ui"
import Image from "next/image"
import React from "react"

type OptionSelectProps = {
  option: HttpTypes.StoreProductOption
  current: string | undefined
  updateOption: (title: string, value: string) => void
  title: string
  disabled: boolean
  "data-testid"?: string
}

const colorMap: Record<string, string> = {
  "forest green": "#4a6741",
  "black": "#1a1a1a",
  "siyah": "#1a1a1a",
  "navy": "#1e3a6e",
  "lacivert": "#1e3a6e",
  "brown": "#8B5E3C",
  "kahverengi": "#8B5E3C",
  "burgundy": "#7B2D3E",
  "bordo": "#7B2D3E",
  "red": "#dc2626",
  "kırmızı": "#dc2626",
  "hot pink": "#e91e8c",
  "pink": "#F472B6",
  "pembe": "#F472B6",
  "light pink": "#FFC0CB",
  "açık pembe": "#FFC0CB",
  "lilac": "#C4B5FD",
  "lila": "#C4B5FD",
  "lavender": "#C4B5FD",
  "sky blue": "#7dd3fc",
  "light blue": "#7dd3fc",
  "açık mavi": "#7dd3fc",
  "green": "#22c55e",
  "yeşil": "#22c55e",
  "yellow": "#eab308",
  "sarı": "#eab308",
  "orange": "#f97316",
  "turuncu": "#f97316",
  "tan": "#d2b48c",
  "beige": "#d2b48c",
  "bej": "#d2b48c",
  "white": "#f0ede8",
  "beyaz": "#f0ede8",
  "gray": "#9ca3af",
  "grey": "#9ca3af",
  "gri": "#9ca3af",
}

const fontImageMap: Record<string, string> = {
  "block": "/images/font-block.webp",
  "modern": "/images/font-block.webp",
  "script": "/images/font-script.webp",
  "el yazısı": "/images/font-script.webp",
  "cursive": "/images/font-script.webp",
  "serif": "/images/font-script.webp",
}

const fontStyleMap: Record<string, React.CSSProperties> = {
  "block": {
    fontFamily: '"Arial Black", "Helvetica Neue", sans-serif',
    fontWeight: 900,
    fontSize: "1.75rem",
    letterSpacing: "0.05em",
  },
  "modern": {
    fontFamily: '"Arial Black", "Helvetica Neue", sans-serif',
    fontWeight: 900,
    fontSize: "1.75rem",
    letterSpacing: "0.05em",
  },
  "script": {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontStyle: "italic",
    fontSize: "1.6rem",
  },
  "el yazısı": {
    fontFamily: "Georgia, 'Times New Roman', serif",
    fontStyle: "italic",
    fontSize: "1.6rem",
  },
  "cursive": { fontFamily: "cursive", fontSize: "1.6rem" },
  "serif": {
    fontFamily: "Georgia, serif",
    fontStyle: "italic",
    fontSize: "1.6rem",
  },
}

function isColorOption(title: string, values?: string[]): boolean {
  const lower = title.toLowerCase()
  if (
    lower.includes("color") ||
    lower.includes("colour") ||
    lower.includes("renk")
  ) {
    return true
  }
  // Also detect by checking if the values themselves are color names or hex codes
  if (values && values.length > 0) {
    const matches = values.filter(
      (v) => colorMap[v.toLowerCase()] !== undefined || /^#[0-9a-fA-F]{3,6}$/.test(v)
    )
    return matches.length >= Math.ceil(values.length / 2)
  }
  return false
}

function isFontOption(title: string): boolean {
  const lower = title.toLowerCase()
  return lower.includes("font") || lower.includes("yazı tipi")
}

function getColorForValue(value: string): string {
  if (/^#[0-9a-fA-F]{3,6}$/.test(value)) return value
  return colorMap[value.toLowerCase()] ?? "#cccccc"
}

function getFontStyleForValue(value: string): React.CSSProperties {
  return (
    fontStyleMap[value.toLowerCase()] ?? {
      fontFamily: "sans-serif",
      fontWeight: 700,
      fontSize: "1.5rem",
    }
  )
}

const OptionSelect: React.FC<OptionSelectProps> = ({
  option,
  current,
  updateOption,
  title,
  "data-testid": dataTestId,
  disabled,
}) => {
  const filteredOptions = (option.values ?? []).map((v) => v.value)

  if (isFontOption(title)) {
    return (
      <div className="flex flex-col gap-y-1.5">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-500">
          {title} <span className="text-red-500">*</span>
        </span>
        <div className="flex gap-2" data-testid={dataTestId}>
          {filteredOptions.map((v) => {
            const imgSrc = fontImageMap[v.toLowerCase()] ?? "/images/font-block.webp"
            const isSelected = v === current
            return (
              <button
                key={v}
                onClick={() => updateOption(option.id, v)}
                disabled={disabled}
                className={clx(
                  "border w-[68px] h-[50px] overflow-hidden flex items-center justify-center transition-all",
                  {
                    "border-gray-800": isSelected,
                    "border-gray-200 hover:border-gray-400": !isSelected,
                  }
                )}
                data-testid="option-button"
              >
                <Image
                  src={imgSrc}
                  alt={v}
                  width={80}
                  height={58}
                  className="object-contain"
                />
              </button>
            )
          })}
        </div>
      </div>
    )
  }

  if (isColorOption(title, filteredOptions)) {
    return (
      <div className="flex flex-col gap-y-1.5">
        <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-500">
          {title} <span className="text-red-500">*</span>
        </span>
        <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
          {filteredOptions.map((v) => {
            const color = getColorForValue(v)
            const isSelected = v === current
            return (
              <button
                key={v}
                onClick={() => updateOption(option.id, v)}
                disabled={disabled}
                title={v}
                className={clx(
                  "w-7 h-7 rounded-full transition-all border border-transparent",
                  {
                    "ring-2 ring-offset-2 ring-gray-800": isSelected,
                    "hover:ring-2 hover:ring-offset-1 hover:ring-gray-400":
                      !isSelected,
                  }
                )}
                style={{ backgroundColor: color }}
                data-testid="option-button"
              />
            )
          })}
        </div>
      </div>
    )
  }

  // Default: text buttons
  return (
    <div className="flex flex-col gap-y-1.5">
      <span className="text-[10px] font-semibold tracking-widest uppercase text-gray-500">
        {title} <span className="text-red-500">*</span>
      </span>
      <div className="flex flex-wrap gap-2" data-testid={dataTestId}>
        {filteredOptions.map((v) => {
          return (
            <button
              onClick={() => updateOption(option.id, v)}
              key={v}
              className={clx(
                "border text-xs h-8 px-3 flex-1 transition-all",
                {
                  "border-gray-800 bg-gray-50": v === current,
                  "border-gray-200 hover:border-gray-400": v !== current,
                }
              )}
              disabled={disabled}
              data-testid="option-button"
            >
              {v}
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default OptionSelect
