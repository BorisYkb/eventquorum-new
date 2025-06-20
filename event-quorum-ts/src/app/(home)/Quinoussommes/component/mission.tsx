'use client';

import { useEffect, useRef } from 'react';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface MissionProps {
  isLoaded: boolean;
}

export default function Mission({ isLoaded }: MissionProps) {
  const missionRef = useRef(null);
  const imageRef = useRef(null);
  const textRef = useRef(null);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      // Animation d'apparition générale
      gsap.from(missionRef.current, {
        opacity: 0,
        y: 30,
        stagger: 0.2,
        duration: 0.8,
        ease: 'power2.out',
      });

      // Timeline avec ScrollTrigger
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: imageRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      });

      tl.fromTo(
        imageRef.current,
        { x: 60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 }
      ).fromTo(
        textRef.current,
        { x: -60, opacity: 0 },
        { x: 0, opacity: 1, duration: 0.8 },
        '-=0.4'
      );
    }
  }, [isLoaded]);

  return (
    <div>
      {/* Notre Mission */}
      <section ref={missionRef} className="mb-24">
        <div className="animate-item text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre mission</h2>
          <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
        </div>
        <div className="animate-item md:flex items-center gap-10">
          <div ref={imageRef} className="md:w-1/2 mb-8 md:mb-0">
            <Image
              src="/even6.jpg"
              alt="Notre mission"
              width={600}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
          <div ref={textRef} className="md:w-1/2">
            <p className="text-lg text-gray-700 mb-4">
              Notre mission est d'aider les entreprises à prospérer dans l'ère numérique en créant des solutions web innovantes et performantes qui répondent aux besoins spécifiques de chaque client.
            </p>
            <p className="text-lg text-gray-700">
              Nous combinons expertise technique, créativité et compréhension approfondie des besoins commerciaux pour offrir des expériences numériques qui dépassent les attentes et génèrent des résultats concrets.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
