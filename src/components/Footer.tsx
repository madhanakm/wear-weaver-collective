const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">SportWear Pro</h3>
            <p className="text-secondary-foreground/80">
              Premium custom sportswear manufacturing for teams and brands worldwide.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Products</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>Custom T-Shirts</li>
              <li>Sports Tracksuits</li>
              <li>Athletic Hoodies</li>
              <li>Team Sportswear</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>About Us</li>
              <li>Our Process</li>
              <li>Quality Standards</li>
              <li>Testimonials</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li>Contact Us</li>
              <li>FAQs</li>
              <li>Shipping Info</li>
              <li>Returns Policy</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-8 border-t border-secondary-foreground/20 text-center text-secondary-foreground/80">
          <p>&copy; 2025 SportWear Pro. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
