import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-xl border-b border-border/40 shadow-[0_8px_32px_rgba(0,0,0,0.08)] before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/5 before:via-transparent before:to-accent/5 before:pointer-events-none">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group relative">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent rounded-xl blur-md opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-primary via-primary-glow to-accent flex items-center justify-center shadow-[var(--shadow-primary)] group-hover:shadow-[var(--shadow-glow)] transition-all duration-300 group-hover:scale-110">
                <Sparkles className="w-6 h-6 text-white animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:to-primary transition-all duration-300">
                Nisanth Sports
              </span>
              <span className="text-xs text-muted-foreground font-medium tracking-wider">CUSTOM SPORTSWEAR</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2">
            <Link to="/" className="relative px-5 py-2.5 text-foreground hover:text-primary font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent group">
              <span className="relative z-10">Home</span>
              <span className="absolute bottom-1 left-5 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-[calc(100%-2.5rem)] transition-all duration-300"></span>
            </Link>
            <Link to="/products" className="relative px-5 py-2.5 text-foreground hover:text-primary font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent group">
              <span className="relative z-10">Products</span>
              <span className="absolute bottom-1 left-5 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-[calc(100%-2.5rem)] transition-all duration-300"></span>
            </Link>
            <Link to="/gallery" className="relative px-5 py-2.5 text-foreground hover:text-primary font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent group">
              <span className="relative z-10">Gallery</span>
              <span className="absolute bottom-1 left-5 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-[calc(100%-2.5rem)] transition-all duration-300"></span>
            </Link>
            <Link to="/about" className="relative px-5 py-2.5 text-foreground hover:text-primary font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent group">
              <span className="relative z-10">About Us</span>
              <span className="absolute bottom-1 left-5 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-[calc(100%-2.5rem)] transition-all duration-300"></span>
            </Link>
            <Link to="/contact" className="relative px-5 py-2.5 text-foreground hover:text-primary font-semibold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-transparent group">
              <span className="relative z-10">Contact</span>
              <span className="absolute bottom-1 left-5 w-0 h-0.5 bg-gradient-to-r from-primary to-accent group-hover:w-[calc(100%-2.5rem)] transition-all duration-300"></span>
            </Link>
            <Link to="/get-quote" className="ml-4">
              <Button variant="default" size="default" className="relative overflow-hidden shadow-[var(--shadow-primary)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 font-bold px-6 py-2.5 group before:absolute before:inset-0 before:bg-gradient-to-r before:from-accent before:to-primary before:opacity-0 before:transition-opacity hover:before:opacity-100">
                <span className="relative z-10">Get Quote</span>
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-3 rounded-xl hover:bg-gradient-to-br hover:from-primary/10 hover:to-accent/10 transition-all duration-300 border border-border/50 hover:border-primary/30"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} className="transition-transform duration-300 rotate-90" /> : <Menu size={24} className="transition-transform duration-300" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-6 space-y-2 border-t border-border/50 bg-background/60 backdrop-blur-sm rounded-b-2xl">
            <Link
              to="/"
              className="block px-4 py-3 text-foreground hover:text-primary font-medium transition-all duration-200 rounded-lg hover:bg-primary/5 mx-2"
              onClick={() => setIsOpen(false)}
            >
              Home
            </Link>
            <Link
              to="/products"
              className="block px-4 py-3 text-foreground hover:text-primary font-medium transition-all duration-200 rounded-lg hover:bg-primary/5 mx-2"
              onClick={() => setIsOpen(false)}
            >
              Products
            </Link>
            <Link
              to="/gallery"
              className="block px-4 py-3 text-foreground hover:text-primary font-medium transition-all duration-200 rounded-lg hover:bg-primary/5 mx-2"
              onClick={() => setIsOpen(false)}
            >
              Gallery
            </Link>
            <Link
              to="/about"
              className="block px-4 py-3 text-foreground hover:text-primary font-medium transition-all duration-200 rounded-lg hover:bg-primary/5 mx-2"
              onClick={() => setIsOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="/contact"
              className="block px-4 py-3 text-foreground hover:text-primary font-medium transition-all duration-200 rounded-lg hover:bg-primary/5 mx-2"
              onClick={() => setIsOpen(false)}
            >
              Contact
            </Link>
            <div className="px-2 pt-2">
              <Link to="/get-quote" onClick={() => setIsOpen(false)}>
                <Button variant="default" size="default" className="w-full shadow-[var(--shadow-primary)] font-semibold">
                  Get Quote
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
