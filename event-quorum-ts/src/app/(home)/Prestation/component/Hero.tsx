'use client';

import Image from 'next/image';
import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

interface HeroProps {
    title: string;
    bgColor: string;
    image: string;
    breadcrumb: string;
}

export default function Hero({ title, bgColor, image, breadcrumb }: HeroProps) {
    const titleRef = useRef<HTMLHeadingElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);

        // Animation for the title
        gsap.fromTo(
            titleRef.current,
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' }
        );

        // Animation for the image
        gsap.fromTo(
            imageRef.current,
            { opacity: 0, scale: 0.95 },
            { opacity: 1, scale: 1, duration: 1, delay: 0.2, ease: 'power2.out' }
        );

        return () => {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
        };
    }, []);

    return (
        <section className={`w-full ${bgColor} dark:bg-gray-900 py-14 px-4 md:px-8 lg:px-16`}>
            <div className="max-w-6xl mx-auto space-y-6 mt-20">
                <p className="text-amber-700 dark:text-amber-400 uppercase font-semibold tracking-wider animate-item">
                    {breadcrumb}
                </p>
                <h1
                    ref={titleRef}
                    className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 dark:text-amber-100 mb-12 max-w-2xl"
                >
                    {title}
                </h1>
                <div
                    ref={imageRef}
                    className="w-full rounded-lg overflow-hidden shadow-xl relative h-64 md:h-80 -mb-50 lg:h-96"
                >
                    <Image
                        src={image}
                        alt="Événement"
                        fill
                        style={{ objectFit: 'cover' }}
                        priority
                    />
                </div>
            </div>
        </section>
    );
}