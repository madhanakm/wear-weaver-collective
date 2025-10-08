import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    author_name: "Rajesh Kumar",
    rating: 5,
    text: "Excellent quality sports garments! Ordered custom jerseys for our cricket team and the quality exceeded expectations. Fast delivery and great customer service.",
    relative_time_description: "2 weeks ago",
    initials: "RK"
  },
  {
    author_name: "Priya Menon",
    rating: 5,
    text: "Best place for bulk sportswear orders. We've been ordering from Nisanth Sports Garments for our academy for over 2 years now. Never disappointed!",
    relative_time_description: "1 month ago",
    initials: "PM"
  },
  {
    author_name: "Arjun Patel",
    rating: 5,
    text: "Outstanding fabric quality and perfect stitching. The custom prints on our team hoodies look amazing even after multiple washes. Highly recommend!",
    relative_time_description: "3 weeks ago",
    initials: "AP"
  },
  {
    author_name: "Sneha Reddy",
    rating: 4,
    text: "Great products and reasonable pricing. Ordered 200 t-shirts for our college sports fest. Delivered on time with good packaging.",
    relative_time_description: "1 week ago",
    initials: "SR"
  },
  {
    author_name: "Mohammed Ali",
    rating: 5,
    text: "Professional service from start to finish. They helped us design custom tracksuits for our football club. The quality is top-notch!",
    relative_time_description: "2 months ago",
    initials: "MA"
  },
  {
    author_name: "Lakshmi Iyer",
    rating: 5,
    text: "Very satisfied with the bulk order for our sports store. Quality products at competitive prices. Will definitely order again!",
    relative_time_description: "3 weeks ago",
    initials: "LI"
  }
];

const Reviews = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Google Reviews
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our customers say about us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {reviews.map((review, index) => (
            <Card key={index} className="border-border hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 relative">
                <Quote className="absolute top-4 right-4 text-primary/20" size={32} />
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold text-sm">
                    {review.initials}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{review.author_name}</div>
                    <div className="text-xs text-muted-foreground">
                      {review.relative_time_description}
                    </div>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < review.rating
                          ? "fill-accent text-accent"
                          : "text-muted-foreground/30"
                      }
                    />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground line-clamp-4">
                  {review.text}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-accent text-accent" />
              ))}
            </div>
            <span className="font-semibold text-foreground">4.9/5</span>
            <span>based on Google reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
