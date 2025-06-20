"use client";

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';
import Link from 'next/link';

interface MoreContentProps {
  isLoaded: boolean;
  data: {
    title: string;
    buttonLabel: string;
    items: {
      title: string;
      image: string;
    }[];
  };
}

export default function MoreContent({ isLoaded, data }: MoreContentProps) {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (isLoaded && sectionRef.current) {
      const items = sectionRef.current.querySelectorAll('.content-card');

      gsap.fromTo(
        items,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          stagger: 0.2,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
          },
        }
      );
    }
  }, [isLoaded]);

  return (
    <div ref={sectionRef} className="bg-white dark:bg-gray-900 py-16">
      <div className="container mx-auto px-6">
        <h2 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
          {data.title}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {data.items.map((item, index) => (
            <div key={index} className="block content-card">
              <div className="bg-white dark:bg-gray-800 rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105">
                <div className="relative h-48">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {item.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-8 text-center">
          <Link
            href="#"
            className="inline-block bg-amber-500 hover:bg-amber-600 text-white font-semibold py-2 px-4 rounded-lg transition"
          >
            {data.buttonLabel}
          </Link>
        </div>
      </div>
    </div>
  );
}
