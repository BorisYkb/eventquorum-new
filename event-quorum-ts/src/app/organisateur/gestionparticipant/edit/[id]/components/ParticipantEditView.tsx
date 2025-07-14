'use client';

import { useState, useEffect } from 'react';

import { paths } from 'src/routes/paths';

import { DashboardContent } from 'src/layouts/admin';

import { CustomBreadcrumbs } from 'src/components/custom-breadcrumbs';

import { ParticipantEditForm } from './ParticipantEditForm';
import { Button } from '@mui/material';
import { RouterLink } from 'src/routes/components';
import { Iconify } from 'src/components/iconify';

import { IParticipantEditItem } from './types';
import Loading from 'src/app/loading';

// ----------------------------------------------------------------------

type Props = {
  participantId: string;
};

export function ParticipantEditView({ participantId }: Props) {
  const [participant, setParticipant] = useState<IParticipantEditItem | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données du participant
    const fetchParticipant = async () => {
      try {
        // Ici vous feriez l'appel API réel
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // Données fictives pour l'exemple
        const mockParticipant: IParticipantEditItem = {
          id: participantId,
          nom: 'Koffi',
          prenom: 'Emmanuel',
          telephone: '+225 01 01 01 01 01',
          email: 'koffi@gmail.com',
          motDePasse: '', // Mot de passe masqué
          activites: ['conference', 'workshop'],
        };
        
        setParticipant(mockParticipant);
      } catch (error) {
        console.error('Erreur lors du chargement du participant:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchParticipant();
  }, [participantId]);

  if (loading) {
    return (
      <DashboardContent>
        <Loading />
      </DashboardContent>
    );
  }

  if (!participant) {
    return (
      <DashboardContent>

        <div>Participant introuvable</div>
      </DashboardContent>
    );
  }

  return (
    <DashboardContent>
      <CustomBreadcrumbs
        heading="Modifier un invité"
        links={[
          { name: 'Gestion participants', href: paths.organisateur.gestionparticipant.root },
          { name: `${participant.nom} ${participant.prenom}` },
        ]}
        action={
          <Button
            component={RouterLink}
            href={paths.organisateur.gestionparticipant.root}
            variant="contained"
            startIcon={<Iconify icon="mingcute:left-fill" />}
          >
            Retour
          </Button>
        }
        sx={{ mb: { xs: 3, md: 5 } }}
      />

      <ParticipantEditForm participant={participant} />
    </DashboardContent>
  );
}