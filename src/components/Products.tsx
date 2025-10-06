import { Card, CardContent } from "@/components/ui/card";
import tshirtImage from "@/assets/tshirt.jpg";
import tracksuitImage from "@/assets/tracksuit.jpg";
import hoodieImage from "@/assets/hoodie.jpg";
import sportswearImage from "@/assets/sportswear.jpg";

const products = [
  {
    name: "Custom T-Shirts",
    description: "Premium quality fabric with unlimited customization options",
    image: tshirtImage,
  },
  {
    name: "Sports Tracksuits",
    description: "Performance-driven designs for teams and individuals",
    image: tracksuitImage,
  },
  {
    name: "Athletic Hoodies",
    description: "Comfortable and stylish for any activity",
    image: hoodieImage,
  },
  {
    name: "Team Sportswear",
    description: "Professional-grade uniforms and athletic apparel",
    image: sportswearImage,
  },
];

const Products = () => {
  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Our Products
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            High-quality sportswear and custom apparel for every need
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {products.map((product, index) => (
            <Card 
              key={index} 
              className="group overflow-hidden border-border hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-2"
            >
              <CardContent className="p-0">
                <div className="relative overflow-hidden aspect-square">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{product.name}</h3>
                  <p className="text-muted-foreground">{product.description}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
