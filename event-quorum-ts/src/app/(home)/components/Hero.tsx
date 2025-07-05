
"use client";

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function Hero() {
  const [isVisible, setIsVisible] = useState(false);


  useEffect(() => {
    // Animation d'entrée au chargement
    setIsVisible(true);


  }, []);

  return (
    <header className="bg-gradient-to-br mt-0 pt-4 pb-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

          {/* Partie texte (gauche) */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-2000 transform ${isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'
              }`}
          >

            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-gray-300 leading-tight mb-4">
              Créer des <span className="text-blue-600">moments</span> extraordinaires
            </h1>

            <p className="text-lg text-gray-600 mb-6">
            Nous transformons vos idées en événements exceptionnels qui dépassent toutes les attentes. Commencez dès aujourd'hui.
            </p>

            {/* Boutons */}
            <div className="flex flex-wrap gap-4 mb-8">
              <Link
                href="/DemoRequest"
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white no-underline rounded-lg font-medium transition-colors shadow-lg hover:shadow-xl">
                Créer un événement
              </Link>



            </div>

            {/* Statistiques */}
            <div className="flex gap-6 md:gap-14 mt-8">
              <div className="text-center md:text-left">
                <p className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-yellow-400 to-yellow-600 bg-clip-text text-transparent">14k+</span>
                </p>
                <p className="text-sm text-gray-500">Learners</p>
              </div>

              <div className="text-center md:text-left">
                <p className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-red-300 to-red-500 bg-clip-text text-transparent">1.05k+</span>
                </p>
                <p className="text-sm text-gray-500">Courses</p>
              </div>

              <div className="text-center md:text-left">
                <p className="text-xl font-bold">
                  <span className="bg-gradient-to-r from-green-300 to-green-500 bg-clip-text text-transparent">59k+</span>
                </p>
                <p className="text-sm text-gray-500">Graduates</p>
              </div>
            </div>
          </div>


          {/* Image (droite) */}
          <div
            className={`w-full lg:w-1/2 transition-all duration-2000 transform ${
              isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}
          >
            <div className="relative h-80 md:h-96 lg:h-[500px] w-full rounded-2xl overflow-hidden shadow-2xl transform hover:scale-[1.02] transition-transform duration-500">
              {/* Remplacez ceci par votre propre image */}
              <div className="absolute inset-0 bg-blue-300 opacity-20 z-10 animate-pulse"></div>
              <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 relative">
                {/* Simuler une image - remplacez par votre propre image */}
                <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-white/30 rounded-full blur-3xl"></div>
                <div className="absolute top-10 left-10 w-40 h-40 bg-yellow-400/20 rounded-full blur-xl"></div>

                {/* Quand vous aurez une vraie image, utilisez : */}
                { <Image
                  src="/event2.avif"
                  alt="une evenement"
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                /> }
              </div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
}
