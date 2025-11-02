import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState } from "react";
import { X } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import "../animations.css";
import gallery1 from "@/assets/gallery-1.jpg";
import gallery2 from "@/assets/gallery-2.jpg";
import gallery3 from "@/assets/gallery-3.jpg";
import gallery4 from "@/assets/gallery-4.jpg";
import gallery5 from "@/assets/gallery-5.jpg";
import gallery6 from "@/assets/gallery-6.jpg";

const galleryItems = [
  {
    image: gallery1,
    title: "Custom Team T-Shirts",
    category: "T-Shirts",
  },
  {
    image: gallery2,
    title: "Professional Tracksuits",
    category: "Tracksuits",
  },
  {
    image: gallery3,
    title: "Branded Hoodies",
    category: "Hoodies",
  },
  {
    image: gallery4,
    title: "Team Jerseys",
    category: "Sportswear",
  },
  {
    image: gallery5,
    title: "Athletic Wear Collection",
    category: "Sportswear",
  },
  {
    image: gallery6,
    title: "Complete Team Uniforms",
    category: "Sportswear",
  },
];

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [heroRef, heroVisible] = useIntersectionObserver();
  const [galleryRef, galleryVisible] = useIntersectionObserver();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        {/* Enhanced Dynamic Background */}
        <div className="absolute inset-0">
          {/* Large Morphing Blobs */}
          <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-primary/15 to-accent/15 blur-3xl animate-morphing animate-drift" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-0 right-0 w-80 h-80 bg-gradient-to-tl from-accent/12 to-primary/12 blur-3xl animate-float animate-glow" style={{ animationDuration: '15s' }}></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-gradient-to-r from-primary/10 to-accent/10 blur-2xl animate-morphing" style={{ animationDuration: '25s', animationDelay: '5s' }}></div>
          
          {/* Rotating Geometric Patterns */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-kaleidoscope"
              style={{
                left: `${15 + (i * 8)}%`,
                top: `${10 + (i % 4) * 20}%`,
                width: `${40 + Math.random() * 60}px`,
                height: `${40 + Math.random() * 60}px`,
                background: `linear-gradient(${i * 30}deg, rgba(var(--primary-rgb), ${0.1 + Math.random() * 0.1}), rgba(var(--accent-rgb), ${0.05 + Math.random() * 0.1}))`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${10 + i * 2}s`,
                clipPath: i % 3 === 0 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : i % 3 === 1 ? 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' : 'circle(50%)'
              }}
            />
          ))}
          
          {/* Multiple Ripple Layers */}
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-primary/20 rounded-full animate-ripple"
              style={{
                left: `${20 + i * 15}%`,
                top: `${25 + i * 10}%`,
                width: `${100 + i * 50}px`,
                height: `${100 + i * 50}px`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${4 + i}s`
              }}
            />
          ))}
          
          {/* Orbiting Particle Systems */}
          {[...Array(3)].map((_, systemIndex) => (
            <div
              key={systemIndex}
              className="absolute"
              style={{
                left: `${30 + systemIndex * 25}%`,
                top: `${20 + systemIndex * 30}%`,
                width: '120px',
                height: '120px'
              }}
            >
              {[...Array(6)].map((_, particleIndex) => (
                <div
                  key={particleIndex}
                  className="absolute w-3 h-3 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full animate-orbit"
                  style={{
                    animationDelay: `${particleIndex * 0.5 + systemIndex}s`,
                    animationDuration: `${6 + systemIndex * 2}s`,
                    transformOrigin: '60px 60px'
                  }}
                />
              ))}
            </div>
          ))}
          
          {/* Flowing Energy Streams */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-slide"
              style={{
                width: '400%',
                top: `${5 + i * 12}%`,
                left: '-150%',
                animationDelay: `${i * 0.7}s`,
                animationDuration: `${5 + Math.random() * 3}s`,
                transform: `rotate(${-20 + i * 5}deg)`
              }}
            />
          ))}
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Our Gallery
            </h1>
            <p className={`text-xl text-muted-foreground transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '300ms' }}>
              Explore our portfolio of custom sportswear and see the quality we deliver
            </p>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section ref={galleryRef} className="py-20 relative overflow-hidden">
        {/* Complex Gallery Background System */}
        <div className="absolute inset-0">
          {/* Massive Gradient Orbs */}
          <div className="absolute -top-32 -left-32 w-96 h-96 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl animate-morphing animate-drift" style={{ animationDuration: '30s' }}></div>
          <div className="absolute -bottom-32 -right-32 w-80 h-80 bg-gradient-to-tl from-accent/15 to-primary/15 blur-3xl animate-float animate-glow" style={{ animationDuration: '25s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-gradient-to-r from-primary/12 to-accent/12 blur-2xl animate-morphing" style={{ animationDuration: '35s' }}></div>
          
          {/* Dynamic Geometric Grid */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute animate-float"
              style={{
                left: `${(i % 5) * 20 + 5}%`,
                top: `${Math.floor(i / 5) * 25 + 10}%`,
                width: `${30 + Math.random() * 40}px`,
                height: `${30 + Math.random() * 40}px`,
                background: `linear-gradient(${i * 18}deg, rgba(var(--primary-rgb), ${0.08 + Math.random() * 0.1}), rgba(var(--accent-rgb), ${0.05 + Math.random() * 0.08}))`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${8 + Math.random() * 6}s`,
                clipPath: i % 4 === 0 ? 'polygon(30% 0%, 70% 0%, 100% 50%, 70% 100%, 30% 100%, 0% 50%)' : 
                          i % 4 === 1 ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 
                          i % 4 === 2 ? 'circle(50%)' : 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
                transform: `rotate(${i * 15}deg)`
              }}
            />
          ))}
          
          {/* Multi-Layer Ripple System */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-primary/15 rounded-full animate-ripple"
              style={{
                left: `${10 + (i % 3) * 30}%`,
                top: `${15 + Math.floor(i / 3) * 25}%`,
                width: `${80 + i * 30}px`,
                height: `${80 + i * 30}px`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${3 + i * 0.5}s`
              }}
            />
          ))}
          
          {/* Complex Orbital Systems */}
          {[...Array(4)].map((_, systemIndex) => (
            <div
              key={systemIndex}
              className="absolute"
              style={{
                left: `${20 + systemIndex * 20}%`,
                top: `${25 + systemIndex * 15}%`,
                width: '160px',
                height: '160px'
              }}
            >
              {[...Array(8)].map((_, particleIndex) => (
                <div
                  key={particleIndex}
                  className="absolute w-2 h-2 bg-gradient-to-r from-primary/50 to-accent/50 rounded-full animate-orbit"
                  style={{
                    animationDelay: `${particleIndex * 0.3 + systemIndex * 2}s`,
                    animationDuration: `${8 + systemIndex * 3}s`,
                    transformOrigin: '80px 80px'
                  }}
                />
              ))}
            </div>
          ))}
          
          {/* Cascading Wave Patterns */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute h-px bg-gradient-to-r from-transparent via-primary/25 to-transparent animate-wave"
              style={{
                width: '500%',
                top: `${i * 8}%`,
                left: '-200%',
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${6 + Math.random() * 4}s`,
                transform: `rotate(${-25 + i * 4}deg)`
              }}
            />
          ))}
          
          {/* Floating Particle Cloud */}
          {[...Array(25)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-primary/30 rounded-full animate-drift"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.2}s`,
                animationDuration: `${10 + Math.random() * 8}s`
              }}
            />
          ))}
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {galleryItems.map((item, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-lg cursor-pointer aspect-square border border-border/50 hover:border-primary/30 transition-all duration-700 hover:shadow-[var(--shadow-lg)] ${
                  galleryVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-3'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:rotate-1"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-end">
                  <div className="p-6 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
                    <p className="text-sm text-accent font-semibold mb-1">{item.category}</p>
                    <h3 className="text-xl font-bold">{item.title}</h3>
                  </div>
                </div>
                
                {/* Hover Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-30 transition-opacity duration-300 blur-xl"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lightbox */}
      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
          <img
            src={galleryItems[selectedImage].image}
            alt={galleryItems[selectedImage].title}
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-[var(--shadow-lg)]"
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
