import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const EventCarousel = () => {
  // Données d'exemple pour les événements
  const events = [
    {
      id: 1,
      title: "Conférence Annuelle 2024",
      description: "Notre plus grande conférence à ce jour avec plus de 500 participants et 20 intervenants internationaux.",
      image: "/event1.avif"
    },
    {
      id: 2,
      title: "Séminaire Tech Innovation",
      description: "Un événement exclusif présentant les dernières avancées technologiques et leurs applications.",
      image: "/even3.jpg"
    },
    {
      id: 3,
      title: "Gala de Charité",
      description: "Plus de 100 000€ collectés pour soutenir des causes humanitaires importantes.",
      image: "/even4.jpg"
    },
    {
      id: 4,
      title: "Hackathon 2024",
      description: "48 heures d'innovation non-stop avec plus de 20 équipes participantes.",
      image: "/even6.jpg"
    },
    {
      id: 5,
      title: "Forum des Métiers",
      description: "Une journée dédiée à l'orientation professionnelle avec plus de 30 entreprises présentes.",
      image: "/even7.jpg"
    },
    {
      id: 6,
      title: "Workshop Design Thinking",
      description: "Atelier pratique sur les méthodes de conception innovantes et créatives.",
      image: "/even5.jpg"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const titleref = useRef(null);
  const introref = useRef(null);
  const carouselRef = useRef(null);

  // Configuration du défilement automatique continu
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % events.length);
    }, 3000); // Change toutes les 3 secondes

    return () => clearInterval(interval);
  }, [events.length]);

  // Animation GSAP au scroll
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleref.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(
      titleref.current,
      { x: 60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 }
    )
    .fromTo(
      introref.current,
      { x: -60, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  // Calcul du pourcentage pour mobile/desktop
  const getSlideWidth = () => {
    if (typeof window !== 'undefined') {
      if (window.innerWidth < 640) return 100; // 1 slide sur mobile
      if (window.innerWidth < 1024) return 50; // 2 slides sur tablet
      return 33.33; // 3 slides sur desktop
    }
    return 33.33;
  };

  const slideWidth = getSlideWidth();
  const slidesToShow = slideWidth === 100 ? 1 : slideWidth === 50 ? 2 : 3;

  return (
    <div className="w-full py-12 px-4 my-10 bg-gray-50 rounded-lg">
      {/* En-tête */}
      <div className="text-center mb-8">
        <h2 ref={titleref} className="text-3xl dark:text-gray-900 font-bold mb-4">
          Nos Événements{' '}
          <span className="bg-gradient-to-r from-green-600 via-yellow-600 to-yellow-500 text-transparent bg-clip-text">
            Réussis
          </span>
        </h2>
        <p ref={introref} className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
          Découvrez les événements marquants que nous avons organisés avec succès
        </p>
      </div>

      {/* Carrousel */}
      <div className="relative overflow-hidden">
        <div
          ref={carouselRef}
          className="flex transition-transform duration-700 ease-in-out gap-5"
          style={{
            transform: `translateX(-${(currentIndex * slideWidth)}%)`,
          }}
        >
          {/* Triple les événements pour un défilement infini */}
          {[...events, ...events, ...events].map((event, index) => (
            <div
              key={`${event.id}-${Math.floor(index / events.length)}`}
              className={`flex-shrink-0 ${
                slideWidth === 100 ? 'w-full' :
                slideWidth === 50 ? 'w-1/2' : 'w-1/3'
              } px-2`}
              style={{ minWidth: `${slideWidth}%` }}
            >
              <div className="relative rounded-2xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 group">
                {/* Image */}
                <div className="relative h-48 sm:h-56 lg:h-64 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />

                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  {/* Contenu superposé */}
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 text-white">
                    <h3 className="text-lg sm:text-xl font-bold mb-2 line-clamp-2">
                      {event.title}
                    </h3>

                    {/* Lien "Learn more" avec icône */}
                    <div className="flex items-center gap-2 text-sm opacity-90 hover:opacity-100 group-hover:translate-x-1 transition-all duration-300">
                      <span>En savoir plus</span>
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 8l4 4m0 0l-4 4m4-4H3"
                        />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Styles CSS pour le line-clamp */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
};

export default EventCarousel;
