import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-manufacturing.jpg";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src={heroImage} 
          alt="Modern sportswear manufacturing facility"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background/95 via-background/80 to-background/60" />
      </div>

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent animate-in fade-in slide-in-from-bottom-4 duration-1000">
            Premium Custom Sportswear Manufacturing
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-in fade-in slide-in-from-bottom-6 duration-1000 delay-200">
            Transform your brand with high-quality customized t-shirts, tracksuits, hoodies, and sportswear. From concept to delivery, we bring your vision to life.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 animate-in fade-in slide-in-from-bottom-8 duration-1000 delay-300">
            <Button size="lg" variant="hero" className="text-lg">
              Get a Quote
              <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="secondary" className="text-lg">
              View Products
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
