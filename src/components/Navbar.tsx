import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-[var(--shadow-primary)] group-hover:shadow-[var(--shadow-glow)] transition-all duration-300">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent">
              Nisanth Sports
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="px-4 py-2 text-foreground hover:text-primary font-medium transition-all duration-200 rounded-lg hover:bg-primary/5">
              Home
            </Link>
            <Link to="/gallery" className="px-4 py-2 text-foreground hover:text-primary font-medium transition-all duration-200 rounded-lg hover:bg-primary/5">
              Gallery
            </Link>
            <Link to="/about" className="px-4 py-2 text-foreground hover:text-primary font-medium transition-all duration-200 rounded-lg hover:bg-primary/5">
              About Us
            </Link>
            <Link to="/contact" className="px-4 py-2 text-foreground hover:text-primary font-medium transition-all duration-200 rounded-lg hover:bg-primary/5">
              Contact
            </Link>
            <Link to="/get-quote" className="ml-4">
              <Button variant="default" size="default" className="shadow-[var(--shadow-primary)] hover:shadow-[var(--shadow-glow)] transition-all duration-300 font-semibold">
                Get Quote
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-foreground p-2 rounded-lg hover:bg-primary/5 transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
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
