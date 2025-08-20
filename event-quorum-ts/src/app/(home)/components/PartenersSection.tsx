"use client";

import { jsx } from "react/jsx-runtime";
import { useEffect, useRef, useState } from "react";

export default function PartnersSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const scrollRef = useRef<HTMLDivElement | null>(null);
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

  // Logos fictifs pour la démo (remplace par tes vraies images)
  const demoLogos = [
    "/logoOrange.png",
    "/logo_nesle.png",
    "/logoSucreIvoire2.png",
    "/logoSAPH.png",
    "/logoSocieteGenerale.png",
    "/Logo-NSIA-BANK.png",
    "/logoUnilever2.png",
    "/logopalmci.png",
    "/logo_lnb.jpg",
    "/logo_smb.png",
    "/logo_biic1.png",
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

  // Animation d'apparition
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // Défilement automatique amélioré
  useEffect(() => {
    const container = scrollRef.current;
    if (!container || isMobile) return;

    let scrollPosition = 0;
    let isPaused = false;
    let animationId: number;

    const scrollSpeed = 0.8; // Vitesse plus fluide
    const maxScroll = container.scrollWidth / 3; // Un tiers pour le défilement infini

    const smoothScroll = () => {
      if (!isPaused && container) {
        scrollPosition += scrollSpeed;
        
        // Reset smooth pour défilement infini
        if (scrollPosition >= maxScroll) {
          scrollPosition = 0;
        }
        
        container.scrollLeft = scrollPosition;
      }
      animationId = requestAnimationFrame(smoothScroll);
    };

    // Démarrage après délai
    const startTimer = setTimeout(() => {
      animationId = requestAnimationFrame(smoothScroll);
    }, 1500);

    // Gestion hover
    const handleMouseEnter = () => { isPaused = true; };
    const handleMouseLeave = () => { isPaused = false; };

    container.addEventListener('mouseenter', handleMouseEnter);
    container.addEventListener('mouseleave', handleMouseLeave);

    // eslint-disable-next-line consistent-return
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
      className="w-full py-12 md:py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden"
    >
      {/* Effets de fond décoratifs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-400/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* En-tête amélioré */}
        <div className="text-center mb-16">
          
          
          <h2
            className={`text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6 transition-all duration-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Ils nous font{' '}
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-teal-600 bg-clip-text text-transparent">
              confiance
            </span>
          </h2>
          
          <p
            className={`text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed transition-all duration-700 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
            }`}
          >
            Des entreprises leaders qui nous accompagnent dans notre mission d&apos;innovation et d&apos;excellence
          </p>
        </div>

        {/* Carrousel amélioré */}
        <div
          className={`relative transition-all duration-700 delay-400 ${
            isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
          }`}
        >
          {/* Version Mobile: Grille modernisée */}
          <div className="block md:hidden">
            <div className="grid grid-cols-2 gap-6 max-w-md mx-auto">
              {partners.slice(0, 6).map((partner, index) => (
                <div
                  key={partner.id}
                  className={`group bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 dark:border-gray-700/50 h-24 flex items-center justify-center transition-all duration-500 hover:scale-105 hover:shadow-xl hover:bg-white dark:hover:bg-gray-800 ${
                    isVisible ? 'animate-in slide-in-from-bottom-4' : ''
                  }`}
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="relative w-full h-full">
                    <img
                      src={demoLogos[index % demoLogos.length]}
                      alt={`Logo ${partner.name}`}
                      className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-300 opacity-70 group-hover:opacity-100"
                    />
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center mt-8">
              <button className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-medium rounded-full hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 shadow-lg hover:shadow-xl">
                Découvrir tous nos partenaires
                <svg className="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Version Desktop: Carrousel fluide */}
          <div className="hidden md:block">
            <div className="relative overflow-hidden rounded-2xl bg-white/30 dark:bg-gray-800/30 backdrop-blur-sm p-8 border border-white/20 dark:border-gray-700/50">
              {/* Masques de dégradé améliorés */}
              <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white/90 via-white/50 to-transparent dark:from-gray-800/90 dark:via-gray-800/50 z-20 pointer-events-none" />
              <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white/90 via-white/50 to-transparent dark:from-gray-800/90 dark:via-gray-800/50 z-20 pointer-events-none" />

              {/* Conteneur de défilement */}
              <div
                ref={scrollRef}
                className="flex gap-8 lg:gap-12 overflow-hidden py-4"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {/* Triple les logos pour défilement infini fluide */}
                {[...partners, ...partners, ...partners].map((partner, index) => (
                  <div
                    key={`${partner.id}-${index}`}
                    className="flex-shrink-0 w-40 lg:w-48 h-28 lg:h-32 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-md border border-white/30 dark:border-gray-700/50 flex items-center justify-center p-6 hover:shadow-xl transition-all duration-500 hover:scale-110 hover:bg-white dark:hover:bg-gray-800 group relative overflow-hidden"
                  >
                    {/* Effet de brillance */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity duration-300" />
                    
                    <div className="relative w-full h-full z-10">
                      <img
                        src={demoLogos[partner.id - 1]}
                        alt={`Logo ${partner.name}`}
                        className="w-full h-full object-contain filter grayscale group-hover:grayscale-0 transition-all duration-500 opacity-60 group-hover:opacity-100"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>

        {/* Section témoignage 
        <div className="text-center mt-16">
          <div className="max-w-2xl mx-auto">
            <blockquote className="text-lg md:text-xl text-gray-600 dark:text-gray-300 italic">
              &quot;Plus de <span className="font-bold text-blue-600">500+ entreprises</span> nous font confiance pour leurs événements digitaux"
            </blockquote>
          </div>
        </div>
        */}
      </div>

      <style >{`
        @keyframes animate-in {
          from {
            opacity: 0;
            transform: translateY(16px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-in {
          animation: animate-in 0.6s ease-out forwards;
        }
        
        .slide-in-from-bottom-4 {
          animation: animate-in 0.6s ease-out forwards;
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