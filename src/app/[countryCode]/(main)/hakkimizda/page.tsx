import { Metadata } from "next"
import AboutPage from "@modules/about"

export const metadata: Metadata = {
  title: "Hakkımızda",
  description: "LOUNJ Studio hakkında",
}

export default function HakkimizdaPage() {
  return <AboutPage />
}
