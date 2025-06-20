'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface HistoireProps {
  isLoaded: boolean;
}

export default function Histoire({ isLoaded }: HistoireProps) {
  const historyRef = useRef(null);
  const titreRef = useRef(null);
  const ligneRef = useRef(null);

  useEffect(() => {
    if (isLoaded && typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);

      gsap.from(historyRef.current, {
        opacity: 0,
        y: 50,
        duration: 1,
        ease: 'power3.out',
      });

      gsap.fromTo(
        titreRef.current,
        { opacity: 0, y: -40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titreRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        ligneRef.current,
        { scaleY: 0, opacity: 0 },
        {
          scaleY: 1,
          opacity: 1,
          transformOrigin: 'top',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: ligneRef.current,
            start: 'top 85%',
          },
        }
      );
    }
  }, [isLoaded]);

  const events = [
    {
      date: '2018',
      description:
        "Fondation de l'entreprise avec une équipe de passionnés du web.",
    },
    {
      date: '2020',
      description: "Expansion de l'équipe et ouverture de nouveaux bureaux.",
    },
    {
      date: '2022',
      description:
        "Lancement de notre service mobile et récompense pour l'innovation.",
    },
    {
      date: "Aujourd'hui",
      description:
        "Une équipe de professionnels au service de toute la Côte d'Ivoire.",
    },
  ];

  return (
    <section ref={historyRef} className="py-16 px-4 sm:px-8 md:px-16 lg:px-24 bg-white">
      <div ref={titreRef} className="text-center mb-14">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-3">
          Notre histoire
        </h2>
        <p className="text-gray-500 max-w-xl mx-auto">
          Un parcours marqué par l’innovation, la passion et la croissance.
        </p>
        <div className="w-24 h-1 bg-indigo-600 mx-auto mt-4"></div>
      </div>

      <div className="relative">
        {/* Ligne verticale */}
        <div
          ref={ligneRef}
          className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-indigo-200 transform -translate-x-1/2"
        ></div>

        <div className="space-y-16">
          {events.map((event, index) => (
            <div
              key={index}
              className={`flex flex-col md:flex-row items-center ${
                index % 2 !== 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Texte */}
              <div className="md:w-1/2 p-6">
                <div
                  className={`${
                    index % 2 !== 0 ? 'md:text-left' : 'md:text-right'
                  } text-center md:text-inherit`}
                >
                  <h3 className="text-2xl font-semibold text-indigo-700 mb-2">
                    {event.date}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {event.description}
                  </p>
                </div>
              </div>

              {/* Point central */}
              <div className="hidden md:flex justify-center items-center w-8 h-8 bg-indigo-600 rounded-full border-4 border-white shadow-md z-10"></div>

              {/* Espacement symétrique */}
              <div className="md:w-1/2 p-6 hidden md:block"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
