//src/app/superviseur/participants/[id]/page.tsx

'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { _participantList } from 'src/_mock/_participants';
import { IParticipantItem } from 'src/types/participant';
import { DetailParticipant } from '../components/details-participant';

// ----------------------------------------------------------------------

export default function DetailParticipantPage() {
  const params = useParams();
  const router = useRouter();
  const [participant, setParticipant] = useState<IParticipantItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const participantId = params?.id as string;
    
    if (participantId) {
      // Rechercher le participant dans la liste mock
      const foundParticipant = _participantList.find(
        (p) => p.id === participantId && ['en présentiel', 'en ligne'].includes(p.statut)
      );

      if (foundParticipant) {
        setParticipant(foundParticipant);
      } else {
        // Rediriger vers la liste des participants si non trouvé
        router.push('/superviseur/participants');
      }
    }
    
    setLoading(false);
  }, [params, router]);

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!participant) {
    return <div>Participant non trouvé</div>;
  }

  return <DetailParticipant participant={participant} />;
}