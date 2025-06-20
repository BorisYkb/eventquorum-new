"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import Link from 'next/link';

export default function CallToAction() {
  const ctaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (ctaRef.current) {
      gsap.fromTo(
        ctaRef.current.querySelector('.cta-icon'),
        { y: 5 },
        { y: -5, duration: 1.5, repeat: -1, yoyo: true, ease: "sine.inOut" }
      );
    }
  }, []);

  return (
    <div
      ref={ctaRef}
      className="bg-gradient-to-r from-purple-500 via-amber-400 to-orange-500 dark:from-purple-800 dark:via-amber-700 dark:to-orange-800 rounded-xl overflow-hidden shadow-2xl p-0.5 mt-12"
    >
      <div className="bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm rounded-lg p-5 sm:p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 md:gap-8">
          {/* Left content */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            <div className="hidden md:block cta-icon">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 md:h-12 md:w-12 text-amber-500 dark:text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>

            <div className="text-center md:text-left">
              <h2 className="text-lg sm:text-xl md:text-3xl font-bold text-gray-900 dark:text-white">
                N'attendez pas le prochain événement pour nous contacter !
              </h2>
              <p className="mt-1 sm:mt-2 text-sm sm:text-base text-gray-600 dark:text-gray-300">
                Discutons dès maintenant de vos besoins et de comment nous pouvons vous aider
              </p>
            </div>
          </div>

          {/* Button */}
          <div className="w-full md:w-auto flex justify-center md:justify-end">
            <Link href="/DemoRequest">
              <span className="group relative inline-flex items-center justify-center px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-purple-600 to-amber-500 hover:from-purple-700 hover:to-amber-600 dark:from-purple-700 dark:to-amber-600 dark:hover:from-purple-800 dark:hover:to-amber-700 text-white text-sm sm:text-base font-medium rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
                <span className="mr-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
