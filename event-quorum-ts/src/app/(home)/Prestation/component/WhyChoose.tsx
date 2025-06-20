'use client';

import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Users, Calendar, ChartBar, Rocket, Trophy, Camera, Share, 
  CheckCircle, Shield, FileText, Star, Music, PartyPopper,
  Vote, FileOutput, MessageSquare, CalendarCheck, Gamepad2, Camera as CameraPolaroid
} from 'lucide-react';

interface WhyChooseItem {
  icon: string[];
  title: string;
  description: string;
}

interface WhyChooseProps {
  title: string;
  items: WhyChooseItem[];
  bgColor: string;
}

// Map of icon names to Lucide components
const iconMap: Record<string, React.ElementType> = {
  'users': Users,
  'calendar': Calendar,
  'chart': ChartBar,
  'rocket': Rocket,
  'trophy': Trophy,
  'camera': Camera,
  'chart-bar': ChartBar,
  'share': Share,
  'check-circle': CheckCircle,
  'shield': Shield,
  'users-group': Users,
  'document': FileText,
  'star': Star,
  'music': Music,
  'partyPopper': PartyPopper,
  'vote-yesno': Vote,
  'document-share': FileOutput,
  'chat-question': MessageSquare,
  'calendar-event': CalendarCheck,
  'game': Gamepad2,
  'camera-polaroid': CameraPolaroid
};

export default function WhyChoose({ title, items, bgColor }: WhyChooseProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const itemRefs = useRef<(HTMLDivElement | null)[]>([]);

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
    itemRefs.current.forEach((item, index) => {
      if (item) {
        gsap.fromTo(
          item,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            delay: 0.1 * index,
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

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, [items.length]);

  const renderIcon = (icon: string[]) => {
    const Icon = iconMap[icon[0]] || Users;
    return <Icon className={`h-8 w-8 ${icon[1]} mb-3`} />;
  };

  return (
    <section 
      ref={sectionRef}
      className={`w-full ${bgColor} dark:bg-gray-800 py-12 px-4 md:px-8 lg:px-16`}
    >
      <div className="max-w-6xl mx-auto">
        <h2 
          ref={titleRef}
          className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-12 text-center"
        >
          {title}
        </h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {items.map((item, index) => (
            <div 
              key={index}
              ref={el => { itemRefs.current[index] = el; }}
              className="bg-white dark:bg-gray-700 rounded-lg shadow p-6 text-center hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-center">
                {renderIcon(item.icon)}
              </div>
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {item.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}