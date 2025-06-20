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
import conventionsData from '../data/conventions.json';

export default function ConventionsPage() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      <Hero
        breadcrumb={conventionsData.hero.breadcrumb}
        title={conventionsData.hero.title}
        bgColor={conventionsData.hero.bgColor}
        image={conventionsData.hero.image}
      />

      <Introduction
        text={conventionsData.introduction.text}
        bgColor={conventionsData.introduction.bgColor}
      />

      <Features
        title={conventionsData.features.title}
        items={conventionsData.features.items}
        bgColor={conventionsData.features.bgColor}
      />

      <ReasonToChoose
        title={conventionsData.reasonsToChoose.title}
        blocks={conventionsData.reasonsToChoose.blocks}
      />

      <WhyChoose
        title={conventionsData.whyChoose.title}
        items={conventionsData.whyChoose.items}
        bgColor={conventionsData.whyChoose.bgColor}
      />

      <FunctionalitiesSection
        title={conventionsData.functionalities.title}
        items={conventionsData.functionalities.items}
      />

      {/* Fixed components */}
      <CallToAction />
      <MoreContent
        title={conventionsData.moreContent.title}
        buttonLabel={conventionsData.moreContent.buttonLabel}
        items={conventionsData.moreContent.items}
      />
    </main>
  );
}