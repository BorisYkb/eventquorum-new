// intervenant/enquetes/[id]/resultats/page.tsx
import React from 'react';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import MuiSurveyResults from '../../components/MuiSurveyResults';
import { surveys, sampleQuestions } from '../../data/surveys';

interface SurveyResultsPageProps {
  params: {
    id: string;
  };
}

export async function generateMetadata({ params }: SurveyResultsPageProps): Promise<Metadata> {
  const survey = surveys.find(s => s.id === parseInt(params.id));

  if (!survey) {
    return {
      title: 'Enquête non trouvée',
    };
  }

  return {
    title: `${survey.title} - Résultats de l'enquête`,
    description: `Consultez les résultats détaillés de l'enquête ${survey.title}. Statistiques, graphiques et analyse des réponses.`,
    keywords: `enquête, ${survey.title}, résultats, statistiques, analyse, réponses`,
  };
}

export async function generateStaticParams() {
  return surveys.map((survey) => ({
    id: survey.id.toString(),
  }));
}

const SurveyResultsPage = ({ params }: SurveyResultsPageProps) => {
  const survey = surveys.find(s => s.id === parseInt(params.id));

  if (!survey) {
    notFound();
  }

  return <MuiSurveyResults surveyId={params.id} questions={sampleQuestions} />;
};

export default SurveyResultsPage;
