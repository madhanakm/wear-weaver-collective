import { MessageSquare, Palette, Cog, Package } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Consultation",
    description: "Share your vision and requirements with our team",
  },
  {
    icon: Palette,
    number: "02",
    title: "Design",
    description: "We create custom designs tailored to your brand",
  },
  {
    icon: Cog,
    number: "03",
    title: "Production",
    description: "High-quality manufacturing with premium materials",
  },
  {
    icon: Package,
    number: "04",
    title: "Delivery",
    description: "Fast shipping directly to your doorstep",
  },
];

const Process = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section ref={ref} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-16 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            From concept to delivery in four simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className={`relative transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                {/* Connecting Line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-16 left-full w-full h-0.5 bg-gradient-to-r from-primary/50 to-transparent" />
                )}
                
                <div className="text-center">
                  <div className="inline-flex relative mb-6">
                    <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon size={40} className="text-primary" />
                    </div>
                    <div className="absolute -top-2 -right-2 w-10 h-10 rounded-full bg-accent text-accent-foreground flex items-center justify-center font-bold text-sm">
                      {step.number}
                    </div>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Process;
