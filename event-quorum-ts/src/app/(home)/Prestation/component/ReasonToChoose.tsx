'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface ReasonBlock {
  title: string;
  content: string;
  image: string;
  bgColor: string;
}

interface ReasonToChooseProps {
  title: string;
  blocks: ReasonBlock[];
}

export default function ReasonToChoose({ title, blocks }: ReasonToChooseProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const blockRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    
    // Animation for the title
    if (titleRef.current) {
      gsap.fromTo(
        titleRef.current,
        { opacity: 0, y: 20 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
            toggleActions: 'play none none none'
          }
        }
      );
    }
    
    // Animation for each block
    blockRefs.current.forEach((block, index) => {
      if (block) {
        gsap.fromTo(
          block,
          { opacity: 0, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            delay: 0.2 * index,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: block,
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
  }, [blocks.length]);

  return (
    <section className="w-full bg-white dark:bg-gray-900 py-16 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center"
        >
          {title}
        </h2>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {blocks.map((block, index) => (
            <div 
              key={index}
              ref={el => { blockRefs.current[index] = el; }}
              className={`${block.bgColor} dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden`}
            >
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800 dark:text-white mb-4">
                  {block.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                  {block.content}
                </p>
              </div>
              <div className="relative h-64 w-full">
                <Image 
                  src={block.image} 
                  alt={block.title}
                  fill
                  style={{ objectFit: 'cover' }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}