import { Phone, Mail, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import logoImage from "@/assets/nsg_logo.png";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-br from-secondary via-secondary/98 to-secondary text-secondary-foreground overflow-hidden">
      {/* Animated Background Layers */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-gradient-to-br from-primary/30 via-primary-glow/20 to-accent/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-gradient-to-tl from-accent/30 via-primary-glow/20 to-primary/30 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }}></div>
        <div className="absolute top-1/3 right-1/4 w-[500px] h-[500px] bg-gradient-to-r from-primary/20 to-accent/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
      </div>
      
      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 opacity-[0.015]" style={{ backgroundImage: 'linear-gradient(hsl(var(--primary)) 1.5px, transparent 1.5px), linear-gradient(90deg, hsl(var(--primary)) 1.5px, transparent 1.5px)', backgroundSize: '60px 60px' }}></div>
      
      {/* Top Gradient Border */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent"></div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          {/* Brand Section */}
          <div className="space-y-7 lg:col-span-1">
            <div className="flex justify-center group">
              <div className="relative">
                <div className="absolute -inset-3 bg-gradient-to-br from-primary via-accent to-primary-glow rounded-2xl blur-2xl opacity-30 group-hover:opacity-60 transition-all duration-500 animate-pulse"></div>
                <div className="relative w-20 h-20 rounded-2xl bg-white flex items-center justify-center shadow-[0_20px_60px_-15px_rgba(197,158,79,0.7)] border border-primary/20">
                  <img 
                    src={logoImage} 
                    alt="NSG Logo" 
                    className="w-16 h-16 object-contain"
                  />
                </div>
              </div>
            </div>
            <p className="text-secondary-foreground/85 leading-relaxed text-sm max-w-sm font-medium">
              Premium custom sportswear manufacturing for teams and brands worldwide. Quality you can trust, designs you'll love.
            </p>
            <div className="flex gap-3 pt-3">
              <a href="#" className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-foreground/10 to-secondary-foreground/5 hover:from-primary/25 hover:to-accent/25 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-translate-y-2 border border-secondary-foreground/10 hover:border-primary/40 group shadow-lg hover:shadow-2xl">
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/20 group-hover:to-accent/20 blur transition-all duration-500"></span>
                <svg className="relative z-10 w-5 h-5 group-hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/></svg>
              </a>
              <a href="#" className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-foreground/10 to-secondary-foreground/5 hover:from-primary/25 hover:to-accent/25 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-translate-y-2 border border-secondary-foreground/10 hover:border-primary/40 group shadow-lg hover:shadow-2xl">
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/20 group-hover:to-accent/20 blur transition-all duration-500"></span>
                <svg className="relative z-10 w-5 h-5 group-hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a href="#" className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-secondary-foreground/10 to-secondary-foreground/5 hover:from-primary/25 hover:to-accent/25 flex items-center justify-center transition-all duration-500 hover:scale-110 hover:-translate-y-2 border border-secondary-foreground/10 hover:border-primary/40 group shadow-lg hover:shadow-2xl">
                <span className="absolute inset-0 rounded-xl bg-gradient-to-br from-primary/0 to-accent/0 group-hover:from-primary/20 group-hover:to-accent/20 blur transition-all duration-500"></span>
                <svg className="relative z-10 w-5 h-5 group-hover:text-primary transition-colors duration-300" fill="currentColor" viewBox="0 0 24 24"><path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/></svg>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-primary">Quick Links</h4>
            <ul className="space-y-3">
              <li><Link to="/" className="text-secondary-foreground/70 hover:text-primary transition-all duration-200 flex items-center gap-2 group hover:translate-x-1"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>Home</Link></li>
              <li><Link to="/gallery" className="text-secondary-foreground/70 hover:text-primary transition-all duration-200 flex items-center gap-2 group hover:translate-x-1"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>Gallery</Link></li>
              <li><Link to="/about" className="text-secondary-foreground/70 hover:text-primary transition-all duration-200 flex items-center gap-2 group hover:translate-x-1"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>About Us</Link></li>
              <li><Link to="/contact" className="text-secondary-foreground/70 hover:text-primary transition-all duration-200 flex items-center gap-2 group hover:translate-x-1"><span className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors"></span>Contact</Link></li>
            </ul>
          </div>
          
          {/* Products */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-primary">Our Products</h4>
            <ul className="space-y-3 text-secondary-foreground/70">
              <li className="hover:text-primary transition-all duration-200 cursor-pointer flex items-center gap-2 group hover:translate-x-1"><span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors"></span>Custom T-Shirts</li>
              <li className="hover:text-primary transition-all duration-200 cursor-pointer flex items-center gap-2 group hover:translate-x-1"><span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors"></span>Sports Tracksuits</li>
              <li className="hover:text-primary transition-all duration-200 cursor-pointer flex items-center gap-2 group hover:translate-x-1"><span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors"></span>Athletic Hoodies</li>
              <li className="hover:text-primary transition-all duration-200 cursor-pointer flex items-center gap-2 group hover:translate-x-1"><span className="w-1.5 h-1.5 rounded-full bg-accent/50 group-hover:bg-accent transition-colors"></span>Team Sportswear</li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h4 className="font-bold mb-6 text-lg text-primary">Contact Us</h4>
            <ul className="space-y-5">
              <li className="flex items-start gap-3 text-secondary-foreground/70 group hover:text-secondary-foreground transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                  <Phone className="w-5 h-5 text-primary flex-shrink-0" />
                </div>
                <div>
                  <p className="font-semibold text-secondary-foreground">+91 1234567890</p>
                  <p className="text-sm text-secondary-foreground/60">Mon-Sat, 9am-6pm</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-secondary-foreground/70 group hover:text-secondary-foreground transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                  <Mail className="w-5 h-5 text-primary flex-shrink-0" />
                </div>
                <div className="flex items-center">
                  <p className="font-semibold text-secondary-foreground break-all">info@nisanthsports.com</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-secondary-foreground/70 group hover:text-secondary-foreground transition-colors">
                <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-colors">
                  <MapPin className="w-5 h-5 text-primary flex-shrink-0" />
                </div>
                <div>
                  <p className="font-semibold text-secondary-foreground">Bangalore, India</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom Bar */}
        <div className="pt-8 mt-12 border-t border-secondary-foreground/10 relative">
          <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-4 text-secondary-foreground/60 text-sm">
              <p>&copy; 2025 Nisanth Sports Garments. All rights reserved.</p>
              <span className="hidden md:inline text-secondary-foreground/30">•</span>
              <p>Developed By <a href="https://thinkaside.com" target="_blank" rel="noopener noreferrer" className="font-semibold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent hover:from-accent hover:to-primary transition-all duration-200">ThinkAside</a></p>
            </div>
            <div className="flex gap-6 text-sm text-secondary-foreground/60">
              <a href="#" className="hover:text-primary transition-all duration-200 relative group">
                Privacy Policy
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="hover:text-primary transition-all duration-200 relative group">
                Terms of Service
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
              </a>
              <a href="#" className="hover:text-primary transition-all duration-200 relative group">
                Sitemap
                <span className="absolute -bottom-1 left-0 w-0 h-px bg-gradient-to-r from-primary to-accent group-hover:w-full transition-all duration-300"></span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
