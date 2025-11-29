import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useState, useEffect } from "react";
import { API_ENDPOINTS, processImageUrls } from "@/config/api";

interface Testimonial {
  id: number;
  name: string;
  company: string;
  message: string;
  rating: number;
  status: string;
  created_at: string;
}

const Testimonials = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [testimonials, setTestimonials] = useState<Testimonial[]>([]);

  useEffect(() => {
    fetch(API_ENDPOINTS.TESTIMONIALS)
      .then(response => response.json())
      .then(data => {
        const processedData = processImageUrls(data);
        setTestimonials(processedData);
      })
      .catch(error => console.error('Error fetching testimonials:', error));
  }, []);

  return (
    <section ref={ref} className="py-20 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by teams and brands worldwide
          </p>
        </div>

        <div className="relative">
          <div className="flex animate-scroll-rtl gap-8">
            {testimonials.length > 0 && testimonials.map((testimonial, index) => (
              <Card 
                key={`${testimonial.id}-${index}`}
                className="min-w-[380px] bg-gradient-to-br from-white to-gray-50 border-2 border-primary/20 hover:border-primary/40 hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 transform hover:-translate-y-2"
              >
                <CardContent className="p-8 relative">
                  <div className="absolute top-4 right-4 text-primary/20 text-6xl font-serif">"</div>
                  <div className="flex mb-6">
                    {[...Array(Number(testimonial.rating))].map((_, i) => (
                      <Star key={i} size={22} className="fill-yellow-400 text-yellow-400 drop-shadow-sm" />
                    ))}
                  </div>
                  <div 
                    className="text-gray-700 mb-8 text-lg leading-relaxed font-medium"
                    dangerouslySetInnerHTML={{ __html: testimonial.message }}
                  />
                  <div className="border-t border-primary/20 pt-6">
                    <div className="font-bold text-lg text-gray-900">{testimonial.name}</div>
                    {testimonial.company && (
                      <div className="text-primary font-semibold text-sm uppercase tracking-wide">{testimonial.company}</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        
        {testimonials.length === 0 && (
          <div className="text-center text-muted-foreground">
            <p>No testimonials available at the moment.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Testimonials;
