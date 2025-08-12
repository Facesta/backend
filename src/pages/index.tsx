import About from "@/components/About";
import CallToAction from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Features from "@/components/Features";
import Hero from "@/components/Hero";
import RootLayout from "@/components/Layout";

export default function Home() {
  return (
    <RootLayout>
      <Hero />
      <About />
      <Features />
      <FAQ />
      <CallToAction />
    </RootLayout>
  );
}
