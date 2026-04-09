import { Heading } from "@medusajs/ui"
import LocalizedClientLink from "@modules/common/components/localized-client-link"
import React from "react"

const Help = ({ dictionary }: { dictionary?: any }) => {
  return (
    <div className="mt-6">
      <Heading className="text-base-semi">
        {dictionary?.order?.need_help ?? "Need help?"}
      </Heading>
      <div className="text-base-regular my-2">
        <ul className="gap-y-2 flex flex-col">
          <li>
            <LocalizedClientLink href="/contact">
              {dictionary?.order?.contact_us ?? "Contact"}
            </LocalizedClientLink>
          </li>
          <li>
            <LocalizedClientLink href="/contact">
              Returns & Exchanges
            </LocalizedClientLink>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default Help
