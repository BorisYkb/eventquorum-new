//intervenant/enquetes/page.tsx
import React from 'react';
import { Metadata } from 'next';
import MuiSurveyDashboard from './components/MuiSurveyDashboard';
import { surveys } from './data/surveys';

export const metadata: Metadata = {
  title: 'Gestion des Enquêtes - Liste des enquêtes',
  description: 'Gérez et consultez toutes vos enquêtes en ligne. Suivez les statistiques, les participants et les résultats.',
  keywords: 'enquêtes, gestion, statistiques, participants, résultats',
};

const SurveyManagementPage = () => {
  return <MuiSurveyDashboard surveys={surveys} />;
};

export default SurveyManagementPage;
