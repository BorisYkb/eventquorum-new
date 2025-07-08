'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import {
  Calendar, MessageSquare, Network, Award, Vote, Radio, FileText, FileOutput, CalendarCheck, Gamepad2, Camera
} from 'lucide-react';

interface FunctionalityItem {
  icon: string[];
  title: string;
  link: string;
}

interface FunctionalitiesSectionProps {
  title: string;
  items: FunctionalityItem[];
}

// Map of icon names to Lucide components
const iconMap: Record<string, React.ElementType> = {
  'rendez-vous': Calendar,
  'presentation': Calendar,
  'message': MessageSquare,
  'network': Network,
  'networking': Network,
  'award': Award,
  'vote': Vote,
  'stream': Radio,
  'document': FileText,
  'document-share': FileOutput,
  'chat-question': MessageSquare,
  'calendar-event': CalendarCheck,
  'game': Gamepad2,
  'camera-polaroid': Camera
};

export default function FunctionalitiesSection({ title, items }: FunctionalitiesSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemsRef = useRef<(HTMLAnchorElement | null)[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);

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
            start: 'top 85%',
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
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: 0.15 * index,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              toggleActions: 'play none none none'
            }
          }
        );
      }
    });

    // Animation for the button
    if (buttonRef.current) {
      gsap.fromTo(
        buttonRef.current,
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          delay: 0.3,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: buttonRef.current,
            start: 'top 95%',
            toggleActions: 'play none none none'
          }
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [items.length]);

  const renderIcon = (icon: string[]) => {
    const Icon = iconMap[icon[0]] || Calendar;
    return <Icon className={`h-6 w-6 ${icon[1]}`} />;
  };

  return (
    <section
      ref={sectionRef}
      className="w-full bg-gray-50 dark:bg-gray-900 py-16 px-4 md:px-8 lg:px-16"
    >
      <div className="max-w-6xl mx-auto">
        <h2
          ref={titleRef}
          className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center"
        >
          {title}
        </h2>

        <div className="flex flex-wrap justify-center gap-10 mb-12">
          {items.map((item, index) => (
            <a
              href={item.link}
              key={index}
              ref={el => { itemsRef.current[index] = el; }}
              className="flex flex-col items-center hover:bg-gray-200 dark:hover:bg-gray-800 p-5 transition"
            >
              <div className="bg-white dark:bg-gray-700 rounded-full p-4 shadow-md mb-3">
                {renderIcon(item.icon)}
              </div>
              <span className="text-gray-700  dark:text-gray-200 font-medium">
                {item.title}
              </span>
            </a>
          ))}
        </div>

        <div className="text-center">
          <button
            ref={buttonRef}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-full transition-colors cursor-pointer border-none duration-300 shadow-md"
          >
            En savoir plus sur nos fonctionnalités
          </button>
        </div>
      </div>
    </section>
  );
}
