import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Products from "@/components/Products";
import Process from "@/components/Process";
import Services from "@/components/Services";
import Clients from "@/components/Clients";
import Testimonials from "@/components/Testimonials";
import CTA from "@/components/CTA";
import Footer from "@/components/Footer";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import "../animations.css";

const Index = () => {
  const [statsRef, statsVisible] = useIntersectionObserver();
  const [productsRef, productsVisible] = useIntersectionObserver();
  const [processRef, processVisible] = useIntersectionObserver();
  const [servicesRef, servicesVisible] = useIntersectionObserver();
  const [clientsRef, clientsVisible] = useIntersectionObserver();
  const [testimonialsRef, testimonialsVisible] = useIntersectionObserver();
  const [ctaRef, ctaVisible] = useIntersectionObserver();

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        {/* Floating Orbs */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-xl animate-float"
            style={{
              width: `${60 + Math.random() * 120}px`,
              height: `${60 + Math.random() * 120}px`,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 2}s`,
              animationDuration: `${15 + Math.random() * 10}s`
            }}
          />
        ))}
        
        {/* Geometric Shapes */}
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="absolute border border-primary/20 animate-drift"
            style={{
              width: `${40 + i * 20}px`,
              height: `${40 + i * 20}px`,
              left: `${10 + i * 15}%`,
              top: `${20 + (i % 2) * 50}%`,
              borderRadius: i % 2 === 0 ? '50%' : '0',
              animationDelay: `${i * 3}s`,
              animationDuration: `${20 + i * 5}s`
            }}
          />
        ))}
        
        {/* Particle Dots */}
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-primary/30 rounded-full animate-glow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + Math.random() * 3}s`
            }}
          />
        ))}
      </div>
      
      <Navbar />
      <Hero />
      
      <div 
        ref={statsRef}
        className={`transition-all duration-1000 ${
          statsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
      >
        <Stats />
      </div>
      
      <div 
        ref={productsRef}
        className={`transition-all duration-1000 ${
          productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ transitionDelay: '200ms' }}
      >
        <Products />
      </div>
      
      <div 
        ref={processRef}
        className={`transition-all duration-1000 ${
          processVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ transitionDelay: '400ms' }}
      >
        <Process />
      </div>
      
      <div 
        ref={servicesRef}
        className={`transition-all duration-1000 ${
          servicesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ transitionDelay: '600ms' }}
      >
        <Services />
      </div>
      
      <div 
        ref={clientsRef}
        className={`transition-all duration-1000 ${
          clientsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ transitionDelay: '800ms' }}
      >
        <Clients />
      </div>
      
      <div 
        ref={testimonialsRef}
        className={`transition-all duration-1000 ${
          testimonialsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ transitionDelay: '1000ms' }}
      >
        <Testimonials />
      </div>
      
      <div 
        ref={ctaRef}
        className={`transition-all duration-1000 ${
          ctaVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        }`}
        style={{ transitionDelay: '1200ms' }}
      >
        <CTA />
      </div>
      
      <Footer />
    </div>
  );
};

export default Index;
