"use client";

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';

export default function HeroSection() {
    const titleRef = useRef<HTMLDivElement>(null);
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);

        if (titleRef.current) {
            const tl = gsap.timeline();

            tl.fromTo(
                ".title-part-1",
                { opacity: 0, y: 30 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" }
            );

            tl.fromTo(
                ".title-part-2",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1.2, ease: "power3.out" },
                "-=0.8"
            );

            tl.fromTo(
                ".subtitle",
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 1, ease: "power3.out" },
                "-=0.8"
            );
        }
    }, []);

    return (
        <div className="bg-gray-100 dark:bg-gray-700 py-16 sm:py-20 md:py-24 lg:py-32">
            <div ref={titleRef} className="container mx-auto px-4 text-center">
                <div className="max-w-5xl mx-auto">
                    {/* Titre */}
                    <h1 className="text-center">
                        <span
                            className={`title-part-2 flex flex-col sm:flex-row justify-center items-center font-bold tracking-tight text-gray-900 dark:text-white ${!isClient ? 'opacity-100' : 'opacity-0'
                                }`}
                        >
                            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl mb-4 sm:mb-0">
                                Nos
                            </span>
                            <span className="ml-0 sm:ml-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl bg-gradient-to-r from-green-600 via-yellow-500 to-yellow-400 text-transparent bg-clip-text">
                                événements
                            </span>
                        </span>
                    </h1>

                    {/* Sous-titre */}
                    <div
                        className={`subtitle mt-8 md:mt-12 mx-auto max-w-3xl ${!isClient ? 'opacity-100' : 'opacity-0'
                            }`}
                    >
                        <p className="text-lg sm:text-xl md:text-2xl text-gray-700 dark:text-gray-300 font-medium leading-relaxed">
                            <span className="font-bold">
                                Chez EventQuorum, les événements nous font vibrer peu importe leurs formats.
                            </span>{" "}
                            Rencontrons-nous et faisons connaissance sur des événements auxquels nous participons à travers la Côte d'Ivoire.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
