// Functionalities.tsx
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


interface Functionalities {
  id: number;
  title: string;
  description: string;
  icon: {
    className: string;
    path: string;
  };
  link: string;
}

// Interface pour les données du composant
interface FunctionalitiesData {
  items: Functionalities[];
}



interface FunctionalitiesProps {
  isLoaded: boolean;
  data: FunctionalitiesData;
}

export default function Functionalities({ isLoaded, data }: FunctionalitiesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (isLoaded && sectionRef.current) {
      const elements = sectionRef.current.querySelectorAll('.functionality-item');

      gsap.fromTo(elements,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, [isLoaded]);


  return (
    <div ref={sectionRef} className="bg-white dark:bg-gray-800 py-20">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-16">
          Découvrez nos fonctionnalités pour vos conférences ou colloques
        </h2>

        <div id='fonctionnalite' className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data.items.map((functionalitie) => (
            <a href={functionalitie.link} key={functionalitie.id} className="functionality-item dark:hover:bg-gray-700 hover:bg-gray-200 p-4 transform transition-all flex flex-col items-center text-center">
              <div className="bg-gray-100 p-4 rounded-full mb-4">
                <svg
                  className={functionalitie.icon.className}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"// <- couleur dynamique ici
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d={functionalitie.icon.path}
                  />
                </svg>

              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{functionalitie.title}</h3>
              <p className="text-gray-400">{functionalitie.description}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}