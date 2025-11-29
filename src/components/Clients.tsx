import { useState, useEffect } from "react";
import { useIntersectionObserver } from "@/hooks/useIntersectionObserver";
import { API_ENDPOINTS, processImageUrls } from "@/config/api";

interface Client {
  id: string;
  name: string;
  logo_url: string;
}

const Clients = () => {
  const [ref, isVisible] = useIntersectionObserver();
  const [clients, setClients] = useState<Client[]>([]);

  useEffect(() => {
    fetch(`${API_ENDPOINTS.CLIENTS}?path=public`)
      .then(res => res.json())
      .then(data => {
        const processedData = processImageUrls(data || []);
        setClients(processedData);
      })
      .catch(err => setClients([]));
  }, []);

  // Show section even if no clients data

  return (
    <section ref={ref} className="py-20 bg-muted/20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-10 gap-12 items-center">
          {/* Left Column - Title & Description (30%) */}
          <div className={`lg:col-span-3 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'
          }`}>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Our Trusted Clients
            </h2>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Proud to serve leading brands and organizations across various industries. Our commitment to quality has earned us the trust of these valued partners.
            </p>
          </div>

          {/* Right Column - Client Logos (70%) */}
          <div className={`lg:col-span-7 transition-all duration-700 ${
            isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'
          }`} style={{ transitionDelay: '200ms' }}>
            <div className="flex flex-wrap justify-center lg:justify-start items-center gap-6 lg:gap-8">
              {clients.map((client, index) => (
                <div 
                  key={client.id} 
                  className={`group relative transition-all duration-700 ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${300 + index * 100}ms` }}
                >
                  <div className="relative w-24 h-24 md:w-32 md:h-32 lg:w-36 lg:h-36">
                    <div className="absolute inset-0 bg-white rounded-2xl shadow-md group-hover:shadow-xl transition-all duration-500 group-hover:rotate-2 group-hover:scale-105"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary via-accent to-primary-glow rounded-2xl p-0.5 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-full h-full bg-white rounded-2xl"></div>
                    </div>
                    <div className="relative z-10 w-full h-full flex items-center justify-center p-4 md:p-6">
                      <img
                        src={client.logo_url}
                        alt={client.name}
                        className="max-w-full max-h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-110"
                      />
                    </div>
                    <div className="absolute -inset-2 bg-gradient-to-r from-primary/15 to-accent/15 rounded-full blur-lg opacity-0 group-hover:opacity-50 transition-opacity duration-500 -z-10"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Clients;