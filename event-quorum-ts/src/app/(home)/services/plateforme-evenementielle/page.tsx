import React from "react";
import HeroSection from "../components/HeroSection";
import Description from "../components/DescriptionSection";
import Features from "../components/FeaturesList";
import Support from "../components/Support";

import data from "../../data/services/plateforme.json";

const PlateformePage = () => {
  return (
    <main className="bg-gray-200 dark:bg-gray-800">
      <HeroSection 
        title={data.hero.title}
        subtitle={data.hero.subtitle} 
        image={data.hero.image}/>
      <Description
        sectionTitle="Pourquoi choisir notre plateforme ?"
        sectionText={data.description.text}
        image={data.description.image}
      />
      <Features features={data.features} />
      <Support data={data.support} />
    </main>
  );
};

export default PlateformePage;
