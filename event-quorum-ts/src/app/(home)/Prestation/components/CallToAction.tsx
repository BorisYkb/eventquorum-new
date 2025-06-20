// app/conference/components/CallToAction.tsx
"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Link from 'next/link';

interface CallToActionProps {
  isLoaded: boolean;
}

export default function CallToAction({ isLoaded }: CallToActionProps) {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (isLoaded && ctaRef.current) {
      gsap.fromTo(ctaRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: ctaRef.current,
            start: "top 80%",
          }
        }
      );
    }
  }, [isLoaded]);

  return (
    <div
      ref={ctaRef}
      className="bg-gradient-to-r from-purple-500 via-amber-400 to-orange-500 dark:from-purple-800 dark:via-amber-700 dark:to-orange-800 rounded-xl overflow-hidden shadow-2xl p-0.5"
    >
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-8 md:p-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex space-x-4 items-center">
            <div className="hidden md:block cta-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-amber-500 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
                N'attendez pas le prochain événement pour nous contacter !
              </h2>
              <p className="mt-2 text-gray-600 dark:text-gray-300">
                Discutons dès maintenant de vos besoins et de comment nous pouvons vous aider
              </p>
            </div>
          </div>

          <div className="flex-shrink-0">
            <Link href="/DemoRequest">
              <span className="group relative inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 dark:from-purple-700 dark:to-amber-600 dark:hover:from-purple-800 dark:hover:to-amber-700 text-white font-medium rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </span>
                Votre démo personnalisée
              </span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}