// src/app/superviseur/participants/[id]/surveys/[surveyId]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { _surveyList } from 'src/_mock/_surveys';
import { _participantList } from 'src/_mock/_participants';
import { ISurveyItem } from 'src/types/survey';
import { IParticipantItem } from 'src/types/participant';
import { SurveyDetailView } from '../../../components/survey-detail-view';

// ----------------------------------------------------------------------

export default function SurveyDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [survey, setSurvey] = useState<ISurveyItem | null>(null);
  const [participant, setParticipant] = useState<IParticipantItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const participantId = params?.id as string;
    const surveyId = params?.surveyId as string;
    
    if (participantId && surveyId) {
      // Rechercher le participant
      const foundParticipant = _participantList.find(
        (p) => p.id === participantId && ['en présentiel', 'en ligne'].includes(p.statut)
      );

      // Rechercher l'enquête
      const foundSurvey = _surveyList.find((s) => s.id === surveyId);

      if (foundParticipant && foundSurvey) {
        setParticipant(foundParticipant);
        setSurvey(foundSurvey);
      } else {
        // Rediriger vers la page de détail du participant si non trouvé
        router.push(`/superviseur/participants/${participantId}?tab=enquete`);
      }
    }
    
    setLoading(false);
  }, [params, router]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!survey || !participant) {
    return <div>Enquête non trouvée</div>;
  }

  return <SurveyDetailView survey={survey} participant={participant} />;
}