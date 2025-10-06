import { Palette, Zap, Shield, Users } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Full Customization",
    description: "Unlimited design options including logos, colors, patterns, and text",
  },
  {
    icon: Zap,
    title: "Fast Production",
    description: "Quick turnaround times without compromising quality",
  },
  {
    icon: Shield,
    title: "Quality Guarantee",
    description: "Premium materials and rigorous quality control processes",
  },
  {
    icon: Users,
    title: "Bulk Orders",
    description: "Special pricing for teams, organizations, and wholesale clients",
  },
];

const Services = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            We deliver excellence in every stitch
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="group p-8 rounded-lg border border-border hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-lg)] hover:-translate-y-2"
              >
                <div className="inline-flex p-4 rounded-full bg-primary/10 text-primary mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Icon size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{service.title}</h3>
                <p className="text-muted-foreground">{service.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
