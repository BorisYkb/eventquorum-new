"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Interface pour les données du composant
interface SupportData {
  title: string;
  paragraphs: string[];
}

// Props du composant
interface SupportProps {
  isLoaded: boolean;
  data: SupportData;
}

export default function Support({ isLoaded, data }: SupportProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    if (isLoaded && sectionRef.current) {
      gsap.fromTo(sectionRef.current, 
        { opacity: 0, y: 30 },
        { 
          opacity: 1, 
          y: 0, 
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
    <div ref={sectionRef} className="bg-green-100 dark:bg-gray-900 dark:text-white py-16">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">{data.title}</h2>
          
          {data.paragraphs.map((paragraph, index) => (
            <p 
              key={index} 
              className={`dark:text-gray-300 text-gray-700 ${index < data.paragraphs.length - 1 ? 'mb-4' : 'mb-8'}`}
            >
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}