import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent } from "@/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import "../animations.css";

const About = () => {
  const [heroRef, heroVisible] = useIntersectionObserver();
  const [storyRef, storyVisible] = useIntersectionObserver();
  const [valuesRef, valuesVisible] = useIntersectionObserver();
  const [whyRef, whyVisible] = useIntersectionObserver();

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        {/* Corporate Background */}
        <div className="absolute inset-0">
          {/* Floating Corporate Elements */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute w-16 h-16 border-2 border-primary/20 animate-float"
              style={{
                left: `${10 + i * 12}%`,
                top: `${20 + (i % 3) * 25}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${8 + i}s`,
                clipPath: i % 2 === 0 ? 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' : 'circle(50%)'
              }}
            />
          ))}
          
          {/* Gradient Nodes */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-4 h-4 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full animate-glow"
              style={{
                left: `${15 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${4 + i * 0.5}s`
              }}
            />
          ))}
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8" style={{ zIndex: 2 }}>
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              About Nisanth Sports Garments
            </h1>
            <p className={`text-xl text-muted-foreground transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '300ms' }}>
              Leading the way in custom sportswear manufacturing with over 15 years of excellence
            </p>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section ref={storyRef} className="py-16 relative overflow-hidden">
        {/* Story Background */}
        <div className="absolute inset-0">
          {/* Story Elements */}
          <div className="absolute top-10 right-10 w-32 h-32 bg-gradient-to-br from-primary/10 to-accent/10 blur-2xl animate-morphing" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-20 left-20 w-24 h-24 bg-gradient-to-tl from-accent/8 to-primary/8 blur-xl animate-drift" style={{ animationDuration: '15s' }}></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl font-bold mb-6 text-center transition-all duration-700 ${
              storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>Our Story</h2>
            <p className={`text-lg text-muted-foreground mb-4 transition-all duration-700 ${
              storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '200ms' }}>
              Founded in 2010, Nisanth Sports Garments has grown from a small local workshop to an international 
              custom sportswear manufacturer serving teams, brands, and organizations worldwide. Our 
              passion for quality and innovation drives everything we do.
            </p>
            <p className={`text-lg text-muted-foreground transition-all duration-700 ${
              storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '400ms' }}>
              We combine traditional craftsmanship with cutting-edge technology to deliver sportswear 
              that not only looks exceptional but performs under the most demanding conditions. Every 
              piece we create reflects our commitment to excellence.
            </p>
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section ref={valuesRef} className="py-16 bg-secondary/30 relative overflow-hidden">
        {/* Corporate Grid Background */}
        <div className="absolute inset-0">
          {/* Grid Pattern */}
          <div className="absolute inset-0 opacity-5">
            <div className="grid grid-cols-8 gap-4 h-full">
              {[...Array(32)].map((_, i) => (
                <div
                  key={i}
                  className="border border-primary/20 animate-pulse"
                  style={{
                    animationDelay: `${i * 0.1}s`,
                    animationDuration: `${3 + Math.random() * 2}s`
                  }}
                />
              ))}
            </div>
          </div>
          
          {/* Floating Value Icons */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-8 h-8 border border-primary/30 rounded-full animate-drift"
              style={{
                left: `${10 + i * 15}%`,
                top: `${20 + (i % 2) * 50}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${12 + i * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className={`text-3xl font-bold mb-12 text-center transition-all duration-700 ${
            valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}>Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {['Quality First', 'Innovation', 'Customer Focus'].map((title, index) => (
              <Card key={index} className={`hover:shadow-[var(--shadow-lg)] transition-all duration-700 hover:-translate-y-2 ${
                valuesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
              }`} style={{ transitionDelay: `${index * 200}ms` }}>
                <CardContent className="pt-6">
                  <CheckCircle2 className="w-12 h-12 text-primary mb-4 animate-glow" style={{ animationDelay: `${index * 0.5}s` }} />
                  <h3 className="text-xl font-semibold mb-3">{title}</h3>
                  <p className="text-muted-foreground">
                    {index === 0 && "We never compromise on quality. Every product undergoes rigorous testing to ensure it meets our high standards."}
                    {index === 1 && "We stay ahead of trends and technology, continuously improving our processes and products to deliver the best."}
                    {index === 2 && "Your satisfaction is our priority. We work closely with you to bring your vision to life with personalized service."}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section ref={whyRef} className="py-16 relative overflow-hidden">
        {/* Professional Background */}
        <div className="absolute inset-0">
          {/* Corporate Nodes */}
          <div className="absolute top-20 right-20 w-40 h-40 bg-gradient-to-br from-primary/8 to-accent/8 blur-2xl animate-morphing" style={{ animationDuration: '25s' }}></div>
          <div className="absolute bottom-32 left-32 w-32 h-32 bg-gradient-to-tl from-accent/6 to-primary/6 blur-xl animate-float" style={{ animationDuration: '18s' }}></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className={`text-3xl font-bold mb-8 text-center transition-all duration-700 ${
              whyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>Why Choose Us</h2>
            <div className="space-y-6">
              {[
                { title: 'Premium Materials', desc: 'We source only the finest fabrics and materials to ensure durability, comfort, and performance.' },
                { title: 'Custom Design Support', desc: 'Our expert design team works with you to create unique, eye-catching sportswear that represents your brand.' },
                { title: 'Fast Turnaround', desc: 'We understand deadlines matter. Our efficient processes ensure quick delivery without sacrificing quality.' },
                { title: 'Global Reach', desc: 'With partners worldwide, we can deliver your custom sportswear anywhere you need it.' }
              ].map((item, index) => (
                <div key={index} className={`flex items-start gap-4 p-4 rounded-lg hover:bg-muted/30 transition-all duration-700 ${
                  whyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`} style={{ transitionDelay: `${index * 150}ms` }}>
                  <CheckCircle2 className="w-6 h-6 text-primary flex-shrink-0 mt-1 animate-glow" style={{ animationDelay: `${index * 0.3}s` }} />
                  <div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
