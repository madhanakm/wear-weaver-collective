import { Button } from "@/components/ui/button";
import { Mail, Phone } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-[var(--gradient-primary)] opacity-10" />
      
      <div className="container relative z-10 mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Ready to Start Your Custom Order?
          </h2>
          <p className="text-xl text-muted-foreground mb-10">
            Contact us today for a free consultation and quote. Our team is ready to help bring your vision to life.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button size="lg" variant="hero" className="text-lg">
              <Mail className="mr-2" />
              Get a Quote
            </Button>
            <Button size="lg" variant="secondary" className="text-lg">
              <Phone className="mr-2" />
              Call Us Now
            </Button>
          </div>

          <div className="mt-12 pt-12 border-t border-border">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
              <div>
                <h3 className="font-semibold mb-2 text-primary">Email</h3>
                <p className="text-muted-foreground">info@yoursportswear.com</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2 text-primary">Phone</h3>
                <p className="text-muted-foreground">+1 (555) 123-4567</p>
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
