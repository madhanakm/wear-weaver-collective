import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import tshirtImage from "@/assets/tshirt.jpg";
import tracksuitImage from "@/assets/tracksuit.jpg";
import hoodieImage from "@/assets/hoodie.jpg";
import sportswearImage from "@/assets/sportswear.jpg";

const products = [
  {
    name: "Custom T-Shirts",
    description: "Premium quality fabric with unlimited customization options. Perfect for teams, events, and promotional activities.",
    features: ["100% Cotton", "Custom Printing", "All Sizes Available", "Bulk Orders"],
    image: tshirtImage,
  },
  {
    name: "Sports Tracksuits",
    description: "Performance-driven designs for teams and individuals. Comfortable and durable for all athletic activities.",
    features: ["Moisture Wicking", "Team Customization", "Professional Grade", "Multiple Colors"],
    image: tracksuitImage,
  },
  {
    name: "Athletic Hoodies",
    description: "Comfortable and stylish for any activity. Perfect for casual wear and team uniforms.",
    features: ["Soft Fleece", "Custom Logos", "Durable Quality", "Warm & Comfortable"],
    image: hoodieImage,
  },
  {
    name: "Team Sportswear",
    description: "Professional-grade uniforms and athletic apparel for sports teams and organizations.",
    features: ["Professional Design", "Team Branding", "High Performance", "Custom Fit"],
    image: sportswearImage,
  },
];

const Products = () => {
  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-muted/30 to-background">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Our Products
            </h1>
            <p className="text-xl text-muted-foreground">
              High-quality sportswear and custom apparel manufactured with precision and care
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {products.map((product, index) => (
              <Card key={index} className="overflow-hidden border-border hover:shadow-[var(--shadow-lg)] transition-all duration-300">
                <CardContent className="p-0">
                  <div className="grid grid-cols-1 lg:grid-cols-2">
                    <div className="relative aspect-square lg:aspect-auto">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-8 flex flex-col justify-center">
                      <h3 className="text-2xl font-bold mb-4">{product.name}</h3>
                      <p className="text-muted-foreground mb-6">{product.description}</p>
                      <ul className="space-y-2 mb-6">
                        {product.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center gap-2 text-sm">
                            <div className="w-2 h-2 bg-primary rounded-full"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                      <Link to="/get-quote">
                        <Button className="w-full">Get Quote</Button>
                      </Link>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Products;