import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
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
  const [isHovering, setIsHovering] = useState<number | null>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const titleref = useRef(null);
  const introref = useRef(null);

  // Fonction pour avancer au prochain slide
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % (events.length - 2));
  };

  // Fonction pour reculer au slide précédent
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + (events.length - 2)) % (events.length - 2));
  };

  // Configuration du défilement automatique
  useEffect(() => {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, []);

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

  }, []);

  // Pause du défilement lors du survol
  const handleMouseEnter = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
  };

  // Reprise du défilement à la sortie du survol
  const handleMouseLeave = () => {
    timerRef.current = setInterval(() => {
      nextSlide();
    }, 3000);
  };

  return (
    <div className="w-full py-8 px-4 my-10 bg-gray-50 rounded-lg">
      <h2 ref={titleref} className="text-3xl dark:text-gray-900 font-bold text-center mb-6">Nos Événements <span className='bg-gradient-to-r from-green-600 via-yellow-600 to-yellow-500 text-transparent bg-clip-text'> Réussis</span></h2>
      <p ref={introref} className="text-lg md:text-xl text-gray-600 max-w-3xl mb-8 mx-auto">
        Découvrez les événements marquants que nous avons organisés avec succès
      </p>
      <div 
        className="relative w-full overflow-hidden"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Flèche gauche */}
        <button 
          onClick={prevSlide}
          className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
        >
          <ChevronLeft className="h-6 w-6 text-gray-800" />
        </button>

        {/* Container du carrousel */}
        <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentIndex * 33.33}%)` }}>
          {events.map((event, index) => (
            <div 
              key={event.id}
              className="w-1/3 flex-shrink-0 px-2 transition-all duration-300"
            >
              <div 
                className="relative h-64 rounded-lg overflow-hidden shadow-md"
                onMouseEnter={() => setIsHovering(index)}
                onMouseLeave={() => setIsHovering(null)}
              >
                <img 
                  src={event.image} 
                  alt={event.title} 
                  className="w-full h-full object-cover"
                />
                
                <div 
                  className={`absolute inset-0 bg-black/70 flex flex-col justify-end p-4 transition-opacity duration-300 ${
                    isHovering === index ? 'opacity-100' : 'opacity-0'
                  }`}
                >
                  <h3 className="text-white text-xl font-bold mb-2">{event.title}</h3>
                  <p className="text-white text-sm">{event.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Flèche droite */}
        <button 
          onClick={nextSlide}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white/80 p-2 rounded-full shadow-lg hover:bg-white transition-all"
        >
          <ChevronRight className="h-6 w-6 text-gray-800" />
        </button>
      </div>
    </div>
  );
};

export default EventCarousel;