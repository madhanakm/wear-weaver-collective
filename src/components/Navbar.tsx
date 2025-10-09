import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Menu, X, Sparkles } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 before:absolute before:inset-0 before:bg-gradient-to-r before:from-primary/10 before:via-accent/5 before:to-primary/10 before:blur-3xl after:absolute after:inset-0 after:bg-background/60 after:backdrop-blur-2xl after:border-b after:border-border/30 after:shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex justify-between items-center h-24">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-4 group relative">
            <div className="relative">
              <div className="absolute -inset-2 bg-gradient-to-br from-primary via-accent to-primary-glow rounded-2xl blur-xl opacity-40 group-hover:opacity-70 transition-all duration-500 animate-pulse"></div>
              <div className="relative w-14 h-14 rounded-2xl bg-gradient-to-br from-primary via-primary-glow to-accent flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(59,130,246,0.5)] group-hover:shadow-[0_20px_80px_-10px_rgba(59,130,246,0.8)] transition-all duration-500 group-hover:scale-110 group-hover:rotate-3 border border-white/20">
                <Sparkles className="w-7 h-7 text-white drop-shadow-lg group-hover:rotate-12 transition-transform duration-500" />
              </div>
            </div>
            <div className="flex flex-col gap-0.5">
              <span className="text-3xl font-black bg-gradient-to-r from-primary via-primary-glow to-accent bg-clip-text text-transparent group-hover:from-accent group-hover:via-primary group-hover:to-primary transition-all duration-500 drop-shadow-sm">
                Nisanth Sports
              </span>
              <div className="flex items-center gap-2">
                <div className="h-px w-8 bg-gradient-to-r from-primary to-accent"></div>
                <span className="text-[10px] text-muted-foreground font-bold tracking-[0.2em] uppercase">Premium Sportswear</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <Link to="/" className="relative px-5 py-3 text-foreground/80 hover:text-foreground font-bold text-sm transition-all duration-300 rounded-xl group">
              <span className="relative z-10">Home</span>
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300"></span>
              <span className="absolute bottom-2 left-5 right-5 h-0.5 bg-gradient-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link to="/products" className="relative px-5 py-3 text-foreground/80 hover:text-foreground font-bold text-sm transition-all duration-300 rounded-xl group">
              <span className="relative z-10">Products</span>
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300"></span>
              <span className="absolute bottom-2 left-5 right-5 h-0.5 bg-gradient-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link to="/gallery" className="relative px-5 py-3 text-foreground/80 hover:text-foreground font-bold text-sm transition-all duration-300 rounded-xl group">
              <span className="relative z-10">Gallery</span>
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300"></span>
              <span className="absolute bottom-2 left-5 right-5 h-0.5 bg-gradient-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link to="/about" className="relative px-5 py-3 text-foreground/80 hover:text-foreground font-bold text-sm transition-all duration-300 rounded-xl group">
              <span className="relative z-10">About Us</span>
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300"></span>
              <span className="absolute bottom-2 left-5 right-5 h-0.5 bg-gradient-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <Link to="/contact" className="relative px-5 py-3 text-foreground/80 hover:text-foreground font-bold text-sm transition-all duration-300 rounded-xl group">
              <span className="relative z-10">Contact</span>
              <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/10 group-hover:to-accent/10 transition-all duration-300"></span>
              <span className="absolute bottom-2 left-5 right-5 h-0.5 bg-gradient-to-r from-primary via-accent to-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></span>
            </Link>
            <div className="ml-6 pl-6 border-l border-border/50">
              <Link to="/get-quote">
                <Button variant="default" size="lg" className="relative overflow-hidden bg-gradient-to-r from-primary via-primary-glow to-accent hover:from-accent hover:via-primary-glow hover:to-primary shadow-[0_10px_40px_-10px_rgba(59,130,246,0.6)] hover:shadow-[0_20px_60px_-10px_rgba(59,130,246,0.8)] transition-all duration-500 font-black px-8 py-3 text-base border border-white/20 group">
                  <span className="relative z-10 flex items-center gap-2">
                    Get Quote
                    <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  </span>
                  <span className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden relative text-foreground p-3 rounded-xl bg-gradient-to-br from-primary/5 to-accent/5 hover:from-primary/15 hover:to-accent/15 transition-all duration-300 border border-border/30 hover:border-primary/40 shadow-lg hover:shadow-xl group"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 blur transition-opacity duration-300"></span>
            {isOpen ? <X size={26} className="relative z-10 transition-all duration-300 rotate-90 group-hover:scale-110" /> : <Menu size={26} className="relative z-10 transition-all duration-300 group-hover:scale-110" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-8 space-y-3 border-t border-border/30 bg-gradient-to-b from-background/90 to-background/70 backdrop-blur-2xl rounded-b-3xl shadow-2xl mt-2">
            <Link
              to="/"
              className="relative block px-6 py-4 text-foreground hover:text-primary font-bold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 mx-3 group border border-transparent hover:border-primary/20"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-150 transition-all duration-300"></span>
                Home
              </span>
            </Link>
            <Link
              to="/products"
              className="relative block px-6 py-4 text-foreground hover:text-primary font-bold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 mx-3 group border border-transparent hover:border-primary/20"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-150 transition-all duration-300"></span>
                Products
              </span>
            </Link>
            <Link
              to="/gallery"
              className="relative block px-6 py-4 text-foreground hover:text-primary font-bold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 mx-3 group border border-transparent hover:border-primary/20"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-150 transition-all duration-300"></span>
                Gallery
              </span>
            </Link>
            <Link
              to="/about"
              className="relative block px-6 py-4 text-foreground hover:text-primary font-bold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 mx-3 group border border-transparent hover:border-primary/20"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-150 transition-all duration-300"></span>
                About Us
              </span>
            </Link>
            <Link
              to="/contact"
              className="relative block px-6 py-4 text-foreground hover:text-primary font-bold transition-all duration-300 rounded-xl hover:bg-gradient-to-r hover:from-primary/10 hover:to-accent/10 mx-3 group border border-transparent hover:border-primary/20"
              onClick={() => setIsOpen(false)}
            >
              <span className="flex items-center gap-3">
                <span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary group-hover:scale-150 transition-all duration-300"></span>
                Contact
              </span>
            </Link>
            <div className="px-3 pt-4">
              <Link to="/get-quote" onClick={() => setIsOpen(false)}>
                <Button variant="default" size="lg" className="w-full relative overflow-hidden bg-gradient-to-r from-primary via-primary-glow to-accent hover:from-accent hover:via-primary-glow hover:to-primary shadow-[0_10px_40px_-10px_rgba(59,130,246,0.6)] hover:shadow-[0_20px_60px_-10px_rgba(59,130,246,0.8)] transition-all duration-500 font-black text-base border border-white/20 group">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    Get Quote
                    <Sparkles className="w-4 h-4 group-hover:rotate-180 transition-transform duration-500" />
                  </span>
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
