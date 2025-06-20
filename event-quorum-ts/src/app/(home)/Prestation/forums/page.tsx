// /Prestation/forum/page.tsx
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
import forumData from '../data/forums.json';

export default function ForumPage() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return (
    <main className="bg-white">

      {/* Hero Section avec les données spécifiques */}
      <HeroSection isLoaded={isLoaded} data={forumData.hero} />

      {/* Value Proposition avec les données spécifiques */}
      <ValueProposition isLoaded={isLoaded} data={forumData.valueProposition} />

      {/* Features avec les données spécifiques */}
      <Features isLoaded={isLoaded} data={forumData.features} />

      {/* Support Section avec les données spécifiques */}
      <Support isLoaded={isLoaded} data={forumData.support} />

      {/* Functionalities avec les données spécifiques */}
      <Functionalities isLoaded={isLoaded} data={forumData.functionalities} />

      <section className='m-7'>
        {/* Call To Action - composant fixe */}
        <CallToAction isLoaded={isLoaded} />
      </section>

      {/* Related Content - composant fixe */}
      <MoreContent isLoaded={isLoaded} data={forumData.moreContent}/>
    </main>
  );
}