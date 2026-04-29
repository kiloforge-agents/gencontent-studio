import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Studio } from "@/components/Studio";
import { About } from "@/components/About";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <>
      <Header />
      <main className="flex-1">
        <Hero />
        <Studio />
        <About />
      </main>
      <Footer />
    </>
  );
}
