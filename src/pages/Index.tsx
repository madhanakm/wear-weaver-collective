import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Products from "@/components/Products";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Reviews from "@/components/Reviews";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Stats />
      <Products />
      <Process />
      <Services />
      <Reviews />
      <Testimonials />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;
