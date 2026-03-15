import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { useState, useEffect } from "react";

const stats = [
  {
    number: "50K+",
    value: 50000,
    suffix: "+",
    label: "Products Delivered",
  },
  {
    number: "500+",
    value: 500,
    suffix: "+",
    label: "Happy Clients",
  },
  {
    number: "6+",
    value: 6,
    suffix: "+",
    label: "Years Experience",
  },
  {
    number: "98%",
    value: 98,
    suffix: "%",
    label: "Satisfaction Rate",
  },
];

const Stats = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [counts, setCounts] = useState(stats.map(() => 0));

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000;
        const steps = 60;
        const increment = stat.value / steps;
        let current = 0;
        
        const timer = setInterval(() => {
          current += increment;
          if (current >= stat.value) {
            setCounts(prev => {
              const newCounts = [...prev];
              newCounts[index] = stat.value;
              return newCounts;
            });
            clearInterval(timer);
          } else {
            setCounts(prev => {
              const newCounts = [...prev];
              newCounts[index] = Math.floor(current);
              return newCounts;
            });
          }
        }, duration / steps);
      });
    }
  }, [isVisible]);

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
                {counts[index] >= 1000 ? `${(counts[index] / 1000).toFixed(0)}K` : counts[index]}{stat.suffix}
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
