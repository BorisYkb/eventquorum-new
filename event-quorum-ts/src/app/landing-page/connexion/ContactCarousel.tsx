// ContactCarousel.jsx - Composant carrousel pour remplacer l'image statique
"use client";

import { useEffect, useState, useRef } from 'react';
import '/public/assets/landing-page/css/ContactCarousel.css'; // Importer le fichier CSS

export default function ContactCarousel() {
  const [isVisible, setIsVisible] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Données du carrousel - mêmes que Hero() mais adaptées pour Contact
  const carouselData = [
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
    // Animation d'entrée au chargement avec délai
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 200);

    return () => clearTimeout(timer);
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

  // Fonction pour changer de slide manuellement
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    // Redémarrer le timer automatique
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % carouselData.length);
      }, 3000);
    }
  };

  return (
    <div className={`contact-carousel-wrapper carousel-enter ${isVisible ? 'visible' : ''}`}>
      <div className="contact-carousel-container image-anime">
        
        {/* Conteneur du carrousel */}
        <div className="carousel-wrapper">
          {carouselData.map((item, index) => (
            <div
              key={item.id}
              className={`carousel-slide ${
                index === currentSlide ? 'active' : ''
              }`}
            >
              <img
                src={item.coverUrl}
                alt={item.title}
                loading={index === 0 ? "eager" : "lazy"}
                className="loaded"
              />

              {/* Overlay avec informations */}
              <div className="carousel-overlay">
                <div className="carousel-content">
                  <h3 className="carousel-title">
                    {item.title}
                  </h3>
                  <p className="carousel-description">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Indicateurs de slides */}
        <div className="carousel-indicators">
          {carouselData.map((_, index) => (
            <div
              key={index}
              className={`carousel-indicator ${
                index === currentSlide ? 'active' : ''
              }`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>

        {/* Effet de brillance lors du changement */}
        <div
          className={`carousel-shine ${
            currentSlide % 2 === 0 ? 'animate' : ''
          }`}
        />
      </div>
    </div>
  );
}

// ===== VERSION SIMPLIFIÉE SANS STATE (si vous préférez) =====

export function SimpleContactCarousel() {
  return (
    <div className="contact-carousel-wrapper">
      <div className="contact-carousel-container image-anime">
        <div className="carousel-wrapper">
          <div className="carousel-slide active">
            <img
              src="/assets/landing-page/img/all-images/contact/contact-img4.png"
              alt="Événement EventQuorum"
              className="loaded"
            />
            <div className="carousel-overlay">
              <div className="carousel-content">
                <h3 className="carousel-title">
                  Rejoignez EventQuorum
                </h3>
                <p className="carousel-description">
                  La plateforme de gestion d'événements nouvelle génération
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}