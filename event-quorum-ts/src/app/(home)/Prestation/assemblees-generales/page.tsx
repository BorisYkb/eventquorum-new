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
import assembleesData from '../data/assemblees.json';

export default function AssembleesGeneralesPage() {
  useEffect(() => {
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);

  return (
    <main className="min-h-screen">
      <Hero
        breadcrumb={assembleesData.hero.breadcrumb}
        title={assembleesData.hero.title}
        bgColor={assembleesData.hero.bgColor}
        image={assembleesData.hero.image}
      />

      <Introduction
        text={assembleesData.introduction.text}
        bgColor={assembleesData.introduction.bgColor}
      />

      <Features
        title={assembleesData.features.title}
        items={assembleesData.features.items}
        bgColor={assembleesData.features.bgColor}
      />

      <ReasonToChoose
        title={assembleesData.reasonsToChoose.title}
        blocks={assembleesData.reasonsToChoose.blocks}
      />

      <WhyChoose
        title={assembleesData.whyChoose.title}
        items={assembleesData.whyChoose.items}
        bgColor={assembleesData.whyChoose.bgColor}
      />

      <FunctionalitiesSection
        title={assembleesData.functionalities.title}
        items={assembleesData.functionalities.items}
      />

      {/* Fixed components */}
      <CallToAction />
      <MoreContent
        title={assembleesData.moreContent.title}
        buttonLabel={assembleesData.moreContent.buttonLabel}
        items={assembleesData.moreContent.items}
      />

    </main>
  );
}