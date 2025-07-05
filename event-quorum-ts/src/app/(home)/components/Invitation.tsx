import React, { useEffect, useRef } from 'react';

const InvitationSection = () => {
  // Références pour les animations GSAP
  const sectionRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const buttonsRef = useRef<HTMLDivElement | null>(null);
  const gsapRef = useRef<any>(null);

  useEffect(() => {
    // Chargement dynamique de GSAP
    const loadGSAP = async () => {
      try {
        const script = document.createElement('script');
        script.src = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.2/gsap.min.js';
        script.async = true;
        script.onload = () => {
          gsapRef.current = window.gsap;
          initAnimations();
        };
        document.body.appendChild(script);
      } catch (error) {
        console.error('Erreur lors du chargement de GSAP:', error);
      }
    };

    loadGSAP();
  }, []);

  const initAnimations = () => {
    if (!gsapRef.current) return;

    const gsap = gsapRef.current;

    // Animation d'entrée pour toute la section
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0 },
      { opacity: 1, duration: 1, ease: "power2.out" }
    );

    // Animation du titre avec un décalage
    gsap.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "back.out(1.7)" }
    );

    // Animation du sous-titre
    gsap.fromTo(
      subtitleRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.6, ease: "power3.out" }
    );

    // Animation des boutons
    if (buttonsRef.current) {
      gsap.fromTo(
        buttonsRef.current.children,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          delay: 0.9,
          stagger: 0.2,
          ease: "power2.out"
        }
      );
    }
  };

  // Animation au survol des boutons
  const handleButtonHover = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isEntering: boolean
  ) => {
    if (!gsapRef.current) return;

    gsapRef.current.to(e.currentTarget, {
      scale: isEntering ? 1.05 : 1,
      boxShadow: isEntering ? "0 10px 25px rgba(0, 0, 0, 0.2)" : "0 4px 6px rgba(0, 0, 0, 0.1)",
      duration: 0.3,
      ease: "power2.out"
    });
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 py-20 px-6 text-white overflow-hidden"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold mb-6"
        >
          Créez des moments inoubliables
        </h2>

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto font-light"
        >
          Nous transformons vos idées en événements exceptionnels qui dépassent toutes les attentes.
        </p>

        <div
          ref={buttonsRef}
          className="flex flex-col md:flex-row justify-center gap-6"
        >


          <a href="#Footer" className="inline-block transition-all">
            <button
              className="bg-white border-2 cursor-pointer  py-4 px-8 rounded-lg font-bold text-lg shadow-lg transition-all transform hover:translate-y-1"
              onMouseEnter={(e) => handleButtonHover(e, true)}
              onMouseLeave={(e) => handleButtonHover(e, false)}
            >
              Nous contacter
            </button>
          </a>
        </div>
      </div>
    </section>
  );
};

export default InvitationSection;
