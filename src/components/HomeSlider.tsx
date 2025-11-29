import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { API_ENDPOINTS, processImageUrls } from "@/config/api";

interface Slider {
  id: number;
  title: string;
  description: string;
  image_url: string;
  button_text?: string;
  button_link?: string;
  button_text_2?: string;
  button_link_2?: string;
  sort_order: number;
  status: string;
}

const HomeSlider = () => {
  const [sliders, setSliders] = useState<Slider[]>([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    fetch(API_ENDPOINTS.SLIDERS)
      .then(res => res.json())
      .then(data => {
        const processedData = processImageUrls(data);
        setSliders(processedData);
      })
      .catch(error => console.error('Error fetching sliders:', error));
  }, []);

  useEffect(() => {
    if (sliders.length > 1) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % sliders.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [sliders.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % sliders.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + sliders.length) % sliders.length);
  };

  if (sliders.length === 0) return null;

  return (
    <div className="relative h-screen overflow-hidden">
      {sliders.map((slider, index) => (
        <div
          key={slider.id}
          className={`absolute inset-0 transition-transform duration-1000 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className="relative h-full">
            <img
              src={slider.image_url}
              alt={slider.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/70 to-white/20" />
            
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent animate-fade-in">
                    {slider.title}
                  </h1>
                  {slider.description && (
                    <p className="text-xl md:text-2xl text-muted-foreground mb-8 leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
                      {slider.description}
                    </p>
                  )}
                  <div className="flex flex-col sm:flex-row gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
                    {slider.button_text && slider.button_link && (
                      slider.button_link.startsWith('/') ? (
                        <Link to={slider.button_link}>
                          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold">
                            {slider.button_text}
                          </Button>
                        </Link>
                      ) : (
                        <a href={slider.button_link} target="_blank" rel="noopener noreferrer">
                          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-4 text-lg font-semibold">
                            {slider.button_text}
                          </Button>
                        </a>
                      )
                    )}
                    {slider.button_text_2 && slider.button_link_2 && (
                      slider.button_link_2.startsWith('/') ? (
                        <Link to={slider.button_link_2}>
                          <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold">
                            {slider.button_text_2}
                          </Button>
                        </Link>
                      ) : (
                        <a href={slider.button_link_2} target="_blank" rel="noopener noreferrer">
                          <Button size="lg" variant="outline" className="border-2 border-primary text-primary hover:bg-primary hover:text-primary-foreground px-8 py-4 text-lg font-semibold">
                            {slider.button_text_2}
                          </Button>
                        </a>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {sliders.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-3 rounded-full transition-all duration-300 backdrop-blur-sm"
          >
            <ChevronRight size={24} />
          </button>

          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {sliders.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentSlide ? 'bg-white' : 'bg-white/50'
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HomeSlider;