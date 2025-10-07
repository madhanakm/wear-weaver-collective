import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";

const reviews = [
  {
    name: "Alex Thompson",
    role: "Sports Director",
    company: "Victory Sports Academy",
    content: "The quality of the custom jerseys exceeded our expectations. The fabric is durable, comfortable, and the prints are vibrant even after multiple washes.",
    rating: 5,
    image: "AT",
  },
  {
    name: "Priya Sharma",
    role: "Founder",
    company: "ActiveWear Studio",
    content: "Nisanth Sports Garments delivered 500 custom hoodies in record time without compromising quality. Their customer service is exceptional!",
    rating: 5,
    image: "PS",
  },
  {
    name: "James Rodriguez",
    role: "Team Captain",
    company: "Thunder Basketball",
    content: "We've been ordering from them for 3 years now. Consistent quality, competitive pricing, and they always meet our tight deadlines.",
    rating: 5,
    image: "JR",
  },
  {
    name: "Emma Wilson",
    role: "Event Manager",
    company: "Marathon Events Ltd",
    content: "Ordered 1000+ custom t-shirts for our marathon. Perfect execution, great communication throughout, and the participants loved them!",
    rating: 5,
    image: "EW",
  },
];

const Reviews = () => {
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Customer Reviews
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            See what our customers say about their experience with us
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {reviews.map((review, index) => (
            <Card key={index} className="border-border hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1">
              <CardContent className="p-6 relative">
                <Quote className="absolute top-4 right-4 text-primary/20" size={32} />
                
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                    {review.image}
                  </div>
                  <div className="flex-1">
                    <div className="font-semibold">{review.name}</div>
                    <div className="text-xs text-muted-foreground">{review.role}</div>
                  </div>
                </div>

                <div className="flex mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} size={16} className="fill-accent text-accent" />
                  ))}
                </div>

                <p className="text-sm text-muted-foreground mb-3 line-clamp-4">
                  {review.content}
                </p>

                <div className="text-xs text-muted-foreground font-medium">
                  {review.company}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-flex items-center gap-2 text-muted-foreground">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={20} className="fill-accent text-accent" />
              ))}
            </div>
            <span className="font-semibold text-foreground">4.9/5</span>
            <span>from 500+ reviews</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Reviews;
