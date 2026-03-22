import { Metadata } from "next"
import CollectionsListTemplate from "@modules/collections/templates/collections-list"

export const metadata: Metadata = {
  title: "Koleksiyonlar",
  description: "Tüm koleksiyonlarımızı keşfedin.",
}

export default function CollectionsPage() {
  return <CollectionsListTemplate />
}
