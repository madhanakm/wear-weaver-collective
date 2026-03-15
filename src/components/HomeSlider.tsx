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
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/20 md:from-black/60 md:via-black/40 md:to-transparent" />
            
            <div className="absolute inset-0 flex items-center">
              <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="max-w-3xl">
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4 text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)] animate-fade-in leading-tight">
                    {slider.title}
                  </h1>
                  {slider.description && (
                    <p className="text-sm sm:text-base md:text-lg text-white/95 mb-4 md:mb-6 leading-relaxed drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] animate-fade-in" style={{ animationDelay: '0.3s' }}>
                      {slider.description}
                    </p>
                  )}
                  {slider.button_text && slider.button_link && (
                    <div className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
                      {slider.button_link.startsWith('/') ? (
                        <Link to={slider.button_link}>
                          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold">
                            {slider.button_text}
                          </Button>
                        </Link>
                      ) : (
                        <a href={slider.button_link} target="_blank" rel="noopener noreferrer">
                          <Button size="lg" className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-3 md:px-8 md:py-4 text-base md:text-lg font-semibold">
                            {slider.button_text}
                          </Button>
                        </a>
                      )}
                    </div>
                  )}
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
            className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
          >
            <ChevronLeft size={20} className="md:w-6 md:h-6" />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 bg-white/20 hover:bg-white/30 text-white p-2 md:p-3 rounded-full transition-all duration-300 backdrop-blur-sm z-10"
          >
            <ChevronRight size={20} className="md:w-6 md:h-6" />
          </button>

          <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
            {sliders.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
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