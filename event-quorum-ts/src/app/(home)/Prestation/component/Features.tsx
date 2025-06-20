'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface FeaturesProps {
  title?: string;
  items: string[];
  bgColor: string;
}

export default function Features({ title, items, bgColor }: FeaturesProps) {
  const featuresRef = useRef<HTMLDivElement>(null);
  const itemsRef = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation for the container
    if (featuresRef.current) {
      gsap.fromTo(
        featuresRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          duration: 0.5,
          ease: 'power1.out',
          scrollTrigger: {
            trigger: featuresRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    // Animation for each item
    itemsRef.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { opacity: 0, x: -20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.5,
            delay: 0.1 * index,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [items.length]);

  return (
    <section className={`w-full ${bgColor} dark:bg-gray-800 py-12 px-4 md:px-8 lg:px-16`}>
      <div className="max-w-6xl mx-auto">
        <div 
          ref={featuresRef}
          className="bg-white dark:bg-gray-700 rounded-lg shadow-md p-6 md:p-8"
        >
          {title && (
            <h2 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-white mb-6">
              {title}
            </h2>
          )}
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {items.map((item, index) => (
              <li 
                key={index}
                ref={el => { itemsRef.current[index] = el; }}
                className="flex items-start"
              >
                <span className="text-green-500 dark:text-green-400 mr-3 mt-1">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </span>
                <span className="text-gray-700 dark:text-gray-200">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}