import { Card, CardContent } from "@/components/ui/card";
import { Star, ExternalLink } from "lucide-react";

const googleReviews = [
  {
    name: "Rajesh Kumar",
    content: "Excellent quality sports garments! Ordered custom jerseys for our cricket team and the quality exceeded expectations. Fast delivery and great customer service.",
    rating: 5,
    timeAgo: "2 weeks ago",
  },
  {
    name: "Priya Menon",
    content: "Best place for bulk sportswear orders. We've been ordering from Nisanth Sports Garments for our academy for over 2 years now. Never disappointed!",
    rating: 5,
    timeAgo: "1 month ago",
  },
  {
    name: "Arjun Patel",
    content: "Outstanding fabric quality and perfect stitching. The custom prints on our team hoodies look amazing even after multiple washes. Highly recommend!",
    rating: 5,
    timeAgo: "3 weeks ago",
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
          {googleReviews.map((review, index) => (
            <Card key={index} className="border-border hover:shadow-[var(--shadow-lg)] transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex mb-4">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={20} className="fill-accent text-accent" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-6 italic">
                  "{review.content}"
                </p>
                <div className="flex justify-between items-center">
                  <div className="font-semibold">{review.name}</div>
                  <div className="text-sm text-muted-foreground">{review.timeAgo}</div>
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
