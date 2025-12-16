import { Header, Footer } from "@/components/layout";
import {
  Hero,
  Features,
  HowItWorks,
  TemplateGallery,
  PricingTeaser,
} from "@/components/landing";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <TemplateGallery />
        <PricingTeaser />
      </main>
      <Footer />
    </>
  );
}
