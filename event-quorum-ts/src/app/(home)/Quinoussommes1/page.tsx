// pages/qui-nous-sommes.js
'use client';

import { useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';

export default function QuiNousSommes() {
  // Références pour les animations
  const headerRef = useRef(null);
  const missionRef = useRef(null);
  const teamRef = useRef(null);
  const valuesRef = useRef(null);
  const historyRef = useRef(null);

  useEffect(() => {
    // Enregistrer le plugin ScrollTrigger
    if (typeof window !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      
      // Animation du header
      gsap.from(headerRef.current, {
        opacity: 0,
        y: -50,
        duration: 1,
        ease: 'power3.out'
      });

      // Animation des sections au défilement
      const sections = [missionRef.current, teamRef.current, valuesRef.current, historyRef.current];
      
      sections.forEach(section => {
        if (section) {
          gsap.from((section as Element).querySelectorAll('.animate-item'), {
            scrollTrigger: {
              trigger: section,
              start: 'top 75%',
            },
            opacity: 0,
            y: 30,
            stagger: 0.2,
            duration: 0.8,
            ease: 'power2.out'
          });
        }
      });
    }
  }, []);

  const teamMembers = [
    {
      name: 'Marie Laurent',
      role: 'Directrice Générale',
      image: '/personne1.jpg'
    },
    {
      name: 'Thomas Dubois',
      role: 'Directeur Technique',
      image: '/personne2.jpg'
    },
    {
      name: 'Sophie Martin',
      role: 'Responsable Créative',
      image: '/personne1.jpg'
    },
    {
      name: 'Julien Petit',
      role: 'Développeur Senior',
      image: '/personne2.jpg'
    }
  ];

  const values = [
    {
      title: 'Innovation',
      description: 'Nous repoussons constamment les limites de la créativité et de la technologie.'
    },
    {
      title: 'Qualité',
      description: 'Nous nous engageons à fournir un travail d\'excellence dans chaque projet.'
    },
    {
      title: 'Collaboration',
      description: 'Nous croyons en la force du travail d\'équipe et de la communication transparente.'
    },
    {
      title: 'Intégrité',
      description: 'Nous agissons avec honnêteté et respectons nos engagements.'
    }
  ];

  return (
    <div className="bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen">
      <Head>
        <title>Qui nous sommes | Notre entreprise</title>
        <meta name="description" content="Découvrez notre histoire, notre équipe et nos valeurs" />
      </Head>

      {/* Hero Section */}
      <header 
        ref={headerRef} 
        className="relative h-96 flex items-center justify-center overflow-hidden bg-indigo-900"
      >
        <div className="absolute inset-0 opacity-70">
          <Image 
            src="/equipe2.jpg"
            alt="Image d'équipe"
            layout="fill"
            objectFit="cover"
          />
        </div>
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl font-bold text-white mb-4">Qui nous sommes</h1>
          <p className="text-xl text-indigo-100 max-w-2xl mx-auto">
            Une équipe passionnée, dédiée à créer des expériences numériques exceptionnelles
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-4 py-16">
        {/* Notre Mission */}
        <section ref={missionRef} className="mb-24">
          <div className="animate-item text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre mission</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          <div className="animate-item md:flex items-center gap-10">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <Image 
                src="/even6.jpg"
                alt="Notre mission"
                width={600}
                height={400}
                className="rounded-lg shadow-lg"
              />
            </div>
            <div className="md:w-1/2">
              <p className="text-lg text-gray-700 mb-4">
                Notre mission est d'aider les entreprises à prospérer dans l'ère numérique en créant des solutions web innovantes et performantes qui répondent aux besoins spécifiques de chaque client.
              </p>
              <p className="text-lg text-gray-700">
                Nous combinons expertise technique, créativité et compréhension approfondie des besoins commerciaux pour offrir des expériences numériques qui dépassent les attentes et génèrent des résultats concrets.
              </p>
            </div>
          </div>
        </section>

        {/* Notre Équipe */}
        <section ref={teamRef} className="mb-24">
          <div className="animate-item text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre équipe</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="animate-item bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-xl hover:-translate-y-2">
                <div className="p-4 text-center">
                  <div className="w-32 h-32 rounded-full overflow-hidden mx-auto mb-4">
                    <Image 
                      src={member.image}
                      alt={member.name}
                      width={150}
                      height={150}
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800">{member.name}</h3>
                  <p className="text-indigo-600">{member.role}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Nos Valeurs */}
        <section ref={valuesRef} className="mb-24">
          <div className="animate-item text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Nos valeurs</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {values.map((value, index) => (
              <div key={index} className="animate-item bg-white p-6 rounded-lg shadow-md flex items-start">
                <div className="bg-indigo-100 p-3 rounded-full mr-4">
                  <div className="w-8 h-8 flex items-center justify-center text-indigo-600 font-bold">
                    {index + 1}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Notre Histoire */}
        <section ref={historyRef}>
          <div className="animate-item text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Notre histoire</h2>
            <div className="w-24 h-1 bg-indigo-600 mx-auto"></div>
          </div>
          <div className="relative animate-item">
            {/* Ligne de temps verticale */}
            <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-1 bg-indigo-200 transform -translate-x-1/2"></div>
            
            {/* Événements */}
            <div className="space-y-12">
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">2018</h3>
                  <p className="text-gray-600">Fondation de l'entreprise avec une équipe de trois passionnés du web.</p>
                </div>
                <div className="hidden md:block w-4 h-4 bg-indigo-600 rounded-full border-4 border-indigo-100 z-10"></div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right order-1 md:order-none"></div>
                <div className="hidden md:block w-4 h-4 bg-indigo-600 rounded-full border-4 border-indigo-100 z-10"></div>
                <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">2020</h3>
                  <p className="text-gray-600">Expansion de l'équipe et ouverture de nos nouveaux bureaux.</p>
                </div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">2022</h3>
                  <p className="text-gray-600">Lancement de notre service d'application mobile et récompense pour l'innovation.</p>
                </div>
                <div className="hidden md:block w-4 h-4 bg-indigo-600 rounded-full border-4 border-indigo-100 z-10"></div>
                <div className="md:w-1/2 md:pl-12"></div>
              </div>
              
              <div className="flex flex-col md:flex-row items-center">
                <div className="md:w-1/2 md:pr-12 md:text-right order-1 md:order-none"></div>
                <div className="hidden md:block w-4 h-4 bg-indigo-600 rounded-full border-4 border-indigo-100 z-10"></div>
                <div className="md:w-1/2 md:pl-12 mb-4 md:mb-0">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">Aujourd'hui</h3>
                  <p className="text-gray-600">Une équipe de 20 experts dévoués, servant des clients dans toute la France et à l'international.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Appel à l'action */}
      <div className="bg-indigo-900 text-white py-16">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-6">Prêt à travailler avec nous ?</h2>
          <p className="text-lg text-indigo-100 mb-8">
            Contactez-nous dès aujourd'hui pour discuter de votre projet et découvrir comment nous pouvons vous aider à atteindre vos objectifs.
          </p>
          <button className="bg-white text-indigo-900 font-bold py-3 px-8 rounded-full hover:bg-indigo-100 transition-colors duration-300">
            Nous contacter
          </button>
        </div>
      </div>
    </div>
  );
}