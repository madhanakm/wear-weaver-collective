import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface GoogleReview {
  author_name: string;
  rating: number;
  text: string;
  time: number;
  profile_photo_url?: string;
  relative_time_description: string;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<GoogleReview[]>([]);
  const [apiKey, setApiKey] = useState("");
  const [placeId, setPlaceId] = useState("");
  const [showSetup, setShowSetup] = useState(true);
  const [loading, setLoading] = useState(false);
  const [averageRating, setAverageRating] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);

  const fetchGoogleReviews = async (key: string, id: string) => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${id}&fields=reviews,rating,user_ratings_total&key=${key}`
      );
      const data = await response.json();
      
      if (data.result) {
        setReviews(data.result.reviews || []);
        setAverageRating(data.result.rating || 0);
        setTotalReviews(data.result.user_ratings_total || 0);
        setShowSetup(false);
      }
    } catch (error) {
      console.error("Error fetching Google reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSetup = (e: React.FormEvent) => {
    e.preventDefault();
    if (apiKey.trim() && placeId.trim()) {
      fetchGoogleReviews(apiKey, placeId);
    }
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };
  return (
    <section className="py-20 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Google Reviews
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Real reviews from our customers on Google
          </p>
        </div>

        {showSetup ? (
          <div className="max-w-md mx-auto bg-background p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Setup Google Reviews</h3>
            <p className="text-sm text-muted-foreground mb-4">
              Enter your Google Places API key and Place ID to display reviews
            </p>
            <form onSubmit={handleSetup} className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">Google API Key</label>
                <Input
                  type="text"
                  placeholder="AIza..."
                  value={apiKey}
                  onChange={(e) => setApiKey(e.target.value)}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Place ID</label>
                <Input
                  type="text"
                  placeholder="ChIJ..."
                  value={placeId}
                  onChange={(e) => setPlaceId(e.target.value)}
                />
              </div>
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? "Loading..." : "Load Reviews"}
              </Button>
            </form>
            <p className="text-xs text-muted-foreground mt-4">
              Get your API key at{" "}
              <a
                href="https://console.cloud.google.com/apis/credentials"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Google Cloud Console
              </a>
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {reviews.slice(0, 4).map((review, index) => (
                <Card key={index} className="border-border hover:shadow-[var(--shadow-lg)] transition-all duration-300 hover:-translate-y-1">
                  <CardContent className="p-6 relative">
                    <Quote className="absolute top-4 right-4 text-primary/20" size={32} />
                    
                    <div className="flex items-center gap-3 mb-4">
                      {review.profile_photo_url ? (
                        <img
                          src={review.profile_photo_url}
                          alt={review.author_name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center text-white font-semibold">
                          {getInitials(review.author_name)}
                        </div>
                      )}
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
                              : "text-muted"
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

            <div className="text-center mt-12">
              <div className="inline-flex items-center gap-2 text-muted-foreground">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={20}
                      className={
                        i < Math.floor(averageRating)
                          ? "fill-accent text-accent"
                          : "text-muted"
                      }
                    />
                  ))}
                </div>
                <span className="font-semibold text-foreground">
                  {averageRating.toFixed(1)}/5
                </span>
                <span>from {totalReviews}+ reviews</span>
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default Reviews;
