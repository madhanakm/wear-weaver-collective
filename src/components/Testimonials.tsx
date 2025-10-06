import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Mike Johnson",
    role: "Team Manager",
    company: "Eagles FC",
    content: "Outstanding quality and service! Our team uniforms look professional and the customization was exactly what we wanted.",
    rating: 5,
  },
  {
    name: "Sarah Williams",
    role: "Brand Owner",
    company: "FitLife Apparel",
    content: "Working with SportWear Pro transformed our brand. The attention to detail and quality is unmatched.",
    rating: 5,
  },
  {
    name: "David Chen",
    role: "Event Coordinator",
    company: "Marathon Plus",
    content: "Fast turnaround, excellent communication, and premium products. Highly recommend for bulk orders!",
    rating: 5,
  },
];

const Testimonials = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Trusted by teams and brands worldwide
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="border-border hover:shadow-[var(--shadow-lg)] transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">
                    {testimonial.role}, {testimonial.company}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
