'use client';

import { useEffect, useRef } from 'react';
import { Briefcase, Rocket, Gem, Cake, Palette, HandHeart, Trophy, Crown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const categories = [
    { icon: <Briefcase size={28} />, title: 'Événements d’entreprise', students: 'Séminaires, team building, lancements de produit, cocktails, remises de prix, etc.' },
    { icon: <Gem size={28} />, title: 'Mariages & Fiançailles', students: 'Organisation complète de mariages traditionnels, civils et religieux, la logistique et la coordination le jour J.' },
    { icon: <Palette size={28} />, title: 'Événements culturels & artistiques', students: 'Organisation de festivals, expositions, spectacles, ou soirées thématiques valorisant la culture ivoirienne.' },
    { icon: <HandHeart size={28} />, title: 'Événements caritatifs', students: 'Collectes de fonds, événements associatifs, campagnes de sensibilisation.' },
    { icon: <Trophy size={28} />, title: 'Événements sportifs', students: 'Trophées d’entreprise, mini-tournois, randonnées organisées, etc.' },
    { icon: <Crown size={28} />, title: 'Événements VIP & luxe', students: 'Réceptions haut de gamme, soirées privées exclusives, mariages premium.' },
];

export default function FeaturedCategories() {
    const sectionRef = useRef(null);

    useEffect(() => {
        gsap.registerPlugin(ScrollTrigger);
        if (sectionRef.current) {
            gsap.fromTo(
                sectionRef.current,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: sectionRef.current,
                        start: 'top 85%',
                        toggleActions: 'play none none none',
                    },
                }
            );
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            className="max-w-7xl mx-4 sm:mx-2 sm:px-10 my-14 px-6 py-12 bg-gray-50 dark:bg-gray-800 rounded-3xl shadow-xl"
        >
            <div className="md:flex-row md:justify-between md:items-center mb-12">
                <div>
                    <h2 className="text-4xl font-extrabold text-gray-900 dark:text-gray-100 mb-4">
                        Futures <span className="bg-gradient-to-r from-green-600 via-yellow-500 to-yellow-400 text-transparent bg-clip-text">Catégories</span>
                    </h2>
                    <p className="text-gray-600 dark:text-gray-400">
                        Pour répondre aux besoins grandissants de nos clients et anticiper les tendances du secteur, nous travaillons activement à élargir nos services.
                        Découvrez ci-dessous les futures catégories que notre entreprise prévoit de lancer dans les mois à venir.
                        Des idées innovantes, des concepts uniques, et toujours le même engagement : faire de chaque événement un moment inoubliable.
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                {categories.map((category, index) => (
                    <div
                        key={index}
                        className="flex items-start gap-4 p-6 bg-white dark:bg-gray-900 rounded-xl shadow hover:shadow-lg transition duration-300 hover:scale-[1.02]"
                    >
                        <div className="text-indigo-600 dark:text-indigo-400">
                            {category.icon}
                        </div>
                        <div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-white">{category.title}</h3>
                            <p className="item-start text-gray-500 dark:text-gray-400 text-sm">{category.students}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
