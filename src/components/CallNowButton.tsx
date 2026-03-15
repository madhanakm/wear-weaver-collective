import { Phone } from "lucide-react";

const CallNowButton = () => {
  return (
    <a
      href="tel:+918056999316"
      className="fixed left-4 top-1/2 -translate-y-1/2 z-50 group"
      aria-label="Call Now"
    >
      <div className="relative">
        <div className="absolute inset-0 bg-primary rounded-full blur-lg opacity-75 group-hover:opacity-100 animate-pulse"></div>
        <div className="relative bg-primary hover:bg-primary/90 text-white px-4 py-3 md:px-6 md:py-4 rounded-full shadow-2xl hover:shadow-primary/50 transition-all duration-300 group-hover:scale-110 flex items-center gap-2 md:gap-3">
          <Phone className="w-5 h-5 md:w-6 md:h-6 animate-bounce" />
          <span className="font-bold text-sm md:text-base whitespace-nowrap">Call Now</span>
        </div>
      </div>
    </a>
  );
};

export default CallNowButton;
