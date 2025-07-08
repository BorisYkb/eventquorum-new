// components/StatsCards.tsx
import React from 'react';
import { Survey } from '../types/survey';
import StatsCard from './StatsCard';

interface StatsCardsProps {
  surveys: Survey[];
}

const StatsCards: React.FC<StatsCardsProps> = ({ surveys }) => {
  const totalSurveys = surveys.length;
  const inProgress = surveys.filter(s => s.status === "En cours").length;
  const notStarted = surveys.filter(s => s.status === "Non démarrée").length;
  const completed = surveys.filter(s => s.status === "Terminée").length;

  return (
    <div className="grid grid-cols-4 gap-6 mb-8">
      <StatsCard
        title="Toutes les enquêtes"
        value={totalSurveys}
        variant="primary"
      />
      <StatsCard
        title="En cours"
        value={inProgress}
        variant="success"
      />
      <StatsCard
        title="Non démarrées"
        value={notStarted}
        variant="warning"
      />
      <StatsCard
        title="Terminées"
        value={completed}
        variant="error"
      />
    </div>
  );
};

export default StatsCards;
