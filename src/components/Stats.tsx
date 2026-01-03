import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";

const stats = [
  {
    number: "10K+",
    label: "Products Delivered",
  },
  {
    number: "500+",
    label: "Happy Clients",
  },
  {
    number: "5+",
    label: "Years Experience",
  },
  {
    number: "98%",
    label: "Satisfaction Rate",
  },
];

const Stats = () => {
  const [ref, isVisible] = useIntersectionObserver();

  return (
    <section ref={ref} className="py-20 bg-secondary text-secondary-foreground">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={index} 
              className={`text-center transition-all duration-700 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="text-4xl md:text-5xl font-bold mb-2 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
                {stat.number}
              </div>
              <div className="text-secondary-foreground/80 text-lg">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
