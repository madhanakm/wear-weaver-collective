import { MessageSquare, Palette, Cog, Package, ArrowRight } from "lucide-react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const steps = [
  {
    icon: MessageSquare,
    number: "01",
    title: "Consultation",
    description: "Share your vision and requirements with our team. We listen to understand your exact needs.",
    color: "from-primary to-primary-glow",
    bgColor: "bg-primary/5"
  },
  {
    icon: Palette,
    number: "02",
    title: "Design",
    description: "We create custom designs tailored to your brand identity and specifications.",
    color: "from-primary to-primary-glow",
    bgColor: "bg-primary/10"
  },
  {
    icon: Cog,
    number: "03",
    title: "Production",
    description: "High-quality manufacturing with premium materials and expert craftsmanship.",
    color: "from-primary to-primary-glow",
    bgColor: "bg-primary/5"
  },
  {
    icon: Package,
    number: "04",
    title: "Delivery",
    description: "Fast and secure shipping directly to your doorstep with tracking updates.",
    color: "from-primary to-primary-glow",
    bgColor: "bg-primary/10"
  },
];

const Process = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section ref={ref} className="py-20 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5" />
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className={`text-center mb-20 transition-all duration-700 ${
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        }`}>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Our streamlined process ensures quality results from initial consultation to final delivery
          </p>
        </div>

        {/* Desktop Timeline */}
        <div className="hidden lg:block relative">
          {/* Timeline Line */}
          <div className="absolute top-[50px] left-[10%] right-[10%] h-1 bg-gradient-to-r from-primary/20 via-primary/40 to-primary/20" />
          
          <div className="grid grid-cols-4 gap-12">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <div 
                  key={index} 
                  className={`relative transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${(index + 1) * 200}ms` }}
                >
                  {/* Timeline Node */}
                  <div className="flex justify-center mb-8">
                    <div className="relative">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-xl border-4 border-white`}>
                        <Icon size={32} className="text-white" />
                      </div>
                      <div className="absolute -top-3 -right-3 w-10 h-10 rounded-full bg-white border-3 border-primary flex items-center justify-center font-bold text-sm text-primary shadow-lg">
                        {step.number}
                      </div>
                    </div>
                  </div>
                  
                  {/* Content Card */}
                  <div className={`${step.bgColor} rounded-2xl p-8 shadow-lg border border-primary/20 hover:shadow-xl hover:scale-105 transition-all duration-300 min-h-[180px]`}>
                    <h3 className="text-2xl font-bold mb-4 text-foreground">{step.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{step.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile/Tablet Vertical Layout */}
        <div className="lg:hidden space-y-8">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div 
                key={index} 
                className={`flex items-start gap-6 transition-all duration-700 ${
                  isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
                }`}
                style={{ transitionDelay: `${(index + 1) * 150}ms` }}
              >
                {/* Icon & Number */}
                <div className="flex-shrink-0 relative">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r ${step.color} flex items-center justify-center shadow-lg`}>
                    <Icon size={28} className="text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-white border-2 border-primary flex items-center justify-center font-bold text-sm text-primary">
                    {step.number}
                  </div>
                  {/* Connecting Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute top-16 left-1/2 w-0.5 h-12 bg-gradient-to-b from-primary/50 to-transparent transform -translate-x-1/2" />
                  )}
                </div>
                
                {/* Content */}
                <div className={`${step.bgColor} rounded-xl p-6 flex-1 shadow-sm border border-primary/20`}>
                  <h3 className="text-xl font-bold mb-3 text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed">{step.description}</p>
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