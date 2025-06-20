"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  const partners = [
    { id: 1, name: "Orange CI", logo: "/logoOrange.png" },
    { id: 2, name: "Nesle", logo: "/logo_nesle.png" },
    { id: 3, name: "SucreIvoire", logo: "/logoSucreIvoire2.png" },
    { id: 4, name: "SAPH", logo: "/logoSAPH.png" },
    { id: 5, name: "Société Générale", logo: "/logoSocieteGenerale.png" },
    { id: 6, name: "NSIA Bank", logo: "/Logo-NSIA-BANK.png" },
    { id: 7, name: "Unilever", logo: "/logoUnilever2.png" },
    { id: 8, name: "PALMCI", logo: "/logopalmci.png" },
  ];

  // Animation d'apparition simple
  useEffect(() => {
    // Une simple temporisation pour l'animation d'apparition
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 300);
    
    return () => clearTimeout(timer);
  }, []);

  // Version simplifiée du défilement automatique
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    
    let pauseScroll = false;
    let scrollInterval: NodeJS.Timeout;
    
    // Défilement simple
    const startScrolling = () => {
      scrollInterval = setInterval(() => {
        if (pauseScroll) return;
        
        // Incrémentation du scroll
        if (container.scrollLeft >= (container.scrollWidth / 2) - 50) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 1;
        }
      }, 30);
    };
    
    // Démarrage avec délai
    const initTimer = setTimeout(() => {
      startScrolling();
    }, 1000);
    
    // Gestion des événements
    const handlePause = () => { pauseScroll = true; };
    const handleResume = () => { pauseScroll = false; };
    
    container.addEventListener("mouseenter", handlePause);
    container.addEventListener("mouseleave", handleResume);
    
    return () => {
      clearTimeout(initTimer);
      clearInterval(scrollInterval);
      container.removeEventListener("mouseenter", handlePause);
      container.removeEventListener("mouseleave", handleResume);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-20 bg-gradient-to-b from-white to-blue-50 dark:from-gray-900 dark:to-gray-800 relative overflow-hidden"
    >
      {/* Éléments de fond simplifiés */}
      <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-blue-100 rounded-full opacity-30 dark:opacity-10"></div>
      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-200 rounded-full opacity-20 dark:opacity-5"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-10 md:mb-16">
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-4 transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Ils nous font <span className="text-blue-600">confiance</span>
          </h2>
          <p
            className={`text-base md:text-lg lg:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto transition-opacity duration-500 ${
              isVisible ? "opacity-100" : "opacity-0"
            }`}
          >
            Nous collaborons avec des entreprises innovantes pour créer un
            impact durable et mesurable.
          </p>
        </div>

        {/* Conteneur du carrousel avec indication de défilement */}
        <div 
          className={`relative pb-8 transition-opacity duration-500 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Indicateurs de défilement */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 bg-gradient-to-r from-white to-transparent dark:from-gray-900 w-16 h-full z-10 pointer-events-none opacity-70"></div>
          <div className="absolute right-0 top-1/2 -translate-y-1/2 bg-gradient-to-l from-white to-transparent dark:from-gray-900 w-16 h-full z-10 pointer-events-none opacity-70"></div>

          {/* Carrousel horizontal optimisé */}
          <div
            ref={scrollRef}
            className="flex gap-8 md:gap-12 lg:gap-16 overflow-x-auto py-4 px-2"
            style={{
              WebkitOverflowScrolling: "touch",
              scrollbarWidth: "none",
              msOverflowStyle: "none"
            }}
          >
            {/* Doublement des partenaires pour une boucle fluide */}
            {[...partners, ...partners].map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="flex-shrink-0 w-28 sm:w-32 md:w-40 h-16 md:h-24 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300 hover:scale-105 group"
                title={partner.name}
              >
                <div className="relative w-full h-full">
                  <Image
                    src={partner.logo}
                    alt={partner.name}
                    fill
                    sizes="(max-width: 640px) 7rem, (max-width: 768px) 8rem, 10rem"
                    style={{ objectFit: "contain" }}
                    className="transition-transform duration-300"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}