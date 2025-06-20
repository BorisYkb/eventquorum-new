// components/ScrollToTop.tsx
"use client";

import { useEffect, useState, useRef } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import { gsap } from 'gsap';

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef(null);

  // Gestion de la visibilité du bouton
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Animation d'apparition/disparition
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.to(buttonRef.current, {
        opacity: isVisible ? 1 : 0,
        y: isVisible ? 0 : 20,
        duration: 0.3,
        ease: "power2.out",
        pointerEvents: isVisible ? 'auto' : 'none'
      });
    }
  }, [isVisible]);

  // Fonction pour remonter en haut
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <button
      ref={buttonRef}
      onClick={scrollToTop}
      aria-label="Retour en haut de la page"
      className="fixed cursor-pointer bottom-6 right-6 z-50 p-3 rounded-full shadow-lg bg-gradient-to-br from-blue-600 to-blue-500 text-white hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      style={{ opacity: 0 }} // Initialement invisible
    >
      <FaArrowUp className="w-5 h-5" />
      <span className="sr-only">Retour en haut</span>
    </button>
  );
}