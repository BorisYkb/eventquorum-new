"use client";

import { useEffect, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import HeroSection from './Component/HeroSection';
import UpcomingEvents from './Component/UpcomingEvents';
import PastEvents from './Component/PastEvents';
import CallToAction from './Component/CallToAction';


export default function ExplorerPage() {
  // État pour s'assurer que le contenu est visible immédiatement
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    // Marquer que nous sommes côté client
    setIsClient(true);

    // Animation GSAP pour l'entrée des éléments - seulement après hydratation complète
    const ctx = gsap.context(() => {
      gsap.fromTo('.fade-in', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 0.8, ease: 'power3.out', delay: 0.2 }
      );
    });

    // Nettoyage du contexte GSAP
    return () => ctx.revert();
  }, []);

  return (
    <main className="min-h-screen bg-white dark:bg-gray-900 pb-20">
      <HeroSection />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 space-y-16 mt-10">
        {/* Assurez-vous que le contenu est visible immédiatement puis animé */}
        <section className={`fade-in ${isClient ? 'opacity-0' : 'opacity-100'}`}>
          <UpcomingEvents />
        </section>
        <section className={`fade-in ${isClient ? 'opacity-0' : 'opacity-100'}`}>
          <PastEvents />
        </section>
        <section className={`fade-in ${isClient ? 'opacity-0' : 'opacity-100'}`}>
          <CallToAction />
        </section>
      </div>
    </main>
  );
}