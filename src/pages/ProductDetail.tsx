import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { API_ENDPOINTS } from "@/config/api";
import { X } from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  status: string;
  created_at: string;
}

interface GalleryImage {
  id: number;
  product_id: number;
  image_url: string;
  title: string;
  created_at: string;
}

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [gallery, setGallery] = useState<GalleryImage[]>([]);
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  useEffect(() => {
    if (id) {
      Promise.all([
        fetch(API_ENDPOINTS.PRODUCTS).then(r => r.json()),
        fetch(API_ENDPOINTS.PRODUCT_GALLERY(id)).then(r => r.json())
      ]).then(([products, galleryData]) => {
        const productData = products.find((p: Product) => p.id.toString() === id);
        setProduct(productData);
        setGallery(galleryData);
      }).catch(error => {
        console.error('Error fetching data:', error);
        setProduct({} as Product);
      });
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen">
        <Navbar />
        <div className="pt-32 pb-20 text-center">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold mb-4">Product Not Found</h1>
            <p>The requested product could not be found.</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar />
      
      <section className="pt-32 pb-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold mb-6">{product.name}</h1>
            <p className="text-lg text-muted-foreground mb-8">{product.description}</p>
          </div>

          {gallery.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {gallery.map((image, index) => (
                <div
                  key={image.id}
                  className="cursor-pointer overflow-hidden rounded-lg border border-border hover:border-primary/30 transition-all duration-300"
                  onClick={() => setSelectedImage(index)}
                >
                  <img
                    src={image.image_url}
                    alt={image.title}
                    className="w-full h-64 object-cover hover:scale-110 transition-transform duration-300"
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {selectedImage !== null && (
        <div
          className="fixed inset-0 z-50 bg-background/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors z-10"
            onClick={() => setSelectedImage(null)}
          >
            <X size={24} />
          </button>
          <button
            className="absolute left-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage > 0 ? selectedImage - 1 : gallery.length - 1);
            }}
          >
            ←
          </button>
          <button
            className="absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors z-10"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(selectedImage < gallery.length - 1 ? selectedImage + 1 : 0);
            }}
          >
            →
          </button>
          <img
            src={gallery[selectedImage].image_url}
            alt={gallery[selectedImage].title}
            className="max-w-full max-h-[90vh] object-contain rounded-lg"
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default ProductDetail;