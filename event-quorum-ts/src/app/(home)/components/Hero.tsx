"use client";

import { useEffect, useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef(null);

  // Données du carrousel - remplacez par vos propres images
  const carouselData = [
    {
      id: "1",
      title: "Conférence d'entreprise festive",
      coverUrl: "/event2.avif",
      description: "Organisez des conférences d'entreprise mémorables"
    },
    {
      id: "2",
      title: "Soirée de gala",
      coverUrl: "/event10.jpg",
      description: "Créez des soirées de gala mémorables"
    },
    {
      id: "3",
      title: "Concert",
      coverUrl: "/event9.jpg",
      description: "Organisez des concerts inoubliables"
    },
    {
      id: "4",
      title: "Événement networking",
      coverUrl: "/event8.jpg",
      description: "Créez des moments de networking"
    },
    {
      id: "5",
      title: "Lancement de produit",
      coverUrl: "/produit1.png",
      description: "Organisez vos lancements de produits"
    }
  ];

  useEffect(() => {
    // Animation d'entrée au chargement
    setIsVisible(true);
  }, []);

  // Carrousel automatique
  useEffect(() => {
    const startCarousel = () => {
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselData.length);
      }, 3000); // Change toutes les 3 secondes
    };

    // Démarrage après que l'animation d'entrée soit terminée
    const timer = setTimeout(startCarousel, 2500);

    return () => {
      clearTimeout(timer);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [carouselData.length]);

  return (
    <header className="bg-gradient-to-br mt-0 pt-4 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Partie texte (gauche) */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-2000 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
            }`}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-300 leading-tight mb-4">
              Créer des <span className="text-blue-600">moments</span> extraordinaires
            </h1>

            <p className="text-lg text-gray-600 mb-6">
              Nous transformons vos idées en événements exceptionnels qui dépassent toutes les attentes. Commencez dès aujourd'hui.
            </p>

            {/* Boutons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/DemoRequest"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white no-underline rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl"
              >
                Créer un événement
              </Link>
            </div>

            {/* Statistiques */}
            <div className="flex gap-6 md:gap-14 mt-8">
              <div className="text-center md:text-left">
                <p className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">14k+</span>
                </p>
                <p className="text-sm text-gray-500">Learners</p>
              </div>

              <div className="text-center md:text-left">
                <p className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent">1.05k+</span>
                </p>
                <p className="text-sm text-gray-500">Courses</p>
              </div>

              <div className="text-center md:text-left">
                <p className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">59k+</span>
                </p>
                <p className="text-sm text-gray-500">Graduates</p>
              </div>
            </div>
          </div>

          {/* Carrousel (droite) */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-2000 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative h-80 md:h-96 lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl">

              {/* Conteneur du carrousel */}
              <div className="relative w-full h-full">
                {carouselData.map((item, index) => (
                  <div
                    key={item.id}
                    className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
                      index === currentSlide
                        ? 'opacity-100 scale-100'
                        : 'opacity-0 scale-105'
                    }`}
                  >
                    <Image
                      src={item.coverUrl}
                      alt={item.title}
                      fill
                      style={{ objectFit: 'cover' }}
                      priority={index === 0}
                      className="transition-transform duration-1000"
                    />

                    {/* Overlay avec informations */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent">
                      <div className="absolute bottom-6 left-6 text-white">
                        <h3 className="text-lg md:text-xl font-semibold mb-2">
                          {item.title}
                        </h3>
                        <p className="text-sm opacity-90">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Indicateurs de slides */}
              <div className="absolute bottom-4 right-4 flex space-x-2">
                {carouselData.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      index === currentSlide
                        ? 'bg-white w-6'
                        : 'bg-white/50'
                    }`}
                  />
                ))}
              </div>

              {/* Effet de brillance lors du changement */}
              <div
                className={`absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 transition-transform duration-1000 ${
                  currentSlide % 2 === 0 ? 'translate-x-full' : '-translate-x-full'
                }`}
                style={{
                  animation: `shine 3s infinite ${currentSlide * 0.5}s`
                }}
              />
            </div>
          </div>

        </div>
      </div>

      {/* Styles pour l'animation de brillance */}
      <style jsx>{`
        @keyframes shine {
          0% { transform: translateX(-100%) skewX(-12deg); }
          20% { transform: translateX(100%) skewX(-12deg); }
          100% { transform: translateX(100%) skewX(-12deg); }
        }
      `}</style>
    </header>
  );
}
