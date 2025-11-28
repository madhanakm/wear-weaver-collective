import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { API_ENDPOINTS } from "@/config/api";

import "../animations.css";

const quoteSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  phone: z.string().trim().min(1, "Phone number is required").max(20, "Phone must be less than 20 characters"),
  company: z.string().trim().max(100, "Company name must be less than 100 characters").optional(),
  productType: z.string().trim().min(1, "Please select a product type"),
  quantity: z.string().trim().min(1, "Quantity is required"),
  message: z.string().trim().min(1, "Message is required").max(1000, "Message must be less than 1000 characters"),
});

type QuoteFormData = z.infer<typeof quoteSchema>;

const GetQuote = () => {
  const [heroRef, heroVisible] = useIntersectionObserver();
  const [formRef, formVisible] = useIntersectionObserver();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteSchema),
  });

  const onSubmit = async (data: QuoteFormData) => {
    try {
      const response = await fetch(API_ENDPOINTS.SAVE_QUOTE, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      const responseText = await response.text();
      console.log('Raw response:', responseText);
      
      let result;
      try {
        result = JSON.parse(responseText);
      } catch (e) {
        throw new Error('Invalid response from server: ' + responseText);
      }
      
      if (!response.ok) {
        throw new Error(result.error || 'Failed to send quote request');
      }
      
      toast.success("Quote request sent successfully! We'll get back to you soon.");
      reset();
    } catch (error) {
      console.error('Error sending quote:', error);
      toast.error("Failed to send quote request. Please try again.");
    }
  };

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        {/* Business Elements Background */}
        <div className="absolute inset-0">
          {/* Currency Symbols */}
          {['$', '€', '£', '₹'].map((symbol, i) => (
            <div
              key={i}
              className="absolute text-6xl font-bold text-primary/10 animate-float"
              style={{
                left: `${15 + i * 20}%`,
                top: `${20 + (i % 2) * 40}%`,
                animationDelay: `${i * 1.2}s`,
                animationDuration: `${8 + i * 2}s`
              }}
            >
              {symbol}
            </div>
          ))}
          
          {/* Progress Indicators */}
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-16 h-2 bg-gradient-to-r from-primary/20 to-accent/20 rounded-full animate-glow"
              style={{
                left: `${10 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
                animationDelay: `${i * 0.8}s`,
                animationDuration: `${4 + i * 0.5}s`
              }}
            />
          ))}
          
          {/* Business Charts */}
          <div className="absolute top-1/4 right-1/4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute bg-primary/15 animate-pulse"
                style={{
                  width: '8px',
                  height: `${20 + i * 15}px`,
                  left: `${i * 12}px`,
                  bottom: '0',
                  animationDelay: `${i * 0.3}s`,
                  animationDuration: `${2 + i * 0.2}s`
                }}
              />
            ))}
          </div>
          
          {/* Commercial Orbs */}
          <div className="absolute top-20 left-20 w-32 h-32 bg-gradient-to-br from-primary/12 to-accent/12 blur-2xl animate-morphing" style={{ animationDuration: '18s' }}></div>
          <div className="absolute bottom-20 right-20 w-24 h-24 bg-gradient-to-tl from-accent/10 to-primary/10 blur-xl animate-drift" style={{ animationDuration: '14s' }}></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className={`text-4xl md:text-5xl lg:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`}>
              Get a Custom Quote
            </h1>
            <p className={`text-xl text-muted-foreground transition-all duration-1000 ${
              heroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
            }`} style={{ transitionDelay: '300ms' }}>
              Tell us about your project and we'll provide you with a detailed quote within 24 hours
            </p>
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section ref={formRef} className="py-16 relative overflow-hidden">
        {/* Form Processing Background */}
        <div className="absolute inset-0">
          {/* Data Processing Dots */}
          {[...Array(15)].map((_, i) => (
            <div
              key={i}
              className="absolute w-3 h-3 bg-gradient-to-r from-primary/30 to-accent/30 rounded-full animate-drift"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.4}s`,
                animationDuration: `${6 + Math.random() * 4}s`
              }}
            />
          ))}
          
          {/* Quote Calculation Elements */}
          <div className="absolute top-1/3 left-10 w-20 h-20 border-2 border-primary/20 rounded-full animate-spin" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-1/3 right-10 w-16 h-16 border border-accent/20 animate-ping" style={{ animationDuration: '4s' }}></div>
          
          {/* Business Flow */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-primary/8 to-accent/8 blur-3xl animate-morphing" style={{ animationDuration: '22s' }}></div>
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className={`hover:shadow-2xl hover:shadow-primary/10 transition-all duration-700 relative overflow-hidden border-2 border-border/50 hover:border-primary/30 backdrop-blur-sm bg-background/95 ${
              formVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            }`}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 opacity-0 hover:opacity-100 transition-opacity duration-500"></div>
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-accent to-primary"></div>
              
              <CardHeader className="relative text-center pb-8">
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent animate-glow" style={{ animationDelay: '0.5s' }}>Request a Quote</CardTitle>
                <CardDescription className="text-lg mt-3">
                  Fill out the form below and our team will get back to you with a competitive quote within 24 hours
                </CardDescription>
              </CardHeader>
              
              <CardContent className="relative px-8 pb-8">
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                  {/* Personal Information Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-primary border-b border-primary/20 pb-2">Personal Information</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="name" className="text-sm font-semibold text-foreground/80">Full Name *</Label>
                        <Input
                          id="name"
                          placeholder="Enter your full name"
                          {...register("name")}
                          className={`h-12 border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20 ${
                            errors.name ? "border-destructive" : "border-border/50 hover:border-primary/50"
                          }`}
                        />
                        {errors.name && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <span className="w-1 h-1 bg-destructive rounded-full"></span>
                            {errors.name.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="email" className="text-sm font-semibold text-foreground/80">Email Address *</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="your.email@company.com"
                          {...register("email")}
                          className={`h-12 border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20 ${
                            errors.email ? "border-destructive" : "border-border/50 hover:border-primary/50"
                          }`}
                        />
                        {errors.email && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <span className="w-1 h-1 bg-destructive rounded-full"></span>
                            {errors.email.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="phone" className="text-sm font-semibold text-foreground/80">Phone Number *</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+91 98765 43210"
                          {...register("phone")}
                          className={`h-12 border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20 ${
                            errors.phone ? "border-destructive" : "border-border/50 hover:border-primary/50"
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <span className="w-1 h-1 bg-destructive rounded-full"></span>
                            {errors.phone.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="company" className="text-sm font-semibold text-foreground/80">Company Name</Label>
                        <Input
                          id="company"
                          placeholder="Your Company Name"
                          {...register("company")}
                          className="h-12 border-2 border-border/50 hover:border-primary/50 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Project Details Section */}
                  <div className="space-y-6">
                    <h3 className="text-xl font-semibold text-primary border-b border-primary/20 pb-2">Project Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <Label htmlFor="productType" className="text-sm font-semibold text-foreground/80">Product Type *</Label>
                        <select
                          id="productType"
                          {...register("productType")}
                          className={`h-12 w-full rounded-md border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20 ${
                            errors.productType ? "border-destructive" : "border-border/50 hover:border-primary/50"
                          } bg-background px-4 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2`}
                        >
                          <option value="">Select a product type</option>
                          <option value="t-shirts">Custom T-Shirts</option>
                          <option value="tracksuits">Sports Tracksuits</option>
                          <option value="hoodies">Athletic Hoodies</option>
                          <option value="sportswear">Team Sportswear</option>
                          <option value="other">Other</option>
                        </select>
                        {errors.productType && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <span className="w-1 h-1 bg-destructive rounded-full"></span>
                            {errors.productType.message}
                          </p>
                        )}
                      </div>

                      <div className="space-y-3">
                        <Label htmlFor="quantity" className="text-sm font-semibold text-foreground/80">Estimated Quantity *</Label>
                        <Input
                          id="quantity"
                          type="text"
                          placeholder="e.g., 100 pieces"
                          {...register("quantity")}
                          className={`h-12 border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20 ${
                            errors.quantity ? "border-destructive" : "border-border/50 hover:border-primary/50"
                          }`}
                        />
                        {errors.quantity && (
                          <p className="text-sm text-destructive flex items-center gap-1">
                            <span className="w-1 h-1 bg-destructive rounded-full"></span>
                            {errors.quantity.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label htmlFor="message" className="text-sm font-semibold text-foreground/80">Project Details & Requirements *</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us about your requirements, design preferences, colors, sizes, timeline, budget range, and any special instructions..."
                        rows={6}
                        {...register("message")}
                        className={`border-2 transition-all duration-300 focus:border-primary focus:shadow-lg focus:shadow-primary/20 resize-none ${
                          errors.message ? "border-destructive" : "border-border/50 hover:border-primary/50"
                        }`}
                      />
                      {errors.message && (
                        <p className="text-sm text-destructive flex items-center gap-1">
                          <span className="w-1 h-1 bg-destructive rounded-full"></span>
                          {errors.message.message}
                        </p>
                      )}
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button 
                      type="submit" 
                      size="lg" 
                      className="w-full h-14 text-lg font-semibold bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-primary/25 transform hover:scale-[1.02] relative overflow-hidden group" 
                      disabled={isSubmitting}
                    >
                      <span className="relative z-10">
                        {isSubmitting ? "Sending Quote Request..." : "Submit Quote Request"}
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GetQuote;
