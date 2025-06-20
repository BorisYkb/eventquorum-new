'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

interface ValeursProps {
    isLoaded: boolean;
}

export default function Valeurs({ isLoaded }: ValeursProps) {
    const valuesRef = useRef(null);
    const titreRef = useRef(null);
    const valeurRef = useRef(null);

    useEffect(() => {
        if (isLoaded && typeof window !== 'undefined') {
            gsap.registerPlugin(ScrollTrigger);

            // Animation du bloc complet
            gsap.from(valuesRef.current, {
                opacity: 0,
                y: 30,
                stagger: 0.2,
                duration: 0.8,
                ease: 'power2.out',
            });

            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: valuesRef.current,
                    start: 'top 80%',
                    toggleActions: 'play none none none',
                },
            });

            tl.fromTo(
                titreRef.current,
                { x: -60, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8 }
            ).fromTo(
                valeurRef.current,
                { x: 60, opacity: 0 },
                { x: 0, opacity: 1, duration: 0.8 },
                '-=0.4'
            );
        }
    }, [isLoaded]);

    const values = [
        {
            title: 'Innovation',
            description:
                'Nous repoussons constamment les limites de la créativité et de la technologie.',
        },
        {
            title: 'Qualité',
            description:
                "Nous nous engageons à fournir un travail d'excellence dans chaque projet.",
        },
        {
            title: 'Collaboration',
            description:
                "Nous croyons en la force du travail d'équipe et de la communication transparente.",
        },
        {
            title: 'Intégrité',
            description:
                'Nous agissons avec honnêteté et respectons nos engagements.',
        },
    ];

    return (
        <div>
            {/* Nos Valeurs */}
            <section ref={valuesRef} className="mb-24">
                <div ref={titreRef} className="animate-item text-center mb-10">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos valeurs</h2>
                    <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
                </div>
                <div
                    ref={valeurRef}
                    className="grid md:grid-cols-2 gap-8"
                >
                    {values.map((value, index) => (
                        <div
                            key={index}
                            className="animate-item bg-white p-6 rounded-lg shadow-md flex items-start"
                        >
                            <div className="bg-indigo-100 p-3 rounded-full mr-4">
                                <div className="w-8 h-8 flex items-center justify-center text-indigo-600 font-bold">
                                    {index + 1}
                                </div>
                            </div>
                            <div>
                                <h3 className="text-xl font-semibold text-gray-800 mb-2">
                                    {value.title}
                                </h3>
                                <p className="text-gray-600">{value.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
}
