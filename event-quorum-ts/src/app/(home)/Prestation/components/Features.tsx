"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

// Définition du type pour chaque fonctionnalité
interface Feature {
  id: number;
  title: string;
  description: string;
  secondaryText?: string;
  tertiaryText?: string;
  imageSrc: string;
}

// Interface pour les données du composant
interface FeaturesData {
  items: Feature[];
}

// Props du composant
interface FeaturesProps {
  isLoaded: boolean;
  data: FeaturesData;
}

export default function Features({ isLoaded, data }: FeaturesProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (isLoaded && sectionRef.current) {
      const featureItems = sectionRef.current.querySelectorAll('.feature-item');
      
      gsap.fromTo(featureItems, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
          stagger: 0.3, 
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
    <div ref={sectionRef} className=" bg-gray-100 dark:bg-gray-900 dark:text-white text-gray-900 py-10 pb-18">
      <div className="container mx-auto px-6">
        <div className="space-y-24">
          {data.items.map((feature, index) => (
            <div key={feature.id} className="feature-item flex flex-col md:flex-row md:items-center gap-8">
              {index % 2 === 0 ? (
                <>
                  <div className="md:w-1/2">
                    <div className="relative">
                      <div className="absolute -left-3 -top-3 w-20 h-20 bg-amber-500 rounded-full opacity-20"></div>
                      <Image 
                        src={feature.imageSrc} 
                        alt={feature.title} 
                        width={540} 
                        height={360} 
                        className="rounded-lg relative z-10 shadow-xl border-4 border-gray-800" 
                      />
                      <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-amber-500 rounded-full opacity-20"></div>
                    </div>
                  </div>
                  <div className="md:w-1/2 space-y-4">
                    <h3 className="text-2xl font-bold dark:text-amber-400 text-amber-600">{feature.title}</h3>
                    <p className="dark:text-gray-300 text-gray-800 ">{feature.description}</p>
                    {feature.secondaryText && <p className="dark:text-gray-400 text-gray-900 ">{feature.secondaryText}</p>}
                    {feature.tertiaryText && <p className="dark:text-gray-400 text-gray-900 ">{feature.tertiaryText}</p>}
                  </div>
                </>
              ) : (
                <>
                  <div className="md:w-1/2 space-y-4">
                    <h3 className="text-2xl font-bold dark:text-amber-400 text-amber-600">{feature.title}</h3>
                    <p className="dark:text-gray-300 text-gray-800">{feature.description}</p>
                    {feature.secondaryText && <p className="dark:text-gray-400 text-gray-900">{feature.secondaryText}</p>}
                    {feature.tertiaryText && <p className="dark:text-gray-400 text-gray-900">{feature.tertiaryText}</p>}
                  </div>
                  <div className="md:w-1/2">
                    <div className="relative">
                      <div className="absolute -left-3 -top-3 w-20 h-20 bg-amber-500 rounded-full opacity-20"></div>
                      <Image 
                        src={feature.imageSrc} 
                        alt={feature.title} 
                        width={540} 
                        height={360} 
                        className="rounded-lg relative z-10 shadow-xl border-4 border-gray-800" 
                      />
                      <div className="absolute -right-3 -bottom-3 w-16 h-16 bg-amber-500 rounded-full opacity-20"></div>
                    </div>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}