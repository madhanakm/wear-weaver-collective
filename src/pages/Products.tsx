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
  const productsPerPage = 8;

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
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-primary-glow/5">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        {/* Simple Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-72 h-72 bg-gradient-to-br from-primary/10 to-accent/10 blur-3xl"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tl from-accent/8 to-primary/8 blur-3xl"></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Our Products
            </h1>
            <p className={`text-lg md:text-xl text-muted-foreground mb-8 transition-all duration-1000 ${
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
      <section ref={productsRef} className="py-20 bg-gradient-to-br from-background via-muted/10 to-primary/5 relative overflow-hidden">
        {/* Lite Gradient Background */}
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-96 h-96 bg-gradient-to-br from-primary/8 to-accent/8 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-accent/6 to-primary/6 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-gradient-to-r from-primary/4 to-accent/4 blur-2xl animate-pulse" style={{ animationDelay: '4s' }}></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {getCurrentPageProducts().map((product, index) => (
              <Card 
                key={index} 
                className={`group overflow-hidden border-border hover:shadow-[var(--shadow-lg)] hover:border-primary/30 transition-all duration-700 hover:-translate-y-2 ${
                  productsVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <CardContent className="p-0">
                  <div className="relative aspect-square overflow-hidden">
                    <img
                      src={product.image_url}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                  <div className="p-6 bg-gradient-to-br from-background to-muted/30">
                    <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">{product.name}</h3>
                    <p className="text-muted-foreground mb-4 text-sm leading-relaxed line-clamp-3">{product.description}</p>
                    <Link to={`/product/${product.id}`}>
                      <Button size="sm" className="w-full group-hover:shadow-[var(--shadow-primary)] transition-all duration-300">
                        View Details
                        <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </Link>
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