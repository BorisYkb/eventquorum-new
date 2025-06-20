'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

type MoreContentProps = {
  title: string;
  buttonLabel: string;
  items: { title: string; image: string }[];
};

export default function MoreContent({ title, buttonLabel, items }: MoreContentProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (titleRef.current) {
      gsap.fromTo(titleRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: titleRef.current, start: 'top 85%' }
      });
    }

    cardsRef.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(card, { opacity: 0, y: 30 }, {
          opacity: 1, y: 0, duration: 0.6, delay: 0.15 * index, ease: 'power2.out',
          scrollTrigger: { trigger: card, start: 'top 90%' }
        });
      }
    });

    if (buttonRef.current) {
      gsap.fromTo(buttonRef.current, { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.6, delay: 0.3, ease: 'power2.out',
        scrollTrigger: { trigger: buttonRef.current, start: 'top 95%' }
      });
    }

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <section ref={sectionRef} className="w-full bg-white dark:bg-black py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 ref={titleRef} className="text-2xl md:text-3xl font-bold dark:text-white text-gray-900 mb-12 text-center">
          {title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {items.map((content, index) => (
            <div
              key={index}
              ref={el => { cardsRef.current[index] = el; }}
              className="bg-white dark:bg-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              <div className="relative h-48">
                <Image src={content.image} alt={content.title} fill style={{ objectFit: 'cover' }} />
              </div>
              <div className="p-5">
                <h3 className="text-lg font-semibold dark:text-white text-gray-900 mb-3">
                  {content.title}
                </h3>
                <div className="flex justify-end">
                  <span className="text-blue-600 hover:text-blue-400 transition-colors duration-300 flex items-center text-sm">
                    En savoir plus
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            ref={buttonRef}
            className="bg-transparent hover:bg-blue-600 text-blue-600 hover:text-white font-medium py-2 px-6 border border-blue-400 hover:border-transparent rounded-full transition-colors duration-300"
          >
            {buttonLabel}
          </button>
        </div>
      </div>
    </section>
  );
}
