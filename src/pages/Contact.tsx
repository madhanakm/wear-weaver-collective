import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Map from "@/components/Map";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { API_ENDPOINTS } from "@/config/api";
import "../animations.css";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    content: "info@sportswearpro.com",
  },
  {
    icon: Phone,
    title: "Phone",
    content: "+1 (555) 123-4567",
  },
  {
    icon: MapPin,
    title: "Address",
    content: "123 Manufacturing St, Industrial Zone, City",
  },
  {
    icon: Clock,
    title: "Business Hours",
    content: "Mon-Fri: 9AM - 6PM",
  },
];

const Contact = () => {
  const { toast } = useToast();
  const [heroRef, heroVisible] = useIntersectionObserver();
  const [infoRef, infoVisible] = useIntersectionObserver();
  const [formRef, formVisible] = useIntersectionObserver();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(API_ENDPOINTS.SAVE_CONTACT, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Message Sent!",
          description: "We'll get back to you within 24 hours.",
        });
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: "",
          message: "",
        });
      } else {
        toast({
          title: "Error",
          description: result.message || "Failed to send message. Please try again.",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-20 bg-gradient-to-b from-muted/30 to-background relative overflow-hidden">
        {/* Communication Waves Background */}
        <div className="absolute inset-0">
          {/* Signal Waves */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute border-2 border-primary/20 rounded-full animate-ping"
              style={{
                width: `${200 + i * 100}px`,
                height: `${200 + i * 100}px`,
                top: '20%',
                left: '10%',
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i}s`
              }}
            />
          ))}
          
          {/* Message Bubbles */}
          {[...Array(8)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-gradient-to-br from-primary/15 to-accent/15 rounded-full animate-float"
              style={{
                width: `${20 + Math.random() * 40}px`,
                height: `${20 + Math.random() * 40}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
          
          {/* Communication Icons */}
          <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-gradient-to-br from-accent/10 to-primary/10 blur-2xl animate-morphing" style={{ animationDuration: '15s' }}></div>
          <div className="absolute bottom-1/3 left-1/3 w-24 h-24 bg-gradient-to-tl from-primary/8 to-accent/8 blur-xl animate-drift" style={{ animationDuration: '12s' }}></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className={`text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Get In Touch
            </h1>
            <p className={`text-xl text-muted-foreground transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '300ms' }}>
              Ready to start your custom order? Contact us today for a free consultation
            </p>
          </div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section ref={infoRef} className="py-12 relative overflow-hidden">
        {/* Floating Contact Elements */}
        <div className="absolute inset-0">
          {/* Connection Dots */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full animate-glow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
          
          {/* Gradient Orbs */}
          <div className="absolute top-10 left-10 w-40 h-40 bg-gradient-to-br from-primary/12 to-accent/12 blur-2xl animate-drift" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-10 right-10 w-32 h-32 bg-gradient-to-tl from-accent/10 to-primary/10 blur-xl animate-float" style={{ animationDuration: '16s' }}></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {contactInfo.map((info, index) => {
              const Icon = info.icon;
              return (
                <Card 
                  key={index} 
                  className={`border-border hover:shadow-[var(--shadow-lg)] hover:border-primary/30 transition-all duration-700 hover:-translate-y-2 ${
                    infoVisible ? 'opacity-100 translate-y-0 rotate-0' : 'opacity-0 translate-y-8 rotate-2'
                  }`}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  <CardContent className="p-6 text-center">
                    <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-4 animate-glow" style={{ animationDelay: `${index * 0.3}s` }}>
                      <Icon size={24} />
                    </div>
                    <h3 className="font-semibold mb-2">{info.title}</h3>
                    <p className="text-muted-foreground text-sm">{info.content}</p>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section ref={formRef} className="py-20 relative overflow-hidden">
        {/* Interactive Form Background */}
        <div className="absolute inset-0">
          {/* Data Flow Particles */}
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-gradient-to-r from-primary/40 to-accent/40 rounded-full animate-drift"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.3}s`,
                animationDuration: `${8 + Math.random() * 6}s`
              }}
            />
          ))}
          
          {/* Form Energy Fields */}
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary/8 to-accent/8 blur-3xl animate-morphing" style={{ animationDuration: '25s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-to-tl from-accent/6 to-primary/6 blur-2xl animate-float" style={{ animationDuration: '18s' }}></div>
          
          {/* Communication Ripples */}
          {[...Array(4)].map((_, i) => (
            <div
              key={i}
              className="absolute border border-primary/15 rounded-full animate-ping"
              style={{
                width: `${100 + i * 60}px`,
                height: `${100 + i * 60}px`,
                top: `${60 + i * 5}%`,
                right: `${20 + i * 8}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${5 + i}s`
              }}
            />
          ))}
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Map */}
            <div className={`transition-all duration-700 ${
              formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
            }`}>
              <h2 className="text-3xl font-bold mb-6">Our Location</h2>
              <div className="relative overflow-hidden rounded-lg">
                <Map />
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-accent/10 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
              </div>
            </div>

            {/* Contact Form */}
            <div className={`transition-all duration-700 ${
              formVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
            }`} style={{ transitionDelay: '200ms' }}>
              <Card className="border-border shadow-[var(--shadow-lg)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-300"></div>
                <CardContent className="p-8 relative">
                  <h2 className="text-3xl font-bold mb-6 text-center">Send Us a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Your Name *
                        </label>
                        <Input
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="john@example.com"
                          required
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium mb-2">
                          Phone Number
                        </label>
                        <Input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="+1 (555) 123-4567"
                        />
                      </div>
                      <div>
                        <label htmlFor="subject" className="block text-sm font-medium mb-2">
                          Subject *
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Custom Order Inquiry"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <Textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell us about your project..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" size="lg" className="w-full" variant="hero">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;
