import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { API_ENDPOINTS } from "@/config/api";

interface BlogPost {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  featured_image?: string;
  created_at: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 16;

  useEffect(() => {
    fetch(API_ENDPOINTS.BLOG_POSTS)
      .then(res => res.text())
      .then(text => {
        try {
          const data = JSON.parse(text);
          setPosts(Array.isArray(data) ? data : []);
        } catch (e) {
          console.error('JSON parse error:', e);
          setPosts([]);
        }
        setLoading(false);
      })
      .catch(error => {
        console.error('Blog fetch error:', error);
        setLoading(false);
      });
  }, []);

  const totalPages = Math.ceil(posts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const currentPosts = posts.slice(startIndex, startIndex + postsPerPage);

  return (
    <div className="min-h-screen">
      <Navbar />
      
      {/* Hero Section with Animated Background */}
      <section className="pt-32 pb-20 bg-gradient-to-br from-primary/10 via-background to-accent/10 relative overflow-hidden">
        {/* Floating Blog Elements */}
        <div className="absolute inset-0">
          {/* Reading Icons */}
          {['📖', '✍️', '💡', '🚀'].map((icon, i) => (
            <div
              key={i}
              className="absolute text-4xl opacity-20 animate-float"
              style={{
                left: `${15 + i * 20}%`,
                top: `${20 + (i % 2) * 40}%`,
                animationDelay: `${i * 1.5}s`,
                animationDuration: `${6 + i * 2}s`
              }}
            >
              {icon}
            </div>
          ))}
          
          {/* Gradient Orbs */}
          <div className="absolute top-20 left-20 w-40 h-40 bg-gradient-to-br from-primary/15 to-accent/15 blur-3xl animate-morphing" style={{ animationDuration: '20s' }}></div>
          <div className="absolute bottom-20 right-20 w-32 h-32 bg-gradient-to-tl from-accent/12 to-primary/12 blur-2xl animate-drift" style={{ animationDuration: '16s' }}></div>
          
          {/* Particle Dots */}
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-primary/30 rounded-full animate-glow"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${i * 0.5}s`,
                animationDuration: `${3 + Math.random() * 2}s`
              }}
            />
          ))}
        </div>
        
        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent animate-glow">
              Our Blog
            </h1>
            <p className="text-xl text-muted-foreground animate-fade-in" style={{ animationDelay: '0.3s' }}>
              Latest insights, trends, and updates from the sportswear industry
            </p>
          </div>

          {loading ? (
            <div className="text-center">
              <div className="inline-flex items-center space-x-2">
                <div className="w-4 h-4 bg-primary rounded-full animate-bounce"></div>
                <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-4 h-4 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          ) : posts.length === 0 ? (
            <div className="text-center animate-fade-in">
              <p className="text-muted-foreground">No blog posts found.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {currentPosts.map((post, index) => (
                  <Card 
                    key={post.id} 
                    className="group relative hover:shadow-2xl hover:shadow-primary/25 transition-all duration-700 overflow-hidden border border-border/50 bg-gradient-to-br from-background via-background/95 to-muted/20 hover:-translate-y-3 hover:rotate-1 animate-fade-in backdrop-blur-sm"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    {/* Animated Border */}
                    <div className="absolute inset-0 bg-gradient-to-r from-primary via-accent to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-500 blur-sm"></div>
                    <div className="absolute inset-[1px] bg-gradient-to-br from-background via-background/95 to-muted/20 rounded-[inherit]"></div>
                    
                    {/* Content Container */}
                    <div className="relative z-10">
                      {post.featured_image ? (
                        <div className="aspect-video overflow-hidden relative">
                          <img 
                            src={post.featured_image} 
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Floating Date Badge */}
                          <div className="absolute top-4 right-4 bg-background/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium border border-border/50 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                            {new Date(post.created_at).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </div>
                        </div>
                      ) : (
                        <div className="aspect-video bg-gradient-to-br from-primary/10 to-accent/10 flex items-center justify-center relative overflow-hidden">
                          <div className="text-6xl opacity-20">📝</div>
                          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent/5 group-hover:from-primary/10 group-hover:to-accent/10 transition-colors duration-500"></div>
                        </div>
                      )}
                      
                      <CardHeader className="relative pb-2">
                        <CardTitle className="line-clamp-2 text-lg font-bold group-hover:text-primary transition-colors duration-300 leading-tight">
                          {post.title}
                        </CardTitle>
                        
                        {!post.featured_image && (
                          <div className="flex items-center text-xs text-muted-foreground mt-2">
                            <Calendar className="w-3 h-3 mr-1" />
                            {new Date(post.created_at).toLocaleDateString()}
                          </div>
                        )}
                      </CardHeader>
                      
                      <CardContent className="relative pt-0">
                        <p className="text-muted-foreground text-sm mb-4 line-clamp-3 group-hover:text-foreground/80 transition-colors duration-300 leading-relaxed">
                          {post.excerpt}
                        </p>
                        
                        {/* Enhanced Read More Button */}
                        <Link 
                          to={`/blog/${post.slug}`}
                          className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-primary/10 to-accent/10 hover:from-primary hover:to-accent text-primary hover:text-white rounded-full text-sm font-medium transition-all duration-300 group-hover:scale-105 border border-primary/20 hover:border-transparent"
                        >
                          <span>Read Article</span>
                          <svg className="w-4 h-4 ml-2 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </Link>
                        
                        {/* Reading Time Estimate */}
                        <div className="mt-3 text-xs text-muted-foreground/60 flex items-center">
                          <svg className="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {Math.max(1, Math.ceil((post.excerpt?.length || 0) / 200))} min read
                        </div>
                      </CardContent>
                    </div>
                  </Card>
                ))}
              </div>
              
              {totalPages > 1 && (
                <div className="flex justify-center items-center mt-16 space-x-3 animate-fade-in" style={{ animationDelay: '0.5s' }}>
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-primary/20 hover:to-accent/20 hover:scale-105 transition-all duration-300 font-medium"
                  >
                    ← Previous
                  </button>
                  
                  <div className="flex space-x-2">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <button
                        key={page}
                        onClick={() => setCurrentPage(page)}
                        className={`w-12 h-12 rounded-xl font-bold transition-all duration-300 hover:scale-110 ${
                          currentPage === page
                            ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg shadow-primary/30'
                            : 'bg-gradient-to-r from-muted/50 to-muted/30 hover:from-primary/20 hover:to-accent/20 border border-border/50'
                        }`}
                      >
                        {page}
                      </button>
                    ))}
                  </div>
                  
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-6 py-3 bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:from-primary/20 hover:to-accent/20 hover:scale-105 transition-all duration-300 font-medium"
                  >
                    Next →
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;