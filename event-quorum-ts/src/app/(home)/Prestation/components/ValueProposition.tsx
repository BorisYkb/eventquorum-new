"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ValuePropositionData {
  title: string;
}

interface ValuePropositionProps {
  isLoaded: boolean;
  data: ValuePropositionData;
}

export default function ValueProposition({ isLoaded, data }: ValuePropositionProps) {
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
    <div ref={sectionRef} className="dark:bg-gray-900 bg-gray-100 text-gray-900 dark:text-white py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6">
          {data.title}
        </h2>
      </div>
    </div>
  );
}