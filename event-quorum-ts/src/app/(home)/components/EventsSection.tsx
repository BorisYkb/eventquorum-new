// components/EventsSection.jsx
"use client";

import { useEffect, useState, useRef } from 'react';
import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Initialisation du plugin (une seule fois dans l'application)
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export default function EventsSection() {
  // État pour suivre l'événement survolé/sélectionné
  const [activeEvent, setActiveEvent] = useState<number | null>(null);

  // Références pour les éléments à animer
  const titleRef = useRef(null);
  const introRef = useRef(null);
  const liRef = useRef(null);

  // Données des événements (à remplacer par vos propres événements)
  const events = [
    {
      id: 1,
      title: "Conférence Annuelle",
      date: new Date(2025, 5, 15), // 15 juin 2025
      location: "Abidjan, Côte d'Ivoire",
      description: "Notre conférence phare qui réunit les experts du secteur pour discuter des dernières tendances et innovations.",
      category: "Conférence"
    },
    {
      id: 2,
      title: "Atelier Design Thinking",
      date: new Date(2025, 7, 8), // 8 août 2025
      location: "San Pedro, Côte d'Ivoire",
      description: "Un atelier pratique pour apprendre les méthodologies du design thinking et les appliquer à vos projets.",
      category: "Atelier"
    },
    {
      id: 3,
      title: "Hackathon Innovation",
      date: new Date(2025, 9, 22), // 22 octobre 2025
      location: "Bouaké, Côte d'Ivoire",
      description: "48 heures pour développer des solutions innovantes en équipe et remporter des prix exceptionnels.",
      category: "Hackathon"
    },
    {
      id: 4,
      title: "Masterclass Leadership",
      date: new Date(2025, 11, 5), // 5 décembre 2025
      location: "Yamoussokro, Côte d'Ivoire",
      description: "Une journée intensive pour développer vos compétences en leadership avec des intervenants de haut niveau.",
      category: "Formation"
    }
  ];

  // Formatage de la date en français
  const formatEventDate = (date: Date) => {
    return format(date, "d MMMM yyyy", { locale: fr });
  };

  // Animation GSAP pour la section des événements
  useEffect(() => {
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
    }

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 80%",
        toggleActions: "play none none none"
      }
    });

    tl.fromTo(
      titleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8 }
    )
    .fromTo(
      introRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    )
    .fromTo(
      liRef.current,
      { x: 50, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.8 },
      "-=0.4"
    );

    // Cleanup function
    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  return (
    <section className="mt-12 py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-12">

          {/* Titre et intro (gauche) */}
          <div className="w-full lg:w-1/3 lg:sticky lg:top-24 lg:self-start">
            <h2 ref={titleRef} className="text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
              Nos<br />Événements<br />
              <span className="text-blue-600">À venir</span>
            </h2>
            <p ref={introRef} className="text-lg text-gray-600 mb-8">
              Rejoignez-nous lors de nos événements exclusifs pour apprendre, réseauter et découvrir les dernières innovations du secteur.
            </p>
            <a
              href="/Explorer"
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors no-underline"
            >
              Voir tous les événements
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </a>
          </div>

          {/* Liste des événements (droite) */}
          <div ref={liRef} className="w-full lg:w-2/3">
            <ul className="space-y-6">
              {events.map((event) => (
                <li
                  key={event.id}
                  className={`bg-white rounded-xl shadow-md transition-all duration-300 ${
                    activeEvent === event.id ? 'scale-[1.02] shadow-xl' : 'hover:shadow-lg'
                  }`}
                  onMouseEnter={() => setActiveEvent(event.id)}
                  onMouseLeave={() => setActiveEvent(null)}
                >
                  <a
                    href={`/evenements/${event.id}`}
                    className="block p-6 no-underline hover:no-underline"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
                      <div className="flex items-center flex-wrap gap-3">
                        <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                          event.category === 'Conférence' ? 'bg-blue-100 text-blue-800' :
                          event.category === 'Atelier' ? 'bg-green-100 text-green-800' :
                          event.category === 'Hackathon' ? 'bg-purple-100 text-purple-800' :
                          'bg-orange-100 text-orange-800'
                        }`}>
                          {event.category}
                        </span>
                        <h3 className="text-xl font-semibold text-gray-900">{event.title}</h3>
                      </div>
                      <div className="flex items-center text-gray-500 text-sm flex-shrink-0">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatEventDate(event.date)}
                      </div>
                    </div>

                    <p className="text-gray-600 mb-4 leading-relaxed">{event.description}</p>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-gray-500 text-sm">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        {event.location}
                      </div>
                      <span className="inline-flex items-center text-blue-600 font-medium text-sm transition-colors hover:text-blue-800">
                        En savoir plus
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                          <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                        </svg>
                      </span>
                    </div>
                  </a>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>
    </section>
  );
}
