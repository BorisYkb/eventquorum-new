'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface IntroductionProps {
  text: string;
  bgColor: string;
}

export default function Introduction({ text, bgColor }: IntroductionProps) {
  const introRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation for the introduction text
    gsap.fromTo(
      introRef.current,
      { opacity: 0, y: 20 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: introRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none'
        }
      }
    );

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className={`w-full ${bgColor} dark:bg-gray-800 pt-50 py-12 px-4 md:px-8 lg:px-16`}>
      <div className="max-w-6xl mx-auto">
        <p 
          ref={introRef}
          className="text-xl md:text-2xl lg:text-3xl text-gray-800 dark:text-white font-bold text-justify max-w-4xl mx-auto"
        >
          {text}
        </p>
      </div>
    </section>
  );
}