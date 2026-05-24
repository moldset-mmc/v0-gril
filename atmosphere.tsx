import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Highlights } from "@/components/highlights"
import { Menu } from "@/components/menu"
import { Atmosphere } from "@/components/atmosphere"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main
      className="bg-repeat"
      style={{
        backgroundImage: "url('/images/wood_light.jpg')",
        backgroundSize: "220px auto",
      }}
    >
      <Navbar />
      <Hero />
      <Highlights />
      <Menu />
      <Atmosphere />
      <Contact />
      <Footer />
    </main>
  )
}
