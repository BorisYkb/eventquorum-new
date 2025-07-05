// /Prestation/conferences/page.tsx
"use client";

import { useEffect, useState } from 'react';
import HeroSection from '../components/HeroSection';
import ValueProposition from '../components/ValueProposition';
import Features from '../components/Features';
import Support from '../components/Support';
import Functionalities from '../components/Functionalities';
import MoreContent from '../components/MoreContent';
import CallToAction from '../components/CallToAction';

// Import des données spécifiques à cette page
import conferencesData from '../data/conferences.json';

export default function ConferencePage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="bg-white no-underline">
      {/* Hero Section avec les données spécifiques */}
      <HeroSection isLoaded={isLoaded} data={conferencesData.hero} />

      {/* Value Proposition avec les données spécifiques */}
      <ValueProposition isLoaded={isLoaded} data={conferencesData.valueProposition} />

      {/* Features avec les données spécifiques */}
      <Features isLoaded={isLoaded} data={conferencesData.features} />

      {/* Support Section avec les données spécifiques */}
      <Support isLoaded={isLoaded} data={conferencesData.support} />

      {/* Functionalities avec les données spécifiques */}
      <Functionalities isLoaded={isLoaded} data={conferencesData.functionalities} />

      <section className='m-7'>
        {/* Call To Action - composant fixe */}
        <CallToAction isLoaded={isLoaded} />
      </section>

      {/* Related Content - composant fixe */}
      <MoreContent isLoaded={isLoaded} data={conferencesData.moreContent} />
    </main>
  );
}
