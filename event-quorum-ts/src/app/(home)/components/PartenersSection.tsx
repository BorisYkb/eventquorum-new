"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

export default function PartnersSection() {
  const sectionRef = useRef(null);
  const scrollRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  const partners = [
    { id: 1, name: "Orange CI", logo: "/logoOrange.png" },
    { id: 2, name: "Nesle", logo: "/logo_nesle.png" },
    { id: 3, name: "SucreIvoire", logo: "/logoSucreIvoire2.png" },
    { id: 4, name: "SAPH", logo: "/logoSAPH.png" },
    { id: 5, name: "Société Générale", logo: "/logoSocieteGenerale.png" },
    { id: 6, name: "NSIA Bank", logo: "/Logo-NSIA-BANK.png" },
    { id: 7, name: "Unilever", logo: "/logoUnilever2.png" },
    { id: 8, name: "PALMCI", logo: "/logopalmci.png" },
    { id: 9, name: "LNB", logo: "/logo_lnb.jpg" },
    { id: 10, name: "SMB", logo: "/logo_smb.png" },
    { id: 11, name: "BIIC", logo: "/logo_biic1.png" },
  ];

  // Détection de la taille d'écran
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Animation d'apparition simple et fiable
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  // Défilement automatique simplifié et adaptatif
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let scrollDirection = 1;
    let scrollSpeed = isMobile ? 0.3 : 0.5;
    let isPaused = false;
    let animationId;

    const scroll = () => {
      if (!isPaused && container) {
        container.scrollLeft += scrollSpeed * scrollDirection;

        // Reset quand on arrive au bout
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth - 10) {
          container.scrollLeft = 0;
        }
      }
      animationId = requestAnimationFrame(scroll);
    };

    // Démarrage après un délai
    const startTimer = setTimeout(() => {
      animationId = requestAnimationFrame(scroll);
    }, 2000);

    // Pause sur hover (desktop seulement)
    const handleMouseEnter = () => {
      if (!isMobile) isPaused = true;
    };

    const handleMouseLeave = () => {
      if (!isMobile) isPaused = false;
    };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      clearTimeout(startTimer);
      if (animationId) cancelAnimationFrame(animationId);
      if (container) {
        container.removeEventListener('mouseenter', handleMouseEnter);
        container.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [isMobile]);

  return (
    <section
      ref={sectionRef}
      className="w-full py-8 md:py-16 lg:py-20 bg-gray-50 dark:bg-gray-900 relative mt-12"
    >
      <div className="container mx-auto px-4 max-w-7xl">
        {/* En-tête */}
        <div className="text-center mb-8 md:mb-12">
          <h2
            className={`text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4 transition-all duration-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Ils nous font <span className="text-blue-600">confiance</span>
          </h2>
          <p
            className={`text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto transition-all duration-500 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
            }`}
          >
            Des partenaires de confiance qui nous accompagnent dans notre mission
          </p>
        </div>

        {/* Carrousel de logos */}
        <div
          className={`relative transition-all duration-500 delay-400 ${
            isVisible ? "opacity-100" : "opacity-0"
          }`}
        >
          {/* Version Mobile: Grille statique */}
          <div className="block md:hidden">
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">
              {partners.slice(0, 4).map((partner) => (
                <div
                  key={partner.id}
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700 h-16 flex items-center justify-center"
                >
                  <div className="relative w-full h-full">
                    <Image
                      src={partner.logo}
                      alt={`Logo ${partner.name}`}
                      fill
                      sizes="150px"
                      style={{ objectFit: "contain" }}
                      className="grayscale opacity-70"
                    />
                  </div>
                </div>
              ))}
            </div>
            {/* Lien pour voir plus sur mobile */}
            <div className="text-center mt-6">
              <button className="text-blue-600 text-sm font-medium hover:text-blue-800 transition-colors">
                Voir tous nos partenaires →
              </button>
            </div>
          </div>

          {/* Version Desktop: Carrousel défilant */}
          <div className="hidden md:block">
            <div className="relative overflow-hidden">
              {/* Masques de dégradé */}
              <div className="absolute left-0 top-0 w-20 h-full bg-gradient-to-r from-gray-50 to-transparent dark:from-gray-900 z-10 pointer-events-none"></div>
              <div className="absolute right-0 top-0 w-20 h-full bg-gradient-to-l from-gray-50 to-transparent dark:from-gray-900 z-10 pointer-events-none"></div>

              {/* Conteneur de défilement */}
              <div
                ref={scrollRef}
                className="flex gap-8 lg:gap-12 overflow-x-hidden py-6"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* Triple les logos pour un défilement infini */}
                {[...partners, ...partners, ...partners].map((partner, index) => (
                  <div
                    key={`${partner.id}-${index}`}
                    className="flex-shrink-0 w-32 lg:w-40 h-20 lg:h-24 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700
                              flex items-center justify-center p-4 hover:shadow-md transition-all duration-300 hover:scale-105 group"
                  >
                    <div className="relative w-full h-full">
                      <Image
                        src={partner.logo}
                        alt={`Logo ${partner.name}`}
                        fill
                        sizes="(max-width: 1024px) 128px, 160px"
                        style={{ objectFit: "contain" }}
                        className="grayscale group-hover:grayscale-0 transition-all duration-300"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .container {
          width: 100%;
        }

        @media (max-width: 640px) {
          .container {
            padding-left: 1rem;
            padding-right: 1rem;
          }
        }
      `}</style>
    </section>
  );
}
