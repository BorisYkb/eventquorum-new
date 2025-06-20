'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PartyPopper, Rocket, Star } from 'lucide-react';

export default function CallToAction() {
  const ctaRef = useRef(null);
  const contentRef = useRef(null);
  const buttonRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: ctaRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: contentRef.current,
            start: 'top 85%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, scale: 0.9 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          delay: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top 90%',
            toggleActions: 'play none none none',
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <section
      ref={ctaRef}
      className="relative overflow-hidden bg-gradient-to-r from-green-400 to-indigo-400 text-white rounded-3xl shadow-2xl p-8 my-10 mx-auto max-w-6xl"
    >
      {/* Icônes décoratives */}
      <PartyPopper className="absolute top-5 left-5 w-10 h-10 opacity-20" />
      <Rocket className="absolute bottom-5 right-5 w-12 h-12 opacity-20" />
      <Star className="absolute top-1/2 left-1/2 w-16 h-16 opacity-10 -translate-x-1/2 -translate-y-1/2" />

      {/* Contenu */}
      <div ref={contentRef} className="flex flex-col items-center text-center space-y-6">
        <h2 className="text-4xl font-extrabold flex items-center gap-3">
          🚀 Prêt à organiser votre prochain événement ?
        </h2>

        <p className="text-lg max-w-2xl">
          Nos experts sont à votre disposition pour créer un événement sur mesure qui répondra à tous vos objectifs.
        </p>

        <a
          ref={buttonRef}
          href='\DemoRequest'
          className="mt-6 bg-white text-indigo-600 font-semibold py-3 px-6 rounded-full hover:bg-gray-100 transition-all duration-300 shadow-lg"
        >
          Demander une démo
        </a>
      </div>
    </section>
  );
}
