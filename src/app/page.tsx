import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustBadges from "@/components/TrustBadges";
import ProductGrid from "@/components/ProductGrid";
import FeatureSection from "@/components/FeatureSection";
import Testimonials from "@/components/Testimonials";
import CTABanner from "@/components/CTABanner";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <CartProvider>
      <main>
        <Header />
        <Hero />
        <TrustBadges />
        <ProductGrid />
        <FeatureSection />
        <Testimonials />
        <CTABanner />
        <Newsletter />
        <Footer />
      </main>
    </CartProvider>
  );
}
