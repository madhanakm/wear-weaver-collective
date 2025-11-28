import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const CTA = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[var(--gradient-primary)] opacity-10" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className={`text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>
            Ready to Start Your Custom Order?
          </h2>
          <p className={`text-xl text-muted-foreground mb-10 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '200ms' }}>
            Contact us today for a free consultation and quote. Our team is ready to help bring your vision to life.
          </p>
          
          <div className={`flex flex-col sm:flex-row gap-6 justify-center items-center transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '400ms' }}>
            <Link to="/get-quote">
              <Button size="lg" variant="hero" className="text-lg">
                <Mail className="mr-2" />
                Get a Quote
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="secondary" className="text-lg">
                <Phone className="mr-2" />
                Call Us Now
              </Button>
            </Link>
          </div>

          <div className={`mt-12 pt-12 border-t border-border transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`} style={{ transitionDelay: '600ms' }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Email</h3>
                <p className="text-muted-foreground">nisanthapparelsnsg@gmail.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Phone</h3>
                <p className="text-muted-foreground">+91 9876543210</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Hours</h3>
                <p className="text-muted-foreground">Mon-Fri: 9AM - 6PM</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;
