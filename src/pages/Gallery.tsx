import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { X } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { API_ENDPOINTS } from "@/config/api";
import "../animations.css";

// Add custom keyframes for special effects
const customStyles = `
  @keyframes fadeInOut {
    0%, 100% { opacity: 0; }
    50% { opacity: 1; }
  }
`;

// Inject styles
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = customStyles;
  document.head.appendChild(styleSheet);
}

interface GalleryItem {
  id: number;
  title: string;
  image_url: string;
  category: string;
  status: string;
  created_at: string;
}

const Gallery = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [filteredItems, setFilteredItems] = useState<GalleryItem[]>([]);
  const [filters, setFilters] = useState<string[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [heroRef, heroVisible] = useIntersectionObserver();
  const [galleryRef, galleryVisible] = useIntersectionObserver();

  useEffect(() => {
    Promise.all([
      fetch(API_ENDPOINTS.GALLERY).then(r => r.json()),
      fetch(API_ENDPOINTS.GALLERY_FILTERS).then(r => r.json())
    ]).then(([galleryData, filtersData]) => {
      setGalleryItems(galleryData);
      setFilteredItems(galleryData);
      setFilters(['all', ...filtersData.map((f: any) => f.name)]);
    }).catch(error => console.error('Error fetching data:', error));
  }, []);

  const filterItems = (category: string) => {
    setActiveFilter(category);
    if (category === 'all') {
      setFilteredItems(galleryItems);
    } else {
      setFilteredItems(galleryItems.filter(item => item.category === category));
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        {/* Enhanced Elegant Background */}
        <div className="absolute inset-0">
          {/* Dynamic Gradient Orbs */}
          <div className="absolute top-20 left-20 w-80 h-80 bg-gradient-to-br from-primary/12 to-primary/6 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '6s' }}></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-primary/8 to-primary/4 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '8s', animationDelay: '1s' }}></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-r from-primary/6 to-primary/3 rounded-full blur-2xl animate-pulse" style={{ animationDuration: '10s', animationDelay: '3s' }}></div>
          
          {/* Floating Geometric Elements */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-15 animate-float"
              style={{
                left: `${15 + i * 12}%`,
                top: `${10 + (i % 3) * 30}%`,
                width: `${40 + i * 15}px`,
                height: `${40 + i * 15}px`,
                background: `linear-gradient(${i * 45}deg, hsl(var(--primary)) / 0.15, hsl(var(--primary)) / 0.08)`,
                borderRadius: i % 3 === 0 ? '50%' : i % 3 === 1 ? '20%' : '0%',
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${12 + i * 2}s`,
                transform: `rotate(${i * 30}deg)`
              }}
            />
          ))}
          
          {/* Animated Light Rays */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-10"
              style={{
                left: `${20 + i * 20}%`,
                top: '-10%',
                width: '2px',
                height: '120%',
                background: `linear-gradient(to bottom, transparent, hsl(var(--primary)) / 0.3, transparent)`,
                animationDelay: `${i * 2}s`,
                animationDuration: '8s',
                animation: 'fadeInOut 8s ease-in-out infinite',
                transform: `rotate(${10 + i * 5}deg)`
              }}
            />
          ))}
          
          {/* Enhanced Grid Pattern */}
          <div className="absolute inset-0 opacity-8" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) / 0.3 1px, transparent 0)`,
            backgroundSize: '80px 80px'
          }}></div>
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
        {/* Enhanced Gallery Background */}
        <div className="absolute inset-0">
          {/* Dynamic Gradient Overlays */}
          <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-primary/5 to-transparent animate-pulse" style={{ animationDuration: '4s' }}></div>
          <div className="absolute bottom-0 right-0 w-full h-40 bg-gradient-to-t from-primary/5 to-transparent animate-pulse" style={{ animationDuration: '6s', animationDelay: '1s' }}></div>
          
          {/* Enhanced Floating Elements */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-12 animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${15 + i * 12}%`,
                width: `${60 + i * 30}px`,
                height: `${60 + i * 30}px`,
                background: `radial-gradient(circle, hsl(var(--primary)) / 0.25, hsl(var(--primary)) / 0.1 50%, transparent 80%)`,
                borderRadius: i % 2 === 0 ? '50%' : '30%',
                animationDelay: `${i * 2.5}s`,
                animationDuration: `${18 + i * 4}s`,
                filter: 'blur(1px)'
              }}
            />
          ))}
          
          {/* Subtle Connecting Lines */}
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="absolute opacity-8"
              style={{
                left: `${30 + i * 20}%`,
                top: `${25 + i * 20}%`,
                width: '200px',
                height: '1px',
                background: `linear-gradient(to right, transparent, hsl(var(--primary)) / 0.4, transparent)`,
                animationDelay: `${i * 3}s`,
                animationDuration: '10s',
                animation: 'fadeInOut 10s ease-in-out infinite',
                transform: `rotate(${i * 45}deg)`
              }}
            />
          ))}
          
          {/* Premium Grid Overlay */}
          <div className="absolute inset-0 opacity-6" style={{
            backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--primary)) / 0.4 1px, transparent 0)`,
            backgroundSize: '60px 60px'
          }}></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => filterItems(filter)}
                className={`relative px-8 py-3 rounded-full font-semibold transition-all duration-500 transform hover:scale-105 hover:-translate-y-1 ${
                  activeFilter === filter
                    ? 'bg-primary text-primary-foreground shadow-xl shadow-primary/25 scale-105'
                    : 'bg-secondary/80 text-secondary-foreground hover:bg-primary hover:text-primary-foreground hover:shadow-xl hover:shadow-primary/20 border border-border/30 hover:border-primary/50'
                } group overflow-hidden`}
              >
                {/* Animated background glow */}
                <div className="absolute inset-0 bg-gradient-to-r from-primary/0 via-primary/20 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                
                {/* Button text */}
                <span className="relative z-10">
                  {filter === 'all' ? 'All' : filter}
                </span>
                
                {/* Hover ripple effect */}
                <div className="absolute inset-0 rounded-full bg-primary/10 scale-0 group-hover:scale-100 transition-transform duration-700 ease-out"></div>
              </button>
            ))}
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item, index) => (
              <div
                key={index}
                className={`group relative overflow-hidden rounded-lg cursor-pointer aspect-square border border-border/50 hover:border-primary/30 transition-all duration-700 hover:shadow-[var(--shadow-lg)] ${
                  galleryVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-12 rotate-3'
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={item.image_url}
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
            src={galleryItems[selectedImage].image_url}
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
