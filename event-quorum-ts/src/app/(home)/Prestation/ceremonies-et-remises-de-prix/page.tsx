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
import ceremoniesData from '../data/ceremonies.json';

export default function CeremoniesPage() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      <Hero
        breadcrumb={ceremoniesData.hero.breadcrumb}
        title={ceremoniesData.hero.title}
        bgColor={ceremoniesData.hero.bgColor}
        image={ceremoniesData.hero.image}
      />

      <Introduction
        text={ceremoniesData.introduction.text}
        bgColor={ceremoniesData.introduction.bgColor}
      />

      <Features
        title={ceremoniesData.features.title}
        items={ceremoniesData.features.items}
        bgColor={ceremoniesData.features.bgColor}
      />

      <ReasonToChoose
        title={ceremoniesData.reasonsToChoose.title}
        blocks={ceremoniesData.reasonsToChoose.blocks}
      />

      <WhyChoose
        title={ceremoniesData.whyChoose.title}
        items={ceremoniesData.whyChoose.items}
        bgColor={ceremoniesData.whyChoose.bgColor}
      />

      <FunctionalitiesSection
        title={ceremoniesData.functionalities.title}
        items={ceremoniesData.functionalities.items}
      />

      {/* Fixed components */}
      <CallToAction />
      <MoreContent
        title={ceremoniesData.moreContent.title}
        buttonLabel={ceremoniesData.moreContent.buttonLabel}
        items={ceremoniesData.moreContent.items}
      />

    </main>
  );
}