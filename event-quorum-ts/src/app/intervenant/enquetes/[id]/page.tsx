// intervenant/enquetes/[id]/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { surveys, sampleQuestions } from '../data/surveys';
import MuiSurveyDetail from '../components/MuiSurveyDetail';

interface SurveyDetailPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: SurveyDetailPageProps): Promise<Metadata> {
  const survey = surveys.find(s => s.id === parseInt(params.id));

  if (!survey) {
    return {
      title: 'Enquête non trouvée',
    };
  }

  return {
    title: `${survey.title} - Détail de l'enquête`,
    description: survey.description,
    keywords: `enquête, ${survey.title}, ${survey.activity}, détails, questions`,
  };
}

export async function generateStaticParams() {
  return surveys.map((survey) => ({
    id: survey.id.toString(),
  }));
}

const SurveyDetailPage = ({ params }: SurveyDetailPageProps) => {
  const survey = surveys.find(s => s.id === parseInt(params.id));

  if (!survey) {
    notFound();
  }

  return <MuiSurveyDetail survey={survey} questions={sampleQuestions} />;
};

export default SurveyDetailPage;
