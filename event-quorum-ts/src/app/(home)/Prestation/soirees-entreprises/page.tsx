'use client';

import { useEffect } from 'react';
import Hero from '../component/Hero';
import Introduction from '../component/Introduction';
import Features from '../component/Features';
import ReasonToChoose from '../component/ReasonToChoose';
import WhyChoose from '../component/WhyChoose';
import FunctionalitiesSection from '../component/FunctionalitiesSection';
import CallToAction from '../component/CallToAction';
import MoreContent from '../component/MoreContent';

// Import data
import soireesData from '../data/soirees.json';

export default function SoireesEntreprisesPage() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      <Hero
        breadcrumb={soireesData.hero.breadcrumb}
        title={soireesData.hero.title}
        bgColor={soireesData.hero.bgColor}
        image={soireesData.hero.image}
      />

      <Introduction
        text={soireesData.introduction.text}
        bgColor={soireesData.introduction.bgColor}
      />

      <Features
        title={soireesData.features.title}
        items={soireesData.features.items}
        bgColor={soireesData.features.bgColor}
      />

      <ReasonToChoose
        title={soireesData.reasonsToChoose.title}
        blocks={soireesData.reasonsToChoose.blocks}
      />

      <WhyChoose
        title={soireesData.whyChoose.title}
        items={soireesData.whyChoose.items}
        bgColor={soireesData.whyChoose.bgColor}
      />

      <FunctionalitiesSection
        title={soireesData.functionalities.title}
        items={soireesData.functionalities.items}
      />

      {/* Fixed components */}
      <CallToAction />
      <MoreContent
        title={soireesData.moreContent.title}
        buttonLabel={soireesData.moreContent.buttonLabel}
        items={soireesData.moreContent.items}
      />

    </main>
  );
}