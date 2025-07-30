'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface HeaderfaqProps {
  isLoaded: boolean;
}

export default function Headerfaq({ isLoaded }: HeaderfaqProps) {
  const headerRef = useRef(null);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(headerRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out',
      });
    }
  }, [isLoaded]);

  return (
    <div>
      <header
        ref={headerRef}
        className="relative h-96 flex items-center justify-center overflow-hidden bg-indigo-900"
      >
        <div className="absolute inset-0 opacity-70">
          <Image
            src="/question.jpg"
            alt="Image d'équipe"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl font-bold text-white mb-4">FAQ EventQuorum</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Découvrez tout ce que vous devez savoir sur EventQuorum, la plateforme qui révolutionne la gestion d'événements
          </p>
        </div>
      </header>
    </div>
  );
}
