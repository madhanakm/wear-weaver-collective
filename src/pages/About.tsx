import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Clients from "@/components/Clients";
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
              About Nisanth Apparels
            </h1>
            <p className={`text-xl text-muted-foreground transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '300ms' }}>
              A reputed manufacturer dedicated to producing high-quality garments for men, women, and children
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
              Nisanth Apparels is a reputed manufacturer dedicated to producing high-quality garments for men, women, and children. 
              Our wide product range includes Cotton Men T-Shirts, Men Corporate T-Shirts, School T-Shirts, Girls and Boys School Uniforms, 
              Kids School Uniforms, Cotton Hoodies, Men Collar T-Shirts, and Men Sports T-Shirts.
            </p>
            <p className={`text-lg text-muted-foreground transition-all duration-700 ${
              storyVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '400ms' }}>
              With a focus on comfort, durability, and style, we use premium fabrics and advanced stitching techniques to deliver 
              apparel that meets the expectations of institutions, corporates, and individuals alike. At Nisanth Apparels, we are 
              committed to combining quality manufacturing with timely delivery and customized solutions to ensure complete customer satisfaction.
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
                    {index === 0 && "We use premium fabrics and advanced stitching techniques to deliver apparel that meets the highest standards of quality and durability."}
                    {index === 1 && "We continuously improve our manufacturing processes to deliver innovative solutions for institutions, corporates, and individuals."}
                    {index === 2 && "Complete customer satisfaction is our priority. We provide customized solutions with timely delivery for all your garment needs."}
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
                { title: 'Extensive Product Range', desc: 'We offer a wide variety of garments including corporate wear, school uniforms, casuals, and sportswear to meet diverse client needs.' },
                { title: 'Premium Fabric Quality', desc: 'All our products are made using high-grade cotton and durable materials ensuring comfort, longevity, and style.' },
                { title: 'Customization Options', desc: 'We provide tailored designs, sizes, and branding options to match institutional, corporate, and individual preferences.' },
                { title: 'Reliable Manufacturing & Delivery', desc: 'Backed by efficient production facilities and a skilled team, we ensure consistent quality and on-time delivery for every order.' }
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

      <Clients />

      <Footer />
    </div>
  );
};

export default About;
