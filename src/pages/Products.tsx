import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { CheckCircle, ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";
import { API_ENDPOINTS, processImageUrls } from "@/config/api";
import "../animations.css";

interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  status: string;
  created_at: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [heroRef, heroVisible] = useIntersectionObserver();
  const [productsRef, productsVisible] = useIntersectionObserver();
  const productsPerPage = 6;

  useEffect(() => {
    fetch(API_ENDPOINTS.PRODUCTS)
      .then(response => response.json())
      .then(data => {
        const processedData = processImageUrls(data);
        setProducts(processedData);
        setTotalPages(Math.ceil(processedData.length / productsPerPage));
      })
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const getCurrentPageProducts = () => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return products.slice(startIndex, endIndex);
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0">
          {/* Morphing Gradient Orbs */}
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-primary/20 to-accent/20 blur-3xl animate-morphing animate-glow"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-accent/15 to-primary/15 blur-3xl animate-float"></div>
          <div className="absolute top-1/2 left-1/3 w-64 h-64 bg-gradient-to-r from-primary/10 to-accent/10 blur-2xl animate-drift"></div>
          
          {/* Floating Particles */}
          <div className="absolute inset-0">
            {[...Array(15)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-3 h-3 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full ${
                  i % 3 === 0 ? 'animate-float' : i % 3 === 1 ? 'animate-drift' : 'animate-glow'
                }`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.3}s`
                }}
              />
            ))}
          </div>
          
          {/* Animated Geometric Shapes */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 border-2 border-primary/30 rotate-45 animate-spin" style={{ animationDuration: '15s' }}></div>
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border-2 border-accent/30 animate-morphing animate-glow"></div>
          <div className="absolute top-3/4 right-1/3 w-16 h-16 bg-gradient-to-r from-primary/20 to-accent/20 animate-float" style={{ clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)' }}></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Our Products
            </h1>
            <p className={`text-xl md:text-2xl text-muted-foreground mb-8 transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>
              High-quality sportswear and custom apparel manufactured with precision and care
            </p>
            <div className={`inline-flex items-center gap-2 px-6 py-3 bg-primary/10 rounded-full text-primary font-medium transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '400ms' }}>
              <CheckCircle size={20} />
              <span>Premium Quality Guaranteed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section ref={productsRef} className="py-20 bg-gradient-to-b from-background to-muted/20 relative overflow-hidden">
        {/* Animated Background for Products Section */}
        <div className="absolute inset-0">
          {/* Flowing Energy Lines */}
          <div className="absolute inset-0">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="absolute h-0.5 bg-gradient-to-r from-transparent via-primary/30 to-transparent animate-slide"
                style={{
                  width: '300%',
                  top: `${10 + i * 12}%`,
                  left: '-100%',
                  animationDelay: `${i * 0.8}s`,
                  animationDuration: '6s',
                  transform: `rotate(${-15 + i * 3}deg)`
                }}
              />
            ))}
          </div>
          
          {/* Morphing Blobs */}
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-accent/15 to-primary/15 blur-2xl animate-morphing animate-drift"></div>
          <div className="absolute bottom-40 right-40 w-60 h-60 bg-gradient-to-tl from-primary/12 to-accent/12 blur-3xl animate-float animate-glow"></div>
          <div className="absolute top-1/2 right-1/4 w-32 h-32 bg-gradient-to-r from-accent/10 to-primary/10 blur-xl animate-morphing" style={{ animationDelay: '2s' }}></div>
          
          {/* Dynamic Grid */}
          <div className="absolute inset-0 opacity-10">
            <div className="grid grid-cols-8 gap-6 h-full">
              {[...Array(32)].map((_, i) => (
                <div
                  key={i}
                  className={`border border-primary/20 ${
                    i % 4 === 0 ? 'animate-glow' : i % 4 === 1 ? 'animate-pulse' : 'animate-float'
                  }`}
                  style={{
                    animationDelay: `${i * 0.2}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {getCurrentPageProducts().map((product, index) => (
              <Card 
                key={index} 
                className={`group overflow-hidden border-border hover:shadow-[var(--shadow-lg)] hover:border-primary/30 transition-all duration-700 hover:-translate-y-2 ${
                  productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2 h-full">
                    <div className="relative aspect-square lg:aspect-auto overflow-hidden">
                      <img
                        src={product.image_url}
                        alt={product.name}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                    <div className="p-8 flex flex-col justify-between bg-gradient-to-br from-background to-muted/30">
                      <div>
                        <h3 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">{product.name}</h3>
                        <p className="text-muted-foreground mb-8 leading-relaxed">{product.description}</p>
                      </div>
                      <Link to={`/product/${product.id}`} className="mt-auto">
                        <Button className="w-full group-hover:shadow-[var(--shadow-primary)] transition-all duration-300">
                          View Details
                          <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          {totalPages > 1 && (
            <div className="flex justify-center mt-12 gap-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setCurrentPage(page)}
                  className={`px-4 py-2 rounded-lg transition-colors ${
                    currentPage === page
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-primary/10'
                  }`}
                >
                  {page}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;