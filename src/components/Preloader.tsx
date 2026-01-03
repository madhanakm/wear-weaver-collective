import { useEffect, useState } from "react";
import logoImage from "@/assets/nsg_logo.png";

const Preloader = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const fadeTimer = setTimeout(() => {
      setFadeOut(true);
    }, 1800);
    
    const hideTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2000);

    return () => {
      clearTimeout(fadeTimer);
      clearTimeout(hideTimer);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-background via-background to-muted/30 transition-opacity duration-300 ${
      fadeOut ? 'opacity-0' : 'opacity-100'
    }`}>
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Rotating Rings */}
        {[...Array(3)].map((_, i) => (
          <div
            key={i}
            className="absolute border-2 border-primary/20 rounded-full animate-spin"
            style={{
              width: `${200 + i * 100}px`,
              height: `${200 + i * 100}px`,
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animationDuration: `${3 + i}s`,
              animationDirection: i % 2 === 0 ? 'normal' : 'reverse'
            }}
          />
        ))}
        
        {/* Floating Particles */}
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-gradient-to-r from-primary to-accent rounded-full animate-ping"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
              animationDuration: `${2 + Math.random() * 2}s`
            }}
          />
        ))}
        
        {/* Morphing Blobs */}
        {[...Array(4)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-gradient-to-br from-primary/15 to-accent/15 rounded-full blur-2xl animate-pulse"
            style={{
              width: `${150 + i * 80}px`,
              height: `${150 + i * 80}px`,
              left: `${20 + i * 20}%`,
              top: `${25 + (i % 2) * 50}%`,
              animationDelay: `${i * 0.8}s`,
              animationDuration: `${3 + i * 0.5}s`,
              transform: `rotate(${i * 45}deg)`
            }}
          />
        ))}
      </div>

      {/* Logo and Loading */}
      <div className="relative z-10 text-center">
        {/* Logo Container with Enhanced Animation */}
        <div className="relative mb-8">
          {/* Outer Glow Ring */}
          <div className="absolute -inset-8 border-2 border-primary/30 rounded-full animate-spin" style={{ animationDuration: '4s' }}></div>
          <div className="absolute -inset-6 border border-accent/40 rounded-full animate-spin" style={{ animationDuration: '3s', animationDirection: 'reverse' }}></div>
          
          {/* Pulsing Background */}
          <div className="absolute -inset-4 bg-gradient-to-br from-primary via-accent to-primary-glow rounded-3xl blur-2xl opacity-60 animate-pulse"></div>
          
          {/* Logo */}
          <div className="relative w-28 h-28 mx-auto rounded-2xl bg-white flex items-center justify-center shadow-2xl border border-primary/20 animate-bounce" style={{ animationDuration: '2s' }}>
            <img 
              src={logoImage} 
              alt="NSG Logo" 
              className="w-24 h-24 object-contain"
            />
          </div>
        </div>
        
        {/* Company Name with Typewriter Effect */}
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-pulse">
          Nisanth Apparels
        </h2>
        
        {/* Enhanced Loading Animation */}
        <div className="flex justify-center items-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <div
              key={i}
              className="w-2 h-8 bg-gradient-to-t from-primary to-accent rounded-full animate-pulse"
              style={{ 
                animationDelay: `${i * 0.15}s`,
                animationDuration: '1s',
                transform: `scaleY(${0.3 + (Math.sin(Date.now() * 0.01 + i) * 0.7)})`
              }}
            />
          ))}
        </div>
        
        {/* Loading Text */}
        <p className="text-sm text-muted-foreground animate-pulse">Loading...</p>
      </div>
    </div>
  );
};

export default Preloader;