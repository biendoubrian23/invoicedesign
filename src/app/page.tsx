import { Header, Footer } from "@/components/layout";
import {
  Hero,
  Features,
  HowItWorks,
  TemplateGallery,
  PricingTeaser,
} from "@/components/landing";
import { OrganizationSchema } from "@/components/seo";

export default function Home() {
  return (
    <>
      <OrganizationSchema />
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
