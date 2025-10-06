import Hero from "@/components/Hero";
import Products from "@/components/Products";
import Services from "@/components/Services";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <Products />
      <Services />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
